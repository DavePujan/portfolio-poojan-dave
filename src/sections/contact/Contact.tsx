import emailjs from '@emailjs/browser'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

type ContactForm = {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof ContactForm, string>>

const initialState: ContactForm = {
  name: '',
  email: '',
  message: '',
}

const contactProfile = {
  email: 'hello@poojandave.dev',
  linkedin: 'https://linkedin.com/in/poojan-dave',
  github: 'https://github.com/DavePujan',
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialState)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [fallbackMessage, setFallbackMessage] = useState('')

  const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
  const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
  const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

  const canSendWithEmailJs = useMemo(() => {
    return Boolean(emailServiceId && emailTemplateId && emailPublicKey)
  }, [emailPublicKey, emailServiceId, emailTemplateId])

  const validateForm = () => {
    const errors: FormErrors = {}

    if (!form.name.trim()) {
      errors.name = 'Please enter your name.'
    }

    if (!form.email.trim()) {
      errors.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Please enter a valid email address.'
    }

    if (!form.message.trim()) {
      errors.message = 'Please share a short project brief.'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFallbackMessage('')

    if (!validateForm()) {
      setStatus('error')
      return
    }

    setStatus('sending')

    try {
      if (canSendWithEmailJs) {
        await emailjs.send(emailServiceId!, emailTemplateId!, form, emailPublicKey!)
      } else {
        setFallbackMessage('Live email delivery is not configured in this environment. Please use the email link below and I will reply quickly.')
      }

      setForm(initialState)
      setFormErrors({})
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="mx-auto w-full max-w-7xl px-6 pb-24 md:px-10">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur-xl md:p-10">
        <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Let’s Build Something Serious</h2>
        <p className="mt-3 max-w-3xl text-slate-300">
          If you are hiring for product engineering, backend-heavy frontend work, or full-stack system design ownership, send context and I will respond with a concrete plan.
        </p>
        <p className="mt-2 text-sm text-neonCyan">Best way to reach me is email with project context, timeline, and expected outcomes.</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-4">
            <div className="rounded-lg border border-neonCyan/30 bg-neonCyan/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Response</p>
              <p className="mt-1 font-display text-xl font-semibold text-neonCyan">Within 24 Hours</p>
            </div>
            <div className="rounded-lg border border-neonBlue/30 bg-neonBlue/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Availability</p>
              <p className="mt-1 font-display text-xl font-semibold text-neonBlue">Internships + Freelance + Contract</p>
            </div>
            <div className="rounded-lg border border-neonGreen/30 bg-neonGreen/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Focus</p>
              <p className="mt-1 font-display text-xl font-semibold text-neonGreen">Frontend + Systems + Observability</p>
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.16em] text-slate-300">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, name: event.target.value }))
                  setFormErrors((prev) => ({ ...prev, name: undefined }))
                }}
                placeholder="Your name"
                className="w-full rounded-lg border border-white/15 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-neonCyan/70"
                required
              />
              {formErrors.name && <p className="text-xs text-rose-300">{formErrors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.16em] text-slate-300">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, email: event.target.value }))
                  setFormErrors((prev) => ({ ...prev, email: undefined }))
                }}
                placeholder="you@domain.com"
                className="w-full rounded-lg border border-white/15 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-neonCyan/70"
                required
              />
              {formErrors.email && <p className="text-xs text-rose-300">{formErrors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.16em] text-slate-300">Message</label>
              <textarea
                value={form.message}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, message: event.target.value }))
                  setFormErrors((prev) => ({ ...prev, message: undefined }))
                }}
                placeholder="Share your role, current constraints, and what success looks like"
                rows={5}
                className="w-full rounded-lg border border-white/15 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-neonCyan/70"
                required
              />
              {formErrors.message && <p className="text-xs text-rose-300">{formErrors.message}</p>}
            </div>

            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neonGreen/45 bg-neonGreen/15 px-6 py-3 text-sm font-semibold text-neonGreen transition duration-200 hover:-translate-y-0.5 hover:bg-neonGreen/25 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={status === 'sending'}
            >
              <span>{status === 'sending' ? 'Sending...' : 'Send Project Context'}</span>
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>

        <div className="mt-5 text-sm text-slate-300">
          {status === 'sent' && (
            <p className="animate-pulse rounded-lg border border-neonGreen/25 bg-neonGreen/10 px-3 py-2 text-neonGreen">
              Message sent. I will get back with next steps.
            </p>
          )}
          {status === 'error' && <p className="rounded-lg border border-rose-400/35 bg-rose-400/10 px-3 py-2 text-rose-300">Please complete all fields and try again.</p>}
          {fallbackMessage && <p className="mt-2 rounded-lg border border-neonCyan/25 bg-neonCyan/10 px-3 py-2 text-neonCyan">{fallbackMessage}</p>}
        </div>

        <div className="mt-8 grid gap-2 text-sm text-slate-300 md:grid-cols-3">
          <p>
            Email:
            <a href={`mailto:${contactProfile.email}`} className="ml-2 cursor-pointer text-neonCyan transition-colors duration-200 hover:text-neonGreen">
              {contactProfile.email}
            </a>
          </p>
          <p>
            LinkedIn:
            <a
              href={contactProfile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="ml-2 cursor-pointer text-neonCyan transition-colors duration-200 hover:text-neonGreen"
            >
              linkedin.com/in/poojan-dave
            </a>
          </p>
          <p>
            GitHub:
            <a href={contactProfile.github} target="_blank" rel="noreferrer" className="ml-2 cursor-pointer text-neonCyan transition-colors duration-200 hover:text-neonGreen">
              github.com/DavePujan
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
