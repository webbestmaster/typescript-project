import React from 'react';

import appStyle from './app.scss';

export function App(): JSX.Element {
    const a = 1;

    if (a === 1) {
        if (a === 2) {
            if (a === 3) {
                if (a === 4) {
                    if (a === 5) {
                        [1, 2, 3, a].forEach(() => {
                            {
                                console.log(11);
                            }
                        });
                    }
                }
            }
        }
    }

    return <h1 className={appStyle.app_header}>App</h1>;
}
