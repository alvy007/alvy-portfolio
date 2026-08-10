import { NextResponse } from 'next/server';
import { profile } from '../../../data/profile';

export const runtime = 'nodejs';

type DifficultyCount = {
  difficulty: string;
  count: number;
  submissions?: number;
};

type UserCalendar = {
  submissionCalendar?: string;
};

type LeetCodeResponse = {
  data?: {
    allQuestionsCount?: DifficultyCount[];
    matchedUser?: {
      username?: string;
      submitStatsGlobal?: {
        acSubmissionNum?: DifficultyCount[];
      };
      currentYear?: UserCalendar;
      previousYear?: UserCalendar;
    } | null;
  };
  errors?: Array<{
    message?: string;
  }>;
};

type CalendarMap = Record<string, number>;

function getLeetCodeUsername() {
  try {
    const url = new URL(profile.leetcode);

    const parts = url.pathname
      .split('/')
      .map(part => part.trim())
      .filter(Boolean);

    return parts.at(-1) || 'alvy_007';
  } catch {
    return 'alvy_007';
  }
}

function parseCalendar(value?: string): CalendarMap {
  if (!value) return {};

  try {
    const parsed = JSON.parse(value) as Record<string, unknown>;

    return Object.fromEntries(
      Object.entries(parsed)
        .map(([timestamp, count]) => [
          timestamp,
          typeof count === 'number' ? count : Number(count),
        ])
        .filter(([, count]) => Number.isFinite(count)),
    );
  } catch {
    return {};
  }
}

function mergeCalendars(...calendars: CalendarMap[]) {
  const merged: CalendarMap = {};

  calendars.forEach(calendar => {
    Object.entries(calendar).forEach(([timestamp, count]) => {
      merged[timestamp] = (merged[timestamp] ?? 0) + count;
    });
  });

  return merged;
}

function getDifficultyCount(
  rows: DifficultyCount[] | undefined,
  difficulty: string,
) {
  return (
    rows?.find(
      item => item.difficulty.toLowerCase() === difficulty.toLowerCase(),
    )?.count ?? 0
  );
}

function createPastYearCalendar(calendar: CalendarMap) {
  const today = new Date();

  const todayUtc = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );

  const start = new Date(todayUtc);
  start.setUTCDate(start.getUTCDate() - 364);

  const countsByDate = new Map<string, number>();

  Object.entries(calendar).forEach(([timestamp, count]) => {
    const numericTimestamp = Number(timestamp);

    if (!Number.isFinite(numericTimestamp)) return;

    const date = new Date(numericTimestamp * 1000).toISOString().slice(0, 10);

    countsByDate.set(date, (countsByDate.get(date) ?? 0) + count);
  });

  const days: Array<{
    date: string;
    count: number;
  }> = [];

  let totalSubmissions = 0;
  let activeDays = 0;
  let currentStreak = 0;
  let maxStreak = 0;

  for (let index = 0; index < 365; index += 1) {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);

    const dateKey = date.toISOString().slice(0, 10);
    const count = countsByDate.get(dateKey) ?? 0;

    days.push({
      date: dateKey,
      count,
    });

    totalSubmissions += count;

    if (count > 0) {
      activeDays += 1;
      currentStreak += 1;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return {
    days,
    totalSubmissions,
    activeDays,
    maxStreak,
  };
}

export async function GET() {
  const username = getLeetCodeUsername();

  const currentYear = new Date().getUTCFullYear();
  const previousYear = currentYear - 1;

  const query = `
    query portfolioLeetCodeStats(
      $username: String!,
      $currentYear: Int!,
      $previousYear: Int!
    ) {
      allQuestionsCount {
        difficulty
        count
      }

      matchedUser(username: $username) {
        username

        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }

        currentYear: userCalendar(year: $currentYear) {
          submissionCalendar
        }

        previousYear: userCalendar(year: $previousYear) {
          submissionCalendar
        }
      }
    }
  `;

  try {
    const response = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: 'https://leetcode.com',
        Referer: `https://leetcode.com/u/${username}/`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36',
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          currentYear,
          previousYear,
        },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`LeetCode responded with ${response.status}`);
    }

    const result = (await response.json()) as LeetCodeResponse;

    if (result.errors?.length) {
      throw new Error(
        result.errors
          .map(error => error.message)
          .filter(Boolean)
          .join(', ') || 'LeetCode GraphQL error',
      );
    }

    const matchedUser = result.data?.matchedUser;

    if (!matchedUser) {
      throw new Error('LeetCode user was not found.');
    }

    const solved = matchedUser.submitStatsGlobal?.acSubmissionNum;

    const questionTotals = result.data?.allQuestionsCount;

    const mergedCalendar = mergeCalendars(
      parseCalendar(matchedUser.previousYear?.submissionCalendar),
      parseCalendar(matchedUser.currentYear?.submissionCalendar),
    );

    const activity = createPastYearCalendar(mergedCalendar);

    return NextResponse.json(
      {
        username: matchedUser.username ?? username,

        solved: {
          all: getDifficultyCount(solved, 'All'),
          easy: getDifficultyCount(solved, 'Easy'),
          medium: getDifficultyCount(solved, 'Medium'),
          hard: getDifficultyCount(solved, 'Hard'),
        },

        questions: {
          all: getDifficultyCount(questionTotals, 'All'),
          easy: getDifficultyCount(questionTotals, 'Easy'),
          medium: getDifficultyCount(questionTotals, 'Medium'),
          hard: getDifficultyCount(questionTotals, 'Hard'),
        },

        activity: {
          calendar: activity.days,
          totalSubmissions: activity.totalSubmissions,
          activeDays: activity.activeDays,
          maxStreak: activity.maxStreak,
        },

        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=1800, stale-while-revalidate=86400',
        },
      },
    );
  } catch (error) {
    console.error('LeetCode API error:', error);

    return NextResponse.json(
      {
        error: 'Live LeetCode data is temporarily unavailable.',
      },
      {
        status: 502,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );
  }
}
