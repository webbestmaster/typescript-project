import type {LangDataType} from '../type';

export const ruRu: LangDataType = {
    /* eslint-disable id-match, id-length, max-len, sonarjs/no-duplicate-string */
    META__LANGUAGE_NAME: 'Русский',

    BUTTON__YES: 'Да',
    BUTTON__NO: 'Нет',
    BUTTON__CANCEL: 'Отмена',
    BUTTON__CLOSE: 'Закрыть',
    BUTTON__SEND: 'Отправить',
    BUTTON__OK: 'OK',
    BUTTON__APPLY: 'Применить',
    BUTTON__CONFIRM: 'Подтвердить',
    BUTTON__DECLINE: 'Отклонить',

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
