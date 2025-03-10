import { render, screen } from '@testing-library/react';
import Page from '@/app/page'
import { describe } from 'node:test';

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
})