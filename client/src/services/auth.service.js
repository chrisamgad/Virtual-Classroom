import axios from "axios";

const API_URL = "http://localhost:4000/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        // if (response.data.accessToken)
        // {
        //    localStorage.setItem("user", JSON.stringify(response.data));
        
        // }
        console.log(response.data)
        return response;
      }).catch((e)=>console.log(e + 'error was catched')
      );
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();