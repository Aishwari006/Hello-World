import { MessageScreen } from '../components/MessageScreen';
import image5 from '../../assets/05e6b1e048168acb27eba74417c6f4ff8b86e519.png';

export function Screen5() {
  return (
    <MessageScreen
      title="Emotional Scam"
      imageSrc={image5}
      textPoints={[
        "It plays on fear",
        "Lacks proof",
        "Scammers demand hard-to-trace payments"
      ]}
      finalLabel="Emotional Scam"
      finalType="scam"
      prevRoute="/screen4"
      nextRoute="/screen6"
    />
  );
}
