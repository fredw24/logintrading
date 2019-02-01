const User = require("./model")
const bcrypt = require("bcryptjs")
const bcryptSalt = bcrypt.genSaltSync(10);

module.exports = {
    allUsers: (req, res)=>{
        User.find({})
            .then(data =>res.json(data))
            .catch(data =>res.json(err))

    },
    createUser: (req, res)=>{
        let hashPassword = bcrypt.hashSync(req.body.password, bcryptSalt)
        User.findOne({email: req.body.email})
        .then(data=>{
            console.log(data)
            console.log("---------------------------")

            if (data == null){
                User.create({
                    first_name : req.body.first_name,
                    last_name : req.body.last_name,
                    email : req.body.email,
                    password :  hashPassword
                })
                    .then(data=>
                    {   
                    var safeUser = {
                            userid: data._id,
                            first_name: data.first_name,
                            last_name: data.last_name,
                            email: data.email
                        }
                        
                        res.json(safeUser)})
                    .catch(err=>res.json(err))
            }
            else{
                res.json("Email Already been used")

            }
        })
        .catch(err=>res.json(err))
    },

    getUser: (req, res)=>{
        console.log(req.body.email)
        User.findOne({email: req.body.email})
            .then(data=>{

                if (data == null){
                    res.json("Invalid Email Address")
                }
                else{
                    if (bcrypt.compareSync(req.body.password,  data.password)){
                        var loginUser = {
                            userid : data._id,
                            first_name: data.first_name,
                            last_name: data.last_name,
                            email: data.email

                        }
                    res.json(loginUser)
                    }
                    else{
                    res.json('Invalid Password')

                    }
                }

            })
            .catch(err=>res.json(err))


    }


}

// how to bcrypt a free text password
// let hashPassword = bcrypt.hashSync(freetext password, bcryptSalt);


//how you compare a login password to the users database password
// if (bcrypt.compareSync( loginPassword, database password))