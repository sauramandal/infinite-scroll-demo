import { useParams } from "react-router-dom";

const ImageDetails = () => {
  let { id } = useParams();
  console.log("Hello", id);
  return <div>Heloo {id}</div>;
};

export default ImageDetails;
