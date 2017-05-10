
import { ADD_BILL } from '../action_types/billings'

function billings(state = new Object(), action) {

  switch (action.type) {
    case ADD_BILL:
    	let key;

    	if(Object.keys(state).length !== 0) {
				key = Object.keys(state).length + 1;
    	} else {
    		key = 1;
    	}

			return Object.assign({}, state, {[key] : {value: action.value, amount: action.amount}})      		
      // return state.unshift({value: action.value, amount: action.amount})
    default:
      return state;
  }
}

export { billings };