import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initalState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initalState)

    const searchUsers = async (text) => {
        setLoading()
        const params = new URLSearchParams({
          q: text
        })
        const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        });
        const {items} = await res.json();
        console.log(items)

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
      };

    //   set loading
    const setLoading = () =>{
      console.log('in loading')
      dispatch({type:'SET_LOADING'})
    } 

      return <GithubContext.Provider value={{
          users: state.users,
          loading: state.loading,
          searchUsers
      }}>
          {children}
      </GithubContext.Provider>


}

export default GithubContext