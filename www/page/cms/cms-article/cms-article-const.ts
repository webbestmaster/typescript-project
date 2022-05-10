import {KeyForValidationListType} from './cms-article-type';

export const enum CmsArticleModeEnum {
    create = 'create',
    edit = 'edit',
}

export const keyForValidationList: KeyForValidationListType = ['id', 'slug', 'title'];
export const noImageFileName = 'no-image.jpg';
