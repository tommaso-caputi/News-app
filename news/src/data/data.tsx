export interface Data {
    title: string;
    author: string;
    url: string;
    topics: string[];
}

export const getStorageData = () => {
    return JSON.parse(localStorage.getItem('data') || "[]")
}

export const setStorageData = (data: Data[]) => {
    localStorage.setItem('data', JSON.stringify(data))
}

export const initStorage = async (refresh: boolean) => {
    if (!localStorage.getItem('data')) {
        localStorage.setItem('data', JSON.stringify([]));
    }
    const currentDate = new Date().toJSON().slice(0, 10);
    if (!localStorage.getItem('date') || currentDate !== localStorage.getItem('date') || refresh) {
        localStorage.setItem('date', currentDate);
        console.log("Fetching new data...");
        try {
            const response = await fetch("https://tommasocaputi.altervista.org/NewsApp/getData.php", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                redirect: 'follow'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Data fetched successfully:", data);
            setStorageData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}



export const getData = (): Data[] => {
    return getStorageData();
}


export const saveContentToNotionDb = (data: Data): void => {
    var relations = []
    for (let i = 1; i < data.topics.length; i++) {
        if ((topicsNotionIds as any)[data.topics[i].charAt(0).toUpperCase() + data.topics[i].slice(1)] != undefined) {
            relations.push({ "id": (topicsNotionIds as any)[data.topics[i].charAt(0).toUpperCase() + data.topics[i].slice(1)] })
        }
    }
    var raw = JSON.stringify({
        "body": {
            "parent": {
                "database_id": "aba109e11222497cb35f8e9f8e89d138"
            },
            "icon": {
                "type": "external",
                "external": {
                    "url": "https://www.notion.so/icons/link_gray.svg"
                }
            },
            "properties": {
                "Name": {
                    "id": "title",
                    "type": "title",
                    "title": [
                        {
                            "type": "text",
                            "text": {
                                "content": data.title
                            }
                        }
                    ]
                },
                "Status": {
                    "type": "status",
                    "status": {
                        "name": "To Review",
                        "color": "default"
                    }
                },
                "Type": {
                    "type": "select",
                    "select": {
                        "name": data.topics[0].charAt(0).toUpperCase() + data.topics[0].slice(1),
                        "color": "default"
                    }
                },
                "URL": {
                    "type": "url",
                    "url": data.url
                },
                "Topics": {
                    "type": "relation",
                    "relation": relations
                }
            }
        }
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("https://tommasocaputi.altervista.org/NewsApp/webhook.php", {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


var topicsNotionIds = { 'Coding': 'caa76e75-ceb5-4cbf-9d31-eb3842252bc7', 'Geopolitics': '4ec7561b-752e-4718-aaf5-07907f2f93b9', 'Carrier': 'b21f6762-1b89-4822-b7b5-639966224c4f', 'Startup': '1e6a70f3-51ea-41d2-8ee0-4e61f3671cac', 'Love': '55077789-49c9-48ee-ad05-9b86c30d50fc', 'Family': '76b64b4c-f3cc-4b00-ae22-4b574159800b', 'Mindset': '029e8cde-42f0-4a49-afe0-2551f03f3ecc', 'Finance': '5e06e667-bc85-4f38-afae-fe56c60ca2a1', 'Dev': '34ec1227-c16c-4598-abf2-877505254e97', 'Design': '3e575552-d90d-4b8e-bb78-fa4c62609f6a', 'Art': '1dc1527a-7d1b-4ce6-b7f1-27ef05afc2ed', 'Math': '6db2aea9-681f-44fb-827d-34eecc584fdb', 'Crime': '2d5db2fb-1094-48e4-8e5c-7fb960d5e68d', 'Philosophy': 'db76239c-a366-4310-9ea9-b88d1ea40428', 'Society': '15f429d7-bcc7-401e-8832-7623034f640c', 'Science': '5176fbbf-088c-4ade-8b7c-a7d9732290e5', 'Science fantasy': '093558d6-4238-4a09-867c-560c01e9a58a', 'Psicology': '59ff26ea-e206-4e99-9882-04bd1814cde7', 'Productivity': '3d366a4c-e056-46d4-bdd5-ebc60c033da3' }

