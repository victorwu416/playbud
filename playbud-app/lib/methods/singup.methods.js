Meteor.methods({
  createUserAccount(email, password) {
    if (!Meteor.userId()) {
      Accounts.createUser({
            email: email,
            password: password,
            profile: {
                user: {
                  firstName:null,
                  lastName:null
                },
                child: {
                  firstName: null,
                  lastName: null,
                  birthday: null,
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
