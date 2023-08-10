/* global HTMLElement */
import {render, screen} from '@testing-library/react';
import {describe, it, expect} from '@jest/globals';

import {LibraryComponent} from './library-component';

describe('libraryComponent', () => {
    it('default state', () => {
        expect.assertions(1);
        render(<LibraryComponent textContent="some text">child node</LibraryComponent>);

        expect(screen.getByText('child node') instanceof HTMLElement).toBe(true);
    });
});
