import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <AuthenticateWithRedirectCallback />
      <div id="clerk-captcha" />
    </div>
  );
}
