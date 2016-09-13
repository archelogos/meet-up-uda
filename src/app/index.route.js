(function() {
  'use strict';

  angular
  .module('meetUpUda')
  .config(routeConfig);

  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    // Enabe HTML5 Mode
    $locationProvider.html5Mode(true);

    // Default State
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('init', {
      url: '/',
      templateUrl: 'app/components/view/init/init.html',
      controller: 'InitController',
      controllerAs: 'vm',
      resolve: {
        user: function(Data){
          Data.notify('partialLoading');
          return Data.getUser();
        },
      },
    })
    .state('meeting', {
      url: '/meeting',
      abstract: true,
      template: '<ui-view/>',
      resolve: {
        user: function(Data){
          Data.notify('partialLoading');
          return Data.getUser();
        },
        meetings: function(Data, Meeting){
          if(angular.isDefined(Data.getMeetings())){
            return Data.getMeetings();
          }
          // Query from ngResource element
          var meetings = Meeting.query();
          // Set promise in Data Factory
          Data.setMeetings(meetings.$promise);
          // Retun factory method response
          return Data.getMeetings();
        },
      },
    })
    .state('meeting.list', {
      url: '/list',
      parent: 'meeting',
      templateUrl: 'app/components/view/meeting/meeting.list.html',
      controller: 'MeetingController',
      controllerAs: 'vm',
    })
    .state('meeting.add', {
      url: '/add',
      parent: 'meeting',
      templateUrl: 'app/components/view/meeting/meeting.add.html',
      controller: 'MeetingController',
      controllerAs: 'vm',
    })
    .state('about', {
      url: '/about',
      templateUrl: 'app/components/view/about/about.html',
      controller: 'AboutController',
      controllerAs: 'vm',
    })
  }

})();
