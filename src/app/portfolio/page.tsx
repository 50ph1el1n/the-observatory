import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Portfolio · The Observatory",
  description: "Selected side projects and experiments.",
};

export default function PortfolioPage() {
  return (
    <ComingSoon
      title="Portfolio"
      blurb="Selected side projects, experiments, and the tools I built along the way. Currently in the workshop."
    />
  );
}
