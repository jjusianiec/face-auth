angular.module('myApp.view1', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl',
    });
  }])
  .controller('View1Ctrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
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

    $scope.goToRegister = function () {
      $location.path('/view2');
    };

    $scope.getVideoData = function (x, y, w, h) {
      const hiddenCanvas = document.createElement('canvas');
      hiddenCanvas.width = video.width;
      hiddenCanvas.height = video.height;
      const ctx = hiddenCanvas.getContext('2d');
      ctx.drawImage(video, 0, 0, video.width, video.height);
      toastr.info('Retrieving data...');
      $http.post('/rest/login', { image: hiddenCanvas.toDataURL() })
        .then((response) => {
          toastr.success(`Authenticated as: ${response.data.Item.name}`);
        }).catch((err) => {
          toastr.error(err.data.message);
        });
      return ctx.getImageData(x, y, w, h);
    };
  }]);
