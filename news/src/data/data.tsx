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


var topicsNotionIds = { 'Startup': '1e6a70f3-51ea-41d2-8ee0-4e61f3671cac' }



var exampleData = [
    {
        "title": "provaTitolo",
        "url": "provaUrl",
        "author": "provaAuthor",
        "topics": ['article', 'startup', 'provaTopic']
    },
    {
        "title": "Accounting software startup Pennylane becomes France’s latest unicorn - TechCrunch",
        "url": "https://techcrunch.com/2024/02/07/accounting-software-startup-pennylane-becomes-frances-latest-unicorn/",
        "author": "TechCrunch",
        "topics": ['article', 'startup']
    },
    {
        "title": "Smart label startup Sensos raises $20 million Series A - CTech",
        "url": "https://www.calcalistech.com/ctechnews/article/hyryl4mja",
        "author": "CTech",
        "topics": ['article', 'startup']
    },
    {
        "title": "Why a B2B startup is placing a bet on a $7M Super Bowl ad - TechCrunch",
        "url": "https://techcrunch.com/2024/02/09/why-a-b2b-startup-is-placing-a-bet-on-a-7-million-super-bowl-ad/",
        "author": "TechCrunch",
        "topics": ['article', 'startup']
    }
]
