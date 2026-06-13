export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 py-6 px-6 text-center text-sm border-t border-gray-800 mt-auto">
      <p>&copy; {new Date().getFullYear()} Ayush&copy;. All rights reserved.</p>
    </footer>
  );
}