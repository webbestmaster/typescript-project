export type LangDataType = {
    /* eslint-disable id-match, id-length, max-len */

    META__LANGUAGE_NAME: string;

    POPUP__BUTTON__YES: string;
    POPUP__BUTTON__NO: string;
    POPUP__BUTTON__CANCEL: string;
    POPUP__BUTTON__CLOSE: string;
    POPUP__BUTTON__SEND: string;
    POPUP__BUTTON__OK: string;
    POPUP__BUTTON__APPLY: string;
    POPUP__BUTTON__CONFIRM: string;
    POPUP__BUTTON__DECLINE: string;

    WEEK_DAY__MONDAY: string;
    WEEK_DAY__TUESDAY: string;
    WEEK_DAY__WEDNESDAY: string;
    WEEK_DAY__THURSDAY: string;
    WEEK_DAY__FRIDAY: string;
    WEEK_DAY__SATURDAY: string;
    WEEK_DAY__SUNDAY: string;
    WEEK_DAY__ALL_DAYS: string;

    /* eslint-enable id-match, id-length, max-len */
};

export type LangKeyType = keyof LangDataType;
