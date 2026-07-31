import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy.
 *
 * `script-src` carries `'unsafe-inline'`, so BE CLEAR ABOUT WHAT THIS IS: it is
 * not an XSS defence. Three things need inline script — the Organization and
 * WebSite JSON-LD in app/layout.tsx, the per-role JobPosting JSON-LD on
 * /careers, and Next's own bootstrap. Nonces are the fix for that, but a nonce
 * has to be minted per request, which means middleware, which means this site
 * stops being static. Every route here prerenders; trading that away for a
 * directive that inline JSON-LD would immediately reopen is the wrong deal.
 *
 * What the rest of the policy buys is real and independent of that:
 *   object-src 'none'      — no Flash/applet embed vector
 *   base-uri 'self'        — an injected <base> can't re-point every relative URL
 *   form-action 'self'     — a form can't be repointed to an attacker's collector
 *   frame-ancestors 'none' — no clickjacking; also supersedes X-Frame-Options
 *   default-src 'self'     — no unexpected third-party fetch of any kind
 *
 * `img-src` allows `data:` and `blob:` because next/image emits both. `font-src`
 * is self-only: next/font self-hosts the two Google faces at build time, so
 * nothing is fetched from fonts.gstatic.com at runtime. `'unsafe-eval'` is dev
 * only — React Refresh needs it and the production bundle does not.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Every route, including the static assets under /_next.
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Nothing on the site asks for any of these, so refuse them outright
          // rather than leaving the door open for something added later.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          // Two years, subdomains included. Deliberately NOT `preload`: that
          // submits the domain to a browser-baked list and is slow to undo, so
          // it should be a decision taken on its own, not a side effect of this.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
