import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
} from '@ionic/react';
import { trashOutline, checkmarkOutline } from 'ionicons/icons';
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
    <IonCard>
      <IonCardHeader onClick={handleCardClick}>
        <IonCardTitle>{data.title}</IonCardTitle>
        <IonCardSubtitle>{data.author}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent className="no-padding">
        {data.topics.map(t => <IonBadge>{t}</IonBadge>)}
      </IonCardContent>
      <div className='buttonContainer'>
        <IonButton>
          <IonIcon size="small" slot="icon-only" icon={checkmarkOutline}></IonIcon>
        </IonButton>
        <IonButton>
          <IonIcon size="small" slot="icon-only" icon={trashOutline}></IonIcon>
        </IonButton>
      </div>
    </IonCard >
  );
};

export default Content;
