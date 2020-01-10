const express = require('express');
const path = require('path');
const UsersService = require('./users-service');
const requireAuth = require('../middleware/jwt-auth');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

const serializeUser = user => ({
  id: user.id,
  first_name: user.first_name,
  last_name: user.last_name,
  email: user.email,
  password: user.password
});

const serializeBand = band => ({
  band_name: band.band_name
});




usersRouter
  .route('/')
  .post(jsonBodyParser, (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;

    for (const field of ['first_name', 'last_name', 'email', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing ${field} in request body`
        });

    const passwordError = UsersService.validatePassword(password);

    if (passwordError)
      return res.status(400).json({ error: passwordError });

    UsersService.hasUserWithUserName(
      req.app.get('db'),
      email
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: 'Email address already registered' });

        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              first_name,
              last_name,
              email,
              password: hashedPassword
            };

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user));
              });
          });
      })
      .catch(next);
  });
// .delete(requireAuth, (req, res, next) => {
//   UsersService.deleteUser(
//     req.app.get('db'),
//     req.params.user_id
//   )
//     .then(numRowsAffected => {
//       res.status(204).end();
//     })
//     .catch(next);
// });


module.exports = usersRouter;