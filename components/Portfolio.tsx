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
            {["about", "sns"].map((item) => (
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
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-12 tracking-tight perspective-1000"
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
            className="mb-12 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { text: "Web開発 & デジタルマーケティング", icon: <Zap className="w-6 h-6" />, gradient: "from-blue-500 to-cyan-500" },
              { text: "学生団体 StuDXIA 創設者", icon: <Rocket className="w-6 h-6" />, gradient: "from-purple-500 to-pink-500" },
              { text: "慶應義塾大学 経済学部 在学", icon: <Sparkles className="w-6 h-6" />, gradient: "from-amber-500 to-orange-500" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50, rotateY: -30 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.4 + index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.03, x: 10, rotateY: 5 }}
                className="group perspective-1000"
              >
                <div className="relative mx-auto max-w-2xl preserve-3d">
                  {/* Background Glow */}
                  <motion.div 
                    className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-70 blur-xl transition-opacity duration-500 rounded-3xl`}
                  />
                  
                  {/* Card */}
                  <div className="relative glass backdrop-blur-xl rounded-3xl px-8 py-5 border border-white/10 group-hover:border-white/20 transition-all duration-500 overflow-hidden">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Content */}
                    <div className="relative flex items-center justify-center gap-4">
                      <motion.div
                        className={`text-white/70 group-hover:text-white transition-all duration-300`}
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${item.gradient} bg-opacity-20`}>
                          {item.icon}
                        </div>
                      </motion.div>
                      <p className="text-lg md:text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                        {item.text}
                      </p>
                    </div>
                    
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

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
        className="py-32 relative overflow-hidden"
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
                      
                      {/* Modern Navigation */}
                      <div className="absolute bottom-6 left-0 right-0">
                        <div className="flex justify-center items-center gap-3">
                          {aboutMeImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className="group relative"
                            >
                              <motion.div
                                className="w-12 h-1 rounded-full overflow-hidden bg-white/30 backdrop-blur-sm"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <motion.div
                                  className="h-full bg-white"
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
                {/* Introduction Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                  <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                    <div className="absolute top-4 left-8 w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white mt-8">My Journey</h3>
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">慶應義塾大学経済学部</span>で学びながら、
                      ビジネスの実践を通じて成長してきました。
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">金融機関</span>や
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">税理士事務所</span>でのインターン、
                      そして自ら立ち上げた<span className="text-amber-600 dark:text-amber-400 font-semibold">経理代行事業</span>を通じて、
                      デジタル技術の可能性に目覚めました。
                    </p>
                  </div>
                </motion.div>
                
                {/* Achievement Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl p-8 shadow-xl border border-blue-100 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Rocket className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">創設した団体</h3>
                    </div>
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                      AI・DXの学習を深める中で、
                      <span className="text-purple-600 dark:text-purple-400 font-bold text-xl">「StuDXIA」</span>を創設。
                      わずか1ヶ月で<span className="text-rose-600 dark:text-rose-400 font-semibold">慶應・東大・早稲田・一橋</span>の学生や
                      起業家など多様な人材が集まる団体に成長させ、
                      上場企業やテック企業との連携も実現しました。
                    </p>
                  </div>
                </motion.div>

                {/* Current Business Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-700" />
                  
                  <div className="relative bg-gradient-to-br from-gray-50/90 to-white/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
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

                {/* Hobbies Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="relative"
                >
                  <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-3xl p-8 shadow-xl border border-purple-100 dark:border-gray-700">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Passions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { icon: <Code2 className="w-5 h-5" />, text: "アプリ開発", color: "from-purple-500 to-purple-600" },
                        { icon: <Palette className="w-5 h-5" />, text: "ゲーム開発", color: "from-pink-500 to-pink-600" },
                        { icon: <Sparkles className="w-5 h-5" />, text: "モデル活動", color: "from-rose-500 to-rose-600" },
                        { icon: <Globe className="w-5 h-5" />, text: "コスプレ", color: "from-fuchsia-500 to-fuchsia-600" }
                      ].map((hobby, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative group cursor-pointer"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${hobby.color} rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                          <div className="relative bg-white dark:bg-gray-700 rounded-xl p-4 shadow-lg text-center">
                            <div className={`w-10 h-10 mx-auto mb-2 bg-gradient-to-r ${hobby.color} rounded-lg flex items-center justify-center text-white`}>
                              {hobby.icon}
                            </div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{hobby.text}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
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