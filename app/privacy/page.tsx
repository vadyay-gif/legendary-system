export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-slate-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        This Privacy Policy explains how we collect, use, and protect your information
        when you use the AI Ready app and website.
      </p>

      <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect limited personal information such as email addresses (if you
        provide them), usage data, and device information to improve the app.
      </p>

      <h2 className="text-xl font-semibold mt-6">2. How We Use Information</h2>
      <p className="mb-4">
        Information is used only to provide and improve our services, ensure proper
        functionality, and communicate updates or support messages.
      </p>

      <h2 className="text-xl font-semibold mt-6">3. Data Sharing</h2>
      <p className="mb-4">
        We do not sell or share your personal information with third parties, except as
        required by law or to comply with legal processes.
      </p>

      <h2 className="text-xl font-semibold mt-6">4. Security</h2>
      <p className="mb-4">
        We take reasonable measures to protect your data, but please note that no method
        of transmission over the Internet is 100% secure.
      </p>

      <h2 className="text-xl font-semibold mt-6">5. Your Rights</h2>
      <p className="mb-4">
        You may request access to, correction of, or deletion of your personal data by
        contacting us at the email below.
      </p>

      <h2 className="text-xl font-semibold mt-6">6. Contact</h2>
      <p>
        If you have any questions about this Privacy Policy, you can contact us at:  
        <strong> support@getaiready.app </strong>
      </p>

      <p className="mt-8 text-sm text-slate-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
