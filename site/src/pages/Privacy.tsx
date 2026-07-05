export function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
      <div className="prose prose-invert max-w-xl space-y-6 text-neutral-400 text-sm leading-relaxed">
        <p>Last updated: July 2026</p>

        <h2 className="text-xl font-semibold text-white mt-8">1. Data Collection</h2>
        <p>
          Synvix is designed with privacy in mind. All processing happens locally on your device.
          We do not collect, store, or transmit your interview data, audio, transcripts, or API keys.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">2. What We Store</h2>
        <p>
          We store only basic account information (email) for authentication purposes.
          Interview data never leaves your machine.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">3. Third-Party Services</h2>
        <p>
          We use Vercel Analytics to collect anonymous usage statistics (page views, performance metrics).
          No personally identifiable information is collected through analytics.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">4. Data Security</h2>
        <p>
          All data is processed locally on your device. We use industry-standard encryption for any
          transmitted data (authentication tokens). Your API keys are stored locally and never sent to our servers.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">5. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page
          with an updated revision date.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">6. Contact</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us through our
          support page or email us directly.
        </p>
      </div>
    </div>
  );
}
