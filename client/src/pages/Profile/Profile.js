
import React,{useEffect} from "react"
import StudentService from '../../services/student-data-service'
//import styles from './Profile.module.css'

const Profile =()=>{

    useEffect(()=>{
        StudentService.getProfile().then((res)=>{
           // console.log(res)
            
        }).catch((e)=>console.log(e.message))
    }, []) //empty array means this useeffect will only get triggered once only after page mounts
    return(
        <div>
            Profile page
        </div>
    )
}

export default Profile;