(function () {

  'use strict';

  angular.module('PodiumApp',[])
  .controller('EmailController', EmailController)
  .service('RegisterEmailService', RegisterEmailService)
  .constant('ApiBasePath', "http://54.207.40.40:5010/email");

  EmailController.$inject = ['RegisterEmailService'];

  function EmailController(RegisterEmailService){

    var userEmail = this;

    userEmail.registerEmail = function () {

      if (userEmail.email != undefined && userEmail.email != "") {

        var promise = RegisterEmailService.addEmail(userEmail.email);

        promise.then(function (response) {

        var data = response.data;

        var msg = data["description"];
        console.log(msg);
        alert(msg);

        })
        .catch(function (error) {
          console.log("erro" + error);
        })
      } else {
        alert("Digite seu e-mail");
      }
    };
  }

  RegisterEmailService.$inject = ['$http', 'ApiBasePath'];
  function RegisterEmailService($http, ApiBasePath){

    var service = this;

    service.addEmail = function (email) {

      console.log("email:" + email);

      if(email != undefined){

        var response = $http({
          method: "POST",
          url: (ApiBasePath),
          params: {
            email: email
          }
        });

        return response;
      }
    };
  }



})();
