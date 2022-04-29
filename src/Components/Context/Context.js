import { useEffect } from 'react';
import { createContext, useReducer} from 'react';
import Reducer from './Reducer';


const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("details")) || null ,
    userType: localStorage.getItem("userType"),
    userId:localStorage.getItem("userId"),
    isFetching:false,
    error:false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({children}) => {
     const [ state, dispatch ] = useReducer(Reducer,INITIAL_STATE);

     useEffect(() => {

        localStorage.setItem("details",JSON.stringify(state.user))

     },[state.user,state.userType,state.userId])

     return (
         <Context.Provider
         value={{
             user:state.user,
             userType:state.userType,
             isFetching:state.isFetching,
             userId:state.userId,
             error:state.error,
             dispatch
         }}>
             {children}
             </Context.Provider>
     )
}