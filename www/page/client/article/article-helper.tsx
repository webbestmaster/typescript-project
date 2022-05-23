import {generatePath} from '../../../util/url';
import {appRoute} from '../../../component/app/app-route';

export function getArticleLinkToViewClient(slug: string): string {
    return generatePath<typeof appRoute.article.path>(appRoute.article.path, {slug});
}
