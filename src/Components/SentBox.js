import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./SentBox.css";

const SentBox = () => {
  const email = localStorage.getItem("email");
  const sentArr = [];
  const [sent, setSent] = useState([]);

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
                if (data[item].from === email) {
                  sentArr.push(data[item]);
                }
              });
              setSent(sentArr);
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
      {sent.map((mail) => {
        return (
          <div className="sent">
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
