/* global HTMLInputElement */

import {useState, useDeferredValue, SyntheticEvent, useEffect} from 'react';

import {syncedDelay} from 'synced-delay';

import homeStyle from '../home/home.scss';

function SlowComponent(props: Record<'id' | 'text', string>): JSX.Element {
    const {id, text} = props;

    useEffect(() => {
        console.log('[SlowComponent - effect]', id, text);
    }, [id, text]);

    syncedDelay(1e3);

    console.log('[SlowComponent]', id, text);

    return (
        <div>
            {id} - {text}
        </div>
    );
}

// eslint-disable-next-line react/no-multi-comp
export function TestUseDeferredValue(): JSX.Element {
    const [text, setText] = useState<string>('hello');
    const deferredText = useDeferredValue(text);

    function handleChange(event: SyntheticEvent<HTMLInputElement>) {
        setText(event.currentTarget.value);
    }

    return (
        <div>
            <h1 className={homeStyle.home_header}>Test page: useDeferredValue</h1>
            <label>
                Type into the input: <input defaultValue={text} onInput={handleChange} />
            </label>

            <div>current text: {text}</div>

            <div>usual properties</div>
            <SlowComponent id="usual" text={text} />

            <div>deferred</div>
            <SlowComponent id="deferred" text={deferredText} />
        </div>
    );
}
