const stripe = require('stripe')('sk_test_pVGkF03rLEY4ZYketkrKUDoR');



function _addSubscription(customerId) {
  return new Promise((resolve, reject) => {
    stripe.subscriptions.create({
      customer: customerId,
      plan: 'sc-free-plan',
    }, (err, subscription) => {
      if (err) { return reject(err); }
      resolve(subscription);
    });
  });
}

function addCustomer({ email }) {
  return new Promise((resolve, reject) => {
    stripe.customers.create({
      email,
    }, (createCustomerErr, customer) => {
      if (createCustomerErr) { return reject(createCustomerErr); }
      _addSubscription(customer.id).then((subscription) => {
        console.log(subscription);
        return resolve({
          stripeCustomerId: customer.id,
        });
      })
      .catch((addSubscriptionErr) => {
        reject(addSubscriptionErr);
      });
    });
  });
}

module.exports = { addCustomer };
