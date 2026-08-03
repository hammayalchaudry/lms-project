import { Link } from 'react-router-dom';
import { BookOpen, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <span>AI LMS</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/courses" className="hover:text-blue-600 transition">Courses</Link>
            <Link to="/about" className="hover:text-blue-600 transition">About</Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Log in
            </Link>
            <Link 
              to="/signup" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-xl transition shadow-md shadow-blue-200"
            >
              <Sparkles className="w-4 h-4" />
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
