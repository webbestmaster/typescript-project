/* global HTMLInputElement */

import {useState, useDeferredValue, SyntheticEvent, useEffect} from 'react';

import homeStyle from '../home/home.scss';

function SlowComponent(props: Record<'id' | 'text', string>): JSX.Element {
    const {id, text} = props;
    const listSize = 1e3;

    useEffect(() => {
        console.log('[SlowComponent - effect]', id, text);
    }, [id, text]);

    console.log('[SlowComponent]', id, text);

    return (
        <>
            {id} - {text}
            <hr />
            <ul>
                {Array.from({length: listSize}).map((value: unknown, index: number): JSX.Element => {
                    return <li key={`${text} / ${index.toString(32)}`}>{text + '/' + index}</li>;
                })}
            </ul>
        </>
    );
}

// eslint-disable-next-line react/no-multi-comp
export function TestUseDeferredValueSecond(): JSX.Element {
    const [text, setText] = useState<string>('hello');
    const deferredText = useDeferredValue(text);

    function handleChange(event: SyntheticEvent<HTMLInputElement>) {
        setText(event.currentTarget.value);
    }

    return (
        <div>
            <h1 className={homeStyle.home_header}>Test page: useDeferredValueSecond</h1>
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
