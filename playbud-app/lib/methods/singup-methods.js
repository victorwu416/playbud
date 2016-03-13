Meteor.methods({
  createUserAccount(email, password) {
    if (!this.userId) {
      Accounts.createUser({
            email: email,
            password: password,
            profile: {
              childFirstName: null,
              childLastName: null,
              childAge: null,
              childGender: null
            }
        });
    }
  },
  isEmailFound(email) {
    var user = Meteor.users.findOne({"emails.address": email});
    return user !== undefined;
  },
});
