import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the World Cup branding', () => {
  render(<App />);
  const headings = screen.getAllByText(/FIFA WORLD CUP/i);
  expect(headings.length).toBeGreaterThan(0);
});
