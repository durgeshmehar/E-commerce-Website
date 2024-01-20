/* eslint-disable no-async-promise-executor */
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.text();
        reject(err);
      }
    } catch (err) {
      reject({ err });
    }
  });
}
export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check");

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.text();
        reject(err);
      }
    } catch (err) {
      reject({ err });
    }
  });
}
export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });
      console.log("resetPasswordRequest response: ", response);
      if (response.ok) {
        const data = await response.json();
        console.log("resetPasswordRequest data: ", data);
        resolve({ data });
      } else {
        const err = await response.text();
        reject(err);
      }
    } catch (err) {
      reject({ err });
    }
  });
}
export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("ResetPassword data at authApi: ", data);
      const response = await fetch("/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("ResetPassword response : ", response);
      if (response.ok) {
        const data = await response.json();
        console.log("ResetPassword data at authApi: ", data);
        resolve({ data });
      } else {
        console.log("ResetPassword error at authApi try: ", response);
        const err = await response.text();
        reject(err);
      }
    } catch (err) {
      console.log("ResetPassword error at authApi catch: ", err);
      reject({ err });
    }
  });
}

export function signOut() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/logout");
      if (response.ok) {
        console.log("Signout response: ", response);
        resolve({ data: "Logged out successfully" });
      } else {
        console.log("Signout error at authApi try: ", response);
        const err = await response.text();
        reject(err);
      }
    } catch (err) {
      console.log("Signout error at authApi catch: ", err);
      reject({ err });
    }
  });
}
