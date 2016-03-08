Meteor.publish('currentUser', function () {
  if (!this.userId) {
    return null;
  }
  return Meteor.users.find({_id: this.userId}, { fields: { parent: 1 } });
});

Meteor.publish('nextSkills', function () {
  if (!this.userId) {
    return null;
  }
  return Skills.find({});
});
