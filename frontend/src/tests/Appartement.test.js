// Appartement.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Appartement from './Appartement';

test('renders Appartement component', () => {
  render(<Appartement />);
  
  expect(screen.getByText('Apparts')).toBeInTheDocument();
});

test('fires handlClick when button is clicked', () => {
  const mockHandlClick = jest.fn();
  render(<Appartement handlClick={mockHandlClick} ajouter={true} />);
  fireEvent.click(screen.getByText('Ajouter Appartement'));
  expect(mockHandlClick).toHaveBeenCalled();
});

