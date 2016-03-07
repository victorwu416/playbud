angular
  .module('Playbud')
  .config(config);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html',
    })
    .state('tab.progress', {
      url: '/progress',
      views: {
        'tab-progress': {
          templateUrl: 'client/templates/progress.html',
          controller: 'ProgressCtrl as progress'
        }
      }
    })
    .state('tab.play-ideas', {
      url: '/play-ideas',
      views: {
        'tab-play-ideas': {
          templateUrl: 'client/templates/play-ideas.html',
          controller: 'PlayIdeasCtrl as playIdeas'
        }
      }
    })
    .state('tab.play-idea', {
      url: '/play-ideas/:skillId',
      views: {
        'tab-play-ideas': {
          templateUrl: 'client/templates/play-idea.html',
          controller: 'PlayIdeaCtrl as playIdea'
        }
      }
    })
    .state('tab.evaluate', {
      url: '/evaluate',
      views: {
        'tab-evaluate': {
          templateUrl: 'client/templates/evaluate.html',
          controller: 'EvaluateCtrl as evaluate'
        }
      }
    })
    .state('tab.playbud-account', {
      url: '/playbud-account',
      views: {
        'tab-playbud-account': {
          templateUrl: 'client/templates/playbud-account.html',
          controller: 'PlaybudAccountCtrl as playbudAccount'
        }
      }
    })
    .state('signup', {
      url: '/signup',
          templateUrl: 'client/templates/signup.html',
          controller: 'SignupCtrl as signup'
    });

  $urlRouterProvider.otherwise('tab/progress');
}
