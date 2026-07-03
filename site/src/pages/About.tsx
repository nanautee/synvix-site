export function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-4">About Synvix</h1>
      <div className="prose prose-invert max-w-xl space-y-4 text-neutral-400">
        <p>
          Synvix is a desktop interview copilot that listens, transcribes, and generates answers in real time —
          while staying invisible during screen sharing.
        </p>
        <p>
          We believe your API keys and interview data belong on your machine. Synvix stores credentials locally
          and never sends them to our servers.
        </p>
        <p className="text-neutral-600 text-sm">
          Logo and brand design by our team — final assets coming soon.
        </p>
      </div>
    </div>
  );
}
