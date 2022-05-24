import {useParams} from 'react-router-dom';

import {appRoute} from '../../component/app/app-route';
import {ExtractPathKeysType} from '../../util/url';

export function Article(): JSX.Element {
    const {slug} = useParams<ExtractPathKeysType<typeof appRoute.article.path>>();

    return <h1>article = {slug}</h1>;
}
