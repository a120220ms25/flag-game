// 遊戲網址設定（部署後請更新此連結）
const GAME_URL = 'YOUR_DEPLOYED_GAME_URL_HERE'; // 部署後請將此連結替換為實際網址

// ============ 音效系統 ============
const SoundManager = {
    audioContext: null,
    enabled: true,

    // 初始化音效系統
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // 從 localStorage 載入音效設定
            const savedSettings = ProgressManager.loadSettings();
            this.enabled = savedSettings.soundEnabled !== false;
        } catch (e) {
            console.warn('音效系統初始化失敗:', e);
            this.enabled = false;
        }
    },

    // 播放答對音效（愉快的上升音調）
    playCorrect() {
        if (!this.enabled || !this.audioContext) return;

        const ctx = this.audioContext;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // 愉快的音階：C5 -> E5 -> G5
        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5

        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.4);
    },

    // 播放答錯音效（下降音調）
    playWrong() {
        if (!this.enabled || !this.audioContext) return;

        const ctx = this.audioContext;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // 失望的下降音階
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);

        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
    },

    // 播放按鈕點擊音效
    playClick() {
        if (!this.enabled || !this.audioContext) return;

        const ctx = this.audioContext;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
    },

    // 播放通關音效（歡樂的旋律）
    playVictory() {
        if (!this.enabled || !this.audioContext) return;

        const ctx = this.audioContext;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

        notes.forEach((freq, i) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
            oscillator.type = 'sine';

            const startTime = ctx.currentTime + (i * 0.15);
            gainNode.gain.setValueAtTime(0.3, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.3);
        });
    },

    // 播放提示音效
    playHint() {
        if (!this.enabled || !this.audioContext) return;

        const ctx = this.audioContext;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(600, ctx.currentTime);
        oscillator.frequency.setValueAtTime(700, ctx.currentTime + 0.05);
        oscillator.type = 'triangle';
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
    },

    // 切換音效開關
    toggle() {
        this.enabled = !this.enabled;
        const settings = ProgressManager.loadSettings();
        settings.soundEnabled = this.enabled;
        ProgressManager.saveSettings(settings);
        return this.enabled;
    }
};

