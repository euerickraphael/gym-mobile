import React from 'react';
import { render } from '@testing-library/react'
import App from '../App';

describe('App', () => {
    it('render the app component', () => {
        const { getByText } = render(<App />);
        const linkElement = getByText(/hello world/i);
        expect(linkElement).toBeIntTheDocument();
    });
});