const db = require('../config/db');

exports.createOrder = async ( userId, amount ) => {
    const user = await db.query(
        'SELECT id FROM users WHERE id = $1',
        [userId]
    );
    console.info(user);

    if (user.rowCount === 0) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    const pendingOrder = await db.query(
        `SELECT id FROM orders
         WHERE user_id = $1 AND status = 'PENDING'`,
        [userId]
    );

    if (pendingOrder.rowCount > 0) {
        const error = new Error('User already has a pending order');
        error.statusCode = 409;
        throw error;
    }

    const result = await db.query(
        `INSERT INTO orders (user_id, amount, status, created_at)
        VALUES ($1, $2, 'PENDING', CURRENT_TIMESTAMP)
        RETURNING *`,
        [userId, amount]
    );

    return result.rows[0];
}

exports.getOrdersByUser = async ( userId ) => {

    const result = await db.query(
        `SELECT * FROM orders
        WHERE user_id = $1
        ORDER by created_at DESC`,
        [userId]
    );

    return result.rows;
}

exports.getOrderById = async (orderId) => {

    const result = await db.query(
        `SELECT * FROM orders
        WHERE id = $1`,
        [orderId]
    );

    if (result.rowCount === 0) {
        const error = new Error('Order not found');
        error.statusCode = 404;
        throw error;
    }

    return result.rows[0];
}