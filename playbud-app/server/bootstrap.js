Meteor.startup(function () {
  Skills.remove({});

  var skill;

  skill = {
     shortDescription: 'Build a tower',
     longDescription: 'Build a tower with this and that',
     question: 'This is the question text for skill 1',
     imageUrl: '/image1.png'
  }
  Skills.insert(skill);

  skill = {
     shortDescription: 'Knock down tower',
     longDescription: 'Run up to the tower and kick it down',
     question: 'This is the question text for skill 2',
     imageUrl: '/image2.png'
  }
  Skills.insert(skill);

  skill = {
     shortDescription: 'Pass cups',
     longDescription: 'Pass cups from one hand to the other',
     question: 'This is the question text for skill 3',
     imageUrl: '/image3.png'
  }
  Skills.insert(skill);

  skill = {
     shortDescription: 'Look around',
     longDescription: 'Look around up and down',
     question: 'This is the question text for skill 4',
     imageUrl: '/image1.png'
  }
  Skills.insert(skill);

  skill = {
     shortDescription: 'Sing aloud',
     longDescription: 'Sing aloud with ABCs',
     question: 'This is the question text for skill 5',
     imageUrl: '/image2.png'
  }
  Skills.insert(skill);

});
