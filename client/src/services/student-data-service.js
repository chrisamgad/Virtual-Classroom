import axios from 'axios'
import authHeader from './auth-header'
import AuthService from './auth.service'

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
 
    async getCourses(role){
      if(AuthService.getCurrentUser().role==='student')
      {
        const response=await axios.get(
          API_URL +'/student/getmycourses',
          {
            headers: authHeader()
          }
        )
        return response

      }
      else if (AuthService.getCurrentUser().role==='teacher')
      {
        const response= await axios.get(
          API_URL +'/teacher/getmycourses',           
          {
            headers: authHeader()
          }
        )

        return response
      }

    }

    uploadAvatar(data){
      console.log(data)
      return axios.post(
        API_URL+'/uploadavatar',
        
          data
        ,
        {
          headers: authHeader()
          
        }
      ).then((response)=> {
        //console.log(response.body)
        return response
      }).catch((e) =>{
          throw new Error (e.response.data.message) //e is an error message object in axios
        }) //malhash lazma w msh shaghala
    }

    getUserImage(){
      let user_id=undefined;
      if(AuthService.getCurrentUser().role==='student')
        user_id=AuthService.getCurrentUser().user.student._id;
      else if(AuthService.getCurrentUser().role==='teacher')
        user_id=AuthService.getCurrentUser().user.teacher._id;

      const ImageURL= API_URL + '/getavatar/' +user_id
      
      //console.log(response)
      return ImageURL;
    }

    DeleteCourses(newcoursesarr){
     return axios.patch( API_URL + '/teacher/updatecourses'
      ,{courses: newcoursesarr}, {headers: authHeader()})
            .then((res)=>res)
            .catch((e)=>{throw new Error(e)}) 
    }

    AddCourse(course_name,course_description){
      return axios.post(
        API_URL+'/teacher/createcourse',
        {
          coursename:course_name,
          description:course_description
        },
        {
          headers:authHeader()
        }
      )
    }

    getCurrentStudents(courseID,limit,skip){
      return axios.get(
        `${API_URL}/teacher/${courseID}/getstudentslist?limit=${limit}&skip=${skip}`,
        {
          headers:authHeader()
        }
      )
      .then(res=>res)
      .catch((e)=>{throw new Error(e)})
    }

    RemoveStudent(student,courseID){
      return axios.patch(
        `${API_URL}/teacher/removestudent`,
        {
          email:student.email,
          course_id:courseID
        },
        {
          headers:authHeader()
        }
      )
      .then(res=>res)
      .catch((e)=>{throw new Error(e)})
    }

    AddStudent(student_email,courseID){
      return axios.post(
        `${API_URL}/teacher/addstudent`,
        {
          email:student_email,
          course_id:courseID
        },
        {
          headers:authHeader()
        }
      ).then((res)=>res)
      .catch((e)=>{throw new Error(e)})
    }
    
    GetAssignments(courseID){
      const role=JSON.parse(localStorage.getItem("role"))
      if(role==='teacher')
    {
      console.log('sdfsdfsdds')
      return axios.get(
        `${API_URL}/teacher/${courseID}/getassignments`,
        {
          headers:authHeader()
        }
        ).then((res)=>res)
        .catch((e)=>{throw new Error(e)})
    }

      else if (role==='student')
        return axios.get(
          `${API_URL}/student/${courseID}/getassignments`,
          {
            headers:authHeader()
          }
          ).then((res)=>res)
          .catch((e)=>{throw new Error(e)})
    }

    // `${API_URL}/teacher/${courseID}/createassignment`
    CreateAndUploadAssignment(courseID,formdata){

      return axios.post(
        `${API_URL}/teacher/${courseID}/createassignment`,
        formdata,
        { 
          headers:authHeader()
        }
      ).then((res)=>res)
      .catch((e)=>{throw new Error(e)})
    }

    DeleteAssignment(courseID,assignmentID){
      return axios.patch(
        `${API_URL}/teacher/${courseID}/deleteassignment/${assignmentID}`,undefined,{
          headers:authHeader()
        })
        .then(res=>res)
        .catch((e)=>{throw new Error(e)})
    }

    SubmitAttempt(courseID,assignmentID,formdata){
      return axios.post(
        `${API_URL}/student/${courseID}/submitassignment/${assignmentID}`,
        formdata,
        {
          headers:authHeader()
        }
      ).then((res)=>console.log(res))
      .catch((e)=>{throw new Error(e)})
    }

    GetAttempt(courseID,assignmentID){
      return axios.get(
        `${API_URL}/student/${courseID}/getattempt/${assignmentID}`,
        {
          headers:authHeader()
        }
        ).then((res)=>res)
        .catch((e)=>{throw new Error(e)})

    }


  }

 


  
  export default new StudentService();