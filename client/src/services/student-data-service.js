import axios from 'axios'
import authHeader from './auth-header'


const API_URL = "http://localhost:4000";
class StudentService {
    // getPublicContent() {
    //   return axios.get(API_URL + 'all');
    // }
  
    // getUserBoard() {
    //   return axios.get(API_URL + 'user', { headers: authHeader() });
    // }
  
    // getModeratorBoard() {
    //   return axios.get(API_URL + 'mod', { headers: authHeader() });
    // }
  
    // getAdminBoard() {
    //   return axios.get(API_URL + 'admin', { headers: authHeader() });
    // }

    getProfile(){
      
      return axios.get(
        API_URL+'/myprofile',
        {
          headers: authHeader()
        }
      ).then((response)=> {
        //console.log(response.body)
        return response
      })
        .catch((e) =>{
          throw new Error (e.response.data.message) //e is an error message object in axios
        }) //malhash lazma w msh shaghala
    }
 
    uploadAvatar(data){
      console.log(data)
      return axios.post(
        API_URL+'/uploadavatar',
        
          data
        ,
        {
          headers: authHeader(),
          
        }
      ).then((response)=> {
        //console.log(response.body)
        return response
      }).catch((e) =>{
          throw new Error (e.response.data.message) //e is an error message object in axios
        }) //malhash lazma w msh shaghala
    }
    
  }
  
  export default new StudentService();