// import { useEffect, useRef } from 'react'

// function App() {
//     const canvasRef = useRef(null)

//     useEffect(() => {
//         const canvas = canvasRef.current
//         if (!canvas) return

//         const ctx = canvas.getContext('2d')
//         let animationFrameId
//         let shapes = []

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth
//             canvas.height = window.innerHeight
//         }
//         resizeCanvas()
//         window.addEventListener('resize', resizeCanvas)

//         class Shape {
//             constructor() {
//                 this.x = Math.random() * canvas.width
//                 this.y = Math.random() * canvas.height
//                 this.size = Math.random() * 80 + 30
//                 this.speedX = (Math.random() - 0.5) * 0.3
//                 this.speedY = (Math.random() - 0.5) * 0.3
//                 this.type = Math.floor(Math.random() * 3)
//                 this.rotation = Math.random() * Math.PI * 2
//                 this.rotationSpeed = (Math.random() - 0.5) * 0.008
//                 this.opacity = Math.random() * 0.12 + 0.04

//                 const colors = [
//                     '189, 147, 249', // Dracula purple
//                     '255, 121, 198', // Dracula pink
//                     '139, 233, 253', // Dracula cyan
//                     '80, 250, 123',  // Dracula green
//                     '241, 250, 140', // Dracula yellow
//                     '255, 184, 108', // Dracula orange
//                 ]
//                 this.color = colors[Math.floor(Math.random() * colors.length)]
//             }

//             update() {
//                 this.x += this.speedX
//                 this.y += this.speedY
//                 this.rotation += this.rotationSpeed

//                 if (this.x > canvas.width + this.size) this.x = -this.size
//                 if (this.x < -this.size) this.x = canvas.width + this.size
//                 if (this.y > canvas.height + this.size) this.y = -this.size
//                 if (this.y < -this.size) this.y = canvas.height + this.size
//             }

//             draw() {
//                 ctx.save()
//                 ctx.translate(this.x, this.y)
//                 ctx.rotate(this.rotation)
//                 ctx.strokeStyle = `rgba(${this.color}, ${this.opacity})`
//                 ctx.lineWidth = 2.5

//                 if (this.type === 0) {
//                     ctx.beginPath()
//                     ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2)
//                     ctx.stroke()
//                 } else if (this.type === 1) {
//                     ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size)
//                 } else {
//                     ctx.beginPath()
//                     ctx.moveTo(0, -this.size / 2)
//                     ctx.lineTo(this.size / 2, this.size / 2)
//                     ctx.lineTo(-this.size / 2, this.size / 2)
//                     ctx.closePath()
//                     ctx.stroke()
//                 }

//                 ctx.restore()
//             }
//         }

//         const createShapes = () => {
//             const count = Math.floor((canvas.width * canvas.height) / 25000)
//             shapes = []
//             for (let i = 0; i < count; i++) {
//                 shapes.push(new Shape())
//             }
//         }
//         createShapes()
//         window.addEventListener('resize', createShapes)

//         const animate = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height)
//             shapes.forEach(shape => {
//                 shape.update()
//                 shape.draw()
//             })
//             animationFrameId = requestAnimationFrame(animate)
//         }
//         animate()

//         return () => {
//             window.removeEventListener('resize', resizeCanvas)
//             window.removeEventListener('resize', createShapes)
//             cancelAnimationFrame(animationFrameId)
//         }
//     }, [])

//     return (
//         <div className="min-h-screen bg-[#282a36] flex items-center justify-center p-8 relative overflow-hidden">
//             {/* Background Canvas */}
//             <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-[1]" />

//             {/* macOS Window */}
//             <div className="relative z-10 w-full max-w-4xl bg-[#282a36]/40 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(189,147,249,0.2),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-[5px] backdrop-saturate-[180%] animate-[windowFadeIn_0.6s_ease-out] will-change-transform transform-gpu">

//                 {/* Window Header */}
//                 <div className="bg-[#44475a]/20 backdrop-blur-[30px] backdrop-saturate-[180%] px-4 py-3 flex items-center justify-between border-b border-[#bd93f9]/20">
//                     {/* Left - Traffic Lights */}
//                     <div className="flex gap-2 w-[60px] justify-start">
//                         <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.5)]"></span>
//                         <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.5)]"></span>
//                         <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.5)]"></span>
//                     </div>

//                     {/* Center - Window Title */}
//                     <div className="text-center text-sm text-[#f8f8f2] font-medium opacity-80 flex-1">
//                         Portfolio — Inez
//                     </div>

//                     {/* Right - Spacer (balances the left group) */}
//                     <div className="w-[60px]"></div>
//                 </div>

//                 {/* Window Content */}
//                 <div className="py-16 px-8 min-h-[500px] flex flex-col items-center justify-center text-center">
//                     {/* Header */}
//                     <div className="mb-6 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
//                         <h1 className="text-5xl font-light text-[#f8f8f2] tracking-tight mb-2 leading-tight drop-shadow-[0_2px_20px_rgba(189,147,249,0.3)]">
//                             Inez
//                         </h1>
//                         <p className="text-xl text-[#bd93f9] font-normal">
//                             iOS Developer
//                         </p>
//                     </div>

//                     {/* Tagline */}
//                     <p className="text-lg text-[#8be9fd] leading-relaxed max-w-2xl mx-auto mb-8 animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
//                         Thoughtful, maintainable, user-centered mobile experiences.
//                     </p>

//                     {/* CTA Button */}
//                     <div className="my-8 animate-[fadeInUp_0.8s_ease-out_0.5s_both]">
//                         <a
//                             href="https://inezamanda.notion.site/Hi-I-m-Inez-1ac49bc4f0714aa89bd8ee8e4e747ac7"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-block px-10 py-3.5 bg-gradient-to-br from-[#bd93f9] to-[#ff79c6] text-[#282a36] rounded-xl font-semibold text-base transition-all duration-300 shadow-[0_4px_15px_rgba(189,147,249,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/10 hover:shadow-[0_6px_25px_rgba(189,147,249,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-[#c9a8ff] hover:to-[#ff8cd6]"
//                         >
//                             View My Portfolio
//                         </a>
//                     </div>

//                     {/* GitHub Link */}
//                     <div className="animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
//                         <a
//                             href="https://github.com/inezamanda"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-[#6272a4] text-sm hover:text-[#8be9fd] transition-colors duration-200"
//                         >
//                             github.com/inezamanda
//                         </a>
//                     </div>
//                 </div>
//             </div>

//             {/* Footer - Outside Window */}
//             <footer className="absolute bottom-8 left-0 right-0 text-center z-[5]">
//                 <p className="text-sm text-[#6272a4]">© 2025 Inez</p>
//             </footer>

//             {/* Custom Animations */}
//             <style>{`
//         @keyframes windowFadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95) translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1) translateY(0);
//           }
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//         </div>
//     )
// }

// export default App