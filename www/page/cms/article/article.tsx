import {ArticleModeEnum} from './article-type';

export type ArticlePropsType = {
    mode: ArticleModeEnum;
};

// eslint-disable-next-line import/no-default-export
export default function Article(props: ArticlePropsType): JSX.Element {
    const {mode} = props;

    return <h1>Article, {mode}</h1>;
}
