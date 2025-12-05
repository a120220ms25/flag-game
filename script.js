// 遊戲網址設定（部署後請更新此連結）
const GAME_URL = 'YOUR_DEPLOYED_GAME_URL_HERE'; // 部署後請將此連結替換為實際網址

// 語言翻譯
const translations = {
    zh: {
        title: '🌍 國旗王挑戰 🌍',
        welcome: '歡迎來到國旗王挑戰！',
        subtitle: '測試您對世界各國國旗的認識',
        enterName: '請輸入您的名稱：',
        namePlaceholder: '輸入名稱',
        selectDifficulty: '選擇難度：',
        beginner: '初級',
        intermediate: '中級',
        advanced: '高級',
        beginnerDesc: '10 題 | 熟悉的國家',
        intermediateDesc: '10 題 | 中等難度',
        advancedDesc: '10 題 | 冷門國家',
        startGame: '開始遊戲',
        rules: '遊戲規則：',
        rulesContent: [
            '根據難度進行國旗辨識挑戰',
            '初始擁有 3 次猜錯機會',
            '每題基礎分數：10 分',
            '可使用提示，但會降低得分：',
            '使用 1 次提示：最高 7 分',
            '使用 2 次提示：最高 4 分',
            '答對獲得分數，答錯失去一次機會'
        ],
        questionNumber: '題號：',
        score: '得分：',
        lives: '剩餘機會：',
        maxScore: '本題最高分：',
        question: '請猜猜這是哪個國家的國旗？',
        hint1Btn: '提示 1（洲別）',
        hint2Btn: '提示 2（特色）',
        hint1Text: '💡 提示 1：這個國家位於',
        hint2Text: '💡 提示 2：',
        correct: '✅ 正確！這是 {country} 的國旗！獲得 {score} 分！',
        wrong: '❌ 錯誤！正確答案是：',
        nextBtn: '下一題',
        gameOver: '遊戲結束！',
        finalScore: '最終得分',
        yourTitle: '您的國旗頭銜',
        playAgain: '再玩一次',
        viewLeaderboard: '查看排行榜',
        shareScore: '分享成績',
        leaderboardTitle: '🏆 排行榜',
        backToGame: '返回遊戲',
        rank: '排名',
        player: '玩家',
        difficulty: '難度',
        noRecords: '暫無記錄',
        filterAll: '全部',
        filterBeginner: '初級',
        filterIntermediate: '中級',
        filterAdvanced: '高級',
        titles: {
            cosmic: '🌌 宇宙旗幟先知',
            cosmicDesc: '您可能曾經是聯合國秘書長！對世界各國國旗瞭若指掌！',
            diplomat: '🏛️ 國際外交官僚',
            diplomatDesc: '國旗是您桌上的每日咖啡墊，您對世界地理有深厚的認識！',
            collector: '🎨 細節控國徽收藏家',
            collectorDesc: '您知道哪些國旗上有武器，哪些有植物，對細節有敏銳觀察！',
            traveler: '🧭 迷航世界旅人',
            travelerDesc: '您知道這些旗幟存在，但有時忘了它們在哪個洲，繼續加油！',
            sailor: '🏴‍☠️ 海盜船見習水手',
            sailorDesc: '您只認得骷髏旗，需要重讀世界地圖。不要氣餒，多練習就會進步！'
        },
        continents: {
            '亞洲': '亞洲',
            '歐洲': '歐洲',
            '非洲': '非洲',
            '北美洲': '北美洲',
            '南美洲': '南美洲',
            '大洋洲': '大洋洲',
            '歐洲/亞洲': '歐洲/亞洲'
        }
    },
    en: {
        title: '🌍 Flag King Challenge 🌍',
        welcome: 'Welcome to Flag King Challenge!',
        subtitle: 'Test your knowledge of world flags',
        enterName: 'Enter your name:',
        namePlaceholder: 'Enter name',
        selectDifficulty: 'Select Difficulty:',
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        beginnerDesc: '10 Questions | Familiar Countries',
        intermediateDesc: '10 Questions | Medium Difficulty',
        advancedDesc: '10 Questions | Obscure Countries',
        startGame: 'Start Game',
        rules: 'Game Rules:',
        rulesContent: [
            'Flag identification challenge based on difficulty',
            'Start with 3 lives',
            'Base score per question: 10 points',
            'Hints available but reduce score:',
            'Use 1 hint: max 7 points',
            'Use 2 hints: max 4 points',
            'Correct answer earns points, wrong answer loses a life'
        ],
        questionNumber: 'Question:',
        score: 'Score:',
        lives: 'Lives:',
        maxScore: 'Max Score:',
        question: 'Guess which country this flag belongs to?',
        hint1Btn: 'Hint 1 (Continent)',
        hint2Btn: 'Hint 2 (Feature)',
        hint1Text: '💡 Hint 1: This country is in',
        hint2Text: '💡 Hint 2:',
        correct: '✅ Correct! This is the flag of {country}! You earned {score} points!',
        wrong: '❌ Wrong! The correct answer is:',
        nextBtn: 'Next Question',
        gameOver: 'Game Over!',
        finalScore: 'Final Score',
        yourTitle: 'Your Flag Title',
        playAgain: 'Play Again',
        viewLeaderboard: 'View Leaderboard',
        shareScore: 'Share Score',
        leaderboardTitle: '🏆 Leaderboard',
        backToGame: 'Back to Game',
        rank: 'Rank',
        player: 'Player',
        difficulty: 'Difficulty',
        noRecords: 'No records yet',
        filterAll: 'All',
        filterBeginner: 'Beginner',
        filterIntermediate: 'Intermediate',
        filterAdvanced: 'Advanced',
        titles: {
            cosmic: '🌌 Cosmic Flag Prophet',
            cosmicDesc: 'You might have been a UN Secretary-General! Master of all world flags!',
            diplomat: '🏛️ International Diplomat',
            diplomatDesc: 'Flags are your daily coffee coasters. You have deep knowledge of world geography!',
            collector: '🎨 Detail-Oriented Collector',
            collectorDesc: 'You know which flags have weapons and which have plants. Sharp eye for details!',
            traveler: '🧭 Lost World Traveler',
            travelerDesc: 'You know these flags exist but sometimes forget which continent they\'re from. Keep going!',
            sailor: '🏴‍☠️ Pirate Ship Apprentice',
            sailorDesc: 'You only recognize the skull flag and need to re-read the world map. Don\'t give up!'
        },
        continents: {
            '亞洲': 'Asia',
            '歐洲': 'Europe',
            '非洲': 'Africa',
            '北美洲': 'North America',
            '南美洲': 'South America',
            '大洋洲': 'Oceania',
            '歐洲/亞洲': 'Europe/Asia'
        }
    }
};

