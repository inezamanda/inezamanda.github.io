export default function Home() {
    return (
        <div className="py-16 px-8 min-h-[500px] flex flex-col items-center justify-center text-center relative z-10">
            <div className="mb-6 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
                <h1 className="text-5xl font-light text-[#f8f8f2] tracking-tight mb-2 leading-tight drop-shadow-[0_2px_20px_rgba(189,147,249,0.3)]">
                    Inez Yulia Amanda
                </h1>
                <p className="text-xl text-[#bd93f9] font-normal">iOS Developer</p>
            </div>

            <p className="text-lg text-[#8be9fd] leading-relaxed max-w-2xl mx-auto mb-8 animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
                Thoughtful, maintainable, user-centered mobile experiences.
            </p>

            <div className="my-8 animate-[fadeInUp_0.8s_ease-out_0.5s_both]">
                <a
                    href="https://inezamanda.notion.site/Hi-I-m-Inez-1ac49bc4f0714aa89bd8ee8e4e747ac7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-10 py-3.5 bg-gradient-to-br from-[#bd93f9] to-[#ff79c6] text-[#282a36] rounded-xl font-semibold text-base transition-all duration-300 shadow-[0_4px_15px_rgba(189,147,249,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/10 hover:shadow-[0_6px_25px_rgba(189,147,249,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
                >
                    View My Portfolio
                </a>
            </div>

            <div className="animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
                <a href="https://github.com/inezamanda" target="_blank" rel="noopener noreferrer" className="text-[#6272a4] text-sm hover:text-[#8be9fd] transition-colors duration-200">
                    github.com/inezamanda
                </a>
            </div>
        </div>
    )
}