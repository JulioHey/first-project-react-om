import {
  render,
  screen
} from "@testing-library/react";

import {Posts} from '.';

const props = {
  posts: [
  {
    title: "title1",
    body: "body1",
    id: 1,
    cover: "img/img1.png",
  },
  {
    title: "title2",
    body: "body2",
    id: 2,
    cover: "img/img2.png",
  },
  {
    title: "title3",
    body: "body3",
    id: 3,
    cover: "img/img3.png",
  },
  {
    title: "title4",
    body: "body4",
    id: 4,
    cover: "img/img4.png",
  },
  ]
}

describe("<Posts />", () => {
  it ('should render posts', () => {
    render(<Posts {...props}/>);

    expect(screen.getAllByRole("heading", {name: /title/i}))
      .toHaveLength(4);
    expect(screen.getAllByRole("img", {name: /title/i}))
      .toHaveLength(4);
    expect(screen.getAllByText(/body/i))
      .toHaveLength(4);
    expect(screen.getByRole("img", {name: props.posts[0].title}))
      .toHaveAttribute("src", props.posts[0].cover);
  });

  it ('should not render if no posts', () => {
    render(<Posts />);
    expect(screen.queryByRole("heading", {name: /title/i}))
      .not.toBeInTheDocument();
  });

  it ('should match snapshot', () => {
    const {container} = render(<Posts {...props}/>);

    expect(container.firstChild).toMatchSnapshot();
  });
})