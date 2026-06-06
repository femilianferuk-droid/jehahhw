const { Pool } = require('pg');

// Подключение к вашей БД
const pool = new Pool({
    connectionString: "postgresql://bothost_db_fb587bd5cfc7:nxrYSSziFvKTp24e5vuivV9NEapvBJDWdCaK3cwX5Rw@node1.pghost.ru:15742/bothost_db_fb587bd5cfc7",
    ssl: { rejectUnauthorized: false }
});

module.exports = async (req, res) => {
    // Включаем CORS на случай вызовов извне
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const url = req.url;

    try {
        // 1. СИНХРОНИЗАЦИЯ ПРОФИЛЯ И ТОПОВ
        if (url.includes('/api/user/sync') && req.method === 'POST') {
            const { user_id, username } = req.body;
            if (!user_id) return res.status(400).json({ error: 'No user_id' });

            let userRes = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
            if (userRes.rows.length === 0) {
                userRes = await pool.query(
                    'INSERT INTO users (user_id, username, balance) VALUES ($1, $2, 5000) RETURNING *',
                    [user_id, username || null]
                );
            } else if (username && userRes.rows[0].username !== username) {
                await pool.query('UPDATE users SET username = $1 WHERE user_id = $2', [username, user_id]);
            }

            const topBalance = await pool.query('SELECT user_id, username, balance FROM users ORDER BY balance DESC LIMIT 5');
            const topGames = await pool.query('SELECT user_id, username, games_played FROM users ORDER BY games_played DESC LIMIT 5');

            return res.status(200).json({
                user: userRes.rows[0],
                leaderboard_balance: topBalance.rows,
                leaderboard_games: topGames.rows
            });
        }

        // 2. СПИСАНИЕ БАЛАНСА (СТАВКА)
        if (url.includes('/api/game/bet') && req.method === 'POST') {
            const { user_id, betAmount } = req.body;

            const userRes = await pool.query('SELECT balance FROM users WHERE user_id = $1', [user_id]);
            if (userRes.rows.length === 0) return res.status(404).json({ error: 'User not found' });

            const currentBalance = parseFloat(userRes.rows[0].balance);
            if (currentBalance < betAmount) return res.status(400).json({ error: 'Insufficient funds' });

            const updateRes = await pool.query(
                'UPDATE users SET balance = balance - $1, games_played = games_played + 1 WHERE user_id = $2 RETURNING balance',
                [betAmount, user_id]
            );
            return res.status(200).json({ success: true, newBalance: updateRes.rows[0].balance });
        }

        // 3. НАЧИСЛЕНИЕ ВЫИГРЫША
        if (url.includes('/api/game/win') && req.method === 'POST') {
            const { user_id, winAmount } = req.body;
            const updateRes = await pool.query(
                'UPDATE users SET balance = balance + $1 WHERE user_id = $2 RETURNING balance',
                [winAmount, user_id]
            );
            return res.status(200).json({ success: true, newBalance: updateRes.rows[0].balance });
        }

        return res.status(404).json({ error: 'Not Found' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};
