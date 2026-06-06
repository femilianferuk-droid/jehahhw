const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());

// Подключение к твоей базе данных PostgreSQL
const pool = new Pool({
    connectionString: "postgresql://bothost_db_fb587bd5cfc7:nxrYSSziFvKTp24e5vuivV9NEapvBJDWdCaK3cwX5Rw@node1.pghost.ru:15742/bothost_db_fb587bd5cfc7",
    ssl: { rejectUnauthorized: false }
});

// Отдача фронтенд файла index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Синхронизация данных юзера и подгрузка глобальных топ-листов
app.post('/api/user/sync', async (req, res) => {
    const { user_id, username } = req.body;
    if (!user_id) return res.status(400).json({ error: 'No user_id' });

    try {
        // Проверяем/создаем пользователя в таблице users
        let userRes = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        if (userRes.rows.length === 0) {
            userRes = await pool.query(
                'INSERT INTO users (user_id, username, balance) VALUES ($1, $2, 5000) RETURNING *',
                [user_id, username || null]
            );
        } else if (username && userRes.rows[0].username !== username) {
            await pool.query('UPDATE users SET username = $1 WHERE user_id = $2', [username, user_id]);
        }

        // Выбираем ТОП по балансу
        const topBalance = await pool.query(
            'SELECT user_id, username, balance FROM users ORDER BY balance DESC LIMIT 5'
        );

        // Выбираем ТОП по играм
        const topGames = await pool.query(
            'SELECT user_id, username, games_played FROM users ORDER BY games_played DESC LIMIT 5'
        );

        res.json({
            user: userRes.rows[0],
            leaderboard_balance: topBalance.rows,
            leaderboard_games: topGames.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'DB Error' });
    }
});

// Списание ставки с баланса (проверка, чтобы баланс не уходил в минус)
app.post('/api/game/bet', async (req, res) => {
    const { user_id, betAmount } = req.body;
    
    try {
        const userRes = await pool.query('SELECT balance FROM users WHERE user_id = $1', [user_id]);
        if (userRes.rows.length === 0) return res.status(404).json({ error: 'User not found' });

        const currentBalance = parseFloat(userRes.rows[0].balance);
        if (currentBalance < betAmount) {
            return res.status(400).json({ error: 'Insufficient funds' });
        }

        // Списываем и инкрементируем счетчик игр из твоей структуры
        const updateRes = await pool.query(
            'UPDATE users SET balance = balance - $1, games_played = games_played + 1 WHERE user_id = $2 RETURNING balance',
            [betAmount, user_id]
        );

        res.json({ success: true, newBalance: updateRes.rows[0].balance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Начисление выигрыша на баланс
app.post('/api/game/win', async (req, res) => {
    const { user_id, winAmount } = req.body;
    try {
        const updateRes = await pool.query(
            'UPDATE users SET balance = balance + $1 WHERE user_id = $2 RETURNING balance',
            [winAmount, user_id]
        );
        res.json({ success: true, newBalance: updateRes.rows[0].balance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Порт для запуска приложения
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Node.js сервер работает на порту: ${PORT}`);
});
