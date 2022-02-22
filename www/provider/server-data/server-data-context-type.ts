export type ServerDataContextType = {
    article: {
        content: string;
        header: string;
        viewCounter: number;
    };
    fetchData: (url: string) => void;
};
