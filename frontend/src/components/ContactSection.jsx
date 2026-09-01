import { useState } from 'react'
import useInView from '../hooks/useInView'

const DETAILS = [
  {
    label: 'Boutique',
    lines: ['142 rue des Parfumeurs', '20250 Casablanca, Morocco'],
    icon: 'pin',
  },
  {
    label: 'Phone',
    lines: ['+212 5 22 00 00 00', 'Mon to Sat, 9 am – 7 pm'],
    icon: 'phone',
  },
  {
    label: 'Email',
    lines: ['hello@perfumeshop.ma', 'We reply within 24 hours'],
    icon: 'mail',
  },
]

const SUBJECTS = [
  'An order',
  'A fragrance recommendation',
  'Returns and exchanges',
  'Wholesale enquiry',
  'Something else',
]

export default function ContactSection() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: SUBJECTS[0],
    message: '',
  })
  const [sent, setSent] = useState(false)

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  // Chaque bloc entre a son tour.
  const step = (i) => ({ transitionDelay: inView ? `${120 + i * 110}ms` : '0ms' })
  const reveal = inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'

  return (
    <section
      id="contact"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden bg-ivory py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(176,141,46,0.18),transparent_70%)] blur-2xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Chapeau */}
        <div className="text-center">
          <span
            style={step(0)}
            className={`caps block text-[10px] text-gold-dark transition-all duration-700 ease-out ${reveal}`}
          >
            Get in touch
          </span>
          <h2
            style={step(1)}
            className={`caps mt-4 text-[19px] leading-[1.6] text-ink transition-all duration-700 ease-out sm:text-[22px] ${reveal}`}
          >
            A question about a scent? We answer every message.
          </h2>
          <div
            style={step(2)}
            className={`mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-[1100ms] ease-out ${
              inView ? 'w-40 opacity-100' : 'w-0 opacity-0'
            }`}
          />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
          {/* Formulaire */}
          <form
            onSubmit={submit}
            style={step(3)}
            className={`rounded-3xl border border-ink/10 bg-white p-7 transition-all duration-700 ease-out sm:p-9 ${reveal}`}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" value={form.name} onChange={set('name')} autoComplete="name" />
              <Field label="Email" type="email" value={form.email} onChange={set('email')} autoComplete="email" />

              <label className="sm:col-span-2">
                <span className="caps block text-[9.5px] text-gold-dark">Subject</span>
                <select
                  value={form.subject}
                  onChange={set('subject')}
                  className="mt-2 w-full rounded-xl border border-ink/20 bg-ivory px-4 py-3 text-[12px] text-ink outline-none transition-colors focus:border-gold"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>

              <label className="sm:col-span-2">
                <span className="caps block text-[9.5px] text-gold-dark">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Tell us what you are looking for…"
                  className="mt-2 w-full resize-none rounded-xl border border-ink/20 bg-ivory px-4 py-3 text-[12px] leading-relaxed text-ink placeholder-ink/35 outline-none transition-colors focus:border-gold"
                />
              </label>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="caps group relative overflow-hidden rounded-full bg-gradient-to-b from-gold-light to-gold-soft px-9 py-3.5 text-[10.5px] text-ink transition-all hover:from-gold hover:to-gold-dark hover:text-ivory active:scale-[0.98]"
              >
                <span className="relative z-10">Send message</span>
                <span className="absolute inset-y-0 -left-full w-1/3 bg-white/45 blur-sm group-hover:animate-shine" />
              </button>

              {sent && (
                <span className="animate-fadeUp text-[11px] text-gold-dark">
                  ✓ Thank you — we will get back to you shortly.
                </span>
              )}
            </div>
          </form>

          {/* Coordonnees */}
          <aside className="space-y-4">
            {DETAILS.map((detail, i) => (
              <div
                key={detail.label}
                style={step(4 + i)}
                className={`group flex gap-4 rounded-2xl border border-ink/10 bg-white p-5 transition-all duration-700 ease-out hover:-translate-y-0.5 hover:border-gold/40 ${reveal}`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/40 text-gold-dark transition-colors group-hover:bg-gold group-hover:text-ivory">
                  <Icon name={detail.icon} />
                </span>
                <div>
                  <span className="caps text-[9.5px] text-gold-dark">{detail.label}</span>
                  {detail.lines.map((line, j) => (
                    <p
                      key={line}
                      className={`mt-1 text-[11.5px] leading-relaxed ${
                        j === 0 ? 'text-ink' : 'text-ink/50'
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Horaires */}
            <div
              style={step(7)}
              className={`rounded-2xl border border-gold/30 bg-gold/8 p-5 transition-all duration-700 ease-out ${reveal}`}
            >
              <span className="caps text-[9.5px] text-gold-dark">Opening hours</span>
              <dl className="mt-3 space-y-2 text-[11.5px]">
                <Hours day="Monday – Friday" time="9 am – 7 pm" />
                <Hours day="Saturday" time="10 am – 6 pm" />
                <Hours day="Sunday" time="Closed" muted />
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Field({ label, ...props }) {
  return (
    <label>
      <span className="caps block text-[9.5px] text-gold-dark">{label}</span>
      <input
        required
        {...props}
        className="mt-2 w-full rounded-xl border border-ink/20 bg-ivory px-4 py-3 text-[12px] text-ink outline-none transition-colors focus:border-gold"
      />
    </label>
  )
}

function Hours({ day, time, muted }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-ink-light">{day}</dt>
      <dd className={muted ? 'text-ink/40' : 'font-medium text-ink'}>{time}</dd>
    </div>
  )
}

function Icon({ name }) {
  const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  if (name === 'pin') {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" {...stroke}>
        <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.6" />
      </svg>
    )
  }
  if (name === 'phone') {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" {...stroke}>
        <path d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" {...stroke}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7 8 5.5L20 7" />
    </svg>
  )
}
