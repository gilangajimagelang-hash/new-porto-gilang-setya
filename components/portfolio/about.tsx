
'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Reveal, SectionHeading, TiltCard } from './primitives'
import {
  GraduationCap,
  Sparkles,
  Target,
  Code2,
  Database,
  Palette,
  Globe,
  Laptop,
  Layers,
} from 'lucide-react'

const rotatingTexts = [
  'Halo, saya Gilang Setya Adji.',
  'Saya mahasiswa Teknik Informatika STMIK Bina Patria.',
  'Saya tertarik pada dunia Web Development.',
  'Saya senang membangun website yang responsif dan interaktif.',
  'Saya terus mengembangkan kemampuan Frontend, Backend, dan Database.',
]

const facts = [
  {
    icon: GraduationCap,
    number: '01',
    label: 'PENDIDIKAN',
    title: 'Teknik Informatika',
    description:
      'Mahasiswa STMIK Bina Patria yang terus memperdalam ilmu teknologi informasi, pemrograman, dan pengembangan sistem.',
  },
  {
    icon: Sparkles,
    number: '02',
    label: 'MINAT & KREATIVITAS',
    title: 'Web & Digital Technology',
    description:
      'Memiliki ketertarikan pada Web Development, UI/UX Design, database, serta menciptakan pengalaman digital yang menarik.',
  },
  {
    icon: Target,
    number: '03',
    label: 'TUJUAN',
    title: 'Future Full-Stack Developer',
    description:
      'Berkomitmen mengembangkan kemampuan Frontend dan Backend untuk membangun aplikasi yang fungsional, responsif, dan bermanfaat.',
  },
]

const specialties = [
  { icon: Code2, label: 'Web Development' },
  { icon: Database, label: 'Database Systems' },
  { icon: Palette, label: 'UI/UX Design' },
  { icon: Globe, label: 'Responsive Website' },
  { icon: Layers, label: 'Frontend & Backend' },
]

