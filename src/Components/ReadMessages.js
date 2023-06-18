import { useParams } from "react-router-dom";
import "./ReadMessages.css";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const ReadMessages = () => {
  const params = useParams();
  const mails = useSelector((state) => state.mails.recieved);
  return (
    <div>
      <Sidebar />
      {mails.map((mail) => {
        if (mail.id === +params.mailId) {
          return (
            <div className="read-mail" key={mail.id}>
              <span className="from">
                from: <b>{mail.from}</b>
              </span>
              <br />
              <span className="to">To: {mail.to}</span>
              <p className="message">message: {mail.mail}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ReadMessages;
