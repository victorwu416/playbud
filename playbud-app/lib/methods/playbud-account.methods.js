Meteor.methods({
  createPlaybudAccount(email, password, childName, childBirthdate) {
    check(email, String);
    check(password, String);
    check(childName, String);
    check(childBirthdate, Date);
    Accounts.createUser({
      email: email,
      password: password,
      profile: {
        childName: childName,
        childBirthdate: childBirthdate,
        haveToy: false
      }
    });
  },
  updateHaveToy(haveToy) {
    check(haveToy, Boolean);
    Meteor.users.update( {_id: Meteor.userId()}, {$set: {'profile.haveToy': haveToy}});
  }
});
