// importing the redux
const redux = require('redux');
// importing the redux-logger
const reduxLogger = require('redux-logger');
// creating the store
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = reduxLogger.applyMiddleware
const logger = reduxLogger.createLogger();

// Indicating the type of the action
// action is an object
const BUY_CAKE = 'BUY_CAKE'; //avoid spelling mistakes when using the action
const BUY_ICECREAM = 'BUY_ICECREAM';



// action creator simply create an action

// ACTIONS
function buyCake() {
    // it will return the action object
    return {
        type:BUY_CAKE,
        info:'first redux option'
    }
    
}


// action creator for ICECREAM 
function buyIceCream(){
    return {
        type: BUY_ICECREAM
    }
}

// initializing the state for reducer
// and by first principle of redux, the state must be an object

const initialCakeState = {
    numOfCakes:10,
   
}

const initialIceCreamState = {
    numOfIceCreams:20
}

// REDUCER FUNCTION


// if we have so many products to sell then managing everything inside one reducer is cumbersome
// that's why we need to split the reducer and the state.

const cakeReducer = (state = initialCakeState, action) =>{
    // we will return the newState on the basis of current state and action
    switch(action.type){
        case BUY_CAKE : return {
            ...state, //first copy the state object and if there were another property then the object 
            // will remain unchanged
            numOfCakes : state.numOfCakes-1
        }

        // here we are not mutating the state object, we are just return the newState object
        // if no action is being taken
        default: return state;
    }   
}

const iceCreamReducer = (state = initialIceCreamState, action) =>{
    // we will return the newState on the basis of current state and action
    switch(action.type){
        case BUY_ICECREAM : return {
            ...state, //first copy the state object and if there were another property then the object 
            // will remain unchanged
            numOfIceCreams : state.numOfIceCreams-1
        }
        // here we are not mutating the state object, we are just return the newState object
        // if no action is being taken
        default: return state;
    }   
}

// combineReducers function takes object as an argument and
// by convention we name it as rootReducer

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
});
 
 

// we can provide as much as middle required by the application as an argument 
// inside applyMiddleware
const store = createStore(rootReducer, applyMiddleware(logger));
console.log('initialState', store.getState());

const unsubscribe = store.subscribe(() => {});
// it will log any update that is hapening in the state
// const unsubscribe = store.subscribe(() => console.log('updated state', store.getState()));

// Updation of the state
store.dispatch(buyCake());
// we can also pass the object to the dispatch method as a parameter
// but action creator is more preferable otherwise we have to define the object at every dispatch method
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();


















