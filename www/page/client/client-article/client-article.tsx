import {Navigation} from '../../../client-component/navigation/navigation';
import {Article} from '../../../client-component/article/article';

export function ClientArticle(): JSX.Element {
    return (
        <div>
            <Navigation />
            <Article />
        </div>
    );
}
