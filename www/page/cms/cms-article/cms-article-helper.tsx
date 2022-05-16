/* global document, Image, HTMLImageElement */
import {Select, Typography} from 'antd';
import {RuleObject, Rule} from 'rc-field-form/lib/interface';
import {generatePath} from 'react-router';

import {textToSlug} from '../../../util/human';
import {Box} from '../../../layout/box/box';
import {appRoute} from '../../../component/app/app-route';
import {ArticleType} from '../../../../server/article/article-type';
import {getPathToFile, getPathToImage} from '../../../service/file/file';
import {PromiseResolveType} from '../../../util/promise';

import {ArticleForValidationType, MakeSlugValidatorArgumentType} from './cms-article-type';
import {CmsArticleModeEnum} from './cms-article-const';

const {Option} = Select;
const {Link, Text} = Typography;

export function makeSlugValidator(data: MakeSlugValidatorArgumentType): Array<Rule> {
    const {id, mode, savedArticleList} = data;

    return [
        {
            message: 'Required!',
            required: true,
        },
        {
            message: 'Please-enter-slug-properly.',
            validator: async (rule: RuleObject, value: string) => {
                if (textToSlug(value) !== value) {
                    throw new Error('Slug is not formatted.');
                }
            },
        },
        {
            message: 'Please enter another slug. This slug already exists.',
            // eslint-disable-next-line complexity
            validator: async (rule: RuleObject, value: string) => {
                const savedArticleBySlugList: Array<ArticleForValidationType> = savedArticleList.filter(
                    (savedArticle: ArticleForValidationType): boolean => {
                        return savedArticle.slug === value;
                    }
                );

                const savedArticleBySlugListLength = savedArticleBySlugList.length;

                if (savedArticleBySlugListLength === 0) {
                    return;
                }

                if (savedArticleBySlugListLength >= 2) {
                    throw new Error('There are should be only one no non articles');
                }

                const isSavedArticle: boolean = savedArticleBySlugListLength > 0;

                if (mode === CmsArticleModeEnum.create && isSavedArticle) {
                    throw new Error('Use unique slug.');
                }

                const [savedArticleForValidation] = savedArticleBySlugList;

                if (
                    mode === CmsArticleModeEnum.edit &&
                    savedArticleForValidation.slug === value &&
                    savedArticleForValidation.id !== id
                ) {
                    throw new Error('Article with your slug already exists');
                }
            },
        },
    ];
}

export function makeSubDocumentOption(articleForValidation: ArticleForValidationType): JSX.Element {
    const {title, id} = articleForValidation;

    return (
        <Option key={id} title={title} value={id}>
            {title}
        </Option>
    );
}

export function makeHtmlValidator(): Array<Rule> {
    return [
        {
            message: 'Invalid HTML.',
            validator: async (rule: RuleObject, value: string) => {
                if (typeof document === 'undefined') {
                    return;
                }

                const wrapper = document.createElement('div');

                wrapper.innerHTML = value;

                if (wrapper.innerHTML.trim() === value.trim()) {
                    return;
                }

                throw new Error('HTML is not valid');
            },
        },
    ];
}

export function renderUploadedFileListItem(
    originNode: JSX.Element
    // file: UploadFile<unknown>,
    // uploadedFileList: Array<UploadFile<unknown>>,
    // actions: { download: () => void; preview: () => void; remove: () => void }
): JSX.Element {
    return (
        <Box backgroundColor="#c00" height="auto">
            <div>{originNode}</div>
            <button type="button">markdown</button>
        </Box>
    );
}

export function getArticleLinkToEdit(articleId: string): string {
    return generatePath(appRoute.articleEdit.path, {articleId});
}

export function renderParentList(
    article: ArticleType,
    savedArticleList: Array<ArticleForValidationType>
): Array<JSX.Element> {
    const {id: articleId} = article;

    const parentList: Array<JSX.Element> = savedArticleList
        .filter((savedArticle: ArticleForValidationType): boolean => savedArticle.subDocumentIdList.includes(articleId))
        .map((savedArticle: ArticleForValidationType, index: number): JSX.Element => {
            const {id, title, slug} = savedArticle;

            return (
                <Text key={id}>
                    {index > 0 ? ', ' : null}
                    <Link href={getArticleLinkToEdit(id)} target="_blank">
                        {title}/{slug}
                    </Link>
                </Text>
            );
        });

    if (parentList.length > 0) {
        return parentList;
    }

    return [<Text key="no-parents">no parents</Text>];
}

export function getIsImage(fileName: string): boolean {
    const hasExtension = fileName.includes('.');

    if (!hasExtension) {
        return false;
    }

    const fileExtension = fileName.split('.').pop();

    return ['jpg', 'jpeg', 'jfif', 'gif', 'png', 'webp'].includes(fileExtension || '');
}

export function getIsAudio(fileName: string): boolean {
    const hasExtension = fileName.includes('.');

    if (!hasExtension) {
        return false;
    }

    const fileExtension = fileName.split('.').pop();

    return ['mp3'].includes(fileExtension || '');
}

export function fetchImage(pathToImage: string): Promise<HTMLImageElement> {
    const image = new Image();

    return new Promise<HTMLImageElement>(
        (resolve: PromiseResolveType<HTMLImageElement>, reject: PromiseResolveType<unknown>) => {
            image.addEventListener('load', () => resolve(image), false);

            image.addEventListener('error', reject, false);

            image.src = pathToImage;
        }
    );
}

export async function getFileMarkdown(fileName: string): Promise<string> {
    if (getIsImage(fileName)) {
        const pathToImage = getPathToImage(fileName, {height: 1024, width: 1024});
        const {naturalHeight, naturalWidth} = await fetchImage(pathToImage);

        return `![THE ALT](${pathToImage} "THE TITLE" height="${naturalHeight}" width="${naturalWidth}")`;
    }

    if (getIsAudio(fileName)) {
        return `<audio controls src="${getPathToFile(fileName)}"></audio>`;
    }

    return `[ ${getPathToFile(fileName)} ]`;
}
