import { createBrowserRouter } from "react-router";
import { WelcomePage } from "./components/WelcomePage";
import { Screen1 } from "./screens/Screen1";
import { Screen2 } from "./screens/Screen2";
import { Screen3 } from "./screens/Screen3";
import { Screen4 } from "./screens/Screen4";
import { Screen5 } from "./screens/Screen5";
import { Screen6 } from "./screens/Screen6";
import { Screen7 } from "./screens/Screen7";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: WelcomePage,
  },
  {
    path: "/screen1",
    Component: Screen1,
  },
  {
    path: "/screen2",
    Component: Screen2,
  },
  {
    path: "/screen3",
    Component: Screen3,
  },
  {
    path: "/screen4",
    Component: Screen4,
  },
  {
    path: "/screen5",
    Component: Screen5,
  },
  {
    path: "/screen6",
    Component: Screen6,
  },
  {
    path: "/screen7",
    Component: Screen7,
  },
]);
