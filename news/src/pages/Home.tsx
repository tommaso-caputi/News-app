import { useEffect, useState } from 'react';
import {
  IonContent,
  IonList,
  IonPage,
} from '@ionic/react';
import './Home.css';
import Content from '../components/Content';
import { Data, saveContentToNotionDb, setStorageData } from '../data/data';
import { getData, initStorage } from '../data/data';

const Home: React.FC = () => {
  const [contents, setContents] = useState<Data[]>([]);

  useEffect(() => {
    initStorage();
    setContents(getData());
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


  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
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
