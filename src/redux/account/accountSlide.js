import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,

  user: {
    MAADMIN: "",
    CCCD: "",
    TENDANGNHAP: "",
    SDT: "",
    SDT_KH: "",
    HOTEN: "",
    GIOITINH: "",
    EMAIL: "",
    DIACHI: "",
    ROLE: "",
  },
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;

      state.user.MAADMIN = action.payload?.MAADMIN;
      state.user.TENDANGNHAP = action.payload?.TENDANGNHAP;
      state.user.SDT = action.payload?.SDT;
      state.user.SDT_KH = action.payload?.SDT_KH;
      state.user.HOTEN = action.payload?.HOTEN;
      state.user.GIOITINH = action.payload?.GIOITINH;
      state.user.EMAIL = action.payload?.EMAIL;
      state.user.DIACHI = action.payload?.DIACHI;
      state.user.ROLE = action.payload?.ROLE;
      state.user.CCCD = action.payload?.CCCD;
    },

    doLogoutAction: (state, action) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.user = {
        MAADMIN: "",
        CCCD: "",
        TENDANGNHAP: "",
        SDT: "",
        SDT_KH: "",
        HOTEN: "",
        GIOITINH: "",
        EMAIL: "",
        DIACHI: "",
        ROLE: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { doLoginAction, doLogoutAction } = accountSlice.actions;

export default accountSlice.reducer;
