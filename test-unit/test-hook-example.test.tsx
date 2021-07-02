/* global describe, it, expect */

import {render, fireEvent, screen} from '@testing-library/react';

import {App} from './test-module/test-react-app';

describe('describe: check render', () => {
    it('renders without crashing', () => {
        render(<App />);

        expect(screen.getByText('app')).toBeInTheDocument();
    });
});
