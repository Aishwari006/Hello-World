import { useState } from "react";
import { motion } from "motion/react";
import { changeLanguage } from "../../utils/translate";

const languages = [
  { code: "en", label: "EN" },
  { code: "hi", label: "HI" },
  { code: "mr", label: "MR" },
];

export function LanguageToggle() {
  const [active, setActive] = useState("en");

  const handleChange = (lang: string) => {
    setActive(lang);
    changeLanguage(lang);
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-xl p-1">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          whileTap={{ scale: 0.9 }}
          className={`px-3 py-1 rounded-lg text-sm font-semibold ${
            active === lang.code
              ? "bg-blue-600 text-white"
              : "text-gray-600"
          }`}
        >
          {lang.label}
        </motion.button>
      ))}
    </div>
  );
}