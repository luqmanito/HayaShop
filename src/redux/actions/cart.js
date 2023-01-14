
import {actionStrings} from './actionStrings';


const payment = (body) => ({
    type: actionStrings.cartSubsctract,
    payload: { body },
});

const paymentAction = {
    payment,
};

export default paymentAction;