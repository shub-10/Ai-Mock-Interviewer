import {createContext, useContext,useState} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
  const [isloggedIn, setisloggedIn] = useState(!!localStorage.getItem('Aitoken'));

  return (
    <AuthContext.Provider value={{isloggedIn, setisloggedIn}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth =()=> useContext(AuthContext);