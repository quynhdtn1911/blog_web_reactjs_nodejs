const authReducer = (state, action) => {
    return {
        ...state,
        ...action.payload
    }
}

export default authReducer;