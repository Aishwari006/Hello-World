// src/app/pages/SandboxDigitalId/data/quizData.ts

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizScenario {
  id: number;
  image: string; // path to image in /assets/
  question: string;
  options: QuizOption[];
  explanation: string;
}

export const quizScenarios: QuizScenario[] = [
  {
    id: 1,
    image: "/src/app/pages/Module2RedFlagDetector/assets/image1.png",
    question:
      'A text says your account has "suspicious activity" and gives a link to reset your password. What is the safest action?',
    options: [
      { text: "Click the link immediately to protect your money", isCorrect: false },
      { text: "Call the phone number on the back of your bank card", isCorrect: true },
      { text: "Reply to the message asking if it is real", isCorrect: false },
    ],
    explanation:
      "Banks never ask you to click unknown links. Always use official contact methods — like calling the number printed on your bank card.",
  },
  {
    id: 2,
    image: "/src/app/pages/Module2RedFlagDetector/assets/image2.png",
    question:
      "You receive a message offering a free Amazon Prime prize with a strange link. What is this?",
    options: [
      { text: "A lucky reward", isCorrect: false },
      { text: "A trick to steal your information", isCorrect: true },
      { text: "A normal advertisement", isCorrect: false },
    ],
    explanation:
      "Unexpected prizes with strange links are classic scams. Real companies never ask you to click an unusual link to claim a prize.",
  },
  {
    id: 3,
    image: "/src/app/pages/Module2RedFlagDetector/assets/image3.png",
    question: 'A message says "IMMEDIATELY log in". Why do scammers write this?',
    options: [
      { text: "To create panic so you click without thinking", isCorrect: true },
      { text: "Because the bank genuinely needs help", isCorrect: false },
      { text: "Because your account is closed", isCorrect: false },
    ],
    explanation:
      "Urgency is a key scam trick. It makes you act emotionally and quickly — before you have time to think. Take a breath. A real bank is never in a rush.",
  },
  {
    id: 4,
    image: "/src/app/pages/Module2RedFlagDetector/assets/image4.png",
    question:
      'A PayPal link looks slightly strange (e.g. "global-paypal.com"). What should you do?',
    options: [
      { text: "Click it because it says PayPal", isCorrect: false },
      { text: "Ignore it and open the official PayPal app instead", isCorrect: true },
      { text: "Click but don't enter your password", isCorrect: false },
    ],
    explanation:
      "Even tiny changes in a web address can mean it's a scam. Always go directly to the official website or app — never through a link in a message.",
  },
];
