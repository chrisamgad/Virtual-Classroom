
import React,{createContext,useState} from 'react'
import AuthService from '../services/auth.service'


const AuthenticatedContext =createContext({
    AuthenticatedUser:undefined
})

export function AuthenticatedContextProvider(props){
    const [authenticateduser,setauthenticateduser]=useState(undefined)

    function SetAuthenticatedUser(){
        setauthenticateduser(AuthService.getCurrentUser())
        
    }
    const context ={
        AuthenticatedUser:authenticateduser,
        SetAuthenticatedUser:SetAuthenticatedUser
    }

    return <AuthenticatedContext.Provider value={context}>
        {props.children}
    </AuthenticatedContext.Provider>
}

export default AuthenticatedContext;