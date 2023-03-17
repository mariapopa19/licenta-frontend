import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const GeneralContext = createContext({});

const GeneralProvider = (props) => {
    const [token, setToken] = useState(null)

    const navigate = useNavigate()

    const logOut = async () => {
        localStorage.clear();
        setToken(null)
        navigate('/')
    }

    return(
        <GeneralContext.Provider value={{token, setToken, logOut}}>
            {props.children}
        </GeneralContext.Provider>
    )
}

export {GeneralContext, GeneralProvider}