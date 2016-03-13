import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import RSVP from 'rsvp';
import { createAction, handleAction } from 'redux-actions';

const reducer = handleAction('TEST_ASYNC', (state = {}, action) => (
  Object.assign({}, state, { payload: action.payload })
));

const store = createStore(reducer, applyMiddleware(promiseMiddleware));

const promise = new RSVP.Promise((resolve, reject) => {
    const rand = Math.ceil((Math.random() * 10) + 1);
    console.log(rand);
    if (rand % 2 === 0) {
      setTimeout(() => {
        resolve("resolved");
      }, 1000);
    } else {
      reject("rejected");
    }
  });

const action = createAction('TEST_ASYNC');

const dispatchResult = store.dispatch(action(promise));

console.dir(dispatchResult);

dispatchResult.then((result) => {
  if(result.error) {
    console.log(`Promise was rejected with payload: ${result.payload}`)
  } else {
    console.log(`Promise was resolved with payload: ${result.payload}`)
  }
});
