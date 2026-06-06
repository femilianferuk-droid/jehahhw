// Запуск: 
// 1. npm install express pg
// 2. node app.js

const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());

// Подключение к вашей базе данных PostgreSQL
const pool = new Pool({
    connectionString: "postgresql://bothost_db_fb587bd5cfc7:nxrYSSziFvKTp24e5vuivV9NEapvBJDWdCaK3cwX5Rw@node1.pghost.ru:15742/bothost_db_fb587bd5cfc7",
    ssl: { rejectUnauthorized: false } // Важно для внешних хостингов БД
});

// --- API ДЛЯ РАБОТЫ С БАЗОЙ ДАННЫХ ---

// 1. Получение профиля игрока и Топ-листов
app.post('/api/user/sync', async (req, res) => {
    const { user_id, username } = req.body;
    if (!user_id) return res.status(400).json({ error: 'No user_id provided' });

    try {
        // Проверяем или создаем пользователя в таблице users
        let userRes = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        if (userRes.rows.length === 0) {
            userRes = await pool.query(
                'INSERT INTO users (user_id, username, balance) VALUES ($1, $2, 1000) RETURNING *',
                [user_id, username || null]
            );
        } else if (username && userRes.rows[0].username !== username) {
            // Обновляем username, если он изменился в TG
            await pool.query('UPDATE users SET username = $1 WHERE user_id = $2', [username, user_id]);
        }

        // Получаем ТОП по балансу
        const topBalance = await pool.query(
            'SELECT user_id, username, balance FROM users ORDER BY balance DESC LIMIT 5'
        );

        // Получаем ТОП по играм
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
        res.status(500).json({ error: 'Database error' });
    }
});

