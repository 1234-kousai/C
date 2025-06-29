import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Noto_Sans_JP, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ErrorBoundary from "@/components/error-boundary"

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
})

const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-jp',
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: "山本公才 / Kousai Yamamoto - AI × グロース戦略で未来を創る",
  description:
    "Luminous Core株式会社 代表取締役CEO、学生団体StuDXIA代表。AI技術とグロース戦略を掛け合わせ、SNSを起点とした事業成果の最大化を支援。",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${notoSansJP.variable} ${playfairDisplay.variable} font-sans`}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
