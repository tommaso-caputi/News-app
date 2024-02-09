// Home.tsx
import { useEffect, useState } from 'react';
import {
  IonContent,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import './Home.css';
import Content, { ContentProps } from '../components/Content';
import { Data } from '../data/data';
import { getData } from '../data/data';

const Home: React.FC = () => {
  const [contents, setContents] = useState<Data[]>([]);

  useEffect(() => {
    setContents(getData());
  }, []);

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const handleDeleteContent = (index: number) => {
    const updatedContents = [...contents];
    updatedContents.splice(index, 1);
    setContents(updatedContents);
  };

  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonList>
          {contents.map((c, index) => (
            <Content
              key={`${c.title}-${index}`}
              data={c}
              onDelete={() => handleDeleteContent(index)}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
