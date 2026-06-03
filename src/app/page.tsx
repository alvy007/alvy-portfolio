import { AchievementsSection } from '../components/AchievementsSection';
import { BackgroundEffects } from '../components/BackgroundEffects';
import { CertificationsSection } from '../components/CertificationsSection';
import { CodingProfiles } from '../components/CodingProfiles';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { HardwareLab } from '../components/HardwareLab';
import { Hero } from '../components/Hero';
import { Navbar } from '../components/Navbar';
import { ProjectsSection } from '../components/ProjectsSection';
import { ResearchSection } from '../components/ResearchSection';
import { SkillUniverse } from '../components/SkillUniverse';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030712] text-white">
      <BackgroundEffects />
      <Navbar />
      <Hero />

      <section id="story" className="relative z-10 section-container py-24">
        <div className="glass-card rounded-3xl p-8 md:p-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Built from real problems
          </p>

          <h2 className="max-w-3xl font-[var(--font-space)] text-3xl font-bold tracking-tight text-white md:text-5xl">
            I do not just build projects. I build answers to problems I have
            lived, seen, and wanted to solve.
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              'University shuttle uncertainty became a tracking system.',
              'Gym confusion became a fitness companion idea.',
              'Password safety concerns became a secure vault extension.',
            ].map(item => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SkillUniverse />
      <CodingProfiles />
      <ProjectsSection />
      <ResearchSection />
      <AchievementsSection />
      <CertificationsSection />
      <HardwareLab />
      <ContactSection />
      <Footer />
    </main>
  );
}