// ============ 成就徽章系統 ============
const AchievementManager = {
    achievements: [
        {
            id: 'first_win',
            name: { zh: '🎯 首次勝利', en: '🎯 First Victory' },
            description: { zh: '完成第一個關卡', en: 'Complete first stage' },
            condition: (stats) => stats.completedStages >= 1
        },
        {
            id: 'stage_master',
            name: { zh: '🌟 關卡大師', en: '🌟 Stage Master' },
            description: { zh: '完成所有關卡', en: 'Complete all stages' },
            condition: (stats) => stats.completedStages >= 5
        },
        {
            id: 'perfect_score',
            name: { zh: '💯 完美主義者', en: '💯 Perfectionist' },
            description: { zh: '在一關中不使用任何提示且全部答對', en: 'Perfect score without hints' },
            condition: (stats) => stats.perfectRounds >= 1
        },
        {
            id: 'speed_runner',
            name: { zh: '⚡ 閃電快手', en: '⚡ Speed Runner' },
            description: { zh: '在5秒內答對一題', en: 'Answer within 5 seconds' },
            condition: (stats) => stats.fastAnswers >= 1
        },
        {
            id: 'hint_master',
            name: { zh: '🔍 提示達人', en: '🔍 Hint Master' },
            description: { zh: '累計使用50次提示', en: 'Use 50 hints total' },
            condition: (stats) => stats.totalHints >= 50
        },
        {
            id: 'combo_king',
            name: { zh: '🔥 連勝之王', en: '🔥 Combo King' },
            description: { zh: '連續答對10題', en: 'Answer 10 correct in a row' },
            condition: (stats) => stats.maxCombo >= 10
        },
        {
            id: 'world_traveler',
            name: { zh: '🌍 環遊世界', en: '🌍 World Traveler' },
            description: { zh: '答對來自5個不同洲的國旗', en: 'Correct answers from 5 continents' },
            condition: (stats) => stats.continentsUnlocked >= 5
        },
        {
            id: 'score_hunter',
            name: { zh: '💰 分數獵人', en: '💰 Score Hunter' },
            description: { zh: '累計得分超過500分', en: 'Total score over 500' },
            condition: (stats) => stats.totalScore >= 500
        }
    ],

    // 獲取成就統計
    getStats() {
        const saved = localStorage.getItem('flagGameAchievementStats');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            completedStages: 0,
            perfectRounds: 0,
            fastAnswers: 0,
            totalHints: 0,
            maxCombo: 0,
            currentCombo: 0,
            continentsUnlocked: 0,
            totalScore: 0,
            unlockedAchievements: []
        };
    },

    // 保存成就統計
    saveStats(stats) {
        localStorage.setItem('flagGameAchievementStats', JSON.stringify(stats));
    },

    // 更新統計
    updateStats(updates) {
        const stats = this.getStats();
        Object.assign(stats, updates);
        this.saveStats(stats);
        this.checkAchievements(stats);
        return stats;
    },

    // 檢查並解鎖成就
    checkAchievements(stats) {
        const newlyUnlocked = [];

        this.achievements.forEach(achievement => {
            if (!stats.unlockedAchievements.includes(achievement.id)) {
                if (achievement.condition(stats)) {
                    stats.unlockedAchievements.push(achievement.id);
                    newlyUnlocked.push(achievement);
                }
            }
        });

        if (newlyUnlocked.length > 0) {
            this.saveStats(stats);
            newlyUnlocked.forEach(achievement => {
                this.showAchievementNotification(achievement);
            });
        }

        return newlyUnlocked;
    },

    // 顯示成就通知
    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-content">
                <div class="achievement-title">${achievement.name.zh}</div>
                <div class="achievement-desc">${achievement.description.zh}</div>
            </div>
        `;
        document.body.appendChild(notification);

        // 播放音效
        SoundManager.playVictory();

        // 動畫
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    },

    // 獲取已解鎖的成就
    getUnlockedAchievements() {
        const stats = this.getStats();
        return this.achievements.filter(a =>
            stats.unlockedAchievements.includes(a.id)
        );
    },

    // 獲取進度
    getProgress() {
        const stats = this.getStats();
        const total = this.achievements.length;
        const unlocked = stats.unlockedAchievements.length;
        return {
            total,
            unlocked,
            percentage: Math.round((unlocked / total) * 100)
        };
    }
};

// ============ 每日挑戰系統 ============
const DailyChallengeManager = {
    STORAGE_KEY: 'flagGameDailyChallenge',

    // 獲取今日日期字串 (YYYY-MM-DD)
    getTodayDateString() {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    },

    // 使用日期作為種子生成隨機數
    seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    },

    // 生成今日挑戰題目（10 題，混合難度）
    generateTodayQuestions() {
        const dateStr = this.getTodayDateString();
        const seed = dateStr.split('-').reduce((acc, num) => acc + parseInt(num), 0);

        // 使用種子隨機選擇 10 個國家
        const selectedIndices = [];
        let currentSeed = seed;

        while (selectedIndices.length < 10) {
            currentSeed++;
            const randomIndex = Math.floor(this.seededRandom(currentSeed) * flagDatabase.length);
            if (!selectedIndices.includes(randomIndex)) {
                selectedIndices.push(randomIndex);
            }
        }

        return selectedIndices.map(i => flagDatabase[i]);
    },

    // 檢查今日是否已完成
    isTodayCompleted() {
        const data = this.loadData();
        return data.completedDate === this.getTodayDateString();
    },

    // 獲取今日最佳成績
    getTodayBestScore() {
        const data = this.loadData();
        if (data.completedDate === this.getTodayDateString()) {
            return data.score || 0;
        }
        return 0;
    },

    // 儲存今日挑戰成績
    saveTodayScore(score) {
        const data = {
            completedDate: this.getTodayDateString(),
            score: score,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    },

    // 載入資料
    loadData() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : { completedDate: null, score: 0 };
    },

    // 重置（用於測試）
    reset() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
};

// ============ localStorage 進度管理系統 ============
const ProgressManager = {
    KEYS: {
        STAGE_PROGRESS: 'flagGameStageProgress',
        PLAYER_NAME: 'flagGamePlayerName',
        CURRENT_GAME: 'flagGameCurrentGame',
        LEADERBOARD: 'flagGameLeaderboard',
        SETTINGS: 'flagGameSettings'
    },

    // 保存關卡進度
    saveStageProgress(unlockedStages, completedStages) {
        const progress = {
            unlockedStages: unlockedStages || 1,
            completedStages: completedStages || [],
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem(this.KEYS.STAGE_PROGRESS, JSON.stringify(progress));
    },

    // 載入關卡進度
    loadStageProgress() {
        try {
            const saved = localStorage.getItem(this.KEYS.STAGE_PROGRESS);
            if (saved) {
                const progress = JSON.parse(saved);
                return {
                    unlockedStages: progress.unlockedStages || 1,
                    completedStages: progress.completedStages || []
                };
            }
        } catch (e) {
            console.error('載入關卡進度失敗:', e);
        }
        return { unlockedStages: 1, completedStages: [] };
    },

    // 保存玩家名稱
    savePlayerName(name) {
        if (name && name.trim()) {
            localStorage.setItem(this.KEYS.PLAYER_NAME, name.trim());
        }
    },

    // 載入玩家名稱
    loadPlayerName() {
        return localStorage.getItem(this.KEYS.PLAYER_NAME) || '';
    },

    // 保存當前遊戲狀態（可以續玩）
    saveCurrentGame(gameState) {
        try {
            const saveData = {
                playerName: gameState.playerName,
                currentStage: gameState.currentStage,
                currentQuestion: gameState.currentQuestion,
                totalScore: gameState.totalScore,
                correctAnswers: gameState.correctAnswers,
                lives: gameState.lives,
                questions: gameState.questions.map(q => ({ name: q.name, nameEn: q.nameEn })),
                timestamp: new Date().toISOString()
            };
            localStorage.setItem(this.KEYS.CURRENT_GAME, JSON.stringify(saveData));
        } catch (e) {
            console.error('保存遊戲進度失敗:', e);
        }
    },

    // 載入當前遊戲狀態
    loadCurrentGame() {
        try {
            const saved = localStorage.getItem(this.KEYS.CURRENT_GAME);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('載入遊戲進度失敗:', e);
        }
        return null;
    },

    // 清除當前遊戲（遊戲結束時）
    clearCurrentGame() {
        localStorage.removeItem(this.KEYS.CURRENT_GAME);
    },

    // 保存設定（語言等）
    saveSettings(settings) {
        localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
    },

    // 載入設定
    loadSettings() {
        try {
            const saved = localStorage.getItem(this.KEYS.SETTINGS);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('載入設定失敗:', e);
        }
        return {};
    },

    // 保存排行榜
    saveLeaderboard(leaderboard) {
        localStorage.setItem(this.KEYS.LEADERBOARD, JSON.stringify(leaderboard.slice(0, 50)));
    },

    // 載入排行榜
    loadLeaderboard() {
        try {
            const saved = localStorage.getItem(this.KEYS.LEADERBOARD);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('載入排行榜失敗:', e);
            return [];
        }
    },

    // 清除所有進度（重置遊戲）
    clearAllProgress() {
        if (confirm('確定要清除所有遊戲進度嗎？此操作無法復原！\nClear all game progress? This cannot be undone!')) {
            Object.values(this.KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            location.reload();
        }
    },

    // 獲取儲存空間使用情況
    getStorageInfo() {
        let total = 0;
        Object.values(this.KEYS).forEach(key => {
            const item = localStorage.getItem(key);
            if (item) {
                total += item.length;
            }
        });
        return {
            used: (total / 1024).toFixed(2) + ' KB',
            items: Object.values(this.KEYS).filter(key => localStorage.getItem(key)).length
        };
    }
};


// 20關卡設計 - 世界國旗完整挑戰
const stageConfig = [
    // 第1關
    {
        id: 1,
        name: { zh: '入門級觀光客' },
        description: { zh: '恭喜！您已經從「連自己國家國旗都猜不對」的階段畢業了。' },
        totalQuestions: 4,
        requiredCorrect: 2,
        countryIndices: [0, 1, 2, 3], // 台灣、中國、美國、日本
        lives: 3
    },
    // 第2關
    {
        id: 2,
        name: { zh: '紅白藍三原色終結者' },
        description: { zh: '成功區分了所有帶有紅、白、藍的旗子。你的眼睛是 RGB 測色儀嗎？' },
        totalQuestions: 5,
        requiredCorrect: 3,
        countryIndices: [4, 5, 6, 7, 8], // 南韓、泰國、法國、英國、美國等三色旗
        lives: 3
    },
    // 第3關
    {
        id: 3,
        name: { zh: '地圖炮手（自稱）' },
        description: { zh: '您的知識範圍廣大，雖然準確率...見仁見智。' },
        totalQuestions: 5,
        requiredCorrect: 3,
        countryIndices: [9, 10, 11, 12, 13], // 各大洲代表國家
        lives: 3
    },
    // 第4關
    {
        id: 4,
        name: { zh: '五角星獵人' },
        description: { zh: '您對五角星的執著，已經讓國際刑警組織開始關注您了。' },
        totalQuestions: 5,
        requiredCorrect: 3,
        countryIndices: [14, 15, 16, 17, 18], // 帶星星的國旗
        lives: 3
    },
    // 第5關
    {
        id: 5,
        name: { zh: '順利出關的國際背包客' },
        description: { zh: '這是證明你在海關不會拿著列支敦斯登國旗，對著瑞士人揮舞的保證。' },
        totalQuestions: 4,
        requiredCorrect: 3,
        countryIndices: [19, 20, 21, 22], // 常見旅遊國家
        lives: 3
    },
    // 第6關
    {
        id: 6,
        name: { zh: '東歐紅白大師' },
        description: { zh: '您不僅分清了這三面旗幟，您甚至知道它們各自的經緯度。' },
        totalQuestions: 4,
        requiredCorrect: 3,
        countryIndices: [23, 24, 25, 26], // 波蘭、摩納哥、印尼等相似旗幟
        lives: 2
    },
    // 第7關
    {
        id: 7,
        name: { zh: '國旗配色審判官' },
        description: { zh: '您是少數能對國旗的顏色搭配提出「美學批評」的專家。你覺得這配色 OK 嗎？' },
        totalQuestions: 4,
        requiredCorrect: 3,
        countryIndices: [27, 28, 29, 30],
        lives: 2
    },
    // 第8關
    {
        id: 8,
        name: { zh: '三角洲特種部隊' },
        description: { zh: '專門處理各種三角形、鋸齒邊或複雜徽章組成的旗幟障礙。沒有你攻不破的旗角！' },
        totalQuestions: 4,
        requiredCorrect: 3,
        countryIndices: [31, 32, 33, 34], // 帶三角形的國旗
        lives: 2
    },
    // 第9關
    {
        id: 9,
        name: { zh: '世界國旗耳語者' },
        description: { zh: '每一面旗幟在你耳邊低語著自己的名字和...設計師的八卦。' },
        totalQuestions: 4,
        requiredCorrect: 3,
        countryIndices: [35, 36, 37, 38],
        lives: 2
    },
    // 第10關
    {
        id: 10,
        name: { zh: '老班的盆栽看守員' },
        description: { zh: '(來自時空盆栽 B-643 號的感謝) 感謝您沒有在澆水時把我淹死。' },
        totalQuestions: 4,
        requiredCorrect: 3,
        countryIndices: [39, 40, 41, 42],
        lives: 2
    },
    // 第11關
    {
        id: 11,
        name: { zh: '微型國家守護者' },
        description: { zh: '證明您沒有遺忘那些比您家客廳還小的國家。小國旗，大英雄！' },
        totalQuestions: 5,
        requiredCorrect: 4,
        countryIndices: [43, 44, 45, 46, 47], // 安道爾、列支敦斯登等小國
        lives: 2
    },
    // 第12關
    {
        id: 12,
        name: { zh: '國旗密碼破解員' },
        description: { zh: '任何帶有盾牌、武器、或動物圖騰的旗幟，對你來說都只是簡單的摩斯密碼。' },
        totalQuestions: 4,
        requiredCorrect: 3,
        countryIndices: [48, 49, 50, 51],
        lives: 2
    },
    // 第13關
    {
        id: 13,
        name: { zh: '順利出海的艦隊司令' },
        description: { zh: '您現在可以駕駛船艦，精確地辨識海上任何一面旗幟。小心不要被海盜旗騙了。' },
        totalQuestions: 5,
        requiredCorrect: 4,
        countryIndices: [52, 53, 54, 55, 56], // 海島國家
        lives: 2
    },
    // 第14關
    {
        id: 14,
        name: { zh: '地球旗幟學大魔導師' },
        description: { zh: '你的存在是對國際地理學會最大的威脅。快去向全世界炫耀吧！' },
        totalQuestions: 4,
        requiredCorrect: 3,
        countryIndices: [57, 58, 59, 60],
        lives: 2
    },
    // 第15關
    {
        id: 15,
        name: { zh: '十字架的區分者' },
        description: { zh: '證明您已經解鎖了所有北歐國家的複雜十字架排列組合。芬蘭、瑞典、挪威...通通搞定！' },
        totalQuestions: 5,
        requiredCorrect: 4,
        countryIndices: [61, 62, 63, 64, 65], // 北歐國家
        lives: 2
    },
    // 第16關
    {
        id: 16,
        name: { zh: '被國旗選中的人' },
        description: { zh: '您已經無法回頭了，此後您眼中只剩下國旗。連看交通標誌，你都在想是哪國設計的。' },
        totalQuestions: 4,
        requiredCorrect: 3,
        countryIndices: [66, 67, 68, 69],
        lives: 1
    },
    // 第17關
    {
        id: 17,
        name: { zh: '南極洲的遺憾' },
        description: { zh: '你唯一猜錯的，是一面根本不存在的旗幟。真是太專業了！' },
        totalQuestions: 4,
        requiredCorrect: 3,
        countryIndices: [70, 71, 72, 73],
        lives: 1
    },
    // 第18關
    {
        id: 18,
        name: { zh: '旗幟幾何學家' },
        description: { zh: '您能計算出旗幟上每條線段的斜率和黃金分割點。沒錯，您就是這麼無聊...我是說專業！' },
        totalQuestions: 4,
        requiredCorrect: 3,
        countryIndices: [74, 75, 76, 77],
        lives: 1
    },
    // 第19關
    {
        id: 19,
        name: { zh: '國旗界 CSI' },
        description: { zh: '你能從一片布料的纖維組成，判斷它是哪國的棉花。氣味、觸感，都瞞不過你！' },
        totalQuestions: 5,
        requiredCorrect: 4,
        countryIndices: [78, 79, 80, 81, 82],
        lives: 1
    },
    // 第20關 - 最終挑戰
    {
        id: 20,
        name: { zh: '國旗王' },
        description: { zh: '恭喜！您已征服所有旗幟，正式登基。地球上的旗幟都是您的子民。請接受萬旗朝拜！' },
        totalQuestions: 5,
        requiredCorrect: 5,
        countryIndices: [83, 84, 85, 86, 0], // 最後5個國家 + 回到台灣（象徵完成旅程）
        lives: 1
    }
];

// 國旗題庫（每個難度10個不同的國家，包含5種提示）
const flagDatabase = [
    // ============ 初級難度 (10個) - 熟悉的國家 ============
    {
        emoji: '🇹🇼', name: '台灣', nameEn: 'Taiwan', nameJa: '台湾', nameKo: '대만',
        hints: {
            continent: { zh: '亞洲（珍奶發源地那個洲）🧋', en: 'Asia (the bubble tea continent) 🧋' },
            capital: { zh: '台北（永遠在下雨的那個首都）☔', en: 'Taipei (always raining capital) ☔' },
            food: { zh: '珍珠奶茶配鹽酥雞，半糖少冰才是王道！', en: 'Bubble tea + popcorn chicken = life! 🧋🍗' },
            landmark: { zh: '台北101（跨年煙火狂魔）🎆', en: 'Taipei 101 (New Year fireworks beast) 🎆' },
            other: { zh: '便利商店密度世界第一，走3步就有一家7-11 🏪', en: 'World\'s highest convenience store density - 7-11 every 3 steps 🏪' }
        },
        bgGradient: 'linear-gradient(135deg, #0000CD 0%, #FF0000 50%, #FFFFFF 100%)', difficulty: 'beginner'
    },
    {
        emoji: '🇨🇳', name: '中國', nameEn: 'China', nameJa: '中国', nameKo: '중국',
        hints: {
            continent: { zh: '亞洲（人口爆表那個洲）👨‍👩‍👧‍👦', en: 'Asia (population overflow zone) 👨‍👩‍👧‍👦' },
            capital: { zh: '北京（空氣品質讓你秒懂PM2.5）😷', en: 'Beijing (where you learn what PM2.5 means) 😷' },
            food: { zh: '北京烤鴨、小籠包，有8大菜系你吃不完！🦆', en: 'Peking duck, xiaolongbao - 8 cuisines you can\'t finish! 🦆' },
            landmark: { zh: '萬里長城（太空人真的看得到系列）🛸', en: 'Great Wall (actually visible from space series) 🛸' },
            other: { zh: '14億人口，差不多是全世界每5人就有1個中國人 🤯', en: '1.4 billion people - basically 1 in 5 humans! 🤯' }
        },
        bgGradient: 'linear-gradient(135deg, #DE2910 0%, #FFDE00 100%)', difficulty: 'beginner'
    },
    {
        emoji: '🇯🇵', name: '日本', nameEn: 'Japan', nameJa: '日本', nameKo: '일본',
        hints: {
            continent: { zh: '亞洲（動漫聖地）🎌', en: 'Asia (anime paradise) 🎌' },
            capital: { zh: '東京（地鐵複雜到Google Maps都會迷路）🚇', en: 'Tokyo (subway so complex Google Maps gets lost) 🚇' },
            food: { zh: '壽司、拉麵，吃飯要發出聲音才禮貌！🍜', en: 'Sushi, ramen - slurp loudly to be polite! 🍜' },
            landmark: { zh: '富士山（拍照聖地，但爬上去會哭）🗻', en: 'Mount Fuji (Instagram spot, climbing = tears) 🗻' },
            other: { zh: '自動販賣機比人還多，連泡麵都有！🤖', en: 'More vending machines than people! 🤖' }
        },
        bgGradient: 'linear-gradient(135deg, #FFFFFF 0%, #BC002D 100%)', difficulty: 'beginner'
    },
    {
        emoji: '🇰🇷', name: '南韓', nameEn: 'South Korea', nameJa: '韓国', nameKo: '한국',
        hints: {
            continent: { zh: '亞洲（整形大國）💅', en: 'Asia (plastic surgery capital) 💅' },
            capital: { zh: '首爾（咖啡廳密度破表的城市）☕', en: 'Seoul (cafe density over 9000!) ☕' },
            food: { zh: '泡菜配一切！烤肉、炸雞、拉麵都要泡菜 🥬', en: 'Kimchi with EVERYTHING! BBQ, fried chicken, ramen 🥬' },
            landmark: { zh: '景福宮（穿韓服可以免費進場）👘', en: 'Gyeongbokgung (free entry in hanbok!) 👘' },
            other: { zh: '網速世界第一，下載電影只要3秒 🚀', en: 'World\'s fastest internet - download movies in 3 secs 🚀' }
        },
        bgGradient: 'linear-gradient(135deg, #FFFFFF 0%, #003478 50%, #CD2E3A 100%)', difficulty: 'beginner'
    },
    {
        emoji: '🇹🇭', name: '泰國', nameEn: 'Thailand', nameJa: 'タイ', nameKo: '태국',
        hints: {
            continent: { zh: '亞洲（微笑之國但馬殺雞會痛死）😁', en: 'Asia (Land of Smiles but massage hurts!) 😁' },
            capital: { zh: '曼谷（塞車塞到懷疑人生）🚗', en: 'Bangkok (traffic that makes you question life) 🚗' },
            food: { zh: '冬蔭功湯、泰奶，辣度分5個等級你敢挑戰嗎？🌶️', en: 'Tom Yum, Thai tea - 5 spice levels, dare you? 🌶️' },
            landmark: { zh: '大皇宮金碧輝煌，但熱到融化 ☀️', en: 'Grand Palace so shiny, but you\'ll melt ☀️' },
            other: { zh: '大象比你想像的還要多，路上都會遇到！🐘', en: 'More elephants than you think - literally on streets! 🐘' }
        },
        bgGradient: 'linear-gradient(135deg, #ED1C24 0%, #FFFFFF 50%, #241D4F 100%)', difficulty: 'beginner'
    },
    {
        emoji: '🇹🇷', name: '土耳其', nameEn: 'Turkey', nameJa: 'トルコ', nameKo: '터키',
        hints: {
            continent: { zh: '歐洲/亞洲（腳踏兩條船的國家）🦶', en: 'Europe/Asia (literally in both continents!) 🦶' },
            capital: { zh: '安卡拉（大家都以為是伊斯坦堡）🤔', en: 'Ankara (everyone thinks it\'s Istanbul) 🤔' },
            food: { zh: '烤肉串Kebab發源地，土耳其冰淇淋超難拿！🍦', en: 'Kebab homeland, ice cream vendors are trolls! 🍦' },
            landmark: { zh: '卡帕多奇亞熱氣球（IG網美必拍）🎈', en: 'Cappadocia balloons (Instagram paradise) 🎈' },
            other: { zh: '貓咪比人還多，整個國家都是貓奴！🐱', en: 'More cats than humans - the whole country serves cats! 🐱' }
        },
        bgGradient: 'linear-gradient(135deg, #E30A17 0%, #FFFFFF 100%)', difficulty: 'beginner'
    },
    {
        emoji: '🇬🇷', name: '希臘', nameEn: 'Greece', nameJa: 'ギリシャ', nameKo: '그리스',
        hints: {
            continent: { zh: '歐洲（破產但風景超美）💸', en: 'Europe (broke but beautiful) 💸' },
            capital: { zh: '雅典（古蹟到處都是，走路要小心）🏛️', en: 'Athens (ancient ruins everywhere, watch your step) 🏛️' },
            food: { zh: '希臘沙拉配費塔起司，每餐都有橄欖油！🫒', en: 'Greek salad + feta, olive oil in EVERYTHING! 🫒' },
            landmark: { zh: '聖托里尼藍白建築（拍婚紗聖地）📸', en: 'Santorini blue & white (wedding photo heaven) 📸' },
            other: { zh: '發明奧運、民主、哲學，然後就沒錢了 😅', en: 'Invented Olympics, democracy, philosophy... then went broke 😅' }
        },
        bgGradient: 'linear-gradient(135deg, #0D5EAF 0%, #FFFFFF 100%)', difficulty: 'beginner'
    },
    {
        emoji: '🇩🇴', name: '多明尼加', nameEn: 'Dominican Republic', nameJa: 'ドミニカ共和国', nameKo: '도미니카 공화국',
        hints: {
            continent: { zh: '北美洲（加勒比海度假天堂）🏖️', en: 'North America (Caribbean vacation paradise) 🏖️' },
            capital: { zh: '聖多明哥（沙灘比辦公室還多）🌴', en: 'Santo Domingo (more beaches than offices) 🌴' },
            food: { zh: '炸芭蕉配一切，就像台灣人愛滷肉飯！🍌', en: 'Fried plantains with everything, like rice for Asians! 🍌' },
            landmark: { zh: '蓬塔卡納海灘（躺著就是人生勝利組）😎', en: 'Punta Cana beach (lay down = life goals achieved) 😎' },
            other: { zh: 'MLB大聯盟球星製造機，棒球超強！⚾', en: 'MLB star factory - baseball powerhouse! ⚾' }
        },
        bgGradient: 'linear-gradient(135deg, #002D62 0%, #CE1126 100%)', difficulty: 'beginner'
    },
    {
        emoji: '🇻🇳', name: '越南', nameEn: 'Vietnam', nameJa: 'ベトナム', nameKo: '베트남',
        hints: {
            continent: { zh: '亞洲（河粉王國）🍜', en: 'Asia (pho kingdom) 🍜' },
            capital: { zh: '河內（機車比汽車多100倍）🛵', en: 'Hanoi (100x more scooters than cars) 🛵' },
            food: { zh: '河粉Pho、法棍Banh Mi，法國殖民留下的美食！🥖', en: 'Pho, Banh Mi - French colonial food legacy! 🥖' },
            landmark: { zh: '下龍灣（電影《金剛》拍攝地）🦍', en: 'Ha Long Bay (King Kong movie location) 🦍' },
            other: { zh: '咖啡產量世界第二，煉乳加超多！☕', en: 'World\'s 2nd coffee producer - sweetened milk overdose! ☕' }
        },
        bgGradient: 'linear-gradient(135deg, #DA251D 0%, #FFCD00 100%)', difficulty: 'beginner'
    },
    {
        emoji: '🇨🇴', name: '哥倫比亞', nameEn: 'Colombia', nameJa: 'コロンビア', nameKo: '콜롬비아',
        hints: {
            continent: { zh: '南美洲（咖啡因上癮者天堂）☕', en: 'South America (caffeine addict paradise) ☕' },
            capital: { zh: '波哥大（海拔2600公尺會喘）🏔️', en: 'Bogota (2600m altitude = breathless) 🏔️' },
            food: { zh: '咖啡品質超猛，Juan Valdez大叔代言！👨‍🌾', en: 'Coffee so good, Juan Valdez is the mascot! 👨‍🌾' },
            landmark: { zh: '失落之城（印第安納瓊斯既視感）🗿', en: 'Lost City (Indiana Jones vibes) 🗿' },
            other: { zh: '不只有毒梟，還有美女選美冠軍超多！👸', en: 'Not just narcos, also tons of beauty pageant winners! 👸' }
        },
        bgGradient: 'linear-gradient(135deg, #FCD116 0%, #003893 50%, #CE1126 100%)', difficulty: 'beginner'
    },
    {
        emoji: '🇺🇸', name: '美國', nameEn: 'United States', nameJa: 'アメリカ', nameKo: '미국',
        hints: {
            continent: { zh: '北美洲（世界警察）🦅', en: 'North America (world police) 🦅' },
            capital: { zh: '華盛頓特區（大家都以為是紐約）🗽', en: 'Washington D.C. (everyone thinks it\'s NYC) 🗽' },
            food: { zh: '漢堡、熱狗、炸雞，份量大到嚇死人！🍔', en: 'Burgers, hot dogs, fried chicken - portions huge! 🍔' },
            landmark: { zh: '自由女神、好萊塢、迪士尼樂園！🎬', en: 'Statue of Liberty, Hollywood, Disneyland! 🎬' },
            other: { zh: '50個州，每州都有自己的規定超複雜！🇺🇸', en: '50 states, each with own laws - so complicated! 🇺🇸' }
        },
        bgGradient: 'linear-gradient(135deg, #B22234 0%, #FFFFFF 50%, #3C3B6E 100%)', difficulty: 'beginner'
    },
    {
        emoji: '🇸🇬', name: '新加坡', nameEn: 'Singapore', nameJa: 'シンガポール', nameKo: '싱가포르',
        hints: {
            continent: { zh: '亞洲（花園城市但罰款超多）🌺', en: 'Asia (garden city but fines everywhere) 🌺' },
            capital: { zh: '新加坡（國家就是城市）🏙️', en: 'Singapore (country = city) 🏙️' },
            food: { zh: '海南雞飯、辣椒螃蟹、肉骨茶！🦀', en: 'Hainanese chicken rice, chili crab, bak kut teh! 🦀' },
            landmark: { zh: '魚尾獅、濱海灣金沙酒店（天台泳池）🏊', en: 'Merlion, Marina Bay Sands (rooftop pool) 🏊' },
            other: { zh: '吃口香糖會被罰款，超級乾淨！🚫', en: 'Chewing gum = fine, super clean! 🚫' }
        },
        bgGradient: 'linear-gradient(135deg, #ED2939 0%, #FFFFFF 100%)', difficulty: 'beginner'
    },

    // ============ 中級難度 (13個) - 中等知名度國家 ============
    {
        emoji: '🇫🇷', name: '法國', nameEn: 'France', nameJa: 'フランス', nameKo: '프랑스',
        hints: {
            continent: { zh: '歐洲（浪漫到會翻白眼）💋', en: 'Europe (romantic till you roll eyes) 💋' },
            capital: { zh: '巴黎（鐵塔每小時閃一次燈）✨', en: 'Paris (tower sparkles every hour on the hour) ✨' },
            food: { zh: '法棍硬到可以當武器，紅酒喝到茫！🍷', en: 'Baguette = weapon, wine flows like water! 🍷' },
            landmark: { zh: '羅浮宮《蒙娜麗莎》比你想像的小很多 🖼️', en: 'Louvre Mona Lisa way smaller than you think 🖼️' },
            other: { zh: '一天罷工三次，周日全部店都關！🪧', en: 'Strike 3 times a day, everything closed on Sundays! 🪧' }
        },
        bgGradient: 'linear-gradient(135deg, #002395 0%, #FFFFFF 50%, #ED2939 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇬🇧', name: '英國', nameEn: 'United Kingdom', nameJa: 'イギリス', nameKo: '영국',
        hints: {
            continent: { zh: '歐洲（脫歐後很孤單）🇪🇺', en: 'Europe (lonely after Brexit) 🇪🇺' },
            capital: { zh: '倫敦（天氣爛到需要隨身帶傘）☂️', en: 'London (weather so bad, carry umbrella 24/7) ☂️' },
            food: { zh: '炸魚薯條，下午茶要翹小指喝！🫖', en: 'Fish & chips, tea with pinky up! 🫖' },
            landmark: { zh: '大笨鐘（現在叫伊莉莎白塔但沒人在乎）🕰️', en: 'Big Ben (now Elizabeth Tower but who cares) 🕰️' },
            other: { zh: '女王過世了，查爾斯接班但大家想念女王 👑', en: 'Queen died, Charles king now but we miss Lizzy 👑' }
        },
        bgGradient: 'linear-gradient(135deg, #012169 0%, #FFFFFF 50%, #C8102E 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇮🇹', name: '義大利', nameEn: 'Italy', nameJa: 'イタリア', nameKo: '이탈리아',
        hints: {
            continent: { zh: '歐洲（手勢語言比文字還多）🤌', en: 'Europe (more hand gestures than words) 🤌' },
            capital: { zh: '羅馬（到處都是遺跡，挖地鐵會挖到古物）🏛️', en: 'Rome (dig subway, find ancient stuff) 🏛️' },
            food: { zh: '披薩、義大利麵，但鳳梨披薩會被罵死！🍕', en: 'Pizza, pasta - but pineapple pizza = crime! 🍕' },
            landmark: { zh: '比薩斜塔（工程失敗變觀光勝地）📐', en: 'Leaning Tower (engineering fail = tourist trap) 📐' },
            other: { zh: '講話超大聲，不用麥克風都能聽到！📢', en: 'Talk so loud, no microphone needed! 📢' }
        },
        bgGradient: 'linear-gradient(135deg, #009246 0%, #FFFFFF 50%, #CE2B37 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇩🇪', name: '德國', nameEn: 'Germany', nameJa: 'ドイツ', nameKo: '독일',
        hints: {
            continent: { zh: '歐洲（準時到變態的國家）⏰', en: 'Europe (punctual to the extreme) ⏰' },
            capital: { zh: '柏林（圍牆拆了但到處賣碎片）🧱', en: 'Berlin (wall gone but selling fragments everywhere) 🧱' },
            food: { zh: '香腸配啤酒，慕尼黑啤酒節喝到斷片！🍺', en: 'Bratwurst + beer, Oktoberfest blackout fest! 🍺' },
            landmark: { zh: '新天鵝堡（迪士尼城堡的原型）🏰', en: 'Neuschwanstein (Disney castle inspiration) 🏰' },
            other: { zh: '工程師天堂，但幽默感需要充電 🔌', en: 'Engineer paradise, but humor needs charging 🔌' }
        },
        bgGradient: 'linear-gradient(135deg, #000000 0%, #DD0000 50%, #FFCE00 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇪🇸', name: '西班牙', nameEn: 'Spain', nameJa: 'スペイン', nameKo: '스페인',
        hints: {
            continent: { zh: '歐洲（午睡Siesta文化）💤', en: 'Europe (siesta nap culture) 💤' },
            capital: { zh: '馬德里（晚餐10點才開始吃）🍽️', en: 'Madrid (dinner starts at 10pm) 🍽️' },
            food: { zh: '海鮮飯Paella、Tapas小菜吃到飽！🦐', en: 'Paella, tapas all you can eat! 🦐' },
            landmark: { zh: '聖家堂蓋了140年還沒蓋完 🏗️', en: 'Sagrada Familia - 140 years, still not done 🏗️' },
            other: { zh: '佛朗明哥舞超帥，鬥牛現在沒那麼流行了 💃', en: 'Flamenco cool, bullfighting not so popular now 💃' }
        },
        bgGradient: 'linear-gradient(135deg, #AA151B 0%, #F1BF00 50%, #AA151B 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇧🇷', name: '巴西', nameEn: 'Brazil', nameJa: 'ブラジル', nameKo: '브라질',
        hints: {
            continent: { zh: '南美洲（森巴舞狂熱）💃', en: 'South America (samba dance mania) 💃' },
            capital: { zh: '巴西利亞（大家都以為是里約）🤷', en: 'Brasilia (everyone thinks it\'s Rio) 🤷' },
            food: { zh: '烤肉Churrasco吃到飽，莓果碗Acai健身必備！🥩', en: 'Churrasco all-you-can-eat, acai bowl for gains! 🥩' },
            landmark: { zh: '基督像張開雙臂（抱抱姿勢）🙆', en: 'Christ the Redeemer (free hugs pose) 🙆' },
            other: { zh: '足球狂熱國家，世界盃冠軍5次！⚽', en: 'Football crazy nation - 5 World Cups! ⚽' }
        },
        bgGradient: 'linear-gradient(135deg, #009B3A 0%, #FEDF00 50%, #002776 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇦🇷', name: '阿根廷', nameEn: 'Argentina', nameJa: 'アルゼンチン', nameKo: '아르헨티나',
        hints: {
            continent: { zh: '南美洲（梅西老家）🐐', en: 'South America (Messi\'s home) 🐐' },
            capital: { zh: '布宜諾斯艾利斯（南美巴黎但物價崩潰）💸', en: 'Buenos Aires (Paris of South America, inflation crazy) 💸' },
            food: { zh: '牛排大到比臉還大，紅酒Malbec超讚！🥩', en: 'Steak bigger than your face, Malbec wine rocks! 🥩' },
            landmark: { zh: '伊瓜蘇瀑布（跟巴西搶）💦', en: 'Iguazu Falls (sharing with Brazil) 💦' },
            other: { zh: '探戈發源地，梅西帶隊拿2022世界盃冠軍！🏆', en: 'Tango birthplace, Messi won 2022 World Cup! 🏆' }
        },
        bgGradient: 'linear-gradient(135deg, #74ACDF 0%, #FFFFFF 50%, #74ACDF 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇲🇽', name: '墨西哥', nameEn: 'Mexico', nameJa: 'メキシコ', nameKo: '멕시코',
        hints: {
            continent: { zh: '北美洲（辣椒王國）🌶️', en: 'North America (chili kingdom) 🌶️' },
            capital: { zh: '墨西哥城（地鐵超便宜但塞車爆表）🚇', en: 'Mexico City (metro cheap, traffic nightmare) 🚇' },
            food: { zh: 'Taco、Burrito、辣醬配一切！🌮', en: 'Taco, burrito, hot sauce on everything! 🌮' },
            landmark: { zh: '奇琴伊察金字塔（馬雅遺跡）🔺', en: 'Chichen Itza pyramid (Mayan ruins) 🔺' },
            other: { zh: '亡靈節超狂，骷髏頭到處都是！💀', en: 'Day of the Dead festival - skulls everywhere! 💀' }
        },
        bgGradient: 'linear-gradient(135deg, #006847 0%, #FFFFFF 50%, #CE1126 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇨🇦', name: '加拿大', nameEn: 'Canada', nameJa: 'カナダ', nameKo: '캐나다',
        hints: {
            continent: { zh: '北美洲（超級有禮貌Sorry國）🙏', en: 'North America (super polite "sorry" nation) 🙏' },
            capital: { zh: '渥太華（大家都以為是多倫多）❄️', en: 'Ottawa (everyone thinks it\'s Toronto) ❄️' },
            food: { zh: 'Poutine薯條淋肉汁起司，楓糖漿配一切！🍁', en: 'Poutine fries, maple syrup on everything! 🍁' },
            landmark: { zh: '尼加拉瀑布（跟美國分享）、班夫國家公園超美！🏔️', en: 'Niagara Falls (sharing with USA), Banff so pretty! 🏔️' },
            other: { zh: '冬天冷到爆，但楓葉季超美！🍂', en: 'Winter freezing cold, but fall foliage amazing! 🍂' }
        },
        bgGradient: 'linear-gradient(135deg, #FF0000 0%, #FFFFFF 50%, #FF0000 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇦🇺', name: '澳洲', nameEn: 'Australia', nameJa: 'オーストラリア', nameKo: '호주',
        hints: {
            continent: { zh: '大洋洲（什麼都想咬你）🦘', en: 'Oceania (everything wants to kill you) 🦘' },
            capital: { zh: '坎培拉（大家都以為是雪梨）🦘', en: 'Canberra (everyone thinks it\'s Sydney) 🦘' },
            food: { zh: 'Vegemite超難吃，但澳洲人超愛！🤢', en: 'Vegemite tastes weird, but Aussies love it! 🤢' },
            landmark: { zh: '雪梨歌劇院（貝殼造型）、大堡礁快死了 🐠', en: 'Opera House (shell shape), Great Barrier Reef dying 🐠' },
            other: { zh: '袋鼠、無尾熊、毒蜘蛛、毒蛇通通有！☠️', en: 'Kangaroos, koalas, deadly spiders, snakes - all here! ☠️' }
        },
        bgGradient: 'linear-gradient(135deg, #00008B 0%, #FFFFFF 50%, #FF0000 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇮🇳', name: '印度', nameEn: 'India', nameJa: 'インド', nameKo: '인도',
        hints: {
            continent: { zh: '亞洲（咖哩王國）🍛', en: 'Asia (curry kingdom) 🍛' },
            capital: { zh: '新德里（塞車+牛群=日常）🐄', en: 'New Delhi (traffic + cows = daily life) 🐄' },
            food: { zh: '咖哩、烤餅Naan、瑪莎拉奶茶超香！🫓', en: 'Curry, naan bread, masala chai so fragrant! 🫓' },
            landmark: { zh: '泰姬瑪哈陵（愛情的象徵）💕', en: 'Taj Mahal (symbol of love) 💕' },
            other: { zh: '14億人口，寶萊塢電影必跳舞！💃', en: '1.4 billion people, Bollywood = must dance! 💃' }
        },
        bgGradient: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇿🇦', name: '南非', nameEn: 'South Africa', nameJa: '南アフリカ', nameKo: '남아프리카',
        hints: {
            continent: { zh: '非洲（彩虹之國）🌈', en: 'Africa (Rainbow Nation) 🌈' },
            capital: { zh: '有3個首都（行政、立法、司法分開）🏛️', en: '3 capitals (executive, legislative, judicial) 🏛️' },
            food: { zh: 'Biltong肉乾、Braai烤肉派對！🥩', en: 'Biltong jerky, braai BBQ parties! 🥩' },
            landmark: { zh: '桌山、好望角、克魯格國家公園 🦁', en: 'Table Mountain, Cape of Good Hope, Kruger Park 🦁' },
            other: { zh: '11種官方語言，曼德拉的故鄉！✊', en: '11 official languages, Mandela\'s homeland! ✊' }
        },
        bgGradient: 'linear-gradient(135deg, #007A4D 0%, #FFB81C 50%, #DE3831 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇪🇬', name: '埃及', nameEn: 'Egypt', nameJa: 'エジプト', nameKo: '이집트',
        hints: {
            continent: { zh: '非洲（金字塔之國）🔺', en: 'Africa (land of pyramids) 🔺' },
            capital: { zh: '開羅（人比金字塔還多）🏙️', en: 'Cairo (more people than pyramids) 🏙️' },
            food: { zh: 'Koshari燉飯、烤肉串、甜點超甜！🍮', en: 'Koshari rice, kebabs, desserts super sweet! 🍮' },
            landmark: { zh: '金字塔、人面獅身像、尼羅河 🛶', en: 'Pyramids, Sphinx, Nile River 🛶' },
            other: { zh: '5000年歷史，法老王的詛咒超有名！👑', en: '5000 year history, pharaoh\'s curse famous! 👑' }
        },
        bgGradient: 'linear-gradient(135deg, #CE1126 0%, #FFFFFF 50%, #000000 100%)', difficulty: 'intermediate'
    },

    // ============ 高級難度 (10個) - 冷門國家 ============
    {
        emoji: '🇸🇪', name: '瑞典', nameEn: 'Sweden', nameJa: 'スウェーデン', nameKo: '스웨덴',
        hints: {
            continent: { zh: '歐洲（IKEA王國）🛋️', en: 'Europe (IKEA kingdom) 🛋️' },
            capital: { zh: '斯德哥爾摩（北歐威尼斯但更冷）🥶', en: 'Stockholm (Nordic Venice but colder) 🥶' },
            food: { zh: 'IKEA肉丸、醃鯡魚（超腥）🐟', en: 'IKEA meatballs, pickled herring (super fishy) 🐟' },
            landmark: { zh: '冰旅館（睡一晚會凍死）❄️', en: 'Ice Hotel (one night = frozen) ❄️' },
            other: { zh: '諾貝爾獎發源地，還有ABBA樂團！🎵', en: 'Nobel Prize birthplace, also ABBA band! 🎵' }
        },
        bgGradient: 'linear-gradient(135deg, #006AA7 0%, #FECC00 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇨🇭', name: '瑞士', nameEn: 'Switzerland', nameJa: 'スイス', nameKo: '스위스',
        hints: {
            continent: { zh: '歐洲（有錢人天堂）💰', en: 'Europe (rich people paradise) 💰' },
            capital: { zh: '伯恩（大家都以為是蘇黎世）🏦', en: 'Bern (everyone thinks it\'s Zurich) 🏦' },
            food: { zh: '起司火鍋、巧克力Toblerone三角形！🍫', en: 'Cheese fondue, Toblerone chocolate triangles! 🍫' },
            landmark: { zh: '阿爾卑斯山、勞力士總部 ⌚', en: 'Alps, Rolex headquarters ⌚' },
            other: { zh: '永久中立國，銀行保密到爆！🏦', en: 'Permanently neutral, super secret banks! 🏦' }
        },
        bgGradient: 'linear-gradient(135deg, #FF0000 0%, #FFFFFF 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇳🇱', name: '荷蘭', nameEn: 'Netherlands', nameJa: 'オランダ', nameKo: '네덜란드',
        hints: {
            continent: { zh: '歐洲（腳踏車比人多）🚴', en: 'Europe (more bikes than people) 🚴' },
            capital: { zh: '阿姆斯特丹（運河多到會迷路）🚤', en: 'Amsterdam (so many canals you\'ll get lost) 🚤' },
            food: { zh: '起司Gouda、炸薯條配美乃滋！🧀', en: 'Gouda cheese, fries with mayo! 🧀' },
            landmark: { zh: '風車村、紅燈區（嘿嘿）🔴', en: 'Windmills, Red Light District (hehe) 🔴' },
            other: { zh: '鬱金香花季超美，大麻合法化！🌷', en: 'Tulip season gorgeous, weed legal! 🌷' }
        },
        bgGradient: 'linear-gradient(135deg, #AE1C28 0%, #FFFFFF 50%, #21468B 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇵🇹', name: '葡萄牙', nameEn: 'Portugal', nameJa: 'ポルトガル', nameKo: '포르투갈',
        hints: {
            continent: { zh: '歐洲（CR7老家）⚽', en: 'Europe (CR7 homeland) ⚽' },
            capital: { zh: '里斯本（電車叮叮超可愛）🚋', en: 'Lisbon (cute trams everywhere) 🚋' },
            food: { zh: '蛋塔Pastel發源地，波特酒超猛！🍮', en: 'Pastel de nata birthplace, port wine rocks! 🍮' },
            landmark: { zh: '貝倫塔、羅卡角（歐洲最西端）🌊', en: 'Belém Tower, Cape Roca (Europe\'s westernmost point) 🌊' },
            other: { zh: '大航海時代霸主，現在比較窮但很爽！🚢', en: 'Age of Exploration boss, now broke but chill! 🚢' }
        },
        bgGradient: 'linear-gradient(135deg, #006600 0%, #FF0000 50%, #FFD700 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇳🇴', name: '挪威', nameEn: 'Norway', nameJa: 'ノルウェー', nameKo: '노르웨이',
        hints: {
            continent: { zh: '歐洲（石油富國）🛢️', en: 'Europe (oil rich nation) 🛢️' },
            capital: { zh: '奧斯陸（物價貴到嚇死）💸', en: 'Oslo (prices so high you\'ll cry) 💸' },
            food: { zh: '鮭魚、棕色起司（甜的超詭異）🧈', en: 'Salmon, brown cheese (sweet & weird) 🧈' },
            landmark: { zh: '峽灣、北極光（冬天超美）🌌', en: 'Fjords, Northern Lights (winter beauty) 🌌' },
            other: { zh: '維京人後代，冬天太陽不會升起！☀️', en: 'Viking descendants, polar night = no sun! ☀️' }
        },
        bgGradient: 'linear-gradient(135deg, #BA0C2F 0%, #00205B 50%, #FFFFFF 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇩🇰', name: '丹麥', nameEn: 'Denmark', nameJa: 'デンマーク', nameKo: '덴마크',
        hints: {
            continent: { zh: '歐洲（快樂指數第一）😊', en: 'Europe (happiest country) 😊' },
            capital: { zh: '哥本哈根（腳踏車天堂）🚲', en: 'Copenhagen (bicycle heaven) 🚲' },
            food: { zh: '丹麥酥其實不是丹麥的，開放式三明治！🥪', en: 'Danish pastry not Danish, open sandwiches! 🥪' },
            landmark: { zh: '小美人魚雕像（超小一個）🧜‍♀️', en: 'Little Mermaid statue (actually tiny) 🧜‍♀️' },
            other: { zh: '樂高LEGO發源地，積木王國！🧱', en: 'LEGO birthplace, brick kingdom! 🧱' }
        },
        bgGradient: 'linear-gradient(135deg, #C8102E 0%, #FFFFFF 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇫🇮', name: '芬蘭', nameEn: 'Finland', nameJa: 'フィンランド', nameKo: '핀란드',
        hints: {
            continent: { zh: '歐洲（桑拿狂熱）🧖', en: 'Europe (sauna obsessed) 🧖' },
            capital: { zh: '赫爾辛基（冬天零下20度）🥶', en: 'Helsinki (winter -20°C) 🥶' },
            food: { zh: '馴鹿肉、鹹甘草糖（超難吃）🦌', en: 'Reindeer meat, salty licorice (gross) 🦌' },
            landmark: { zh: '聖誕老人村在北極圈內！🎅', en: 'Santa Village in Arctic Circle! 🎅' },
            other: { zh: '千湖之國，桑拿比人還多！🏞️', en: 'Land of 1000 lakes, more saunas than people! 🏞️' }
        },
        bgGradient: 'linear-gradient(135deg, #002F6C 0%, #FFFFFF 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇮🇸', name: '冰島', nameEn: 'Iceland', nameJa: 'アイスランド', nameKo: '아이슬란드',
        hints: {
            continent: { zh: '歐洲（火山與冰川的瘋狂組合）🌋', en: 'Europe (crazy volcano + glacier combo) 🌋' },
            capital: { zh: '雷克雅維克（世界最北首都）🧭', en: 'Reykjavik (world\'s northernmost capital) 🧭' },
            food: { zh: '發酵鯊魚（腥到會吐）、羊頭 🤮', en: 'Fermented shark (vomit-inducing), sheep head 🤮' },
            landmark: { zh: '藍湖溫泉（泡湯聖地）、冰川健行 🏔️', en: 'Blue Lagoon (hot spring heaven), glacier hiking 🏔️' },
            other: { zh: '火與冰的國度，夏天太陽不會下山！☀️', en: 'Land of fire & ice, midnight sun in summer! ☀️' }
        },
        bgGradient: 'linear-gradient(135deg, #02529C 0%, #FFFFFF 50%, #DC1E35 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇱🇧', name: '黎巴嫩', nameEn: 'Lebanon', nameJa: 'レバノン', nameKo: '레바논',
        hints: {
            continent: { zh: '亞洲（中東夜生活之王）🎉', en: 'Asia (Middle East party king) 🎉' },
            capital: { zh: '貝魯特（中東小巴黎）🏙️', en: 'Beirut (Paris of Middle East) 🏙️' },
            food: { zh: '胡姆斯Hummus、法拉費超好吃！🧆', en: 'Hummus, falafel so delicious! 🧆' },
            landmark: { zh: '巴貝克神廟（羅馬遺跡）🏛️', en: 'Baalbek temple (Roman ruins) 🏛️' },
            other: { zh: '國旗上有雪松樹，超級稀有！🌲', en: 'Cedar tree on flag, super rare! 🌲' }
        },
        bgGradient: 'linear-gradient(135deg, #EE161F 0%, #FFFFFF 50%, #00A850 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇳🇿', name: '紐西蘭', nameEn: 'New Zealand', nameJa: 'ニュージーランド', nameKo: '뉴질랜드',
        hints: {
            continent: { zh: '大洋洲（魔戒拍攝地）🧙', en: 'Oceania (LOTR filming location) 🧙' },
            capital: { zh: '威靈頓（風大到會吹走）💨', en: 'Wellington (wind so strong you\'ll fly) 💨' },
            food: { zh: 'Manuka蜂蜜超貴、肉派、奇異果！🥝', en: 'Manuka honey expensive, meat pies, kiwis! 🥝' },
            landmark: { zh: '哈比村（魔戒哈比人的家）🏡', en: 'Hobbiton (hobbit homes from LOTR) 🏡' },
            other: { zh: '羊比人多5倍，奇異鳥是國鳥！🐑', en: '5x more sheep than people, kiwi bird mascot! 🐑' }
        },
        bgGradient: 'linear-gradient(135deg, #00247D 0%, #FFFFFF 50%, #CC142B 100%)', difficulty: 'advanced'
    },

    // ============ 極稀有難度 (15個) - 世界人口最少的國家 ============
    {
        emoji: '🇻🇦', name: '梵蒂岡', nameEn: 'Vatican City', nameJa: 'バチカン市国', nameKo: '바티칸',
        hints: {
            continent: { zh: '歐洲（教宗的家）⛪', en: 'Europe (Pope\'s house) ⛪' },
            capital: { zh: '梵蒂岡城（整個國家都是首都）🏛️', en: 'Vatican City (whole country is capital) 🏛️' },
            food: { zh: '披薩？意大利麵？其實很少人住這裡 🍝', en: 'Pizza? Pasta? Actually very few people live here 🍝' },
            landmark: { zh: '聖彼得大教堂（超級壯觀）⛪', en: 'St. Peter\'s Basilica (super magnificent) ⛪' },
            other: { zh: '世界最小國家，只有800人！人口比7-11員工還少！', en: 'World\'s smallest country, only 800 people! Less than 7-11 staff!' }
        },
        bgGradient: 'linear-gradient(135deg, #FFD700 0%, #FFFFFF 100%)', difficulty: 'rarest'
    },
    {
        emoji: '🇳🇷', name: '諾魯', nameEn: 'Nauru', nameJa: 'ナウル', nameKo: '나우루',
        hints: {
            continent: { zh: '大洋洲（最小島國）🏝️', en: 'Oceania (smallest island nation) 🏝️' },
            capital: { zh: '亞倫（沒有正式首都）🤷', en: 'Yaren (no official capital) 🤷' },
            food: { zh: '主要吃罐頭，肥胖率世界第一！🍔', en: 'Mostly canned food, #1 obesity rate! 🍔' },
            landmark: { zh: '鳥糞礦場（曾經超有錢）💩', en: 'Guano mines (used to be super rich) 💩' },
            other: { zh: '人口1.2萬，開車環島只要20分鐘！🚗', en: '12k people, drive around island in 20 mins! 🚗' }
        },
        bgGradient: 'linear-gradient(135deg, #002170 0%, #FFC61E 100%)', difficulty: 'rarest'
    },
    {
        emoji: '🇹🇻', name: '吐瓦魯', nameEn: 'Tuvalu', nameJa: 'ツバル', nameKo: '투발루',
        hints: {
            continent: { zh: '大洋洲（快要沉沒的國家）🌊', en: 'Oceania (sinking nation) 🌊' },
            capital: { zh: '富納富提（海平面上升中）😰', en: 'Funafuti (sea level rising) 😰' },
            food: { zh: '椰子、魚、taro芋頭 🥥', en: 'Coconuts, fish, taro 🥥' },
            landmark: { zh: '沒什麼特別的，整個國家都在海裡了 🏊', en: 'Nothing special, whole country underwater soon 🏊' },
            other: { zh: '賣網域名稱 .tv 賺錢！人口1.1萬！📺', en: 'Makes money selling .tv domain! 11k people! 📺' }
        },
        bgGradient: 'linear-gradient(135deg, #0093DD 0%, #FFFFFF 50%, #CE1126 100%)', difficulty: 'rarest'
    },
    {
        emoji: '🇵🇼', name: '帛琉', nameEn: 'Palau', nameJa: 'パラオ', nameKo: '팔라우',
        hints: {
            continent: { zh: '大洋洲（水母湖聖地）🪼', en: 'Oceania (Jellyfish Lake heaven) 🪼' },
            capital: { zh: '恩吉魯穆德（超難唸）😅', en: 'Ngerulmud (impossible to pronounce) 😅' },
            food: { zh: '海鮮、蝙蝠湯（敢喝嗎？）🦇', en: 'Seafood, bat soup (dare to try?) 🦇' },
            landmark: { zh: '水母湖、藍洞（潛水天堂）🤿', en: 'Jellyfish Lake, Blue Hole (diving paradise) 🤿' },
            other: { zh: '人口1.8萬，台灣人最愛去的免簽國！🏖️', en: '18k people, Taiwanese favorite visa-free spot! 🏖️' }
        },
        bgGradient: 'linear-gradient(135deg, #4AADD6 0%, #FFDE00 100%)', difficulty: 'rarest'
    },
    {
        emoji: '🇸🇲', name: '聖馬利諾', nameEn: 'San Marino', nameJa: 'サンマリノ', nameKo: '산마리노',
        hints: {
            continent: { zh: '歐洲（被意大利包圍）🇮🇹', en: 'Europe (surrounded by Italy) 🇮🇹' },
            capital: { zh: '聖馬利諾城（山上的小國）⛰️', en: 'San Marino City (tiny mountain nation) ⛰️' },
            food: { zh: '基本上就是意大利菜 🍝', en: 'Basically Italian food 🍝' },
            landmark: { zh: '三座城堡在山頂上 🏰', en: 'Three castles on mountaintop 🏰' },
            other: { zh: '人口3.4萬，世界最古老共和國！🏛️', en: '34k people, world\'s oldest republic! 🏛️' }
        },
        bgGradient: 'linear-gradient(135deg, #5EB6E4 0%, #FFFFFF 100%)', difficulty: 'rarest'
    },
    {
        emoji: '🇱🇮', name: '列支敦士登', nameEn: 'Liechtenstein', nameJa: 'リヒテンシュタイン', nameKo: '리히텐슈타인',
        hints: {
            continent: { zh: '歐洲（瑞士奧地利中間的小國）🏔️', en: 'Europe (tiny country between Swiss & Austria) 🏔️' },
            capital: { zh: '瓦都茲（迷你首都）🏙️', en: 'Vaduz (mini capital) 🏙️' },
            food: { zh: 'Käsknöpfle起司餃子、紅酒 🍷', en: 'Käsknöpfle cheese dumplings, wine 🍷' },
            landmark: { zh: '瓦都茲城堡（王子住的地方）🏰', en: 'Vaduz Castle (prince lives here) 🏰' },
            other: { zh: '人口3.9萬，超級有錢的稅務天堂！💰', en: '39k people, super rich tax haven! 💰' }
        },
        bgGradient: 'linear-gradient(135deg, #002B7F 0%, #CE1126 100%)', difficulty: 'rarest'
    },
    {
        emoji: '🇲🇨', name: '摩納哥', nameEn: 'Monaco', nameJa: 'モナコ', nameKo: '모나코',
        hints: {
            continent: { zh: '歐洲（有錢人的遊樂場）💎', en: 'Europe (rich people playground) 💎' },
            capital: { zh: '摩納哥（整個國家都是首都）🏙️', en: 'Monaco (whole country is capital) 🏙️' },
            food: { zh: '法式高級料理（超級貴）🍽️', en: 'French haute cuisine (super expensive) 🍽️' },
            landmark: { zh: 'F1賽道、蒙地卡羅賭場 🏎️', en: 'F1 track, Monte Carlo Casino 🏎️' },
            other: { zh: '人口3.9萬，億萬富翁密度世界第一！🤑', en: '39k people, #1 billionaire density! 🤑' }
        },
        bgGradient: 'linear-gradient(135deg, #CE1126 0%, #FFFFFF 100%)', difficulty: 'rarest'
    },
    {
        emoji: '🇰🇳', name: '聖克里斯多福及尼維斯', nameEn: 'Saint Kitts and Nevis', nameJa: 'セントクリストファー・ネイビス', nameKo: '세인트키츠 네비스',
        hints: {
            continent: { zh: '北美洲（加勒比海小島）🏝️', en: 'North America (Caribbean tiny island) 🏝️' },
            capital: { zh: '巴斯特爾（迷你首都）🏖️', en: 'Basseterre (mini capital) 🏖️' },
            food: { zh: '龍蝦、鹹魚、甘蔗糖 🦞', en: 'Lobster, saltfish, sugarcane 🦞' },
            landmark: { zh: '硫磺石堡壘（歷史遺跡）🏰', en: 'Brimstone Hill Fortress (historic site) 🏰' },
            other: { zh: '人口5.3萬，買護照就能移民！💼', en: '53k people, buy passport to immigrate! 💼' }
        },
        bgGradient: 'linear-gradient(135deg, #009E49 0%, #CE1126 50%, #FFD100 100%)', difficulty: 'rarest'
    },
    {
        emoji: '🇲🇭', name: '馬紹爾群島', nameEn: 'Marshall Islands', nameJa: 'マーシャル諸島', nameKo: '마셜 제도',
        hints: {
            continent: { zh: '大洋洲（珊瑚礁環礁）🐠', en: 'Oceania (coral atolls) 🐠' },
            capital: { zh: '馬朱羅（海平面很低）🌊', en: 'Majuro (very low sea level) 🌊' },
            food: { zh: '麵包果、椰子蟹、魚 🥥', en: 'Breadfruit, coconut crab, fish 🥥' },
            landmark: { zh: '比基尼環礁（核試驗場）☢️', en: 'Bikini Atoll (nuclear test site) ☢️' },
            other: { zh: '人口5.9萬，泳裝bikini就是這裡命名的！👙', en: '59k people, bikini swimsuit named after here! 👙' }
        },
        bgGradient: 'linear-gradient(135deg, #003893 0%, #FFFFFF 50%, #DD7500 100%)', difficulty: 'rarest'
    },
    {
        emoji: '🇩🇲', name: '多米尼克', nameEn: 'Dominica', nameJa: 'ドミニカ国', nameKo: '도미니카 연방',
        hints: {
            continent: { zh: '北美洲（別跟多明尼加搞混）🌴', en: 'North America (don\'t confuse with Dominican Rep) 🌴' },
            capital: { zh: '羅索（加勒比海秘境）🏝️', en: 'Roseau (Caribbean hidden gem) 🏝️' },
            food: { zh: '山羊水、麵包果、香蕉 🍌', en: 'Goat water, breadfruit, bananas 🍌' },
            landmark: { zh: '沸騰湖（世界第二大）🌋', en: 'Boiling Lake (world\'s 2nd largest) 🌋' },
            other: { zh: '人口7.2萬，神鬼奇航在這拍的！🏴‍☠️', en: '72k people, Pirates of Caribbean filmed here! 🏴‍☠️' }
        },
        bgGradient: 'linear-gradient(135deg, #006B3F 0%, #FFD100 50%, #000000 100%)', difficulty: 'rarest'
    },
    {
        emoji: '🇦🇩', name: '安道爾', nameEn: 'Andorra', nameJa: 'アンドラ', nameKo: '안도라',
        hints: {
            continent: { zh: '歐洲（法國西班牙中間）⛷️', en: 'Europe (between France & Spain) ⛷️' },
            capital: { zh: '安道爾城（滑雪勝地）🎿', en: 'Andorra la Vella (ski resort) 🎿' },
            food: { zh: '燉肉Escudella、法式西班牙混合菜 🍲', en: 'Escudella stew, French-Spanish fusion 🍲' },
            landmark: { zh: '庇里牛斯山滑雪場 🏔️', en: 'Pyrenees ski slopes 🏔️' },
            other: { zh: '人口7.9萬，免稅購物天堂！🛍️', en: '79k people, tax-free shopping paradise! 🛍️' }
        },
        bgGradient: 'linear-gradient(135deg, #0018A8 0%, #FFD100 50%, #D50032 100%)', difficulty: 'rarest'
    },
    {
        emoji: '🇦🇬', name: '安地卡及巴布達', nameEn: 'Antigua and Barbuda', nameJa: 'アンティグア・バーブーダ', nameKo: '앤티가 바부다',
        hints: {
            continent: { zh: '北美洲（365個海灘）🏖️', en: 'North America (365 beaches) 🏖️' },
            capital: { zh: '聖約翰（加勒比海度假勝地）🌴', en: 'St. John\'s (Caribbean vacation spot) 🌴' },
            food: { zh: '鴨腿飯Ducana、龍蝦 🦞', en: 'Ducana, lobster 🦞' },
            landmark: { zh: '尼爾森船塢（海軍歷史）⚓', en: 'Nelson\'s Dockyard (naval history) ⚓' },
            other: { zh: '人口9.8萬，號稱一年365天每天換海灘！☀️', en: '98k people, 365 beaches for every day! ☀️' }
        },
        bgGradient: 'linear-gradient(135deg, #CE1126 0%, #FFFFFF 50%, #0072C6 100%)', difficulty: 'rarest'
    },
    {
        emoji: '🇸🇨', name: '塞席爾', nameEn: 'Seychelles', nameJa: 'セーシェル', nameKo: '세이셸',
        hints: {
            continent: { zh: '非洲（印度洋天堂）🏝️', en: 'Africa (Indian Ocean paradise) 🏝️' },
            capital: { zh: '維多利亞（世界最小首都之一）🏙️', en: 'Victoria (one of world\'s smallest capitals) 🏙️' },
            food: { zh: '克里奧咖哩、椰子咖哩、魚 🐟', en: 'Creole curry, coconut curry, fish 🐟' },
            landmark: { zh: '拉迪格島（絕美海灘）🌊', en: 'La Digue Island (stunning beaches) 🌊' },
            other: { zh: '人口9.8萬，蜜月聖地超級美！💑', en: '98k people, honeymoon destination super beautiful! 💑' }
        },
        bgGradient: 'linear-gradient(135deg, #003F87 0%, #FCD856 50%, #D62828 100%)', difficulty: 'rarest'
    },
    {
        emoji: '🇻🇨', name: '聖文森及格瑞那丁', nameEn: 'Saint Vincent and the Grenadines', nameJa: 'セントビンセント・グレナディーン', nameKo: '세인트빈센트 그레나딘',
        hints: {
            continent: { zh: '北美洲（加勒比小島鏈）🏝️', en: 'North America (Caribbean island chain) 🏝️' },
            capital: { zh: '金斯敦（火山島）🌋', en: 'Kingstown (volcanic island) 🌋' },
            food: { zh: '麵包果、烤香蕉、魚湯 🐟', en: 'Breadfruit, roasted plantains, fish soup 🐟' },
            landmark: { zh: '蘇弗里耶火山（還在活動）🌋', en: 'La Soufrière volcano (still active) 🌋' },
            other: { zh: '人口11.1萬，神鬼奇航拍攝地！🏴‍☠️', en: '111k people, Pirates of Caribbean location! 🏴‍☠️' }
        },
        bgGradient: 'linear-gradient(135deg, #0072C6 0%, #FFD100 50%, #009E49 100%)', difficulty: 'rarest'
    },
    {
        emoji: '🇬🇩', name: '格瑞那達', nameEn: 'Grenada', nameJa: 'グレナダ', nameKo: '그레나다',
        hints: {
            continent: { zh: '北美洲（香料之島）🌶️' },
            capital: { zh: '聖喬治（彩色房子超美）🎨' },
            food: { zh: '肉豆蔻、可可、Oil Down燉菜 🥘' },
            landmark: { zh: '大安斯海灘（世界最美海灘）🏖️' },
            other: { zh: '人口11.3萬，世界肉豆蔻產量第二！🌰' }
        },
        bgGradient: 'linear-gradient(135deg, #CE1126 0%, #FFD100 50%, #007A5E 100%)', difficulty: 'rarest'
    },
    // ============ 非洲國家 ============
    {
        emoji: '🇪🇬', name: '埃及',
        hints: {
            continent: { zh: '非洲（金字塔發源地）🔺' },
            capital: { zh: '開羅（尼羅河畔）🏜️' },
            food: { zh: '庫莎里、法拉費爾、烤肉串 🥙' },
            landmark: { zh: '吉薩金字塔、獅身人面像 🗿' },
            other: { zh: '人口1億，古文明發源地！📜' }
        },
        bgGradient: 'linear-gradient(135deg, #CE1126 0%, #FFFFFF 50%, #000000 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇿🇦', name: '南非',
        hints: {
            continent: { zh: '非洲（彩虹之國）🌈' },
            capital: { zh: '三個首都：開普敦、普勒托利亞、布隆泉 🏛️' },
            food: { zh: 'Biltong肉乾、烤肉Braai 🍖' },
            landmark: { zh: '桌山、好望角 🏔️' },
            other: { zh: '人口6000萬，曼德拉的故鄉！' }
        },
        bgGradient: 'linear-gradient(135deg, #007A4D 0%, #FFB81C 50%, #001489 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇳🇬', name: '奈及利亞',
        hints: {
            continent: { zh: '非洲（人口最多）👨‍👩‍👧‍👦' },
            capital: { zh: '阿布賈（新首都）🏙️' },
            food: { zh: 'Jollof飯、Suya烤肉 🍚' },
            landmark: { zh: '拉各斯（經濟中心）、祖馬岩 🪨' },
            other: { zh: '人口2.2億，非洲人口第一！' }
        },
        bgGradient: 'linear-gradient(135deg, #008751 0%, #FFFFFF 50%, #008751 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇰🇪', name: '肯亞',
        hints: {
            continent: { zh: '非洲（野生動物天堂）🦁' },
            capital: { zh: '奈洛比（東非門戶）🌍' },
            food: { zh: 'Ugali玉米糊、Nyama Choma烤肉 🥩' },
            landmark: { zh: '馬賽馬拉、吉力馬札羅山 🏔️' },
            other: { zh: '人口5400萬，Safari發源地！🦒' }
        },
        bgGradient: 'linear-gradient(135deg, #000000 0%, #BB0000 50%, #007A33 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇲🇦', name: '摩洛哥',
        hints: {
            continent: { zh: '非洲（北非明珠）🕌' },
            capital: { zh: '拉巴特（皇城）👑' },
            food: { zh: '塔吉鍋、庫斯庫斯、薄荷茶 🫖' },
            landmark: { zh: '馬拉喀什、藍色小鎮舍夫沙萬 🔵' },
            other: { zh: '人口3700萬，阿拉伯風情超美！' }
        },
        bgGradient: 'linear-gradient(135deg, #C1272D 0%, #006233 50%, #C1272D 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇪🇹', name: '衣索比亞',
        hints: {
            continent: { zh: '非洲（咖啡發源地）☕' },
            capital: { zh: '阿迪斯阿貝巴（非洲聯盟總部）🏛️' },
            food: { zh: '英吉拉薄餅、咖啡儀式 ☕' },
            landmark: { zh: '拉利貝拉岩石教堂 ⛪' },
            other: { zh: '人口1.2億，從未被殖民！💪' }
        },
        bgGradient: 'linear-gradient(135deg, #078930 0%, #FCDD09 50%, #DA121A 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇬🇭', name: '迦納',
        hints: {
            continent: { zh: '非洲（黃金海岸）🏆' },
            capital: { zh: '阿克拉（西非門戶）🌊' },
            food: { zh: 'Jollof飯、Fufu木薯糊 🍚' },
            landmark: { zh: '海岸角城堡（奴隸貿易遺址）🏰' },
            other: { zh: '人口3200萬，可可產量世界第二！🍫' }
        },
        bgGradient: 'linear-gradient(135deg, #CE1126 0%, #FCD116 50%, #006B3F 100%)', difficulty: 'advanced'
    },
    // ============ 南美洲國家 ============
    {
        emoji: '🇺🇾', name: '烏拉圭',
        hints: {
            continent: { zh: '南美洲（足球王國）⚽' },
            capital: { zh: '蒙特維多（南美瑞士）🏙️' },
            food: { zh: '烤牛肉Asado、Mate茶 🥩' },
            landmark: { zh: '埃斯特角城、科洛尼亞老城 🏖️' },
            other: { zh: '人口340萬，兩屆世界盃冠軍！🏆' }
        },
        bgGradient: 'linear-gradient(135deg, #0038A8 0%, #FFFFFF 50%, #FCD116 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇵🇾', name: '巴拉圭',
        hints: {
            continent: { zh: '南美洲（內陸國）🌳' },
            capital: { zh: '亞松森（河港首都）🛶' },
            food: { zh: 'Sopa paraguaya玉米餅、烤牛肉 🌽' },
            landmark: { zh: '伊瓜蘇瀑布、耶穌會遺址 💦' },
            other: { zh: '人口710萬，國旗正反面不同！🚩' }
        },
        bgGradient: 'linear-gradient(135deg, #D52B1E 0%, #FFFFFF 50%, #0038A8 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇪🇨', name: '厄瓜多',
        hints: {
            continent: { zh: '南美洲（赤道之國）🌎' },
            capital: { zh: '基多（世界遺產首都）🏔️' },
            food: { zh: 'Ceviche檸檬魚、炸香蕉 🐟' },
            landmark: { zh: '加拉巴哥群島（達爾文研究地）🐢' },
            other: { zh: '人口1800萬，赤道紀念碑超酷！' }
        },
        bgGradient: 'linear-gradient(135deg, #FFD100 0%, #0072CE 50%, #EF3340 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇧🇴', name: '玻利維亞',
        hints: {
            continent: { zh: '南美洲（天空之鏡）✨' },
            capital: { zh: '拉巴斯（世界最高首都）🏔️' },
            food: { zh: 'Salteñas餡餅、Llama肉 🥟' },
            landmark: { zh: '烏尤尼鹽沼（天空之鏡）🪞' },
            other: { zh: '人口1200萬，鹽沼超夢幻！' }
        },
        bgGradient: 'linear-gradient(135deg, #D52B1E 0%, #FFD100 50%, #007934 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇻🇪', name: '委內瑞拉',
        hints: {
            continent: { zh: '南美洲（石油王國）🛢️' },
            capital: { zh: '卡拉卡斯（山城首都）🏙️' },
            food: { zh: 'Arepa玉米餅、Pabellón燉肉 🌮' },
            landmark: { zh: '天使瀑布（世界最高瀑布）💦' },
            other: { zh: '人口2800萬，石油儲量世界第一！' }
        },
        bgGradient: 'linear-gradient(135deg, #FFD100 0%, #00247D 50%, #CF142B 100%)', difficulty: 'intermediate'
    },
    // ============ 中美洲和加勒比海 ============
    {
        emoji: '🇨🇺', name: '古巴',
        hints: {
            continent: { zh: '北美洲（雪茄之島）🚬' },
            capital: { zh: '哈瓦那（老爺車之都）🚗' },
            food: { zh: 'Ropa Vieja燉肉、莫西多調酒 🍹' },
            landmark: { zh: '老哈瓦那、切·格瓦拉紀念館 🏛️' },
            other: { zh: '人口1100萬，雪茄和蘭姆酒世界聞名！' }
        },
        bgGradient: 'linear-gradient(135deg, #002A8F 0%, #FFFFFF 50%, #CF142B 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇯🇲', name: '牙買加',
        hints: {
            continent: { zh: '北美洲（雷鬼音樂發源地）🎵' },
            capital: { zh: '京斯敦（Bob Marley故鄉）🎸' },
            food: { zh: 'Jerk Chicken辣雞、Ackee水果 🍗' },
            landmark: { zh: '鄧恩河瀑布、藍山咖啡產地 ☕' },
            other: { zh: '人口290萬，短跑王國Usain Bolt！⚡' }
        },
        bgGradient: 'linear-gradient(135deg, #009B3A 0%, #FFD100 50%, #000000 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇭🇹', name: '海地',
        hints: {
            continent: { zh: '北美洲（第一個黑人共和國）✊' },
            capital: { zh: '太子港（加勒比海港）🏝️' },
            food: { zh: 'Griot炸豬肉、Pikliz醃菜 🥩' },
            landmark: { zh: '城堡拉費里耶（世界遺產）🏰' },
            other: { zh: '人口1140萬，第一個獨立的黑人國家！' }
        },
        bgGradient: 'linear-gradient(135deg, #00209F 0%, #D21034 50%, #00209F 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇩🇴', name: '多明尼加',
        hints: {
            continent: { zh: '北美洲（加勒比度假天堂）🏖️' },
            capital: { zh: '聖多明哥（最古老歐洲城市）🏛️' },
            food: { zh: 'Sancocho燉湯、Mangu香蕉泥 🍌' },
            landmark: { zh: 'Punta Cana海灘、殖民區 🌴' },
            other: { zh: '人口1100萬，棒球強國！⚾' }
        },
        bgGradient: 'linear-gradient(135deg, #002D62 0%, #FFFFFF 50%, #CE1126 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇨🇷', name: '哥斯大黎加',
        hints: {
            continent: { zh: '北美洲（生態天堂）🦜' },
            capital: { zh: '聖荷西（咖啡之都）☕' },
            food: { zh: 'Gallo Pinto飯豆、Casado套餐 🍚' },
            landmark: { zh: '阿雷納火山、雲霧森林 🌋' },
            other: { zh: '人口510萬，全球最幸福國家之一！😊' }
        },
        bgGradient: 'linear-gradient(135deg, #002B7F 0%, #FFFFFF 50%, #CE1126 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇵🇦', name: '巴拿馬',
        hints: {
            continent: { zh: '北美洲（運河之國）🚢' },
            capital: { zh: '巴拿馬市（金融中心）🏙️' },
            food: { zh: 'Sancocho雞湯、Ceviche檸檬魚 🐟' },
            landmark: { zh: '巴拿馬運河（世界工程奇蹟）⚓' },
            other: { zh: '人口430萬，連接太平洋和大西洋！' }
        },
        bgGradient: 'linear-gradient(135deg, #005293 0%, #FFFFFF 50%, #D21034 100%)', difficulty: 'intermediate'
    },
    // ============ 更多亞洲國家 ============
    {
        emoji: '🇧🇩', name: '孟加拉',
        hints: {
            continent: { zh: '亞洲（人口超密集）👥' },
            capital: { zh: '達卡（紡織工業中心）🏭' },
            food: { zh: 'Biryani香料飯、Hilsa魚咖哩 🐟' },
            landmark: { zh: '孫德爾本斯紅樹林、考克斯巴扎爾海灘 🌊' },
            other: { zh: '人口1.7億，世界最大三角洲！' }
        },
        bgGradient: 'linear-gradient(135deg, #006A4E 0%, #F42A41 50%, #006A4E 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇵🇰', name: '巴基斯坦',
        hints: {
            continent: { zh: '亞洲（伊斯蘭核武國）☪️' },
            capital: { zh: '伊斯蘭馬巴德（計畫首都）🕌' },
            food: { zh: 'Biryani飯、Nihari燉肉、Chapati餅 🍛' },
            landmark: { zh: 'K2峰（世界第二高）、拉合爾古堡 🏔️' },
            other: { zh: '人口2.3億，板球超熱門！🏏' }
        },
        bgGradient: 'linear-gradient(135deg, #01411C 0%, #FFFFFF 50%, #01411C 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇱🇰', name: '斯里蘭卡',
        hints: {
            continent: { zh: '亞洲（錫蘭紅茶之國）☕' },
            capital: { zh: '可倫坡（商業中心）🏙️' },
            food: { zh: 'Kottu麵包炒、咖哩、紅茶 🫖' },
            landmark: { zh: '獅子岩、康提佛牙寺 🦁' },
            other: { zh: '人口2200萬，世界最好紅茶產地！' }
        },
        bgGradient: 'linear-gradient(135deg, #FFB81C 0%, #8B0000 50%, #FFB81C 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇲🇲', name: '緬甸',
        hints: {
            continent: { zh: '亞洲（千塔之國）🛕' },
            capital: { zh: '奈比多（新首都）🏛️' },
            food: { zh: 'Mohinga魚湯麵、茶葉沙拉 🍜' },
            landmark: { zh: '仰光大金寺、蒲甘佛塔群 ⛩️' },
            other: { zh: '人口5400萬，翡翠產量世界第一！💎' }
        },
        bgGradient: 'linear-gradient(135deg, #FECB00 0%, #34B233 50%, #EA2839 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇰🇭', name: '柬埔寨',
        hints: {
            continent: { zh: '亞洲（吳哥窟之國）🛕' },
            capital: { zh: '金邊（湄公河畔）🏙️' },
            food: { zh: 'Amok咖哩、炒麵Lok Lak 🍛' },
            landmark: { zh: '吳哥窟（世界奇蹟）、洞里薩湖 🏛️' },
            other: { zh: '人口1700萬，高棉文化燦爛！' }
        },
        bgGradient: 'linear-gradient(135deg, #032EA1 0%, #E00025 50%, #032EA1 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇱🇦', name: '寮國',
        hints: {
            continent: { zh: '亞洲（內陸國佛教國）🙏' },
            capital: { zh: '永珍（湄公河首都）🏙️' },
            food: { zh: 'Larb肉末、糯米飯、青木瓜沙拉 🥗' },
            landmark: { zh: '龍坡邦古城、石缸平原 🏺' },
            other: { zh: '人口750萬，東南亞唯一內陸國！' }
        },
        bgGradient: 'linear-gradient(135deg, #CE1126 0%, #002868 50%, #FFFFFF 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇳🇵', name: '尼泊爾',
        hints: {
            continent: { zh: '亞洲（世界屋脊）🏔️' },
            capital: { zh: '加德滿都（寺廟之城）🕉️' },
            food: { zh: 'Momo餃子、Dal Bhat扁豆飯 🥟' },
            landmark: { zh: '聖母峰（世界第一高）、博卡拉湖 ⛰️' },
            other: { zh: '人口3000萬，世界唯一非矩形國旗！🚩' }
        },
        bgGradient: 'linear-gradient(135deg, #DC143C 0%, #003893 50%, #DC143C 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇧🇹', name: '不丹',
        hints: {
            continent: { zh: '亞洲（幸福王國）😊' },
            capital: { zh: '廷布（無紅綠燈首都）🚦' },
            food: { zh: 'Ema Datshi辣椒起司、紅米 🌶️' },
            landmark: { zh: '虎穴寺、普納卡宗 🏔️' },
            other: { zh: '人口78萬，全球最幸福國家！💚' }
        },
        bgGradient: 'linear-gradient(135deg, #FF4E12 0%, #FFD520 50%, #FF4E12 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇲🇳', name: '蒙古',
        hints: {
            continent: { zh: '亞洲（游牧民族）🐎' },
            capital: { zh: '烏蘭巴托（草原首都）🏕️' },
            food: { zh: 'Buuz包子、羊肉、奶茶 🥟' },
            landmark: { zh: '成吉思汗雕像、戈壁沙漠 🏜️' },
            other: { zh: '人口340萬，人口密度全球最低！' }
        },
        bgGradient: 'linear-gradient(135deg, #DA2032 0%, #0066B3 50%, #DA2032 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇦🇫', name: '阿富汗',
        hints: {
            continent: { zh: '亞洲（內陸山國）⛰️' },
            capital: { zh: '喀布爾（興都庫什山下）🏔️' },
            food: { zh: 'Kabuli Pilau抓飯、烤肉串 🍚' },
            landmark: { zh: '巴米揚大佛遺址（已毀）、藍色清真寺 🕌' },
            other: { zh: '人口4000萬，曾是絲路要道！' }
        },
        bgGradient: 'linear-gradient(135deg, #000000 0%, #D32011 50%, #007A3D 100%)', difficulty: 'advanced'
    },
    // ============ 中東國家 ============
    {
        emoji: '🇮🇶', name: '伊拉克',
        hints: {
            continent: { zh: '亞洲（兩河流域文明）🏺' },
            capital: { zh: '巴格達（千年古城）🕌' },
            food: { zh: 'Masgouf烤魚、Dolma捲葉 🐟' },
            landmark: { zh: '巴比倫遺址、兩河流域 🌊' },
            other: { zh: '人口4200萬，美索不達米亞文明發源地！' }
        },
        bgGradient: 'linear-gradient(135deg, #CE1126 0%, #FFFFFF 50%, #007A3D 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇸🇾', name: '敘利亞',
        hints: {
            continent: { zh: '亞洲（古文明搖籃）🏛️' },
            capital: { zh: '大馬士革（世界最古老首都）🕌' },
            food: { zh: 'Kibbeh肉丸、Fattoush沙拉 🥗' },
            landmark: { zh: '帕米拉古城、阿勒坡古堡 🏰' },
            other: { zh: '人口2200萬，大馬士革玫瑰聞名！🌹' }
        },
        bgGradient: 'linear-gradient(135deg, #CE1126 0%, #FFFFFF 50%, #007A3D 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇱🇧', name: '黎巴嫩',
        hints: {
            continent: { zh: '亞洲（中東巴黎）🌲' },
            capital: { zh: '貝魯特（地中海明珠）🏖️' },
            food: { zh: 'Hummus鷹嘴豆泥、Tabbouleh沙拉 🥗' },
            landmark: { zh: '雪松森林、巴勒貝克神廟 🏛️' },
            other: { zh: '人口680萬，雪松是國寶！🌲' }
        },
        bgGradient: 'linear-gradient(135deg, #EE161F 0%, #FFFFFF 50%, #00A651 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇯🇴', name: '約旦',
        hints: {
            continent: { zh: '亞洲（沙漠王國）🏜️' },
            capital: { zh: '安曼（古羅馬遺址）🏛️' },
            food: { zh: 'Mansaf羊肉飯、Falafel炸豆丸 🍖' },
            landmark: { zh: '佩特拉古城（玫瑰之城）、死海 🏺' },
            other: { zh: '人口1100萬，死海是世界最低點！' }
        },
        bgGradient: 'linear-gradient(135deg, #000000 0%, #FFFFFF 50%, #007A3D 100%)', difficulty: 'intermediate'
    },
    {
        emoji: '🇾🇪', name: '葉門',
        hints: {
            continent: { zh: '亞洲（阿拉伯半島南端）🏜️' },
            capital: { zh: '沙那（世界遺產之城）🕌' },
            food: { zh: 'Saltah燉肉、Fahsa湯 🍲' },
            landmark: { zh: '希巴姆古城（沙漠曼哈頓）🏛️' },
            other: { zh: '人口3200萬，摩卡咖啡發源地！☕' }
        },
        bgGradient: 'linear-gradient(135deg, #CE1126 0%, #FFFFFF 50%, #000000 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇴🇲', name: '阿曼',
        hints: {
            continent: { zh: '亞洲（香料之路）🌶️' },
            capital: { zh: '馬斯喀特（港口城市）⚓' },
            food: { zh: 'Shuwa慢烤羊肉、椰棗 🌴' },
            landmark: { zh: '蘇丹卡布斯大清真寺、尼日瓦堡 🕌' },
            other: { zh: '人口520萬，乳香產地！' }
        },
        bgGradient: 'linear-gradient(135deg, #FFFFFF 0%, #FF0000 50%, #008000 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇰🇼', name: '科威特',
        hints: {
            continent: { zh: '亞洲（石油富國）🛢️' },
            capital: { zh: '科威特市（波斯灣明珠）🏙️' },
            food: { zh: 'Machboos香料飯、烤羊肉 🍛' },
            landmark: { zh: '科威特塔、大清真寺 🗼' },
            other: { zh: '人口430萬，人均GDP超高！💰' }
        },
        bgGradient: 'linear-gradient(135deg, #007A3D 0%, #FFFFFF 50%, #CE1126 100%)', difficulty: 'advanced'
    },
    {
        emoji: '🇧🇭', name: '巴林',
        hints: {
            continent: { zh: '亞洲（F1賽車之國）🏎️' },
            capital: { zh: '麥納瑪（金融中心）🏙️' },
            food: { zh: 'Machboos飯、Muhammar甜米 🍚' },
            landmark: { zh: 'F1賽道、巴林堡 🏰' },
            other: { zh: '人口170萬，波斯灣群島國！🏝️' }
        },
        bgGradient: 'linear-gradient(135deg, #FFFFFF 0%, #CE1126 50%, #FFFFFF 100%)', difficulty: 'rarest'
    },
    {
        emoji: '🇶🇦', name: '卡達',
        hints: {
            continent: { zh: '亞洲（2022世界盃主辦國）⚽' },
            capital: { zh: '杜哈（未來之城）🏙️' },
            food: { zh: 'Machboos飯、Harees麥粥 🍚' },
            landmark: { zh: '伊斯蘭藝術博物館、珍珠島 🏛️' },
            other: { zh: '人口290萬，人均GDP世界前三！💎' }
        },
        bgGradient: 'linear-gradient(135deg, #8D1B3D 0%, #FFFFFF 50%, #8D1B3D 100%)', difficulty: 'advanced'
    },
];

// 遊戲狀態
let gameState = {
    playerName: '',    difficulty: 'beginner', // 保留以支援舊模式
    gameMode: 'stage', // 'stage' 或 'classic'
    currentStage: 1,
    currentQuestion: 0,
    totalScore: 0,
    correctAnswers: 0,
    lives: 3,
    maxScoreForCurrentQuestion: 10,
    hintsUsed: 0,
    hintOrder: [], // 當前題目的提示順序
    questions: [],
    currentAnswer: null,
    currentOptions: [],
    completedStages: [], // 已通過的關卡列表
    unlockedStages: 1 // 已解鎖的最高關卡
};

// DOM 元素
const startScreen = document.getElementById('start-screen');
const stageSelectScreen = document.getElementById('stage-select-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const leaderboardScreen = document.getElementById('leaderboard-screen');


// 根據當前語言獲取國家名稱
function getCountryName(country) {
    return country.name; // 只返回中文名稱
}

// 設置背景漸層
function setBackground(country) {
    document.body.style.background = country.bgGradient;
}

// 重置背景為預設漸層
function resetBackground() {
    document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}

// 根據難度獲取題目數量（每個難度都是 10 題）
function getQuestionCount(difficulty) {
    return 10;
}

// 根據難度過濾題庫（只選擇該難度的題目，不混合）
function getQuestionsByDifficulty(difficulty) {
    // 只過濾該難度的題目，每個難度有完全不同的 10 個國家
    const filtered = flagDatabase.filter(f => f.difficulty === difficulty);

    // 打亂順序並返回所有題目（已經是 10 題）
    return filtered.sort(() => Math.random() - 0.5);
}

// 生成選項（1個正確答案 + 3個錯誤答案）
function generateOptions(correctAnswer) {
    const options = [correctAnswer];
    const otherCountries = flagDatabase.filter(country => country.name !== correctAnswer.name);
    const shuffledOthers = [...otherCountries].sort(() => Math.random() - 0.5);

    for (let i = 0; i < 3 && i < shuffledOthers.length; i++) {
        options.push(shuffledOthers[i]);
    }

    return options.sort(() => Math.random() - 0.5);
}

// 創建選項按鈕
function createOptionButtons(options) {
    const optionsArea = document.getElementById('options-area');
    optionsArea.innerHTML = '';

    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = getCountryName(option);
        button.onclick = () => selectAnswer(option.name, button);
        optionsArea.appendChild(button);
    });
}

// 搞笑的答對訊息
const correctMessages = [
    '🎉 天才！國旗大師就是你！',
    '🔥 太強了！你是不是偷看地圖了？',
    '⭐ 答對了！給你一朵小紅花！',
    '🎊 哇塞！你該不會是地理老師吧？',
    '💯 完美！連我媽都沒你厲害！',
    '🏆 神人！這題難不倒你！',
    '✨ 厲害炸了！考慮去參加益智節目嗎？',
    '🎯 正確！你是國旗界的福爾摩斯！'
];

const wrongMessages = [
    '❌ 哎呀！要不要回去重讀地理課本？',
    '💔 錯了！但沒關係，我們都會犯錯...',
    '😅 啊嘶～這題有點難啦！',
    '🤦 不是這個啦！建議多旅行增廣見聞！',
    '😢 GG！下次記得用提示！',
    '🙈 答錯了！別灰心，至少你很勇敢！',
    '💥 撞牆了！正確答案是：',
    '😵 哎唷～差一點就對了（其實差很多）'
];

// 選擇答案
function selectAnswer(selectedName, buttonElement) {
    const correctAnswer = gameState.currentAnswer.name;
    const isCorrect = selectedName === correctAnswer;

    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    // 禁用所有提示按鈕
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`hint-btn-${i}`).disabled = true;
    }

    const feedback = document.getElementById('feedback');

    if (isCorrect) {
        // 播放答對音效
        SoundManager.playCorrect();

        buttonElement.classList.add('correct');
        gameState.totalScore += gameState.maxScoreForCurrentQuestion;
        gameState.correctAnswers++; // 增加答對計數

        // 更新成就統計
        const stats = AchievementManager.getStats();
        stats.currentCombo = (stats.currentCombo || 0) + 1;
        stats.maxCombo = Math.max(stats.maxCombo || 0, stats.currentCombo);
        stats.totalScore = (stats.totalScore || 0) + gameState.maxScoreForCurrentQuestion;

        // 檢查是否為完美答題（沒用提示且答對）
        if (gameState.hintsUsed === 0 && gameState.maxScoreForCurrentQuestion === 10) {
            stats.perfectAnswers = (stats.perfectAnswers || 0) + 1;
        }

        AchievementManager.updateStats(stats);

        const countryName = getCountryName(gameState.currentAnswer);

        // 隨機選擇一個搞笑答對訊息
        const messages = correctMessages;
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];

        feedback.textContent = `${randomMsg} 這是${countryName}的國旗！獲得 ${gameState.maxScoreForCurrentQuestion} 分！`;
        feedback.className = 'feedback correct';
        feedback.classList.remove('hidden');
    } else {
        // 播放答錯音效
        SoundManager.playWrong();

        // 重置連勝計數
        const stats = AchievementManager.getStats();
        stats.currentCombo = 0;
        AchievementManager.saveStats(stats);

        buttonElement.classList.add('wrong');

        allButtons.forEach(btn => {
            const btnCountry = gameState.questions.find(q =>
                getCountryName(q) === btn.textContent
            );
            if (btnCountry && btnCountry.name === correctAnswer) {
                btn.classList.add('correct');
            }
        });

        gameState.lives--;
        const countryName = getCountryName(gameState.currentAnswer);

        // 隨機選擇一個搞笑答錯訊息
        const messages = wrongMessages;
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];

        feedback.textContent = `${randomMsg} ${countryName}`;
        feedback.className = 'feedback wrong';
        feedback.classList.remove('hidden');
        updateLivesDisplay();
    }

    document.getElementById('current-score').textContent = gameState.totalScore;
    document.getElementById('next-btn').classList.remove('hidden');
}

// 更新 UI 語言


// 載入關卡進度
function loadStageProgress() {
    const progress = ProgressManager.loadStageProgress();
    gameState.unlockedStages = progress.unlockedStages;
    gameState.completedStages = progress.completedStages;
}

// 儲存關卡進度
function saveStageProgress() {
    ProgressManager.saveStageProgress(gameState.unlockedStages, gameState.completedStages);
}

// 進入關卡選擇畫面
function enterStageSelect() {
    const nameInput = document.getElementById('name-input');
    if (!nameInput.value.trim()) {
        alert('請輸入您的名稱！');
        return;
    }

    gameState.playerName = nameInput.value.trim();
    gameState.gameMode = 'stage';

    // 保存玩家名稱
    ProgressManager.savePlayerName(gameState.playerName);

    // 載入關卡進度
    loadStageProgress();

    startScreen.classList.add('hidden');
    stageSelectScreen.classList.remove('hidden');

    renderStages();
}

// 渲染關卡卡片
function renderStages() {
    const container = document.getElementById('stages-container');
    container.innerHTML = '';

    stageConfig.forEach((stage) => {
        const isUnlocked = stage.id <= gameState.unlockedStages;
        const isCompleted = gameState.completedStages.includes(stage.id); // 是否已通過
        const card = document.createElement('div');
        card.className = `stage-card ${isUnlocked ? 'unlocked' : 'locked'}`;

        if (isUnlocked) {
            card.onclick = () => startStage(stage.id);
        }


        // 顯示邏輯：通過顯示✅，解鎖但未通過顯示🎮，未解鎖顯示🔒
        let statusIcon;
        if (isCompleted) {
            statusIcon = '✅';
        } else if (isUnlocked) {
            statusIcon = '🎮';
        } else {
            statusIcon = '🔒';
        }

        card.innerHTML = `
            <div class="stage-header">
                <div class="stage-name">${stage.name.zh}</div>
                <div class="stage-lock">${statusIcon}</div>
            </div>
            <div class="stage-description">${stage.description.zh}</div>
            <div class="stage-info">
                <div class="stage-info-item">
                    📝 <strong>${stage.totalQuestions}</strong> 題
                </div>
                <div class="stage-info-item">
                    ✨ 需答對 <strong>${stage.requiredCorrect}</strong> 題
                </div>
                <div class="stage-info-item">
                    ❤️ <strong>${stage.lives}</strong> 次機會
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

