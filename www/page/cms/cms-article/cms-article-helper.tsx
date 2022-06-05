/* global document, Image, HTMLImageElement, File, FormData, location */
import {RuleObject, Rule} from 'rc-field-form/lib/interface';

import {generatePath} from '../../../util/url';
import {textToSlug} from '../../../util/human';
import {appRoute} from '../../../component/app/app-route';
import {PromiseResolveType} from '../../../util/promise';
import {apiUrl} from '../../../../server/const';
import {UploadFileResponseType} from '../../../../server/file/file-type';
import {FetchMethodEnum, fetchX} from '../../../util/fetch';
import {uploadFileResponseSchema} from '../../../../server/file/file-validation';
import {deleteArticle} from '../../../service/article/article-api';
import {httpsSiteDomain} from '../../../const';
import {getArticleLinkToViewClient} from '../../../client-component/article/article-helper';

import {ArticleForValidationType, MakeSlugValidatorArgumentType} from './cms-article-type';
import {CmsArticleModeEnum} from './cms-article-const';

export function uploadFile(file: File, fileSizeLimitBytes: number): Promise<UploadFileResponseType> {
    const formData = new FormData();

    console.log('file file');
    console.log(file);
    console.log(file.size);

    if (file.size >= fileSizeLimitBytes) {
        throw new Error(`Too big file, limit ${fileSizeLimitBytes / 1e6}MB`);
    }

    formData.append('file', file);

    return fetchX<UploadFileResponseType>(apiUrl.adminFileUpload, uploadFileResponseSchema, {
        body: formData,
        credentials: 'include',
        method: FetchMethodEnum.post,
    });
}

export function getPathToImage(uniqueFileName: string, imageConfig: Record<'height' | 'width', number | '-'>): string {
    const {width, height} = imageConfig;

    return apiUrl.imageGet.replace(':size', `${String(width)}x${String(height)}`).replace(':fileName', uniqueFileName);
}

export function getPathToFile(uniqueFileName: string): string {
    return apiUrl.fileGet.replace(':fileName', uniqueFileName);
}

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

export function getArticleLinkToEdit(articleId: string): string {
    return generatePath<typeof appRoute.articleEdit.path>(appRoute.articleEdit.path, {articleId});
}

export function getClientArticleLinkWithDomain(slug: string): string {
    return httpsSiteDomain + getArticleLinkToViewClient(slug);
}

export function getFileExtension(fileName: string): string {
    const hasExtension = fileName.includes('.');

    if (!hasExtension) {
        return '';
    }

    return fileName.split('.').pop() || '';
}

export function getIsImage(fileName: string): boolean {
    const fileExtension = getFileExtension(fileName);

    return ['jpg', 'jpeg', 'jfif', 'gif', 'png', 'webp'].includes(fileExtension);
}

export function getIsAudio(fileName: string): boolean {
    const fileExtension = getFileExtension(fileName);

    return ['mp3'].includes(fileExtension);
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
        const {naturalHeight, naturalWidth} = await fetchImage(getPathToFile(fileName));

        return `![THE ALT](${pathToImage} "THE TITLE" height="${naturalHeight}" width="${naturalWidth}")`;
    }

    if (getIsAudio(fileName)) {
        return `<audio controls preload="metadata" src="${getPathToFile(fileName)}"></audio>`;
    }

    return `[ ${getPathToFile(fileName)} ]`;
}

export function getAbsentIdList(
    subDocumentIdList: Array<string>,
    savedArticleList: Array<ArticleForValidationType>
): Array<string> {
    if (savedArticleList.length === 0) {
        return [];
    }

    return subDocumentIdList.filter((id: string): boolean => {
        return !savedArticleList.some((article: ArticleForValidationType): boolean => article.id === id);
    });
}

export function handleDeleteArticle(articleId: string): Promise<unknown> {
    return deleteArticle(articleId)
        .then((): unknown => location.reload())
        .catch(console.error);
}
