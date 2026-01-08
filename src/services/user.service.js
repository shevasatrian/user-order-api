const db = require('../config/db');

exports.createUser = async ({ name, email }) => {
    const existing = await db.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
    );

    if (existing.rowCount > 0) {
        const error = new Error('Email already exists');
        error.statusCode = 409;
        throw error;
    }

    const result = await db.query(
        `INSERT INTO users (name, email, created_at)
        VALUES ($1, $2, CURRENT_TIMESTAMP)
        RETURNING *`,
        [name, email]
    );

    return result.rows[0];
}

exports.getUsers = async ({ limit, offset }) => {

    const result = await db.query(
        `SELECT * FROM users
        ORDER by id
        LIMIT $1 OFFSET $2`,
        [limit, offset]
    );

    return result.rows;
}

exports.getUserById = async (id) => {

    const result = await db.query(
        `SELECT * FROM users
        WHERE id = $1`,
        [id]
    );

    if (result.rowCount === 0) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    return result.rows[0];
}