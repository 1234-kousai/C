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
  
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const businessRef = useRef<HTMLElement>(null)

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
    const handleScroll = throttle(() => setScrollY(window.scrollY), 100) // 10fps for header only
    
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
            className="text-xl md:text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent cursor-pointer"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            Kousai Yamamoto
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
        className="relative min-h-screen flex items-center justify-center overflow-hidden noise-texture py-20 md:py-0"
      >
        {/* Premium Gradient Mesh Background */}
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        
        {/* Simplified Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-2xl transform -translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-cyan-600/20 to-transparent rounded-full blur-2xl transform translate-x-1/4 translate-y-1/4" />
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

        <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-4 py-8">
          <motion.div 
            className="mb-6 md:mb-8"
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
                <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] p-2 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20">
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
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 md:mb-12 tracking-tight perspective-1000"
            initial={{ opacity: 0, z: -100 }}
            animate={{ opacity: 1, z: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div className="relative inline-block">
              {/* Static Background Glow */}
              <div className="absolute -inset-x-4 md:-inset-x-10 lg:-inset-x-20 -inset-y-4 md:-inset-y-8 lg:-inset-y-10 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl md:blur-2xl">
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
              className="relative group px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-bold overflow-hidden rounded-full"
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
        className="py-20 relative overflow-hidden"
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
                <motion.div
                  className="relative group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {/* Premium Card Design */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                  
                  {/* Glass Card */}
                  <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-2xl overflow-hidden">
                    {/* Animated Border Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10" />
                    
                    {/* Content Container */}
                    <motion.div 
                      className="relative p-8 md:p-10"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <p className="text-lg md:text-xl leading-loose text-gray-800 dark:text-gray-200">
                        {[
                          { text: "慶應義塾大学", style: "font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent" },
                          { text: "経済学部在籍。" },
                          { text: "金融機関・税理士事務所", style: "font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent" },
                          { text: "でのインターン経験や、" },
                          { text: "経理代行事業", style: "font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent" },
                          { text: "の起業を通じて、ビジネスや数字の現場に触れ、デジタル分野の可能性を実感。" },
                          { text: "AI・DX", style: "font-bold bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent" },
                          { text: "を学ぶ中で、多様な人材が在籍するデジタル人材育成団体" },
                          { text: "「StuDXIA」", style: "font-black text-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent inline-block mx-1 transform hover:scale-105 transition-transform duration-300" },
                          { text: "を立ち上げ、上場企業やテック企業と連携。それとは別に、個人事業として大手企業のデジタルプロモーションを支援し、コンバージョン重視のLP開発などを手掛けてきました。" }
                        ].map((segment, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.6,
                              delay: 0.5 + index * 0.05,
                              ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            className={segment.style || ""}
                          >
                            {segment.text}
                          </motion.span>
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
                >
                  {/* Modern Card with Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-700" />
                  
                  <div className="relative bg-gradient-to-br from-gray-50/90 to-white/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                    {/* Subtle Pattern Overlay */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
                    </div>
                    
                    <p className="relative text-lg md:text-xl leading-loose text-gray-800 dark:text-gray-200">
                      {[
                        { text: "現在は、" },
                        { text: "2つの事業", style: "font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent" },
                        { text: "を率いています。一つは、企業の" },
                        { text: "DX（デジタル変革）", style: "font-bold bg-gradient-to-r from-cyan-600 to-cyan-400 bg-clip-text text-transparent" },
                        { text: "を支援するグローステック・事業" },
                        { text: "『Luminous Core』", style: "font-black text-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent inline-block mx-1 px-3 py-1 rounded-xl bg-blue-100/10 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-800/30 transform hover:scale-105 transition-all duration-300" },
                        { text: "。そしてもう一つが、" },
                        { text: "夜職業界", style: "font-semibold text-gray-700 dark:text-gray-300" },
                        { text: "に特化したSNSプロデュースチーム" },
                        { text: "『Noir Producers』", style: "font-black text-2xl bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-gray-300 dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent inline-block mx-1 px-3 py-1 rounded-xl bg-gray-100/10 dark:bg-gray-900/20 border border-gray-300/30 dark:border-gray-700/30 transform hover:scale-105 transition-all duration-300" },
                        { text: "です。" },
                        { text: "IT資格", style: "font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent" },
                        { text: "や" },
                        { text: "簿記資格", style: "font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent" },
                        { text: "で培った知識も、これらの事業の土台となっています。" }
                      ].map((segment, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: 0.8 + index * 0.03,
                            ease: [0.25, 0.1, 0.25, 1]
                          }}
                          className={segment.style || ""}
                        >
                          {segment.text}
                        </motion.span>
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
                >
                  {/* Elegant Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-rose-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
                  
                  {/* Refined Card */}
                  <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-gray-200/30 dark:border-gray-700/30 shadow-xl overflow-hidden">
                    {/* Animated Accent */}
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    <motion.p 
                      className="relative text-lg md:text-xl leading-loose text-gray-800 dark:text-gray-200"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
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
                        <motion.span
                          key={index}
                          className={segment.style || ""}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={segment.style ? { scale: 1.1, y: -2 } : {}}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: 1.4 + index * 0.02,
                            type: "spring",
                            stiffness: 200
                          }}
                        >
                          {segment.text}
                        </motion.span>
                      ))}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Business & Community Section */}
      <section 
        ref={businessRef}
        id="business" 
        className="py-24 relative overflow-hidden noise-texture"
      >
        {/* Simple Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
              <motion.span 
                className="inline-block text-gradient-premium"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                Business & Community
              </motion.span>
            </h2>
            
            {/* Animated Underline */}
            <motion.div className="flex justify-center">
              <motion.div
                className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 200 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {/* Luminous Core Card */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="perspective-1000"
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1000}
                gyroscope={true}
                className="h-full preserve-3d"
              >
                <div className="group h-full relative">
                  {/* Static Hover Glow */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Main Card */}
                  <Card className="h-full border-0 rounded-3xl overflow-hidden relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl">
                    {/* Top Gradient Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />
                    
                    <CardContent className="p-8 relative z-10">
                      {/* Image Container */}
                      <motion.div 
                        className="mb-8 overflow-hidden rounded-2xl relative group"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                        <Image
                          src="/Luminous Core.png"
                          alt="Luminous Core"
                          width={400}
                          height={300}
                          className="rounded-2xl w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </motion.div>
                      
                      {/* Title */}
                      <motion.h3 
                        className="text-3xl md:text-4xl font-black mb-6 flex items-center justify-between"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 150 }}
                      >
                        <span className="text-gradient-premium">
                          Luminous Core
                        </span>
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        >
                          <ExternalLink className="h-6 w-6 opacity-50 group-hover:opacity-100 transition-all text-blue-600" />
                        </motion.div>
                      </motion.h3>
                      
                      {/* Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", delay: 0.3 }}
                        className="mb-6"
                      >
                        <div className="inline-block">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 blur-md opacity-50" />
                            <Badge className="relative text-sm px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 border-0 text-white font-bold shadow-xl">
                        <Zap className="w-4 h-4 mr-2 inline" />
                        グローステック・パートナー
                            </Badge>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Description */}
                      <motion.p 
                        className="text-base md:text-lg leading-relaxed mb-8 text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        Luminous Coreは、<span className="text-blue-600 dark:text-blue-400 font-semibold">デジタル戦略</span>で事業成果を最大化するグローステック・パートナーです。
                        <span className="text-cyan-600 dark:text-cyan-400 font-semibold">AI技術と専門チーム</span>を駆使し、SNSグロース、大手製薬会社や著名ブランドのプロモーションLP開発をはじめとするWeb制作、業務効率化をワンストップで実現します。
                      </motion.p>
                      
                      {/* CTA Button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href="https://lc-j64q.vercel.app/"
                          target="_blank"
                          className="relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-2xl group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 transition-transform duration-300 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <span className="relative z-10 text-white font-bold text-lg">ウェブサイトを見る</span>
                          <motion.div
                            className="relative z-10"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ExternalLink className="h-5 w-5 text-white" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    </CardContent>
                  </Card>
                </div>
              </Tilt>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
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

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.01}
                transitionSpeed={500}
                className="h-full"
              >
                <Card className="group h-full hover:shadow-2xl hover:shadow-gray-500/10 transition-all duration-500 transform border-0 bg-gradient-to-br from-white/90 via-gray-50/50 to-slate-50/30 hover:from-white/95 hover:via-gray-50/30 hover:to-slate-50/20 backdrop-blur-sm relative overflow-hidden gradient-border">
                  <CardContent className="p-8 relative z-10">
                    <motion.div 
                      className="mb-6 overflow-hidden rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src="/NoirProducers.png"
                        alt="Noir Producers"
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
                      <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        Noir Producers
                      </span>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <ExternalLink className="ml-3 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-gray-800" />
                      </motion.div>
                    </motion.h3>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: 0.3 }}
                    >
                      <Badge className="mb-6 text-lg px-6 py-3 bg-gradient-to-r from-gray-100 to-slate-100 border-2 border-gray-600 text-gray-900 font-bold shadow-lg backdrop-blur-md">
                        <Sparkles className="w-4 h-4 mr-2 inline" />
                        夜職専門SNSプロデュース
                      </Badge>
                    </motion.div>
                    <motion.p 
                      className="text-lg md:text-xl leading-loose mb-6 font-light text-gray-700 tracking-wide"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      夜職業界に特化した<span className="font-semibold text-gray-800">SNSプロデュース専門チーム</span>。感覚と経験則に頼りがちなこの業界のSNS戦略を、<span className="font-semibold text-gray-600">データとロジック</span>で再構築。独自開発した分析プロダクトも活用し、あなたという存在を<span className="font-semibold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">「再現性のある、稼げる戦略的資産」</span>へと変貌させる、唯一無二のソリューションを提供。
                    </motion.p>
                    <motion.div
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 150 }}
                    >
                      <Link
                        href="https://noir-7u2c.vercel.app"
                        target="_blank"
                        className="inline-flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent hover:from-gray-800 hover:to-gray-600 transition-all"
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
      </section>


      {/* SNS Links Section */}
      <section 
        className="py-20 relative overflow-hidden"
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
      </section>

      {/* Family Section */}
      <section 
        className="py-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-700 dark:text-gray-300">
            余談ですが、家系図です！
          </h3>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/family tree.png"
                    alt="Family Tree"
                    width={500}
                    height={400}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="text-center md:text-left">
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                  実は私は、四人兄弟の末っ子です。
                  兄たちは昔から東大、旧帝の医学部など、非常に優秀で学級委員を務めるようなタイプでした。反対に、私は毎日先生に怒られているような問題児で…笑
                  そんな私ですが、一生懸命頑張らせていただきます！
                  何かお手伝いできることがあれば、いつでもお気軽にお声がけください！
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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