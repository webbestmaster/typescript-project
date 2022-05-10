import {ValidateErrorEntity, RuleObject, FieldData, Rule} from 'rc-field-form/lib/interface';

import {textToSlug} from '../../../util/human';

import {ArticleForValidationType, MakeSlugValidatorArgumentType} from './cms-article-type';
import {CmsArticleModeEnum} from './cms-article-const';

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
                const isSavedArticle: boolean = savedArticleBySlugListLength > 0;

                if (savedArticleBySlugListLength >= 2) {
                    throw new Error('There are should be only one no non articles');
                }

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
