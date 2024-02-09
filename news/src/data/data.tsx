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

export const initStorage = () => {
    if (!localStorage.getItem('data')) {
        localStorage.setItem('data', JSON.stringify([]));
    }
    const currentDate = new Date().toJSON().slice(0, 10);
    if (!localStorage.getItem('date') || currentDate !== localStorage.getItem('date')) {
        localStorage.setItem('date', currentDate);

        setStorageData(exampleData);
    }
}

export const getData = (): Data[] => {
    return getStorageData();
}








var exampleData = [
    {
        "title": "provaTitolo",
        "url": "provaUrl",
        "author": "provaAuthor",
        "topics": ['startup', 'provaTopic']
    },
    {
        "title": "Accounting software startup Pennylane becomes France’s latest unicorn - TechCrunch",
        "url": "https://techcrunch.com/2024/02/07/accounting-software-startup-pennylane-becomes-frances-latest-unicorn/",
        "author": "TechCrunch",
        "topics": ['startup']
    },
    {
        "title": "Smart label startup Sensos raises $20 million Series A - CTech",
        "url": "https://www.calcalistech.com/ctechnews/article/hyryl4mja",
        "author": "CTech",
        "topics": ['startup']
    },
    {
        "title": "Why a B2B startup is placing a bet on a $7M Super Bowl ad - TechCrunch",
        "url": "https://techcrunch.com/2024/02/09/why-a-b2b-startup-is-placing-a-bet-on-a-7-million-super-bowl-ad/",
        "author": "TechCrunch",
        "topics": ['startup']
    }
]
