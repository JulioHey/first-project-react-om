import { Component } from "react";

import "./styles.css";

import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { loadPosts } from "../../utils/load-posts";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  componentDidUpdate() {
    console.log('Props:', this.props);
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(0, this.state.postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts } = this.state;

    const newPage = page + 1;
    this.setState({
      page: newPage,
      postsPerPage: postsPerPage,
      allPosts: allPosts,
      posts: allPosts.slice(0, (newPage + 1) * postsPerPage),
    });
  };

  handleChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  render() {
    const { searchValue, allPosts, posts, postsPerPage, page } = this.state;

    const filteredPosts = !!searchValue
      ? posts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        <div
          className="search-container"
        >
          {!!searchValue && 
            <h1>Search Value: {searchValue}</h1>
          }
          <TextInput 
            searchValue={searchValue} 
            handleChange={this.handleChange} 
          />
        </div>
       

        {filteredPosts.length > 0 ? (
          <Posts posts={filteredPosts} />
        ) : (
          <p>Não existem posts!</p>
        )}
        <div className="button-container">
          {!searchValue && (
            <Button
              onClick={this.loadMorePosts}
              text="Load More Posts"
              disabled={
                (page + 1) * postsPerPage >= allPosts.length ? true : false
              }
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
