import Content from '../components/Content';
import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import { Data } from '../data/data';

const Home: React.FC = () => {

  const [contents, setContents] = useState<Data[]>([{ title: 'provaTitolo', author: 'provaAutore', url: 'https://google.com' }]);


  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonList>
          {contents.map(c => <Content key={c.title} data={c} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
