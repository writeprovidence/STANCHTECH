'use client';

import Link from "next/link";
import { ChevronRight } from "lucide-react";

const sections = [
  {
    title: "Introduction",
    content: `Stanch Tech Limited is thoroughly committed to protecting the privacy of our site visitors and customers. We fully appreciate and respect the importance of privacy on the Internet. We respect each visitor's and customer's right to personal privacy. To this end, we collect and use information throughout our website only as disclosed in this Privacy Policy.

This policy covers:
• How we collect information from you
• How we protect your information
• How we use and share personal information you provide when using our website
• General information in line with applicable laws and regulations

This policy does not apply to the practices of third-party agents or persons over whom we do not exercise direct control, employment, or management.`,
  },
  {
    title: "Consent",
    content: `By using this site, you consent to our Privacy Policy and confirm that you have the legal capacity to give such consent. If you do not agree to these terms, you may discontinue use of this website at this stage. Continued use of our site constitutes your acceptance of this policy and any updates made to it.`,
  },
  {
    title: "Collection of Personally Identifiable Information",
    content: `We collect personally identifiable information — including but not limited to your name, email address, phone number, physical/delivery address, location, and payment details (when you make a purchase) — when you set up an account with Stanch Tech or place an order.

While you may browse certain sections of our site without registering, specific activities such as placing orders or accessing your order history require you to create an account. We may use your contact information to send you relevant updates, offers, and information based on your activity and interests on our platform. All information and personal data are freely provided by you to us via secure technologies such as JWT and web tokens.`,
  },
  {
    title: "Use of Demographic and Profile Data",
    content: `We use your personal information to provide the services you request, process and fulfill orders (including shipping arrangements and order confirmations), resolve disputes, troubleshoot problems, prevent fraud, collect fees owed, and inform you of product updates and offers.

In our efforts to continually improve our platform and service offerings, we analyse demographic and profile data about our users' activity. We use your IP address to help diagnose server issues and to administer our website. Occasionally, we may invite you to complete optional online surveys that ask for contact and demographic information; this data is used to tailor your experience and display content more relevant to your preferences. We will always provide you with the ability to opt-out of marketing communications.`,
  },
  {
    title: "Cookies",
    content: `We use cookies to collect information and enhance your browsing experience. A "cookie" is a small piece of information stored by a web server on your browser so it can be later retrieved. Cookies help the browser remember information specific to a given user.

Stanch Tech places both permanent and temporary cookies on your device. These cookies do not contain any personally identifiable information or private data. We may combine session information gathered through cookies with personally identifiable information to better understand and improve your online experience, and to determine which products and services are most relevant to you.`,
  },
  {
    title: "Governing Principles of Data Processing",
    content: `a. Your personal data on the Stanch Tech platform shall be collected and processed in accordance with a legitimate and lawful purpose to which you have consented. Further processing may only be done for archiving, scientific research, historical research, or statistical purposes in the public interest, in line with applicable regulations.

b. Personal data shall be adequate, accurate, and collected without prejudice to the dignity of any individual.

c. Personal data shall be stored only for the period within which it is reasonably needed and shall be secured against all foreseeable hazards including theft, cyberattack, viral attack, unauthorised dissemination, manipulation, and physical damage.

d. Our data collection practices reflect that we owe a duty of care to you, our customer.

e. We shall remain accountable in line with applicable laws and regulations.`,
  },
  {
    title: "Sharing of Personal Information",
    content: `We may share your personal information with affiliated entities and trusted third-party service providers who assist us in operating our website, conducting our business, or serving you — provided they agree to keep this information confidential.

We may disclose personal information if required by law or in good faith that such disclosure is necessary to: respond to legal processes or court orders; enforce our Terms or Privacy Policy; respond to claims that content violates third-party rights; or protect the rights, property, or safety of our users or the general public.

In the event of a merger, acquisition, or sale of company assets, your personal information may be transferred to the acquiring entity, subject to equivalent privacy obligations.`,
  },
  {
    title: "Personal Data Retention Period",
    content: `Stanch Tech will retain your personal information only for as long as necessary to fulfil the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by applicable law (such as for tax, accounting, or other legal requirements).

Upon a request for account closure, your account will be deactivated, but historical records may be retained as required by law or for legitimate business purposes. Further active processing of personal information related to a closed account will cease from the time of closure, except as required by legal or regulatory obligations.`,
  },
  {
    title: "Your Privacy Rights",
    content: `In accordance with applicable data protection laws, including the Nigeria Data Protection Act (NDPA), you have the right to:
• Access personal data we hold about you
• Request correction of inaccurate or incomplete data
• Object to or restrict the processing of your personal data
• Request the deletion of your personal data

To exercise any of these rights, please contact us via email at stanchtechltd@gmail.com, with the subject line: "Data Privacy Request". We will respond to your request in accordance with applicable data protection laws.`,
  },
  {
    title: "Links to Other Sites",
    content: `Our website may contain links to third-party websites that have their own privacy policies. Stanch Tech is not responsible for the privacy practices or content of those external sites. We encourage you to review the privacy policy of any site you visit through links on our platform.`,
  },
  {
    title: "Security Precautions",
    content: `We maintain stringent security measures to protect against the loss, misuse, and unauthorised alteration of the information under our control. When you access your account or place an order, we use secure server technology to protect your data.

While we apply industry best practices to safeguard your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security and cannot be held responsible for the illegal acts of hackers, provided we have taken all reasonable precautions. You are responsible for keeping your account credentials confidential and for any activity that occurs under your account.`,
  },
  {
    title: "Choice / Opt-Out",
    content: `Stanch Tech provides all registered users with the opportunity to opt out of receiving non-essential communications — such as promotional emails and marketing newsletters — from us or on behalf of our partners.

To remove your contact information from our mailing lists, please send an email to stanchtechltd@gmail.com with the subject line "Unsubscribe". You may also unsubscribe directly from the one-click unsubscribe link found at the bottom of every marketing email we send.`,
  },
  {
    title: "Third-Party Advertising",
    content: `We may use third-party advertising partners to serve relevant advertisements when you visit our website. These companies may use data about your visits to this and other websites — excluding personally identifiable details such as your name, address, email address, or telephone number — to present advertisements for goods and services that may interest you.`,
  },
  {
    title: "Contact & Complaints",
    content: `If you believe your privacy rights have been infringed upon, or if you have any questions or concerns regarding this Privacy Policy, please contact our Data Protection Officer:

Email: stanchtechltd@gmail.com
Subject: Privacy Complaint / Enquiry

We are committed to resolving all privacy-related concerns promptly and in accordance with applicable data protection laws.`,
  },
  {
    title: "Notification of Changes",
    content: `Stanch Tech reserves the right to update or amend this Privacy Policy from time to time without prior notice. The most current version of this policy will always be available on our website. We encourage you to review this page periodically. Any changes to this Privacy Policy become effective upon posting to this page.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen pt-20">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[320px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0b1a2e]" />

        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 mt-6">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.04em" }}
          >
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.2em]">
            <Link
              href="/"
              className="text-white hover:text-blue-400 transition-colors"
              style={{ fontFamily: "var(--font-body)", fontSize: "16px" }}
            >
              Home
            </Link>
            <ChevronRight size={14} className="text-blue-400" />
            <span className="text-white/60" style={{ fontFamily: "var(--font-body)", fontSize: "16px" }}>
              Privacy Policy
            </span>
          </div>
        </div>
      </section>

      {/* --- INTRO BANNER --- */}
      <div style={{ backgroundColor: "#f0f4ff", borderLeft: "4px solid #1e40af", padding: "20px 8%", margin: "0" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "#374151", lineHeight: "1.7" }}>
          <strong style={{ fontFamily: "var(--font-heading)" }}>Effective Date: 1st of June 2026</strong>
          &nbsp;— Stanch Tech Limited is committed to protecting your personal information and your right to privacy. Please read this policy carefully to understand how we collect, use, and safeguard your data.
        </p>
      </div>

      {/* --- CONTENT SECTION --- */}
      <section
        style={{
          paddingTop: "60px",
          paddingBottom: "80px",
          paddingLeft: "8%",
          paddingRight: "8%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "48px",
            fontFamily: "var(--font-body)",
            lineHeight: "1.85",
            fontSize: "16px",
            color: "#374151",
          }}
        >
          {sections.map((section, index) => (
            <div key={index}>
              <h2
                className="text-xl font-bold text-[#0b1a2e] mb-4"
                style={{ fontFamily: "var(--font-heading)", borderBottom: "2px solid #e5e7eb", paddingBottom: "10px" }}
              >
                {index + 1}. {section.title}
              </h2>
              <div style={{ whiteSpace: "pre-line" }}>
                {section.content}
              </div>
            </div>
          ))}

          {/* Footer Rule */}
          <div className="pt-8 border-t-2 border-gray-200 mt-4">
            <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
              Last Updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              {" "}· Stanch Tech Limited · stanchtechltd@gmail.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
