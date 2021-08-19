import axios from "axios";

const API_URL = "http://localhost:4000";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/login", {
        email,
        password
      })
      .then(response => {

        if (response.data.token)
         {
            localStorage.setItem("user", JSON.stringify(response.data));    //stringify as data is stored as JSON in local storage by nature 
         }
        console.log(response.data)
        return response;
      }).catch((e)=>console.log(e + 'error was catched')
      );
  }

  register(fullname, email, password, mobilenumber) {
    return axios.post(API_URL + "/signup", {
            fullname,
            email,
            mobilenumber,
            password,
            role: 'student'
            }).then((response)=>{

                if(response.data.token)
                    localStorage.setItem("user", JSON.stringify(response.data));   
                return response

            }).catch((e)=>console.log(e + 'error was catched'))

    }

  logout() {//lesa kamelha (lazem te remove eltoken from server)
    localStorage.removeItem("user");
  }
 

//   getCurrentUser() { //this is not good because localstorage doesnt have expiration date so it can stay there for ever
//     return JSON.parse(localStorage.getItem('user'));;
//   }
}

export default new AuthService();