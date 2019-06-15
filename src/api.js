const proxy = "https://polar-beach-54822.herokuapp.com/";
const api = "http://colormind.io/api/";
export const url = proxy + api;
export const dataForApi = {
  body: `{ "model":"default"}`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  method: "POST"
};