// 開始指定關卡
function startStage(stageId) {
    const stage = stageConfig.find(s => s.id === stageId);
    if (!stage) return;

    gameState.currentStage = stageId;
    gameState.currentQuestion = 0;
    gameState.totalScore = 0;
    gameState.correctAnswers = 0;
    gameState.lives = stage.lives;

    // 使用預先定義的國家索引，確保每個關卡的國家不重複
    const selectedQuestions = stage.countryIndices.map(index => flagDatabase[index]);

    // 使用 Fisher-Yates 洗牌打亂題目順序
    for (let i = selectedQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selectedQuestions[i], selectedQuestions[j]] = [selectedQuestions[j], selectedQuestions[i]];
    }

    gameState.questions = selectedQuestions;

    // 更新關卡資訊顯示
    document.getElementById('stage-number').textContent = `第 ${stageId} 關`;
    document.getElementById('stage-name').textContent = stage.name.zh;

    stageSelectScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    endScreen.classList.add('hidden');

    loadQuestion();
}

// 開始遊戲
function startGame() {
    const nameInput = document.getElementById('name-input');
    if (!nameInput.value.trim()) {
        alert('請輸入您的名稱！');
        return;
    }

    gameState.playerName = nameInput.value.trim();
    gameState.currentQuestion = 0;
    gameState.totalScore = 0;
    gameState.lives = 3;
    gameState.questions = getQuestionsByDifficulty(gameState.difficulty);

    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    endScreen.classList.add('hidden');

    loadQuestion();
}

