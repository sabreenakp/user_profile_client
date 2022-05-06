import http from "../utils/http-common";

const apiVersions = ["v1", "v2"];

export const adduser = (formData) => {
  return http.post("/" + apiVersions[0] + "/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json"
    },
  });
};
