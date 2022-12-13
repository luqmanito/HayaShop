import {actionStrings} from './actionStrings';

const checkoutPayment = (body) => ({
    type: actionStrings.addPayment,
    payload: { body },
});

const paymentAction = {
    checkoutPayment,
};

export default paymentAction;