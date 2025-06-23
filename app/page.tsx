"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Menu, X, ExternalLink, Instagram, Mail, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [currentBgImageIndex, setCurrentBgImageIndex] = useState(0)

  const aboutMeImages = [
    "/more about me1.JPG",
    "/more about me2.JPG", 
    "/more about me3.jpeg",
    "/IMG_8019.JPG"
  ]

  const snsVideos = [
    "/SNS1.mov",
    "/SNS2.mov"
  ]

  const backgroundImages = [
    "/Luminous Core.png",
    "/StuDXIA.jpg"
  ]

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === aboutMeImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)
    
    return () => clearInterval(interval)
  }, [aboutMeImages.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => 
        prevIndex === snsVideos.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)
    
    return () => clearInterval(interval)
  }, [snsVideos.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 2000)
    
    return () => clearInterval(interval)
  }, [backgroundImages.length])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            K.Y
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("business")} className="hover:text-primary transition-colors">
              Business
            </button>
            <button onClick={() => scrollToSection("projects")} className="hover:text-primary transition-colors">
              Projects
            </button>
            <button onClick={() => scrollToSection("sns")} className="hover:text-primary transition-colors">
              SNS
            </button>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-b">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("about")}
                className="text-left hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("business")}
                className="text-left hover:text-primary transition-colors"
              >
                Business
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-left hover:text-primary transition-colors"
              >
                Projects
              </button>
              <button onClick={() => scrollToSection("sns")} className="text-left hover:text-primary transition-colors">
                SNS
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-purple-900/40 to-pink-900/30 dark:from-cyan-900/50 dark:via-purple-900/60 dark:to-pink-900/50" />
        <div className="absolute inset-0 opacity-30">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentBgImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `translateY(${scrollY * 0.5}px)`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <Image
              src="/Kousai.png"
              alt="山本公才"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-8 border-4 border-white/20 shadow-2xl"
            />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-slide-up tracking-tight">
            山本 公才
          </h1>

          <div className="text-lg md:text-xl text-muted-foreground mb-8 space-y-2 animate-slide-up-delay">
            <p>Luminous Core 株式会社 代表取締役CEO</p>
            <p>学生団体 StuDXIA 代表</p>
            <p>慶應義塾大学 経済学部 在学</p>
            <p>Faith United 所属モデル</p>
          </div>

          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg animate-slide-up-delay-2"
            onClick={() => scrollToSection("business")}
          >
            詳しく見る
            <ChevronDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Business & Community Section */}
      <section id="business" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Business & Community
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Image
                    src="/Luminous Core.png"
                    alt="Luminous Core"
                    width={400}
                    height={300}
                    className="rounded-lg w-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  株式会社Luminous Core
                  <ExternalLink className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <Badge className="mb-4">グローステック・カンパニー</Badge>
                <p className="text-muted-foreground mb-4">
                  当社は『AI技術』と『グロース戦略』を掛け合わせ、SNSを起点としたクライアントの事業成果を最大化するグローステック・カンパニーです。AIを活用したSNS運用代行から、オーダーメイドのシステム・ツール開発まで一貫して支援。
                </p>
                <Link
                  href="https://agi.safe.ai"
                  target="_blank"
                  className="text-primary hover:underline flex items-center"
                >
                  ウェブサイトを見る <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Image
                    src="/StuDXIA.jpg"
                    alt="StuDXIA"
                    width={400}
                    height={300}
                    className="rounded-lg w-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  StuDXIA - 学生団体
                  <ExternalLink className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <Badge className="mb-4">デジタル人材育成団体</Badge>
                <p className="text-muted-foreground mb-4">
                  創設から1ヶ月で慶應・東大・早稲田・一橋に加え、起業家や専門学生など多様な人材が在籍するデジタル人材育成団体。上場企業やテック企業とも連携し、次世代のデジタル人材を育成しています。
                </p>
                <Link
                  href="https://www.studxia.com"
                  target="_blank"
                  className="text-primary hover:underline flex items-center"
                >
                  ウェブサイトを見る <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* More about me Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            More about me
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-2xl">
                  {aboutMeImages.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`山本公才 プロフィール ${index + 1}`}
                      width={400}
                      height={500}
                      className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  慶應義塾大学経済学部在籍。金融機関・税理士事務所でのインターン経験や、経理代行事業の起業を通じて、ビジネスや数字の現場に触れ、デジタル分野の可能性を実感。AI・DXを学ぶ中で、創設から1ヶ月で慶應・東大・早稲田・一橋に加え、起業家や専門学生など多様な人材が在籍するデジタル人材育成団体"StuDXIA"を立ち上げ、上場企業やテック企業とも連携。JDLA認定AIジェネラリスト資格と簿記資格を保有。
                </p>

                <p>
                  現在は、これまでの経験と、SNSにおける発信力やトレンドへの深い理解を基に、株式会社Luminous
                  Coreを設立し、代表取締役CEOに就任しました。当社は『AI技術』と『グロース戦略』を掛け合わせ、SNSを起点としたクライアントの事業成果を最大化する、グローステック・カンパニーです。AIを活用したSNSアカウントの運用代行から、成果を最大化するためのシステム・ツールのオーダーメイド開発まで、一気通貫で手掛けています。
                </p>

                <p>趣味でゲーム開発、モデル活動・コスプレ、そしてAIに関するSNS発信も行っています。</p>

                <div className="flex flex-wrap gap-2 mt-6">
                  <Badge variant="secondary">JDLA認定AIジェネラリスト</Badge>
                  <Badge variant="secondary">簿記資格</Badge>
                  <Badge variant="secondary">ゲーム開発</Badge>
                  <Badge variant="secondary">モデル活動</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Projects & Activities
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <Image
                  src="/system.png"
                  alt="AI Development"
                  width={300}
                  height={200}
                  className="rounded-lg w-full object-cover mb-4"
                />
                <h3 className="text-xl font-bold mb-2">AI システム開発</h3>
                <p className="text-muted-foreground">クライアント向けのオーダーメイドAIシステム・ツールの開発</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <Image
                  src="/SNS.png"
                  alt="SNS Growth"
                  width={300}
                  height={200}
                  className="rounded-lg w-full object-cover mb-4"
                />
                <h3 className="text-xl font-bold mb-2">SNS グロース戦略</h3>
                <p className="text-muted-foreground">AIを活用したSNSアカウントの運用代行とグロース戦略</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <Image
                  src="/game.png"
                  alt="Game Development"
                  width={300}
                  height={200}
                  className="rounded-lg w-full object-cover mb-4"
                />
                <h3 className="text-xl font-bold mb-2">ゲーム開発</h3>
                <p className="text-muted-foreground">
                  AIが物語を織りなす、新しいメタバース体験。最終ビジョン「アニメワールド」に向けた、最初の世界のMVPを開発しています。
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <Image
                  src="/model.png"
                  alt="Model & Cosplay"
                  width={300}
                  height={200}
                  className="rounded-lg w-full object-cover mb-4"
                />
                <h3 className="text-xl font-bold mb-2">表現活動：モデル / コスプレ</h3>
                <p className="text-muted-foreground">
                  モデル・コスプレの活動もしています！
                  <br />
                  アニメ大好きです！！
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Creative & SNS Section */}
      <section id="sns" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Creative & SNS
          </h2>

          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <div className="relative w-full max-w-2xl mx-auto h-[400px] overflow-hidden rounded-lg shadow-2xl">
                {snsVideos.map((video, index) => (
                  <video
                    key={index}
                    src={video}
                    autoPlay
                    muted
                    loop
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xl">事業や協業のご相談はお気軽にDMください！</p>
              <p className="text-2xl">↓　↓　↓</p>

              <Link
                href="https://www.instagram.com/kousai_ai_?igsh=bzBuNjFpODZjbWph&utm_source=qr"
                target="_blank"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <Instagram className="h-6 w-6" />
                <span>Instagram をフォロー</span>
                <ExternalLink className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <div className="flex justify-center space-x-6">
              <Link
                href="https://www.instagram.com/kousai_ai_?igsh=bzBuNjFpODZjbWph&utm_source=qr"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:contact@example.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>

            <div className="text-muted-foreground">
              <p>&copy; 2024 山本公才 / Kousai Yamamoto. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
