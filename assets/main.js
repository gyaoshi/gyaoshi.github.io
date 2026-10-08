/* =========================================================
   GYAOSHI // 主页交互
   1. 入场动画（IntersectionObserver）
   2. 首屏数据雨画布
   3. 统计数字滚动
   ========================================================= */

(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* --- 1. 入场动画 --- */
    function initReveal() {
        var items = document.querySelectorAll(".reveal");
        if (!("IntersectionObserver" in window)) {
            items.forEach(function (el) { el.classList.add("in"); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("in");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

        items.forEach(function (el) { observer.observe(el); });
    }

    /* --- 2. 统计数字滚动 --- */
    function animateCount(el) {
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        if (reduceMotion) {
            el.textContent = String(target).padStart(2, "0");
            return;
        }

        var start = performance.now();
        var duration = 900;

        function step(now) {
            var progress = Math.min((now - start) / duration, 1);
            var value = Math.round(target * progress);
            el.textContent = String(value).padStart(2, "0");
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    function initCounters() {
        document.querySelectorAll("[data-count]").forEach(animateCount);
    }

    /* --- 3. 数据雨 --- */
    function initRain() {
        var canvas = document.getElementById("rain");
        if (!canvas || reduceMotion) return;

        var ctx = canvas.getContext("2d");
        if (!ctx) return;

        var chars = "アイウエオカキクケコサシスセソ0123456789ABCDEFGX#$%&+";
        var fontSize = 15;
        var columns = 0;
        var drops = [];

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            columns = Math.floor(canvas.width / fontSize);
            drops = new Array(columns).fill(0).map(function () {
                return Math.random() * -50;
            });
        }

        resize();
        window.addEventListener("resize", resize);

        function draw() {
            // 半透明黑色覆盖，形成拖尾效果
            ctx.fillStyle = "rgba(7, 7, 10, 0.08)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = fontSize + "px 'Share Tech Mono', monospace";

            for (var i = 0; i < drops.length; i++) {
                var text = chars.charAt(Math.floor(Math.random() * chars.length));
                var x = i * fontSize;
                var y = drops[i] * fontSize;

                // 首字符高亮，模拟信号脉冲
                ctx.fillStyle = Math.random() > 0.975 ? "#fcee0a" : "#00f0ff";
                ctx.globalAlpha = 0.55;
                ctx.fillText(text, x, y);
                ctx.globalAlpha = 1;

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            requestAnimationFrame(draw);
        }

        draw();
    }

    initReveal();
    initCounters();
    initRain();
})();
