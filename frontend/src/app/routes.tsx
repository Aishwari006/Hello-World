import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Main } from "./pages/Main";
// ✅ Fixed your imports to cleanly separate these three pages
import SafetyNetLanding from "./pages/LandingPage"
import { LoginPage } from "./pages/Login"; 
import { Dashboard } from "./pages/Dashboard";
import  RedFlagDetector  from "./pages/Module1RedFlagDetector";
import { AIScamSimulator } from "./pages/AIScamSimulator";
import  DeepfakeLab  from "./pages/DeepfakeLab";
import { Layout } from "./components/Layout";
import Module1RedFlagDetector from "./pages/Module1RedFlagDetector"
import Modules from "./pages/Modules";
import Quiz from "./pages/Module2RedFlagDetector/components/Quiz";
import DigiLockerModule from "./pages/SandboxModule2";
// 🟢 Import your new Digital ID Screens
import { WelcomePage } from "./pages/Module2RedFlagDetector/components/WelcomePage"
import { Screen1 } from "./pages/Module2RedFlagDetector/screens/Screen1";
import { Screen2 } from "./pages/Module2RedFlagDetector/screens/Screen2";
import { Screen3 } from "./pages/Module2RedFlagDetector/screens/Screen3";
import { Screen4 } from "./pages/Module2RedFlagDetector/screens/Screen4";
import { Screen5 } from "./pages/Module2RedFlagDetector/screens/Screen5";
import { Screen6 } from "./pages/Module2RedFlagDetector/screens/Screen6";
import { Screen7 } from "./pages/Module2RedFlagDetector/screens/Screen7";
import { SandboxModule1 } from "./pages/SandboxModule1/SandboxModule1";
import CommunitySiren from "./pages/CommunitySiren";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      // ✅ 1. Standard Landing Page (renders on "/")
      { index: true, Component: SafetyNetLanding },
      
      // ✅ 2. Demo Before Login route
      { path: "beforelogin", Component: SafetyNetLanding },

      // ✅ 3. Login route
      { path: "login", Component: LoginPage },

      // ✅ 4. Where the user goes AFTER logging in
      { path: "startJourney", Component: Main },
      
      { path: "home", Component: Home },
      { path: "dashboard", Component: Dashboard },
      { path: "sandbox/module2", Component: DigiLockerModule },
      { path: "sandbox/upi", Component: RedFlagDetector },
      { path: "red-flag-detector", Component: Modules },
      { path: "ai-scam-simulator", Component: AIScamSimulator },
      { path: "deepfake-lab", Component: DeepfakeLab },
      { path: "community", Component: CommunitySiren },
      {
        path: "/sandbox/module1",
        element: <SandboxModule1 />,
      },
      {
        path: "/red-flag-detector/module1",
        element: <Module1RedFlagDetector />
      },
      {
        path: "/red-flag-detector/module2/quiz",
        element: <Quiz />
      },
      {
        path: "red-flag-detector/module2/",
        children: [
          { index: true, Component: WelcomePage }, // Renders at /sandbox/digital-id
          { path: "screen1", Component: Screen1 }, // Renders at /sandbox/digital-id/screen1
          { path: "screen2", Component: Screen2 }, // Renders at /sandbox/digital-id/screen2
          { path: "screen3", Component: Screen3 },
          { path: "screen4", Component: Screen4 },
          { path: "screen5", Component: Screen5 },
          { path: "screen6", Component: Screen6 },
          { path: "screen7", Component: Screen7 },
        ],
      },
    ],
  },
]);