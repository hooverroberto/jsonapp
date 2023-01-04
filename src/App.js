import { useState, useEffect } from "react";
import "./App.css";

const getData = async (page) => {
  try {
    let res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const [loading, setLoading] = useState(true);
  const [post, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAndData(page);
  }, [page]);

  const fetchAndData = async (page = 1) => {
    try {
      setLoading(true);
      const data = await getData(page);
      console.log(data);
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handlePageChange = (changeBy) => {
    setPage(page + changeBy);
    fetchAndData(page + changeBy);
  };

  if (loading) {
    return <h1>loading.....</h1>;
  }

  return (

    <div className="App">
      <h1 className="mt-5 text-white">POSTS</h1>
      <div className="container d-flex justify-content-center mt-5">
        <div className="card">
          <div className="card-body">
            <ul className="list-group">
              {post.map((postItem) => (
                <li className="card border-primary p-2 my-3 fst-italic" key={postItem.id}  style={{width:360}}>
                  {postItem.id} {"-"} {postItem.title}
                </li>

              ))}

            </ul>
          </div>
        </div>

      </div>
      <div className="my-5">
      <button
        disabled={page === 1}
        onClick={() => {
          handlePageChange(-1);
        }}
        className="bg bg-success text-white p-2 rounded-1"
      >
        ATRAS
      </button>
      <button className="bg bg-primary text-white px-4 py-2 mx-3 border-0 rounded-1">{page}</button>
      <button
        disabled={page === 10}
        onClick={() => {
          handlePageChange(1);
        }}
        className="bg bg-primary text-white p-2 border-0 rounded-1"
      >
        NEXT
      </button>
      </div>
    </div>

  );
}

export default App;
