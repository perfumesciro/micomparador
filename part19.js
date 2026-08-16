/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 19
   SISTEMA DE PUNTUACIÓN Y ESTADÍSTICAS
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ESTADO DEL JUGADOR
    ===================================================== */

    const stats19 = {

        goals: 0,

        saves: 0,

        misses: 0,

        shots: 0,

        streak: 0,

        bestStreak: 0,

        bestPower: 0,

        bestCurve: 0

    };


    /* =====================================================
       ESTILOS
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `

        #scoreboard19 {

            position: fixed;

            top: 18px;

            left: 50%;

            transform:
                translateX(-50%);

            z-index: 25000;

            display: flex;

            align-items: center;

            gap: 18px;

            padding: 10px 18px;

            border-radius: 15px;

            background:
                rgba(0,0,0,.72);

            backdrop-filter:
                blur(10px);

            color: white;

            font-family:
                Arial,
                sans-serif;

            box-shadow:
                0 8px 30px
                rgba(0,0,0,.35);

            pointer-events: none;

        }


        #scoreTeam19 {

            display: flex;

            flex-direction: column;

            align-items: center;

            min-width: 70px;

        }


        #scoreGoals19 {

            font-size: 30px;

            font-weight: 1000;

        }


        #scoreLabel19 {

            font-size: 10px;

            opacity: .65;

            text-transform:
                uppercase;

        }


        #scoreDivider19 {

            font-size: 20px;

            opacity: .5;

        }


        #statsButton19 {

            position: fixed;

            right: 18px;

            bottom: 18px;

            z-index: 26000;

            border: none;

            border-radius: 12px;

            padding: 11px 15px;

            background:
                rgba(0,0,0,.75);

            color: white;

            font-weight: 800;

            cursor: pointer;

            pointer-events: auto;

        }


        #statsPanel19 {

            position: fixed;

            right: 18px;

            bottom: 68px;

            width: 270px;

            max-width:
                calc(100vw - 36px);

            z-index: 26001;

            padding: 18px;

            border-radius: 18px;

            background:
                rgba(10,15,20,.94);

            color: white;

            font-family:
                Arial,
                sans-serif;

            box-shadow:
                0 15px 50px
                rgba(0,0,0,.5);

            display: none;

            pointer-events: auto;

        }


        #statsPanel19.open {

            display: block;

            animation:
                statsOpen19
                .2s
                ease-out;

        }


        @keyframes statsOpen19 {

            from {

                opacity: 0;

                transform:
                    translateY(10px)
                    scale(.96);

            }

            to {

                opacity: 1;

                transform:
                    translateY(0)
                    scale(1);

            }

        }


        #statsPanel19 h2 {

            margin:
                0 0 15px;

            font-size: 20px;

        }


        .statRow19 {

            display: flex;

            justify-content:
                space-between;

            padding: 7px 0;

            border-bottom:
                1px solid
                rgba(255,255,255,.08);

            font-size: 13px;

        }


        .statValue19 {

            font-weight: 900;

        }


        #statsClose19 {

            width: 100%;

            margin-top: 15px;

            padding: 9px;

            border: none;

            border-radius: 10px;

            background:
                rgba(255,255,255,.12);

            color: white;

            cursor: pointer;

        }


        #streak19 {

            position: fixed;

            left: 50%;

            top: 100px;

            transform:
                translateX(-50%);

            z-index: 25001;

            color: white;

            font-family:
                Arial,
                sans-serif;

            font-size: 15px;

            font-weight: 900;

            opacity: 0;

            pointer-events: none;

            text-shadow:
                0 3px 10px black;

        }


        #streak19.show {

            animation:
                streakAnimation19
                1.2s
                ease;

        }


        @keyframes streakAnimation19 {

            0% {

                opacity: 0;

                transform:
                    translateX(-50%)
                    translateY(10px)
                    scale(.8);

            }

            20% {

                opacity: 1;

                transform:
                    translateX(-50%)
                    translateY(0)
                    scale(1.1);

            }

            70% {

                opacity: 1;

            }

            100% {

                opacity: 0;

                transform:
                    translateX(-50%)
                    translateY(-12px)
                    scale(1);

            }

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       CREAR MARCADOR
    ===================================================== */

    function createScoreboard() {

        if (
            document.getElementById(
                "scoreboard19"
            )
        )
            return;


        const scoreboard =
            document.createElement("div");

        scoreboard.id =
            "scoreboard19";


        scoreboard.innerHTML = `

            <div id="scoreTeam19">

                <div id="scoreGoals19">
                    0
                </div>

                <div id="scoreLabel19">
                    GOLES
                </div>

            </div>

            <div id="scoreDivider19">
                -
            </div>

            <div id="scoreTeam19">

                <div id="scoreShots19">
                    0
                </div>

                <div id="scoreLabel19">
                    TIROS
                </div>

            </div>

        `;


        document.body.appendChild(
            scoreboard
        );


        const streak =
            document.createElement("div");

        streak.id =
            "streak19";


        document.body.appendChild(
            streak
        );


        createStatsButton();

    }


    /* =====================================================
       BOTÓN ESTADÍSTICAS
    ===================================================== */

    function createStatsButton() {

        if (
            document.getElementById(
                "statsButton19"
            )
        )
            return;


        const button =
            document.createElement("button");

        button.id =
            "statsButton19";


        button.textContent =
            "📊 Estadísticas";


        document.body.appendChild(
            button
        );


        button.addEventListener(
            "click",
            toggleStats
        );


        createStatsPanel();

    }


    /* =====================================================
       PANEL
    ===================================================== */

    function createStatsPanel() {

        if (
            document.getElementById(
                "statsPanel19"
            )
        )
            return;


        const panel =
            document.createElement("div");

        panel.id =
            "statsPanel19";


        panel.innerHTML = `

            <h2>
                📊 Estadísticas
            </h2>

            <div class="statRow19">
                <span>⚽ Goles</span>
                <span
                    class="statValue19"
                    id="statGoals19">
                    0
                </span>
            </div>

            <div class="statRow19">
                <span>🎯 Tiros</span>
                <span
                    class="statValue19"
                    id="statShots19">
                    0
                </span>
            </div>

            <div class="statRow19">
                <span>🧤 Atajadas</span>
                <span
                    class="statValue19"
                    id="statSaves19">
                    0
                </span>
            </div>

            <div class="statRow19">
                <span>❌ Afuera</span>
                <span
                    class="statValue19"
                    id="statMisses19">
                    0
                </span>
            </div>

            <div class="statRow19">
                <span>🎯 Efectividad</span>
                <span
                    class="statValue19"
                    id="statAccuracy19">
                    0%
                </span>
            </div>

            <div class="statRow19">
                <span>🔥 Racha actual</span>
                <span
                    class="statValue19"
                    id="statStreak19">
                    0
                </span>
            </div>

            <div class="statRow19">
                <span>🏆 Mejor racha</span>
                <span
                    class="statValue19"
                    id="statBestStreak19">
                    0
                </span>
            </div>

            <div class="statRow19">
                <span>💨 Mayor potencia</span>
                <span
                    class="statValue19"
                    id="statPower19">
                    0
                </span>
            </div>

            <div class="statRow19">
                <span>🌀 Mayor efecto</span>
                <span
                    class="statValue19"
                    id="statCurve19">
                    0
                </span>
            </div>

            <button id="statsClose19">
                Cerrar
            </button>

        `;


        document.body.appendChild(
            panel
        );


        document
            .getElementById(
                "statsClose19"
            )
            .addEventListener(
                "click",
                toggleStats
            );

    }


    /* =====================================================
       MOSTRAR / OCULTAR ESTADÍSTICAS
    ===================================================== */

    function toggleStats() {

        const panel =
            document.getElementById(
                "statsPanel19"
            );


        if (!panel)
            return;


        panel.classList.toggle(
            "open"
        );


        updateStatsPanel();

    }


    /* =====================================================
       ACTUALIZAR MARCADOR
    ===================================================== */

    function updateScoreboard() {

        const goals =
            document.getElementById(
                "scoreGoals19"
            );

        const shots =
            document.getElementById(
                "scoreShots19"
            );


        if (goals)
            goals.textContent =
                stats19.goals;


        if (shots)
            shots.textContent =
                stats19.shots;

    }


    /* =====================================================
       ACTUALIZAR PANEL
    ===================================================== */

    function updateStatsPanel() {

        const accuracy =
            stats19.shots > 0
                ? (
                    stats19.goals /
                    stats19.shots *
                    100
                ).toFixed(0)
                : 0;


        setText(
            "statGoals19",
            stats19.goals
        );

        setText(
            "statShots19",
            stats19.shots
        );

        setText(
            "statSaves19",
            stats19.saves
        );

        setText(
            "statMisses19",
            stats19.misses
        );

        setText(
            "statAccuracy19",
            accuracy + "%"
        );

        setText(
            "statStreak19",
            stats19.streak
        );

        setText(
            "statBestStreak19",
            stats19.bestStreak
        );

        setText(
            "statPower19",
            Math.round(
                stats19.bestPower
            )
        );

        setText(
            "statCurve19",
            Math.round(
                Math.abs(
                    stats19.bestCurve
                )
            )
        );

    }


    /* =====================================================
       FUNCIÓN AUXILIAR
    ===================================================== */

    function setText(
        id,
        value
    ) {

        const element =
            document.getElementById(
                id
            );


        if (element)
            element.textContent =
                value;

    }


    /* =====================================================
       REGISTRAR GOL
    ===================================================== */

    window.registerGoal19 =
        function(
            power = 0,
            curve = 0
        ) {

            stats19.goals++;

            stats19.shots++;

            stats19.streak++;


            if (
                stats19.streak >
                stats19.bestStreak
            ) {

                stats19.bestStreak =
                    stats19.streak;

            }


            stats19.bestPower =
                Math.max(
                    stats19.bestPower,
                    power
                );


            stats19.bestCurve =
                Math.max(
                    stats19.bestCurve,
                    Math.abs(curve)
                );


            updateScoreboard();

            updateStatsPanel();

            showStreak();

        };


    /* =====================================================
       REGISTRAR ATAJADA
    ===================================================== */

    window.registerSave19 =
        function(
            power = 0,
            curve = 0
        ) {

            stats19.saves++;

            stats19.shots++;

            stats19.streak = 0;


            stats19.bestPower =
                Math.max(
                    stats19.bestPower,
                    power
                );


            stats19.bestCurve =
                Math.max(
                    stats19.bestCurve,
                    Math.abs(curve)
                );


            updateScoreboard();

            updateStatsPanel();

        };


    /* =====================================================
       REGISTRAR TIRO AFUERA
    ===================================================== */

    window.registerMiss19 =
        function(
            power = 0,
            curve = 0
        ) {

            stats19.misses++;

            stats19.shots++;

            stats19.streak = 0;


            stats19.bestPower =
                Math.max(
                    stats19.bestPower,
                    power
                );


            stats19.bestCurve =
                Math.max(
                    stats19.bestCurve,
                    Math.abs(curve)
                );


            updateScoreboard();

            updateStatsPanel();

        };


    /* =====================================================
       RACHA
    ===================================================== */

    function showStreak() {

        if (
            stats19.streak < 2
        )
            return;


        const element =
            document.getElementById(
                "streak19"
            );


        if (!element)
            return;


        element.textContent =
            "🔥 " +
            stats19.streak +
            " GOLES SEGUIDOS";


        element.classList.remove(
            "show"
        );


        void element.offsetWidth;


        element.classList.add(
            "show"
        );

    }


    /* =====================================================
       DETECTAR RESULTADO DEL TIRO LIBRE
    ===================================================== */

    function connectFreeKickResult() {

        const result =
            document.getElementById(
                "freeKickResult16"
            );


        if (!result)
            return;


        if (
            result.dataset.stats19
            ===
            "connected"
        )
            return;


        result.dataset.stats19 =
            "connected";


        const observer =
            new MutationObserver(
                () => {

                    const text =
                        result.textContent
                            .toUpperCase();


                    /*
                       Evitamos registrar
                       varias veces el mismo
                       resultado.
                    */

                    if (
                        result.dataset.lastResult19
                        ===
                        text
                    )
                        return;


                    result.dataset.lastResult19 =
                        text;


                    if (
                        text.includes(
                            "GOOOOOOL"
                        )
                    ) {

                        registerGoal19(
                            getPower(),
                            getCurve()
                        );

                    }

                    else if (
                        text.includes(
                            "ATAJADÓN"
                        )
                    ) {

                        registerSave19(
                            getPower(),
                            getCurve()
                        );

                    }

                    else if (
                        text.includes(
                            "AFUERA"
                        )
                    ) {

                        registerMiss19(
                            getPower(),
                            getCurve()
                        );

                    }

                }
            );


        observer.observe(
            result,
            {
                childList:
                    true,

                characterData:
                    true,

                subtree:
                    true
            }
        );

    }


    /* =====================================================
       OBTENER POTENCIA
    ===================================================== */

    function getPower() {

        const fill =
            document.getElementById(
                "freeKickPowerFill16"
            );


        if (!fill)
            return 0;


        const width =
            parseFloat(
                fill.style.width
            );


        return Number.isFinite(width)
            ? width
            : 0;

    }


    /* =====================================================
       OBTENER EFECTO
    ===================================================== */

    function getCurve() {

        const curve =
            document.getElementById(
                "freeKickCurve16"
            );


        if (!curve)
            return 0;


        const transform =
            curve.style.transform;


        const match =
            transform.match(
                /rotate\((-?\d+(?:\.\d+)?)deg\)/
            );


        if (!match)
            return 0;


        return Number(
            match[1]
        );

    }


    /* =====================================================
       REINTENTAR CONECTAR
    ===================================================== */

    function monitorGame() {

        connectFreeKickResult();

        updateScoreboard();

        updateStatsPanel();

    }


    /* =====================================================
       API PARA OTROS MODOS
    ===================================================== */

    window.getFootballStats19 =
        function() {

            return {
                ...stats19
            };

        };


    window.resetFootballStats19 =
        function() {

            stats19.goals = 0;

            stats19.saves = 0;

            stats19.misses = 0;

            stats19.shots = 0;

            stats19.streak = 0;

            stats19.bestStreak = 0;

            stats19.bestPower = 0;

            stats19.bestCurve = 0;


            updateScoreboard();

            updateStatsPanel();

        };


    /* =====================================================
       INICIO
    ===================================================== */

    createScoreboard();

    monitorGame();


    setInterval(
        monitorGame,
        700
    );


    console.log(
        "📊 Parte 19 cargada: estadísticas"
    );

})();
