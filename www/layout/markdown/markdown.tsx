/* global HTMLDivElement */

import {type HTMLAttributes, useContext} from "react";
import {markdown, classNameMdPro, classNameMdProThemeLight} from "markdown-pro";

import {cls} from "../../util/css";
import type {ThemeContextType} from "../../provider/theme/theme-context-type";
import {ThemeContext} from "../../provider/theme/theme-context";

import {MarkdownHtmlToReact} from "./markdown-html-to-react";

import * as markdownStyle from "./markdown.scss";

type PropsType = HTMLAttributes<HTMLDivElement> & {
    readonly articleTitle: string;
    readonly mdInput: string;
};

export function Markdown(props: PropsType): JSX.Element {
    const {mdFontSize} = useContext<ThemeContextType>(ThemeContext);
    const {mdInput, articleTitle, ...divAttributes} = props;
    const {className: cssClassName} = divAttributes;
    const htmlCodeClean = markdown(mdInput, {useLineBreak: true, useWrapper: false});
    const fullClassName = cls(markdownStyle.markdown, classNameMdPro, classNameMdProThemeLight, cssClassName);

    return (
        <div {...divAttributes} className={fullClassName} style={{fontSize: `${mdFontSize}px`}}>
            <MarkdownHtmlToReact articleTitle={articleTitle} htmlCode={htmlCodeClean} />
        </div>
    );
}
