import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Compose.css";
import { useRef, useState } from "react";
import { convertToHTML } from "draft-convert";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../Store/Mail";

const Compose = () => {
  const reciever = useRef();
  const subject = useRef();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    const enteredReciever = reciever.current.value;
    const enteredSubject = subject.current.value;
    const enteredFrom = localStorage.getItem("email");
    event.preventDefault();
    const inboxArr = [];
    const email = localStorage.getItem("email");

    const mail = convertToHTML(editorState.getCurrentContent());
    const enteredMail = mail.replace(/<[^>]+>/g, "");
    await fetch(
      `https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/sender.json`,
      {
        method: "POST",
        body: JSON.stringify({
          subject: enteredSubject,
          mail: enteredMail,
          from: enteredFrom,
          to: enteredReciever,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    await fetch(
      `https://mailbox-client-d2bbf-default-rtdb.firebaseio.com/reciever.json`,
      {
        method: "POST",
        body: JSON.stringify({
          id: Math.random(),
          subject: enteredSubject,
          mail: enteredMail,
          from: enteredFrom,
          to: enteredReciever,
          read: false,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="mail-form">
        <label>To:</label>
        <input ref={reciever} className="to-input" type="email" />
        <hr />
        <input
          ref={subject}
          placeholder="subject"
          className="subject-input"
          type="text"
        />
        <hr />
        <Editor
          placeholder="write..."
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Compose;
