import { useParams } from "react-router-dom";

export const Foods: React.FC = () => {
  const { restaurantsId } = useParams();

  return (
    <>
      フード一覧
      <br />
      id: {restaurantsId}
    </>
  );
};
