import { profile } from '../data/profile';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-8">
      <div className="section-container flex flex-col justify-between gap-4 text-sm text-slate-500 md:flex-row md:items-center">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
        <p>Software · IoT · Robotics · AI · Cybersecurity</p>
      </div>
    </footer>
  );
}
