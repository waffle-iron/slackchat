const stripe = require('stripe')('sk_test_pVGkF03rLEY4ZYketkrKUDoR');


module.exports = {

  addCustomer(email) {
    stripe.customers.create({
      email,
    }, (err, customer) => {
      console.log(err);
      console.log(customer);
    });
  },

  addSubscription() {
    stripe.subscriptions.create({
      customer: 'cus_Ahof2RQXSTYslj',
      plan: 'sc-free-plan',
    }, (err, subscription) => {
      console.log(err);
      console.log(subscription);
    });
  },

};
