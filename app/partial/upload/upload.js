angular.module('app').controller('UploadCtrl',function($scope, Upload){

	$scope.imageSize = {};

	$scope.upload = function(file){

		console.log($scope.imageSize);

		Upload.upload({
			url:'http://localhost:3000/upload',
			data:{ file : file, imageSize:$scope.imageSize }
		}).then(function(res){
			// executes on successful upload / finish
			$scope.uploaded = true;
			
		}, function(err){
			// executes on error
			console.log('err: ',err);
		}, function(evt){
			// shows progress
			$scope.uploaded = false;
			
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			$scope.progressPercentage = progressPercentage;
			
		});

	};

});