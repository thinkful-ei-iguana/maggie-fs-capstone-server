// const path = require('path');
// const express = require('express');
// const xss = require('xss');
// const BandMembersService = require('./bandMembers-service');
// const requireAuth = require('../middleware/jwt-auth');

// //protected endpoint

// const bandMembersRouter = express.Router();
// const jsonParser = express.json();

// // const serializeBandMember = band => ({
// //   id: band.id,
// //   band_name: band.band_name,
// //   city: band.city,
// //   state: band.state,
// //   country: band.country,
// //   description: band.description
// // });
// const serializeBandMember = (member) => {
//   return {
//     ...member
//   }
// };

// bandMembersRouter
//   .route('/')
//   // .get((req, res, next) => { // add requireAuth
//   //   const knexInstance = req.app.get('db');
//   //   console.log('req.body is', req.body.id)
//   //   BandMembersService.getAllBandMembers(knexInstance)
//   //     .then(members => {
//   //       if (req.query.q) {
//   //         const filterResults = members.filter((member) => {
//   //           return member.id === req.body.id; // not sure what "req.body.id should be"
//   //         });
//   //         console.log('members in band is', filterResults);
//   //         res.json(filterResults.map(serializeBandMember));
//   //       } else {
//   //         console.log('members is', members);
//   //         res.json(members.map(serializeBandMember));
//   //       }
//   //     })
//   //     .catch((err) => {
//   //       next(err);
//   //     });
//   // })
//   .post(jsonParser, (req, res, next) => { // add requireAuth
//     const { band_id, user_id } = req.body;
//     const newBandMember = { band_id, user_id };

//     for (const [key, value] of Object.entries(newBandMember))
//       if (value === null)
//         return res.status(400).json({
//           error: { message: `Missing ${key} in request body` }
//         });

//     BandMembersService.insertBandMember(
//       req.app.get('db'),
//       newBandMember
//     )
//       .then(member => {
//         res
//           .status(201)
//           .location(path.posix.join(req.originalUrl, `/${member.id}`))
//           .json(serializeBandMember(member));
//       })
//       .catch(next);
//   });

// // bandMembersRouter
// //   .route('/:member_id/mybands')
// //   .get((req, res, next) => { // add requireAuth
// //     console.log('req.body is', req.body);
// //     const knexInstance = req.app.get('db');
// //     BandMembersService.getMembersByBandId(knexInstance)
// //       .then(members => {
// //         if (req.query.q) {
// //           const filterResults = members.filter((member) => {
// //             return member.id === req.body.user_id; // not sure what "req.body.id should be"
// //           });
// //           console.log('members in band is', filterResults);
// //           res.json(filterResults.map(serializeBandMember));
// //         } else {
// //           console.log('members is', members);
// //           res.json(members.map(serializeBandMember));
// //         }
// //       })
// //       .catch((err) => {
// //         next(err);
// //       });
// //   });

// bandMembersRouter
//   .route('/:member_id')
//   .all((req, res, next) => {
//     BandMembersService.getById(
//       req.app.get('db'),
//       req.params.member_id
//     )
//       .then(member => {
//         if (!member) {
//           return res.status(404).json({
//             error: { message: 'Member doesn\'t exist' }
//           });
//         }
//         res.bandMember = bandMember;
//         next();
//       })
//       .catch(next);
//   })
//   .get((req, res, next) => {
//     res.json(serializeBandMember(res.band));
//   })
//   .delete((req, res, next) => {
//     BandMembersService.deleteBandMember(
//       req.app.get('db'),
//       req.params.member_id
//     )
//       .then(numRowsAffected => {
//         res.status(204).end();
//       })
//       .catch(next);
//   })
// // .patch(jsonParser, (req, res, next) => {
// //   const { band_id, user_id } = req.body;
// //   const bandMemberToUpdate = { band_id, user_id };

// //   const numberOfValues = Object.values(bandMemberToUpdate).filter(Boolean).length;
// //   if (numberOfValues === 0) {
// //     return res.status(400).json({
// //       error: {
// //         message: 'Request body must contain either \'description\' or \'band_name\''
// //       }
// //     });
// //   }

// //   BandMembersService.updateBandMember(
// //     req.app.get('db'),
// //     req.params.member_id,
// //     bandMemberToUpdate
// //   )
// //     .then(numRowsAffected => {
// //       res.status(204).end();
// //     })
// //     .catch(next);
// // });



// module.exports = bandMembersRouter;