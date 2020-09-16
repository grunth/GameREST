var myApp = angular.module('myApp', ['ngStomp', 'ngWebSocket'])
        // .factory('MyData', function ($websocket) {
        //     var dataStream = $websocket('http://127.0.0.1:15670');
        //
        //     var collection = [];
        //
        //     dataStream.onMessage(function(message) {
        //         collection.push(JSON.parse(message.data));
        //     });
        //
        //     var methods = {
        //         collection: collection,
        //         get: function() {
        //             dataStream.send(JSON.stringify({ action: 'get' }));
        //         }
        //     };
        //
        //     return methods;
        //
        // })
.controller("GeneralController", function ($scope, $http, $interval, $stomp, $log /*, MyData*/) {

    // $stomp.setDebug(function (args) {
    //     $log.debug(args)
    // })
    //
    // var url = "ws://localhost:15674/ws";
    // var client = $stomp.client(url);
    //
    // var on_connect = function() {
    //     console.log('connected');
    // };
    // var on_error =  function() {
    //     console.log('error');
    // };
    // client.connect('guest', 'guest', on_connect, on_error, '/');

    //$scope.MyData = MyData;

    $scope.Timer = null;

    $scope.StartTimer = function () {
        //Set the Timer start message.
        $scope.Message = "Timer started. ";

        //Initialize the Timer to run every 1000 milliseconds i.e. one second.
        $scope.Timer = $interval(function () {

            $http({
                method : 'GET',
                url : 'ball'
            }).then(
                (response) =>   {
                    // (1) prepare to moving: make absolute and on top by z-index
                    ball.style.position = 'absolute';
                    ball.style.zIndex = 1000;

                    // move it out of any current parents directly into body
                    // to make it positioned relative to the body
                    document.body.append(ball);

                    // centers the ball at (pageX, pageY) coordinates
                    function moveAt(pageX, pageY) {
                        ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
                        ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
                    }

                    // move our absolutely positioned ball under the pointer
                    moveAt(response.data.pageX, response.data.pageY);


                },
                (e) => {console.log(response.statusText);}
            );

        }, 1);
    };

    $scope.StartTimer();


    //$interval(updateXYFromServer(),10000);

    ball.onmousedown = function(event) {
        // (1) prepare to moving: make absolute and on top by z-index
        ball.style.position = 'absolute';
        ball.style.zIndex = 1000;

        // move it out of any current parents directly into body
        // to make it positioned relative to the body
        document.body.append(ball);

        // centers the ball at (pageX, pageY) coordinates
        function moveAt(pageX, pageY) {
            ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
            ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
        }

        // move our absolutely positioned ball under the pointer
        moveAt(event.pageX, event.pageY);

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            _refreshCoordinates(event.pageX, event.pageY);
        }

        function _refreshCoordinates(pageX, pageY) {
            // console.log("pageX " + pageX);
            // console.log("pageY " + pageY);
             $http({
                 method : 'PUT',
                 url : 'ball/' + pageX + '/' + pageY,
                 data: {"pageX" : pageX, "pageY" : pageY}
             }).then((response) => {return response.data;},
                 (e) => {console.log(e);}
             );
        }

        // (2) move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // (3) drop the ball, remove unneeded handlers
        ball.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            ball.onmouseup = null;
        };

    };

    ball.ondragstart = function() {
        return false;
    };

})

;