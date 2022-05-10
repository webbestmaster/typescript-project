import {KeyForValidationListType} from './cms-article-type';

export const enum CmsArticleModeEnum {
    create = 'create',
    edit = 'edit',
}

export const keyForValidationList: KeyForValidationListType = ['id', 'slug', 'title'];
export const noImageFileName = 'no-image.jpg';
export const noDateUTC = '0000-00-00T00:00:00.000Z';
