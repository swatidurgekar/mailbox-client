import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const compose = () => {
    navigate("/compose");
  };

  const sent = () => {
    navigate("/sent");
  };

  const inbox = () => {
    navigate("/inbox");
  };

  return (
    <div>
      <p>Welcome to your mail box!!!</p>
      <button onClick={inbox}>INBOX</button>
      <button onClick={sent}>SENT</button>
      <button onClick={compose}>COMPOSE</button>
      <hr />
    </div>
  );
};

export default Welcome;
