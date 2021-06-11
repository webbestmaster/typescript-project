import {useContext} from 'react';

import {SystemContextType} from './system-context-type';
import {SystemContext} from './c-system-context';

export function useSystem(): SystemContextType {
    return useContext<SystemContextType>(SystemContext);
}
