import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "About · The Observatory",
  description: "About the person behind the dust.",
};

export default function AboutPage() {
  return (
    <ComingSoon
      title="About"
      blurb="A short note on who I am and why this city exists — still drafting."
    />
  );
}
