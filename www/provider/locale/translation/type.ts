import {ExtractKeysType} from 'react-localization-library';

import {enUs} from './en-us/data';
import {ruRu} from './ru-ru/data';
import {zhCn} from './zh-cn/data';
import {zhTw} from './zh-tw/data';

export type LangKeyType = keyof typeof enUs & keyof typeof ruRu & keyof typeof zhCn & keyof typeof zhTw;

export type ValuesMapType = {
    [key in LangKeyType]: ExtractKeysType<typeof enUs[key]> &
        ExtractKeysType<typeof ruRu[key]> &
        ExtractKeysType<typeof zhCn[key]> &
        ExtractKeysType<typeof zhTw[key]>;
};
