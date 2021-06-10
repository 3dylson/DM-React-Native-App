import { USERS_DATA_STATE_CHANGE, USER_ORDERS_STATE_CHANGE, CLEAR_DATA  } from "../constants"

const initialState = {
    users: [],
    feed: [],

}

export const users = (state = initialState, action) => {
    switch (action.type) {
        case USERS_DATA_STATE_CHANGE:
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case USER_ORDERS_STATE_CHANGE:
            return {
                ...state,
                feed: [state.feed, ...action.orders]
            }
        case CLEAR_DATA:
            return initialState
        default:
            return state;
    }
}