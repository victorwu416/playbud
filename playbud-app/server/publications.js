Meteor.publish('users', function () {
  return Meteor.users.find({}, { fields: { parent: 1 } });
});

Meteor.publish('appropriateSkills', function () {
  if (!this.userId) {
    return;
  }
  // TODO: Logic to publish only appropriateSkills for this Playbud child
  return Skills.find({});
});
