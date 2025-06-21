// Глобальные переменные
let gameData = {
    nickname: '',
    totalScore: 0,
    gamesPlayed: 0,
    completedLevels: 0,
    currentLevel: 1,
    levelScores: {},
    levelRecords: {},
    achievements: {
        firstWin: false,
        level10: false,
        level25: false,
        level50: false,
        level75: false,
        level100: false,
        perfectScore: false,
        speedRunner: false
    }
};

let currentGame = {
    level: 1,
    targetNumber: 0,
    attempts: 0,
    maxAttempts: 15,
    range: { min: 1, max: 15 },
    guesses: [],
    gameActive: false
};

// Инициализация игры
document.addEventListener('DOMContentLoaded', function() {
    loadGameData();
    checkNickname();
});

// Проверка наличия ника
function checkNickname() {
    if (!gameData.nickname) {
        showNicknameModal();
    } else {
        initializeGame();
    }
}

// Показать модальное окно для ввода ника
function showNicknameModal() {
    document.getElementById('nickname-modal').style.display = 'block';
    document.getElementById('nickname-input').focus();
}

// Сохранить ник
function saveNickname() {
    const nicknameInput = document.getElementById('nickname-input');
    const nickname = nicknameInput.value.trim();
    
    if (nickname.length < 3) {
        alert('Ник должен содержать минимум 3 символа!');
        return;
    }
    
    if (nickname.length > 15) {
        alert('Ник не должен превышать 15 символов!');
        return;
    }
    
    // Проверяем, есть ли уже сохраненные данные для этого ника
    const savedData = localStorage.getItem(`guessNumberGame_${nickname}`);
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            if (confirm(`Найден существующий аккаунт "${nickname}". Хотите войти в него и восстановить прогресс?`)) {
                gameData = parsedData;
                saveGameData(); // Сохраняем как текущий аккаунт
                document.getElementById('nickname-modal').style.display = 'none';
                initializeGame();
                return;
            }
        } catch (e) {
            console.error('Ошибка загрузки данных аккаунта:', e);
        }
    }
    
    // Проверяем, не занят ли ник в таблице лидеров
    const leaderboard = getLeaderboard();
    const existingPlayer = leaderboard.find(player => player.nickname.toLowerCase() === nickname.toLowerCase());
    
    if (existingPlayer && existingPlayer.nickname !== gameData.nickname) {
        alert('Этот ник уже занят! Выберите другой.');
        return;
    }
    
    gameData.nickname = nickname;
    saveGameData();
    document.getElementById('nickname-modal').style.display = 'none';
    initializeGame();
}

// Инициализация игры после ввода ника
function initializeGame() {
    generateLevels();
    updateUI();
    setupEventListeners();
}

// Загрузка данных из localStorage
function loadGameData() {
    const saved = localStorage.getItem('guessNumberGame');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            gameData = { ...gameData, ...parsed };
        } catch (e) {
            console.error('Ошибка загрузки данных:', e);
        }
    }
}

// Сохранение данных в localStorage
function saveGameData() {
    try {
        localStorage.setItem('guessNumberGame', JSON.stringify(gameData));
        updateLeaderboard();
    } catch (e) {
        console.error('Ошибка сохранения данных:', e);
    }
}

// Получение таблицы лидеров
function getLeaderboard() {
    const saved = localStorage.getItem('guessNumberLeaderboard');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Ошибка загрузки таблицы лидеров:', e);
        }
    }
    return [];
}

// Обновление таблицы лидеров
function updateLeaderboard() {
    const leaderboard = getLeaderboard();
    const playerIndex = leaderboard.findIndex(player => player.nickname === gameData.nickname);
    
    const playerData = {
        nickname: gameData.nickname,
        totalScore: gameData.totalScore,
        completedLevels: gameData.completedLevels,
        gamesPlayed: gameData.gamesPlayed,
        lastUpdated: new Date().toISOString()
    };
    
    if (playerIndex >= 0) {
        leaderboard[playerIndex] = playerData;
    } else {
        leaderboard.push(playerData);
    }
    
    // Сортируем по общему счету (убывание), затем по пройденным уровням
    leaderboard.sort((a, b) => {
        if (b.totalScore !== a.totalScore) {
            return b.totalScore - a.totalScore;
        }
        return b.completedLevels - a.completedLevels;
    });
    
    // Ограничиваем до топ-50 игроков
    const topPlayers = leaderboard.slice(0, 50);
    
    try {
        localStorage.setItem('guessNumberLeaderboard', JSON.stringify(topPlayers));
    } catch (e) {
        console.error('Ошибка сохранения таблицы лидеров:', e);
    }
}

