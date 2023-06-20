import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { mailActions } from "../Store/Mail";

const useFetch = (url) => {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  useEffect(() => {
    const getData = async () => {
      const inboxArr = [];
      const res = await fetch(url);
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
    };
    getData();
  }, [url]);
};

export default useFetch;
