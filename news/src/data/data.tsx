export interface Data {
    title: string;
    author: string;
    url: string;
    topics: string[];
}

export const getData = () => {
    return [
        {
            title: 'provaTitolo',
            author: 'provaAutore',
            url: 'https://google.com',
            topics: ['startup', 'tech']
        },
        {
            title: 'provaTitolo2',
            author: 'provaAutore2',
            url: 'https://google.com',
            topics: ['startup', 'tech']
        }
    ]
}