// Генерация уровней
function generateLevels() {
    const container = document.getElementById('levels-container');
    container.innerHTML = '';

    for (let i = 1; i <= 100; i++) {
        const levelCard = createLevelCard(i);
        container.appendChild(levelCard);
    }
}

// Создание карточки уровня
function createLevelCard(level) {
    const card = document.createElement('div');
    card.className = 'level-card';
    card.onclick = () => startLevel(level);

    const difficulty = getDifficulty(level);
    const range = getLevelRange(level);
    const attempts = getLevelAttempts(level);

    let status = 'locked';
    if (level <= gameData.currentLevel) {
        status = level === gameData.currentLevel ? 'current' : 'completed';
    }

    card.classList.add(status);

    const score = gameData.levelScores[level] || 0;
    const record = gameData.levelRecords[level] || null;

    card.innerHTML = `
        <h3>Уровень ${level}</h3>
        <p>1-${range.max}</p>
        <p>${attempts} попыток</p>
        <p class="score">${score > 0 ? score + ' очков' : 'Не пройден'}</p>
        ${record ? `<p>🏆 ${record} очков</p>` : ''}
        <span class="difficulty ${difficulty.class}">${difficulty.name}</span>
    `;

    return card;
}

// Получение сложности уровня
function getDifficulty(level) {
    if (level <= 20) return { name: 'Новичок', class: 'novice' };
    if (level <= 40) return { name: 'Ученик', class: 'apprentice' };
    if (level <= 60) return { name: 'Мастер', class: 'master' };
    if (level <= 80) return { name: 'Эксперт', class: 'expert' };
    return { name: 'Легенда', class: 'legend' };
}

// Получение диапазона для уровня
function getLevelRange(level) {
    if (level <= 20) {
        return { min: 1, max: 10 + level * 5 };
    } else if (level <= 40) {
        return { min: 1, max: 100 + (level - 20) * 6 };
    } else if (level <= 60) {
        return { min: 1, max: 200 + (level - 40) * 7.5 };
    } else if (level <= 80) {
        return { min: 1, max: 350 + (level - 60) * 7.5 };
    } else {
        return { min: 1, max: 500 + (level - 80) * 10 };
    }
}

// Получение количества попыток для уровня
function getLevelAttempts(level) {
    if (level <= 20) {
        return Math.max(13, 15 - Math.floor(level / 5));
    } else if (level <= 40) {
        return Math.max(10, 12 - Math.floor((level - 20) / 5));
    } else if (level <= 60) {
        return Math.max(7, 9 - Math.floor((level - 40) / 5));
    } else if (level <= 80) {
        return Math.max(4, 6 - Math.floor((level - 60) / 5));
    } else {
        return Math.max(2, 3 - Math.floor((level - 80) / 5));
    }
}

// Начало уровня
function startLevel(level) {
    if (level > gameData.currentLevel) {
        alert('Сначала пройдите предыдущий уровень!');
        return;
    }

    currentGame.level = level;
    currentGame.range = getLevelRange(level);
    currentGame.maxAttempts = getLevelAttempts(level);
    currentGame.attempts = 0;
    currentGame.guesses = [];
    currentGame.gameActive = true;
    currentGame.targetNumber = Math.floor(Math.random() * currentGame.range.max) + 1;

    updateGameUI();
    showGameModal();
}

