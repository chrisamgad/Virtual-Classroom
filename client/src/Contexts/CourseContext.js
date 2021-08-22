
import React,{createContext,useState} from 'react'

const CourseContext =createContext({
    WentInsideCourse:false

})

export function CourseContextProvider(props){
    const [WentInsideCourse,setWentInsideCourse]=useState(false);
    

    function SetWentInsideCourse(value){
        setWentInsideCourse(value)
        
    }

    const context ={
        WentInsideCourse:WentInsideCourse,
        SetWentInsideCourse:SetWentInsideCourse
    }


    return <CourseContext.Provider value={context}>
        {props.children}
    </CourseContext.Provider>
}

export default CourseContext;