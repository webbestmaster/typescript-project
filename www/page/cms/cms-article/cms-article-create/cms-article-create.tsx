import {CmsArticle} from '../cms-article';
import {makeDefaultArticle} from '../cms-article-helper';

function handleOnUpdate() {
    console.log('handleOnUpdate');
}

// eslint-disable-next-line import/no-default-export
export default function CmsArticleCreate(): JSX.Element {
    return <CmsArticle article={makeDefaultArticle()} onUpdate={handleOnUpdate} />;
}
