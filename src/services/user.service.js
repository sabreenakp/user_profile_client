
import http from "../utils/http-common";
const apiVersions = ["v1", "v2"];
let token = JSON.parse(localStorage.getItem("auth"));

export const fetchuser = (id) => {
    return http.get("/" + apiVersions[0] + "/users/" + id, {
      headers: {
        "Content-Type": "application/json",
        'authorization': token
      },
    });
  };