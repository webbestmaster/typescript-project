import {ArticleModeEnum} from './article-type';

export type ArticlePropsType = {
    mode: ArticleModeEnum;
};

export default function Article(props: ArticlePropsType): JSX.Element {
    const {mode} = props;

    return <h1>Article, {mode}</h1>;
}
