import { type Metadata } from "next";
import { LegalDocument } from "@/components/site/LegalDocument";
import { getLegalDocument } from "@/lib/server/legal-content";

export const metadata: Metadata = { title: "Terms of service" };

export default function TermsOfServicePage() {
  return (
    /* Terms of Service: Content is maintained in src/content/legal/terms-of-service.md */
    <LegalDocument document={getLegalDocument("terms-of-service")} />
  );
}