// Обновление игрового интерфейса
function updateGameUI() {
    document.getElementById('game-title').textContent = `🎯 Уровень ${currentGame.level}`;
    document.getElementById('attempts-left').textContent = currentGame.maxAttempts - currentGame.attempts;
    document.getElementById('range').textContent = `${currentGame.range.min}-${currentGame.range.max}`;
    
    const bestScore = gameData.levelRecords[currentGame.level] || 'Нет';
    document.getElementById('best-score').textContent = bestScore === 'Нет' ? 'Нет' : bestScore + ' очков';
    
    // Очищаем историю догадок при начале нового уровня
    if (currentGame.attempts === 0) {
        document.getElementById('guess-history').innerHTML = '<p style="color: #666; text-align: center; font-style: italic;">Пока нет догадок</p>';
    }
    
    document.getElementById('guess-input').value = '';
    document.getElementById('guess-input').focus();
}

// Показать игровое модальное окно
function showGameModal() {
    document.getElementById('game-modal').style.display = 'block';
}

// Закрыть игровое модальное окно
function closeGameModal() {
    document.getElementById('game-modal').style.display = 'none';
    currentGame.gameActive = false;
}

// Сделать догадку
function makeGuess() {
    if (!currentGame.gameActive) return;

    const input = document.getElementById('guess-input');
    const guessValue = input.value.trim();
    
    // Проверяем, что введено целое число
    if (!/^\d+$/.test(guessValue)) {
        alert('Пожалуйста, введите целое число без десятичных дробей!');
        return;
    }
    
    const guess = parseInt(guessValue);

    if (isNaN(guess) || guess < currentGame.range.min || guess > currentGame.range.max) {
        alert(`Пожалуйста, введите целое число от ${currentGame.range.min} до ${currentGame.range.max}!`);
        return;
    }

    currentGame.attempts++;
    const result = checkGuess(guess);
    addGuessToHistory(guess, result);

    if (result === 'correct') {
        endGame(true);
    } else if (currentGame.attempts >= currentGame.maxAttempts) {
        endGame(false);
    }

    input.value = '';
    input.focus();
    updateGameUI();
}

// Проверка догадки
function checkGuess(guess) {
    if (guess === currentGame.targetNumber) {
        return 'correct';
    } else if (guess < currentGame.targetNumber) {
        return 'higher';
    } else {
        return 'lower';
    }
}

// Добавление догадки в историю
function addGuessToHistory(guess, result) {
    const history = document.getElementById('guess-history');
    
    // Очищаем сообщение "Пока нет догадок" при первой догадке
    if (currentGame.attempts === 1) {
        history.innerHTML = '';
    }
    
    const guessItem = document.createElement('div');
    guessItem.className = `guess-item ${result}`;

    let message = '';
    switch (result) {
        case 'correct':
            message = `🎉 ${guess} - Правильно!`;
            break;
        case 'higher':
            message = `📈 ${guess} - Загаданное число больше`;
            break;
        case 'lower':
            message = `📉 ${guess} - Загаданное число меньше`;
            break;
    }

    guessItem.textContent = message;
    history.appendChild(guessItem);
    history.scrollTop = history.scrollHeight;
}

// Завершение игры
function endGame(won) {
    currentGame.gameActive = false;
    
    if (won) {
        const score = calculateScore();
        const wasNewRecord = updateLevelRecord(score);
        
        gameData.totalScore += score;
        gameData.gamesPlayed++;
        gameData.levelScores[currentGame.level] = score;
        
        if (currentGame.level === gameData.currentLevel) {
            gameData.completedLevels++;
            gameData.currentLevel++;
            checkAchievements();
        }

        saveGameData();
        updateUI();
        
        setTimeout(() => {
            if (wasNewRecord) {
                alert(`🎉 Поздравляем! Вы прошли уровень ${currentGame.level}!\n🏆 Новый рекорд: ${score} очков!`);
            } else {
                alert(`🎉 Поздравляем! Вы прошли уровень ${currentGame.level}!\n💯 Очки: ${score}`);
            }
            
            // Показываем кнопку следующего уровня вместо confirm
            showNextLevelButton();
        }, 500);
    } else {
        alert(`😔 Игра окончена! Загаданное число было: ${currentGame.targetNumber}`);
        closeGameModal();
    }
}

