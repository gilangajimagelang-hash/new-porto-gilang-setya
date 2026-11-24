
'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { useReducedMotion } from 'motion/react'
import {
  Code2,
  Database,
  Globe2,
  Layers3,
  Sparkles,
  Terminal,
} from 'lucide-react'

const HeroScene = dynamic(() => import('./hero-scene'), {
  ssr: false,
  loading: () => <FallbackOrb />,
})

/* =========================================
   FALLBACK ID CARD
========================================= */

function FallbackOrb() {
  return (
    <div
      className="relative flex size-full flex-col items-center"
      aria-hidden="true"
    >
      {/* Lanyard */}
      <div className="relative h-[25%] w-6 overflow-hidden rounded-b-md shadow-[0_4px_18px_rgba(37,99,235,0.15)]">
        <Image
          src="/images/lanyard-strap.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Pengait */}
      <div className="z-10 -mt-1 size-5 rounded-full border-[4px] border-slate-300 bg-slate-100 shadow-md" />

      {/* ID Card */}
      <div className="relative mt-1 aspect-[0.625] h-[58%] -rotate-3 overflow-hidden rounded-xl border border-white bg-white p-1.5 shadow-[0_25px_70px_rgba(15,23,42,0.2),0_0_45px_rgba(59,130,246,0.12)]">
        <Image
          src="/images/name-card.jpg"
          alt="Developer identity card"
          fill
          quality={100}
          sizes="(max-width: 768px) 100vw, 400px"
          className="rounded-lg object-cover p-1.5"
          priority
        />
      </div>
    </div>
  )
}

/* =========================================
   WEBGL DETECTION
========================================= */

let webglSupport: boolean | undefined

function hasWebGL() {
  if (typeof window === 'undefined') return false
  if (webglSupport !== undefined) return webglSupport

  try {
    const canvas = document.createElement('canvas')
    webglSupport = !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl')
    )
  } catch {
    webglSupport = false
  }

  return webglSupport
}

const subscribeNoop = () => () => {}

function subscribeCompact(cb: () => void) {
  const mq = window.matchMedia('(max-width: 767px)')
  mq.addEventListener('change', cb)

  return () => mq.removeEventListener('change', cb)
}

/* =========================================
   FLOATING DECORATIONS
========================================= */

function FloatingTechElements({ compact }: { compact: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20"
      aria-hidden="true"
    >
      {/* Orbit luar */}
      <div className="absolute left-1/2 top-1/2 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/50" />

      {/* Orbit dalam */}
      <div className="absolute left-1/2 top-1/2 aspect-square w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-sky-200/60" />

      {/* Glow utama */}
      <div className="absolute left-1/2 top-1/2 size-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/20 blur-[65px]" />

      {/* Label kiri atas */}
      <div className="absolute left-[2%] top-[15%] flex items-center gap-2 rounded-xl border border-white/80 bg-white/85 px-3 py-2 shadow-[0_8px_30px_rgba(15,23,42,0.07)] backdrop-blur-xl">
        <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Code2 size={17} />
        </div>
        <div>
          <p className="text-[9px] font-bold tracking-[0.15em] text-slate-400">
            SPECIALIZATION
          </p>
          <p className="text-xs font-semibold text-slate-800">
            Programming
          </p>
        </div>
      </div>

      {/* Panel kanan atas */}
      <div className="absolute right-[1%] top-[25%] rounded-xl border border-white/80 bg-white/85 px-3 py-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.07)] backdrop-blur-xl">
        <div className="mb-1 flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-[9px] font-bold tracking-wider text-slate-500">
            CURRENT STATUS
          </span>
        </div>
        <p className="text-xs font-bold text-slate-800">
          Learning & Building
        </p>
      </div>

      {/* Kartu teknologi kiri bawah */}
      <div className="absolute bottom-[18%] left-[3%] flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 p-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.07)] backdrop-blur-xl">
        <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Database size={19} />
        </div>
        <div>
          <p className="text-[9px] font-bold tracking-wider text-slate-400">
            DATABASE
          </p>
          <p className="text-xs font-bold text-slate-800">
            Data & SQL
          </p>
        </div>
      </div>

      {/* Kartu kanan bawah */}
      <div className="absolute bottom-[13%] right-[2%] flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 p-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.07)] backdrop-blur-xl">
        <div className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-800">
          <Code2 size={19} />
        </div>
        <div>
          <p className="text-[9px] font-bold tracking-wider text-slate-400">
            DEVELOPMENT
          </p>
          <p className="text-xs font-bold text-slate-800">
            GitHub Projects
          </p>
        </div>
      </div>

      {/* Floating icon kiri */}
      <div className="absolute left-[14%] top-[43%] flex size-11 items-center justify-center rounded-2xl border border-white/80 bg-white/90 text-blue-600 shadow-lg shadow-blue-900/5">
        <Terminal size={20} />
      </div>

      {/* Floating icon kanan */}
      <div className="absolute right-[13%] top-[53%] flex size-11 items-center justify-center rounded-2xl border border-white/80 bg-white/90 text-sky-600 shadow-lg shadow-blue-900/5">
        <Globe2 size={20} />
      </div>

      {/* Sparkles */}
      <Sparkles
        className="absolute right-[20%] top-[12%] text-blue-400"
        size={20}
      />

      <Sparkles
        className="absolute bottom-[30%] left-[19%] text-sky-400"
        size={15}
      />

      {/* Tech badge */}
      {!compact && (
        <div className="absolute bottom-[3%] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-xl">
          <Layers3 size={14} className="text-blue-600" />
          <span className="whitespace-nowrap text-[9px] font-bold tracking-[0.2em] text-slate-500">
            DESIGN · CODE · INNOVATE
          </span>
        </div>
      )}
    </div>
  )
}

/* =========================================
   MAIN HERO VISUAL
========================================= */

export function HeroVisual() {
  const reducedMotion = useReducedMotion() ?? false

  const webgl = useSyncExternalStore(
    subscribeNoop,
    hasWebGL,
    () => false,
  )

  const compact = useSyncExternalStore(
    subscribeCompact,
    () => window.matchMedia('(max-width: 767px)').matches,
    () => false,
  )

  const [contextLost, setContextLost] = useState(false)
  const [active, setActive] = useState(true)

  const wrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapper.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '100px' },
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapper}
      className="relative isolate size-full min-h-[420px] overflow-visible"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.22),rgba(129,140,248,0.10)_45%,transparent_72%)] blur-3xl"
        aria-hidden="true"
      />

      {/* Decorative orbit and tech panels */}
      <FloatingTechElements compact={compact} />

      {/* 3D ID Card */}
      <div className="absolute inset-[5%] z-10">
        {webgl && !contextLost ? (
          <HeroScene
            reducedMotion={reducedMotion}
            compact={compact}
            active={active}
            onContextLost={() => setContextLost(true)}
          />
        ) : (
          <FallbackOrb />
        )}
      </div>

      {/* Drag instruction */}
      {webgl && !contextLost && (
        <div className="pointer-events-none absolute bottom-[-1%] left-1/2 z-30 -translate-x-1/2">
          <p className="whitespace-nowrap rounded-full border border-blue-100 bg-white/85 px-4 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm backdrop-blur-xl">
            ↔ Drag the card to interact
          </p>
        </div>
      )}
    </div>
  )
}
