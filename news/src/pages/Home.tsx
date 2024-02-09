import { useEffect, useState } from 'react';
import {
  IonContent,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonText,
} from '@ionic/react';
import './Home.css';
import Content from '../components/Content';
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

  return (
    <IonPage id="home-page" >
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonList>
          {contents.map((c, index) => <Content key={`${c.title}-${index}`} data={c} />)}
        </IonList>
      </IonContent>
    </IonPage >
  );
};

export default Home;
