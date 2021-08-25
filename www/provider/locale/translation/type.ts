import {enUs} from './en-us/data';
import {ruRu} from './ru-ru/data';
import {zhCn} from './zh-cn/data';
import {zhTw} from './zh-tw/data';

export type LangKeyType = keyof typeof enUs & keyof typeof ruRu & keyof typeof zhCn & keyof typeof zhTw;
