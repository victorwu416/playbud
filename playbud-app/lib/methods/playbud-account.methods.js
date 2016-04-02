if (Meteor.isServer) {
Meteor.methods({
  createPlaybudAccount(email, password, childName, childBirthdate) {
    check(email, String);
    check(password, String);
    check(childName, String);
    check(childBirthdate, Date);
    var userId = Accounts.createUser({
      email: email,
      password: password,
      profile: {
        childName: childName,
        childBirthdate: childBirthdate,
        haveToy: false
      }
    });
    return userId;
  },
  updateHaveToy(haveToy) {
    check(haveToy, Boolean);
    if (!Meteor.user()) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to update have toy');
    }
    Meteor.users.update(
      {_id: Meteor.userId()},
      {$set: {'profile.haveToy': haveToy}}
    );
  }
});
}
