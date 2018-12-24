var bcrypt = require('bcrypt')

module.exports = {

  signup: function(req, res) {
    var userData = { username: req.body.username, password: req.body.password };
    User.create(userData, (err)=> {
      if (err) {
        return res.send({ message: err.invalidAttributes.username[0].message, redirect: false });
      } else {
        return res.created({ message: 'Success signup', redirect: true });
      }
    })
  },

  login: function(req, res){
    User.findOne({ username: req.body.username }, (err, user) => {
      if (!user) {
        return res.send({ message: 'Username or password is incorrect' , successLogin: false})
      }
      bcrypt.compare(req.body.password, user.password, (err,result) => {
        if (result == false) return res.send({ message: 'Username or password is incorrect',successLogin: false });
        return res.send({ message: 'Login success', user,successLogin: true });
      })
    });
  },

  //
  // logout: function(req, res) {
  //   delete req.logout();
  //   res.json({ success: true })
  // }
}
