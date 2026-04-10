import { MessageScreen } from '../components/MessageScreen';
import image4 from '../assets/60cc5625fb7f88c44ec0e730090c352fd1bef638.png';

export function Screen4() {
  return (
    <MessageScreen
      title="Legitimate OTP Message"
      imageSrc={image4}
      textPoints={[
        "This follows WhatsApp's usual format",
        "It warns you not to share the code",
        "Does not ask for a reply"
      ]}
      finalLabel="Legitimate SMS"
      finalType="legit"
      prevRoute="/red-flag-detector/module2/screen3"
      nextRoute="/red-flag-detector/module2/screen5"
    />
  );
}