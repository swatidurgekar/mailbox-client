import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./SentBox.css";
import { mailActions } from "../Store/Mail";
import { useDispatch, useSelector } from "react-redux";

const SentBox = () => {
  const email = localStorage.getItem("email");

  const [sent, setSent] = useState([]);
  const dispatch = useDispatch();
  const sentMails = useSelector((state) => state.mails.sent);

  useEffect(() => {
    const sentArr = [];
    async function get() {
      fetch(
        "https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/sender.json"
      ).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data) {
              const keys = Object.keys(data);

              keys.map((item) => {
                if (data[item].from === email) {
                  sentArr.push(data[item]);
                }
              });
              dispatch(mailActions.sendMail(sentArr));
            }
          });
        }
      });
    }

    get();
  }, []);

  return (
    <div>
      <Sidebar />
      <h1>SENT</h1>
      <hr />
      {sentMails.map((mail) => {
        return (
          <div className="sent" key={mail.id}>
            <b>
              <span className="to">{mail.to}</span>
              <span>{mail.mail}</span>
            </b>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default SentBox;
