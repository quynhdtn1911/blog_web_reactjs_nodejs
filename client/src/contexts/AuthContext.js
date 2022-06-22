import {createContext, useReducer} from 'react';
import authReducer from '../reducers/authReducer';

export const AuthContext = createContext();


const ContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        isFetching: false,
        user: null,
        error: false
    });

    return <AuthContext.Provider value={{authState, dispatch}}>
        {children}
    </AuthContext.Provider>
}

export default ContextProvider;
