const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware


// STATE

const initialState = {
    loading: false,
    users: [],
    error: ''
}

// ACTIONS

const FETCH_USERS_REQUEST ='FETCH_USERS_REQUEST'

const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'

const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

// ACTIONS CREATOR

const fetchUsersRequest = ()=>{
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users =>{
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error =>{
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}


// Action creator for API call

const fetchUsers = () =>{
    return function(dispatch){
        // this will set loading to true
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response =>{
                // response.data is the array of users
                const users = response.data.map( user => user.id)
                // the map function here will return each user with userID
                // and this will give all the property
                dispatch(fetchUsersSuccess(users))
            })
            .catch(error => {
                // error.message will give the error message
                dispatch(fetchUsersFailure(error.message))
            })
    }
}


// REDUCER FUNCTIONS

const reducer = (state = initialState, action) =>{
    console.log(action.type)
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading:true
            }
        
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users : action.payload,
                error : ''
            }
        
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
}


const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe( ()=> {console.log(store.getState())})

store.dispatch(fetchUsers())



