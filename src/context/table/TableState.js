import { useContext, useReducer } from "react"
import TableContext from "./TableContext"
import { FETCH_USER, FETCH_USERS, DELETE_USER, SORT_ASC_NAME, SORT_DSC_NAME, SORT_ASC_EMAIL, SORT_DSC_EMAIL, SORT_NONE_EMAIL, SORT_NONE_NAME, REMOVE_USER, UPDATE_ROWS } from "../types";
import axios from "axios";

export const useTable = () => {
    const {state, dispatch} = useContext(TableContext);
    return [state, dispatch];
}

export const fetchUsers = async (dispatch) => {
	const res = await axios("https://jsonplaceholder.typicode.com/users");
	dispatch({
		type: FETCH_USERS,
		payload: res.data
	})
}
export const fetchUser = async (dispatch, id) => {
	const res = await axios(`https://jsonplaceholder.typicode.com/users/${id}`);
	dispatch({
		type: FETCH_USER,
		payload: res.data
	})
}

const tableReducer = (state, action) => {
	switch(action.type) {
		case FETCH_USERS: 
			return	{
				...state,
				users: action.payload,
				defUsers: action.payload,
				entries: action.payload.length,
				loading: false,
			}
		case FETCH_USER: 
			return	{
				...state,
				user: action.payload
			}
		case REMOVE_USER: 
			return	{
				...state,
				user: null
			}
		case DELETE_USER: 
			return	{
				...state,
				users: state.users.filter((item) => item.id !== action.payload)
			}
		case UPDATE_ROWS: 
			return {
				...state,
				entries: action.payload
			}
		case SORT_ASC_NAME: {
			state.users.sort((a, b) => a.name>b.name?1:-1);
			return	{
				...state,
				sort: {
					name: 1,
					email: 0
				}
			};
		}
		case SORT_DSC_NAME: {
			state.users.sort((a, b) => a.name>b.name?-1:1);
			return	{
				...state,
				sort: {
					name: 2,
					email: 0
				}
			};
		}
		case SORT_ASC_EMAIL: {
			state.users.sort((a, b) => a.email>b.email?1:-1);
			return	{
				...state,
				sort: {
					name: 0,
					email: 1
				}
			};
		}
		case SORT_DSC_EMAIL: {
			state.users.sort((a, b) => a.email>b.email?-1:1);
			return	{
				...state,
				sort: {
					name: 0,
					email: 2
				},
			};
		}
		case SORT_NONE_NAME: 
		case SORT_NONE_EMAIL: {
			state.users.sort((a, b) => a.id-b.id);
			return	{
				...state,
				sort: {
					name: 0,
					email: 0,
				},
			};
		}
		default: {
			throw new Error(`${action.type} Not Found!!`);
		}
	}
}


const TableState = (props) => {
    const intitalState = {
        users: null,
        user: null,
        loading: true,
		entries: null,
		sort: {
			name: 0,
			email: 0
		}
    }

	const [state, dispatch] = useReducer(tableReducer, intitalState);

	return (
		<TableContext.Provider value={{ state: state, dispatch }}>
			{props.children}
		</TableContext.Provider>
	  );
}

export default TableState;