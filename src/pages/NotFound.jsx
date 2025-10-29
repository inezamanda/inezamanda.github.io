export default function NotFound() {
    return (
        <div className="py-16 px-8 min-h-[500px] flex flex-col items-center justify-center text-center relative z-10">
            <h2 className="text-3xl font-semibold text-[#f8f8f2] mb-4">404 — Page not found</h2>
            <p className="text-sm text-[#9aa0c8] mb-6">Looks like the page you requested doesn't exist.</p>
            <a href="#/" className="text-[#8be9fd] underline">Go back home</a>
        </div>
    )
}