// 載入題目
function loadQuestion() {
    if (gameState.currentQuestion >= gameState.questions.length || gameState.lives <= 0) {
        endGame();
        return;
    }

    gameState.hintsUsed = 0;
    gameState.maxScoreForCurrentQuestion = 10;
    gameState.currentAnswer = gameState.questions[gameState.currentQuestion];

    // 生成隨機提示順序（洲別、首都、食物）
    gameState.hintOrder = ['continent', 'capital', 'food'].sort(() => Math.random() - 0.5);

    setBackground(gameState.currentAnswer);

    document.getElementById('question-number').textContent = gameState.currentQuestion + 1;
    document.getElementById('total-questions').textContent = gameState.questions.length;
    document.getElementById('current-score').textContent = gameState.totalScore;
    updateLivesDisplay();
    document.getElementById('max-score').textContent = gameState.maxScoreForCurrentQuestion;

    document.getElementById('flag-emoji').textContent = gameState.currentAnswer.emoji;

    gameState.currentOptions = generateOptions(gameState.currentAnswer);
    createOptionButtons(gameState.currentOptions);

    // 清空並隱藏所有提示
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`hint${i}`).classList.add('hidden');
        document.getElementById(`hint${i}`).textContent = '';
        document.getElementById(`hint-btn-${i}`).disabled = false;
    }

    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');
}

