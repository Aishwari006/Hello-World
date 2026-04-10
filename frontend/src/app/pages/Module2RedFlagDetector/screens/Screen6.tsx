import { MessageScreen } from '../components/MessageScreen';
import image6 from '../assets/bf4c964fddb5ce43db6ad9310935b5b4a7561d87.png';

export function Screen6() {
  return (
    <MessageScreen
      title="Scare Tactic Scam"
      imageSrc={image6}
      textPoints={[
        "The message uses fear to pressure you",
        "It includes a suspicious link",
        "This is typical scam behavior"
      ]}
      finalLabel="Scare Tactic Scam"
      finalType="scam"
      prevRoute="/red-flag-detector/module2/screen5"
      nextRoute="/red-flag-detector/module2/screen7"
    />
  );
}