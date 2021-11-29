export type ServerDataContextType = Readonly<{
    article: {
        content: string;
        header: string;
        viewCounter: number;
    };
    fetchData: (url: string) => void;
}>;
