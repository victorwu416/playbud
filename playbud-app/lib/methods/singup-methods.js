Meteor.methods({
  createUserAccount(email, password) {
    if (!Meteor.userId()) {
      Accounts.createUser({
            email: email,
            password: password,
            profile: {
                child: {
                  firstName: null,
                  lastName: null,
                  age: null,
                  gender: null
                }
            }
        });
    }
  },
  isEmailFound(email) {
    var user = Meteor.users.findOne({"emails.address": email});
    return user !== undefined;
  }
});
