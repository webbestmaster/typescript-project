// 1 find and replace all image
// 2 find and replace ads place

import {getPathToImage} from '../../page/cms/cms-article/cms-article-helper';

// eslint-disable-next-line complexity
function adaptiveImage(imageHtmlCode: string): string {
    const [ignoredFullWidthString, widthAsString] = imageHtmlCode.match(/width="(\d+)"/) || ['', '0'];
    const [ignoredFullHeightString, heightAsString] = imageHtmlCode.match(/height="(\d+)"/) || ['', '0'];
    const [fullSrcString, srcAsString] = imageHtmlCode.match(/src="(\S+)"/) || ['', ''];
    const stepSizePx = 256;
    const absolutelyMaxWidth = 1024;
    const maxOriginalWidth = Number.parseInt(widthAsString, 10);
    const maxOriginalHeight = Number.parseInt(heightAsString, 10);

    if (!maxOriginalWidth || !maxOriginalHeight || !srcAsString) {
        return imageHtmlCode;
    }

    const maxImageWidth = Math.min(maxOriginalWidth, absolutelyMaxWidth);

    const fileName = srcAsString.split('/').pop() || '';

    const srcsetFull: Array<string> = Array.from<string>({length: Math.floor(maxImageWidth / stepSizePx)}).map(
        (value: unknown, index: number): string => {
            const imageWidth = (index + 1) * stepSizePx;
            const pathToImage = getPathToImage(fileName, {height: maxOriginalHeight, width: imageWidth});

            return `${pathToImage} ${imageWidth}w`;
        }
    );

    srcsetFull.push(`${getPathToImage(fileName, {height: maxOriginalHeight, width: maxImageWidth})} ${maxImageWidth}w`);

    const srcset: Array<string> = [...new Set<string>(srcsetFull)];
    const sizes = '50vw';

    console.log(srcset);
    // srcset="images/400.jpg 400w, images/800.jpg 800w, images/1200.jpg 1200w"
    // sizes="(min-width: 700px) 75vw, 100vw"

    console.log(imageHtmlCode);
    console.log(widthAsString);

    return imageHtmlCode.replace(fullSrcString, `${fullSrcString} srcset="${srcset.join(', ')}" sizes="${sizes}"`);
}

export function markdownImage(htmlCode: string): string {
    console.log('find all image and get attributes');

    return htmlCode.replace(/<img[\S\s]+?\/>/gi, adaptiveImage);
}
