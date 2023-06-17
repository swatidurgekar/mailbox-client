import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import "./Inbox.css";
import { mailActions } from "../Store/Mail";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Inbox = () => {
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  const [inbox, setInbox] = useState([]);
  const inboxMails = useSelector((state) => state.mails.recieved);
  const localMails = JSON.parse(localStorage.getItem("inbox"));
  let initial = useRef(false);
  const mails = useSelector((state) => state.mails.recieved);

  const dispatchFunc = (id, index) => {
    let newid;
    localStorage.setItem("mails", JSON.stringify(inboxMails));
    dispatch(mailActions.changeReadProperty(index));
    const obj = { ...inboxMails[index] };
    fetch(
      `https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/reciever.json`
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const keys = Object.keys(data);
          keys.map((item) => {
            if (data[item].id === id) {
              newid = item;
            }
          });
          fetch(
            `https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/reciever/${newid}.json`,
            {
              method: "PUT",
              body: JSON.stringify({ ...obj, read: true }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
        });
      }
    });
  };

  const read = (id, index) => {
    dispatchFunc(id, index);
  };

  useEffect(() => {
    const inboxArr = [];
    async function get() {
      await fetch(
        "https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/reciever.json"
      ).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data) {
              const keys = Object.keys(data);
              keys.map((item) => {
                if (data[item].to === email) {
                  inboxArr.push(data[item]);
                }
              });
              dispatch(mailActions.recieveMail(inboxArr));
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
      <h1>INBOX</h1>
      <hr />
      {inboxMails.map((mail) => {
        const index = inboxMails.indexOf(mail);
        return (
          <NavLink to={`/inbox/${mail.id}`} className="link" key={mail.id}>
            <div className="inbox" onClick={() => read(mail.id, index)}>
              <b>
                {mail.read ? null : (
                  <span>
                    <div className="unread" />
                  </span>
                )}
                <span className="from">{mail.from}</span>
                <span>{mail.mail}</span>
              </b>

              <hr />
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Inbox;
