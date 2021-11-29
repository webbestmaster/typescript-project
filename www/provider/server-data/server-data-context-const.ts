import {ServerDataContextType} from './server-data-context-type';

export const defaultServerDataContextConst: ServerDataContextType = {
    article: {
        content: 'the article',
        header: 'the header',
        viewCounter: typeof window === 'undefined' ? 11 : 22,
    },
    fetchData: String,
};