export function About() {
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTextIndex((current) => (current + 1) % rotatingTexts.length)
    }, 3000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section
      id="about"
      className="relative isolate scroll-mt-20 overflow-hidden py-24 md:py-32"
    >
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 size-[28rem] rounded-full bg-blue-400/[0.09] blur-[130px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-0 size-[28rem] rounded-full bg-sky-400/[0.08] blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section heading */}
        <SectionHeading
          index="01"
          eyebrow="PROFIL SAYA"
          title={
            <>
              Tentang <span className="text-gradient">Saya.</span>
            </>
          }
        />

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

          {/* PROFILE IMAGE */}
          <Reveal className="relative mx-auto w-full max-w-[390px]">
            <div
              className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-400/20 via-sky-400/10 to-indigo-400/20 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative rounded-[2rem] border border-blue-200/70 bg-gradient-to-br from-blue-400 via-sky-300 to-indigo-400 p-[1px] shadow-[0_25px_70px_rgba(37,99,235,0.12)]">
              <div className="relative overflow-hidden rounded-[2rem] bg-white">
                <Image
                  src="/pp.jpeg"
                  alt="Foto profil Gilang Setya Adji"
                  width={800}
                  height={950}
                  className="aspect-[4/5] w-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 390px, 90vw"
                  priority
                />

                {/* Photo overlay */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"
                  aria-hidden="true"
                />

                {/* Profile identity */}
                <div className="absolute inset-x-5 bottom-5">
                  <p className="font-mono text-[10px] tracking-[0.3em] text-sky-300">
                    INFORMATICS ENGINEERING
                  </p>

                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
                    Gilang Setya Adji
                  </h3>

                  <p className="mt-1 text-sm text-white/75">
                    Informatics Student & Web Developer
                  </p>
                </div>
              </div>
            </div>

            {/* Floating profile badge */}
            <div className="absolute -right-3 top-8 rounded-xl border border-blue-100 bg-white/95 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:-right-8">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                <p className="font-mono text-[9px] tracking-widest text-slate-400">
                  PROFILE STATUS
                </p>
              </div>

              <p className="mt-1 text-sm font-bold text-slate-800">
                Learning & Building
              </p>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-3 flex size-12 items-center justify-center rounded-xl border border-blue-200 bg-white text-blue-600 shadow-lg sm:-left-5">
              <Laptop size={23} />
            </div>
          </Reveal>

          {/* PROFILE DESCRIPTION */}
          <div className="min-w-0">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-blue-500" />

                <p className="font-mono text-xs tracking-[0.2em] text-blue-600">
                  PERKENALAN SINGKAT
                </p>
              </div>

              {/* AUTOMATIC ROTATING TEXT */}
              <div className="min-h-[125px] sm:min-h-[145px]">
                <h3
                  key={textIndex}
                  aria-live="polite"
                  className="about-rotating-text max-w-2xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.7rem]"
                >
                  {rotatingTexts[textIndex]}
                </h3>
              </div>

              <div className="mt-4 flex items-center gap-2">
                {rotatingTexts.map((_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      textIndex === index
                        ? 'w-8 bg-blue-600'
                        : 'w-2 bg-blue-200'
                    }`}
                  />
                ))}
              </div>

              <p className="mt-7 text-sm leading-8 text-slate-600 sm:text-base">
                Perkenalkan, saya Gilang Setya Adji, mahasiswa
                Program Studi Teknik Informatika di STMIK Bina
                Patria. Saya memiliki ketertarikan terhadap
                perkembangan teknologi, khususnya dalam bidang
                pemrograman dan pengembangan aplikasi berbasis web.
              </p>

              <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                Saya senang mengeksplorasi bagaimana sebuah ide
                dapat diwujudkan menjadi website yang menarik,
                responsif, dan mudah digunakan. Saya juga terus
                mempelajari pengelolaan database serta proses
                pengembangan sistem dari sisi frontend maupun
                backend.
              </p>

              <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                Bagi saya, setiap proyek merupakan kesempatan
                untuk belajar, mencoba hal baru, meningkatkan
                kemampuan, dan menghasilkan karya digital yang
                dapat memberikan manfaat bagi orang lain.
              </p>
            </Reveal>

            {/* SPECIALTIES */}
            <Reveal delay={0.15}>
              <div className="mt-8">
                <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-slate-400">
                  BIDANG YANG SAYA MINATI
                </p>

                <div className="flex flex-wrap gap-2">
                  {specialties.map((item) => (
                    <div
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600 hover:shadow-md"
                    >
                      <item.icon className="size-4 text-blue-600" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* INFORMATION CARDS */}
        <div className="mt-20">
          <Reveal>
            <div className="mb-7 flex items-center gap-4">
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                Profil & Perjalanan Saya
              </h3>

              <span className="h-px flex-1 bg-blue-100" />

              <span className="font-mono text-[10px] text-blue-600">
                01 — 03
              </span>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {facts.map((fact, i) => (
              <Reveal
                key={fact.number}
                delay={0.1 * i}
                className="h-full"
              >
                <TiltCard className="group h-full rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(37,99,235,0.10)]">
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                      <fact.icon className="size-5" />
                    </div>

                    <span className="font-mono text-xs tracking-widest text-blue-400">
                      {fact.number}
                    </span>
                  </div>

                  <p className="mt-7 font-mono text-[10px] tracking-[0.2em] text-slate-400">
                    {fact.label}
                  </p>

                  <h4 className="mt-2 text-lg font-bold text-slate-900">
                    {fact.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {fact.description}
                  </p>

                  <div className="mt-6 h-px w-10 bg-gradient-to-r from-blue-500 to-transparent transition-all duration-300 group-hover:w-20" />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ROTATING TEXT ANIMATION */}
      <style>{`
        @keyframes aboutFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
            filter: blur(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .about-rotating-text {
          animation: aboutFadeIn 0.7s ease both;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-rotating-text {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
