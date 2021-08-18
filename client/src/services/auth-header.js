export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user')); //parse user into javascript object
  
    if (user && user.token) {//if user still exists in the local storage AND user has user token
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }