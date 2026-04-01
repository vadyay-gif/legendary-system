export const metadata = {
  title: "Privacy Policy | AI Ready",
  description: "Privacy Policy for the AI Ready Android app.",
};

export default function AndroidPrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">
          Last updated: March 2026
        </p>

        <p className="mb-6">
          AI Ready (“we”, “our”, or “us”) respects your privacy. This Privacy
          Policy explains how information is handled when you use the AI Ready
          mobile application and related services.
        </p>

        <p className="mb-8">
          AI Ready is an educational app designed to help users learn effective
          prompting techniques for artificial intelligence tools.
        </p>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
            1. Information We Collect
          </h2>
          <p className="mb-4">
            AI Ready does not require account creation and does not directly
            collect personal information such as your name, email address, phone
            number, or physical address.
          </p>

          <h3 className="mb-2 text-lg font-medium text-slate-900 dark:text-white">
            a) Information Collected Automatically
          </h3>
          <p className="mb-3">
            The app may collect limited information automatically through
            third-party services in order to improve functionality and support
            advertising. This may include:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              Device information (such as device type, operating system, and
              identifiers)
            </li>
            <li>Approximate location (derived from IP address)</li>
            <li>App usage data (such as interactions within the app)</li>
            <li>
              Diagnostic information (such as crash logs and performance data)
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
            2. Advertising (AdMob)
          </h2>
          <p className="mb-4">
            AI Ready uses <strong>Google AdMob (Google Mobile Ads SDK)</strong>{" "}
            to display advertisements.
          </p>
          <p className="mb-3">
            AdMob may collect and process certain data to provide personalized
            and non-personalized ads, including:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Advertising identifiers (such as Google Advertising ID)</li>
            <li>IP address and approximate location</li>
            <li>Device and usage information</li>
            <li>Interaction data with ads</li>
          </ul>

          <p className="mb-3 mt-4">
            This data may be shared with Google and its partners for:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Advertising and ad personalization</li>
            <li>Analytics and performance measurement</li>
            <li>Fraud prevention and security</li>
          </ul>

          <p className="mb-2 mt-4">For more information, please review:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              Google Privacy Policy:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 text-blue-600 dark:text-blue-400"
              >
                https://policies.google.com/privacy
              </a>
            </li>
            <li>
              How Google uses data:{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 text-blue-600 dark:text-blue-400"
              >
                https://policies.google.com/technologies/ads
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
            3. Data Storage
          </h2>
          <p className="mb-3">
            AI Ready stores certain information locally on your device, such as:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Lesson progress</li>
            <li>App preferences</li>
          </ul>
          <p className="mt-4">This data is not transmitted to our servers.</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
            4. In-App Purchases and Subscriptions
          </h2>
          <p>
            AI Ready offers optional subscriptions processed through app store
            providers (such as Google Play or Apple App Store).
          </p>
          <p className="mt-4">
            We do not collect or store payment information. All billing is
            handled by the respective platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
            5. Data Sharing
          </h2>
          <p className="mb-3">We do not sell your personal information.</p>
          <p className="mb-3">
            However, certain data may be shared with third-party services (such
            as Google AdMob) for:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Advertising</li>
            <li>Analytics</li>
            <li>Security and fraud prevention</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
            6. Data Retention
          </h2>
          <p className="mb-4">We do not store personal data on our servers.</p>
          <p>
            Any data processed by third-party services (such as AdMob) is
            handled according to their respective privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
            7. Data Deletion
          </h2>
          <p className="mb-4">
            Since AI Ready does not store user data on our servers and does not
            provide account functionality, there is no user data stored by us
            that can be deleted upon request.
          </p>
          <p>Users can remove locally stored data by uninstalling the app.</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
            8. Security
          </h2>
          <p>
            We take reasonable measures to protect information handled by the
            app. Data transmitted through third-party services is encrypted in
            transit.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
            9. Children’s Privacy
          </h2>
          <p>
            AI Ready is not directed to children under the age of 13. We do not
            knowingly collect personal information from children.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
            10. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Updates will be
            reflected by revising the “Last updated” date.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
            11. Contact
          </h2>
          <p className="mb-2">If you have any questions, you can contact us at:</p>
          <p>
            <a
              href="mailto:aivadimg@gmail.com"
              className="underline underline-offset-2 text-blue-600 dark:text-blue-400"
            >
              aivadimg@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
