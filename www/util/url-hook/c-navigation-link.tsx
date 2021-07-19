/* global Location */

import {Link as RouterLink, useHistory} from 'react-router-dom';

// import {classNames} from '../../util/css';

// import linkStyle from './navigation-link.scss';

type PropsType = {
    className?: string;
    to: string;
    children?: Array<JSX.Element> | JSX.Element | number | string;
    useQuery?: boolean;
    title?: string;
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
