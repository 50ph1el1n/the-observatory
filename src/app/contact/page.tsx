import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Contact · The Observatory",
  description: "How to get in touch.",
};

export default function ContactPage() {
  return (
    <ComingSoon
      title="Contact"
      blurb="Forms, emails, and channels are being set up. Soon you'll be able to send a message here."
    />
  );
}
