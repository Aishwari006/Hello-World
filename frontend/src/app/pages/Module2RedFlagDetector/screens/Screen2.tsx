import { MessageScreen } from '../components/MessageScreen';
import image2 from '../assets/1b5bf68653064d0f291f4f740f29da4778da9a35.png';

export function Screen2() {
  return (
    <MessageScreen
      title="Fake Delivery Alert"
      imageSrc={image2}
      textPoints={[
        "If you weren't expecting a package",
        "A payment request is suspicious",
        "Likely a scam message"
      ]}
      finalLabel="Delivery Scam"
      finalType="scam"
      prevRoute="/red-flag-detector/module2/screen1"
      nextRoute="/red-flag-detector/module2/screen3"
    />
  );
}