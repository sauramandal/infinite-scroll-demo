import { useState, useEffect } from "react";

// const apiUrl = 'https://randomuser.me/api/?page=3&results=10'
const PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 1;

const ImageGrid = () => {
  const [nextPageNumber, setNextPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [randomData, setRandomData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      console.log(nextPageNumber);
      const url = `https://randomuser.me/api/?page=${nextPageNumber}&results=${PAGE_SIZE}`;
      setIsLoading(true);
      const res = await fetch(url);
      const { results } = await res.json();
      const draftData = [
        ...randomData,
        ...results.map((item) => ({
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

  useEffect(() => {
    fetchData();
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
            <h4>{data.name}</h4>
            <img src={data.image} alt="" />
          </div>
        ))
      )}
      {/* {error && <div>{error}</div>} */}
    </div>
  );
};

export default ImageGrid;
