import { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./SentBox.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { mailActions } from "../Store/Mail";
import { NavLink } from "react-router-dom";
import { BiTrash } from "react-icons/bi";

const SentBox = () => {
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  const sentMails = useSelector((state) => state.mails.sent);

  const deleteMail = async (id, index) => {
    const res = await fetch(
      `https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/sender.json`
    );
    if (res.ok) {
      const data = await res.json();
      const keys = Object.keys(data);
      keys.map((key) => {
        if (data[key].id === id) {
          fetch(
            `https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/sender/${key}.json`,
            { method: "DELETE" }
          );
        }
      });
      dispatch(mailActions.deleteSentMail(index));
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
