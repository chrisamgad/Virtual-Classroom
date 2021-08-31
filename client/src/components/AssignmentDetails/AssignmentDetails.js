import React, { useEffect,useContext } from 'react'
import CourseContext from '../../Contexts/CourseContext';
const AssignmentDetails = () => {

    const courseCtx=useContext(CourseContext)
    useEffect(()=>{
        //Get Students --> Details to display are name,email,submissionstatus,link to the students uploaded attempt

        courseCtx.SetWentInsideCourse(true)
    },[])
    return ( <div>
        Hello
    </div> );
}
 
export default AssignmentDetails;