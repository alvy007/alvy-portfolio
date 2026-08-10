import { NextResponse } from 'next/server';
import { profile } from '../../../data/profile';

export const runtime = 'nodejs';
export const revalidate = 1800;

type GitHubUser = {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
};

type GitHubRepo = {
  fork: boolean;
  language: string | null;
  stargazers_count: number;
};

function getGitHubUsername() {
  try {
    const url = new URL(profile.github);

    return (
      url.pathname
        .split('/')
        .map(part => part.trim())
        .filter(Boolean)[0] || 'alvy007'
    );
  } catch {
    return 'alvy007';
  }
}

function createHeaders() {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'alvy-portfolio',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

export async function GET() {
  const username = getGitHubUsername();
  const headers = createHeaders();

  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers,
        next: {
          revalidate: 1800,
        },
      },
    );

    if (!userResponse.ok) {
      throw new Error(`GitHub user request failed with ${userResponse.status}`);
    }

    const user = (await userResponse.json()) as GitHubUser;

    const totalPages = Math.max(1, Math.ceil(user.public_repos / 100));

    const repoRequests = Array.from(
      {
        length: totalPages,
      },
      (_, index) =>
        fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&page=${
            index + 1
          }&sort=updated`,
          {
            headers,
            next: {
              revalidate: 1800,
            },
          },
        ),
    );

    const repoResponses = await Promise.all(repoRequests);

    for (const response of repoResponses) {
      if (!response.ok) {
        throw new Error(
          `GitHub repositories request failed with ${response.status}`,
        );
      }
    }

    const repoPages = await Promise.all(
      repoResponses.map(response => response.json() as Promise<GitHubRepo[]>),
    );

    const repos = repoPages.flat();

    const originalRepos = repos.filter(repo => !repo.fork);

    const languages = Array.from(
      new Set(
        originalRepos
          .map(repo => repo.language)
          .filter((language): language is string => Boolean(language)),
      ),
    ).sort();

    const totalStars = originalRepos.reduce(
      (total, repo) => total + repo.stargazers_count,
      0,
    );

    return NextResponse.json(
      {
        username: user.login,
        publicRepos: user.public_repos,
        originalRepos: originalRepos.length,
        languages,
        languageCount: languages.length,
        followers: user.followers,
        following: user.following,
        totalStars,
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
    console.error('GitHub stats API error:', error);

    return NextResponse.json(
      {
        error: 'Live GitHub statistics are temporarily unavailable.',
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
