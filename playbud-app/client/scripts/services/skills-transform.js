angular
  .module('Playbud')
  .service('SkillsTransform', SkillsTransform);

function SkillsTransform() {
  var _instance = this;

  _instance.nextSkills = function (skillsCollection, skillAnswersCollection) {
    var nextSkills = _.filter(skillsCollection.find(_skillsSelector(), _skillsOptions()).fetch(), function (skill) {
      if (
        (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() < 2) &&
        (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'skip'}).count() < 1)
      ) {
        return _skillWithDisplayFields(skill, skillAnswersCollection);
      }
    });
    if (nextSkills.length > 5) {
      nextSkills = nextSkills.slice(0, 5);
    }
    return nextSkills;
  }

  _instance.doneSkills = function (skillsCollection, skillAnswersCollection) {
    var doneSkills = _.filter(skillsCollection.find(_skillsSelector(), _skillsOptionsReverseSort()).fetch(), function (skill) {
      if (
        (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'easily'}).count() >= 2) ||
        (skillAnswersCollection.find({skillId: skill._id.valueOf(), value:'skip'}).count() >= 1)
      ) {
        return _skillWithDisplayFields(skill, skillAnswersCollection);
      }
    });
    return doneSkills;
  }

  _instance.skillWithDisplayFields = function (skillsCollection, skillId, skillAnswersCollection) {
    return _skillWithDisplayFields(
      skillsCollection.findOne(new Meteor.Collection.ObjectID(skillId)),
      skillAnswersCollection
    );
  }

  function _skillsSelector() {
    var selector = {};
    if (
      (!Meteor.user()) ||
      (Meteor.user() && !Meteor.user().profile.haveToy)
    ) {
      selector.requiresToy = false;
    }
    return selector;
  }

  function _skillsOptions() {
    var options = {
      sort: {
        months: 1,
        longDescription: 1,
        shortDescription: 1
      }
    };
    return options;
  }

  function _skillsOptionsReverseSort() {
    var options = {
      sort: {
        months: -1,
        longDescription: 1,
        shortDescription: 1
      }
    };
    return options;
  }

  function _skillWithDisplayFields(skill, skillAnswersCollection) {
    var skill = _skillWithState(skill, skillAnswersCollection);
    skill = _skillWithNewestAnswerDateFormatted(skill, skillAnswersCollection);
    skill = _skillWithDelayed(skill);
    return skill;
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
    var selector = {
      skillId: skill._id.valueOf()
    };
    var options = {
      sort: {
        created: -1
      }
    };
    var sortedAnswers = skillAnswersCollection.find(selector, options).fetch();
    if (sortedAnswers.length > 0) {
      skill.newestAnswerDateFormatted = moment(sortedAnswers[0].created).format('MMM D');
    } else {
      skill.newestAnswerDateFormatted = '';
    }
    return skill;
  }

  function _skillWithDelayed(skill) {
    skill.delayed = false;
    if (Meteor.user()) {
      var childMonths = moment().diff(Meteor.user().profile.childBirthdate, 'months');
      var monthsDiff = childMonths - skill.months;
      if (childMonths < 12 && monthsDiff >= 1) {
        skill.delayed = true;
      } else if (childMonths >= 12 && monthsDiff >= 2) {
        skill.delayed = true;
      }
    }
    return skill;
  }
}
