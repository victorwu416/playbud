angular
  .module('Playbud')
  .config(config)
  .run(run);

function run($rootScope, $state) {

    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      if( error  === 'not authorized' ){
          return $state.go( 'login' );
      }
    });
}

function config($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html',
      resolve: {
        currentUser: ($q) => {
          if (Meteor.userId() == null) {
            return $q.reject();
          }
          else {
            return $q.resolve();
          }
        }
      }
    })
    .state('tab.play', {
      url: '/play',
      views: {
        'tab-play': {
          templateUrl: 'client/templates/play.html',
          controller: 'PlayCtrl as play'
        }
      }
    })
    .state('tab.skill', {
      url: '/skills/:skillId',
      views: {
        'tab-play': {
          templateUrl: 'client/templates/skill.html',
          controller: 'SkillCtrl as skill'
        }
      }
    })
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'client/templates/account.html',
          controller: 'AccountCtrl as account'
        }
      }
    })
    .state('signup', {
      url: '/signup',
          templateUrl: 'client/templates/signup.html',
          controller: 'SignupCtrl as signup'
    })
    .state('login', {
      url: '/login',
          templateUrl: 'client/templates/login.html',
          controller: 'LoginCtrl as login'
    });


  // $urlRouterProvider.otherwise('tab/play');
  $urlRouterProvider.otherwise('login');
}
