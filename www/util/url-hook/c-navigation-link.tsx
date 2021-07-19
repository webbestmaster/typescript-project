/* global Location */

import {Link as RouterLink, useHistory} from 'react-router-dom';

// import {classNames} from '../../util/css';

// import linkStyle from './navigation-link.scss';

type PropsType = {
    children?: Array<JSX.Element> | JSX.Element | number | string;
    className?: string;
    title?: string;
    to: string;
    useQuery?: boolean;
};

export function NavigationLink(props: PropsType): JSX.Element {
    const {className, to, children, useQuery, title} = props;

    const routerHistory = useHistory<Location>();

    const query = useQuery === false ? '' : routerHistory.location.search;

    return (
        <RouterLink className={className} title={title} to={to + query}>
            {children}
        </RouterLink>
    );
}
