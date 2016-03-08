Meteor.publish('currentUser', function () {
  if (!this.userId) {
    throw new Meteor.Error('not-logged-in', 'Must be logged in to publish current user');
  }
  return Meteor.users.find({_id: this.userId}, { fields: { parent: 1 } });
});

Meteor.publish('nextSkills', function () {
  if (!this.userId) {
    throw new Meteor.Error('not-logged-in', 'Must be logged in to publish next skills');
  }
  return Skills.find({}); // TODO: Logic to return next valid skills for this user.
});
