import { useParams } from "react-router-dom";

const Foods: React.FC = () => {
  const { restaurantsId } = useParams();

  return (
    <>
      フード一覧
      <br />
      id: {restaurantsId}
    </>
  );
};

export default Foods;
