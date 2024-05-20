import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: {
    MAADMIN: "",
    TENDANGNHAP: "",
    SDT: "",
    HOTEN: "",
    GIOITINH: "",
    EMAIL: "",
    DIACHI: "",
  },
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;

      state.MAADMIN = action.payload.MAADMIN;
      state.TENDANGNHAP = action.payload.TENDANGNHAP;
      state.SDT = action.payload.SDT;
      state.HOTEN = action.payload.HOTEN;
      state.GIOITINH = action.payload.GIOITINH;
      state.EMAIL = action.payload.EMAIL;
      state.DIACHI = action.payload.DIACHI;
    },

    doLogoutAction: (state, action) => {
      state.isAuthenticated = false;
      state.user = {
        MAADMIN: "",
        TENDANGNHAP: "",
        SDT: "",
        HOTEN: "",
        GIOITINH: "",
        EMAIL: "",
        DIACHI: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { doLoginAction, doLogoutAction } = accountSlice.actions;

export default accountSlice.reducer;
