export const STARTED_REGISTER = () => {
    return {
        payload: {
            isFetching: true,
            user: null,
            error: false
        }
    }
}

export const SUCCESS_REGISTER = () => {
    return {
        payload: {
            isFetching: false,
            user: null,
            error: false
        }
    }
}

export const FAILURE_REGISTER = (err) => {
    return {
        payload: {
            isFetching: false,
            user: null,
            error: err
        }
    }
}

export const STARTED_LOGIN = () => {
    return {
        payload: {
            isFetching: true,
            user: null,
            error: false
        }
    }
}

export const SUCCESS_LOGIN = (payload) => {
    return {
        payload: {
            isFetching: false,
            user: payload,
            error: false
        }
    }
}

export const FAILURE_LOGIN = (err) => {
    return {
        payload: {
            isFetching: false,
            user: null,
            error: err
        }
    }
}

export const LOGOUT = () => {
    return {
        payload: {
            isFetching: false,
            user: null,
            error: false
        }
    }
}

export const INIT_STATE = () => {
    return {
        payload: {
            isFetching: false,
            user: null,
            error: false
        }
    }
}

