export function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-8">Disclaimer</h1>
      <p className="text-neutral-500 text-sm mb-8">Last updated: July 2026</p>

      <div className="space-y-8 text-neutral-400 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Training Tool Only</h2>
          <p>
            Synvix is an <span className="text-white font-medium">interview preparation and training tool</span>.
            It is intended for learning, practicing, and preparing for technical interviews.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Not for Live Interviews</h2>
          <p>
            Using Synvix during live interviews, coding challenges, or assessments may violate:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2 ml-4">
            <li>The terms of service of the interview platform (e.g., Zoom, Google Meet, Codility, HackerRank)</li>
            <li>Company policies regarding interview procedures</li>
            <li>Applicable laws regarding fraud or misrepresentation</li>
          </ul>
          <p className="mt-3">
            Synvix is <span className="text-white font-medium">not responsible</span> for any consequences
            (including account bans, job offer rescission, or legal action) resulting from
            unauthorized use during live interviews.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Accuracy</h2>
          <p>
            AI-generated content may contain errors. Always verify information independently.
            Synvix does not guarantee the accuracy of generated responses.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">User Responsibility</h2>
          <p>
            You are solely responsible for your use of Synvix and for ensuring that your use
            complies with all applicable laws, regulations, and platform policies.
          </p>
        </section>
      </div>
    </div>
  );
}
