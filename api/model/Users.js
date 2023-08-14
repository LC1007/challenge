const db = require('../config');
const { hash, compare, hashSync } = require('bcrypt')
const { createToken } = require('../middleware/AuthenticateUser')
class Users{

    // Select all users
    fetchUsers(req,res){
        const query = `
        SELECT userID, firstName, lastName, gender, userDOB, 
        emailAdd, profileUrl FROM Users;`

        db.query(query, (err, results) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                results
            })
        })
    }

    // Select single user
    fetchUser(req, res){
        const query = `SELECT userID, firstName, lastName, gender, userDOB, 
        emailAdd, profileUrl WHERE userID = ?`
        const { id } = req.params

        db.query(query, [id], (err, result) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                result
            })
        })
    }

    // Login 
    // login(req, res){
    // }

    // Register
    async register(req, res){
        const data = req.body
        // Ecrypt password
        data.userPass = await hash(data.userPass,15)
        // Payload
        const user = {
            emailAdd: data.emailAdd,
            userPass: data.userPass
        }
        const query = `INSERT INTO Users SET ?;`
        db.query(query, [data], (err) =>{
            if(err) throw err
            // create token
            let token = createToken(user)
            res.cookie("legitUser", token, 
            {
                maxAge: 3600000,
                httpOnly: true
            })
            res.json({
                status: res.statusCode,
                msg: "You are now registered"
            })
        })
    }

    // Update user
    updateUser(req, res){
        const query = `UPDATE User SET ? WHERE userID = ?`
        const { id } = req.params
        const data = req.body

        db.query(query, [data, id], (err) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: 'User has been updated'
            })
        })
    }

    // Delete user
    deleteUser(req, res){
        const query = `DELETE FROM Users WHERE userID = ?`
        const { id } = req.params

        db.query(query, [id],  (err) =>{
            if(err) throw err
            res.json({
                stauts: res.statusCode,
                msg: 'User has been deleted'
            })
        })
    }
}

module.exports = Users