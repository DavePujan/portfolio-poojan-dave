import emailjs from '@emailjs/browser'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

type ContactForm = {
  name: string
  email: string
  message: string
}

const initialState: ContactForm = {
  name: '',
  email: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialState)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
  const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
  const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

  const canSendWithEmailJs = useMemo(() => {
    return Boolean(emailServiceId && emailTemplateId && emailPublicKey)
  }, [emailPublicKey, emailServiceId, emailTemplateId])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      return
    }

    setStatus('sending')

    try {
      if (canSendWithEmailJs) {
        await emailjs.send(emailServiceId!, emailTemplateId!, form, emailPublicKey!)
      } else {
        window.location.href = `mailto:your@email.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom:%20${encodeURIComponent(form.email)}`
      }

      setForm(initialState)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="mx-auto w-full max-w-7xl px-6 pb-24 md:px-10">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur-xl md:p-10">
        <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Contact Me</h2>
        <p className="mt-3 text-slate-300">Open to internships, freelance, and product engineering collaborations.</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-4">
            <div className="rounded-lg border border-neonCyan/30 bg-neonCyan/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Response</p>
              <p className="mt-1 font-display text-xl font-semibold text-neonCyan">Within 24 Hours</p>
            </div>
            <div className="rounded-lg border border-neonBlue/30 bg-neonBlue/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Availability</p>
              <p className="mt-1 font-display text-xl font-semibold text-neonBlue">Internships + Freelance</p>
            </div>
            <div className="rounded-lg border border-neonGreen/30 bg-neonGreen/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Focus</p>
              <p className="mt-1 font-display text-xl font-semibold text-neonGreen">System-Driven Frontend</p>
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.16em] text-slate-300">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Your name"
                className="w-full rounded-lg border border-white/15 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-neonCyan/70"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.16em] text-slate-300">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="you@domain.com"
                className="w-full rounded-lg border border-white/15 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-neonCyan/70"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.16em] text-slate-300">Message</label>
              <textarea
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                placeholder="Tell me about your project or role"
                rows={5}
                className="w-full rounded-lg border border-white/15 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-neonCyan/70"
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neonGreen/45 bg-neonGreen/15 px-6 py-3 text-sm font-semibold text-neonGreen transition duration-200 hover:-translate-y-0.5 hover:bg-neonGreen/25 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={status === 'sending'}
            >
              <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>

        <div className="mt-5 text-sm text-slate-300">
          {status === 'sent' && <p className="rounded-lg border border-neonGreen/25 bg-neonGreen/10 px-3 py-2 text-neonGreen">Message sent successfully.</p>}
          {status === 'error' && <p className="rounded-lg border border-rose-400/35 bg-rose-400/10 px-3 py-2 text-rose-300">Please complete all fields and try again.</p>}
          {!canSendWithEmailJs && (
            <p className="rounded-lg border border-neonBlue/25 bg-neonBlue/10 px-3 py-2 text-neonBlue">EmailJS is not configured yet. Falling back to your default email client.</p>
          )}
        </div>

        <div className="mt-8 space-y-1 text-sm text-slate-300">
          <p>
            Email:
            <a href="mailto:your@email.com" className="ml-2 cursor-pointer text-neonCyan transition-colors duration-200 hover:text-neonGreen">
              your@email.com
            </a>
          </p>
          <p>
            LinkedIn:
            <a
              href="https://linkedin.com/in/yourname"
              target="_blank"
              rel="noreferrer"
              className="ml-2 cursor-pointer text-neonCyan transition-colors duration-200 hover:text-neonGreen"
            >
              linkedin.com/in/yourname
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
