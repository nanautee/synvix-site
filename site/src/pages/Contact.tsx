import { useState } from "react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-8">Contact Us</h1>
      <div className="prose prose-invert max-w-xl space-y-6 text-neutral-400 text-sm leading-relaxed">
        <p>
          Have questions, feedback, or need support? We'd love to hear from you.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Email</h2>
            <p>synvix-admin@proton.me</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">Discord</h2>
            <p>
              Join our community server for real-time support and discussions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">Response Time</h2>
            <p>We typically respond within 24-48 hours.</p>
          </div>
        </div>

        {submitted && (
          <div className="mt-8 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
            Thank you for your message! We'll get back to you soon.
          </div>
        )}
      </div>
    </div>
  );
}
