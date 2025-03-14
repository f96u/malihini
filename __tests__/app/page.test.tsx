import { act, render, screen } from '@testing-library/react';
import Page from '@/app/page'
import { describe } from 'node:test';
import { mockFetch } from '@/mocks/mockFetch';

describe('Page', () => {
  window.fetch = mockFetch({ data: { name: 'test' } });
  it('renders a heading', async () => {
    await act(() => render(<Page />));
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
})