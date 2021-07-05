import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should have value of search value', () => {
    render(<TextInput searchValue="testando" handleChange={jest.fn()} />);

    const input = screen.getByPlaceholderText(/type your search/i);

    expect(input.value).toBe('testando');
  });

  it('should change value when typed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} />);

    const input = screen.getByPlaceholderText(/type your search/i);

    const newValue = 'dale';
    userEvent.type(input, newValue);

    expect(input.value).toBe(newValue);
    expect(fn).toHaveBeenCalledTimes(newValue.length);
  });

  it('should match snapshot', () => {
    const { container } = render(<TextInput handleChange={jest.fn()} searchValue="testando" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
