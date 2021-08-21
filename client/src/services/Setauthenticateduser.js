import { useContext } from 'react';
import AuthenticatedContext from "../Contexts/AuthenticatedContext";

export function Setauthenticateduser(value) {
  
    const authenticatedctrx=useContext(AuthenticatedContext)
    authenticatedctrx.SetAuthenticatedUser(value)
  
    return <div>ffffff</div>
}