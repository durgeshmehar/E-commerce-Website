/* eslint-disable no-async-promise-executor */
export function createUser(userData) {
  return new Promise(async (resolve,reject) => {
    try{

      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if(response.ok){
        const data = await response.json();
        resolve({ data });
      }
      else{
        const err = await response.json();
        reject(err);
      }
    }
    catch(err){
      reject({err});
    }
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
        console.log("Error at loginUser",err)
        reject(err);
      }
    } catch (err) {
      console.log("catch at loginUser",err)
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
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
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
      const response = await fetch("/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

export function signOut() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/logout");
      if (response.ok) {
        resolve({ data: "Logged out successfully" });
      } else {
        const err = await response.text();
        reject(err);
      }
    } catch (err) {
      reject({ err });
    }
  });
}
