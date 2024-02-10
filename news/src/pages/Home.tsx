import { useEffect, useState } from 'react';
import {
  IonContent,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import './Home.css';
import Content from '../components/Content';
import { Data, saveContentToNotionDb, setStorageData } from '../data/data';
import { getData, initStorage } from '../data/data';

const Home: React.FC = () => {
  const [contents, setContents] = useState<Data[]>([]);

  const refresh = async (ok: boolean) => {
    await initStorage(ok);
    const newData = getData();
    setContents(newData);
  }

  useEffect(() => {
    refresh(false);
  }, []);
  const handleDeleteContent = (index: number) => {
    const updatedContents = [...contents];
    updatedContents.splice(index, 1);
    setContents(updatedContents);
    setStorageData(updatedContents);
  };
  const handleDoneContent = (index: number, data: Data) => {
    const updatedContents = [...contents];
    updatedContents.splice(index, 1);
    setContents(updatedContents);
    setStorageData(updatedContents);
    saveContentToNotionDb(data);
  };

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      refresh(true);
      event.detail.complete();
    }, 2000);
  }

  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList>
          {contents.map((c, index) => (
            <Content
              key={`${c.title}-${index}`}
              data={c}
              onDelete={() => handleDeleteContent(index)}
              onDone={() => handleDoneContent(index, c)}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
