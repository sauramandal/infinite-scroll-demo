import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

// const apiUrl = 'https://randomuser.me/api/?page=3&results=10'
const PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 1;

const ImageGrid = () => {
  let navigate = useNavigate();
  const [nextPageNumber, setNextPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [randomData, setRandomData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const url = `https://randomuser.me/api/?page=${nextPageNumber}&results=${PAGE_SIZE}`;
      setIsLoading(true);
      const res = await fetch(url);
      const { results } = await res.json();
      const draftData = [
        ...randomData,
        ...results.map((item) => ({
          ...item,
          name: `${item.name.first} ${item.name.last}`,
          image: item.picture.thumbnail
        }))
      ];
      //console.log("res", data);
      setRandomData(draftData);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.offsetHeight
    ) {
      console.log("Triggered");
      let pageNumber = nextPageNumber + 1;
      setNextPageNumber(pageNumber);
      fetchData();
    }
  };

  const handleOnClick = (data) => {
    console.log(data.id.name);
    navigate(`/${data.id.name}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nextPageNumber]);

  console.log(randomData.length);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        randomData.map((data) => (
          <div key={data.name} className="container">
            <h4 onClick={() => handleOnClick(data)}>{data.name}</h4>
            <img src={data.image} alt="" />
          </div>
        ))
      )}
      {/* {error && <div>{error}</div>} */}
    </div>
  );
};

export default ImageGrid;
