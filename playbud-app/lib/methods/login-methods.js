Meteor.methods({
  isUserProfileCompleted() {

    if (Meteor.user()) {
      return Meteor.user().profile.childLastName &&
             Meteor.user().profile.childFirstName &&
             Meteor.user().profile.childAge;
    }
    else {
      return false;
    }
  }
});
