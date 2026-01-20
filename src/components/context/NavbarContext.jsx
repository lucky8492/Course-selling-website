import { React ,createContext , useContext , useState} from 'react'

const NavbarContext = createContext()

export const NavBarProvider = ({children}) =>{
    const [userToken , setUserToken] = useState("")
    const [adminToken , setAdminToken] = useState("")
    const [userName , setUserName] = useState("")

    return(
    <NavbarContext.Provider value={{userToken , adminToken ,userName , setUserName, setAdminToken , setUserToken}}>
        {children}
    </NavbarContext.Provider>
    )
}

export const useNavbar = () => useContext(NavbarContext);