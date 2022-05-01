import {CmsArticleModeEnum} from './cms-article-type';

export type CmsArticlePropsType = {
    mode: CmsArticleModeEnum;
};

// eslint-disable-next-line import/no-default-export
export default function CmsArticle(props: CmsArticlePropsType): JSX.Element {
    const {mode} = props;

    return <h1>Article, {mode}</h1>;
}
