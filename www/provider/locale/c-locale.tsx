import {Fragment} from 'react';

import {LocaleContextValueMapType} from './locale-context-type';
import {getLocalizedString} from './locale-context-helper';
import {LangKeyType} from './translation/type';
import {allLocalesData, splitValueStringRegExp} from './locale-context-const';
import {useLocale} from './locale-hook';

type PropsType = {
    stringKey: LangKeyType;
    valueMap?: LocaleContextValueMapType;
};

export function Locale(props: PropsType): JSX.Element {
    const {stringKey, valueMap} = props;

    const {localeName} = useLocale();

    if (!valueMap) {
        return <>{getLocalizedString(stringKey, localeName, valueMap)}</>;
    }

    const resultString = allLocalesData[localeName][stringKey]; // 'the {value1} data {value2} is {value2} here'

    let partList: Array<JSX.Element | string> = resultString.split(splitValueStringRegExp); // ["the ", "{value1} data ", "{value2} is ", "{value2} here"]

    const keyList = Object.keys(valueMap);

    // eslint-disable-next-line no-loops/no-loops
    for (const objectKey of keyList) {
        partList = partList.map((part: JSX.Element | string, index: number): JSX.Element | string => {
            if (typeof part !== 'string') {
                return part;
            }

            const replacedPart = '{' + objectKey + '}';

            if (!part.startsWith(replacedPart)) {
                return part;
            }

            const endOfString = part.slice(replacedPart.length);

            return (
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={objectKey + '-' + index}>
                    {valueMap[objectKey]}

                    {endOfString}
                </Fragment>
            );
        });
    }

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{partList}</>;
}
