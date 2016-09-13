(function() {
  'use strict';

  angular
    .module('meetUpUda')
    .factory('Meeting', Meeting);

    /**
    * Database connection for Meeting
    * @TODO Need security Layer on top
    */

    /** @ngInject */
    function Meeting(APP_CONFIG, $resource){

      return $resource(APP_CONFIG.API_URL+'meeting/:meeting', {meeting:'@id'}, {
        update: {
          method: 'PUT', // this method issues a PUT request
        },
        query:{
          method: 'GET',
          isArray: false,
        },
        cache: true,
      });

    }

})();
