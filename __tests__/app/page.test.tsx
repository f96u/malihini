import { act, render, screen } from '@testing-library/react';
import Page from '@/app/page'
import { describe } from 'node:test';

describe('Page', () => {
  it('renders a heading', async () => {
    await act(() => render(<Page />));
    screen.debug();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
})