'use strict';

angular.module('dexterhackHireMeApp')
  .controller('ProfileCtrl', function ($scope, $http, Fullscreen, QuestionsService, $timeout) {
    $scope.message = 'Hello';
	$scope.testInformation = {};
	$http
		.get('api/profileDatas')
		.success(function(data, status, headers, config) {
			$(".currentTest").css("display","block");
			$(".PastTest").css("display","none");
			$(".FutureTest").css("display","none");
			$scope.testInformation = data;
			console.log($scope.testInformation);
    		// this callback will be called asynchronously
    		// when the response is available
  		})
		.error(function(data, status, headers, config) {
    		// called asynchronously if an error occurs
    		// or server returns response with an error status.
  		});
	
	$scope.currentTest = function(){
		$(".currentTest").css("display","block");
		$(".PastTest").css("display","none");
		$(".FutureTest").css("display","none");
		$(".testPage").css("display","none");
	};

	$scope.exitTest = function() {
		if (Fullscreen.isEnabled()){
			Fullscreen.cancel();
			$scope.testInformation.testHistory.currentTest.length = 0
			$(".currentTest").css("display","block");
			$(".PastTest").css("display","none");
			$(".FutureTest").css("display","none");
			$(".testPage").css("display","none");
		}
	};
	$scope.pastTest = function(){
		$(".currentTest").css("display","none");
		$(".PastTest").css("display","block");
		$(".FutureTest").css("display","none");
		$(".testPage").css("display","none");
	};
	
	$scope.futureTest = function(){
		$(".currentTest").css("display","none");
		$(".PastTest").css("display","none");
		$(".FutureTest").css("display","block");
		$(".testPage").css("display","none");
	};
	
	$scope.launchTest = function(){
		alert("you are about to start a test");
		$(".testPage").css("display","block");
		$(".currentTest").css("display","none");
		$(".PastTest").css("display","none");
		$(".FutureTest").css("display","none");
		Fullscreen.all();
		changeQuestion(false); 
	};
	
	$scope.questions = {item : {
    type : 'mcq',
    questions : [{
        ques: 'Which of the following is incorrect about nodejs?',
        opts: ['Asynchronous', 'Nonblocking', 'Event-driven', 'None of the above']
    }, {
        ques: 'Which algorithm is used to find Minimum Spanning Tree of a graph?',
        opts: ['Dijikstra', 'Kruskal', 'Floyd', 'Marshal']
    }, {
        ques: 'Which of the following are not JavaScript test frameworks?',
        opts: ['Mocha', 'Jasmine', 'Cucumber', 'All of the above']
    }, {
        ques: 'Which of the following service is available in angularJS?',
        opts: ['$http', '$init', '$timeout', '$interval']
    }]
  }};
    
    var totalQues = $scope.questions.item.questions.length;
    $scope.quesnum = QuestionsService.quesnum + 1;
    $scope.question = $scope.questions.item.questions[QuestionsService.quesnum].ques;
    $scope.options = $scope.questions.item.questions[QuestionsService.quesnum].opts;
    QuestionsService.quesnum ++;   
    
    $scope.nextQuestion = function(){
        changeQuestion(true);
    }  
    
    var mytimeout;
    
    function changeQuestion(flag){
        $scope.countDown = 20;
        var onTimeout = function(){
            $scope.countDown--;console.log($scope.countDown);
            mytimeout = $timeout(onTimeout,1000);
        }
        mytimeout = $timeout(onTimeout,1000);

        var stop = function(callback){
            $timeout.cancel(mytimeout);
            callback();
        }
        
        if(!flag){
            $timeout(function(){
                if(QuestionsService.quesnum < totalQues){
                    setQuestion();
                    stop(function(){
                        $timeout.flush();
                        console.log('stopped');
                        changeQuestion();
                    });
                }
                else{
                    stop(function(){
                        $timeout.flush();
					    $scope.exitTest();
                    });
                }
            }, 20000);
        }
        else{
            if(QuestionsService.quesnum < totalQues){
                setQuestion();
                stop(function(){
                    $timeout.flush();
                    console.log('stopped');
                    changeQuestion(false);
                });
            }
            else{
                stop(function(){
                    $timeout.flush();
                    $scope.exitTest();
                });
            }
        }
    }
    
    function setQuestion(){
        $scope.quesnum = QuestionsService.quesnum + 1;
        $scope.question = $scope.questions.item.questions[QuestionsService.quesnum].ques;
        $scope.options = $scope.questions.item.questions[QuestionsService.quesnum].opts;
        QuestionsService.quesnum ++;
    }
	
  });
