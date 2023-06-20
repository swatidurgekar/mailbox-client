import Sidebar from "./Sidebar";
import "./SentBox.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { mailActions } from "../Store/Mail";
import { NavLink } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import { useEffect } from "react";
import SenderUseFetch from "./senderUseFetch";

const SentBox = () => {
  const dispatch = useDispatch();
  const sentMails = useSelector((state) => state.mails.sent);
  const email = localStorage.getItem("email");
  const data = SenderUseFetch(
    "https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/sender.json"
  );

  const deleteMail = async (id, index) => {
    dispatch(mailActions.deleteSentMail(index));
    const res = await fetch(
      `https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/sender.json`
    );
    if (res.ok) {
      const data = await res.json();
      if (data) {
        const keys = Object.keys(data);
        keys.map((key) => {
          if (data[key].id === id) {
            fetch(
              `https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/sender/${key}.json`,
              { method: "DELETE" }
            );
          }
        });
      }
    }
  };

  return (
    <div>
      <Sidebar />
      <h1>SENT</h1>
      <hr />
      {sentMails.map((mail) => {
        const index = sentMails.indexOf(mail);
        return (
          <div key={mail.id}>
            <NavLink to={`/sentbox/${mail.id}`} className="link">
              <div className="sentbox">
                <b>
                  <span className="to">{mail.to}</span>
                  <span>{mail.mail}</span>
                </b>
              </div>
            </NavLink>

            <button
              className="delete-btn"
              onClick={() => deleteMail(mail.id, index)}
            >
              <BiTrash />
            </button>

            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default SentBox;