// 更新生命值顯示
function updateLivesDisplay() {
    document.getElementById('lives').textContent = '❤️'.repeat(gameState.lives);
}

// 顯示提示（3 個提示隨機顯示）
function showHint(hintNumber) {
    if (hintNumber > gameState.hintsUsed + 1 || hintNumber > 3) {
        // 必須按順序使用提示，且最多3個
        return;
    }

    // 播放提示音效
    SoundManager.playHint();

    gameState.hintsUsed = hintNumber;

    // 更新成就統計 - 提示使用次數
    const stats = AchievementManager.getStats();
    stats.totalHints = (stats.totalHints || 0) + 1;
    AchievementManager.updateStats(stats);

    // 根據使用的提示數量計算分數
    // 索引: 0個提示=10分, 1個提示=8分, 2個提示=5分, 3個提示=3分
    const scoreReductions = [10, 8, 5, 3];
    gameState.maxScoreForCurrentQuestion = scoreReductions[hintNumber];
    document.getElementById('max-score').textContent = gameState.maxScoreForCurrentQuestion;

    // 獲取當前提示編號對應的提示類型
    const hintType = gameState.hintOrder[hintNumber - 1];
    const hintData = gameState.currentAnswer.hints[hintType];
    const hintText = hintData.zh;

    // 提示類型的標籤
    const hintLabels = {
        continent: '洲別',
        capital: '首都',
        food: '特色食物',
        landmark: '地標',
        other: '其他'
    };

    const label = hintLabels[hintType];

    // 顯示提示
    document.getElementById(`hint${hintNumber}`).textContent = `💡 ${label}：${hintText}`;
    document.getElementById(`hint${hintNumber}`).classList.remove('hidden');
    document.getElementById(`hint-btn-${hintNumber}`).disabled = true;
}

