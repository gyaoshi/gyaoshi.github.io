/* =========================================================
   GYAOSHI // 多语言（中 / EN / 日 / 俄）
   HTML 默认中文，切换后写入 localStorage 并同步 lang 与 meta
   ========================================================= */

(function () {
    "use strict";

    var STORAGE_KEY = "gyaoshi-lang";
    var DEFAULT_LANG = "zh";
    var SUPPORTED = ["zh", "en", "ja", "ru"];
    var HTML_LANG = { zh: "zh-CN", en: "en", ja: "ja", ru: "ru" };
    var NBSP = "\u00A0";

    /* --- 词典：键与 index.html 的 data-i18n 对应 --- */
    var DICT = {
        zh: {
            "meta.title": "GYAOSHI // 独立开发者 · 已上架作品",
            "meta.desc": "gyaoshi — 独立开发者。Eye Defender、Neck Posture Alert、Multi AI、Charging Monitor 等已上架 Google Play 与 Chrome 应用商店的作品。",
            "nav.aria": "主导航",
            "lang.aria": "选择语言",
            "hero.kicker": "[ 档案 // GYAOSHI.SYS " + NBSP + "·" + NBSP + " NETRUNNER ID 0xGYAOSHI ]",
            "hero.role": "INDIE DEVELOPER <span class=\"sep\">/</span> 独立开发者",
            "hero.desc": "做能真正用起来的东西：Android 应用与 Chrome 扩展，全部<b>上架</b> Google Play 与 Chrome 应用商店，源码开源。",
            "hero.cta": "查看作品 ▼",
            "stat.apps": "DEPLOYED APPS / 已上架",
            "stat.platforms": "PLATFORMS / 分发平台",
            "stat.oss": "OPEN SOURCE / 开源",
            "ticker": "GOOGLE PLAY 上架中 · EYE DEFENDER · NECK POSTURE ALERT · CHARGING MONITOR · CHROME WEB STORE · MULTI AI · KOTLIN · JETPACK COMPOSE · ML KIT · MANIFEST V3 ·" + NBSP,
            "sec1.title": "已部署模块",
            "sec1.note": "4 UNITS",
            "sec2.title": "技术装备",
            "sec2.note": "LOADED",
            "sec3.title": "链路",
            "sec3.note": "OPEN",
            "card1.sub": "护眼休息提醒 · 20-20-20 法则",
            "card1.desc": "每 20 分钟看 20 英尺外 20 秒。悬浮窗与全屏提醒、屏幕熄灭自动暂停、每日用眼统计与 7 日趋势图，支持 32 种语言。",
            "card2.sub": "颈部前倾检测 · 埋头预警",
            "card2.desc": "摄像头 + ML Kit 人脸检测，融合机身传感器计算绝对低头角度，超过阈值立即横幅 + 震动提醒。100% 端上处理，不联网、不上传。",
            "card3.sub": "多引擎聚合 · Chrome 扩展",
            "card3.desc": "一个页面同时向 16 个 AI 站点与 40+ 搜索引擎发起请求：统一输入、同时发送、结果并排对比。支持暗色/亮色与 10 种界面语言。",
            "card4.sub": "充电功率与电池健康监控",
            "card4.desc": "实时显示电压、电流、功率与温度，识别 QC、USB PD、SCP/FCP、VOOC 等快充协议，充电质量评分与历史曲线图表。",
            "card4.details": "DETAILS ⟶",
            "stack.foot1": "APK / AAB · GOOGLE PLAY 上架",
            "stack.foot2": "CHROME WEB STORE 上架",
            "stack.foot3": "从写码到上架的完整闭环",
            "stack.iframe": "iframe 多栏布局",
            "stack.privacy": "隐私政策与合规",
            "link1.meta": "@gyaoshi · 源码与提交记录",
            "link2.meta": "开发者主页 · 3 款上架应用",
            "link3.meta": "Multi AI 扩展"
        },
        en: {
            "meta.title": "GYAOSHI // Indie Developer · Published Apps",
            "meta.desc": "gyaoshi — indie developer. Published on Google Play and the Chrome Web Store: Eye Defender, Neck Posture Alert, Multi AI, Charging Monitor.",
            "nav.aria": "Main navigation",
            "lang.aria": "Choose language",
            "hero.kicker": "[ PROFILE // GYAOSHI.SYS " + NBSP + "·" + NBSP + " NETRUNNER ID 0xGYAOSHI ]",
            "hero.role": "INDIE DEVELOPER <span class=\"sep\">/</span> Independent Developer",
            "hero.desc": "Tools that actually get used: Android apps and Chrome extensions, all <b>published</b> on Google Play and the Chrome Web Store, source code open.",
            "hero.cta": "VIEW WORK ▼",
            "stat.apps": "DEPLOYED APPS / PUBLISHED",
            "stat.platforms": "PLATFORMS / DISTRIBUTION",
            "stat.oss": "OPEN SOURCE / PUBLIC",
            "ticker": "LIVE ON GOOGLE PLAY · EYE DEFENDER · NECK POSTURE ALERT · CHARGING MONITOR · CHROME WEB STORE · MULTI AI · KOTLIN · JETPACK COMPOSE · ML KIT · MANIFEST V3 ·" + NBSP,
            "sec1.title": "Projects",
            "sec1.note": "4 UNITS",
            "sec2.title": "Stack",
            "sec2.note": "LOADED",
            "sec3.title": "Contact",
            "sec3.note": "OPEN",
            "card1.sub": "Eye break reminders · 20-20-20 rule",
            "card1.desc": "Every 20 minutes, look at something 20 feet away for 20 seconds. Floating and full-screen reminders, auto-pause when the screen is off, daily usage stats and a 7-day trend chart. 32 languages.",
            "card2.sub": "Neck flexion detection · look-down alerts",
            "card2.desc": "Camera + ML Kit face detection fused with the phone's motion sensors gives your absolute neck angle; a banner and vibration fire the moment you cross the threshold. 100% on-device — no network, no uploads.",
            "card3.sub": "Multi-engine search · Chrome extension",
            "card3.desc": "One page fires a single query at 16 AI sites and 40+ search engines: type once, send everywhere, compare results side by side. Dark/light themes and 10 interface languages.",
            "card4.sub": "Charging power & battery health monitor",
            "card4.desc": "Live voltage, current, power and temperature, fast-charge protocol detection (QC, USB PD, SCP/FCP, VOOC), charging quality score and historical charts.",
            "card4.details": "DETAILS ⟶",
            "stack.foot1": "APK / AAB · ON GOOGLE PLAY",
            "stack.foot2": "ON THE CHROME WEB STORE",
            "stack.foot3": "End-to-end: from code to store listing",
            "stack.iframe": "iframe multi-pane layout",
            "stack.privacy": "Privacy policy & compliance",
            "link1.meta": "@gyaoshi · source & commit history",
            "link2.meta": "Developer page · 3 published apps",
            "link3.meta": "Multi AI extension"
        },
        ja: {
            "meta.title": "GYAOSHI // インディー開発者 · 公開アプリ",
            "meta.desc": "gyaoshi — インディー開発者。Google Play と Chrome ウェブストアで公開中の Eye Defender、Neck Posture Alert、Multi AI、Charging Monitor。",
            "nav.aria": "メインナビゲーション",
            "lang.aria": "言語を選択",
            "hero.kicker": "[ プロファイル // GYAOSHI.SYS " + NBSP + "·" + NBSP + " NETRUNNER ID 0xGYAOSHI ]",
            "hero.role": "INDIE DEVELOPER <span class=\"sep\">/</span> インディー開発者",
            "hero.desc": "実際に使えるものだけを作る：Android アプリと Chrome 拡張機能。すべて <b>公開済み</b> で、Google Play と Chrome ウェブストアに掲載、ソースはオープン。",
            "hero.cta": "作品を見る ▼",
            "stat.apps": "DEPLOYED APPS / 公開済み",
            "stat.platforms": "PLATFORMS / 配布先",
            "stat.oss": "OPEN SOURCE / オープン",
            "ticker": "GOOGLE PLAY 公開中 · EYE DEFENDER · NECK POSTURE ALERT · CHARGING MONITOR · CHROME WEB STORE · MULTI AI · KOTLIN · JETPACK COMPOSE · ML KIT · MANIFEST V3 ·" + NBSP,
            "sec1.title": "プロジェクト",
            "sec1.note": "4 UNITS",
            "sec2.title": "技術スタック",
            "sec2.note": "LOADED",
            "sec3.title": "連絡先",
            "sec3.note": "OPEN",
            "card1.sub": "目の休憩リマインダー · 20-20-20 ルール",
            "card1.desc": "20分ごとに20フィート先を20秒間見つめる。フローティング／全画面リマインダー、画面オフ時は自動停止、毎日の使用統計と7日間の推移グラフ。32言語対応。",
            "card2.sub": "前傾姿勢の検知 · うつむき警告",
            "card2.desc": "カメラ + ML Kit の顔検出と端末モーションセンサーを融合し、絶対的な前傾角を算出。閾値を超えるとバナー＋振動で即警告。処理は100%端末内で完結し、通信もアップロードも行いません。",
            "card3.sub": "マルチエンジン検索 · Chrome 拡張機能",
            "card3.desc": "1つのページから16のAIサイトと40以上の検索エンジンへ同時にリクエスト。入力は1回、結果は横並びで比較。ダーク／ライトテーマと10種のUI言語に対応。",
            "card4.sub": "充電電力・バッテリー健康モニター",
            "card4.desc": "電圧・電流・電力・温度をリアルタイム表示。QC、USB PD、SCP/FCP、VOOC などの急速充電プロトコルを検出し、充電品質スコアと履歴グラフを提供。",
            "card4.details": "詳細 ⟶",
            "stack.foot1": "APK / AAB · GOOGLE PLAY 掲載",
            "stack.foot2": "CHROME WEB STORE 掲載",
            "stack.foot3": "コードからストア掲載まで一気通貫",
            "stack.iframe": "iframe マルチペイン表示",
            "stack.privacy": "プライバシーポリシーとコンプライアンス",
            "link1.meta": "@gyaoshi · ソースとコミット履歴",
            "link2.meta": "開発者ページ · 掲載アプリ3本",
            "link3.meta": "Multi AI 拡張機能"
        },
        ru: {
            "meta.title": "GYAOSHI // Независимый разработчик · Опубликованные приложения",
            "meta.desc": "gyaoshi — независимый разработчик. Опубликовано в Google Play и Chrome Web Store: Eye Defender, Neck Posture Alert, Multi AI, Charging Monitor.",
            "nav.aria": "Основная навигация",
            "lang.aria": "Выбор языка",
            "hero.kicker": "[ ПРОФИЛЬ // GYAOSHI.SYS " + NBSP + "·" + NBSP + " NETRUNNER ID 0xGYAOSHI ]",
            "hero.role": "INDIE DEVELOPER <span class=\"sep\">/</span> Независимый разработчик",
            "hero.desc": "Инструменты, которыми действительно пользуются: приложения для Android и расширения для Chrome, все <b>опубликованы</b> в Google Play и Chrome Web Store, исходники открыты.",
            "hero.cta": "СМОТРЕТЬ РАБОТЫ ▼",
            "stat.apps": "DEPLOYED APPS / ВЫПУЩЕНО",
            "stat.platforms": "PLATFORMS / ПЛОЩАДКИ",
            "stat.oss": "OPEN SOURCE / ОТКРЫТО",
            "ticker": "УЖЕ В GOOGLE PLAY · EYE DEFENDER · NECK POSTURE ALERT · CHARGING MONITOR · CHROME WEB STORE · MULTI AI · KOTLIN · JETPACK COMPOSE · ML KIT · MANIFEST V3 ·" + NBSP,
            "sec1.title": "Проекты",
            "sec1.note": "4 UNITS",
            "sec2.title": "Стек",
            "sec2.note": "LOADED",
            "sec3.title": "Связь",
            "sec3.note": "OPEN",
            "card1.sub": "Перерывы для глаз · правило 20-20-20",
            "card1.desc": "Каждые 20 минут смотрите вдалеку на 20 секунд. Всплывающее и полноэкранное напоминание, автопауза при выключенном экране, статистика за день и график за 7 дней. 32 языка.",
            "card2.sub": "Определение наклона шеи · сигнал при опускании головы",
            "card2.desc": "Камера и распознавание лица ML Kit в связке с датчиками движения дают реальный угол наклона шеи; при превышении порога — баннер и вибрация. Обработка 100% на устройстве: без сети и без загрузки данных.",
            "card3.sub": "Мультипоиск · расширение для Chrome",
            "card3.desc": "Один запрос — 16 AI-сайтов и 40+ поисковиков на одной странице: вводите один раз, отправляете везде, сравниваете результаты рядом. Тёмная/светлая темы и 10 языков интерфейса.",
            "card4.sub": "Мониторинг зарядки и здоровья батареи",
            "card4.desc": "Напряжение, ток, мощность и температура в реальном времени, распознавание быстрых протоколов (QC, USB PD, SCP/FCP, VOOC), оценка качества зарядки и графики за период.",
            "card4.details": "ПОДРОБНО ⟶",
            "stack.foot1": "APK / AAB · В GOOGLE PLAY",
            "stack.foot2": "В CHROME WEB STORE",
            "stack.foot3": "От кода до публикации в каталоге",
            "stack.iframe": "многопанельный iframe",
            "stack.privacy": "Политика конфиденциальности и комплаенс",
            "link1.meta": "@gyaoshi · исходники и история коммитов",
            "link2.meta": "Страница разработчика · 3 приложения",
            "link3.meta": "Расширение Multi AI"
        }
    };

    /* --- 读取已保存的语言，失败时回退到浏览器语言 --- */
    function detectLang() {
        try {
            var saved = window.localStorage.getItem(STORAGE_KEY);
            if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
        } catch (err) {
            // 隐私模式下 localStorage 可能抛错，忽略并继续用浏览器语言
            void err;
        }

        var browser = (navigator.language || DEFAULT_LANG).slice(0, 2).toLowerCase();
        return SUPPORTED.indexOf(browser) !== -1 ? browser : DEFAULT_LANG;
    }

    function saveLang(lang) {
        try {
            window.localStorage.setItem(STORAGE_KEY, lang);
        } catch (err) {
            void err;
        }
    }

    /* --- 把词典写入 DOM --- */
    function applyMeta(dict) {
        if (dict["meta.title"]) document.title = dict["meta.title"];
        var meta = document.querySelector('meta[name="description"]');
        if (meta && dict["meta.desc"]) meta.setAttribute("content", dict["meta.desc"]);
    }

    function applyNodes(attribute, useHtml, dict) {
        var nodes = document.querySelectorAll("[" + attribute + "]");
        nodes.forEach(function (el) {
            var key = el.getAttribute(attribute);
            var value = dict[key] !== undefined ? dict[key] : DICT[DEFAULT_LANG][key];
            if (value === undefined) return;
            if (useHtml) el.innerHTML = value;
            else el.textContent = value;
        });
    }

    function applyAttrs(dict) {
        document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
            el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
                var parts = pair.split(":");
                if (parts.length !== 2) return;
                var key = parts[1].trim();
                var value = dict[key] !== undefined ? dict[key] : DICT[DEFAULT_LANG][key];
                if (value !== undefined) el.setAttribute(parts[0].trim(), value);
            });
        });
    }

    function syncSwitcher(lang) {
        document.querySelectorAll(".hud-lang [data-lang]").forEach(function (btn) {
            btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
        });
    }

    function applyLang(lang) {
        var dict = DICT[lang] || DICT[DEFAULT_LANG];
        document.documentElement.lang = HTML_LANG[lang] || lang;
        applyMeta(dict);
        applyNodes("data-i18n", false, dict);
        applyNodes("data-i18n-html", true, dict);
        applyAttrs(dict);
        syncSwitcher(lang);
    }

    /* --- 切换器事件 --- */
    function bindSwitcher() {
        document.querySelectorAll(".hud-lang [data-lang]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var lang = btn.getAttribute("data-lang");
                if (SUPPORTED.indexOf(lang) === -1) return;
                saveLang(lang);
                applyLang(lang);
            });
        });
    }

    function init() {
        var lang = detectLang();
        applyLang(lang);
        bindSwitcher();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
