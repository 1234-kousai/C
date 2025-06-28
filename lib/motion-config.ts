// Framer Motion configuration for smooth animations

export const smoothTransition = {
  type: "spring",
  stiffness: 100,
  damping: 30,
  mass: 1
}

export const fadeInUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: smoothTransition
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const scaleVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: smoothTransition
  }
}

// Viewport configuration for better performance
export const viewportConfig = {
  once: true,
  margin: "-100px"
}