// 關卡設計（難度遞增：從熟悉到冷門）
const stageConfig = [
    {
        id: 1,
        name: { zh: '🌱 新手訓練營', en: '🌱 Beginner Camp' },
        description: { zh: '從熟悉的國家開始你的旅程！', en: 'Start with familiar countries!' },
        totalQuestions: 5,
        requiredCorrect: 3,
        difficulties: ['beginner'], // 只有初級（最簡單）
        lives: 3
    },
    {
        id: 2,
        name: { zh: '🌍 區域探險家', en: '🌍 Regional Explorer' },
        description: { zh: '探索更多國家的國旗！', en: 'Explore more country flags!' },
        totalQuestions: 8,
        requiredCorrect: 5,
        difficulties: ['beginner', 'intermediate'], // 初級+中級混合
        difficultyRatio: { beginner: 0.6, intermediate: 0.4 }, // 60%初級 + 40%中級
        lives: 3
    },
    {
        id: 3,
        name: { zh: '✈️ 環球旅行家', en: '✈️ World Traveler' },
        description: { zh: '挑戰來自世界各地的國旗！', en: 'Challenge flags from around the world!' },
        totalQuestions: 10,
        requiredCorrect: 7,
        difficulties: ['intermediate'], // 只有中級
        lives: 3
    },
    {
        id: 4,
        name: { zh: '🎓 地理學大師', en: '🎓 Geography Master' },
        description: { zh: '證明你的地理知識！冷門國家來了！', en: 'Prove your geography knowledge! Obscure countries!' },
        totalQuestions: 12,
        requiredCorrect: 9,
        difficulties: ['intermediate', 'advanced'], // 中級+高級
        difficultyRatio: { intermediate: 0.5, advanced: 0.5 }, // 50%中級 + 50%高級
        lives: 2
    },
    {
        id: 5,
        name: { zh: '👑 國旗王者終極試煉', en: '👑 Flag King Ultimate Trial' },
        description: { zh: '世界人口最少的國家！挑戰真正的國旗王！', en: 'World\'s least populated countries! True Flag King challenge!' },
        totalQuestions: 15,
        requiredCorrect: 12,
        difficulties: ['rarest'], // 極稀有難度（世界人口最少的國家）
        lives: 2
    }
];

