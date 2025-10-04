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
  const [activeSection, setActiveSection] = useState("")
  
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)

  const aboutMeImages = [
    "/more about me1.JPG",
    "/more-about-me-new.jpg", 
    "/more about me3.jpeg",
    "/IMG_8019.JPG"
  ]

  const backgroundImages = [
    "/Luminous Core.png",
    "/StuDXIA.jpg",
    "/NoirProducers.png"
  ]

  useEffect(() => {
    setMounted(true)
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY)

      // Active section detection
      const sections = ["about", "sns"]
      const current = sections.find(id => {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      setActiveSection(current || "")
    }, 100)

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Particles disabled for performance

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
            className="text-xl md:text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            Kousai Yamamoto
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["about", "sns"].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`relative py-2 px-4 text-base font-medium transition-colors ${
                  activeSection === item ? "text-purple-600 dark:text-purple-400" : "hover:text-primary"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {activeSection === item && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 capitalize">{item}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: activeSection === item ? 0 : 1, scale: 1 }}
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
              <button onClick={() => scrollToSection("sns")} className="text-left hover:text-primary transition-colors">
                SNS
              </button>
            </nav>
          </div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden noise-texture"
      >
        {/* Premium Gradient Mesh Background */}
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        
        {/* Simplified Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-2xl" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-600/20 to-transparent rounded-full blur-2xl" />
        </div>
        
        {/* Parallax Background Images */}
        <motion.div 
          className="absolute inset-0 opacity-30 z-0"
          style={{ y: parallaxY }}
        >
          {backgroundImages.map((image, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentBgImageIndex ? 0.4 : 0 }}
              transition={{ duration: 1.5 }}
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "saturate(0.5) contrast(1.2)",
              }}
            />
          ))}
        </motion.div>
        
        {/* Floating Particles - Disabled for performance */}

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div 
            className="mb-8 mt-12 md:mt-16"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              transitionSpeed={1000}
              scale={1.05}
              gyroscope={true}
            >
              <div className="relative inline-block">
                {/* Static Glow Ring */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 blur-xl" />
                
                {/* Simplified Container */}
                <div className="relative w-[220px] h-[220px] p-2 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20">
                  {/* Inner Glow */}
                  <div className="absolute inset-2 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-cyan-400/20 rounded-full animate-pulse" />
                  
                  {/* Profile Image */}
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src="/profile-main.png"
                      alt="山本公才"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  
                  {/* Premium Border */}
                  <div className="absolute inset-0 rounded-full ring-2 ring-white/30 ring-offset-2 ring-offset-transparent" />
                </div>
              </div>
            </Tilt>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-12 tracking-tight perspective-1000"
            initial={{ opacity: 0, z: -100 }}
            animate={{ opacity: 1, z: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div className="relative inline-block">
              {/* Static Background Glow */}
              <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-2xl">
              </div>
              
              {/* Main Text */}
              <div className="relative">
                {"山本 公才".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ 
                      opacity: 0, 
                      y: 20
                    }}
                    animate={{ 
                      opacity: 1, 
                      y: 0
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + index * 0.1,
                      ease: "easeOut"
                    }}
                    className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-black"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.h1>


          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="relative"
          >
            <motion.button
              className="relative group px-12 py-5 text-lg font-bold overflow-hidden rounded-full"
              onClick={() => scrollToSection("about")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Static Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
              
              {/* Simple Hover Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300 rounded-full" />
              
              {/* Border */}
              <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300" />
              
              {/* Content */}
              <motion.span className="relative z-10 flex items-center gap-3 text-white font-black tracking-wide">
                <span>詳しく見る</span>
                <motion.div
                  animate={{ 
                    y: [0, 3, 0],
                    rotate: [0, 10, 0, -10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ChevronDown className="h-6 w-6" />
                </motion.div>
              </motion.span>
              
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* More about me Section */}
      <section
        ref={aboutRef}
        id="about"
        className="py-24 md:py-32 relative overflow-hidden"
      >
        {/* Modern Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10" />
          <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div className="inline-block relative">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black">
                <span className="bg-gradient-to-br from-slate-800 via-purple-700 to-blue-800 dark:from-white dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
                  More about me
                </span>
              </h2>
              <motion.div
                className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </motion.div>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Modern Image Gallery */}
              <motion.div 
                className="relative order-2 lg:order-1"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">
                  {/* Decorative Elements */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-300 to-blue-300 dark:from-purple-600 dark:to-blue-600 rounded-3xl blur-2xl opacity-20" />
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full blur-3xl opacity-30" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200 dark:bg-blue-800 rounded-full blur-3xl opacity-30" />
                  
                  {/* Main Image Container */}
                  <div className="relative bg-white dark:bg-gray-900 p-2 rounded-3xl shadow-2xl">
                    <div className="relative w-full h-[600px] md:h-[650px] overflow-hidden rounded-2xl">
                      {aboutMeImages.map((image, index) => (
                        <motion.div
                          key={index}
                          className="absolute inset-0"
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ 
                            opacity: index === currentImageIndex ? 1 : 0,
                            x: index === currentImageIndex ? 0 : -100
                          }}
                          transition={{ 
                            duration: 0.5,
                            ease: "easeInOut"
                          }}
                        >
                          <Image
                            src={image}
                            alt={`山本公才 ${index + 1}`}
                            width={600}
                            height={700}
                            className="w-full h-full object-cover"
                            priority={index === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </motion.div>
                      ))}
                      
                      {/* Modern Navigation - 改善されたプログレスバー */}
                      <div className="absolute bottom-6 left-0 right-0">
                        <div className="flex justify-center items-center gap-3">
                          {aboutMeImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className="group relative"
                            >
                              <motion.div
                                className="w-16 h-1.5 rounded-full overflow-hidden bg-white/20 backdrop-blur-md border border-white/30"
                                whileHover={{ scale: 1.15, height: 8 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                              >
                                <motion.div
                                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                                  initial={{ width: "0%" }}
                                  animate={{
                                    width: index === currentImageIndex ? "100%" : "0%"
                                  }}
                                  transition={{
                                    duration: index === currentImageIndex ? 3 : 0.3,
                                    ease: "linear"
                                  }}
                                />
                              </motion.div>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Image Counter */}
                      <motion.div 
                        className="absolute top-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <span className="text-white text-sm font-medium">
                          {currentImageIndex + 1} / {aboutMeImages.length}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Modern Text Content */}
              <motion.div 
                className="space-y-8 order-1 lg:order-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="relative group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(147, 51, 234, 0.3)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

                  {/* 左アクセントバー */}
                  <div className="absolute left-0 top-4 bottom-4 w-2 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-l-3xl" />

                  <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10" />

                    <motion.div
                      className="relative p-8 md:p-10 pl-10 md:pl-12"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <p className="text-lg md:text-xl leading-loose text-gray-800 dark:text-gray-200">
                        {[
                          { text: "慶應義塾大学", style: "font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent" },
                          { text: "経済学部在籍。" },
                          { text: "AI・DX", style: "font-bold bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent" },
                          { text: "を学ぶ中で、デジタル分野の可能性を実感し、" },
                          { text: "慶應生を中心とした", style: "font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent" },
                          { text: "デジタル人材育成団体" },
                          { text: "「StuDXIA」", style: "font-black text-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent inline-block mx-1 transform hover:scale-105 transition-transform duration-300" },
                          { text: "を立ち上げ、上場企業やテック企業と連携してDX/AI教育を推進。それとは別に、大手企業のデジタルプロモーションを支援し、コンバージョン重視のLP開発などを手掛けてきました。" }
                        ].map((segment, index) => (
                          <span
                            key={index}
                            className={segment.style || ""}
                          >
                            {segment.text}
                          </span>
                        ))}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="relative group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(59, 130, 246, 0.3)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-700" />

                  <div className="relative bg-gradient-to-br from-gray-50/90 to-white/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden">
                    {/* 上グラデーションバー */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
                    </div>
                    
                    <p className="relative text-lg md:text-xl leading-loose text-gray-800 dark:text-gray-200">
                      {[
                        { text: "現在は、" },
                        { text: "Web開発", style: "font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent" },
                        { text: "と" },
                        { text: "デジタルマーケティング", style: "font-bold bg-gradient-to-r from-cyan-600 to-cyan-400 bg-clip-text text-transparent" },
                        { text: "を中心とした事業を展開しています。" },
                        { text: "SNSプロデュース", style: "font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent" },
                        { text: "から" },
                        { text: "システム開発", style: "font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent" },
                        { text: "まで、企業のデジタル戦略を幅広くサポートしています。" }
                      ].map((segment, index) => (
                        <span
                          key={index}
                          className={segment.style || ""}
                        >
                          {segment.text}
                        </span>
                      ))}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="relative group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* 外側グローエフェクト - より強く */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />

                  <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-purple-200/50 dark:border-purple-700/50 shadow-xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500" />
                    
                    <p className="relative text-lg md:text-xl leading-loose text-gray-800 dark:text-gray-200">
                      {[
                        { text: "モデル活動や" },
                        { text: "韓国大手事務所felicity", style: "font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent" },
                        { text: "でのライバーなど、" },
                        { text: "クリエイティブな分野", style: "font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent" },
                        { text: "でも活動していました。趣味は" },
                        { text: "アニメ", style: "font-bold bg-gradient-to-r from-rose-600 to-rose-400 bg-clip-text text-transparent" },
                        { text: "が大好きなので" },
                        { text: "コスプレ", style: "font-bold bg-gradient-to-r from-fuchsia-600 to-fuchsia-400 bg-clip-text text-transparent" },
                        { text: "をしています！！" }
                      ].map((segment, index) => (
                        <span
                          key={index}
                          className={segment.style || ""}
                        >
                          {segment.text}
                        </span>
                      ))}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SNS Links Section */}
      <section
        id="sns"
        className="py-24 md:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
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
              className="grid grid-cols-4 gap-6 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Instagram - 大きく強調 */}
              <motion.div
                className="col-span-4 md:col-span-2 md:row-span-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0, type: "spring" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="https://www.instagram.com/kousai_yamamoto?igsh=ZGs1M200NWY0dXp6&utm_source=qr"
                  target="_blank"
                  className="group relative block h-full"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] p-12 shadow-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(253,29,29,0.6)] h-full flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex flex-col items-center gap-6">
                      <Instagram className="h-24 w-24 md:h-32 md:w-32 text-white" />
                      <span className="text-white font-bold text-3xl md:text-4xl">Instagram</span>
                      <span className="text-white/80 text-sm md:text-base">@kousai_yamamoto</span>
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </Link>
              </motion.div>

              {/* LINE */}
              <motion.div
                className="col-span-2 md:col-span-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="https://line.me/ti/p/LQZTlwfkC4"
                  target="_blank"
                  className="group relative block h-full"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#00B900] to-[#00B900] p-6 shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,185,0,0.6)] h-full flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex flex-col items-center gap-3">
                      <MessageCircle className="h-12 w-12 text-white" />
                      <span className="text-white font-semibold text-lg">LINE</span>
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

              {/* Facebook */}
              <motion.div
                className="col-span-2 md:col-span-1"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="https://www.facebook.com/profile.php?id=100063969728654"
                  target="_blank"
                  className="group relative block h-full"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1877F2] to-[#0C63D4] p-6 shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(24,119,242,0.6)] h-full flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex flex-col items-center gap-3">
                      <Facebook className="h-12 w-12 text-white" />
                      <span className="text-white font-semibold text-lg">Facebook</span>
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

              {/* LinkedIn */}
              <motion.div
                className="col-span-2 md:col-span-1"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="https://www.linkedin.com/in/%E5%85%AC%E6%89%8D-%E5%B1%B1%E6%9C%AC-39319a358?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  target="_blank"
                  className="group relative block h-full"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A66C2] to-[#004182] p-6 shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(10,102,194,0.6)] h-full flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex flex-col items-center gap-3">
                      <Linkedin className="h-12 w-12 text-white" />
                      <span className="text-white font-semibold text-lg">LinkedIn</span>
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Family Section */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
      >
        {/* 統一されたグラデーション背景 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-pink-900/10" />
          {/* ノイズテクスチャ */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">余談</p>
            <h3 className="text-3xl md:text-4xl font-bold relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                家系図です！
              </span>
              {/* 下線 */}
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "200px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </h3>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* glass morphism エフェクト追加 */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/50 dark:border-gray-700/50">
                  <div className="relative overflow-hidden rounded-2xl">
                    <Image
                      src="/family tree.jpg"
                      alt="Family Tree"
                      width={500}
                      height={400}
                      className="w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="text-center md:text-left"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                  実は私は、四人兄弟の末っ子です。
                  兄たちは昔から東大、旧帝の医学部など、非常に優秀で学級委員を務めるようなタイプでした。反対に、私は毎日先生に怒られているような問題児で…笑
                  そんな私ですが、一生懸命頑張らせていただきます！
                  何かお手伝いできることがあれば、いつでもお気軽にお声がけください！
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="py-16 relative overflow-hidden border-t border-purple-200/30 dark:border-purple-800/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0">
          <Image
            src="/大理石.jpg"
            alt="background"
            fill
            className="object-cover"
            quality={75}
          />
        </div>
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/90 to-purple-50/80 dark:from-gray-900/95 dark:via-gray-900/90 dark:to-purple-900/50"></div> 
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              山本公才 / Kousai Yamamoto
            </div>
            <p className="text-base md:text-lg font-light text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}