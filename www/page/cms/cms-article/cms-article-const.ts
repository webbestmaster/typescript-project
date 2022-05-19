import {KeyForValidationListType} from './cms-article-type';

export const enum CmsArticleModeEnum {
    create = 'create',
    edit = 'edit',
}

export const keyForValidationList: KeyForValidationListType = ['id', 'slug', 'subDocumentIdList', 'title'];
export const noImageFileName = 'no-image.jpg';
export const noDateUTC = '0000-00-00T00:00:00.000Z';

export const imageAccept = 'image/png, image/jpeg, image/gif, image/webp';
export const fileAccept = `${imageAccept}, audio/mp3`;
