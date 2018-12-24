var bcrypt = require('bcrypt')

module.exports = {

  signup: function(req, res) {
    var userData = { username: req.body.username, password: req.body.password };
    User.create(userData).exec(function(err, user) {
      if (err) {
        return res.send({message: err.invalidAttributes.username[0].message});
      } else {
        return res.created({message: 'Success signup'});
      }
    })
  },

  login: function(req, res) {
    User.findOne({username: req.body.username}, function(err,user){
      if(!user){
        return res.send({message:'Username or password is incorrect'})
      }
      bcrypt.compare(req.body.password, user.password, function() {
        if (res === false) return res.send({message:'Username or password is incorrect'});
        return res.send({message:'Login success', user});
        })
      });
  },

  //
  // logout: function(req, res) {
  //   delete req.logout();
  //   res.json({ success: true })
  // }
}
