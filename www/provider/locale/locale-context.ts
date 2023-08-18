import {createLocalization, type LocalizationConfigType, type LocalizationStateType} from "react-localization-library";

import {getSavedLocaleName, saveLocaleName} from "./locale-context-helper";
import type {LocaleNameEnum} from "./locale-context-type";
import type {LangKeyType} from "./translation/type";
import {allLocalesData} from "./locale-context-const";

const localizationConfig: LocalizationConfigType<LangKeyType, LocaleNameEnum> = {
    defaultLocaleName: getSavedLocaleName(),
    localization: allLocalesData,
    onUseEffect: (localizationProviderState: LocalizationStateType<LocaleNameEnum>) => {
        const {localeName} = localizationProviderState;

        saveLocaleName<LocaleNameEnum>(localeName);
    },
};

const {LocalizationProvider, Locale, useLocale} = createLocalization<LangKeyType, LocaleNameEnum>(localizationConfig);

export {LocalizationProvider, Locale, useLocale};
