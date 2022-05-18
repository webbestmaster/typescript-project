// just example module/component

export type LoadMeAsyncPropsType = {
    smth: string;
};

export function LoadMeAsync(props: LoadMeAsyncPropsType): JSX.Element {
    const {smth} = props;

    return <h4>I Loaded Async smth === {smth}</h4>;
}
