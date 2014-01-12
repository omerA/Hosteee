/**
 * Created by tomergab on 29/12/13.
 */
angular.module('mean.rooms').controller('RoomsController', ['$scope', '$routeParams', '$location', 'Global', 'Rooms', function ($scope, $routeParams, $location, Global, Rooms) {
    $scope.global = Global;

    $scope.create = function() {
        var room = new Rooms({
            title: this.title,
            content: this.content
        });
        room.$save(function(response) {
            $location.path("api/rooms/" + response._id);
        });

        this.title = "";
        this.content = "";
    };

    $scope.remove = function(room) {
        room.$remove();

        for (var i in $scope.rooms) {
            if ($scope.rooms[i] == room) {
                $scope.rooms.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var room = $scope.room;
        if (!room.updated) {
            room.updated = [];
        }
        room.updated.push(new Date().getTime());

        room.$update(function() {
            $location.path('rooms/' + room._id);
        });
    };

    $scope.find = function() {
        Rooms.query(function(rooms) {
            $scope.rooms = rooms;
        });
    };

    $scope.findOne = function() {
        Rooms.get({
            roomId: $routeParams.roomId
        }, function(room) {
            $scope.room = room;
        });
    };

    $scope.getAll = function() {
        $scope.rooms = Rooms.query()
    }
}]);