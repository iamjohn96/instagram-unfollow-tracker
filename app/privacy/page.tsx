'use client';

import Link from 'next/link';
import { Suspense } from 'react';

function PrivacyContent() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16" aria-labelledby="privacy-heading">
      <h1 id="privacy-heading" className="text-3xl font-bold text-zinc-900 mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-zinc-400 mb-10">Last updated: May 2025</p>

      <div className="prose prose-zinc prose-sm max-w-none space-y-8 text-zinc-600 leading-relaxed">
        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">1. No Data Collection</h2>
          <p>
            SafeUnfollow processes your Instagram data <strong>entirely in your browser</strong>. No
            file you upload is ever sent to our servers. Your follower and following data never
            leaves your device.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">2. Local Storage</h2>
          <p>
            Snapshots and parsed data are stored in your browser&apos;s{' '}
            <code className="bg-zinc-100 px-1 py-0.5 rounded text-xs">localStorage</code>. This
            data is kept on your device only and is never transmitted to us. You can clear it at any
            time by clearing your browser data.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">3. Premium Accounts</h2>
          <p>
            If you purchase a Premium subscription, we store your email address in our secure
            database solely to verify your Premium status. We do not sell or share your email with
            third parties. Payment is handled by Dodo Payments and we do not store card information.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">4. Analytics</h2>
          <p>
            We may collect anonymous, aggregated usage metrics (e.g., page views) using
            privacy-preserving analytics tools. No personally identifiable information is collected
            in this process.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">5. Cookies</h2>
          <p>
            We do not use tracking cookies. We may use strictly necessary session cookies for
            authentication purposes on the Premium verification flow.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">6. Third-Party Services</h2>
          <p>
            Our payment processor, Dodo Payments, has its own privacy policy. We are not responsible
            for their data practices. Links to external sites (e.g., instagram.com) are provided for
            convenience and are not under our control.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">7. Children</h2>
          <p>
            SafeUnfollow is not directed at children under 13. We do not knowingly collect data from
            children.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">8. Changes</h2>
          <p>
            We may update this policy from time to time. Continued use of the service after changes
            constitutes acceptance of the new policy.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">9. Contact</h2>
          <p>
            Questions? Email us at{' '}
            <a
              href="mailto:privacy@safeunfollow.com"
              className="text-pink-600 hover:text-pink-700 underline"
            >
              privacy@safeunfollow.com
            </a>
            .
          </p>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-100">
        <Link
          href="/"
          className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <Suspense>
      <PrivacyContent />
    </Suspense>
  );
}
