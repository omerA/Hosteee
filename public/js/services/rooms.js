/**
 * Created by tomergab on 29/12/13.
 */
//Articles service used for articles REST endpoint
angular.module('mean.rooms').factory("Rooms", ['$resource', function($resource) {
    return $resource('rooms/:roomId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
