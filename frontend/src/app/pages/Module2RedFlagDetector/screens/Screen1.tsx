import { MessageScreen } from '../components/MessageScreen';
import image1 from '../assets/f9fe71e25b896265ae5f04c7bf92ed6b27c7b0aa.png';

export function Screen1() {
  return (
    <MessageScreen
      title="Suspicious SMS Link"
      imageSrc={image1}
      textPoints={[
        "Genuine bank messages do not replace account details with clickable links",
        "That's a red flag"
      ]}
      finalLabel="Suspicious / Phishing Attempt"
      finalType="scam"
      prevRoute="/red-flag-detector/module2"
      nextRoute="/red-flag-detector/module2/screen2"
    />
  );
}