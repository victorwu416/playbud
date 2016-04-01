Meteor.publishComposite('skills', function (bottomMonths) {
  if (!this.userId) {
    throw new Meteor.Error('not-logged-in', 'Must be logged in to access published skills');
  }
  check(bottomMonths, Match.Integer);
  return {
    find: function() {
      var childMonths = 8; // TODO: Get child's age dynamically, when we incorporate the sign up flow and user management.
      //TODO: Pass in some bottom range that is persisted with the child. This is helps so we don't have to go too far back when querying the db.
      // For now, assume the bottom range is the entire db.
      var selector = {months: {$gte: bottomMonths, $lte: childMonths+1}};
      var options = {
        sort: {months: -1, shortDescription: 1}
      };
      return Skills.find(selector, options);
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
