import type {LangDataType} from '../type';

export const ruRu: LangDataType = {
    /* eslint-disable id-match, id-length, max-len, sonarjs/no-duplicate-string */
    META__LANGUAGE_NAME: 'Русский',

    POPUP__BUTTON__YES: 'Да',
    POPUP__BUTTON__NO: 'Нет',
    POPUP__BUTTON__CANCEL: 'Отмена',
    POPUP__BUTTON__CLOSE: 'Закрыть',
    POPUP__BUTTON__SEND: 'Отправить',
    POPUP__BUTTON__OK: 'OK',
    POPUP__BUTTON__APPLY: 'Применить',
    POPUP__BUTTON__CONFIRM: 'Подтвердить',
    POPUP__BUTTON__DECLINE: 'Отказать',

    WEEK_DAY__MONDAY: 'Понедельник',
    WEEK_DAY__TUESDAY: 'Вторник',
    WEEK_DAY__WEDNESDAY: 'Среда',
    WEEK_DAY__THURSDAY: 'Четверг',
    WEEK_DAY__FRIDAY: 'Пятница',
    WEEK_DAY__SATURDAY: 'Суббота',
    WEEK_DAY__SUNDAY: 'Воскресенье',
    WEEK_DAY__ALL_DAYS: 'Все дни',

    /* eslint-enable id-match, id-length, max-len,sonarjs/no-duplicate-string */
};

/*
const keyList: Array<string> = [];
const valueList: Array<string> = [];

Object.entries(ruRu).forEach((data: [string, string]) => {
    const [key, value] = data;

    keyList.push(key);
    valueList.push(value);
});

console.log('---- i18n keys ----');
console.log(keyList.join('\n'));
console.log('---- i18n values ----');
console.log(valueList.join('\n'));
*/
