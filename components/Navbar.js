import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white py-4 px-6 flex justify-between items-center border-b border-gray-800">
      <div className="text-xl font-bold tracking-tight">DevApp</div>
      <div className="flex gap-4 text-sm md:text-base">
        <Link href="/" className="hover:text-blue-400 transition">Home</Link>
        <Link href="/about" className="hover:text-blue-400 transition">About</Link>
        <Link href="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
        <Link href="/login" className="hover:text-blue-400 transition">Login</Link>
      </div>
    </nav>
  );
}