/**
 * TodoController
 *
 * @description :: Server-side logic for managing todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  addTodo: function(req, res) {
    let newTodo = { task: req.body.task, status: false, owner: req.body.currentUserId };  //
    Todo.create(newTodo, function(err) {
      if (err) {
        return res.serverError(err)
      }
      else {
        return res.created({ message: 'Todo created' })
      }
    })
  },

  editTodo: function(req, res) {
    Todo.update({ id: req.body.id }, { task: req.body.task, status: req.body.status }, function(err, todo) {
      if (err) {
        return res.serverError(err);
      }
      if (req.body.currentUserId !== todo.owner) {
        return res.send({ message: 'You dont have access for this' })
      }
      return res.ok({ message: 'Edit todo success' });
    });
  },

  deleteTodo: function(req, res) {
    Todo.destroy({ owner: req.params.currentUserId, id: req.params.id }, function(err) {
      if (err) {
        return res.send({message: err});
      }
      return res.ok({ message: `Success deleted todo with id: ${req.params.id}` });
    })
  },

  deleteAll: function(req, res) {
    Todo.destroy({ owner: req.params.currentUserId }, function(err) {//owner: req.user.id add in function attributes
      if (err) {
        return res.send(err)
      }
      if(req.params.currentUserId===null){
        return res.send({message: 'Need login befor'})
      }
      return res.ok({ message: 'Delete all todos success' })
    })
  },
  deleteAllCompleted: function(req, res) {
    Todo.destroy({ owner: req.params.currentUserId, status: true }, function(err) { //owner: req.user.id add in function attributes
      if (err) {
        return res.send(err)
      }
      if(req.params.currentUserId===null){
        return res.send({message: 'Need login befor'})
      }
      return res.ok({ message: 'Delete all completed success' })
    })
  },

  changeStatusAll: function(req, res) {
    let stat = req.body.status ===true ;
    Todo.update({ owner: req.body.currentUserId, status: !stat }, { status: stat }, function(err) {//owner: req.user.id add in function attributes
      if (err) {
        return res.send(err)
      }
      return res.ok({ message: `Status all todos changed to ${stat}` })
    })
  },

  getTodoList: function(req, res) {
    Todo.find({ owner: req.body.currentUserId }, function(err, records) {//owner: req.user.id add in function attributes
      if (err) {
        return res.send(err)
      }
      return res.ok(records)
    })
  }
};

