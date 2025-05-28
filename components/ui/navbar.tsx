'use client'

import Link from 'next/link'
import { Dna } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()
    return (
    <header className="sticky top-0 z-50 w-full px-12 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 font-semibold">
          <Dna className="h-6 w-6" />
          <span>Mutalyzr</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/"
            className={`text-sm font-medium ${
                pathname === '/' ? '' : 'text-muted-foreground'
            }`}
            >
            Beranda
            </Link>
            <Link
            href="/upload"
            className={`text-sm font-medium ${
                pathname === '/upload' || pathname === '/results' ? '' : 'text-muted-foreground'
            }`}
            >
            Analisis
            </Link>
            <Link
            href="/info"
            className={`text-sm font-medium ${
                pathname === '/info' ? '' : 'text-muted-foreground'
            }`}
            >
            Informasi
            </Link>
        </nav>
      </div>
    </header>
  )
}
