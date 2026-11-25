
'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, X, ZoomIn } from 'lucide-react'
import type { ReactNode } from 'react'

import { projects, type Project } from '@/lib/portfolio-data'
import { GithubIcon } from './brand-icon'
import { Reveal, SectionHeading, TiltCard } from './primitives'

function ProjectLink({
  href,
  label,
  icon,
  primary = false,
}: {
  href: string | null
  label: string
  icon: ReactNode
  primary?: boolean
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300'

  if (!href) {
    return (
      <span
        className={`${base} cursor-not-allowed border border-white/10 bg-white/[0.03] text-muted-foreground`}
        title="Link belum tersedia"
      >
        {icon}
        {label}
      </span>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={
        primary
          ? `${base} bg-foreground text-background hover:bg-white/80`
          : `${base} border border-white/15 bg-white/[0.03] text-foreground hover:border-white/35 hover:bg-white/[0.08]`
      }
    >
      {icon}
      {label}
    </a>
  )
}

function ProjectImage({
  src,
  alt,
  title,
}: {
  src: string
  alt: string
  title: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Perbesar gambar ${title}`}
        className="group/image absolute inset-0 z-[1] w-full cursor-zoom-in"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-[1.06] motion-reduce:transition-none"
        />

        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover/image:bg-black/30">
          <span className="flex translate-y-2 items-center gap-2 rounded-full border border-white/30 bg-black/50 px-4 py-2.5 text-xs font-medium text-white opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 group-hover/image:translate-y-0 group-hover/image:opacity-100">
            <ZoomIn className="size-4" />
            Klik untuk memperbesar
          </span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Gambar ${title}`}
          >
            <motion.div
              className="relative h-[82vh] w-full max-w-6xl"
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 25,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup gambar"
              className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white backdrop-blur-lg transition-all hover:bg-white/20"
            >
              <X className="size-4" />
              Tutup
            </button>

            <p className="absolute bottom-5 left-4 right-4 text-center text-xs tracking-wide text-white/70">
              {title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const pending = !project.liveUrl && !project.sourceUrl

  return (
    <TiltCard
      intensity={3}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.025] transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.045] hover:shadow-[0_20px_60px_-25px_rgba(0,0,0,0.7)]"
    >
      <div className="relative m-3 aspect-[16/10] overflow-hidden rounded-xl bg-white/[0.04]">
        <ProjectImage
          src={project.image}
          alt={`Preview of ${project.title}`}
          title={project.title}
        />

        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/35 via-transparent to-black/10"
          aria-hidden="true"
        />

        <span className="pointer-events-none absolute left-3 top-3 z-[3] rounded-md border border-white/15 bg-black/45 px-3 py-1.5 font-mono text-[11px] tracking-wider text-white/90 backdrop-blur-md">
          PROJECT {project.index}
        </span>

        {pending && (
          <span className="pointer-events-none absolute right-3 top-3 z-[3] rounded-md border border-white/15 bg-black/45 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-md">
            In Progress
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-3 sm:px-6 sm:pb-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
            {project.title}
          </h3>

          <ArrowUpRight
            className="mt-1 size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            aria-hidden="true"
          />
        </div>

        <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-5">
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
            Technologies
          </p>

          <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors duration-300 group-hover:border-white/15 group-hover:text-foreground/80"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.08] pt-5">
          <ProjectLink
            href={project.liveUrl}
            label="Live Demo"
            primary
            icon={<ArrowUpRight className="size-4" />}
          />

          <ProjectLink
            href={project.sourceUrl}
            label="GitHub"
            icon={<GithubIcon className="size-4" />}
          />
        </div>
      </div>
    </TiltCard>
  )
}

export function Projects() {
  return (
    <section
      id="projects"
      className="relative scroll-mt-20 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          index="03"
          eyebrow="Portfolio"
          title={
            <>
              Featured{' '}
              <span className="text-gradient">Projects.</span>
            </>
          }
          description="A selection of projects that showcase my experience in web development, database management, and building practical digital solutions."
        />

        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              delay={0.08 * index}
              className="h-full"
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Each project represents my continuous learning and development.
            </p>

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
              Design · Develop · Improve
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
