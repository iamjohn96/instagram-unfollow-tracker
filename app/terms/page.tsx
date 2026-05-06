'use client';

import Link from 'next/link';
import { Suspense } from 'react';

function TermsContent() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16" aria-labelledby="terms-heading">
      <h1 id="terms-heading" className="text-3xl font-bold text-zinc-900 mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-zinc-400 mb-10">Last updated: May 2025</p>

      <div className="prose prose-zinc prose-sm max-w-none space-y-8 text-zinc-600 leading-relaxed">
        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">1. Acceptance</h2>
          <p>
            By using SafeUnfollow (&ldquo;the Service&rdquo;), you agree to these Terms of Service.
            If you do not agree, do not use the Service.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">2. Description</h2>
          <p>
            SafeUnfollow is a client-side tool that analyzes Instagram data exports to show you who
            does not follow you back. All processing happens in your browser. We are not affiliated
            with or endorsed by Instagram or Meta Platforms, Inc.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">3. Permitted Use</h2>
          <p>You may use the Service only for lawful, personal purposes. You must not:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Use the Service to violate Instagram&apos;s Terms of Service</li>
            <li>Attempt to reverse-engineer or scrape the Service</li>
            <li>Use the Service to harass or harm others</li>
            <li>Resell or sublicense access to the Service</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">4. Premium Subscriptions</h2>
          <p>
            Premium features are available via a paid subscription processed by Dodo Payments.
            Subscriptions are billed monthly or annually. You may cancel at any time; cancellation
            takes effect at the end of the current billing period. Refunds are governed by Dodo
            Payments&apos; refund policy.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">
            5. Disclaimer of Warranties
          </h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; without warranties of any kind, express or
            implied. We do not guarantee accuracy of results, uninterrupted availability, or fitness
            for any particular purpose.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">
            6. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, SafeUnfollow and its operators shall not be
            liable for any indirect, incidental, special, consequential, or punitive damages arising
            from your use of the Service.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">
            7. Intellectual Property
          </h2>
          <p>
            All content, design, and code of the Service are the property of SafeUnfollow. You may
            not copy, reproduce, or redistribute any part of the Service without written permission.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">8. Changes to Terms</h2>
          <p>
            We may update these Terms at any time. Continued use of the Service after changes
            constitutes your acceptance of the new Terms.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">9. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the jurisdiction in which SafeUnfollow operates,
            without regard to conflict of law provisions.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">10. Contact</h2>
          <p>
            Questions about these Terms? Email us at{' '}
            <a
              href="mailto:legal@safeunfollow.com"
              className="text-pink-600 hover:text-pink-700 underline"
            >
              legal@safeunfollow.com
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

export default function TermsPage() {
  return (
    <Suspense>
      <TermsContent />
    </Suspense>
  );
}
