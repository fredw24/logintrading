const controller = require("./controller")

module.exports = function(app){
    app.get('/api/users', controller.allUsers)
    app.post('/api/users', controller.createUser)
    app.post('/api/users/one', controller.getUser)

}