/* global HTMLDivElement */

import {HTMLAttributes} from 'react';
import {markdown, defaultMarkdownConfig} from 'markdown-pro';

import {classNames} from '../util/css';

type PropsType = HTMLAttributes<HTMLDivElement> & {
    mdInput: string;
};

export function Markdown(props: PropsType): JSX.Element {
    const {mdInput, ...divAttributes} = props;
    const {className} = divAttributes;

    return (
        <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...divAttributes}
            className={classNames(defaultMarkdownConfig.wrapperClassName, className)}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html: markdown(mdInput, {useWrapper: false})}}
        />
    );
}
