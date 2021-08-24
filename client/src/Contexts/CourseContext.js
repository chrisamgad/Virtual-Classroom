
import React,{createContext,useState} from 'react'

const CourseContext =createContext({
    WentInsideCourse:false,
    courses_changed: false
})

export function CourseContextProvider(props){
    const [WentInsideCourse,setWentInsideCourse]=useState(false);
    const[courses_changed, set_courses_changed]=useState(false)    

    function SetWentInsideCourse(value){
        setWentInsideCourse(value)       
    }

    function Toggle_courses_changed(){
        set_courses_changed((prevstate)=>!prevstate)       
    }

    const context ={
        WentInsideCourse:WentInsideCourse,
        SetWentInsideCourse:SetWentInsideCourse,
        courses_changed:courses_changed,
        Toggle_courses_changed:Toggle_courses_changed
    }


    return <CourseContext.Provider value={context}>
        {props.children}
    </CourseContext.Provider>
}

export default CourseContext;