// 下一題
function nextQuestion() {
    gameState.currentQuestion++;
    loadQuestion();
}

// 結束遊戲
function endGame() {
    // 清除當前遊戲進度（遊戲已結束）
    ProgressManager.clearCurrentGame();

    gameScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');

    resetBackground();

    document.getElementById('final-score-value').textContent = gameState.totalScore;

    let title, description;

    // 關卡模式：判斷是否通關
    if (gameState.gameMode === 'stage') {
        const stage = stageConfig.find(s => s.id === gameState.currentStage);
        const passed = gameState.correctAnswers >= stage.requiredCorrect;

        if (passed) {
            // 播放通關音效
            SoundManager.playVictory();

            // 判斷是否為最後一關
            if (gameState.currentStage === stageConfig.length) {
                // 最後一關通關！成為國旗王！
                title = `👑🎉 恭喜！您已成為真正的國旗王！🎉👑`;
                description = `太厲害了！你完成了所有關卡的終極挑戰！\n\n答對了 ${gameState.correctAnswers} 題，總分 ${gameState.totalScore} 分！\n\n你對世界各國國旗瞭若指掌，堪稱國旗大師！`;
            } else {
                // 普通關卡通關
                title = `🎉 恭喜通過 ${stage.name.zh}！`;
                description = `你答對了 ${gameState.correctAnswers} 題，獲得 ${gameState.totalScore} 分！`;

                // 記錄通過並解鎖下一關
                if (!gameState.completedStages.includes(gameState.currentStage)) {
                    gameState.completedStages.push(gameState.currentStage);

                    // 顯示地圖解鎖動畫
                    showMapUnlockAnimation(gameState.currentStage);

                    // 更新成就統計 - 完成關卡數
                    const stats = AchievementManager.getStats();
                    stats.completedStages = gameState.completedStages.length;

                    // 檢查是否為完美通關（全對且無提示）
                    if (gameState.correctAnswers === stage.totalQuestions &&
                        gameState.totalScore === stage.totalQuestions * 10) {
                        stats.perfectRounds = (stats.perfectRounds || 0) + 1;
                    }

                    AchievementManager.updateStats(stats);
                }
                if (gameState.currentStage >= gameState.unlockedStages) {
                    gameState.unlockedStages = gameState.currentStage + 1;
                }
                saveStageProgress();

                description += '\n\n✨ 下一關已解鎖！';

            }
        } else {
            // 失敗
            title = `😢 挑戰失敗`;
            description = `你答對了 ${gameState.correctAnswers} 題，需要答對 ${stage.requiredCorrect} 題才能通過。再接再厲！`;
        }
    } else if (gameState.gameMode === 'daily') {
        // 每日挑戰模式
        SoundManager.playVictory();

        // 儲存今日成績
        DailyChallengeManager.saveTodayScore(gameState.totalScore);

        const totalPossible = gameState.questions.length * 10;
        const percentage = (gameState.totalScore / totalPossible) * 100;

        

        title = '📅 今日挑戰';

        const dailyDesc = {
            zh: `恭喜完成今日挑戰！\n\n答對 ${gameState.correctAnswers} 題，獲得 ${gameState.totalScore} 分！\n\n${percentage >= 80 ? '🌟 太厲害了！' : '💪 繼續加油！'}\n\n明天再來挑戰更高分數！`,
            en: `Congratulations on completing today\'s challenge!\n\nGot ${gameState.correctAnswers} correct, scored ${gameState.totalScore} points!\n\n${percentage >= 80 ? '🌟 Amazing!' : '💪 Keep it up!'}\n\nCome back tomorrow for more!`,
            ja: `本日のチャレンジ完了おめでとう！\n\n${gameState.correctAnswers}問正解、${gameState.totalScore}ポイント獲得！\n\n${percentage >= 80 ? '🌟 素晴らしい！' : '💪 頑張って！'}\n\nまた明日チャレンジしてね！`,
            ko: `오늘의 챌린지 완료를 축하합니다!\n\n${gameState.correctAnswers}문제 정답、${gameState.totalScore}점 획득！\n\n${percentage >= 80 ? '🌟 훌륭해요！' : '💪 힘내세요！'}\n\n내일 또 도전하세요！`
        };

        description = '每天一組全球統一題目，挑戰世界排名！';
    } else {
        // 經典模式
        const totalPossible = gameState.questions.length * 10;
        const percentage = (gameState.totalScore / totalPossible) * 100;

        if (percentage >= 91) {
            title = t('titles.cosmic');
            description = t('titles.cosmicDesc');
        } else if (percentage >= 71) {
            title = t('titles.diplomat');
            description = t('titles.diplomatDesc');
        } else if (percentage >= 51) {
            title = t('titles.collector');
            description = t('titles.collectorDesc');
        } else if (percentage >= 31) {
            title = t('titles.traveler');
            description = t('titles.travelerDesc');
        } else {
            title = t('titles.sailor');
            description = t('titles.sailorDesc');
        }
    }

    document.getElementById('title-badge').textContent = title;
    document.getElementById('title-description').textContent = description;

    // 顯示按鈕邏輯
    const nextStageBtn = document.getElementById('next-stage-btn');
    const backToStageBtn = document.getElementById('back-to-stage-btn');

    if (gameState.gameMode === 'stage') {
        const stage = stageConfig.find(s => s.id === gameState.currentStage);
        const passed = gameState.correctAnswers >= stage.requiredCorrect;

        // 如果通關且還有下一關，顯示"前往下一關"按鈕
        if (passed && gameState.currentStage < stageConfig.length) {
            nextStageBtn.classList.remove('hidden');
        } else {
            nextStageBtn.classList.add('hidden');
        }

        backToStageBtn.classList.remove('hidden');
    } else {
        nextStageBtn.classList.add('hidden');
        backToStageBtn.classList.add('hidden');
    }

    saveScore();
}

