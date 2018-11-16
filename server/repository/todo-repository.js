class TodoRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS todo (id TEXT PRIMARY KEY, text TEXT, isCompleted INTEGER DEFAULT 0, completedAt DATETIME, deadlineAT DATETIME DEFAULT NULL )`;

        return this.dao.run(sql);
    }

    create(todo) {
        const { id, text, deadlineAt } = todo;

        return this.dao.run(
            `INSERT INTO todo (id, text, deadlineAt) VALUES (?, ?, ?)`,
            [id, text, deadlineAt]
        );
    }

    update(todo) {
        const { id, text, isCompleted, completedAt, deadlineAt } = todo;

        return this.dao.run(
            'UPDATE todo SET text = ?, isCompleted = ?, completedAt = ?, deadlineAt = ? WHERE id = ?',
            [text, isCompleted, completedAt, deadlineAt, id]
        );
    }

    delete(todo) {
        const { id } = todo;
        return this.dao.run('DELETE FROM todo WHERE id = ?', [id]);
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM todo WHERE id = ?`,
            [id]
        );
    }

    getAll() {
        return this.dao.all(`SELECT * FROM todo`);
    }
}

module.exports = TodoRepository;