// Показать кнопку следующего уровня
function showNextLevelButton() {
    const gameModal = document.getElementById('game-modal');
    const navButtons = gameModal.querySelector('.nav-buttons');
    
    // Очищаем существующие кнопки
    navButtons.innerHTML = '';
    
    if (currentGame.level < 100) {
        const nextButton = document.createElement('button');
        nextButton.className = 'next-level-button';
        nextButton.textContent = '🎯 Следующий уровень';
        nextButton.onclick = () => {
            closeGameModal();
            startLevel(currentGame.level + 1);
        };
        navButtons.appendChild(nextButton);
    }
    
    const homeButton = document.createElement('button');
    homeButton.className = 'nav-button';
    homeButton.textContent = '🏠 Главная';
    homeButton.onclick = closeGameModal;
    navButtons.appendChild(homeButton);
    
    const statsButton = document.createElement('button');
    statsButton.className = 'nav-button';
    statsButton.textContent = '📊 Статистика';
    statsButton.onclick = showStatistics;
    navButtons.appendChild(statsButton);
}

// Подсчет очков
function calculateScore() {
    const remainingAttempts = currentGame.maxAttempts - currentGame.attempts;
    return (remainingAttempts * 10) + (currentGame.level * 5);
}

// Обновление рекорда уровня
function updateLevelRecord(score) {
    const currentRecord = gameData.levelRecords[currentGame.level] || 0;
    if (score > currentRecord) {
        gameData.levelRecords[currentGame.level] = score;
        return true;
    }
    return false;
}

// Проверка достижений
function checkAchievements() {
    const achievements = gameData.achievements;
    
    if (!achievements.firstWin && gameData.completedLevels >= 1) {
        achievements.firstWin = true;
        showAchievement('🎯 Первая победа', 'Вы прошли свой первый уровень!');
    }
    
    if (!achievements.level10 && gameData.completedLevels >= 10) {
        achievements.level10 = true;
        showAchievement('🌟 Десятка', 'Вы прошли 10 уровней!');
    }
    
    if (!achievements.level25 && gameData.completedLevels >= 25) {
        achievements.level25 = true;
        showAchievement('⭐ Квартал', 'Вы прошли 25 уровней!');
    }
    
    if (!achievements.level50 && gameData.completedLevels >= 50) {
        achievements.level50 = true;
        showAchievement('💎 Половина', 'Вы прошли 50 уровней!');
    }
    
    if (!achievements.level75 && gameData.completedLevels >= 75) {
        achievements.level75 = true;
        showAchievement('👑 Три четверти', 'Вы прошли 75 уровней!');
    }
    
    if (!achievements.level100 && gameData.completedLevels >= 100) {
        achievements.level100 = true;
        showAchievement('🏆 Легенда', 'Вы прошли все 100 уровней!');
    }
}

// Показать достижение
function showAchievement(title, description) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.5s ease;
        max-width: 300px;
    `;
    
    notification.innerHTML = `
        <h4 style="margin: 0 0 5px 0;">${title}</h4>
        <p style="margin: 0; font-size: 0.9rem;">${description}</p>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Обновление интерфейса
function updateUI() {
    document.getElementById('total-score').textContent = gameData.totalScore;
    document.getElementById('games-played').textContent = gameData.gamesPlayed;
    document.getElementById('progress').textContent = `${gameData.completedLevels}/100`;
    
    const progressPercent = (gameData.completedLevels / 100) * 100;
    document.getElementById('progress-fill').style.width = progressPercent + '%';
    document.getElementById('progress-text').textContent = 
        `Прогресс: ${gameData.completedLevels}/100 уровней (${progressPercent.toFixed(1)}%)`;
    
    generateLevels(); // Обновляем карточки уровней
}

