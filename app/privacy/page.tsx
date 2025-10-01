import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header current="" />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-slate-600 mb-4">
          Your privacy is important to us. This Privacy Policy explains how AI Ready (“we”, “our”, or “us”) collects, uses, and protects your information when you use our website and services.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
        <p className="text-slate-600 mb-4">
          We may collect basic usage data such as your email, device information, and how you interact with the app. We do not sell or share your personal data with third parties.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. How We Use Your Information</h2>
        <p className="text-slate-600 mb-4">
          Information is used solely to improve the AI Ready experience, personalize lessons, and provide customer support.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Data Security</h2>
        <p className="text-slate-600 mb-4">
          We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Third-Party Services</h2>
        <p className="text-slate-600 mb-4">
          We may use trusted third-party services (such as analytics tools) to help us understand usage and improve features. These services may collect anonymous usage data.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Your Rights</h2>
        <p className="text-slate-600 mb-4">
          You may request deletion of your data, opt out of communications, or contact us with privacy concerns anytime.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Changes to This Policy</h2>
        <p className="text-slate-600 mb-4">
          We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised “last updated” date.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Contact Us</h2>
        <p className="text-slate-600 mb-4">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="text-slate-700 font-medium">
          support@getaiready.app
        </p>
      </main>
      <Footer />
    </div>
  );
}
