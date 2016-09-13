(function() {
  'use strict';

  angular
    .module('meetUpUda')
    .controller('MeetingController', MeetingController);

  /** @ngInject */
  function MeetingController($timeout, $state, $mdBottomSheet, $mdDialog, $stateParams, Data, Utils, Meeting, User,
     user, meetings, Upload, APP_CONFIG) {

    var vm = this;
    Data.notify('initialResolved');
    Data.notify('partialResolved');

    vm.user = user;
    vm.meetings = meetings.items;
    vm.pageToken = meetings.nextPageToken;
    vm.newMeeting = {};
    vm.selectedMeeting = {};
    vm.status = 'ON_HOLD';

    /* Voting state */
    if($stateParams.id){
      vm.selectedMeeting = Utils.getById(vm.meetings, $stateParams.id);
      if(vm.selectedMeeting === null){
        vm.selectedMeeting = Meeting.get({meeting:$stateParams.id});
      }

    }

    vm.addMeeting = function (){
      vm.status = 'PROCESSING';

      Upload.upload({
        url: APP_CONFIG.API_URL + 'meeting',
        data: {file: vm.file, meeting: vm.newMeeting}
      }).then(function (meeting) {
        var user = vm.user;
        user.vote = true;
        user.meeting = meeting.data.id;
        User.update({user: vm.user.id}, user, function(){
          var meetings = Meeting.query();
          // Set promise in Data Factory
          Data.setMeetings(meetings.$promise);
          vm.status = 'SUCCESS';
          $state.go('results');
        });
      });

    };

    vm.addVote = function(){
      var user = vm.user;
      user.vote = true;
      user.meeting = vm.selectedMeeting.id;

      var meeting = vm.selectedMeeting;
      //++meeting.votes; //IN server side

      vm.status = 'PROCESSING';
      Meeting.update({meeting: vm.selectedMeeting.id}, meeting,
        function(){
          User.update({user: vm.user.id}, user, function(){
            var meetings = Meeting.query();
            // Set promise in Data Factory
            Data.setMeetings(meetings.$promise);
            vm.status = 'SUCCESS';
            $state.go('results');
          });
      });
    };

    vm.loadMoreMeetings = function(){
      var auxMeetings = Meeting.query({pageToken: vm.pageToken}, function(){
        angular.forEach(auxMeetings.items, function(meeting){
          vm.meetings.push(meeting);
        });
        vm.pageToken = auxMeetings.nextPageToken;
      });
    };




  }
})();
