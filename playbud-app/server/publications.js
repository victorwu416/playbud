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
  return Skills.find({}, {limit: 3}); // TODO: Logic to return next valid skills for this user.
});
