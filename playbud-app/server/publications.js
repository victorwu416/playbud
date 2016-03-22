Meteor.publish('parent', function () {
  if (!this.userId) {
    throw new Meteor.Error('not-logged-in', 'Must be logged in to publish parent');
  }
  return Parents.find({
    userId: this.userId
  });
});

Meteor.publishComposite('skills', function (limit) {
  if (!this.userId) {
    throw new Meteor.Error('not-logged-in', 'Must be logged in to access published skills');
  }
  check(limit, Match.Integer);
  return {
    find: function() {
      var childMonths = 8; // TODO: Get child's age dynamically
      var selector = {months: {$lte: childMonths}};
      var options = {
        sort: {months: -1, shortDescription: 1},
        limit: limit
      }  
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
//
//
// Meteor.publishComposite('skills', function (which, specificSkills) {
//   if (!this.userId) {
//     throw new Meteor.Error('not-logged-in', 'Must be logged in to publish skills');
//   }
//   check(which, String);
//   check(specificSkills, Array);
//   return {
//     find: function() {
//       var selector = {};
//       if (which === 'next') {
//         selector = {};
//       } else if (which === 'specific') {
//         var skillIds = _.map(specificSkills, function (skill) {
//           return skill._id;
//         });
//         selector = {_id: {$in: skillIds}}; // TODO: Logic to return skills only within the age range.
//       } else {
//         throw new Meteor.Error('invalid-which-argument', 'Invalid which argument, where which is: ' + which);
//       }
//       return Skills.find(selector, {limit: 5});
//     },
//     children: [
//       {
//         collectionName: "skillAnswers",
//         find: function (skill) {
//           return Answers.find({skillId: skill._id.valueOf()});
//         }
//       }
//     ]
//   };
// });
