import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calculator } from './Calculator';

describe('Calculator component', () => {
  test('表示初期値は0', () => {
    render(<Calculator />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('9 + 1 = 10', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    await user.click(screen.getByRole('button', { name: '9' }));
    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: '=' }));
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('ゼロ除算でError表示', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    await user.click(screen.getByRole('button', { name: '8' }));
    await user.click(screen.getByRole('button', { name: '/' }));
    // await user.click(screen.getByRole('button', { name: '0' }));
    await user.click(screen.getByRole('button', { name: '=' }));
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  test('C でリセット', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    await user.click(screen.getByRole('button', { name: '7' }));
    await user.click(screen.getByRole('button', { name: 'C' }));
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
