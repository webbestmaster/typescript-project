/* global HTMLDivElement */

import {HTMLAttributes} from 'react';
import {markdown} from 'markdown-pro';

import {classNames} from '../util/css';

type PropsType = HTMLAttributes<HTMLDivElement> & {
    mdInput: string;
};

export function Markdown(props: PropsType): JSX.Element {
    const {mdInput, ...divAttributes} = props;
    const {className} = divAttributes;
    // eslint-disable-next-line react/no-danger, id-match

    return (
        <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...divAttributes}
            className={classNames('md-pro', className)}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html: markdown(mdInput, {useWrapper: false})}}
        />
    );
}
