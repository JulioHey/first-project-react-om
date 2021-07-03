import { 
  useEffect, 
  useState,
  useCallback
} from "react";

import "./styles.css";

import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { loadPosts } from "../../utils/load-posts";

const Home = () => {
  // state = {
  //   posts: [],
  //   allPosts: [],
  //   page: 0,
  //   postsPerPage: 10,
  //   searchValue: "",
  // };

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const postsPerPage = 10;

  const handleLoadPosts = useCallback(async (postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(0, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(postsPerPage);
  }, [postsPerPage, handleLoadPosts]);

  const loadMorePosts = () => {
    const newPage = page + 1;

    setPosts(allPosts.slice(0, (newPage + 1) * postsPerPage));
    setPage(newPage);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

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
          handleChange={handleChange} 
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
            onClick={loadMorePosts}
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
//       </section>
//     );
//   }
// }

export default Home;
