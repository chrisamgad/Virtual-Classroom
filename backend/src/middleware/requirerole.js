const requireRole = function(role) {
    return function(req, res, next) {
      if (req.student && req.student.role === role) 
        next();
      else
          res.send(404);
    }
}

module.exports= requireRole