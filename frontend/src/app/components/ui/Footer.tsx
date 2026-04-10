import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full shrink-0 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-500 gap-2 md:gap-0">
        
        {/* Left: Branding & Copyright */}
        <div className="flex flex-wrap justify-center items-center gap-2">
          <span className="font-bold text-gray-800 flex items-center gap-1">
            🛡️ SafetyNet
          </span>
          <span className="hidden sm:inline-block border-l border-gray-300 h-3"></span>
          <span>© {new Date().getFullYear()} The Guardian Path.</span>
        </div>

        {/* Middle: Navigation Links */}
        <div className="flex items-center gap-4 font-medium">
          <button className="hover:text-black hover:underline outline-none transition-colors">
            About
          </button>
          <button className="hover:text-black hover:underline outline-none transition-colors">
            Help
          </button>
          <button className="hover:text-black hover:underline outline-none transition-colors">
            Contact
          </button>
        </div>

        {/* Right: Emergency Info */}
        <div className="text-red-600 font-bold flex items-center bg-red-50 px-2 py-1 rounded">
          📞 Cyber Helpline: 1930
        </div>

      </div>
    </footer>
  );
};