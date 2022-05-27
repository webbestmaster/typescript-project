import {Navigation} from '../../../client-component/navigation/navigation';
import {Article} from '../../../client-component/article/article';
import {Breadcrumbs} from '../../../client-component/breadcrumbs/breadcrumbs';
import {Siblings} from '../../../client-component/siblings/siblings';
import {ShareButtonList} from '../../../client-component/share/share-button-list/c-share-button-list';

export function ClientArticle(): JSX.Element {
    return (
        <div>
            <Navigation />
            <Breadcrumbs />
            <Article />
            <Siblings />
            <ShareButtonList />
        </div>
    );
}
