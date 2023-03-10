import axios from "axios";

const generateURL = (path, queryVars) => {
  let fullEndpoint = `${process.env.REACT_APP_API_ENDPOINT}/${path}`;
  if (queryVars) {
    queryVars.forEach((elem, index) => {
      fullEndpoint += `${index === 0 ? "?" : "&"}${elem.name}=${elem.value}`;
    });
  }
  return fullEndpoint;
};

export const creareUtilizator = async (email, parola, nume) => {
  try {
    const res = await axios.put(generateURL("signup"), {
      email: email,
      parola: parola,
      nume: nume,
    });
    return res.data;
  } catch (err) {
    throw Error(err.message);
  }
};

export const login = async (email, parola) => {
  try {
    const res = await axios.
  } catch (e) {
    throw Error(e);
  }
};
