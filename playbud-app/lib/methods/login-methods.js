Meteor.methods({
  isUserProfileCompleted() {

    if (Meteor.user()) {
      return Meteor.user().profile.child.LastName &&
             Meteor.user().profile.child.FirstName &&
             Meteor.user().profile.child.Age &&
             Meteor.user().profile.child.Gender;
    }
    else {
      return false;
    }
  }
});
