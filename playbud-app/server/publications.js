Meteor.publish('parent', function() {
  if (!this.userId) {
    throw new Meteor.Error('not-logged-in', 'Must be logged in to publish parent');
  }
  return Parents.find({
    userId: this.userId
  });
});

Meteor.publishComposite('skills', function(which, specificSkills) {
  if (!this.userId) {
    throw new Meteor.Error('not-logged-in', 'Must be logged in to publish next skills');
  }
  check(which, String);
  check(specificSkills, Array);
  return {
    find: function() {
      if (which === 'next') {
        return Skills.find({}, {limit: 3}); // TODO: Logic to return skills only within the age range.
      } else if (which === 'specific'){
        var skillIds = _.map(specificSkills, function (skill) {
          return skill._id;
        });
        return Skills.find({_id: {$in: skillIds}});
      } else {
        throw new Meteor.Error('invalid-argument', 'which argument is invalid, where which is: ' + which);
      }
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
