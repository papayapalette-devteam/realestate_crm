import Image from "next/image";
import Link from "next/link";


export default function Header() {
  return (
    <header className="w-full bg-[#212121]">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between py-4 px-4">
   
        {/* Navigation Links */}
   <nav className="mt-2 sm:mt-0 flex gap-5">
      <Link href="/" className="text-gray-300 hover:text-red-500 text-sm font-medium">
        Home
      </Link>
      <Link href="/properties" className="text-gray-300 hover:text-red-500 text-sm font-medium">
        Properties
      </Link>
      <Link href="/developers" className="text-gray-300 hover:text-red-500 text-sm font-medium">
        Developers
      </Link>
      <Link href="/contact" className="text-gray-300 hover:text-red-500 text-sm font-medium">
        Contact
      </Link>
      <Link href="/aboutus" className="text-gray-300 hover:text-red-500 text-sm font-medium">
        About
      </Link>
      <Link href="https://admin.bharatproperties.co/" className="text-gray-300 hover:text-red-500 text-sm font-medium">
        Login
      </Link>
    </nav>
        {/* Call-to-action / Profile / Login button area */}
        <div className="hidden sm:flex items-center gap-2">
          <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm">
            Enquire Now
          </button>
        </div>
      </div>
    </header>
  );
}
