import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header current="" />

      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="text-slate-600 mb-4">Last updated: March 2026</p>

        <p className="text-slate-600 mb-4">
          AI Ready (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy. This
          Privacy Policy explains how information is handled when you use the AI Ready
          mobile application and related services.
        </p>

        <p className="text-slate-600 mb-4">
          AI Ready is an educational app designed to teach structured prompting
          techniques for artificial intelligence tools. Protecting user privacy is a
          core principle of the app&apos;s design.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Information We Collect</h2>

        <p className="text-slate-600 mb-4">
          AI Ready does not require account creation and does not directly collect
          personal information such as your name, email address, phone number, or
          physical address.
        </p>

        <p className="text-slate-600 mb-4">
          The app may collect limited anonymous usage information through third-party
          analytics tools in order to understand how features are used and to improve
          the user experience. This information does not identify individual users.
        </p>

        <p className="text-slate-600 mb-4">
          The app may also store certain preferences locally on your device (such as
          lesson progress or settings) using device storage. This information remains
          on your device and is not transmitted to our servers.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          2. In-App Purchases and Subscriptions
        </h2>

        <p className="text-slate-600 mb-4">
          AI Ready offers optional auto-renewing subscriptions that unlock premium
          content. All purchases are processed by Apple through the Apple App Store.
        </p>

        <p className="text-slate-600 mb-4">
          We do not receive, process, or store your payment information. Payment
          details are handled exclusively by Apple in accordance with Apple&apos;s
          privacy policies.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. How Information Is Used</h2>

        <p className="text-slate-600 mb-4">
          Any anonymous usage data collected is used solely to:
        </p>

        <ul className="list-disc ml-6 text-slate-600 mb-4">
          <li>Improve app functionality and performance</li>
          <li>Understand how users interact with features</li>
          <li>Identify technical issues or bugs</li>
        </ul>

        <p className="text-slate-600 mb-4">
          We do not sell, rent, or share personal data with third parties.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Third-Party Services</h2>

        <p className="text-slate-600 mb-4">
          AI Ready may rely on trusted third-party services such as Apple&apos;s App Store
          infrastructure and analytics tools to support app functionality and
          distribution.
        </p>

        <p className="text-slate-600 mb-4">
          These third-party services may collect anonymous technical information such
          as device type, operating system version, or app usage metrics.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Data Security</h2>

        <p className="text-slate-600 mb-4">
          We take reasonable measures to protect the integrity and security of the
          application. However, no method of electronic transmission or storage can be
          guaranteed to be completely secure.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Children&apos;s Privacy</h2>

        <p className="text-slate-600 mb-4">
          AI Ready does not knowingly collect personal information from children.
          Because the app does not require accounts or personal data submission, it is
          designed to minimize data collection for all users.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Your Rights</h2>

        <p className="text-slate-600 mb-4">
          Because AI Ready does not maintain user accounts or personal data records,
          most user information remains under the control of the device owner.
        </p>

        <p className="text-slate-600 mb-4">
          If you have questions about privacy or believe data has been collected
          incorrectly, you may contact us using the information below.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">8. Changes to This Policy</h2>

        <p className="text-slate-600 mb-4">
          We may update this Privacy Policy from time to time to reflect improvements
          to the app, legal requirements, or platform policy updates.
        </p>

        <p className="text-slate-600 mb-4">
          When changes occur, the updated policy will be published on this page with a
          revised &ldquo;Last updated&rdquo; date.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">9. Contact</h2>

        <p className="text-slate-600 mb-4">
          If you have any questions regarding this Privacy Policy, you may contact the
          developer at:
        </p>

        <p className="text-slate-700 font-medium">vadim.g@orionai.ae</p>
      </main>

      <Footer />
    </div>
  );
}
