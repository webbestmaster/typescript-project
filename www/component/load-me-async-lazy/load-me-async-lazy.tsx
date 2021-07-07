type PropsType = {
    smth: string;
};

// eslint-disable-next-line import/no-default-export
export default function LoadMeAsyncLazy(props: PropsType): JSX.Element {
    return <h4>I Loaded Async Lazy</h4>;
}
