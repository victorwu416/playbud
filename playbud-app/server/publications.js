Meteor.publishComposite('skills', function (bottomMonths, ephemeralUserId) {
  check(bottomMonths, Match.Integer);
  check(ephemeralUserId, String);
  return {
    find: function() {
      var userId = this.userId ? this.userId : ephemeralUserId;
      var user = Meteor.users.findOne({_id: userId});
      if (!user) {
        throw new Meteor.Error('publishComposite-skills', 'Error finding a user when publishing skills');
      }

      var childMonths = moment().diff(user.profile.childBirthdate, 'months');
      var childMonthsInitial = moment(user.profile.created).diff(user.profile.childBirthdate, 'months');

      console.log(childMonths);
      console.log(childMonthsInitial);

      var selector = {months: {$gte: childMonthsInitial, $lte: childMonths+1}};
      var options = {
        sort: {months: -1, shortDescription: 1}
      };
      return Skills.find(selector, options);
    },
    children: [
      {
        collectionName: "skillAnswers",
        find: function (skill) {
          var userId = this.userId ? this.userId : ephemeralUserId;
          return Answers.find({$and: [{userId: userId}, {skillId: skill._id.valueOf()}]});
        }
      }
    ]
  };
});
