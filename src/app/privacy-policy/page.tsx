import { type Metadata } from "next";
import { LegalDocument } from "@/components/site/LegalDocument";
import { getLegalDocument } from "@/lib/server/legal-content";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPolicyPage() {
  return (
    /* Privacy Policy: Content is maintained in src/content/legal/privacy-policy.md */
    <LegalDocument document={getLegalDocument("privacy-policy")} />
  );
}
