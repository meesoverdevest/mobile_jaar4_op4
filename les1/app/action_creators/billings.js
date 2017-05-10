
import { ADD_BILL } from '../action_types/billings'

export const add_new_bill = (value, amount) => ({
	type: ADD_BILL,
	value: value,
	amount: amount	
})