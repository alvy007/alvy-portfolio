export function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="soft-grid absolute inset-0 opacity-35" />

      <div className="absolute left-[-10rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute right-[-12rem] top-[6rem] h-[30rem] w-[30rem] rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute bottom-[-16rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-400/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030712] to-transparent" />
    </div>
  );
}
