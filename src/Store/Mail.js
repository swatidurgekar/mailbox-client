import { createSlice } from "@reduxjs/toolkit";
const bearerToken = localStorage.getItem("idToken");
console.log(bearerToken);

const initialState = {
  isAuthenticated: !!bearerToken,
  sent: [],
  recieved: [],
};

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
      state.recieved[index].read = true;
    },
    deleteMail(state, action) {
      const index = action.payload;
      state.recieved.splice(index, 1);
    },
    deleteSentMail(state, action) {
      const index = action.payload;
      state.sent.splice(index, 1);
    },
    manageAuthentication(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
