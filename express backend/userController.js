const fs = require('fs');

function getUsers(){

   return JSON.parse(
      fs.readFileSync('users.json')
   );

}

const login = (req, res) => {

   const users = getUsers();

   const { username, password, role } = req.body;

   const user = users.find(
      u =>
      u.username === username &&
      u.password === password &&
      u.role === role
   );

   if(user){

      res.json(user);

   }
   else{

      res.status(401).json({
         message: "Invalid"
      });

   }

};



// -------get all user----

const getUser = (req, res) => {

   const users = getUsers();

   setTimeout(() => {

      res.json(users);

   }, 3000);

};

// --------create new user----

const createUser =(req,res)=>{

    const users=getUsers();


    const newUsers ={
        id:users.length+1,
        username:req.body.username,
        password:req.body.password,
        role:req.body.role
}

users.push(newUsers);

fs.writeFileSync('users.json',JSON.stringify(users,null,2));

res.json({

    message:"user added"
});
}

// -------deleteuser---

const deleteUser=(req,res)=>{

const users=getUsers();

const filteresUsers = users.find( 


    u=>u.id !=req.params.id);

    fs.writeFileSync("users.json",JSON.stringify(filteresUsers,null,2));

    res.JSON({

        message:"user deleted"
    })
}

function readUserRec(){
        return JSON.parse(fs.readFileSync("usersRec.json"));

}

const getUsersrec = (req,res)=>{

    const UserRec = readUserRec();

    setTimeout(()=>{
        res.json(UserRec);
},3000)

}





module.exports = {
   login,
   getUser,
   createUser,
   deleteUser,
   getUsersrec
};