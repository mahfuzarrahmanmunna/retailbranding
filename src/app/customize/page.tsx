import type { Metadata } from "next";
import { CustomizeWizard } from "@/components/customize-wizard";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Custom Sign Builder",
  description: "Configure your signboard step by step — size, materials, lighting and installation — and get an estimate or a formal quotation.",
  alternates: { canonical: "/customize" },
};

export default function CustomizePage() {
  return (
    <>
      <PageHeader
        eyebrow="Custom Sign Builder"
        title="Design a Sign That Fits Your Space"
        bn="আপনার সাইনবোর্ড কাস্টমাইজ করুন"
        crumbs={[{ label: "Sign Builder" }]}
      >
        Six short steps. Your estimate updates as you go, and nothing is produced until you approve a formal quotation.
      </PageHeader>
      <div className="container-page py-10">
        <CustomizeWizard />
      </div>
    </>
  );
}
