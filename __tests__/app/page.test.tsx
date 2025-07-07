import { act, render, screen } from '@testing-library/react';
import Page from '@/app/page'

describe('Page', () => {
  it('renders a chat widget', async () => {
    await act(() => render(<Page />));
    expect(screen.getByText('チャット')).toBeInTheDocument();
  });
})