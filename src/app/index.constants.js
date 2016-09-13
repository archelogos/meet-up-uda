(function() {
  'use strict';

  angular
    .module('meetUpUda')
    .constant('APP_CONFIG',{
        'APP_NAME' : 'meetUpUda',
        'APP_VERSION' : '0.0.0',
        'APP_VERSION_NAME' : 'doughnut-insult',
        'LANGUAGES' : {
            'es-ES' : false,
            'en-EN' : true,
        },
        'DEBUG_MODE' : true,
        'ERROR_REPORT' : false,
        'API_URL': 'http://localhost:8080/'
    })

})();
