import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the podcast title', () => {
  render(<App />);
  const titles = screen.getAllByText(/break point/i);
  expect(titles.length).toBeGreaterThan(0);
});
