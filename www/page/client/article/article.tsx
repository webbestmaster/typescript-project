import {useParams} from 'react-router-dom';

import {Navigation} from '../../../layout/navigation/navigation';

export function Article(): JSX.Element {
    const {slug} = useParams<'slug'>();

    return (
        <div>
            <Navigation />
            <h1>test</h1>
            <h2>{slug}</h2>
        </div>
    );
}
