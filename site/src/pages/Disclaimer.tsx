export function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-8">Disclaimer</h1>
      <div className="prose prose-invert max-w-xl space-y-6 text-neutral-400 text-sm leading-relaxed">
        <p>Last updated: July 2026</p>

        <h2 className="text-xl font-semibold text-white mt-8">Training Tool Only</h2>
        <p>
          Synvix is an <strong className="text-white">interview preparation and training tool</strong>.
          It is intended for learning, practicing, and preparing for technical interviews.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Not for Live Interviews</h2>
        <p>
          Using Synvix during live interviews, coding challenges, or assessments may violate:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>The terms of service of the interview platform (e.g., Zoom, Google Meet, Codility, HackerRank)</li>
          <li>Company policies regarding interview procedures</li>
          <li>Applicable laws regarding fraud or misrepresentation</li>
        </ul>
        <p>
          Synvix is <strong className="text-white">not responsible</strong> for any consequences
          (including account bans, job offer rescission, or legal action) resulting from
          unauthorized use during live interviews.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Accuracy</h2>
        <p>
          AI-generated content may contain errors. Always verify information independently.
          Synvix does not guarantee the accuracy of generated responses.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">User Responsibility</h2>
        <p>
          You are solely responsible for your use of Synvix and for ensuring that your use
          complies with all applicable laws, regulations, and platform policies.
        </p>
      </div>
    </div>
  );
}
