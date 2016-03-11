Meteor.publish('parent', function () {
  if (!this.userId) {
    throw new Meteor.Error('not-logged-in', 'Must be logged in to publish parent');
  }
  return Parents.find({userId: this.userId});
});

Meteor.publish('nextSkills', function () {
  if (!this.userId) {
    throw new Meteor.Error('not-logged-in', 'Must be logged in to publish next skills');
  }

  var user = Meteor.users.findOne(this.userId);
  console.log(user);
  var childDateOfBirth = moment(user.parent.childDateOfBirth);
  console.log(childDateOfBirth);

  return Skills.find({}); // TODO: Logic to return next valid skills for this user.
});
