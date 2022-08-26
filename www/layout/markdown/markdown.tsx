/* global HTMLDivElement */

import {HTMLAttributes} from 'react';
import {markdown} from 'markdown-pro';

import {classNames} from '../../util/css';

import {markdownImage} from './markdown-helper-image';
import markdownStyle from './markdown.scss';
import {markdownAudio} from './markdown-helper-audio';

type PropsType = HTMLAttributes<HTMLDivElement> & {
    mdInput: string;
};

export function Markdown(props: PropsType): JSX.Element {
    const {mdInput, ...divAttributes} = props;
    const {className} = divAttributes;

    const htmlCodeClean = markdown(mdInput);

    const htmlCodeImage = markdownImage(htmlCodeClean);
    const htmlCodeListAudio = markdownAudio(htmlCodeImage);

    return (
        <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...divAttributes}
            className={classNames(markdownStyle.markdown, className)}
            // eslint-disable-next-line react/no-danger
            // dangerouslySetInnerHTML={{__html: htmlCode}}
        >
            {htmlCodeListAudio}
        </div>
    );
}
