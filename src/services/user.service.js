import http from "../utils/http-common";
const apiVersions = ["v1", "v2"];

export const fetchuser = (id) => {
  let token = JSON.parse(localStorage.getItem("auth"));
  return http.get("/" + apiVersions[0] + "/users/" + id, {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });
};