// 保存分數到排行榜
function saveScore() {
    const leaderboard = ProgressManager.loadLeaderboard();

    leaderboard.push({
        name: gameState.playerName,
        score: gameState.totalScore,
        difficulty: gameState.difficulty,
        stage: gameState.currentStage,
        date: new Date().toISOString()
    });

    leaderboard.sort((a, b) => b.score - a.score);

    ProgressManager.saveLeaderboard(leaderboard);
}

// 當前排行榜過濾難度
let currentLeaderboardFilter = 'all';

// 過濾排行榜
function filterLeaderboard(difficulty, btnElement) {
    currentLeaderboardFilter = difficulty;

    // 更新按鈕狀態
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 如果沒有傳入按鈕元素，通過難度查找
    if (!btnElement) {
        const filterMap = {
            'all': 0,
            'beginner': 1,
            'intermediate': 2,
            'advanced': 3
        };
        const btnIndex = filterMap[difficulty];
        const buttons = document.querySelectorAll('.filter-btn');
        if (buttons[btnIndex]) {
            buttons[btnIndex].classList.add('active');
        }
    } else {
        btnElement.classList.add('active');
    }

    // 重新顯示排行榜
    displayLeaderboard();
}

// 顯示排行榜
function showLeaderboard() {
    endScreen.classList.add('hidden');
    startScreen.classList.add('hidden');
    leaderboardScreen.classList.remove('hidden');

    // 根據玩家剛才玩的難度設置過濾器
    currentLeaderboardFilter = gameState.difficulty;

    // 更新按鈕狀態
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 找到對應的按鈕並設為active
    const filterMap = {
        'beginner': 1,
        'intermediate': 2,
        'advanced': 3
    };
    const btnIndex = filterMap[gameState.difficulty];
    const buttons = document.querySelectorAll('.filter-btn');
    if (buttons[btnIndex]) {
        buttons[btnIndex].classList.add('active');
    }

    displayLeaderboard();
}

