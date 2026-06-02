import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Poppins, Herr_Von_Muellerhoff } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

const spencerian = Herr_Von_Muellerhoff({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-signature-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sapphire Life Club | Private Marine Lifestyle Club in Newport Beach',
  description: 'An exclusive private marine lifestyle club in Newport Beach, California. Through rigorous member selection and butler-style service, we create an elite coastal venue combining private socializing, family warmth, and professional ocean living.',
  keywords: ['private club', 'yacht club', 'Newport Beach', 'marine lifestyle', 'luxury club', 'exclusive membership'],
  authors: [{ name: 'Sapphire Life Club' }],
  openGraph: {
    title: 'Sapphire Life Club | Private Marine Lifestyle Club',
    description: 'An exclusive private marine lifestyle club in Newport Beach, California.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#192952',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${cormorant.variable} ${poppins.variable} ${spencerian.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
