<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Cyber Naval Battle 2026</title>
    <!-- Подключаем SDK для Telegram Mini Apps -->
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;800&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');

        :root {
            --bg: #060813;
            --panel: rgba(13, 17, 39, 0.7);
            --panel-border: rgba(0, 242, 254, 0.15);
            --neon-cyan: #00f2fe;
            --neon-purple: #9b51e0;
            --neon-pink: #ff007f;
            --neon-green: #00ff87;
            --text: #f1f5f9;
            --text-muted: #64748b;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--bg);
            background-image: 
                radial-gradient(circle at 50% -20%, rgba(0, 242, 254, 0.22), transparent 50%),
                radial-gradient(circle at 0% 100%, rgba(155, 81, 224, 0.15), transparent 40%),
                linear-gradient(rgba(255, 255, 255, 0.005) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.005) 1px, transparent 1px);
            background-size: 100% 100%, 100% 100%, 30px 30px, 30px 30px;
            color: var(--text);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 16px;
            overflow-x: hidden;
        }

        /* Главная карточка-контейнер */
        .app-wrapper {
            width: 100%;
            max-width: 440px;
            background: var(--panel);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--panel-border);
            border-radius: 32px;
            padding: 24px;
            box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8), 
                        inset 0 1px 2px rgba(255, 255, 255, 0.1);
            animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Экран Авторизации (для внешних браузеров) */
        .auth-screen {
            text-align: center;
            padding: 40px 10px;
        }

        .cyber-logo {
            font-family: 'Orbitron', sans-serif;
            font-size: 32px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 8px;
            filter: drop-shadow(0 0 15px rgba(0, 242, 254, 0.4));
        }

        .welcome-image {
            width: 140px;
            height: 140px;
            margin: 24px auto;
            background: radial-gradient(circle, rgba(0,242,254,0.2) 0%, transparent 70%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .welcome-image::before {
            content: "🛸";
            font-size: 64px;
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
        }

        /* Кнопки */
        .btn-cyber {
            background: linear-gradient(135deg, var(--neon-purple), #6200ea);
            color: white;
            border: none;
            padding: 16px 28px;
            font-size: 16px;
            font-weight: 700;
            border-radius: 16px;
            cursor: pointer;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            box-shadow: 0 0 20px rgba(155, 81, 224, 0.4);
            position: relative;
            overflow: hidden;
        }

        .btn-cyber::after {
            content: '';
            position: absolute;
            top: -50%; right: -50%; bottom: -50%; left: -50%;
            background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0) 100%);
            transform: rotate(45deg) translateY(-30%);
            animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer {
            0% { transform: rotate(45deg) translateY(-100%); }
            100% { transform: rotate(45deg) translateY(100%); }
        }

        .btn-cyber:active {
            transform: scale(0.98);
            box-shadow: 0 0 10px rgba(155, 81, 224, 0.6);
        }

        /* Виджет профиля верхний */
        .profile-card {
            display: flex;
            align-items: center;
            gap: 16px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.06);
            padding: 16px;
            border-radius: 20px;
            margin-bottom: 24px;
        }

        .profile-avatar {
            width: 52px;
            height: 52px;
            border-radius: 16px;
            background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple));
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 20px;
            color: #000;
            box-shadow: 0 0 15px rgba(0, 242, 254, 0.3);
            overflow: hidden;
        }

        .profile-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .profile-meta h4 {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 4px;
            letter-spacing: -0.3px;
        }

        .pills-container {
            display: flex;
            gap: 8px;
        }

        .pill {
            background: rgba(0, 0, 0, 0.3);
            padding: 4px 10px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 4px;
            border: 1px solid rgba(255,255,255,0.04);
        }

        /* Блок Игры */
        .game-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }

        .game-header h3 {
            font-family: 'Orbitron', sans-serif;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--neon-cyan);
        }

        .game-status-text {
            font-size: 13px;
            color: var(--text-muted);
            background: rgba(0,0,0,0.2);
            padding: 6px 12px;
            border-radius: 20px;
            border: 1px solid rgba(255,255,255,0.02);
            text-align: center;
            margin-bottom: 16px;
        }

        .battle-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin: 0 auto 20px auto;
            max-width: 320px;
        }

        .battle-cell {
            aspect-ratio: 1;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            cursor: pointer;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .battle-cell:hover {
            background: rgba(0, 242, 254, 0.08);
            border-color: var(--neon-cyan);
            box-shadow: 0 0 12px rgba(0, 242, 254, 0.3);
            transform: scale(1.04);
        }

        .battle-cell:active {
            transform: scale(0.95);
        }

        /* Состояния клеток */
        .battle-cell.miss {
            background: #090d1a !important;
            border-color: rgba(255, 255, 255, 0.03) !important;
            cursor: not-allowed;
            transform: none !important;
            box-shadow: none !important;
        }

        .battle-cell.miss::after {
            content: "";
            width: 8px;
            height: 8px;
            background: var(--text-muted);
            border-radius: 50%;
            box-shadow: 0 0 8px var(--text-muted);
        }

        .battle-cell.hit {
            background: rgba(255, 0, 127, 0.15) !important;
            border-color: var(--neon-pink) !important;
            box-shadow: 0 0 20px rgba(255, 0, 127, 0.5);
            cursor: not-allowed;
            transform: none !important;
            animation: hitBlast 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes hitBlast {
            0% { transform: scale(0.5); filter: brightness(2); }
            80% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }

        /* Тряска экрана при промахе */
        .shake {
            animation: shakeAnim 0.3s linear;
        }
        @keyframes shakeAnim {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-6px); }
            40%, 80% { transform: translateX(6px); }
        }

        /* Вкладки Лидерборда */
        .leaderboard-section {
            background: rgba(0, 0, 0, 0.25);
            border-radius: 24px;
            padding: 16px;
            border: 1px solid rgba(255, 255, 255, 0.03);
        }

        .nav-tabs {
            display: flex;
            background: rgba(0, 0, 0, 0.4);
            padding: 4px;
            border-radius: 14px;
            margin-bottom: 16px;
        }

        .nav-tab {
            flex: 1;
            text-align: center;
            padding: 10px;
            font-size: 13px;
            font-weight: 700;
            color: var(--text-muted);
            cursor: pointer;
            border-radius: 10px;
        }

        .nav-tab.active {
            background: rgba(255, 255, 255, 0.06);
            color: var(--text);
            box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
        }

        /* Таблица лидеров */
        .leader-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 8px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.02);
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
        }

        .leader-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .leader-rank {
            font-family: 'Orbitron', sans-serif;
            font-size: 14px;
            font-weight: 800;
            width: 24px;
            color: var(--text-muted);
        }

        .leader-row:nth-child(1) .leader-rank { color: #ffd700; text-shadow: 0 0 10px rgba(255,215,0,0.3); }
        .leader-row:nth-child(2) .leader-rank { color: #d1d5db; }
        .leader-row:nth-child(3) .leader-rank { color: #b45309; }

        .leader-name {
            font-size: 14px;
            font-weight: 600;
        }

        .leader-value {
            font-family: 'Orbitron', sans-serif;
            font-size: 14px;
            font-weight: 700;
        }

        .hidden { display: none !important; }
    </style>
</head>
<body>

    <div class="app-wrapper" id="app-container">
        
        <!-- ЭКРАН ВХОДА (Показывается только вне Telegram) -->
        <div id="screen-auth" class="auth-screen hidden">
            <div class="cyber-logo">CYBER ARENA</div>
            <div class="welcome-image"></div>
            <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 32px; padding: 0 20px;">
                Запустите приложение внутри Telegram Mini App или используйте быстрый демо-доступ.
            </p>
            <button class="btn-cyber" onclick="initPlatform({id:1337, first_name:'Cyber Guest', username:'guest_mode'})">
                <span>⚡ Начать игру</span>
            </button>
        </div>

        <!-- ГЛАВНЫЙ ЭКРАН ИГРЫ -->
        <div id="screen-main" class="hidden">
            
            <!-- Карточка игрока -->
            <div class="profile-card">
                <div class="profile-avatar" id="p-avatar">?</div>
                <div class="profile-meta">
                    <h4 id="p-name">Загрузка...</h4>
                    <div class="pills-container">
                        <div class="pill">
                            <span style="color: var(--neon-green)">🪙</span>
                            <span id="p-balance" style="color: var(--neon-green)">0</span>
                        </div>
                        <div class="pill">
                            <span style="color: var(--neon-cyan)">🏆</span>
                            <span id="p-wins">0</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Игровой радар -->
            <div style="margin-bottom: 28px;">
                <div class="game-header">
                    <h3>Морской Бой 5x5</h3>
                    <div style="cursor: pointer; font-size: 12px; color: var(--neon-cyan); font-weight: 700;" onclick="resetGame()">
                        🔄 Сброс
                    </div>
                </div>
                <div class="game-status-text" id="game-status">Обнаружено 3 вражеских дрона!</div>
                
                <div class="battle-grid" id="board-grid"></div>
            </div>

            <!-- Раздел Топ-Листов -->
            <div class="leaderboard-section">
                <div class="nav-tabs">
                    <div class="nav-tab active" id="tab-b" onclick="toggleLeaderboard('balance')">Топ Баланс</div>
                    <div class="nav-tab" id="tab-w" onclick="toggleLeaderboard('wins')">Топ Побед</div>
                </div>
                <div id="leaderboard-list">
                    <!-- Сюда рендерятся строки лидеров -->
                </div>
            </div>

        </div>

    </div>

    <script>
        // Инициализация Telegram WebApp API
        const tg = window.Telegram?.WebApp;
        let player = null;

        // Генерация фейковой базы данных для топа
        const database = [
            { id: 1, first_name: "Pavel Durov", balance: 125000, wins: 88, avatar: "https://telegram.org/img/t_logo.png" },
            { id: 2, first_name: "Whale_Shark", balance: 45000, wins: 34, avatar: "" },
            { id: 3, first_name: "Crypto King", balance: 18200, wins: 15, avatar: "" },
            { id: 4, first_name: "Cyber_X", balance: 5000, wins: 4, avatar: "" }
        ];

        // Точка входа скрипта при загрузке страницы
        document.addEventListener("DOMContentLoaded", () => {
            if (tg) {
                tg.ready();
                tg.expand(); // Расширяем на весь экран смартфона
                
                // Проверяем, есть ли реальные данные юзера из Telegram
                if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
                    const tgUser = tg.initDataUnsafe.user;
                    initPlatform({
                        id: tgUser.id,
                        first_name: tgUser.first_name,
                        username: tgUser.username || "no_user",
                        avatar: tgUser.photo_url || ""
                    });
                    return;
                }
            }
            
            // Если открыто вне Телеграма, показываем экран-заглушку с демо-входом
            document.getElementById("screen-auth").classList.remove("hidden");
        });

        // Запуск платформы после успешного распознавания/клика
        function initPlatform(userData) {
            document.getElementById("screen-auth").classList.add("hidden");
            document.getElementById("screen-main").classList.remove("hidden");
            
            player = {
                id: userData.id,
                first_name: userData.first_name,
                balance: 1500,
                wins: 2,
                avatar: userData.avatar || ""
            };

            // Рендер профиля
            document.getElementById("p-name").innerText = player.first_name;
            const avatarBox = document.getElementById("p-avatar");
            if (player.avatar) {
                avatarBox.innerHTML = `<img src="${player.avatar}" alt="Avatar">`;
            } else {
                avatarBox.innerText = player.first_name.charAt(0).toUpperCase();
            }

            updateUI();
            renderLeaderboard("balance");
            resetGame();
        }

        function updateUI() {
            document.getElementById("p-balance").innerText = player.balance.toLocaleString();
            document.getElementById("p-wins").innerText = player.wins;
        }

        /* --- ЛОГИКА ТАБЛИЦ ЛИДЕРОВ --- */
        let currentTab = "balance";
        
        function toggleLeaderboard(type) {
            currentTab = type;
            document.getElementById("tab-b").classList.toggle("active", type === 'balance');
            document.getElementById("tab-w").classList.toggle("active", type === 'wins');
            renderLeaderboard(type);
        }

        function renderLeaderboard(type) {
            const listContainer = document.getElementById("leaderboard-list");
            listContainer.innerHTML = "";

            // Объединяем текущего игрока с базой, если его там нет
            const fullList = [...database];
            if (!fullList.some(u => u.id === player.id)) {
                fullList.push(player);
            }

            // Сортировка по выбранному типу
            if (type === "balance") {
                fullList.sort((a, b) => b.balance - a.balance);
            } else {
                fullList.sort((a, b) => b.wins - a.wins);
            }

            fullList.forEach((user, index) => {
                const isMe = user.id === player.id;
                const valueText = type === "balance" ? `${user.balance.toLocaleString()} 🪙` : `${user.wins} 🏆`;
                const valueColor = type === "balance" ? "var(--neon-green)" : "var(--neon-cyan)";

                const row = document.createElement("div");
                row.className = "leader-row";
                if (isMe) row.style.background = "rgba(0, 242, 254, 0.08)";

                row.innerHTML = `
                    <div class="leader-left">
                        <span class="leader-rank">${index + 1}</span>
                        <span class="leader-name">${user.first_name} ${isMe ? '<b style="color:var(--neon-cyan)">(Вы)</b>' : ''}</span>
                    </div>
                    <span class="leader-value" style="color: ${valueColor}">${valueText}</span>
                `;
                listContainer.appendChild(row);
            });
        }


        /* --- КИБЕРСПОРТИВНЫЙ МОРСКОЙ БОЙ --- */
        let board = [];
        let shipsCount = 3;
        let isRoundActive = true;
        let moves = 0;

        function resetGame() {
            const grid = document.getElementById("board-grid");
            grid.innerHTML = "";
            board = Array(25).fill(0);
            shipsCount = 3;
            moves = 0;
            isRoundActive = true;

            const status = document.getElementById("game-status");
            status.innerText = "Радары развернуты. Сделайте первый выстрел!";
            status.style.color = "var(--text-muted)";

            // Генерация 3 скрытых кораблей
            let placed = 0;
            while(placed < 3) {
                let randIndex = Math.floor(Math.random() * 25);
                if (board[randIndex] === 0) {
                    board[randIndex] = 1;
                    placed++;
                }
            }

            // Строим поле в DOM
            for (let i = 0; i < 25; i++) {
                const cell = document.createElement("div");
                cell.className = "battle-cell";
                cell.dataset.index = i;
                cell.addEventListener("click", fireShot);
                grid.appendChild(cell);
            }
        }

        function fireShot(e) {
            if (!isRoundActive) return;
            const cell = e.target;
            
            if (cell.classList.contains("hit") || cell.classList.contains("miss")) return;

            const idx = parseInt(cell.dataset.index);
            moves++;

            // Вызов легкой вибрации смартфона через Telegram API, если доступно
            if (tg && tg.HapticFeedback) {
                tg.HapticFeedback.impactOccurred("medium");
            }

            if (board[idx] === 1) {
                // Попадание!
                cell.classList.add("hit");
                cell.innerText = "💥";
                shipsCount--;
                player.balance += 200;

                if (shipsCount === 0) {
                    isRoundActive = false;
                    player.wins += 1;
                    player.balance += 1500; // Бонус за зачистку всей карты
                    
                    document.getElementById("game-status").innerText = `🔥 БРАВО! Сектор очищен за ${moves} ходов! Получено +1,500 🪙`;
                    document.getElementById("game-status").style.color = "var(--neon-green)";
                    
                    if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
                } else {
                    document.getElementById("game-status").innerText = `Точное попадание! Осталось целей: ${shipsCount}`;
                    document.getElementById("game-status").style.color = "var(--neon-pink)";
                }
            } else {
                // Промах
                cell.classList.add("miss");
                document.getElementById("game-status").innerText = `Мимо радара. Ход #${moves}`;
                document.getElementById("game-status").style.color = "var(--text-muted)";
                
                // Эффект тряски экрана
                const appContainer = document.getElementById("app-container");
                appContainer.classList.add("shake");
                setTimeout(() => appContainer.classList.remove("shake"), 300);
            }

            updateUI();
            renderLeaderboard(currentTab);
        }
    </script>
</body>
</html>