// 國旗題庫（每個難度10個不同的國家，包含5種提示）
const flagDatabase = [
    // ============ 初級難度 (10個) - 熟悉的國家 ============
    {
        emoji: '🇹🇼', name: '台灣', nameEn: 'Taiwan',
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
        emoji: '🇨🇳', name: '中國', nameEn: 'China',
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
        emoji: '🇯🇵', name: '日本', nameEn: 'Japan',
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
        emoji: '🇰🇷', name: '南韓', nameEn: 'South Korea',
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
        emoji: '🇹🇭', name: '泰國', nameEn: 'Thailand',
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
        emoji: '🇹🇷', name: '土耳其', nameEn: 'Turkey',
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
        emoji: '🇬🇷', name: '希臘', nameEn: 'Greece',
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
        emoji: '🇩🇴', name: '多明尼加', nameEn: 'Dominican Republic',
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
        emoji: '🇻🇳', name: '越南', nameEn: 'Vietnam',
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
        emoji: '🇨🇴', name: '哥倫比亞', nameEn: 'Colombia',
        hints: {
            continent: { zh: '南美洲（咖啡因上癮者天堂）☕', en: 'South America (caffeine addict paradise) ☕' },
            capital: { zh: '波哥大（海拔2600公尺會喘）🏔️', en: 'Bogota (2600m altitude = breathless) 🏔️' },
            food: { zh: '咖啡品質超猛，Juan Valdez大叔代言！👨‍🌾', en: 'Coffee so good, Juan Valdez is the mascot! 👨‍🌾' },
            landmark: { zh: '失落之城（印第安納瓊斯既視感）🗿', en: 'Lost City (Indiana Jones vibes) 🗿' },
            other: { zh: '不只有毒梟，還有美女選美冠軍超多！👸', en: 'Not just narcos, also tons of beauty pageant winners! 👸' }
        },
        bgGradient: 'linear-gradient(135deg, #FCD116 0%, #003893 50%, #CE1126 100%)', difficulty: 'beginner'
    },

    // ============ 中級難度 (10個) - 中等知名度國家 ============
    {
        emoji: '🇫🇷', name: '法國', nameEn: 'France',
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
        emoji: '🇬🇧', name: '英國', nameEn: 'United Kingdom',
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
        emoji: '🇮🇹', name: '義大利', nameEn: 'Italy',
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
        emoji: '🇩🇪', name: '德國', nameEn: 'Germany',
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
        emoji: '🇪🇸', name: '西班牙', nameEn: 'Spain',
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
        emoji: '🇧🇷', name: '巴西', nameEn: 'Brazil',
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
        emoji: '🇦🇷', name: '阿根廷', nameEn: 'Argentina',
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
        emoji: '🇲🇽', name: '墨西哥', nameEn: 'Mexico',
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
        emoji: '🇨🇦', name: '加拿大', nameEn: 'Canada',
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
        emoji: '🇦🇺', name: '澳洲', nameEn: 'Australia',
        hints: {
            continent: { zh: '大洋洲（什麼都想咬你）🦘', en: 'Oceania (everything wants to kill you) 🦘' },
            capital: { zh: '坎培拉（大家都以為是雪梨）🦘', en: 'Canberra (everyone thinks it\'s Sydney) 🦘' },
            food: { zh: 'Vegemite超難吃，但澳洲人超愛！🤢', en: 'Vegemite tastes weird, but Aussies love it! 🤢' },
            landmark: { zh: '雪梨歌劇院（貝殼造型）、大堡礁快死了 🐠', en: 'Opera House (shell shape), Great Barrier Reef dying 🐠' },
            other: { zh: '袋鼠、無尾熊、毒蜘蛛、毒蛇通通有！☠️', en: 'Kangaroos, koalas, deadly spiders, snakes - all here! ☠️' }
        },
        bgGradient: 'linear-gradient(135deg, #00008B 0%, #FFFFFF 50%, #FF0000 100%)', difficulty: 'intermediate'
    },

    // ============ 高級難度 (10個) - 冷門國家 ============
    {
        emoji: '🇸🇪', name: '瑞典', nameEn: 'Sweden',
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
        emoji: '🇨🇭', name: '瑞士', nameEn: 'Switzerland',
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
        emoji: '🇳🇱', name: '荷蘭', nameEn: 'Netherlands',
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
        emoji: '🇵🇹', name: '葡萄牙', nameEn: 'Portugal',
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
        emoji: '🇳🇴', name: '挪威', nameEn: 'Norway',
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
        emoji: '🇩🇰', name: '丹麥', nameEn: 'Denmark',
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
        emoji: '🇫🇮', name: '芬蘭', nameEn: 'Finland',
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
        emoji: '🇮🇸', name: '冰島', nameEn: 'Iceland',
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
        emoji: '🇱🇧', name: '黎巴嫩', nameEn: 'Lebanon',
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
        emoji: '🇳🇿', name: '紐西蘭', nameEn: 'New Zealand',
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
        emoji: '🇻🇦', name: '梵蒂岡', nameEn: 'Vatican City',
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
        emoji: '🇳🇷', name: '諾魯', nameEn: 'Nauru',
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
        emoji: '🇹🇻', name: '吐瓦魯', nameEn: 'Tuvalu',
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
        emoji: '🇵🇼', name: '帛琉', nameEn: 'Palau',
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
        emoji: '🇸🇲', name: '聖馬利諾', nameEn: 'San Marino',
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
        emoji: '🇱🇮', name: '列支敦士登', nameEn: 'Liechtenstein',
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
        emoji: '🇲🇨', name: '摩納哥', nameEn: 'Monaco',
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
        emoji: '🇰🇳', name: '聖克里斯多福及尼維斯', nameEn: 'Saint Kitts and Nevis',
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
        emoji: '🇲🇭', name: '馬紹爾群島', nameEn: 'Marshall Islands',
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
        emoji: '🇩🇲', name: '多米尼克', nameEn: 'Dominica',
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
        emoji: '🇦🇩', name: '安道爾', nameEn: 'Andorra',
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
        emoji: '🇦🇬', name: '安地卡及巴布達', nameEn: 'Antigua and Barbuda',
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
        emoji: '🇸🇨', name: '塞席爾', nameEn: 'Seychelles',
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
        emoji: '🇻🇨', name: '聖文森及格瑞那丁', nameEn: 'Saint Vincent and the Grenadines',
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
        emoji: '🇬🇩', name: '格瑞那達', nameEn: 'Grenada',
        hints: {
            continent: { zh: '北美洲（香料之島）🌶️', en: 'North America (Spice Isle) 🌶️' },
            capital: { zh: '聖喬治（彩色房子超美）🎨', en: 'St. George\'s (colorful houses gorgeous) 🎨' },
            food: { zh: '肉豆蔻、可可、Oil Down燉菜 🥘', en: 'Nutmeg, cocoa, Oil Down stew 🥘' },
            landmark: { zh: '大安斯海灘（世界最美海灘）🏖️', en: 'Grand Anse Beach (world\'s most beautiful) 🏖️' },
            other: { zh: '人口11.3萬，世界肉豆蔻產量第二！🌰', en: '113k people, #2 nutmeg producer! 🌰' }
        },
        bgGradient: 'linear-gradient(135deg, #CE1126 0%, #FFD100 50%, #007A5E 100%)', difficulty: 'rarest'
    },
];

