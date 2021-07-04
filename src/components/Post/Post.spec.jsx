import {
  render,
  screen
} from '@testing-library/react';

import {PostCard} from '.';
import { postCardMock } from './mock';

const props = postCardMock;

describe("<Post />", () => {
  it("should render a Post", () => {
    render(<PostCard {...props} />);

    expect(screen.getByRole("img", {name: props.title}))
      .toHaveAttribute("src", props.cover);
    expect(screen.getByRole("heading", {name: props.title}))
      .toBeInTheDocument();
    expect(screen.getByText(props.body))
      .toBeInTheDocument();
    // expect(screen.getByRole("img", {name: props.title})).toBeInTheDocument();
  });

  it("should matchs snapshot", () => {
    const {container} = render(<PostCard {...props}/>)
    expect(container.firstChild).toMatchSnapshot();
  });
});