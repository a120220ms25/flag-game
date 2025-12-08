# 🌍 旗遇世界：國旗大冒險

<div align="center">

![Flag Game Banner](https://img.shields.io/badge/Version-2.0.0-D69396?style=for-the-badge)
![Made with Love](https://img.shields.io/badge/Made%20with-❤️-D69396?style=for-the-badge)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript)

### 「知識，就是你的護照。一起環遊世界，收集所有光榮。」

[🎮 立即遊玩](https://a120220ms25.github.io/flag-game/) | [📖 遊戲規則](#-遊戲規則) | [🎯 關卡列表](#-20-關完整挑戰系統)

</div>

---

## ✨ 遊戲特色

### 🏆 20 關完整挑戰系統
從「入門級觀光客」到「國旗王」👑，循序漸進的難度設計，每關都有獨特的名稱和趣味描述。挑戰 **87 個精選國家**，覆蓋全球六大洲！

### 📅 每日挑戰模式
- 每天一次全球統一題目，挑戰世界排名
- 六級頭銜系統：從「國旗新手」到「完美國旗大師」
- 根據答對數量獲得不同等級的稱號

### 🗺️ 真實世界地圖解鎖
- 使用 **SVG 繪製**的真實大陸形狀
- 通過關卡逐步解鎖世界地圖
- 視覺化追蹤您的探索進度
- 解鎖動畫效果，更有成就感

### 💡 智能提示系統
- **3 個隨機提示**：洲別、首都、食物
- 策略性使用提示以獲得最高分
- 計分規則：無提示 10 分，使用提示逐漸減分至 3 分

### 🎵 音效與動畫
- 答對、答錯、解鎖地圖都有專屬音效
- 流暢的動畫效果和過渡
- 可自由開關音效 🔊

### 📊 進度追蹤
- 自動儲存遊戲進度到瀏覽器
- 記錄已完成關卡和解鎖國家
- 查看已解鎖的世界地圖進度

---

## 🚀 開始遊玩

### 🌐 線上遊玩（推薦）
直接訪問：**[https://a120220ms25.github.io/flag-game/](https://a120220ms25.github.io/flag-game/)**

### 💻 本地運行
```bash
# 1. Clone 專案
git clone https://github.com/a120220ms25/flag-game.git
cd flag-game

# 2. 啟動本地伺服器
python3 -m http.server 8000

# 3. 在瀏覽器開啟
# http://localhost:8000
```

---

## 📖 遊戲規則

<table>
<tr>
<td align="center">🏆</td>
<td><strong>闖關模式</strong><br/>20 個關卡，通過每關解鎖下一關</td>
</tr>
<tr>
<td align="center">📅</td>
<td><strong>每日挑戰</strong><br/>每天一次全球統一題目</td>
</tr>
<tr>
<td align="center">💡</td>
<td><strong>提示系統</strong><br/>3 個提示可用，使用會降低得分</td>
</tr>
<tr>
<td align="center">❤️</td>
<td><strong>生命值</strong><br/>3 次答錯機會，用完即結束</td>
</tr>
</table>

### 🎯 遊戲流程
1. **選擇模式**：闖關模式或每日挑戰
2. **辨識國旗**：看著國旗 emoji，從 4 個選項中選出正確答案
3. **使用提示**：不確定？可以使用提示（會減少得分）
4. **通關條件**：答對指定數量的題目即可解鎖下一關
5. **生命值**：答錯會失去生命值，用完則遊戲結束

---

## 🎯 20 關卡列表

| 關卡 | 名稱 | 特色 |
|:----:|------|------|
| 1 | 入門級觀光客 | 恭喜！您已經從「連自己國家國旗都猜不對」的階段畢業了。 |
| 2 | 紅白藍三原色終結者 | 成功區分了所有帶有紅、白、藍的旗子。你的眼睛是 RGB 測色儀嗎？ |
| 3 | 地圖炮手（自稱） | 您的知識範圍廣大，雖然準確率...見仁見智。 |
| 4 | 五角星獵人 | 您對五角星的執著，已經讓國際刑警組織開始關注您了。 |
| 5 | 順利出關的國際背包客 | 這是證明你在海關不會拿著列支敦斯登國旗，對著瑞士人揮舞的保證。 |
| 6-19 | ... | 更多有趣挑戰等著你！ |
| 20 | 國旗王 👑 | 恭喜！您已征服所有旗幟，正式登基。地球上的旗幟都是您的子民。請接受萬旗朝拜！ |

---

## 🛠️ 技術架構

<table>
<tr>
<td><strong>前端框架</strong></td>
<td>純 Vanilla JavaScript（無框架依賴）</td>
</tr>
<tr>
<td><strong>樣式設計</strong></td>
<td>CSS3 + 自訂動畫 + 響應式設計</td>
</tr>
<tr>
<td><strong>地圖繪製</strong></td>
<td>SVG (Scalable Vector Graphics)</td>
</tr>
<tr>
<td><strong>資料儲存</strong></td>
<td>localStorage</td>
</tr>
<tr>
<td><strong>音效系統</strong></td>
<td>Web Audio API</td>
</tr>
<tr>
<td><strong>字體</strong></td>
<td>Google Fonts (Inter)</td>
</tr>
</table>

### 📁 專案結構
```
flag-game/
├── index.html          # 主頁面 (HTML5)
├── script.js           # 遊戲邏輯 (2700+ 行)
├── style.css           # 樣式表 (1600+ 行)
└── README.md           # 說明文件
```

### 🌟 核心功能模組
- **遊戲狀態管理**: `gameState` / `stageConfig` / `flagDatabase`
- **進度系統**: `ProgressManager` / `AchievementManager`
- **音效系統**: `SoundManager` (Web Audio API)
- **地圖系統**: `updateWorldMap()` / `calculateRegionStats()`

---

## 🎨 設計理念

### 配色方案（簡約品牌風格）
| 用途 | 顏色代碼 | 說明 |
|------|----------|------|
| 主色調 | `#D69396` | 粉紅色 - 溫暖友善 |
| 背景色 | `#DFDFDF` | 品牌灰 - 簡約專業 |
| 面板色 | `#FFFFFF` | 純白 - 乾淨明亮 |
| 海洋色 | `#90CAF9` | 藍色漸層 |
| 陸地色 | `#8B7355` → `#9ACD32` | 棕色解鎖後變綠色 |

### 使用者體驗
✅ **響應式設計** - 完美支援桌面和移動裝置
✅ **流暢動畫** - CSS3 過渡效果
✅ **直觀操作** - 一鍵開始，簡單易懂
✅ **即時回饋** - 音效與動畫即時反應
✅ **無滾動條** - 隱藏滾動條但保持可滾動

---

## 📱 瀏覽器支援

| 瀏覽器 | 支援狀態 |
|--------|---------|
| Chrome / Edge | ✅ 最新版本 |
| Firefox | ✅ 最新版本 |
| Safari | ✅ 最新版本 |
| iOS Safari | ✅ 完美支援 |
| Chrome Mobile | ✅ 完美支援 |

---

## 📝 更新日誌

### v2.0.0 (2025-12-08) - 重大更新
- 🎮 **首頁新增遊戲規則說明區塊**（2x2 格子佈局）
- 📅 **每日挑戰全面改進**
  - 關卡名稱顯示日期和「全球統一題目」
  - 六級頭銜系統（完美國旗大師 → 國旗新手）
  - 新增「返回首頁」按鈕
- 📤 **分享功能優化**：複製遊戲網址到剪貼簿
- 🌍 **國家名稱修正**：「多明尼加」→「多明尼加共和國」
- 📱 **手機版 UX 大幅優化**
  - 全面縮小元素尺寸，提升視覺體驗
  - 標題不再碰到頂部按鈕
  - 遊戲規則改為 2x2 格子顯示
  - 精簡文字說明，減少冗餘
- 🎨 **滾動條完全隱藏**（保持可滾動功能）

### v1.2.0 (2025-12-07)
- ✨ 使用 SVG 繪製真實世界地圖
- 🎯 提示數量從 5 個優化為 3 個
- 🎨 新增地圖解鎖動畫效果

### v1.1.0 (2025-12-06)
- 🎮 更新遊戲名稱為「旗遇世界：國旗大冒險」
- 🗺️ 新增世界地圖解鎖系統
- 🎨 優化遊戲畫面元素間距

### v1.0.0 (2025-12-06)
- 🎉 首次發布
- 🏆 完整 20 關卡系統
- 🌍 87 個國家旗幟資料庫
- 🔊 音效系統
- 📊 進度追蹤系統

---

## 🤝 參與貢獻

歡迎提出 Issue 和 Pull Request！

### 如何貢獻
1. Fork 此專案
2. 創建您的特性分支 `git checkout -b feature/AmazingFeature`
3. 提交您的更改 `git commit -m 'Add some AmazingFeature'`
4. 推送到分支 `git push origin feature/AmazingFeature`
5. 開啟 Pull Request

---

## 📄 授權

本專案僅供學習和娛樂使用。

---

## 👨‍💻 開發團隊

由 **VIBECODING GAMES BY SABRINA** 精心開發

---

<div align="center">

## 🎮 準備好挑戰了嗎？

### [👉 立即開始遊玩！](https://a120220ms25.github.io/flag-game/)

---

**Made with ❤️ and 🤖 [Claude Code](https://claude.com/claude-code)**

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=a120220ms25.flag-game)

</div>
