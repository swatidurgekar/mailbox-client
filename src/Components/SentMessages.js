import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const SentMessages = () => {
  const params = useParams();
  const mails = useSelector((state) => state.mails.sent);
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
export default SentMessages;
