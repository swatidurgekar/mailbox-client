import { useParams } from "react-router-dom";
import "./ReadMessages.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { mailActions } from "../Store/Mail";

const ReadMessages = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const mails = useSelector((state) => state.mails.recieved);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const getData = async () => {
      const inboxArr = [];
      const res = await fetch(
        "https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/reciever.json"
      );
      if (res.ok) {
        const data = await res.json();
        if (data) {
          const keys = Object.keys(data);

          keys.map((item) => {
            if (data[item].to === email) {
              inboxArr.push(data[item]);
            }
          });
          dispatch(mailActions.recieveMail(inboxArr));
        }
      }
    };
    getData();
  }, [dispatch, email]);

  return (
    <div>
      {mails.map((mail) => {
        if (mail.id === +params.mailId) {
          return (
            <div className="read-mail" key={mail.id}>
              <span className="from">
                from: <b>{mail.from}</b>
              </span>
              <br />
              <span className="to">
                To: <b>Me</b>
              </span>
              <p className="message">message: {mail.mail}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ReadMessages;
