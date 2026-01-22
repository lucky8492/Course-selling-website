import { createContext, useContext, useState } from "react"

 
const SignCardContext = createContext() 


export const exportSignCardProvider = ({Children})=>{
     const[userTokenss , setUserTokenss] = useState("");
     const[adminTokenss, setAdminTokenss] = useState("")
     const[isUserSignIn , setIsUserSignIn] = useState(false);
     const[isUserSignup , setIsUserSignUp] = useState(false);
     const[isAdminSignIn , setIsAdminSignIn] = useState(false);
     const[isAdminSignup , setIsAdminignUp] = useState(false);

    return(
        <SignCardContext.Provider value={{userTokenss ,adminTokenss,isUserSignIn, isUserSignup,  isAdminSignup, isAdminSignIn,
                                          setUserTokenss, setAdminTokenss , setIsUserSignIn,setIsUserSignUp, setIsAdminSignIn,setIsAdminignUp}}>
          {Children}
        </SignCardContext.Provider>
    )

}
export const useSignCard = useContext(SignCardContext)



