var azure = require('../api/azure');

module.exports = function(email,password,res){
    azure.login(email,password,res);

}
