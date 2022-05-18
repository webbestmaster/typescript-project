import {Typography, message} from 'antd';
import {JSONSchemaType} from 'ajv';
import {useNavigate} from 'react-router';

const {Title} = Typography;

import {CmsArticle} from '../cms-article';
import {makeDefaultArticle} from '../../../../../server/article/article-helper';
import {CmsArticleModeEnum} from '../cms-article-const';
import {ArticleType} from '../../../../../server/article/article-type';
import {postArticleCreate} from '../../../../service/article/article-api';
import {useMakeExecutableState} from '../../../../util/function';
import {makeArticleSchema} from '../../../../../server/article/article-validation';
import {getRandomString} from '../../../../util/string';
import {Spinner} from '../../../../layout/spinner/spinner';
import {CmsPage} from '../../layout/cms-page/cms-page';
import {getArticleLinkToEdit} from '../cms-article-helper';

export function CmsArticleCreate(): JSX.Element {
    const navigate = useNavigate();

    const {execute: createArticle, isInProgress: isInProgressCreateArticle} = useMakeExecutableState<
        [ArticleType, JSONSchemaType<ArticleType>],
        ArticleType
    >(postArticleCreate);

    function handleOnFinish(article: ArticleType) {
        createArticle(article, makeArticleSchema())
            .then((savedArticle: ArticleType) => {
                console.log(savedArticle);

                navigate(getArticleLinkToEdit(article.id));

                message.success('Article has been created!');
            })
            .catch((requestError: Error) => {
                message.error(`ERROR: ${requestError.message}`);
            });
    }

    return (
        <CmsPage>
            <Title level={2}>Create new article</Title>
            <CmsArticle
                article={{
                    ...makeDefaultArticle(),
                    id: getRandomString(),
                }}
                mode={CmsArticleModeEnum.create}
                onFinish={handleOnFinish}
            />
            <Spinner isShow={isInProgressCreateArticle} position="fixed" />
        </CmsPage>
    );
}
