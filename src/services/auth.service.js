import http from "../utils/http-common";
const apiVersions = ["v1", "v2"];

export const adduser = (formData) => {
  return http.post("/" + apiVersions[0] + "/auth/signup", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
};

export const confirmUserSignUp = (userData) => {
  return http.post("/" + apiVersions[0] + "/auth/verify", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const signin = (userData) => {
  return http.post("/" + apiVersions[0] + "/auth/signin", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
