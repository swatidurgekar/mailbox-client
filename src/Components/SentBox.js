import { useEffect, useState } from "react";

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
      <h1>SENT</h1>
      <hr />
      {sent.map((mail) => {
        return (
          <div key={mail.subject}>
            <b>subject: </b>
            {`${mail.subject}`}
            <br />
            <b>To: </b>
            {mail.to}
            <br />
            <b>message: </b>
            {mail.mail}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default SentBox;
