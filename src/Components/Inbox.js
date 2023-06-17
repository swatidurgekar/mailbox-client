import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Inbox.css";

const Inbox = () => {
  const email = localStorage.getItem("email");
  const inboxArr = [];
  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    async function get() {
      fetch(
        "https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/sent.json"
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
              setInbox(inboxArr);
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
      {inbox.map((mail) => {
        return (
          <div className="inbox">
            <b>
              <span className="from">{mail.from}</span>
              <span>{mail.mail}</span>
            </b>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Inbox;
