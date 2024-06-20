import {getPathToFile, getPathToImage} from "../../util/path";
import {Image} from "../Image/image";
import * as markdownStyle from "./markdown.scss";
import type {StringToJsxRawDataType} from "./markdown-helper";
import type {MarkdownItemCounter} from "./markdown-item-counter";

export function getImageFromHtml(
    rawData: StringToJsxRawDataType,
    markdownItemCounter: MarkdownItemCounter
): JSX.Element {
    const {htmlString, articleTitle} = rawData;

    const [ignoredFullWidthString, widthAsString = ""] = /width="(\d+)"/u.exec(htmlString) ?? ["", "0"];
    const [ignoredFullHeightString, heightAsString = ""] = /height="(\d+)"/u.exec(htmlString) ?? ["", "0"];
    const [ignoredFullSrcString, srcAsString = ""] = /src="([^"]*?)"/u.exec(htmlString) ?? ["", ""];
    const [ignoredFullAltString, altAsString = ""] = /alt="([^"]*?)"/u.exec(htmlString) ?? ["", ""];
    const [ignoredFullTitleString, titleAsString = ""] = /title="([^"]*?)"/u.exec(htmlString) ?? ["", ""];

    return (
        <Image
            alt={altAsString.trim()}
            className={markdownStyle.markdown_picture}
            fileName={srcAsString.trim()}
            getPathToFile={getPathToFile}
            getPathToImage={getPathToImage}
            height={Number.parseInt(heightAsString.trim(), 10)}
            imgClassName={markdownStyle.markdown_image}
            loading={markdownItemCounter.getLoadingImageType()}
            title={(titleAsString || articleTitle).trim()}
            width={Number.parseInt(widthAsString.trim(), 10)}
        />
    );
}
