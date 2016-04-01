angular
  .module('Playbud')
  .config(config);
  // .run(run);


  // function run($rootScope, $state) {
  //
  //     $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
  //       if( error  === 'not authorized' ){
  //           return $state.go( 'login' );
  //       }
  //     });
  // }

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('first', {
      url: '/first',
        templateUrl: 'client/templates/first.html',
        controller: 'FirstCtrl as first'
    })
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html'
      // resolve: {
      //   currentUser: ($q) => {
      //     if (Meteor.userId() == null) {
      //       return $q.reject();
      //     }
      //     else {
      //       return $q.resolve();
      //     }
      //   }
      // }
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
    .state('tab.playbud-account', {
      url: '/playbud-account/:loggedOutSection',
      views: {
        'tab-playbud-account': {
          templateUrl: 'client/templates/playbud-account.html',
          controller: 'PlaybudAccountCtrl as playbudAccount'
        }
      }
    });

  $urlRouterProvider.otherwise(function ($injector, $location) {
    if (Meteor.user()) {
      console.log('logggggeeeeddd in!!!!!!!!!');
      return 'tab/play';
    } else {
      console.log('logggggeeeeddd out!!!!!!!!!');
      return 'first';
    }
  });
  //
  // if (Meteor.user()) {
  //   console.log('logged in!!!!');
  //   $urlRouterProvider.otherwise('tab/play');
  // } else {
  //   $urlRouterProvider.otherwise('first');
  // }
}
