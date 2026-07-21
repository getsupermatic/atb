"use client";

import { useState } from "react";

/**
 * Insight sign-up (§7.10). Accessible, validated capture with success/error
 * states. UI is stubbed this phase — no provider wired yet.
 */
export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus("error");
      return;
    }
    // TODO: wire to email provider. Stubbed for this phase.
    setStatus("success");
    setEmail("");
  }

  if (status === "success") {
    return (
      <p role="status" className="text-[color:var(--color-aqua)]">
        Thanks — you&rsquo;re on the list. We&rsquo;ll be in touch with the thinking, no noise.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      {/* Honeypot for basic spam protection */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="signup-email" className="sr-only">
          Work email
        </label>
        <input
          id="signup-email"
          type="email"
          inputMode="email"
          placeholder="Work email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          className="min-h-[48px] flex-1 rounded-full border px-5 text-[color:var(--color-cream)] placeholder:text-[color:var(--color-aqua)]/70"
          style={{
            background: "rgba(15,46,51,0.5)",
            borderColor: status === "error" ? "var(--color-lime)" : "var(--border)",
          }}
        />
        <button type="submit" className="btn btn-primary justify-center">
          Subscribe
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-2 text-sm text-[color:var(--color-aqua)]">
          Enter a valid email address so we can reach you.
        </p>
      )}
    </form>
  );
}
