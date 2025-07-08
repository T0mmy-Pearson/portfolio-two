interface NavbarProps {
  onAboutClick?: () => void
  onContactClick?: () => void
}

const Navbar = ({ onAboutClick, onContactClick }: NavbarProps) => (
  <nav className="flex justify-between items-center py-10 px-60 bg-[#f0edcf] top-0 left-0 w-full z-50">
    <div className="font-bold text-xl italic libertinus-mono-regular">Tom Pearson.</div>
    <ul className="flex gap-8 font-medium">
      <li>
        <button 
          onClick={onAboutClick}
          className="hover:text-slate-400 libertinus-mono-regular cursor-pointer"
        >
          About
        </button>
      </li>
      <li>
        <button 
          onClick={onContactClick}
          className="hover:text-slate-400 libertinus-mono-regular cursor-pointer"
        >
          Contact
        </button>
      </li>
    </ul>
  </nav>
)
export default Navbar