import { useEffect } from "react";
import { mailActions } from "../Store/Mail";
import { useDispatch } from "react-redux";

const SenderUseFetch = (url) => {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  useEffect(() => {
    const sentboxArr = [];
    const getData = async () => {
      const res1 = await fetch(url);
      if (res1.ok) {
        const data1 = await res1.json();
        if (data1) {
          const keys1 = Object.keys(data1);
          keys1.map((item) => {
            if (data1[item].from === email) {
              sentboxArr.push(data1[item]);
            }
          });
          dispatch(mailActions.sendMail(sentboxArr));
        }
      }
    };
    getData();
  }, [url]);
};

export default SenderUseFetch;
