export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
      <p className="text-neutral-500 text-sm mb-8">Last updated: July 2026</p>

      <div className="space-y-8 text-neutral-400 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">1. Data Collection</h2>
          <p>
            Synvix is designed with privacy in mind. All processing happens locally on your device.
            We do not collect, store, or transmit your interview data, audio, transcripts, or API keys.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">2. What We Store</h2>
          <p>
            We store only basic account information (email) for authentication purposes.
            Interview data never leaves your machine.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">3. Third-Party Services</h2>
          <p>
            We use Vercel Analytics to collect anonymous usage statistics (page views, performance metrics).
            No personally identifiable information is collected through analytics.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">4. Data Security</h2>
          <p>
            All data is processed locally on your device. We use industry-standard encryption for any
            transmitted data (authentication tokens). Your API keys are stored locally and never sent to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">5. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">6. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us through our
            support page or email us directly.
          </p>
        </section>
      </div>
    </div>
  );
}