// Показать статистику
function showStatistics() {
    const content = document.getElementById('statistics-content');
    
    const totalLevels = Object.keys(gameData.levelScores).length;
    const averageScore = totalLevels > 0 ? Math.round(gameData.totalScore / totalLevels) : 0;
    const bestLevel = Object.entries(gameData.levelRecords)
        .reduce((best, [level, score]) => score > best.score ? { level, score } : best, { level: 0, score: 0 });
    
    content.innerHTML = `
        <div class="stats-grid">
            <div class="stat-item">
                <h3>Игрок</h3>
                <p>${gameData.nickname}</p>
            </div>
            <div class="stat-item">
                <h3>Общий счет</h3>
                <p>${gameData.totalScore}</p>
            </div>
            <div class="stat-item">
                <h3>Игр сыграно</h3>
                <p>${gameData.gamesPlayed}</p>
            </div>
            <div class="stat-item">
                <h3>Пройдено уровней</h3>
                <p>${gameData.completedLevels}/100</p>
            </div>
            <div class="stat-item">
                <h3>Средний счет</h3>
                <p>${averageScore}</p>
            </div>
            <div class="stat-item">
                <h3>Лучший уровень</h3>
                <p>${bestLevel.level > 0 ? `Уровень ${bestLevel.level} (${bestLevel.score} очков)` : 'Нет данных'}</p>
            </div>
        </div>
        
        <div class="achievements">
            <h3>🏆 Достижения</h3>
            ${generateAchievementsList()}
        </div>
        
        <div class="account-actions">
            <button class="logout-button" onclick="logoutAccount()">🚪 Выйти из аккаунта</button>
        </div>
    `;
    
    document.getElementById('statistics-modal').style.display = 'block';
}

