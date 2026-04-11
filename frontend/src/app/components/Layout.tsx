import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Compass, Home, LayoutDashboard, Users } from "lucide-react";
import { motion } from "motion/react";
import { BambiGuide } from "../components/Bambi/BambiGuide";
import { registry } from "../components/Bambi/bambiRegistry";
import { Footer } from "./ui/Footer";
import { LanguageToggle } from "./ui/LanguageToggle";
import { logout, isAuthenticated } from "../utils/auth"; // ✅ Added auth imports

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Added navigate
  const isHome = location.pathname === "/";

  // ✅ Added handleLogout function
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      {!isHome && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/home" className="flex items-center gap-2 group">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <Compass className="size-8 text-blue-600" />
                </motion.div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SafetyNet
                </span>
              </Link>

              {/* ✅ Updated Navbar Section */}
              <div className="flex items-center gap-6">
                <NavLink to="/home" icon={Home} label="Home" />
                <NavLink to="/dashboard" icon={LayoutDashboard} label="Progress" />
                <NavLink to="/community" icon={Users} label="Community" />
                
                <LanguageToggle />

                {/* ✅ Added Logout Button */}
                {isAuthenticated() && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Logout
                  </motion.button>
                )}
              </div>
            </div>
          </nav>
        </motion.header>
      )}

      {/* ✅ FIXED MAIN */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer sticks properly now */}
      <Footer />

      <BambiGuide registry={registry} />
    </div>
  );
}

function NavLink({ to, icon: Icon, label }: { to: string; icon: any; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isActive
            ? "bg-blue-100 text-blue-700"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Icon className="size-4" />
        <span>{label}</span>
      </motion.div>
    </Link>
  );
}