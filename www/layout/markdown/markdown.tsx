/* global HTMLDivElement */

import {HTMLAttributes} from 'react';
import {markdown, defaultMarkdownConfig} from 'markdown-pro';

import {classNames} from '../../util/css';

import {markdownImage} from './markdown-helper-image';
import markdownStyle from './markdown.scss';

type PropsType = HTMLAttributes<HTMLDivElement> & {
    mdInput: string;
};

export function Markdown(props: PropsType): JSX.Element {
    const {mdInput, ...divAttributes} = props;
    const {className} = divAttributes;

    const htmlCodeClean = markdown(mdInput, {useWrapper: false});

    const htmlCode = markdownImage(htmlCodeClean);

    return (
        <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...divAttributes}
            className={classNames(defaultMarkdownConfig.wrapperClassName, markdownStyle.markdown, className)}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html: htmlCode}}
        />
    );
}
