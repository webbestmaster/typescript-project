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
    BUTTON__UPLOAD: string;
    BUTTON__DOWNLOAD: string;
    BUTTON__SELECT: string;
    BUTTON__SELECT_A_FILE: string;
    BUTTON__PREVIOUS_STEP: string;
    BUTTON__NEXT_STEP: string;
    BUTTON__ADD: string;
    BUTTON__CREATE: string;
    BUTTON__UPLOAD_IMAGE: string;
    BUTTON__UPDATE: string;
    BUTTON__UPDATE_INFO: string;
    BUTTON__SAVE_INFORMATION: string;
    BUTTON__COMPLETE_CREATION: string;
    BUTTON__CHANGE_PASSWORD: string;
    BUTTON__SAVE: string;
    BUTTON__SAVE_SETTINGS: string;
    BUTTON__DELETE: string;
    BUTTON__DELETE_SELECTED: string;
    BUTTON__ACTIONS: string;
    BUTTON__MOVE_SELECTED: string;
    BUTTON__RESET_CHANGES: string;
    BUTTON__SIGN_IN: string;
    BUTTON__SIGN_OUT: string;
    BUTTON__LOG_IN: string;
    BUTTON__LOG_OUT: string;

    WEEK_DAY__MONDAY: string;
    WEEK_DAY__TUESDAY: string;
    WEEK_DAY__WEDNESDAY: string;
    WEEK_DAY__THURSDAY: string;
    WEEK_DAY__FRIDAY: string;
    WEEK_DAY__SATURDAY: string;
    WEEK_DAY__SUNDAY: string;
    WEEK_DAY__ALL_DAYS: string;

    EMPTY__THERE_IS_NOTHING_HERE_YET: string;
    EMPTY__THERES_NOTHING_HERE: string;
    EMPTY__TRY_CHANGING_FILTERS: string;
    EMPTY__EMPTY: string;

    ERROR__CAN_NOT_LOAD_THE_COMPONENT: string;

    /* eslint-enable id-match, id-length, max-len */
};

export type LangKeyType = keyof LangDataType;
