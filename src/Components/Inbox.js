import Sidebar from "./Sidebar";
import "./Inbox.css";
import { mailActions } from "../Store/Mail";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Inbox = () => {
  const dispatch = useDispatch();
  const inboxMails = useSelector((state) => state.mails.recieved);

  const dispatchFunc = (id, index) => {
    let newid;
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

  const deleteMail = async (id, index) => {
    const res = await fetch(
      `https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/reciever.json`
    );
    if (res.ok) {
      const data = await res.json();
      const keys = Object.keys(data);
      keys.map((key) => {
        if (data[key].id === id) {
          fetch(
            `https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/reciever/${key}.json`,
            { method: "DELETE" }
          );
        }
      });
      dispatch(mailActions.deleteMail(index));
    }
  };

  return (
    <div>
      <Sidebar />
      <h1>INBOX</h1>
      <hr />
      {inboxMails.map((mail) => {
        const index = inboxMails.indexOf(mail);
        return (
          <div key={mail.id}>
            <NavLink to={`/inbox/${mail.id}`} className="link">
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
              </div>
            </NavLink>
            <button onClick={() => deleteMail(mail.id, index)}>DELETE</button>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Inbox;
