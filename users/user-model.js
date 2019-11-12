const db = require('../data/db-config');

module.exports = {
  addUser,
  find,
  findBy,
  findById,
  getUsers
};

function find() {
  return db('users').select('id', 'username');
}

function findBy(filter) {
  return db('users')
    .where(filter);
}

async function addUser(user) {
  const [id] = await db('users').insert(user)

  return findById(id)
  // return db('users')
  //   .insert(user, 'id')
  //   .then(ids => {
  //     const [id] = ids;
  //     return findById(id);
  //   });
}

function findById(id) {
  return db('users')
    .select('id', 'username')
    .where({ id })
    .first();
}

function getUsers() {
  return db('users')
  .then(users => users)
  .catch(err => err)
}