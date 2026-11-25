
// Edit file ini untuk menyesuaikan isi portfolio.

export const profile = {
  name: 'Gilang Setya Adji',
  role: 'Mahasiswa Teknik Informatika & Backend Developer',
  email: 'gilangajimagelang@gmail.com',
  github: 'https://github.com/gilangajimagelang-hash',
  linkedin: 'https://www.linkedin.com/in/your-username',
  location: 'Indonesia',
}

export const navItems = [
  { label: 'Beranda', href: '#home' },
  { label: 'Tentang Saya', href: '#about' },
  { label: 'Keahlian', href: '#skills' },
  { label: 'Proyek', href: '#projects' },
  { label: 'Kontak', href: '#contact' },
] as const

export type SkillIcon =
  | 'html'
  | 'css'
  | 'javascript'
  | 'react'
  | 'php'
  | 'node'
  | 'mysql'
  | 'postgresql'
  | 'supabase'
  | 'git'
  | 'github'
  | 'vscode'

export const skillGroups: {
  title: string
  description: string
  skills: { name: string; icon: SkillIcon }[]
}[] = [
  {
    title: 'Pengembangan Frontend',
    description: 'Membangun antarmuka website yang modern, responsif, dan interaktif.',
    skills: [
      { name: 'HTML', icon: 'html' },
      { name: 'CSS', icon: 'css' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React', icon: 'react' },
    ],
  },
  {
    title: 'Pengembangan Backend',
    description: 'Mengembangkan logika server, alur aplikasi, dan sistem autentikasi.',
    skills: [
      { name: 'PHP', icon: 'php' },
      { name: 'Node.js', icon: 'node' },
    ],
  },
  {
    title: 'Pengelolaan Database',
    description: 'Merancang database relasional, mengelola data, dan menggunakan SQL.',
    skills: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Supabase', icon: 'supabase' },
    ],
  },
  {
    title: 'Perangkat Pengembangan',
    description: 'Menggunakan berbagai perangkat untuk kolaborasi dan pengembangan aplikasi.',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'VS Code', icon: 'vscode' },
    ],
  },
]

export type Project = {
  id: string
  index: string
  title: string
  description: string
  image: string
  tech: string[]
  liveUrl: string | null
  sourceUrl: string | null
}

export const projects: Project[] = [
  {
    id: 'showrum',
    index: '01',
    title: 'Showrum V8 Automobile',
    description:
      'Aplikasi website showroom mobil yang menyediakan katalog kendaraan, fitur pencarian dan penyaringan, autentikasi pengguna, pengelolaan pemesanan, serta dashboard administrator.',
    image: '/images/tampilan shorum.png',
    tech: ['PHP', 'MySQL', 'JavaScript', 'CSS'],
    liveUrl: null,
    sourceUrl: 'https://github.com/gilangajimagelang-hash/project_shorummobil',
  },
  {
    id: 'postgresql-oltp',
    index: '02',
    title: 'PostgreSQL — OLTP 3NF',
    description:
      'Proyek perkuliahan sistem basis data yang berfokus pada perancangan struktur database ternormalisasi, relasi antartabel, dan penerapan perintah SQL menggunakan skema OLTP 3NF.',
    image: '/images/project-database.png',
    tech: ['PostgreSQL', 'SQL', '3NF', 'Perancangan Database'],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    id: 'mysql-database',
    index: '03',
    title: 'MySQL — Pengelolaan Database',
    description:
      'Implementasi database untuk aplikasi Showrum V8 Automobile yang mendukung pengelolaan data kendaraan, akun pengguna, pemesanan, dan kebutuhan operasional aplikasi.',
    image: '/images/project-database.png',
    tech: ['MySQL', 'MariaDB', 'SQL', 'ERD'],
    liveUrl: null,
    sourceUrl: 'https://github.com/gilangajimagelang-hash/project_shorummobil',
  },
  {
    id: 'supabase-database',
    index: '04',
    title: 'Supabase — Integrasi Database',
    description:
      'Eksplorasi penggunaan Supabase untuk kolaborasi database dan integrasi backend, dengan fokus pada koordinasi alur kerja antara tim database dan backend.',
    image: '/images/project-database.png',
    tech: ['Supabase', 'PostgreSQL', 'Backend', 'Database'],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    id: 'interactive',
    index: '05',
    title: 'Aplikasi Web Interaktif',
    description:
      'Proyek pengembangan aplikasi web yang mempelajari pembuatan antarmuka interaktif, penggunaan komponen yang dapat digunakan kembali, dan praktik pengembangan frontend modern.',
    image: '/images/project-interactive.png',
    tech: ['React', 'Node.js', 'Supabase'],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    id: 'student-school-origin',
    index: '06',
    title: 'student-information-backend',
    description:
      'Proyek pengembangan sistem informasi yang dikerjakan secara kolaboratif bersama tim untuk mengelola data asal sekolah mahasiswa. Berkontribusi sebagai Backend Developer dengan fokus pada pengembangan logika backend, pengelolaan database, dan fungsionalitas sistem.',
    image: '/images/foto api.png',
    tech: ['Backend Development', 'Database', 'Team Collaboration'],
    liveUrl: null,
    sourceUrl:'https://github.com/rahayuseptini-23/Sistem-analisis-informasi-asal-sekolah-mahasiswa/tree/main/backend',
  },
]

export const timeline: {
  type: 'education' | 'experience'
  period: string
  title: string
  place: string
  description: string
}[] = [
  {
    type: 'education',
    period: 'Saat Ini',
    title: 'Sarjana Teknik Informatika',
    place: 'STMIK Bina Patria',
    description:
      'Mempelajari rekayasa perangkat lunak, struktur data, sistem basis data, dan interaksi manusia dengan komputer.',
  },
  {
    type: 'experience',
    period: '2026',
    title: 'Showrum V8 Automobile',
    place: 'Proyek Akademik',
    description:
      'Mengembangkan website showroom mobil dengan fitur katalog kendaraan, pencarian, autentikasi pengguna, dan dashboard administrator.',
  },
  {
    type: 'experience',
    period: '2026',
    title: 'student-information-backend',
    place: 'Proyek Kolaborasi Tim',
    description:
      'Berperan sebagai Backend Developer dalam pengembangan sistem informasi untuk pengelolaan data asal sekolah mahasiswa bersama tim.',
  },
  {
    type: 'experience',
    period: '2026',
    title: 'Proyek Sistem Basis Data',
    place: 'Proyek Perkuliahan',
    description:
      'Merancang struktur database relasional, menerapkan relasi antartabel, dan mempraktikkan query SQL menggunakan PostgreSQL.',
  },
  {
    type: 'education',
    period: '—',
    title: 'Sekolah Menengah Atas',
    place: 'Sekolah Menengah Atas',
    description:
      'Mempelajari matematika dan ilmu pengetahuan alam serta mulai mengenal dasar-dasar pemrograman.',
  },
]
