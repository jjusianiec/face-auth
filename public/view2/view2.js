angular.module('myApp.view2', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
      templateUrl: 'view2/view2.html',
      controller: 'View2Ctrl',
    });
  }])

  .controller('View2Ctrl', ['$scope', '$http', function ($scope, $http) {
    let video = null;

    $scope.onError = function (err) {

    };
    $scope.onStream = function (stream) {

    };
    $scope.onSuccess = function () {
      video = $scope.channel.video;
    };

    $scope.channel = {
      // the fields below are all optional
      videoHeight: 800,
      videoWidth: 600,
      video: null, // Will reference the video element on success
    };

    $scope.getVideoData = function (x, y, w, h) {
      const hiddenCanvas = document.createElement('canvas');
      hiddenCanvas.width = $scope.channel.video.width;
      hiddenCanvas.height = $scope.channel.video.height;
      const ctx = hiddenCanvas.getContext('2d');
      ctx.drawImage(
        $scope.channel.video, 0, 0, $scope.channel.video.width,
        $scope.channel.video.height,
      );
      $http.post('/register', {
        image: hiddenCanvas.toDataURL(),
        name: $scope.userName,
      })
        .then((data) => {

        }).catch((err) => {

        });
      return ctx.getImageData(x, y, w, h);
    };
  }]);
