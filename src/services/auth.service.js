import http from "../utils/http-common";

const apiVersions = ["v1", "v2"];

export const adduser = (formData) => {
  return http.post("/" + apiVersions[0] + "/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
};

export const confirmUserSignUp = (userData) => {
  return http.post("/" + apiVersions[0] + "/users/verify", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const signin = (userData) => {
  return http.post("/" + apiVersions[0] + "/users/signin", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchuser = (id) => {
  return http.get("/" + apiVersions[0] + "/users/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
