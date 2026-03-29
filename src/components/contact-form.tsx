"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [message, setMessage] = useState<string>("");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setFormState((current) => ({ ...current, [key]: value }));
  }

  function isValidEmail(value: string) {
    return /\S+@\S+\.\S+/.test(value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formState.website.trim().length > 0) {
      setStatus("success");
      setMessage("Submission received.");
      return;
    }

    if (!formState.name.trim() || !formState.message.trim()) {
      setStatus("error");
      setMessage("Name and message are required.");
      return;
    }

    if (!isValidEmail(formState.email)) {
      setStatus("error");
      setMessage("Please provide a valid email address.");
      return;
    }

    const payload = {
      ...formState,
      submittedAt: new Date().toISOString(),
    };

    const existing = localStorage.getItem("contactSubmissions");
    const parsed = existing ? (JSON.parse(existing) as Array<Record<string, string>>) : [];
    parsed.push(payload);
    localStorage.setItem("contactSubmissions", JSON.stringify(parsed));

    setStatus("success");
    setMessage("Message saved locally. Switch to Formspree or Resend before production.");
    setFormState(initialState);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name" className="block text-sm text-zinc-200">
          Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={formState.name}
          onChange={(event) => updateField("name", event.target.value)}
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-400/40"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-zinc-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formState.email}
          onChange={(event) => updateField("email", event.target.value)}
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-400/40"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-zinc-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-400/40"
          placeholder="Tell me about your project..."
        />
      </div>

      <div className="hidden" aria-hidden>
        <label htmlFor="website">Leave this empty</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formState.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-cyan-300 px-5 py-2 text-sm font-medium text-zinc-950 transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      >
        Send message
      </button>

      {status !== "idle" ? (
        <p className={status === "success" ? "text-emerald-300" : "text-rose-300"}>{message}</p>
      ) : null}
    </form>
  );
}