// express settings
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const TodoRepository = require('./repository/todo-repository');
const AppDao = require('./dao');

app.use(cors({
    origin: 'http://localhost:9000'
}));

// base express
app.get('/', (req, res) => res.send('Server works'));

app.get('/todos', async (req, res) => {
    const dao = new AppDao('./database.sqlite3');
    const todoRepo = new TodoRepository(dao);

    todoRepo.createTable()
        .then(() => {
            console.log('fetching all todos');
            return todoRepo.getAll();
        })
        .then((todos) => {
            console.log('got todos in the length of', todos.length);

            res.send(todos);
        })
        .catch((e) => {
            console.log('Countered an error while fetching todos', e);
    });
});

app.listen(port, () => {
    console.log(`Legendary Todos server listening on port ${port}`);
});
