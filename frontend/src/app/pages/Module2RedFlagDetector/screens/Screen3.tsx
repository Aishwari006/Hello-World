
import { MessageScreen } from '../components/MessageScreen';
import image3 from '../assets/2351a621a014f64a7998001db1dd12229b87b0ce.png';

export function Screen3() {
  return (
    <MessageScreen
      title="Legitimate Bank Message"
      imageSrc={image3}
      textPoints={[
        "Includes last digits of your account",
        "Mentions amount, date, and transaction method",
        "Follows standard banking format in India"
      ]}
      finalLabel="Legitimate Message"
      finalType="legit"
      prevRoute="/red-flag-detector/module2/screen2"
      nextRoute="/red-flag-detector/module2/screen4"
    />
  );
}
