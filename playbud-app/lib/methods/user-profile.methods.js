Meteor.methods({
  updateUserProfile(childFirstName, childLastName, childAge, childGender) {

    if (Meteor.userId() !== undefined) {

      var childData = {
        firstName: childFirstName,
        lastName: childLastName,
        age: childAge,
        gender: childGender

      };
      
      Meteor.users.update(Meteor.userId(), {$set: {"profile.child": childData}});
    }
  }
});
