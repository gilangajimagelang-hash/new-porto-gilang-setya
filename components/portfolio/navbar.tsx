'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '@/components/portfolio/theme-provider'
import { navItems } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState(navItems[0]?.href || '#home')
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const { theme, toggleTheme } = useTheme()
  const { scrollY } = useScroll()

  useEffect(() => {
    setMounted(true)
  }, [])

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 140
      for (const item of navItems) {
        const section = document.querySelector(item.href) as HTMLElement | null
        if (section) {
          const top = section.offsetTop
          const height = section.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(item.href)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScrollSpy, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollSpy)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const isDark = mounted ? theme === 'dark' : false

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Main navigation"
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6 sm:py-3',
          scrolled
            ? isDark
              ? 'border border-white/10 bg-[#0c1222]/90 text-slate-100 shadow-[0_8px_36px_rgba(0,0,0,0.5)] backdrop-blur-md'
              : 'border border-slate-900/10 bg-white/90 text-slate-900 shadow-[0_8px_28px_rgba(15,23,42,0.08)] backdrop-blur-md'
            : isDark
              ? 'border border-white/10 bg-[#0c1222]/75 text-slate-100 backdrop-blur-md'
              : 'border border-slate-900/10 bg-white/85 text-slate-900 shadow-[0_4px_20px_rgba(15,23,42,0.05)] backdrop-blur-md',
        )}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={() => {
            setActiveTab('#home')
            setOpen(false)
          }}
          className={cn(
            'group flex items-center gap-2.5 font-mono text-xs font-semibold tracking-[0.3em] transition-colors sm:text-sm sm:tracking-[0.35em]',
            isDark ? 'text-slate-100' : 'text-slate-900',
          )}
        >
          <span
            className={cn(
              'size-2 rounded-full transition-transform duration-300 group-hover:scale-125',
              isDark
                ? 'bg-cyan-400 shadow-[0_0_12px_#22d3ee]'
                : 'bg-blue-600 shadow-[0_0_10px_#2563eb]',
            )}
            aria-hidden="true"
          />
          GILANG
        </a>

        {/* Desktop Menu dengan Animasi Bottom Indicator */}
        <ul
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.href
            const isHighlighted = hoveredTab ? hoveredTab === item.href : isActive

            return (
              <li key={item.href} className="relative">
                <a
                  href={item.href}
                  onClick={() => setActiveTab(item.href)}
                  onMouseEnter={() => setHoveredTab(item.href)}
                  className={cn(
                    'relative block px-4 py-2 text-sm font-medium transition-colors duration-300',
                    isHighlighted
                      ? isDark
                        ? 'text-white'
                        : 'text-slate-950'
                      : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-950',
                  )}
                >
                  {item.label}

                  {isHighlighted && (
                    <motion.span
                      layoutId="navbar-bottom-indicator"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                      className={cn(
                        'absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-gradient-to-r from-transparent to-transparent',
                        isDark
                          ? 'via-cyan-400 shadow-[0_0_10px_#22d3ee]'
                          : 'via-blue-600 shadow-[0_0_8px_#2563eb]',
                      )}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Aksi Kanan (Theme Toggle + CTA + Mobile Hamburger) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Aktifkan mode siang' : 'Aktifkan mode malam'}
            className={cn(
              'relative z-10 inline-flex size-9 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 sm:size-10',
              isDark
                ? 'border-white/15 bg-white/5 text-amber-400 hover:border-cyan-400/60'
                : 'border-slate-900/15 bg-slate-900/5 text-blue-600 hover:border-blue-600/60',
            )}
          >
            {isDark ? (
              <Sun className="size-4 sm:size-[18px]" />
            ) : (
              <Moon className="size-4 sm:size-[18px]" />
            )}
          </button>

          <a
            href="#contact"
            onClick={() => setActiveTab('#contact')}
            className={cn(
              'hidden rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 md:inline-flex',
              isDark
                ? 'border-cyan-400/40 bg-cyan-400/5 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                : 'border-blue-600/40 bg-blue-600/5 text-blue-600 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-[0_0_18px_rgba(37,99,235,0.3)]',
            )}
          >
            {"Let's talk"}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'relative z-50 inline-flex size-9 items-center justify-center rounded-full border transition-colors sm:size-10 md:hidden',
              isDark
                ? 'border-white/15 bg-white/5 text-slate-100 hover:border-cyan-400/60'
                : 'border-slate-900/15 bg-slate-900/5 text-slate-900 hover:border-blue-600/60',
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-4 sm:size-5" /> : <Menu className="size-4 sm:size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Drawer (Tanpa backdrop-blur penuh layar agar konten di bawah tidak buram) */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className={cn(
              'fixed inset-0 z-40 flex flex-col justify-between px-6 pb-10 pt-28 sm:px-10 md:hidden',
              isDark ? 'bg-[#060913] text-slate-100' : 'bg-slate-50 text-slate-900',
            )}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <ul className="flex flex-col gap-3">
              {navItems.map((item, i) => {
                const isActive = activeTab === item.href
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.25 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => {
                        setActiveTab(item.href)
                        setOpen(false)
                      }}
                      className="group relative inline-flex items-baseline gap-4 py-2 text-3xl font-semibold tracking-tight sm:text-4xl"
                    >
                      <span
                        className={cn(
                          'font-mono text-xs',
                          isDark ? 'text-cyan-400' : 'text-blue-600',
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={cn(
                          'relative transition-colors duration-300',
                          isActive
                            ? isDark
                              ? 'text-cyan-400'
                              : 'text-blue-600'
                            : isDark
                              ? 'text-slate-100 group-hover:text-cyan-400'
                              : 'text-slate-900 group-hover:text-blue-600',
                        )}
                      >
                        {item.label}
                        <span
                          className={cn(
                            'absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r to-transparent transition-all duration-300',
                            isDark ? 'from-cyan-400' : 'from-blue-600',
                            isActive ? 'w-full' : 'w-0 group-hover:w-full',
                          )}
                        />
                      </span>
                    </a>
                  </motion.li>
                )
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                'border-t pt-6',
                isDark ? 'border-white/10' : 'border-slate-900/10',
              )}
            >
              <a
                href="#contact"
                onClick={() => {
                  setActiveTab('#contact')
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full items-center justify-center rounded-full py-3.5 text-sm font-semibold transition-transform active:scale-95',
                  isDark
                    ? 'bg-cyan-400 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.35)]'
                    : 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]',
                )}
              >
                {"Let's talk"}
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}