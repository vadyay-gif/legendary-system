import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header current="" />

      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>

        <p className="text-slate-600 mb-4">Last updated: March 2026</p>

        <p className="text-slate-600 mb-4">
          These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use
          of the AI Ready mobile application and related services provided by AI
          Ready (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;).
        </p>

        <p className="text-slate-600 mb-4">
          By downloading or using the AI Ready app, you agree to be bound by
          these Terms. If you do not agree to these Terms, please do not use the
          application.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          1. Description of the Service
        </h2>

        <p className="text-slate-600 mb-4">
          AI Ready is an educational application designed to help users learn
          structured prompting techniques for artificial intelligence tools.
          The app provides lessons, examples, and educational content intended
          for learning purposes only.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          2. Subscriptions and Payments
        </h2>

        <p className="text-slate-600 mb-4">
          AI Ready may offer optional premium subscriptions that provide access
          to additional educational content.
        </p>

        <p className="text-slate-600 mb-4">
          Subscriptions automatically renew unless cancelled at least 24 hours
          before the end of the current billing period. Payment will be charged
          to your Apple ID account at confirmation of purchase.
        </p>

        <p className="text-slate-600 mb-4">
          You can manage or cancel your subscription at any time through your
          Apple App Store account settings.
        </p>

        <p className="text-slate-600 mb-4">
          All billing and payment processing is handled by Apple. We do not
          store or process your payment information.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Acceptable Use</h2>

        <p className="text-slate-600 mb-4">
          You agree to use the AI Ready app only for lawful purposes and in
          accordance with these Terms.
        </p>

        <p className="text-slate-600 mb-4">
          You agree not to:
        </p>

        <ul className="list-disc ml-6 text-slate-600 mb-4">
          <li>Attempt to reverse engineer or modify the application</li>
          <li>Use the app for unlawful or harmful activities</li>
          <li>Distribute or reproduce the app&apos;s content without permission</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          4. Intellectual Property
        </h2>

        <p className="text-slate-600 mb-4">
          All content, lessons, design elements, and educational materials
          provided within the AI Ready app are the intellectual property of the
          developer unless otherwise stated.
        </p>

        <p className="text-slate-600 mb-4">
          You may not copy, reproduce, distribute, or create derivative works
          from this content without prior written permission.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          5. Disclaimer of Warranties
        </h2>

        <p className="text-slate-600 mb-4">
          The AI Ready app is provided on an &ldquo;as-is&rdquo; and
          &ldquo;as-available&rdquo; basis. We make no guarantees regarding the
          accuracy, reliability, or availability of the app or its content.
        </p>

        <p className="text-slate-600 mb-4">
          Educational material provided in the app is for informational purposes
          only and should not be interpreted as professional advice.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          6. Limitation of Liability
        </h2>

        <p className="text-slate-600 mb-4">
          To the fullest extent permitted by law, the developer of AI Ready
          shall not be liable for any indirect, incidental, or consequential
          damages arising from the use of the application.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          7. Changes to These Terms
        </h2>

        <p className="text-slate-600 mb-4">
          We may update these Terms from time to time. Continued use of the app
          after changes are posted constitutes acceptance of the updated Terms.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          8. Governing Law
        </h2>

        <p className="text-slate-600 mb-4">
          These Terms shall be governed and interpreted in accordance with
          applicable laws, without regard to conflict-of-law principles.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">9. Contact</h2>

        <p className="text-slate-600 mb-4">
          If you have any questions regarding these Terms, please contact:
        </p>

        <p className="text-slate-700 font-medium">
          vadim.g@orionai.ae
        </p>
      </main>

      <Footer />
    </div>
  );
}