// 2. Списание баланса при начале игры (Фиксация ставки)
app.post('/api/game/bet', async (req, res) => {
    const { user_id, betAmount } = req.body;
    
    try {
        const userRes = await pool.query('SELECT balance FROM users WHERE user_id = $1', [user_id]);
        if (userRes.rows.length === 0) return res.status(444).json({ error: 'User not found' });

        const currentBalance = parseFloat(userRes.rows[0].balance);
        if (currentBalance < betAmount) {
            return res.status(400).json({ error: 'Недостаточно звезд на балансе' });
        }

        // Списываем ставку и инкрементируем счетчик игр
        const updateRes = await pool.query(
            'UPDATE users SET balance = balance - $1, games_played = games_played + 1 WHERE user_id = $2 RETURNING balance',
            [betAmount, user_id]
        );

        res.json({ success: true, newBalance: updateRes.rows[0].balance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3. Начисление выигрыша при успешном автовыводе / забирании коэффициента
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
        res.status(500).json({ error: 'Internal server error' });
    }
});


// --- ОТДАЧА ИНТЕРФЕЙСА (ФРОНТЕНД) ---
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Glow Crash Mini App</title>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        :root {
            --bg-dark: #07090e;
            --card-bg: rgba(18, 22, 35, 0.65);
            --border-ui: rgba(255, 255, 255, 0.06);
            --accent-glow: #00ffaa;
            --accent-purple: #7f56d9;
            --text-main: #f8fafc;
            --text-muted: #64748b;
            --neon-red: #ff3366;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            background-color: var(--bg-dark);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            background-image: radial-gradient(circle at 50% 0%, rgba(127, 86, 217, 0.15) 0%, transparent 60%);
            padding: 12px;
        }

        /* Контейнер в стиле нативных приложений Telegram */
        .app-container {
            width: 100%;
            max-width: 420px;
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        /* Премиум стеклянные панели */
        .glass-panel {
            background: var(--card-bg);
            border: 1px solid var(--border-ui);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 18px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        /* Хедер профиля */
        .header-profile {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .user-meta {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .user-avatar {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--accent-purple), #4c1d95);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 16px;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .user-name {
            font-size: 15px;
            font-weight: 600;
            letter-spacing: -0.3px;
        }

        .user-sub {
            font-size: 12px;
            color: var(--text-muted);
        }

        .balance-badge {
            background: rgba(0, 255, 170, 0.08);
            border: 1px solid rgba(0, 255, 170, 0.2);
            padding: 8px 14px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .balance-val {
            font-weight: 700;
            color: var(--accent-glow);
            font-size: 15px;
        }

        /* Экран игры Crash */
        .crash-viewport {
            position: relative;
            width: 100%;
            height: 200px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.02);
            margin-bottom: 14px;
        }

        #crashCanvas {
            width: 100%;
            height: 100%;
            display: block;
        }

        .multiplier-display {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 42px;
            font-weight: 800;
            letter-spacing: -1px;
            pointer-events: none;
            text-shadow: 0 0 20px rgba(0,0,0,0.6);
        }

        /* Элементы управления ставками */
        .controls-grid {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .input-wrapper {
            position: relative;
            display: flex;
            background: rgba(0, 0, 0, 0.25);
            border: 1px solid var(--border-ui);
            border-radius: 14px;
            padding: 4px;
        }

        .input-wrapper input {
            width: 100%;
            background: transparent;
            border: none;
            outline: none;
            color: white;
            padding: 10px 12px;
            font-size: 16px;
            font-weight: 600;
        }

        .input-label {
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 12px;
            color: var(--text-muted);
            font-weight: 600;
            pointer-events: none;
        }

        .btn-action {
            background: linear-gradient(135deg, var(--accent-purple), #6366f1);
            color: white;
            border: none;
            padding: 15px;
            border-radius: 16px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(127, 86, 217, 0.25);
        }

        .btn-action:active {
            transform: scale(0.98);
            opacity: 0.9;
        }

        .btn-action.take-cash {
            background: linear-gradient(135deg, var(--accent-glow), #059669);
            color: #042f1a;
            box-shadow: 0 4px 12px rgba(0, 255, 170, 0.25);
        }

        /* Вкладки навигации Лидерборда */
        .tabs-nav {
            display: flex;
            background: rgba(0,0,0,0.2);
            padding: 3px;
            border-radius: 12px;
            margin-bottom: 12px;
            border: 1px solid rgba(255,255,255,0.02);
        }

        .tab-item {
            flex: 1;
            text-align: center;
            padding: 8px;
            font-size: 13px;
            font-weight: 600;
            color: var(--text-muted);
            cursor: pointer;
            border-radius: 9px;
            transition: all 0.2s;
        }

        .tab-item.active {
            background: rgba(255, 255, 255, 0.07);
            color: var(--text-main);
        }

        /* Дизайн строк таблицы лидеров */
        .leader-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 6px;
            border-bottom: 1px solid rgba(255,255,255,0.02);
            font-size: 14px;
        }

        .leader-left {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .rank-num {
            font-weight: 700;
            color: var(--text-muted);
            width: 20px;
        }

        .leader-row:nth-child(1) .rank-num { color: #f59e0b; }
        .leader-row:nth-child(2) .rank-num { color: #94a3b8; }
        .leader-row:nth-child(3) .rank-num { color: #b45309; }

        .hidden { display: none !important; }
    </style>
</head>
<body>

    <div class="app-container">
        
        <!-- Верхняя панель пользователя -->
        <div class="glass-panel header-profile">
            <div class="user-meta">
                <div class="user-avatar" id="avatarBox">?</div>
                <div>
                    <div class="user-name" id="nameBox">Игрок</div>
                    <div class="user-sub" id="gamesBox">Игр: 0</div>
                </div>
            </div>
            <div class="balance-badge">
                <span class="balance-val" id="balanceBox">0</span>
                <span style="font-size:13px">⭐️</span>
            </div>
        </div>

        <!-- Модуль игры Crash -->
        <div class="glass-panel">
            <div class="crash-viewport">
                <canvas id="crashCanvas"></canvas>
                <div class="multiplier-display" id="multDisplay">1.00x</div>
            </div>

            <div class="controls-grid">
                <div class="input-wrapper">
                    <input type="number" id="betInput" value="100" min="10">
                    <div class="input-label">СТАВКА</div>
                </div>
                <button class="btn-action" id="actionBtn" onclick="handleAction()">ПОСТАВИТЬ СТАВКУ</button>
            </div>
        </div>

        <!-- Модуль Топ Листов -->
        <div class="glass-panel">
            <div class="tabs-nav">
                <div class="tab-item active" id="tabB" onclick="switchTab('balance')">Топ по звездам</div>
                <div class="tab-item" id="tabG" onclick="switchTab('games')">Топ по активу</div>
            </div>
            <div id="leaderboardContent">
                <!-- Контент генерируется динамически -->
            </div>
        </div>

    </div>

    <script>
        const tg = window.Telegram?.WebApp;
        let userId = 77777; // Дефолтный ID для тестов в браузере
        let username = "Local_User";
        
        if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
            tg.ready();
            tg.expand();
            userId = tg.initDataUnsafe.user.id;
            username = tg.initDataUnsafe.user.username || tg.initDataUnsafe.user.first_name;
        }

        let localBalance = 0;
        let gameStatus = "idle"; // idle, running, crashed
        let currentMultiplier = 1.00;
        let crashPoint = 1.00;
        let betAmount = 100;
        let animationFrameId = null;
        let startTime = 0;
        let leadersData = {};

        // Canvas конфигурация
        const canvas = document.getElementById('crashCanvas');
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio;
            canvas.height = canvas.parentElement.clientHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Синхронизация профиля и списков лидеров из БД
        async function syncData() {
            try {
                const response = await fetch('/api/user/sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id: userId, username: username })
                });
                const data = await response.json();
                
                localBalance = parseFloat(data.user.balance);
                document.getElementById('balanceBox').innerText = Math.floor(localBalance).toLocaleString();
                document.getElementById('nameBox').innerText = data.user.username ? '@' + data.user.username : data.user.first_name;
                document.getElementById('avatarBox').innerText = data.user.first_name.charAt(0).toUpperCase();
                document.getElementById('gamesBox').innerText = 'Игр: ' + data.user.games_played;

                leadersData.balance = data.leaderboard_balance;
                leadersData.games = data.leaderboard_games;
                
                renderLeaderboard('balance');
            } catch (e) {
                console.error("Sync error", e);
            }
        }

        function renderLeaderboard(type) {
            const container = document.getElementById('leaderboardContent');
            container.innerHTML = "";
            const list = type === 'balance' ? leadersData.balance : leadersData.games;
            
            if (!list) return;

            list.forEach((item, index) => {
                const isMe = item.user_id == userId;
                const row = document.createElement('div');
                row.className = 'leader-row';
                if(isMe) row.style.background = 'rgba(255,255,255,0.03)';
                
                const val = type === 'balance' ? Math.floor(item.balance).toLocaleString() + ' ⭐️' : item.games_played + ' игр';
                row.innerHTML = \`
                    <div class="leader-left">
                        <span class="rank-num">\${index + 1}</span>
                        <span>\${item.username ? '@' + item.username : 'User_' + item.user_id.toString().substring(0,4)}</span>
                    </div>
                    <span style="font-weight:600; color:\${type === 'balance' ? 'var(--accent-glow)' : 'var(--text-main)'}">\${val}</span>
                \`;
                container.appendChild(row);
            });
        }

        function switchTab(type) {
            document.getElementById('tabB').classList.toggle('active', type === 'balance');
            document.getElementById('tabG').classList.toggle('active', type === 'games');
            renderLeaderboard(type);
        }

        // --- ЛОГИКА ГЕНЕРАЦИИ МНОЖИТЕЛЯ CRASH ---
        function generateCrashPoint() {
            const rand = Math.random();
            // В 85% случаев падает от 1.00 до 3.00
            if (rand < 0.85) {
                return 1.00 + (Math.random() * 2.00);
            } else {
                // В редких случаях улетает выше (от 3.00 до 12.00)
                return 3.00 + (Math.random() * 9.00);
            }
        }

        // --- ДВИЖОК ОТРИСОВКИ ГРАФИКА И АНИМАЦИИ ---
        function drawGraph() {
            const w = canvas.width / window.devicePixelRatio;
            const h = canvas.height / window.devicePixelRatio;
            ctx.clearRect(0, 0, w, h);

            if (gameStatus === "idle") {
                ctx.fillStyle = varColor('--text-muted');
                ctx.font = "14px Inter";
                ctx.fillText("Ожидание ставки...", 20, h - 20);
                return;
            }

            const elapsed = (Date.now() - startTime) / 1000;
            
            // Расчет текущего множителя по экспоненте во времени
            if (gameStatus === "running") {
                currentMultiplier = 1.00 + Math.pow(elapsed, 1.6) * 0.08;
                
                if (currentMultiplier >= crashPoint) {
                    currentMultiplier = crashPoint;
                    gameStatus = "crashed";
                    document.getElementById('multDisplay').style.color = "var(--neon-red)";
                    document.getElementById('multDisplay').innerText = "Crashed @ " + currentMultiplier.toFixed(2) + "x";
                    document.getElementById('actionBtn').className = "btn-action";
                    document.getElementById('actionBtn').innerText = "ИГРА ОКОНЧЕНА";
                    setTimeout(() => { resetToIdle(); }, 2500);
                } else {
                    document.getElementById('multDisplay').innerText = currentMultiplier.toFixed(2) + "x";
                }
            }

            // Отрисовка красивой неоновой кривой линии
            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = gameStatus === "crashed" ? "#ff3366" : "#00ffaa";
            ctx.shadowBlur = 15;
            ctx.shadowColor = ctx.strokeStyle;

            ctx.moveTo(0, h);
            const progressX = Math.min(w, (elapsed / 6) * w);
            const progressY = h - Math.min(h - 20, (Math.log(currentMultiplier) / Math.log(3)) * (h - 40));
            
            ctx.quadraticCurveTo(progressX / 2, h, progressX, progressY);
            ctx.stroke();
            
            // Сброс тени для остальных элементов
            ctx.shadowBlur = 0;

            if (gameStatus === "running") {
                animationFrameId = requestAnimationFrame(drawGraph);
            }
        }

        function varColor(name) {
            return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        }

        async function handleAction() {
            const btn = document.getElementById('actionBtn');
            betAmount = parseFloat(document.getElementById('betInput').value);

            if (gameStatus === "idle") {
                if (isNaN(betAmount) || betAmount <= 0 || betAmount > localBalance) {
                    if(tg) tg.showAlert("Некорректная сумма ставки или недостаточно средств!");
                    return;
                }

                // Запрос к API на списание баланса
                const res = await fetch('/api/game/bet', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id: userId, betAmount: betAmount })
                });
                const result = await res.json();

                if (result.success) {
                    localBalance = result.newBalance;
                    document.getElementById('balanceBox').innerText = Math.floor(localBalance).toLocaleString();
                    
                    // Запуск раунда
                    gameStatus = "running";
                    crashPoint = generateCrashPoint();
                    startTime = Date.now();
                    currentMultiplier = 1.00;
                    
                    document.getElementById('multDisplay').style.color = "var(--text-main)";
                    btn.className = "btn-action take-cash";
                    btn.innerText = "ЗАБРАТЬ ВЫИГРЫШ";
                    
                    if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("heavy");
                    drawGraph();
                }

            } else if (gameStatus === "running") {
                // Игрок успел нажать вывод средств до краша
                gameStatus = "idle";
                cancelAnimationFrame(animationFrameId);
                
                const winAmount = betAmount * currentMultiplier;
                
                // Начисление выигрыша на бэкенде
                const res = await fetch('/api/game/win', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id: userId, winAmount: winAmount })
                });
                const result = await res.json();

                if(result.success) {
                    if(tg) tg.HapticFeedback.notificationOccurred("success");
                    document.getElementById('multDisplay').style.color = "var(--accent-glow)";
                    document.getElementById('multDisplay').innerText = "Победа! +" + Math.floor(winAmount) + " ⭐️";
                    btn.className = "btn-action";
                    btn.innerText = "СТАВКА ПРИНЯТА";
                    setTimeout(() => { resetToIdle(); }, 2000);
                }
            }
        }

        function resetToIdle() {
            gameStatus = "idle";
            currentMultiplier = 1.00;
            document.getElementById('multDisplay').style.color = "var(--text-main)";
            document.getElementById('multDisplay').innerText = "1.00x";
            const btn = document.getElementById('actionBtn');
            btn.className = "btn-action";
            btn.innerText = "ПОСТАВИТЬ СТАВКУ";
            syncData();
            drawGraph();
        }

        // Запуск при старте
        syncData();
        setTimeout(() => { drawGraph(); }, 100);
    </script>
</body>
</html>
    `);
});

// Запуск сервера приложения на порту 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер Mini App запущен на порту ${PORT}`);
});
