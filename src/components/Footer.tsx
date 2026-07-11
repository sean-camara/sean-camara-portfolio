export function Footer() {
  return (
    <footer className="border-t border-stone-200 py-6">
      <div className="mx-auto flex w-[min(1180px,calc(100%-48px))] items-center justify-between gap-5 text-xs text-stone-500 max-sm:w-[calc(100%-32px)] max-sm:flex-col max-sm:items-start">
        <span className="font-bold text-[#172136]">Sean John Camara</span>
        <span>© 2026. Built with React and TypeScript.</span>
        <div className="flex gap-4">
          <a className="hover:text-[#6977b8]" href="https://github.com/sean-camara" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="hover:text-[#6977b8]" href="https://www.linkedin.com/in/sean-john-camara-ab78a3321/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
