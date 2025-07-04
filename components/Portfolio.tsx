"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, X, ExternalLink, Instagram, Mail, ChevronDown, Sparkles, Zap, Rocket, Code2, Palette, Globe, Facebook, Linkedin, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { throttle, rafThrottle } from "@/lib/performance"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentBgImageIndex, setCurrentBgImageIndex] = useState(0)
  const [particles, setParticles] = useState<Array<{id: number, initialX: number, initialY: number, targetX: number, targetY: number}>>([])
  
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const businessRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)

  const aboutMeImages = [
    "/more about me1.JPG",
    "/more about me2.JPG", 
    "/more about me3.jpeg",
    "/IMG_8019.JPG"
  ]


  const backgroundImages = [
    "/Luminous Core.png",
    "/StuDXIA.jpg"
  ]

  useEffect(() => {
    setMounted(true)
    const handleScroll = throttle(() => setScrollY(window.scrollY), 16) // 60fps
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Initialize particles after mount
    const newParticles = [...Array(5)].map((_, i) => ({
      id: i,
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight
    }))
    setParticles(newParticles)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
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
      setCurrentBgImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)
    
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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50 
            ? "bg-background/90 backdrop-blur-xl border-b border-white/10 shadow-lg" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent cursor-pointer"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            K.Y
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["about", "business", "projects", "sns"].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className="relative py-2 px-4 text-base font-medium transition-colors hover:text-primary"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <span className="relative z-10 capitalize">{item}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
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
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Background Gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-purple-900/40 to-pink-900/30 animate-gradient"
          style={{ backgroundSize: "400% 400%" }}
        />
        
        {/* Parallax Background Images */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ y: parallaxY }}
        >
          {backgroundImages.map((image, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentBgImageIndex ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </motion.div>
        
        {/* Floating Particles - Reduced count and optimized */}
        {mounted && particles.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-2 h-2 bg-white/10 rounded-full will-change-transform"
                initial={{
                  x: particle.initialX,
                  y: particle.initialY,
                }}
                animate={{
                  x: particle.targetX,
                  y: particle.targetY,
                }}
                transition={{
                  duration: 10 + particle.id * 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div 
            className="mb-4 mt-8 md:mt-12"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1000}
              transitionSpeed={500}
              scale={1.02}
            >
              <div className="relative inline-block">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                <Image
                  src="/Kousai.png"
                  alt="山本公才"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto border-4 border-white/20 shadow-2xl relative z-10"
                />
              </div>
            </Tilt>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.span 
              className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              {"山本 公才".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="inline-block"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: Math.random() * 10 - 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          <motion.div 
            className="text-lg md:text-xl mb-8 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { text: "Luminous Core 主宰", icon: <Zap className="w-5 h-5" /> },
              { text: "学生団体 StuDXIA 代表", icon: <Rocket className="w-5 h-5" /> },
              { text: "慶應義塾大学 経済学部 在学", icon: <Sparkles className="w-5 h-5" /> },
              { text: "Faith United 所属モデル", icon: <Palette className="w-5 h-5" /> },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.4 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="group"
              >
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl px-6 py-4 mx-auto max-w-2xl border border-white/10 hover:border-white/30 transition-all duration-300 glass-morphism flex items-center justify-center gap-3">
                  <motion.div
                    className="text-white/60 group-hover:text-white transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <p className="text-white font-semibold text-shadow-lg">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.button
              className="relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold overflow-hidden shadow-xl"
              onClick={() => scrollToSection("business")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span className="relative z-10 flex items-center gap-3">
                詳しく見る
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
              </motion.span>
              
              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 0, opacity: 0.5 }}
                whileHover={{
                  scale: [1, 1.5, 2],
                  opacity: [0.5, 0.3, 0],
                }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                }}
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Business & Community Section */}
      <motion.section 
        ref={businessRef}
        id="business" 
        className="py-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `url('/大理石.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}></div>
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Business & Community
            </span>
            <motion.div
              className="h-1 w-32 mx-auto mt-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.01}
                transitionSpeed={500}
                className="h-full"
              >
                <Card className="group h-full hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform border-0 bg-gradient-to-br from-white/90 via-blue-50/50 to-cyan-50/30 hover:from-white/95 hover:via-blue-50/30 hover:to-cyan-50/20 backdrop-blur-sm relative overflow-hidden gradient-border">
                  <CardContent className="p-8 relative z-10">
                    <motion.div 
                      className="mb-6 overflow-hidden rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src="/Luminous Core.png"
                        alt="Luminous Core"
                        width={400}
                        height={300}
                        className="rounded-lg w-full object-cover"
                      />
                    </motion.div>
                    <motion.h3 
                      className="text-3xl md:text-4xl font-bold mb-6 flex items-center"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 150 }}
                    >
                      <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Luminous Core
                      </span>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <ExternalLink className="ml-3 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                      </motion.div>
                    </motion.h3>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: 0.3 }}
                    >
                      <Badge className="mb-6 text-lg px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-600 text-blue-900 font-bold shadow-lg backdrop-blur-md">
                        <Zap className="w-4 h-4 mr-2 inline" />
                        グローステック・パートナー
                      </Badge>
                    </motion.div>
                    <motion.p 
                      className="text-lg md:text-xl leading-loose mb-6 font-light text-gray-700 tracking-wide"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      Luminous Coreは、<span className="font-semibold text-blue-600">デジタル戦略</span>で事業成果を最大化するグローステック・パートナーです。私たちは、<span className="font-semibold text-cyan-600">AI技術と専門チーム</span>を駆使し、SNSグロース、Web制作、業務効率化をワンストップで実現します。
                    </motion.p>
                    <motion.div
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 150 }}
                    >
                      <Link
                        href="https://lc-j64q.vercel.app/"
                        target="_blank"
                        className="inline-flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-cyan-700 transition-all"
                      >
                        ウェブサイトを見る 
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.01}
                transitionSpeed={500}
                className="h-full"
              >
                <Card className="group h-full hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 transform border-0 bg-gradient-to-br from-white/90 via-purple-50/50 to-pink-50/30 hover:from-white/95 hover:via-purple-50/30 hover:to-pink-50/20 backdrop-blur-sm relative overflow-hidden gradient-border">
                  <CardContent className="p-8 relative z-10">
                    <motion.div 
                      className="mb-6 overflow-hidden rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src="/StuDXIA.jpg"
                        alt="StuDXIA"
                        width={400}
                        height={300}
                        className="rounded-lg w-full object-cover"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      />
                    </motion.div>
                    <motion.h3 
                      className="text-3xl md:text-4xl font-bold mb-6 flex items-center"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 150 }}
                    >
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        StuDXIA - 学生団体
                      </span>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <ExternalLink className="ml-3 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-purple-600" />
                      </motion.div>
                    </motion.h3>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: 0.3 }}
                    >
                      <Badge className="mb-6 text-lg px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-600 text-purple-900 font-bold shadow-lg backdrop-blur-md">
                        <Rocket className="w-4 h-4 mr-2 inline" />
                        デジタル人材育成団体
                      </Badge>
                    </motion.div>
                    <motion.p 
                      className="text-lg md:text-xl leading-loose mb-6 font-light text-gray-700 tracking-wide"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      未来のデジタルリーダーを育成する、最高峰大学連合のイノベーションハブ。<span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">慶應・東大・早稲田・一橋</span>のエリート学生から、革新的起業家、専門技術者まで、各界のトップタレントが結集。上場企業・テックジャイアントとの戦略パートナーシップで、業界を変革する次世代タレントを育成。
                    </motion.p>
                    <motion.div
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 150 }}
                    >
                      <Link
                        href="https://www.studxia.com"
                        target="_blank"
                        className="inline-flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all"
                      >
                        ウェブサイトを見る 
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* More about me Section */}
      <motion.section 
        ref={aboutRef}
        id="about" 
        className="py-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `url('/大理石.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}></div>
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              More about me
            </span>
            <motion.div
              className="h-1 w-32 mx-auto mt-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Tilt
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  perspective={1000}
                  scale={1.02}
                  transitionSpeed={1000}
                >
                  <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl">
                    {aboutMeImages.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ 
                          opacity: index === currentImageIndex ? 1 : 0,
                          scale: index === currentImageIndex ? 1 : 1.1
                        }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={image}
                          alt={`山本公才 プロフィール ${index + 1}`}
                          width={400}
                          height={500}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-8">
                      <div className="flex justify-center gap-2">
                        {aboutMeImages.map((_, index) => (
                          <motion.div
                            key={index}
                            className={`h-2 rounded-full bg-white/50 cursor-pointer`}
                            animate={{ 
                              width: index === currentImageIndex ? 32 : 8,
                              backgroundColor: index === currentImageIndex ? '#ffffff' : 'rgba(255,255,255,0.5)'
                            }}
                            onClick={() => setCurrentImageIndex(index)}
                            whileHover={{ scale: 1.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>

              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.p 
                  className="text-xl md:text-2xl leading-relaxed font-light"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <span className="font-semibold text-3xl md:text-4xl text-blue-600">慶應義塾大学</span>経済学部在籍。金融機関・税理士事務所でのインターン経験や、経理代行事業の起業を通じて、ビジネスや数字の現場に触れ、デジタル分野の可能性を実感。AI・DXを学ぶ中で、創設から1ヶ月で<span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">慶應・東大・早稲田・一橋</span>に加え、起業家や専門学生など多様な人材が在籍するデジタル人材育成団体<span className="font-bold text-purple-600">"StuDXIA"</span>を立ち上げ、上場企業やテック企業とも連携。<span className="font-semibold">JDLA認定AIジェネラリスト資格</span>と<span className="font-semibold">簿記資格</span>を保有。
                </motion.p>

                <motion.p 
                  className="text-xl md:text-2xl leading-relaxed font-light"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  現在は、これまでの経験と知見を基に、グローステック・事業<span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">『Luminous Core』</span>を創設し、その代表として活動しています。Luminous Coreは、<span className="font-semibold text-blue-600">デジタル戦略で事業成果を最大化するグローステック・パートナー</span>として、<span className="font-semibold text-cyan-600">AI技術と専門チーム</span>を駆使し、SNSグロース、Web制作、業務効率化をワンストップで実現します。
                </motion.p>

                <motion.p 
                  className="text-xl md:text-2xl leading-relaxed font-light"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  趣味で<span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">ゲーム開発</span>、<span className="font-semibold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">モデル活動・コスプレ</span>、そしてAIに関するSNS発信も行っています。
                </motion.p>

                <motion.div 
                  className="flex flex-wrap gap-3 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  {[
                    { text: "JDLA認定AIジェネラリスト", icon: <Code2 className="w-4 h-4 mr-2" />, color: "from-blue-600 to-cyan-600" },
                    { text: "簿記資格", icon: <Zap className="w-4 h-4 mr-2" />, color: "from-green-600 to-emerald-600" },
                    { text: "ゲーム開発", icon: <Rocket className="w-4 h-4 mr-2" />, color: "from-purple-600 to-pink-600" },
                    { text: "モデル活動", icon: <Palette className="w-4 h-4 mr-2" />, color: "from-pink-600 to-rose-600" },
                  ].map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        type: "spring", 
                        delay: 1 + index * 0.1,
                        stiffness: 120
                      }}
                      whileHover={{ scale: 1.1, rotate: [-1, 1, -1] }}
                    >
                      <Badge 
                        variant="secondary" 
                        className={`text-base px-6 py-3 bg-gradient-to-r ${badge.color} text-white border-0 shadow-lg flex items-center`}
                      >
                        {badge.icon}
                        {badge.text}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        ref={projectsRef}
        id="projects" 
        className="py-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `url('/大理石.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}></div>
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Projects & Activities
            </span>
            <motion.div
              className="h-1 w-32 mx-auto mt-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "AI システム開発",
                description: "クライアント向けのオーダーメイドAIシステム・ツールの開発",
                image: "/system.png",
                icon: <Code2 className="w-6 h-6" />,
                color: "from-blue-500 to-cyan-500",
                shadowColor: "blue"
              },
              {
                title: "SNS グロース戦略",
                description: "AIを活用したSNSアカウントの運用代行とグロース戦略",
                image: "/SNS.png",
                icon: <Globe className="w-6 h-6" />,
                color: "from-green-500 to-emerald-500",
                shadowColor: "green"
              },
              {
                title: "ゲーム開発",
                description: "AIが物語を織りなす、新しいメタバース体験。最終ビジョン「アニメワールド」に向けた、最初の世界のMVPを開発しています。",
                image: "/game.png",
                icon: <Rocket className="w-6 h-6" />,
                color: "from-purple-500 to-pink-500",
                shadowColor: "purple"
              },
              {
                title: "表現活動：モデル / コスプレ",
                description: "モデル・コスプレの活動もしています！\nアニメ大好きです！！",
                image: "/model.png",
                icon: <Palette className="w-6 h-6" />,
                color: "from-pink-500 to-rose-500",
                shadowColor: "pink"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Tilt
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  perspective={1000}
                  scale={1.05}
                  transitionSpeed={1000}
                  className="h-full"
                >
                  <Card className={`group h-full hover:shadow-2xl hover:shadow-${project.shadowColor}-500/25 transition-all duration-500 transform border-0 relative overflow-hidden gradient-border`}>
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url('/大理石.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}></div>
                    <div className="absolute inset-0 bg-white/85"></div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    <CardContent className="p-6 relative z-10 h-full flex flex-col">
                      <motion.div 
                        className="relative overflow-hidden rounded-lg mb-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={300}
                          height={200}
                          className="w-full object-cover"
                        />
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                        />
                      </motion.div>
                      
                      <motion.div
                        className={`absolute -top-2 -right-2 w-14 h-14 bg-gradient-to-br ${project.color} rounded-full flex items-center justify-center text-white shadow-lg`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {project.icon}
                      </motion.div>
                      
                      <motion.h3 
                        className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        {project.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-lg md:text-xl leading-relaxed flex-grow"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        {project.description.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < project.description.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </motion.p>
                    </CardContent>
                  </Card>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SNS Links Section */}
      <motion.section 
        className="py-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `url('/大理石.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}></div>
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Connect with Me
            </span>
            <motion.div
              className="h-1 w-32 mx-auto mt-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            <motion.p 
              className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              事業や協業のご相談はお気軽にDMください！
            </motion.p>

            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {[
                { 
                  href: "https://www.instagram.com/kousai_yamamoto?igsh=ZGs1M200NWY0dXp6&utm_source=qr", 
                  icon: Instagram, 
                  label: "Instagram",
                  gradient: "from-pink-500 to-purple-600"
                },
                { 
                  href: "https://line.me/ti/p/LQZTlwfkC4", 
                  icon: MessageCircle, 
                  label: "LINE",
                  gradient: "from-green-500 to-green-600"
                },
                { 
                  href: "https://www.facebook.com/profile.php?id=100063969728654", 
                  icon: Facebook, 
                  label: "Facebook",
                  gradient: "from-blue-600 to-blue-700"
                },
                { 
                  href: "https://www.linkedin.com/in/%E5%85%AC%E6%89%8D-%E5%B1%B1%E6%9C%AC-39319a358?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", 
                  icon: Linkedin, 
                  label: "LinkedIn",
                  gradient: "from-blue-700 to-blue-800"
                }
              ].map((social, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    className="group relative block"
                  >
                    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${social.gradient} p-6 shadow-xl transition-all duration-300 hover:shadow-2xl`}>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex flex-col items-center gap-3">
                        <social.icon className="h-12 w-12 text-white" />
                        <span className="text-white font-semibold text-lg">{social.label}</span>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="py-12 relative overflow-hidden border-t border-gray-200/50" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `url('/大理石.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}></div>
        <div className="absolute inset-0 bg-white/90"></div> 
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6">

            <motion.div 
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-lg font-light">
                &copy; {new Date().getFullYear()} 
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mx-2">
                  山本公才 / Kousai Yamamoto
                </span>
                All rights reserved.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}