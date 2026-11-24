
'use client'

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { HeroVisual } from './hero-visual'

const ease = [0.22, 1, 0.36, 1] as const

const rotatingTexts = [
  'HALO, SAYA GILANG SETYA ADJI.',
  'MAHASISWA TEKNIK INFORMATIKA.',
  'WEB DEVELOPER IN PROGRESS.',
  'TERTARIK PADA DATABASE & UI/UX.',
  'MEMBANGUN IDE MENJADI SOLUSI DIGITAL.',
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [activeText, setActiveText] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveText((current) => (current + 1) % rotatingTexts.length)
    }, 3000)

    return () => window.clearInterval(interval)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], [0, 55])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -35])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#F1F5F9] px-5 pb-16 pt-28 text-[#0F172A] sm:px-8 lg:min-h-svh lg:px-12 lg:pt-24"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(148,163,184,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.13)_1px,transparent_1px)] [background-size:55px_55px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 -top-40 size-[30rem] rounded-full bg-blue-400/15 blur-[140px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-40 -left-40 size-[28rem] rounded-full bg-sky-300/20 blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">

        {/* SISI KIRI: PERKENALAN */}
        <motion.div
          style={{ y: textY, opacity: fade }}
          className="relative z-10 order-1 text-center lg:text-left"
        >
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mb-7 flex justify-center lg:justify-start"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-blue-200 bg-white/80 px-4 py-2.5 text-xs font-medium tracking-wide text-blue-700 shadow-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-500 opacity-40" />
                <span className="relative size-2 rounded-full bg-blue-600" />
              </span>
              Terbuka untuk Kolaborasi dan Peluang Magang
            </div>
          </motion.div>

          {/* Sapaan */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 sm:mb-7 sm:text-sm"
          >
            WELCOME TO MY PORTFOLIO
          </motion.p>

          {/* Judul utama dan animasi teks */}
          <div className="min-h-[220px] sm:min-h-[250px] lg:min-h-[280px]">
            <h1 className="text-[clamp(2.5rem,6.5vw,5.7rem)] font-bold leading-[1.02] tracking-[-0.06em]">
              <span className="block text-[#0F172A]">
                GILANG
              </span>

              <span className="block text-[#0F172A]">
                SETYA ADJI
              </span>

              {/* Animasi tulisan */}
              <span className="mt-4 block min-h-[1.2em] overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 bg-clip-text text-transparent sm:mt-5">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeText}
                    initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -25, filter: 'blur(6px)' }}
                    transition={{ duration: 0.55, ease }}
                    className="block text-[clamp(1.5rem,4vw,3rem)] leading-tight tracking-[-0.04em]"
                  >
                    {rotatingTexts[activeText]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </div>

          {/* Identitas */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700 sm:text-sm lg:justify-start"
          >
            <span>Informatics Student</span>
            <span className="text-slate-300">/</span>
            <span>Web Developer</span>
            <span className="text-slate-300">/</span>
            <span>Digital Creator</span>
          </motion.div>

          {/* Deskripsi */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="mx-auto mt-6 max-w-xl text-sm leading-8 text-slate-600 sm:text-base lg:mx-0 lg:text-lg"
          >
            Saya Gilang Setya Adji, mahasiswa Teknik Informatika
            di STMIK Bina Patria. Saya memiliki ketertarikan pada
            pengembangan website, sistem basis data, desain UI/UX,
            dan teknologi digital. Saya senang mempelajari hal baru,
            mengeksplorasi ide kreatif, serta mengembangkan kemampuan
            untuk menciptakan solusi digital yang fungsional,
            menarik, dan bermanfaat.
          </motion.p>

          {/* Tombol aksi */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/30"
            >
              Lihat Proyek Saya
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:text-blue-700 hover:shadow-md"
            >
              Hubungi Saya
            </a>
          </motion.div>

          {/* Bidang keahlian */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-10 flex flex-wrap justify-center gap-2 lg:justify-start"
          >
            {[
              'WEB DEVELOPMENT',
              'DATABASE MANAGEMENT',
              'UI/UX DESIGN',
              'DIGITAL TECHNOLOGY',
            ].map((item) => (
              <span
                key={item}
                className="rounded-lg border border-slate-200 bg-white/80 px-3 py-2 font-mono text-[9px] tracking-wider text-slate-600 shadow-sm sm:text-[10px]"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* SISI KANAN: KARTU IDENTITAS 3D */}
        <motion.div
          style={{ y: visualY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.5, ease }}
          className="relative order-2 mx-auto mt-4 h-[350px] w-full max-w-[500px] sm:h-[460px] md:h-[520px] lg:mt-0 lg:h-[min(78svh,720px)] lg:max-w-none"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 size-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/15 blur-[100px]"
            aria-hidden="true"
          />

          <HeroVisual />
        </motion.div>
      </div>

      {/* Petunjuk scroll */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 transition-colors hover:text-blue-600 md:flex"
      >
        Gulir untuk menjelajah
        <ArrowDown className="size-4 animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  )
}
