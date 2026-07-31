import type { Metadata } from "next";
import CareersHero from "@/components/sections/careers/CareersHero";
import TheCompany from "@/components/sections/careers/TheCompany";
import Principles from "@/components/sections/careers/Principles";
import OpenRoles from "@/components/sections/careers/OpenRoles";
import GeneralInterest from "@/components/sections/careers/GeneralInterest";
import { roles } from "@/lib/careers";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Help build a different kind of AI company. ATB. is building small, amplified teams that ship AI products for the customer frontline — see the open roles and how we work.",
  alternates: { canonical: "/careers" },
};

/**
 * JobPosting structured data, one entry per open role — the schema search engines
 * read for job results, and the passage LLMs quote when asked what ATB. is hiring
 * for.
 *
 * Deliberately conservative: every field is something the copy states. There is no
 * `employmentType` because the copy does not say full-time, no `baseSalary`
 * because no range is published, and no `validThrough` because no closing date is
 * set. Inventing any of them would put an unverified claim in machine-readable
 * form, which is exactly what the copy's publication notes forbid in prose.
 *
 * `datePosted` comes from the role data rather than the build clock — see the note
 * on `Role` in lib/careers.ts.
 */
const jobsJsonLd = roles.map((role) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: role.title,
  description: role.about,
  datePosted: role.datePosted,
  directApply: true,
  hiringOrganization: {
    "@type": "Organization",
    name: site.fullName,
    alternateName: site.name,
    url: site.domain,
  },
  // The physical location alone, which is what a hybrid role is. `jobLocationType:
  // TELECOMMUTE` and `applicantLocationRequirements` are the fully-remote pair —
  // setting either alongside a real `jobLocation` is contradictory and is a known
  // source of Search Console warnings. The copy says "Hybrid", so the place is the
  // claim and the remote fields stay off.
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: role.location,
      addressCountry: "GB",
    },
  },
  url: `${site.domain}/careers#open-roles`,
}));

export default function CareersPage() {
  return (
    <>
      {jobsJsonLd.map((job, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(job) }}
        />
      ))}
      <CareersHero />
      <TheCompany />
      <Principles />
      <OpenRoles />
      <GeneralInterest />
    </>
  );
}
