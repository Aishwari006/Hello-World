import { MessageScreen } from '../components/MessageScreen';
import image7 from "../assets/0da38bda24e8c25c73ec044714f0710c0779a7a2.png";

export function Screen7() {
  return (
    <MessageScreen
      title="Tech Support Phishing"
      imageSrc={image7}
      textPoints={[
        "The message is unsolicited and unexpected",
        "It creates urgency to make you act fast",
        "It includes a suspicious or unknown link"
      ]}
      finalLabel="Tech Support Scam"
      finalType="scam"
      prevRoute="/red-flag-detector/module2/screen6"
      hint="Real support services will not contact you this way"
    />
  );
}