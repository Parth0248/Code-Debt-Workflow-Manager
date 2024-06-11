import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

/* TODO: @user3:
 * 06-07-2024 : 7 :
 * Update documentation : Finish it asap */

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
