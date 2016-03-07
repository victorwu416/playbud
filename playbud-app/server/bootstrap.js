Meteor.startup(function () {
  Skills.remove({});

  var skill;

  skill = {
     shortDescription: 'Build a tower',
     longDescription: 'Build a tower with this and that',
     imageUrl: '/image1.png'
  }
  Skills.insert(skill);

  skill = {
     shortDescription: 'Knock down tower',
     longDescription: 'Run up to the tower and kick it down',
     imageUrl: '/image2.png'
  }
  Skills.insert(skill);

  skill = {
     shortDescription: 'Pass cups',
     longDescription: 'Pass cups from one hand to the other',
     imageUrl: '/image3.png'
  }
  Skills.insert(skill);

  skill = {
     shortDescription: 'Look around',
     longDescription: 'Look around up and down',
     imageUrl: '/image1.png'
  }
  Skills.insert(skill);

  skill = {
     shortDescription: 'Sing aloud',
     longDescription: 'Sing aloud with ABCs',
     imageUrl: '/image2.png'
  }
  Skills.insert(skill);

});
