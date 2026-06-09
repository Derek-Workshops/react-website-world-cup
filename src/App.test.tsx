import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Latin America practice heading', () => {
  render(<App />);
  const headings = screen.getAllByText(/Latin America Practice/i);
  expect(headings.length).toBeGreaterThan(0);
});
