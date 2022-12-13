import {actionStrings} from './actionStrings';

const checkoutItem = (body) => ({
    type: actionStrings.checkoutItem,
    payload: { body },
});

const checkoutAction = {
    checkoutItem,
};

export default checkoutAction;