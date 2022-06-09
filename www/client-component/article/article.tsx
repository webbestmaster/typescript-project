import {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {ExtractPathKeysType} from '../../util/url';
import {appRoute} from '../../component/app/app-route';
import {noop} from '../../util/function';
import {Markdown} from '../../layout/markdown/markdown';

import {ArticleContextType} from './article-context/article-context-type';
import {articleContext} from './article-context/article-context';

export function Article(): JSX.Element {
    const {setSlug = noop, article} = useContext<ArticleContextType>(articleContext);
    const {slug} = useParams<ExtractPathKeysType<typeof appRoute.article.path>>();

    useEffect(() => {
        if (slug) {
            setSlug(slug);
        }
    }, [slug, setSlug]);

    if (article.id === '') {
        return (
            <div>
                <h1>no article</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>
                article = {article.slug} - {article.id}
            </h1>
            <Markdown mdInput={article.content} />
        </div>
    );
}
