import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { mailActions } from "../Store/Mail";

const Sidebar = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");

  useEffect(() => {
    const getData = async () => {
      const inboxArr = [];
      const sentboxArr = [];
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

      const res1 = await fetch(
        "https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/sender.json"
      );
      if (res1.ok) {
        const data1 = await res1.json();
        if (data1) {
          const keys = Object.keys(data1);

          keys.map((item) => {
            if (data1[item].from === email) {
              sentboxArr.push(data1[item]);
            }
          });
          dispatch(mailActions.sendMail(sentboxArr));
        }
      }
    };
    getData();
  }, [email, dispatch]);

  const mails = useSelector((state) => state.mails.recieved);

  let sum = 0;
  mails.forEach((element) => {
    if (element.read === false) {
      sum += 1;
    }
  });

  return (
    <div className="sidebar">
      <NavLink to="/compose">
        <button>COMPOSE</button>
      </NavLink>
      <hr />
      <NavLink className="navlink" to="/inbox">
        INBOX ({sum})
      </NavLink>
      <hr />
      <NavLink className="navlink">Unread</NavLink>
      <hr />
      <NavLink className="navlink">Starred</NavLink>
      <hr />
      <NavLink className="navlink">Drafts</NavLink>
      <hr />
      <NavLink className="navlink" to="/sent">
        Sent
      </NavLink>
      <hr />
      <NavLink className="navlink">Archieve</NavLink>
      <hr />
      <NavLink className="navlink">Spam</NavLink>
      <hr />
      <NavLink className="navlink">Deleted Items</NavLink>
      <hr />
      <NavLink to="/welcome" className="navlink">
        Back
      </NavLink>
      <hr />
    </div>
  );
};

export default Sidebar;