// 遊戲狀態
let gameState = {
    playerName: '',
    currentLanguage: 'zh',
    difficulty: 'beginner', // 保留以支援舊模式
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

// 獲取當前語言翻譯
function t(key) {
    const keys = key.split('.');
    let value = translations[gameState.currentLanguage];
    for (const k of keys) {
        value = value[k];
    }
    return value;
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
        button.textContent = gameState.currentLanguage === 'zh' ? option.name : option.nameEn;
        button.onclick = () => selectAnswer(option.name, button);
        optionsArea.appendChild(button);
    });
}

// 搞笑的答對訊息
const correctMessages = {
    zh: [
        '🎉 天才！國旗大師就是你！',
        '🔥 太強了！你是不是偷看地圖了？',
        '⭐ 答對了！給你一朵小紅花！',
        '🎊 哇塞！你該不會是地理老師吧？',
        '💯 完美！連我媽都沒你厲害！',
        '🏆 神人！這題難不倒你！',
        '✨ 厲害炸了！考慮去參加益智節目嗎？',
        '🎯 正確！你是國旗界的福爾摩斯！'
    ],
    en: [
        '🎉 Genius! Flag master is YOU!',
        '🔥 Too good! Did you cheat?',
        '⭐ Correct! Here\'s a gold star!',
        '🎊 Wow! Are you a geography teacher?',
        '💯 Perfect! Better than my mom!',
        '🏆 Legend! Nothing stops you!',
        '✨ Amazing! Go on a quiz show!',
        '🎯 Right! Sherlock of flags!'
    ]
};

