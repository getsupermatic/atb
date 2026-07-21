import Image from "next/image";
import Link from "next/link";
import FooterLogo from "./brand/FooterLogo";
import SignupForm from "./SignupForm";
import { footerNav, site } from "@/lib/site";

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23zm-1.16 17.52h1.83L7.02 4.13H5.05l12.03 15.64z" />
    </svg>
  );
}

/**
 * Deep super-footer (§7.10): a closing statement paired with the Insights
 * sign-up, grouped navigation, and a base row carrying the logo, social links
 * and copyright — petrol / smoked-glass material.
 */
export default function Footer() {
  return (
    <footer className="theme-dark relative overflow-hidden">
      <Image
        src="/images/glass-planes-footer.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,46,51,0.55), rgba(15,46,51,0.75))",
        }}
      />
      <div className="shell relative z-10 py-20 lg:py-28">
        {/* Statement + supporting paragraph */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-20">
          <div>
            <p
              className="max-w-[15ch] font-[600] text-[color:var(--color-cream)]"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-5xl)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              AI-native products for the customer frontline. Operations. Commerce. Marketing.
            </p>
            <Link href="/contact" className="btn btn-primary mt-8">
              Start a conversation
            </Link>
          </div>

          <div className="flex flex-col">
            <div className="mt-8 lg:mt-auto lg:pt-8">
              <h2 className="text-[color:var(--color-cream)]" style={{ fontSize: "var(--text-2xl)" }}>
                Insights
              </h2>
              <p className="mb-5 mt-2 max-w-[52ch] text-[color:var(--color-aqua)]">
                No noise, just the thinking on frontier AI.
              </p>
              <SignupForm />
            </div>
          </div>
        </div>

        {/* Navigation columns */}
        <nav
          className="mt-20 grid grid-cols-2 gap-8 border-t pt-12 md:grid-cols-4"
          style={{ borderColor: "var(--border)" }}
          aria-label="Footer"
        >
          {Object.entries(footerNav).map(([group, links]) => (
            <div key={group}>
              <h3 className="eyebrow mb-4" style={{ color: "var(--color-aqua)" }}>
                {group}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.95rem] text-[color:var(--color-cream)]/85 transition-colors hover:text-[color:var(--color-lime)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {group === "More" && (
                <div className="mt-5 flex items-center gap-4 text-[color:var(--color-cream)]/85">
                  <a
                    href={site.social.linkedin}
                    aria-label="ATB. on LinkedIn"
                    rel="me noopener"
                    className="transition-colors hover:text-[color:var(--color-lime)]"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href={site.social.x}
                    aria-label="ATB. on X"
                    rel="me noopener"
                    className="transition-colors hover:text-[color:var(--color-lime)]"
                  >
                    <XIcon />
                  </a>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Base — logo + social left, copyright right */}
        <div
          className="footer-base mt-16 flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--border)" }}
        >
          <FooterLogo height={26} />
          <p className="text-xs text-[color:var(--color-aqua)]/80">
            Copyright © 2026 {site.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
