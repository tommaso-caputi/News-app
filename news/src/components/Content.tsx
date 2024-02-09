import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
} from '@ionic/react';
import './Content.css';
import { Data } from '../data/data'

interface ContentProps {
  data: Data;
}

const Content: React.FC<ContentProps> = ({ data }) => {
  const handleCardClick = () => {
    window.open(data.url, '_blank');
  };
  return (
    <IonCard onClick={handleCardClick}>
      <IonCardHeader>
        <IonCardTitle>{data.title}</IonCardTitle>
        <IonCardSubtitle>{data.author}</IonCardSubtitle>
      </IonCardHeader>
      <IonButton fill="clear">Action 1</IonButton>
      <IonButton fill="clear">Action 2</IonButton>
    </IonCard>
  );
};

export default Content;
