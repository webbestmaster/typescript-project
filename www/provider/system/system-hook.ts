import {useContext} from 'react';

import {SystemContextType} from './system-context-type';
import {SystemContext} from './system-context';

export function useSystem(): SystemContextType {
    return useContext<SystemContextType>(SystemContext);
}
