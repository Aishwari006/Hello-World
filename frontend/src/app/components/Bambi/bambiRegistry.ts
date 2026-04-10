import type { Registry } from "./types";

export const registry: Registry = {
  // 🌍 GLOBAL NAVIGATION

  "home": {
    route: "/home",
    speech: "Taking you to home page",
  },
  "main": {
    route: "/home",
    speech: "Taking you to home page",
  },

  "dashboard": {
    route: "/dashboard",
    speech: "Opening your dashboard",
  },
  "go to dashboard": {
    route: "/dashboard",
    speech: "Opening your dashboard",
  },

  // 🎯 MODULE PAGES

  "red flag detector": {
    route: "/red-flag-detector",
    speech: "Opening red flag detector",
  },

  // to implement:
  "bank statements": {
    route: "/sandbox/module1",
    speech: "Opening Bank Statement Guided Module",
  },

  "digilocker": {
    route: "/sandbox/module2",
    speech: "Opening Digilocker Guided Module",
  },

  "fake messages": {
    route: "/red-flag-detector",
    speech: "Opening Spot Fake Messages and Emails Module",
  },

  "simulator": {
    route: "/ai-scam-simulator",
    speech: "Opening Safe Chatting Module",
  },

  "fake photos": {
    route: "/deepfake-lab",
    speech: "Opening Deepfake Recognition Lab",
  },

  "track progress": {
    route: "/dashboard",
    speech: "Opening Dashboard",
  },

  // 🧪 SANDBOX

  // "upi sandbox": {
  //   route: "/sandbox/upi",
  //   speech: "Opening UPI sandbox",
  // },
  // "digital id": {
  //   route: "/sandbox/digital-id",
  //   speech: "Opening Digital ID sandbox",
  // },

  // 📊 DASHBOARD ELEMENTS (WITH ROUTE 🔥)

  // "password security": {
  //   route: "/dashboard",
  //   speech: "This is your Password Security module",
  // },

  "phishing detection": {
    route: "/red-flag-detector",
    speech: "This is your phishing detection module",
  },
  // "detection": {
  //   route: "/dashboard",
  //   speech: "This is your phishing detection module",
  // },

  "my badges": {
    route: "/dashboard",
    speech: "Here are your badges",
  },
};