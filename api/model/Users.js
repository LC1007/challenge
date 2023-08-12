const db = require('../config');

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
        emailAdd, profileUrl WHERE userID = ${req.params.id}`

        db.query(query, (err, result) =>{
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
    // register(req, res){
    //     const query = `INSER INTO Users `
    // }

    // Update user
    updateUser(req, res){
        const query = `UPDATE User SET ? WHERE userID = ?`

        db.query(query, [req.body, req.params.id], (err) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: 'User has been updated'
            })
        })
    }

    // Delete user
    deleteUser(req, res){
        const query = `DELETE FROM Users WHERE userID = ${req.params.id}`

        db.query(query, (err) =>{
            if(err) throw err
            res.json({
                stauts: res.statusCode,
                msg: 'User has been deleted'
            })
        })
    }
}

module.exports = Users