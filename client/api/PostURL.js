import axios from 'axios';

// Interacts with routes in backend/routes/userRoutes.js
// url is the route and json has the object being passed. The backend
// route will unpack the json object using req.body.[name of key]
// https://github.com/axios/axios/issues/2330
export function postURL(url, jsonObj) {
  console.log(`Called function, posting ${url}`);
  return new Promise((resolve, reject) => {
    axios
      .post(url, jsonObj)
      .then((res) => {
        console.log(`result: ${res}`);
        resolve(res);
      })
      .catch((error) => {
        console.log(`error: ${error}`);
        reject(error);
      });
  });
}
