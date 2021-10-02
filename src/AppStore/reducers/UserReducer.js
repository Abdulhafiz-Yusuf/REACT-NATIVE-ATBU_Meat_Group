// define types
import {
	LOGOUT,
	LOGIN,
	SIGNUP,
	ERROR,
	REFRESH,
	FETCH_ORDER_DATA,
	GET_CURRENT_USER,
} from '../actions/types'

export default function userReducer(state = {}, action) {
	switch (action.type) {
		case LOGIN:
			return action.payload.user
		case LOGOUT:
			return { ...state, user: null }
		case SIGNUP:
			return action.payload.newUser
		case GET_CURRENT_USER:
			return { ...state, user: action.payload }
		case ERROR:
			return { ...state, error: action.payload }
		case REFRESH:
			return { ...state, refreshing: action.payload }
		case FETCH_ORDER_DATA:
			return { ...state, orderData: action.payload }

		default:
			return state
	}
}
