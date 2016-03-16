Meteor.publish('parent', function() {
  if (!this.userId) {
    throw new Meteor.Error('not-logged-in', 'Must be logged in to publish parent');
  }
  return Parents.find({
    userId: this.userId
  });
});

Meteor.publishComposite('skills', function () {
  if (!this.userId) {
    throw new Meteor.Error('not-logged-in', 'Must be logged in to publish skills');
  }
  return {
    find: function() {
      return Skills.find({}, {limit: 3}); // TODO: Logic to return skills only within the age range.
    },
    children: [
      {
        collectionName: "skillAnswers",
        find: function (skill) {
          return Answers.find({skillId: skill._id.valueOf()});
        }
      }
    ]
  };
});
