'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t py-6">
      <div className="container px-12 flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © 2025 DNA Mutation Analysis. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-sm text-muted-foreground underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground underline underline-offset-4">
            Terms & Conditions
          </Link>
          <Link href="#" className="text-sm text-muted-foreground underline underline-offset-4">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
