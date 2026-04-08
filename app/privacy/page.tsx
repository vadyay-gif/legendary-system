/* eslint-disable react/no-unescaped-entities */

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
          AI Ready ("we", "our", or "us") respects your privacy. This Privacy Policy explains how information is handled when you use the AI Ready mobile application and related services.
        </p>

        <p className="text-slate-600 mb-4">
          AI Ready is an educational app designed to teach structured prompting techniques for artificial intelligence tools. Protecting user privacy is a core principle of the app's design.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          1. Information We Collect
        </h2>

        <p className="text-slate-600 mb-4">
          AI Ready does not require account creation and does not directly collect personal information such as your name, email address, phone number, or physical address.
        </p>

        <p className="text-slate-600 mb-4">
          We may collect limited, non-personal usage data through analytics tools to understand how users interact with the app and to improve functionality and user experience.
        </p>

        <p className="text-slate-600 mb-4">
          This may include:
        </p>

        <ul className="list-disc ml-6 text-slate-600 mb-4">
          <li>App interactions (e.g. screens viewed, features used)</li>
          <li>Device information (e.g. device type, operating system)</li>
          <li>Approximate location (based on IP address)</li>
        </ul>

        <p className="text-slate-600 mb-4">
          This data is collected in an aggregated and anonymized form and is not used to identify individual users.
        </p>

        <p className="text-slate-600 mb-4">
          The app may also store certain preferences locally on your device (such as lesson progress or settings). This information remains on your device and is not transmitted to our servers.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          2. Analytics
        </h2>

        <p className="text-slate-600 mb-4">
          We use third-party analytics tools, including Amplitude, to better understand how users interact with the app.
        </p>

        <p className="text-slate-600 mb-4">
          These tools may collect limited technical and usage data such as:
        </p>

        <ul className="list-disc ml-6 text-slate-600 mb-4">
          <li>App usage events</li>
          <li>Device type and operating system</li>
          <li>General location (country-level)</li>
        </ul>

        <p className="text-slate-600 mb-4">
          This information is used solely to improve app performance, usability, and feature experience.
        </p>

        <p className="text-slate-600 mb-4">
          We do not use analytics data for advertising purposes and do not track users across apps or websites.
        </p>

        <p className="text-slate-600 mb-4">
          You can learn more about Amplitude’s privacy practices here:
          <br />
          https://amplitude.com/privacy
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          3. In-App Purchases and Subscriptions
        </h2>

        <p className="text-slate-600 mb-4">
          AI Ready offers optional auto-renewing subscriptions that unlock premium content. All purchases are processed by Apple through the Apple App Store.
        </p>

        <p className="text-slate-600 mb-4">
          We do not receive, process, or store your payment information. Payment details are handled exclusively by Apple in accordance with Apple’s privacy policies.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          4. How Information Is Used
        </h2>

        <p className="text-slate-600 mb-4">
          Any data collected is used solely to:
        </p>

        <ul className="list-disc ml-6 text-slate-600 mb-4">
          <li>Improve app functionality and performance</li>
          <li>Understand how users interact with features</li>
          <li>Identify and fix technical issues</li>
        </ul>

        <p className="text-slate-600 mb-4">
          We do not sell, rent, or share personal data with third parties.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          5. Third-Party Services and AI Processing
        </h2>

        <p className="text-slate-600 mb-4">
          AI Ready may rely on trusted third-party services such as Apple App Store infrastructure, analytics providers, and AI processing services to support app functionality.
        </p>

        <p className="text-slate-600 mb-4">
          The app may process user input (such as prompts or responses) through third-party AI services to generate educational feedback. This processing is performed in real time and is not used to identify individual users.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          6. Data Security
        </h2>

        <p className="text-slate-600 mb-4">
          We take reasonable measures to protect the integrity and security of the application. However, no method of electronic transmission or storage can be guaranteed to be completely secure.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          7. Children's Privacy
        </h2>

        <p className="text-slate-600 mb-4">
          AI Ready does not knowingly collect personal information from children. Because the app does not require accounts or personal data submission, it is designed to minimize data collection.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          8. Changes to This Policy
        </h2>

        <p className="text-slate-600 mb-4">
          We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated "Last updated" date.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          9. Contact
        </h2>

        <p className="text-slate-600 mb-4">
          If you have any questions regarding this Privacy Policy, you may contact:
        </p>

        <p className="text-slate-700 font-medium">
          support@getaiready.app
        </p>
      </main>

      <Footer />
    </div>
  );
}
