export type LangDataType = {
    /* eslint-disable id-match, id-length, max-len */

    META__LANGUAGE_NAME: string;

    BUTTON__YES: string;
    BUTTON__NO: string;
    BUTTON__CANCEL: string;
    BUTTON__CLOSE: string;
    BUTTON__SEND: string;
    BUTTON__OK: string;
    BUTTON__APPLY: string;
    BUTTON__CONFIRM: string;
    BUTTON__DECLINE: string;

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
