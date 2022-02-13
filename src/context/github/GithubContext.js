import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initalState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initalState);

  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await res.json();
    console.log(items);

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // get 1 user
  const getUser = async (login) => {
    setLoading();
    const res = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (res.status === 404) {
      // window.location = '/notfound'
    } else {
      const data = await res.json();
      console.log(data);

      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  // get 1 user
  const getRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    })

    const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (res.status === 404) {
      // window.location = '/notfound'
    } else {
      const data = await res.json();
      console.log(data);

      dispatch({
        type: "GET_REPOS",
        payload: data,
      });
    }
  };

  //   set loading
  const setLoading = () => {
    console.log("in loading");
    dispatch({ type: "SET_LOADING" });
  };

  const clearUsers = () => {
    dispatch({ type: "CLEAR_USERS" });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getRepos
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
