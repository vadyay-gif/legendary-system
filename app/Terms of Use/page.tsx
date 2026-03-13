import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header current="" />

      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>

        <p className="text-slate-600 mb-4">
          Last updated: March 2026
        </p>

        <p className="text-slate-600 mb-4">
          These Terms of Use govern your use of the AI Ready mobile application
          (“AI Ready”, “the App”, “we”, “our”, or “us”). By downloading,
          accessing, or using the app, you agree to be bound by these Terms.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Description of the Service</h2>
        <p className="text-slate-600 mb-4">
          AI Ready is an educational application designed to teach structured
          prompting techniques and frameworks for working with artificial
          intelligence tools. The content is provided for educational purposes only.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Subscriptions</h2>
        <p className="text-slate-600 mb-4">
          AI Ready offers optional auto-renewing subscription plans that unlock
          premium educational content within the app.
        </p>

        <p className="text-slate-600 mb-4">
          Payment will be charged to your Apple ID account at confirmation of
          purchase.
        </p>

        <p className="text-slate-600 mb-4">
          Subscriptions automatically renew unless canceled at least 24 hours
          before the end of the current billing period.
        </p>

        <p className="text-slate-600 mb-4">
          Your Apple ID account will be charged for renewal within 24 hours prior
          to the end of the current period.
        </p>

        <p className="text-slate-600 mb-4">
          You can manage or cancel your subscription at any time by going to your
          App Store account settings after purchase.
        </p>

        <p className="text-slate-600 mb-4">
          Any unused portion of a free trial period, if offered, will be forfeited
          when the user purchases a subscription.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Payments and Refunds</h2>
        <p className="text-slate-600 mb-4">
          All payments are processed through Apple. We do not have access to your
          payment details. Refund requests must be handled through Apple in
          accordance with Apple’s refund policies.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. User Responsibilities</h2>
        <p className="text-slate-600 mb-4">
          You agree to use the AI Ready app only for lawful purposes and in
          accordance with these Terms. You may not misuse the app or attempt to
          disrupt its operation.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Intellectual Property</h2>
        <p className="text-slate-600 mb-4">
          All content within the AI Ready app, including lessons, text,
          frameworks, design, and branding, is the intellectual property of the
          app developer and may not be copied, reproduced, distributed, or used
          without permission.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Disclaimer</h2>
        <p className="text-slate-600 mb-4">
          AI Ready is provided for educational purposes. The app and its content
          are provided on an “as-is” and “as-available” basis without warranties
          of any kind.
        </p>

        <p className="text-slate-600 mb-4">
          We do not guarantee that the app will always be available, error-free,
          or uninterrupted.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Limitation of Liability</h2>
        <p className="text-slate-600 mb-4">
          To the maximum extent permitted by law, the developer of AI Ready shall
          not be liable for any indirect, incidental, or consequential damages
          arising from the use of the app.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">8. Changes to the Terms</h2>
        <p className="text-slate-600 mb-4">
          We may update these Terms of Use from time to time. Continued use of
          the app after updates constitutes acceptance of the revised Terms.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">9. Contact</h2>
        <p className="text-slate-600 mb-4">
          If you have any questions about these Terms of Use, you may contact:
        </p>

        <p className="text-slate-700 font-medium">
          vadim.g@orionai.ae
        </p>
      </main>

      <Footer />
    </div>
  );
}