const wrongMessages = {
    zh: [
        '❌ 哎呀！要不要回去重讀地理課本？',
        '💔 錯了！但沒關係，我們都會犯錯...',
        '😅 啊嘶～這題有點難啦！',
        '🤦 不是這個啦！建議多旅行增廣見聞！',
        '😢 GG！下次記得用提示！',
        '🙈 答錯了！別灰心，至少你很勇敢！',
        '💥 撞牆了！正確答案是：',
        '😵 哎唷～差一點就對了（其實差很多）'
    ],
    en: [
        '❌ Oops! Time to read geography books?',
        '💔 Wrong! But it\'s okay, we all make mistakes...',
        '😅 Ouch~ This one\'s tricky!',
        '🤦 Not this one! Travel more!',
        '😢 GG! Use hints next time!',
        '🙈 Wrong! But at least you\'re brave!',
        '💥 Crashed! Correct answer is:',
        '😵 Ouch~ Almost! (not really)'
    ]
};

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
        buttonElement.classList.add('correct');
        gameState.totalScore += gameState.maxScoreForCurrentQuestion;
        gameState.correctAnswers++; // 增加答對計數

        const countryName = gameState.currentLanguage === 'zh' ? correctAnswer : gameState.currentAnswer.nameEn;

        // 隨機選擇一個搞笑答對訊息
        const messages = correctMessages[gameState.currentLanguage];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];

        feedback.textContent = `${randomMsg} 這是${countryName}的國旗！獲得 ${gameState.maxScoreForCurrentQuestion} 分！`;
        if (gameState.currentLanguage === 'en') {
            feedback.textContent = `${randomMsg} It\'s ${countryName}! You earned ${gameState.maxScoreForCurrentQuestion} points!`;
        }
        feedback.className = 'feedback correct';
        feedback.classList.remove('hidden');
    } else {
        buttonElement.classList.add('wrong');

        allButtons.forEach(btn => {
            const btnCountry = gameState.questions.find(q =>
                (gameState.currentLanguage === 'zh' ? q.name : q.nameEn) === btn.textContent
            );
            if (btnCountry && btnCountry.name === correctAnswer) {
                btn.classList.add('correct');
            }
        });

        gameState.lives--;
        const countryName = gameState.currentLanguage === 'zh' ? correctAnswer : gameState.currentAnswer.nameEn;

        // 隨機選擇一個搞笑答錯訊息
        const messages = wrongMessages[gameState.currentLanguage];
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
function updateLanguage() {
    // 更新所有靜態文本
    const elements = {
        'page-title': t('title'),
        'welcome-title': t('welcome'),
        'welcome-subtitle': t('subtitle'),
        'name-label': t('enterName'),
        'difficulty-label': t('selectDifficulty'),
        'question-text': t('question'),
        'next-btn': t('nextBtn'),
        'end-title': t('gameOver'),
        'final-score-label': t('finalScore'),
        'title-label': t('yourTitle'),
        'play-again-btn': t('playAgain'),
        'view-leaderboard-btn': t('viewLeaderboard'),
        'share-btn': t('shareScore'),
        'leaderboard-title': t('leaderboardTitle'),
        'back-btn': t('backToGame')
    };

    for (const [id, text] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    // 更新提示按鈕文字
    const hintBtnText = gameState.currentLanguage === 'zh' ? '提示' : 'Hint';
    for (let i = 1; i <= 5; i++) {
        const hintBtn = document.getElementById(`hint-btn-${i}`);
        if (hintBtn) hintBtn.textContent = `${hintBtnText} ${i}`;
    }

    // 更新難度按鈕
    const diffBtns = document.querySelectorAll('.difficulty-btn');
    if (diffBtns.length >= 3) {
        diffBtns[0].querySelector('.diff-name').textContent = t('beginner');
        diffBtns[0].querySelector('.diff-desc').textContent = t('beginnerDesc');
        diffBtns[1].querySelector('.diff-name').textContent = t('intermediate');
        diffBtns[1].querySelector('.diff-desc').textContent = t('intermediateDesc');
        diffBtns[2].querySelector('.diff-name').textContent = t('advanced');
        diffBtns[2].querySelector('.diff-desc').textContent = t('advancedDesc');
    }

    // 更新排行榜表頭
    const leaderboardHeaders = document.querySelectorAll('#leaderboard-screen th');
    if (leaderboardHeaders.length >= 4) {
        leaderboardHeaders[0].textContent = t('rank');
        leaderboardHeaders[1].textContent = t('player');
        leaderboardHeaders[2].textContent = t('difficulty');
        leaderboardHeaders[3].textContent = t('score');
    }

    // 更新排行榜過濾按鈕
    const filterLabels = {
        'filter-all': t('filterAll'),
        'filter-beginner': t('filterBeginner'),
        'filter-intermediate': t('filterIntermediate'),
        'filter-advanced': t('filterAdvanced')
    };

    for (const [id, text] of Object.entries(filterLabels)) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }
}

// 切換語言
function toggleLanguage() {
    gameState.currentLanguage = gameState.currentLanguage === 'zh' ? 'en' : 'zh';
    updateLanguage();

    // 更新語言按鈕文本
    document.getElementById('lang-toggle').textContent = gameState.currentLanguage === 'zh' ? 'EN' : '中文';

    // 如果在關卡選擇畫面，重新渲染關卡
    if (!stageSelectScreen.classList.contains('hidden')) {
        renderStages();
    }
}

// 載入關卡進度
function loadStageProgress() {
    const savedProgress = localStorage.getItem('flagGameStageProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        gameState.unlockedStages = progress.unlockedStages || 1;
        gameState.completedStages = progress.completedStages || []; // 已通過的關卡列表
    }
}

// 儲存關卡進度
function saveStageProgress() {
    const progress = {
        unlockedStages: gameState.unlockedStages,
        completedStages: gameState.completedStages || []
    };
    localStorage.setItem('flagGameStageProgress', JSON.stringify(progress));
}

// 進入關卡選擇畫面
function enterStageSelect() {
    const nameInput = document.getElementById('name-input');
    if (!nameInput.value.trim()) {
        alert(gameState.currentLanguage === 'zh' ? '請輸入您的名稱！' : 'Please enter your name!');
        return;
    }

    gameState.playerName = nameInput.value.trim();
    gameState.gameMode = 'stage';

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

        const lang = gameState.currentLanguage;

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
                <div class="stage-name">${stage.name[lang]}</div>
                <div class="stage-lock">${statusIcon}</div>
            </div>
            <div class="stage-description">${stage.description[lang]}</div>
            <div class="stage-info">
                <div class="stage-info-item">
                    📝 <strong>${stage.totalQuestions}</strong> ${lang === 'zh' ? '題' : 'questions'}
                </div>
                <div class="stage-info-item">
                    ✨ ${lang === 'zh' ? '需答對' : 'Need'} <strong>${stage.requiredCorrect}</strong> ${lang === 'zh' ? '題' : 'correct'}
                </div>
                <div class="stage-info-item">
                    ❤️ <strong>${stage.lives}</strong> ${lang === 'zh' ? '次機會' : 'lives'}
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

    // 根據關卡設定選擇題目（支援難度比例）
    let selectedQuestions = [];

    if (stage.difficultyRatio) {
        // 按比例選擇不同難度的題目
        for (const [difficulty, ratio] of Object.entries(stage.difficultyRatio)) {
            const count = Math.round(stage.totalQuestions * ratio);
            const flags = flagDatabase.filter(f => f.difficulty === difficulty);
            const shuffled = flags.sort(() => Math.random() - 0.5);
            selectedQuestions.push(...shuffled.slice(0, count));
        }
    } else {
        // 沒有比例設定，均勻選擇
        const availableFlags = flagDatabase.filter(f => stage.difficulties.includes(f.difficulty));
        selectedQuestions = availableFlags.sort(() => Math.random() - 0.5).slice(0, stage.totalQuestions);
    }

    // 打亂順序
    gameState.questions = selectedQuestions.sort(() => Math.random() - 0.5);

    stageSelectScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    endScreen.classList.add('hidden');

    loadQuestion();
}

// 開始遊戲
function startGame() {
    const nameInput = document.getElementById('name-input');
    if (!nameInput.value.trim()) {
        alert(gameState.currentLanguage === 'zh' ? '請輸入您的名稱！' : 'Please enter your name!');
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

    // 生成隨機提示順序（洲別、首都、食物、景點、其他）
    gameState.hintOrder = ['continent', 'capital', 'food', 'landmark', 'other'].sort(() => Math.random() - 0.5);

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

// 顯示提示（5 個提示隨機顯示）
function showHint(hintNumber) {
    if (hintNumber > gameState.hintsUsed + 1) {
        // 必須按順序使用提示
        return;
    }

    gameState.hintsUsed = hintNumber;

    // 根據使用的提示數量計算分數
    // 索引: 0個提示=10分, 1個提示=9分, 2個提示=7分, 3個提示=5分, 4個提示=3分, 5個提示=2分
    const scoreReductions = [10, 9, 7, 5, 3, 2];
    gameState.maxScoreForCurrentQuestion = scoreReductions[hintNumber];
    document.getElementById('max-score').textContent = gameState.maxScoreForCurrentQuestion;

    // 獲取當前提示編號對應的提示類型
    const hintType = gameState.hintOrder[hintNumber - 1];
    const hintData = gameState.currentAnswer.hints[hintType];
    const hintText = gameState.currentLanguage === 'zh' ? hintData.zh : hintData.en;

    // 提示類型的標籤
    const hintLabels = {
        continent: { zh: '洲別', en: 'Continent' },
        capital: { zh: '首都', en: 'Capital' },
        food: { zh: '特色食物', en: 'Food' },
        landmark: { zh: '景點', en: 'Landmark' },
        other: { zh: '其他', en: 'Other' }
    };

    const label = hintLabels[hintType][gameState.currentLanguage];

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
            // 判斷是否為最後一關
            if (gameState.currentStage === stageConfig.length) {
                // 最後一關通關！成為國旗王！
                title = gameState.currentLanguage === 'zh' ?
                    `👑🎉 恭喜！您已成為真正的國旗王！🎉👑` :
                    `👑🎉 Congratulations! You are now the true Flag King! 🎉👑`;
                description = gameState.currentLanguage === 'zh' ?
                    `太厲害了！你完成了所有關卡的終極挑戰！\n\n答對了 ${gameState.correctAnswers} 題，總分 ${gameState.totalScore} 分！\n\n你對世界各國國旗瞭若指掌，堪稱國旗大師！` :
                    `Amazing! You completed the ultimate challenge!\n\nGot ${gameState.correctAnswers} correct, total ${gameState.totalScore} points!\n\nYou are truly a flag master!`;
            } else {
                // 普通關卡通關
                title = gameState.currentLanguage === 'zh' ?
                    `🎉 恭喜通過 ${stage.name.zh}！` :
                    `🎉 Congrats! Passed ${stage.name.en}!`;
                description = gameState.currentLanguage === 'zh' ?
                    `你答對了 ${gameState.correctAnswers} 題，獲得 ${gameState.totalScore} 分！` :
                    `You got ${gameState.correctAnswers} correct, scored ${gameState.totalScore} points!`;

                // 記錄通過並解鎖下一關
                if (!gameState.completedStages.includes(gameState.currentStage)) {
                    gameState.completedStages.push(gameState.currentStage);
                }
                if (gameState.currentStage >= gameState.unlockedStages) {
                    gameState.unlockedStages = gameState.currentStage + 1;
                }
                saveStageProgress();

                description += gameState.currentLanguage === 'zh' ?
                    '\n\n✨ 下一關已解鎖！' :
                    '\n\n✨ Next stage unlocked!';

            }
        } else {
            // 失敗
            title = gameState.currentLanguage === 'zh' ?
                `😢 挑戰失敗` :
                `😢 Challenge Failed`;
            description = gameState.currentLanguage === 'zh' ?
                `你答對了 ${gameState.correctAnswers} 題，需要答對 ${stage.requiredCorrect} 題才能通過。再接再厲！` :
                `You got ${gameState.correctAnswers} correct, need ${stage.requiredCorrect} to pass. Try again!`;
        }
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
    const leaderboard = JSON.parse(localStorage.getItem('flagGameLeaderboard') || '[]');

    leaderboard.push({
        name: gameState.playerName,
        score: gameState.totalScore,
        difficulty: gameState.difficulty,
        date: new Date().toISOString(),
        language: gameState.currentLanguage
    });

    leaderboard.sort((a, b) => b.score - a.score);

    localStorage.setItem('flagGameLeaderboard', JSON.stringify(leaderboard.slice(0, 50)));
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
    const leaderboard = JSON.parse(localStorage.getItem('flagGameLeaderboard') || '[]');
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
        const diffName = gameState.currentLanguage === 'zh' ?
            (entry.difficulty === 'beginner' ? '初級' : entry.difficulty === 'intermediate' ? '中級' : '高級') :
            (entry.difficulty === 'beginner' ? 'Beginner' : entry.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${diffName}</td>
            <td>${entry.score}</td>
        `;
        tbody.appendChild(row);
    });
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
    const confirmMessage = gameState.currentLanguage === 'zh' ?
        '確定要停止挑戰嗎？目前進度將不會被保存！' :
        'Are you sure you want to quit? Current progress will not be saved!';

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
    const shareText = gameState.currentLanguage === 'zh' ?
        `🎮 我正在玩國旗王挑戰！快來測試你對世界各國國旗的認識！你能通過所有關卡成為真正的國旗王嗎？🌍👑` :
        `🎮 I'm playing Flag King Challenge! Test your knowledge of world flags! Can you pass all stages and become the true Flag King? 🌍👑`;

    // 檢查是否有設定遊戲網址
    if (GAME_URL === 'YOUR_DEPLOYED_GAME_URL_HERE') {
        alert(gameState.currentLanguage === 'zh' ?
            '⚠️ 遊戲尚未部署，請先設定遊戲網址！' :
            '⚠️ Game URL not configured yet!');
        return;
    }

    // 使用 LINE 分享功能
    const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(GAME_URL)}`;

    // 開啟 LINE 分享視窗
    window.open(lineShareUrl, '_blank', 'width=600,height=600');
}

// 分享成績
function shareScore() {
    const diffName = gameState.currentLanguage === 'zh' ?
        (gameState.difficulty === 'beginner' ? '初級' : gameState.difficulty === 'intermediate' ? '中級' : '高級') :
        (gameState.difficulty === 'beginner' ? 'Beginner' : gameState.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced');

    const shareText = gameState.currentLanguage === 'zh' ?
        `我在世界國旗挑戰（${diffName}）中獲得了 ${gameState.totalScore} 分！你能超越我嗎？🌍🏴` :
        `I scored ${gameState.totalScore} points in World Flag Challenge (${diffName})! Can you beat me? 🌍🏴`;

    if (navigator.share) {
        navigator.share({
            title: 'World Flag Challenge',
            text: shareText
        });
    } else {
        navigator.clipboard.writeText(shareText);
        alert(gameState.currentLanguage === 'zh' ? '已複製到剪貼簿！' : 'Copied to clipboard!');
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
    updateLanguage();
    loadStageProgress(); // 載入關卡進度
});
