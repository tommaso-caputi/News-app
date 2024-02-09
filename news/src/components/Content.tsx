import React from 'react';
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from '@ionic/react';
import { trashOutline, checkmarkOutline } from 'ionicons/icons';
import './Content.css';
import { Data } from '../data/data';

export interface ContentProps {
  data: Data;
  onDelete: () => void;
  onDone: () => void;
}

const Content: React.FC<ContentProps> = ({ data, onDelete, onDone }) => {
  const handleCardClick = () => {
    window.open(data.url, '_blank');
  };

  return (
    <IonCard>
      <IonCardHeader onClick={handleCardClick}>
        <IonCardTitle className="smallText">{data.title}</IonCardTitle>
        <IonCardSubtitle>{data.author}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent className="no-padding">
        {data.topics.map((t, index) => (
          <IonBadge key={index + 1}>{t}</IonBadge>
        ))}
      </IonCardContent>
      <div className="buttonContainer">
        <IonButton onClick={onDone}>
          <IonIcon size="small" slot="icon-only" icon={checkmarkOutline}></IonIcon>
        </IonButton>
        <IonButton onClick={onDelete}>
          <IonIcon size="small" slot="icon-only" icon={trashOutline}></IonIcon>
        </IonButton>
      </div>
    </IonCard>
  );
};

export default Content;
