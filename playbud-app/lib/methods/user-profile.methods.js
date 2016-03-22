Meteor.methods({
  updateUserProfile(childFirstName, childLastName, childAge, childGender) {
console.log(Meteor.userId());
    if (Meteor.userId() !== undefined) {

      var childData = {
        firstName: childFirstName,
        lastName: childLastName,
        age: childAge,
        gender: childGender

      };
      console.log(childData);

      Meteor.users.update(Meteor.userId(), {$set: {"profile.child": childData}});
    }
  }
});
