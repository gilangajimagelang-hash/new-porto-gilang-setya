
import { MotionProvider } from '@/components/portfolio/motion-provider'
import { Loader } from '@/components/portfolio/loader'
import { Navbar } from '@/components/portfolio/navbar'
import { Hero } from '@/components/portfolio/hero'
import { About } from '@/components/portfolio/about'
import { Skills } from '@/components/portfolio/skills'
import { Projects } from '@/components/portfolio/projects'
import { Education } from '@/components/portfolio/education'
import { Contact } from '@/components/portfolio/contact'
import { Footer } from '@/components/portfolio/footer'

export default function Page() {
  return (
    <MotionProvider>
      <Loader />

      <Navbar />

      <main className="w-full overflow-x-hidden">
        {/* Bagian pembuka */}
        <section id="beranda" className="w-full">
          <Hero />
        </section>

        {/* Tentang saya */}
        <section id="tentang" className="w-full scroll-mt-20">
          <About />
        </section>

        {/* Keahlian */}
        <section id="keahlian" className="w-full scroll-mt-20">
          <Skills />
        </section>

        {/* Proyek */}
        <section id="proyek" className="w-full scroll-mt-20">
          <Projects />
        </section>

        {/* Pendidikan */}
        <section id="pendidikan" className="w-full scroll-mt-20">
          <Education />
        </section>

        {/* Kontak */}
        <section id="kontak" className="w-full scroll-mt-20">
          <Contact />
        </section>
      </main>

      <Footer />
    </MotionProvider>
  )
}
