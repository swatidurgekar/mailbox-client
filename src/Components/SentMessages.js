import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { mailActions } from "../Store/Mail";

const SentMessages = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const params = useParams();
  const mails = useSelector((state) => state.mails.sent);

  useEffect(() => {
    const getData = async () => {
      const sentboxArr = [];
      const res = await fetch(
        "https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/sender.json"
      );
      if (res.ok) {
        const data = await res.json();
        if (data) {
          const keys = Object.keys(data);

          keys.map((item) => {
            if (data[item].from === email) {
              sentboxArr.push(data[item]);
            }
          });
          dispatch(mailActions.sendMail(sentboxArr));
        }
      }
    };
    getData();
  }, [email, dispatch]);

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
