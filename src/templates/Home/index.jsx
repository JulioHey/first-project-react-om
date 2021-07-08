import { useEffect, useState, useRef } from 'react';
import './styles.css';

const isObjectEqual = (objA, objB) => {
  return JSON.stringify(objA) == JSON.stringify(objB);
};

// eslint-disable
const useFetch = (url, options) => {
  const [shouldPostLoad, setShouldPostLoad] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const urlRef = useRef(url);
  const optionsRef = useRef(options);

  useEffect(() => {
    let changed = false;
    if (!isObjectEqual(url, urlRef.current)) {
      urlRef.current = url;
      changed = true;
    }
    if (!isObjectEqual(options, optionsRef.current)) {
      optionsRef.current = options;
      changed = true;
    }
    if (changed == true) {
      setShouldPostLoad((s) => !s);
    }
  }, [url, options]);

  useEffect(() => {
    let wait = false;
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);

    const fectchData = async () => {
      try {
        const response = await fetch(urlRef.current, { signal, ...optionsRef.current });
        const jsonResult = await response.json();

        if (!wait) {
          setResult(jsonResult);
          setLoading(false);
        }
      } catch (e) {
        if (!wait) {
          setLoading(false);
        }
        console.log('My Error', e);
      }
    };

    fectchData();

    return () => {
      wait = true;
      controller.abort();
    };
  }, [shouldPostLoad]);

  return [result, loading, shouldPostLoad];
};

export const Home = () => {
  const [postId, setPostId] = useState('');
  const [result, loading] = useFetch('https://jsonplaceholder.typicode.com/posts/' + postId, {});

  const handleClick = (id) => {
    setPostId(id);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && result) {
    return (
      <div>
        {result.length > 0 ? (
          result.map((p) => {
            return (
              <p onClick={() => handleClick(p.id)} key={p.id}>
                {p.title}
              </p>
            );
          })
        ) : (
          <p onClick={() => handleClick('')}>{result.title}</p>
        )}
      </div>
    );
  }

  return <h1>Oi</h1>;
};
