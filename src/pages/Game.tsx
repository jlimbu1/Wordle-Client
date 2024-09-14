import { useParams } from "react-router-dom";

const GamePage = () => {
  const { id } = useParams();

  return id ? <>{id}</> : <>Missing Game Session!</>;
};

export default GamePage;
