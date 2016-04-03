angular
  .module('Playbud')
  .service('SkillsTransform', SkillsTransform);

function SkillsTransform() {
  var _instance = this;

  _instance.nextSkills = function (skillsCollection, skillAnswersCollection) {
    var options = {
      sort: {months: 1, shortDescription: 1},
    };
    var nextSkills = _.filter(skillsCollection.find({}, options).fetch(), function (skill) {
      if (
        (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() < 2) &&
        (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'skip'}).count() < 1)
      ) {
        return _skillWithDisplayFields(skill, skillAnswersCollection);
      }
    });
    if (nextSkills.length > 3) {
      nextSkills = nextSkills.slice(0, 3);
    }
    return nextSkills;
  }

  _instance.doneSkills = function (skillsCollection, skillAnswersCollection) {
    var options = {
      sort: {months: -1, shortDescription: 1},
    };
    var doneSkills = _.filter(skillsCollection.find({}, options).fetch(), function (skill) {
      if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() >= 2) {
        return _skillWithDisplayFields(skill, skillAnswersCollection);
      }
      if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'skip'}).count() >= 1) {
        return _skillWithDisplayFields(skill, skillAnswersCollection);
      }
    });
    return doneSkills;
  }

  _instance.skillWithDisplayFields = function (skillsCollection, skillId, skillAnswersCollection) {
    return _skillWithDisplayFields(skillsCollection.findOne(new Meteor.Collection.ObjectID(skillId)), skillAnswersCollection);
  }

  function _skillWithDisplayFields(skill, skillAnswersCollection) {
    return _skillWithNewestAnswerDateFormatted(_skillWithState(skill, skillAnswersCollection), skillAnswersCollection);
  }

  function _skillWithState(skill, skillAnswersCollection) {
    if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() >= 2) {
      skill.state = 'passed';
    } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'skip'}).count() >= 1) {
      skill.state = 'skipped';
    } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() === 1) {
      skill.state = 'getting-there';
    } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'with-difficulty'}).count() >= 1) {
      skill.state = 'getting-there';
    } else if (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'unable'}).count() >= 1) {
      skill.state = 'tried';
    } else {
      skill.state = 'not-started';
    }
    return skill;
  }

  function _skillWithNewestAnswerDateFormatted(skill, skillAnswersCollection) {
    var selector = {skillId: skill._id.valueOf()};
    var options = {sort: {created: -1}};
    var sortedAnswers = skillAnswersCollection.find(selector, options).fetch();
    if (sortedAnswers.length > 0) {
      skill.newestAnswerDateFormatted = moment(sortedAnswers[0].created).format('MMM D');
    } else {
      skill.newestAnswerDateFormatted = '';
    }
    return skill;
  }
}
