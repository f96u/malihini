import { act, render, screen } from '@testing-library/react';
import Page from '@/app/page'

describe('Page', () => {
  it('renders a button', async () => {
    await act(() => render(<Page />));
    expect(screen.getByText('Count Up !')).toBeInTheDocument();
  });
})