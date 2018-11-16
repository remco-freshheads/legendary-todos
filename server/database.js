// sqlite3 settings
const Promise = require('bluebird');
const AppDao = require('./dao');
const TodoRepository = require('./repository/todo-repository');

function main() {
    const dao = new AppDao('./database.sqlite3');
    const todoRepo = new TodoRepository(dao);

    todoRepo.createTable()
        .then(() => todoRepo.create({
            id: 'test-bla',
            text: 'Dit is een todo',
            deadlineAt: '2018-12-01 00:00:00'
        }))
        .then(() => todoRepo.getAll())
        .then((todos) => {
            console.log('got the next todos', todos);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = main;
