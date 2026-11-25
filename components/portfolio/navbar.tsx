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

  const isDark = theme === 'dark'

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Main navigation"
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 sm:py-3',
          scrolled
            ? 'glass border border-black/10 shadow-[0_8px_40px_rgb(0_0_0/0.12)] backdrop-blur-xl dark:border-white/10 dark:shadow-[0_8px_40px_rgb(0_0_0/0.5)]'
            : 'border border-transparent bg-transparent',
        )}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={() => setActiveTab('#home')}
          className="group flex items-center gap-2.5 font-mono text-xs font-semibold tracking-[0.3em] sm:text-sm sm:tracking-[0.35em]"
        >
          <span
            className="size-2 rounded-full bg-neon shadow-[0_0_12px_#22d3ee] transition-transform duration-300 group-hover:scale-125"
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
                    isHighlighted ? 'text-foreground' : 'text-muted-foreground',
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
                      className="absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-gradient-to-r from-transparent via-neon to-transparent shadow-[0_0_10px_#22d3ee]"
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
            className="relative z-10 inline-flex size-9 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-black/5 text-foreground transition-all duration-300 hover:border-neon/50 hover:text-neon dark:border-white/10 dark:bg-white/5 sm:size-10"
          >
            {mounted ? (
              isDark ? (
                <Sun className="size-4 text-amber-400 sm:size-[18px]" />
              ) : (
                <Moon className="size-4 text-cyan-600 sm:size-[18px]" />
              )
            ) : (
              <Moon className="size-4 opacity-50 sm:size-[18px]" />
            )}
          </button>

          <a
            href="#contact"
            onClick={() => setActiveTab('#contact')}
            className="hidden rounded-full border border-neon/40 px-4 py-2 text-sm font-medium text-neon transition-all duration-300 hover:border-neon hover:bg-neon hover:text-background hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] md:inline-flex"
          >
            {"Let's talk"}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-black/5 text-foreground transition-colors hover:border-neon/50 hover:text-neon dark:border-white/10 dark:bg-white/5 sm:size-10 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-4 sm:size-5" /> : <Menu className="size-4 sm:size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-background/95 px-6 pb-10 pt-28 backdrop-blur-2xl sm:px-10 md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <ul className="flex flex-col gap-3">
              {navItems.map((item, i) => {
                const isActive = activeTab === item.href
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ delay: 0.05 * i + 0.08, duration: 0.3 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => {
                        setActiveTab(item.href)
                        setOpen(false)
                      }}
                      className="group relative inline-flex items-baseline gap-4 py-2 text-3xl font-semibold tracking-tight sm:text-4xl"
                    >
                      <span className="font-mono text-xs text-neon">0{i + 1}</span>
                      <span
                        className={cn(
                          'relative transition-colors duration-300',
                          isActive ? 'text-neon' : 'text-foreground group-hover:text-neon',
                        )}
                      >
                        {item.label}
                        <span
                          className={cn(
                            'absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-neon to-transparent transition-all duration-300',
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border-t border-black/10 pt-6 dark:border-white/10"
            >
              <a
                href="#contact"
                onClick={() => {
                  setActiveTab('#contact')
                  setOpen(false)
                }}
                className="flex w-full items-center justify-center rounded-full bg-neon py-3.5 text-sm font-semibold text-background shadow-[0_0_24px_rgba(34,211,238,0.35)] transition-transform active:scale-95"
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