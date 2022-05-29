import {ArticleType} from '../../../article/article-type';

import {SsrReplaceDataType} from './ssr-helper-type';

export function getTitleSsrReplaceData(article: ArticleType): SsrReplaceDataType {
    const {title} = article;

    return {
        selector: '<title data-ssr="title"></title>',
        value: `<title>${title}</title>`,
    };
}
