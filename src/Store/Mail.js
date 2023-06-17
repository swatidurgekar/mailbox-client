import { createSlice } from "@reduxjs/toolkit";
const initialState = { sent: [], recieved: [] };

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    sendMail(state, action) {
      state.sent = action.payload;
    },
    recieveMail(state, action) {
      state.recieved = action.payload;
    },
    changeReadProperty(state, action) {
      const index = action.payload;
      //   const newRecieved = [...state.recieved];
      //   newRecieved[index].read = true;
      //   state.recieved = newRecieved;
      state.recieved[index].read = true;
      localStorage.setItem("inbox", JSON.stringify(state.recieved));
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
