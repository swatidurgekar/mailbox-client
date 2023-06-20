import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { mailActions } from "../Store/Mail";
import SenderUseFetch from "./senderUseFetch";

const SentMessages = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const params = useParams();
  const mails = useSelector((state) => state.mails.sent);
  const data = SenderUseFetch(
    "https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/sender.json"
  );

  return (
    <div>
      {mails.map((mail) => {
        if (mail.id === +params.mailId) {
          return (
            <div className="read-mail" key={mail.id}>
              <span className="from">
                from: <b>Me</b>
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
