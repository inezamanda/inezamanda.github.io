import { useRef, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let shapes = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    class Shape {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 80 + 30
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.type = Math.floor(Math.random() * 3)
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.008
        this.opacity = Math.random() * 0.12 + 0.04

        const colors = [
          '189, 147, 249', // Dracula purple
          '255, 121, 198', // Dracula pink
          '139, 233, 253', // Dracula cyan
          '80, 250, 123',  // Dracula green
          '241, 250, 140', // Dracula yellow
          '255, 184, 108', // Dracula orange
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.rotation += this.rotationSpeed

        if (this.x > canvas.width + this.size) this.x = -this.size
        if (this.x < -this.size) this.x = canvas.width + this.size
        if (this.y > canvas.height + this.size) this.y = -this.size
        if (this.y < -this.size) this.y = canvas.height + this.size
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.strokeStyle = `rgba(${this.color}, ${this.opacity})`
        ctx.lineWidth = 2.5

        if (this.type === 0) {
          ctx.beginPath()
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2)
          ctx.stroke()
        } else if (this.type === 1) {
          ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size)
        } else {
          ctx.beginPath()
          ctx.moveTo(0, -this.size / 2)
          ctx.lineTo(this.size / 2, this.size / 2)
          ctx.lineTo(-this.size / 2, this.size / 2)
          ctx.closePath()
          ctx.stroke()
        }

        ctx.restore()
      }
    }

    const createShapes = () => {
      const count = Math.floor((canvas.width * canvas.height) / 25000)
      shapes = []
      for (let i = 0; i < count; i++) {
        shapes.push(new Shape())
      }
    }
    createShapes()
    window.addEventListener('resize', createShapes)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      shapes.forEach(shape => {
        shape.update()
        shape.draw()
      })
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('resize', createShapes)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // --- Keep top-level canvas + chrome; routes swap only the content
  return (
    <>
      {/* Background + window chrome always present */}
      <div className="min-h-screen bg-[#282a36] flex items-center justify-center p-8 relative overflow-hidden">
        <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-[1]" />

        <div
          className="relative z-10 w-full max-w-4xl rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(189,147,249,0.2),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-[10px] backdrop-saturate-[100%] animate-[windowFadeIn_0.6s_ease-out] will-change-transform transform-gpu"
          aria-label="Portfolio window"
        >
          {/* overlays (unchanged) */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.01) 0%, rgba(189,147,249,0.02) 22%, rgba(255,121,198,0.01) 52%, rgba(0,0,0,0.06) 100%)",
            backdropFilter: "blur(8px) saturate(140%)",
            WebkitBackdropFilter: "blur(8px) saturate(140%)",
            mixBlendMode: "normal",
          }} />

          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-xl" style={{
            border: "1px solid rgba(255,255,255,0.03)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02), 0 18px 40px rgba(7,9,20,0.45)",
          }} />

          <div aria-hidden="true" className="absolute top-0 left-0 pointer-events-none rounded-tl-xl" style={{
            width: "60%",
            height: "24%",
            background: "radial-gradient(140px 44px at 18% 12%, rgba(255,255,255,0.055), rgba(255,255,255,0) 45%)",
            mixBlendMode: "overlay",
          }} />

          <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            <div style={{
              position: "absolute",
              left: "-40%",
              top: 0,
              height: "100%",
              width: "140%",
              transform: "skewX(-18deg)",
              background: "linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.0) 80%)",
              animation: "sheen 6.5s linear infinite",
              opacity: 0.7,
            }} />
          </div>

          {/* Header */}
          <div className="bg-[#44475a]/20 backdrop-blur-[30px] backdrop-saturate-[180%] px-4 py-3 flex items-center gap-4 border-b border-[#bd93f9]/20 relative">
            <div className="flex gap-2 w-[68px] items-center justify-start">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.5)]"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.5)]"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.5)]"></span>
            </div>

            <div className="text-center text-sm text-[#f8f8f2] font-medium opacity-80 flex-1">
              Portfolio — Inez
            </div>

            <div className="w-[68px]" />
          </div>

          {/* ---------------------------
              ROUTED CONTENT AREA (Routes swap what's rendered here)
              --------------------------- */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Footer outside window */}
        <footer className="absolute bottom-8 left-0 right-0 text-center z-[5]">
          <p className="text-sm text-[#6272a4]">© 2025 Inez</p>
        </footer>

        {/* Animations unchanged */}
        <style>{`
          @keyframes windowFadeIn {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes sheen {
            0% { transform: translateX(-100%) skewX(-18deg); opacity: 0; }
            10% { opacity: 0.06; }
            50% { transform: translateX(100%) skewX(-18deg); opacity: 0.03; }
            100% { transform: translateX(200%) skewX(-18deg); opacity: 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-[windowFadeIn_0.6s_ease-out],
            .animate-[fadeInUp_0.8s_ease-out_0.3s_both],
            .animate-[fadeInUp_0.8s_ease-out_0.4s_both],
            .animate-[fadeInUp_0.8s_ease-out_0.5s_both],
            .animate-[fadeInUp_0.8s_ease-out_0.6s_both] { animation: none !important; }
            [style*="animation: sheen"] { animation: none !important; opacity: 0 !important; }
          }
        `}</style>
      </div>
    </>
  )
}

export default App