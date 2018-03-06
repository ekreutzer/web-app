var azure = require('../api/azure');

module.exports = function(email,password,res){
    console.log("auth");
    azure.login(email,password,res);
    

}
