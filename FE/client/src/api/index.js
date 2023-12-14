import download from "downloadjs";
import { history } from "../hooks/myHistory";

const authorized = (res) => {
  try {
    if (res.status == 401) {
      history.navigate("/");
    }
  } catch (error) {}
};

/* const readJsonFile = (filePath) => {
  try {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return null;
  }
}; */

export const fetchAPIPostLogin = async (loginData) => {
  const data = JSON.stringify(loginData);
  const res = await fetch("http://localhost:5000/api/register/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  authorized(res);
  return res;
};

export const fetchAPIPostForgetPassword = async (data) => {
  const newData = JSON.stringify(data);
  const res = await fetch(
    "http://localhost:5173/api/register/forgot-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newData,
    }
  );
  authorized(res);
  return res;
};

export const fetchAPIPutResetPassword = async (data, token) => {
  const newData = JSON.stringify(data);
  const res = await fetch(
    `http://localhost:5173/api/register/reset-password/${token}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: newData,
    }
  );
  authorized(res);
  return res;
};

export const fetchAPIPutChangePassword = async (data) => {
  const newData = JSON.stringify(data);
  const res = await fetch(
    `http://localhost:5173/api/register/change-password`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: newData,
    }
  );
  authorized(res);
  return res;
};

export const fetchAPIGetRegisters = async () => {
  const res = await fetch(`http://localhost:5173/api/register/`, {
    method: "GET",
    credentials: "include",
  });
  authorized(res);
  const response = await res.json();
  return response;
};

export const fetchAPIGetRegisterByName = async (name) => {
  const data = JSON.stringify({ name: name });
  const res = await fetch(
    `http://localhost:5173/api/register/get-register-name/`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    }
  );
  authorized(res);
  const response = await res.json();
  return response;
};

export const fetchAPIGetRegisterById = async (id) => {
  const res = await fetch(`http://localhost:5173/api/register/${id}`, {
    method: "GET",
    credentials: "include",
  });
  authorized(res);
  return res;
};