// 顯示排行榜數據
function displayLeaderboard() {
    const leaderboard = ProgressManager.loadLeaderboard();
    const tbody = document.querySelector('#leaderboard-table tbody');
    tbody.innerHTML = '';

    // 根據難度過濾
    let filteredLeaderboard = leaderboard;
    if (currentLeaderboardFilter !== 'all') {
        filteredLeaderboard = leaderboard.filter(entry => entry.difficulty === currentLeaderboardFilter);
    }

    // 按分數排序
    filteredLeaderboard.sort((a, b) => b.score - a.score);

    if (filteredLeaderboard.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 20px;">${t('noRecords')}</td></tr>`;
        return;
    }

    filteredLeaderboard.slice(0, 10).forEach((entry, index) => {
        const row = document.createElement('tr');
        const diffName = entry.difficulty === 'beginner' ? '初級' : entry.difficulty === 'intermediate' ? '中級' : '高級';

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${diffName}</td>
            <td>${entry.score}</td>
        `;
        tbody.appendChild(row);
    });
}

// 開始每日挑戰
function startDailyChallenge() {
    const nameInput = document.getElementById('name-input');
    if (!nameInput.value.trim()) {
        alert('請輸入您的名稱！');
        return;
    }

    // 檢查今日是否已完成
    if (DailyChallengeManager.isTodayCompleted()) {
        const msg = {
            zh: '您今天已經完成每日挑戰了！明天再來吧！',
            en: 'You\'ve already completed today\'s challenge! Come back tomorrow!',
            ja: '本日のチャレンジは完了しました！また明日！',
            ko: '오늘의 챌린지를 완료했습니다! 내일 다시 오세요!'
        };
        alert(msg.zh);
        return;
    }

    gameState.playerName = nameInput.value.trim();
    gameState.gameMode = 'daily';

    // 保存玩家名稱
    ProgressManager.savePlayerName(gameState.playerName);

    // 初始化遊戲狀態
    gameState.currentQuestion = 0;
    gameState.totalScore = 0;
    gameState.correctAnswers = 0;
    gameState.lives = 3;
    gameState.currentStage = null;

    // 獲取今日挑戰題目
    gameState.questions = DailyChallengeManager.generateTodayQuestions();

    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');

    // 更新關卡資訊橫幅為每日挑戰
    updateDailyChallengeHeader();

    loadQuestion();
}

// 更新每日挑戰標題
function updateDailyChallengeHeader() {
    const stageInfoBanner = document.querySelector('.stage-info-banner');
    if (stageInfoBanner) {
        const titles = {
            zh: '📅 今日挑戰',
            en: '📅 Daily Challenge',
            ja: '📅 デイリーチャレンジ',
            ko: '📅 데일리 챌린지'
        };
        stageInfoBanner.innerHTML = `<span>${stage.name.zh}</span>`;
    }
}

// 返回開始畫面
function backToStart() {
    leaderboardScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    gameScreen.classList.add('hidden');
    stageSelectScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    resetBackground();
}

// 停止挑戰（回到關卡選擇畫面）
function quitChallenge() {
    const confirmMessage = '確定要停止挑戰嗎？目前進度將不會被保存！';

    if (confirm(confirmMessage)) {
        gameScreen.classList.add('hidden');
        stageSelectScreen.classList.remove('hidden');
        renderStages();
        resetBackground();
    }
}

// 返回關卡選擇畫面
function backToStageSelect() {
    endScreen.classList.add('hidden');
    leaderboardScreen.classList.add('hidden');
    stageSelectScreen.classList.remove('hidden');
    renderStages();
}

// 前往下一關
function goToNextStage() {
    const nextStageId = gameState.currentStage + 1;
    if (nextStageId <= stageConfig.length) {
        startStage(nextStageId);
    }
}

// 分享遊戲到 LINE
function shareGame() {
    const shareText = `🎮 我正在玩國旗王挑戰！快來測試你對世界各國國旗的認識！你能通過所有關卡成為真正的國旗王嗎？🌍👑`;

    // 檢查是否有設定遊戲網址
    if (GAME_URL === 'YOUR_DEPLOYED_GAME_URL_HERE') {
        alert('⚠️ 遊戲尚未部署，請先設定遊戲網址！');
        return;
    }

    // 使用 LINE 分享功能
    const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(GAME_URL)}`;

    // 開啟 LINE 分享視窗
    window.open(lineShareUrl, '_blank', 'width=600,height=600');
}

// 分享成績
function shareScore() {
    const diffName = gameState.difficulty === 'beginner' ? '初級' : gameState.difficulty === 'intermediate' ? '中級' : '高級';

    const shareText = `我在世界國旗挑戰（${diffName}）中獲得了 ${gameState.totalScore} 分！你能超越我嗎？🌍🏴`;

    if (navigator.share) {
        navigator.share({
            title: 'World Flag Challenge',
            text: shareText
        });
    } else {
        navigator.clipboard.writeText(shareText);
        alert('已複製到剪貼簿！');
    }
}

// 選擇難度
function selectDifficulty(difficulty, element) {
    gameState.difficulty = difficulty;

    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    element.classList.add('selected');
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化音效系統
    SoundManager.init();

    // 載入設定（語言等）
    const settings = ProgressManager.loadSettings();
    if (settings.language) {
        // Language setting removed
    }

    // 載入玩家名稱
    const savedName = ProgressManager.loadPlayerName();
    if (savedName) {
        const nameInput = document.getElementById('name-input');
        if (nameInput) {
            nameInput.value = savedName;
        }
    }

    // 更新音效按鈕狀態
    updateSoundButton();
    loadStageProgress(); // 載入關卡進度
    updateDailyChallengeButton(); // 更新每日挑戰按鈕狀態

    // 顯示儲存空間使用情況（開發用）
    const storageInfo = ProgressManager.getStorageInfo();
    console.log('🎮 遊戲進度儲存:', storageInfo);
    console.log('🔊 音效系統:', SoundManager.enabled ? '已啟用' : '已關閉');
});

// 切換音效
function toggleSound() {
    const enabled = SoundManager.toggle();
    updateSoundButton();
    // 播放測試音效
    if (enabled) {
        SoundManager.playClick();
    }
}

// 更新音效按鈕
function updateSoundButton() {
    const btn = document.getElementById('sound-toggle');
    if (btn) {
        btn.textContent = SoundManager.enabled ? '🔊' : '🔇';
        btn.title = SoundManager.enabled ?
            ('點擊關閉音效') :
            ('點擊開啟音效');
    }
}

// 更新每日挑戰按鈕
function updateDailyChallengeButton() {
    const btn = document.getElementById('daily-challenge-btn');
    const statusSpan = document.getElementById('daily-status');
    const textSpan = document.getElementById('daily-challenge-text');

    if (!btn || !statusSpan || !textSpan) return;

    // 更新按鈕文字
    textSpan.textContent = '📅 每日挑戰';

    // 檢查今日是否已完成
    if (DailyChallengeManager.isTodayCompleted()) {
        const bestScore = DailyChallengeManager.getTodayBestScore();
        const statusText = `✅ 已完成 (${bestScore}分)`;
        statusSpan.textContent = statusText;
    } else {
        statusSpan.textContent = '';
    }
}

// ============ 世界地圖功能 ============

// 顯示世界地圖
function showWorldMap() {
    const mapScreen = document.getElementById('world-map-screen');
    const startScreen = document.getElementById('start-screen');
    const stageSelectScreen = document.getElementById('stage-select-screen');
    const gameScreen = document.getElementById('game-screen');
    const endScreen = document.getElementById('end-screen');

    // 隱藏所有其他畫面
    startScreen.classList.add('hidden');
    stageSelectScreen.classList.add('hidden');
    gameScreen.classList.add('hidden');
    endScreen.classList.add('hidden');

    // 顯示地圖
    mapScreen.classList.remove('hidden');

    // 更新地圖數據
    updateWorldMap();
}

// 關閉世界地圖
function closeWorldMap() {
    const mapScreen = document.getElementById('world-map-screen');
    const startScreen = document.getElementById('start-screen');

    mapScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

// 更新世界地圖數據
function updateWorldMap() {
    // 計算各區域解鎖的國家數量
    const regionStats = calculateRegionStats();

    // 更新SVG path元素的unlocked狀態
    Object.keys(regionStats).forEach(region => {
        const pathElement = document.getElementById(`region-${region}`);
        const stat = regionStats[region];

        if (pathElement) {
            // 如果有解鎖任何國家，就標記為已解鎖
            if (stat.unlocked > 0) {
                pathElement.classList.add('unlocked');
            } else {
                pathElement.classList.remove('unlocked');
            }
        }
    });

    // 更新SVG進度文字
    const regionNameMap = {
        'north-america': '北美洲',
        'south-america': '南美洲',
        'europe': '歐洲',
        'africa': '非洲',
        'asia': '亞洲',
        'oceania': '大洋洲'
    };

    Object.keys(regionStats).forEach(region => {
        const regionName = regionNameMap[region];
        const stat = regionStats[region];

        // 找到對應的progress text元素並更新
        const svg = document.querySelector('.world-map-svg');
        if (svg) {
            const texts = svg.querySelectorAll('.region-progress-text');
            texts.forEach(text => {
                const prevText = text.previousElementSibling;
                if (prevText && prevText.textContent === regionName) {
                    text.textContent = `${stat.unlocked}/${stat.total}`;
                }
            });
        }
    });

    // 更新總體統計
    updateMapStats();
}

// 計算各區域統計
function calculateRegionStats() {
    const completedStages = gameState.completedStages;
    const unlockedCountries = new Set();

    // 收集所有已完成關卡的國家
    completedStages.forEach(stageId => {
        const stage = stageConfig.find(s => s.id === stageId);
        if (stage) {
            stage.countryIndices.forEach(index => {
                if (flagDatabase[index]) {
                    unlockedCountries.add(index);
                }
            });
        }
    });

    // 統計各區域
    const stats = {
        'asia': { unlocked: 0, total: 0 },
        'europe': { unlocked: 0, total: 0 },
        'africa': { unlocked: 0, total: 0 },
        'north-america': { unlocked: 0, total: 0 },
        'south-america': { unlocked: 0, total: 0 },
        'oceania': { unlocked: 0, total: 0 }
    };

    // 計算每個區域的國家數量
    flagDatabase.forEach((country, index) => {
        const continent = country.hints.continent.zh;
        let regionKey = null;

        if (continent.includes('亞洲')) regionKey = 'asia';
        else if (continent.includes('歐洲')) regionKey = 'europe';
        else if (continent.includes('非洲')) regionKey = 'africa';
        else if (continent.includes('北美洲')) regionKey = 'north-america';
        else if (continent.includes('南美洲')) regionKey = 'south-america';
        else if (continent.includes('大洋洲')) regionKey = 'oceania';

        if (regionKey) {
            stats[regionKey].total++;
            if (unlockedCountries.has(index)) {
                stats[regionKey].unlocked++;
            }
        }
    });

    return stats;
}

// 更新地圖統計數據
function updateMapStats() {
    const completedStages = gameState.completedStages.length;
    const totalStages = stageConfig.length;

    // 計算已解鎖的國家數量
    const unlockedCountries = new Set();
    gameState.completedStages.forEach(stageId => {
        const stage = stageConfig.find(s => s.id === stageId);
        if (stage) {
            stage.countryIndices.forEach(index => {
                unlockedCountries.add(index);
            });
        }
    });

    const totalCountries = flagDatabase.length;
    const completion = Math.round((unlockedCountries.size / totalCountries) * 100);

    // 更新顯示
    document.getElementById('stages-completed').textContent = `${completedStages} / ${totalStages}`;
    document.getElementById('countries-unlocked').textContent = `${unlockedCountries.size} / ${totalCountries}`;
    document.getElementById('total-completion').textContent = `${completion}%`;
}

// 當通過關卡時顯示地圖解鎖動畫
function showMapUnlockAnimation(stageId) {
    const stage = stageConfig.find(s => s.id === stageId);
    if (!stage) return;

    // 收集本關卡解鎖的新區域
    const newRegions = new Set();
    stage.countryIndices.forEach(index => {
        const country = flagDatabase[index];
        if (country) {
            const continent = country.hints.continent.zh;
            if (continent.includes('亞洲')) newRegions.add('asia');
            else if (continent.includes('歐洲')) newRegions.add('europe');
            else if (continent.includes('非洲')) newRegions.add('africa');
            else if (continent.includes('北美洲')) newRegions.add('north-america');
            else if (continent.includes('南美洲')) newRegions.add('south-america');
            else if (continent.includes('大洋洲')) newRegions.add('oceania');
        }
    });

    // 如果有新解鎖的區域，顯示通知
    if (newRegions.size > 0) {
        const regionNames = {
            'asia': '亞洲',
            'europe': '歐洲',
            'africa': '非洲',
            'north-america': '北美洲',
            'south-america': '南美洲',
            'oceania': '大洋洲'
        };

        const regionsText = Array.from(newRegions).map(r => regionNames[r]).join('、');

        // 使用成就通知系統顯示解鎖訊息
        setTimeout(() => {
            AchievementManager.showNotification(
                '🗺️',
                '世界地圖解鎖！',
                `恭喜解鎖 ${regionsText} 區域！`
            );
        }, 1500);
    }
}