// Показать таблицу лидеров
function showLeaderboard() {
    const content = document.getElementById('leaderboard-content');
    const leaderboard = getLeaderboard();
    
    const currentPlayerRank = leaderboard.findIndex(player => player.nickname === gameData.nickname) + 1;
    const totalPlayers = leaderboard.length;
    
    let leaderboardHTML = `
        <div class="leaderboard-stats">
            <div class="leaderboard-stat">
                <h3>Всего игроков</h3>
                <p>${totalPlayers}</p>
            </div>
            <div class="leaderboard-stat">
                <h3>Ваша позиция</h3>
                <p>${currentPlayerRank > 0 ? currentPlayerRank : 'Не в топе'}</p>
            </div>
            <div class="leaderboard-stat">
                <h3>Ваш счет</h3>
                <p>${gameData.totalScore}</p>
            </div>
        </div>
    `;
    
    if (leaderboard.length > 0) {
        leaderboardHTML += `
            <table class="leaderboard-table">
                <thead>
                    <tr>
                        <th>Место</th>
                        <th>Игрок</th>
                        <th>Счет</th>
                        <th>Уровни</th>
                        <th>Игр</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        leaderboard.forEach((player, index) => {
            const rank = index + 1;
            const rankClass = rank <= 3 ? `rank-${rank}` : '';
            const isCurrentPlayer = player.nickname === gameData.nickname;
            const rowClass = isCurrentPlayer ? 'current-player' : '';
            
            leaderboardHTML += `
                <tr class="${rowClass}">
                    <td class="rank ${rankClass}">${rank}</td>
                    <td>${player.nickname}${isCurrentPlayer ? ' (Вы)' : ''}</td>
                    <td>${player.totalScore}</td>
                    <td>${player.completedLevels}/100</td>
                    <td>${player.gamesPlayed}</td>
                </tr>
            `;
        });
        
        leaderboardHTML += `
                </tbody>
            </table>
        `;
    } else {
        leaderboardHTML += '<p style="text-align: center; color: #666;">Пока нет игроков в таблице лидеров</p>';
    }
    
    content.innerHTML = leaderboardHTML;
    document.getElementById('leaderboard-modal').style.display = 'block';
}

// Закрыть модальное окно таблицы лидеров
function closeLeaderboardModal() {
    document.getElementById('leaderboard-modal').style.display = 'none';
}

// Генерация списка достижений
function generateAchievementsList() {
    const achievements = [
        { id: 'firstWin', title: '🎯 Первая победа', description: 'Пройдите первый уровень', icon: '🎯' },
        { id: 'level10', title: '🌟 Десятка', description: 'Пройдите 10 уровней', icon: '🌟' },
        { id: 'level25', title: '⭐ Квартал', description: 'Пройдите 25 уровней', icon: '⭐' },
        { id: 'level50', title: '💎 Половина', description: 'Пройдите 50 уровней', icon: '💎' },
        { id: 'level75', title: '👑 Три четверти', description: 'Пройдите 75 уровней', icon: '👑' },
        { id: 'level100', title: '🏆 Легенда', description: 'Пройдите все 100 уровней', icon: '🏆' }
    ];
    
    return achievements.map(achievement => {
        const unlocked = gameData.achievements[achievement.id];
        return `
            <div class="achievement ${unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-text">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Закрыть модальное окно статистики
function closeStatisticsModal() {
    document.getElementById('statistics-modal').style.display = 'none';
}

// Показать правила
function showRules() {
    document.getElementById('rules-modal').style.display = 'block';
}

// Закрыть модальное окно правил
function closeRulesModal() {
    document.getElementById('rules-modal').style.display = 'none';
}

// Сброс прогресса
function resetProgress() {
    if (confirm('Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить.')) {
        gameData = {
            nickname: gameData.nickname, // Сохраняем ник
            totalScore: 0,
            gamesPlayed: 0,
            completedLevels: 0,
            currentLevel: 1,
            levelScores: {},
            levelRecords: {},
            achievements: {
                firstWin: false,
                level10: false,
                level25: false,
                level50: false,
                level75: false,
                level100: false,
                perfectScore: false,
                speedRunner: false
            }
        };
        
        localStorage.removeItem('guessNumberGame');
        updateUI();
        alert('Прогресс сброшен!');
    }
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Enter в поле ввода догадки
    document.getElementById('guess-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            makeGuess();
        }
    });
    
    // Enter в поле ввода ника
    document.getElementById('nickname-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveNickname();
        }
    });
    
    // Запрет контекстного меню
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Запрет копирования
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Запрет выделения
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Запрет перетаскивания
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Запрет клавишных сокращений
    document.addEventListener('keydown', function(e) {
        // Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A, Ctrl+Z, Ctrl+Y, F12
        if ((e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'a' || e.key === 'z' || e.key === 'y')) || 
            e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') || // Ctrl+Shift+I
            (e.ctrlKey && e.shiftKey && e.key === 'J') || // Ctrl+Shift+J
            (e.ctrlKey && e.shiftKey && e.key === 'C')) { // Ctrl+Shift+C
            e.preventDefault();
            return false;
        }
    });
    
    // Закрытие модальных окон по клику вне их
    window.addEventListener('click', function(e) {
        const gameModal = document.getElementById('game-modal');
        const statsModal = document.getElementById('statistics-modal');
        const rulesModal = document.getElementById('rules-modal');
        const leaderboardModal = document.getElementById('leaderboard-modal');
        const nicknameModal = document.getElementById('nickname-modal');
        
        if (e.target === gameModal) {
            closeGameModal();
        }
        if (e.target === statsModal) {
            closeStatisticsModal();
        }
        if (e.target === rulesModal) {
            closeRulesModal();
        }
        if (e.target === leaderboardModal) {
            closeLeaderboardModal();
        }
        if (e.target === nicknameModal) {
            // Не закрываем модальное окно ника по клику вне его
        }
    });
}

// CSS анимации для уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Выйти из аккаунта
function logoutAccount() {
    if (confirm('Вы уверены, что хотите выйти из аккаунта? Весь прогресс будет сохранен, но вы сможете войти под другим ником.')) {
        // Сохраняем текущие данные в localStorage с ником
        const currentData = { ...gameData };
        localStorage.setItem(`guessNumberGame_${gameData.nickname}`, JSON.stringify(currentData));
        
        // Очищаем текущие данные
        gameData = {
            nickname: '',
            totalScore: 0,
            gamesPlayed: 0,
            completedLevels: 0,
            currentLevel: 1,
            levelScores: {},
            levelRecords: {},
            achievements: {
                firstWin: false,
                level10: false,
                level25: false,
                level50: false,
                level75: false,
                level100: false,
                perfectScore: false,
                speedRunner: false
            }
        };
        
        // Удаляем текущие данные из localStorage
        localStorage.removeItem('guessNumberGame');
        
        // Закрываем модальное окно статистики
        closeStatisticsModal();
        
        // Показываем модальное окно для ввода нового ника
        showNicknameModal();
    }
} 