import {useState, Dispatch, SetStateAction, useEffect} from 'react';

const savedValueMapString: Record<string, string> = {};
// const savedValueMapNumber: Record<string, number> = {};
// const savedValueMapBoolean: Record<string, boolean> = {};

export function useStaticStringState(
    defaultValue: string,
    savedKey: string
): [string, Dispatch<SetStateAction<string>>] {
    // eslint-disable-next-line no-prototype-builtins
    const savedValue: string = savedValueMapString.hasOwnProperty(savedKey)
        ? savedValueMapString[savedKey]
        : defaultValue;
    const [value, setValue] = useState<string>(savedValue);

    useEffect(() => {
        savedValueMapString[savedKey] = value;
    }, [value, savedKey]);

    return [value, setValue];
}
