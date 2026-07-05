export function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-8">Contact Us</h1>

      <div className="space-y-8 text-neutral-400 leading-relaxed">
        <p>
          Have questions, feedback, or need support? We'd love to hear from you.
        </p>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Email</h2>
          <p>synvix-admin@proton.me</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Discord</h2>
          <p>
            Join our community server for real-time support and discussions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Response Time</h2>
          <p>We typically respond within 24-48 hours.</p>
        </section>
      </div>
    </div>
  );
}
