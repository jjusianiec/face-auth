angular.module('myApp.view1', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl',
    });
  }])
  .controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {
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
      hiddenCanvas.width = video.width;
      hiddenCanvas.height = video.height;
      const ctx = hiddenCanvas.getContext('2d');
      ctx.drawImage(video, 0, 0, video.width, video.height);
      $http.post('/login', { image: hiddenCanvas.toDataURL() })
        .then((data) => {

        }).catch((err) => {

        });
      return ctx.getImageData(x, y, w, h);
    };
  }]);
