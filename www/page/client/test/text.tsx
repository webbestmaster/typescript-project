import {useParams} from 'react-router-dom';

import {Navigation} from '../../../layout/navigation/navigation';

export function Test(): JSX.Element {
    const {someId} = useParams<'someId'>();

    return (
        <div>
            <Navigation />
            <h1>test</h1>
            <h2>{someId}</h2>
        </div>
    );
}
