/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 25
   SISTEMA COMPLETO DE PENALES
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ESTADO
    ===================================================== */

    const penalty25 = {

        active: false,

        aiming: false,

        shooting: false,

        locked: false,

        targetX: 50,

        targetY: 35,

        power: 70,

        keeperX: 50,

        goals: 0,

        shots: 0,

        saves: 0,

        misses: 0

    };


    /* =====================================================
       CONFIGURACIÓN
    ===================================================== */

    const config25 = {

        goalWidth: 46,

        goalHeight: 28,

        shotDuration: 750,

        keeperReaction: 350,

        cooldown: 1200

    };


    /* =====================================================
       ESTILOS
    ===================================================== */

    const style =
        document.createElement("style");


    style.textContent = `

        #penalty25 {

            position: fixed;

            inset: 0;

            z-index: 16000;

            display: none;

            overflow: hidden;

            background:
                linear-gradient(
                    to bottom,
                    #6db4e8 0%,
                    #bfe7ff 42%,
                    #399347 43%,
                    #23742f 100%
                );

            font-family:
                Arial,
                sans-serif;

        }


        #penalty25.active {

            display: block;

        }


        /* =========================
           ESTADIO
        ========================= */

        #penaltyStadium25 {

            position: absolute;

            inset: 0;

            overflow: hidden;

        }


        #penaltyLights25 {

            position: absolute;

            top: 0;

            left: 0;

            right: 0;

            height: 16%;

            background:
                radial-gradient(
                    ellipse,
                    rgba(255,255,255,.8),
                    transparent 65%
                );

            opacity: .7;

        }


        #penaltyCrowd25 {

            position: absolute;

            top: 13%;

            left: 0;

            right: 0;

            height: 20%;

            background:
                repeating-linear-gradient(
                    90deg,
                    rgba(20,20,20,.7) 0 8px,
                    rgba(80,80,80,.7) 8px 16px
                );

            opacity: .7;

        }


        #penaltyField25 {

            position: absolute;

            left: 0;

            right: 0;

            bottom: 0;

            height: 58%;

            background:
                repeating-linear-gradient(
                    90deg,
                    #348d3d 0 80px,
                    #3b9944 80px 160px
                );

        }


        #penaltyBox25 {

            position: absolute;

            left: 50%;

            top: 39%;

            width: min(650px, 85vw);

            height: 230px;

            transform:
                translateX(-50%);

            border:
                4px solid
                rgba(255,255,255,.85);

            border-bottom: none;

        }


        /* =========================
           ARCO
        ========================= */

        #penaltyGoal25 {

            position: absolute;

            left: 50%;

            top: 22%;

            width: min(600px, 82vw);

            height: min(270px, 32vw);

            transform:
                translateX(-50%);

            border:
                9px solid
                white;

            border-bottom-width:
                12px;

            box-shadow:
                0 10px 25px
                rgba(0,0,0,.35);

            background:
                repeating-linear-gradient(
                    0deg,
                    transparent 0 15px,
                    rgba(255,255,255,.18) 15px 17px
                ),
                repeating-linear-gradient(
                    90deg,
                    transparent 0 18px,
                    rgba(255,255,255,.18) 18px 20px
                );

        }


        /* =========================
           ARQUERO
        ========================= */

        #penaltyKeeper25 {

            position: absolute;

            left: 50%;

            top: 35%;

            transform:
                translate(-50%,-50%);

            width: 65px;

            height: 95px;

            z-index: 16020;

            font-size: 65px;

            display: flex;

            align-items: center;

            justify-content: center;

            filter:
                drop-shadow(
                    0 7px 5px
                    rgba(0,0,0,.4)
                );

            pointer-events: none;

        }


        #penaltyKeeper25.left {

            animation:
                penaltyKeeperLeft25
                .55s
                ease-out
                forwards;

        }


        #penaltyKeeper25.right {

            animation:
                penaltyKeeperRight25
                .55s
                ease-out
                forwards;

        }


        #penaltyKeeper25.center {

            animation:
                penaltyKeeperCenter25
                .5s
                ease-out
                forwards;

        }


        @keyframes penaltyKeeperLeft25 {

            to {

                transform:
                    translate(
                        -170%,
                        -80%
                    )
                    rotate(-55deg);

            }

        }


        @keyframes penaltyKeeperRight25 {

            to {

                transform:
                    translate(
                        70%,
                        -80%
                    )
                    rotate(55deg);

            }

        }


        @keyframes penaltyKeeperCenter25 {

            50% {

                transform:
                    translate(
                        -50%,
                        -75%
                    )
                    scale(1.15);

            }

            100% {

                transform:
                    translate(
                        -50%,
                        -50%
                    );

            }

        }


        /* =========================
           JUGADOR
        ========================= */

        #penaltyPlayer25 {

            position: absolute;

            left: 50%;

            bottom: 13%;

            transform:
                translateX(-50%);

            z-index: 16030;

            font-size: 80px;

            pointer-events: none;

        }


        #penaltyPlayer25.kick {

            animation:
                penaltyPlayerKick25
                .65s
                ease-out;

        }


        @keyframes penaltyPlayerKick25 {

            0% {

                transform:
                    translateX(-50%)
                    translateY(0)
                    rotate(0);

            }

            30% {

                transform:
                    translateX(-55%)
                    translateY(-12px)
                    rotate(-5deg);

            }

            55% {

                transform:
                    translateX(-42%)
                    translateY(-4px)
                    rotate(18deg);

            }

            75% {

                transform:
                    translateX(-47%)
                    translateY(0)
                    rotate(5deg);

            }

            100% {

                transform:
                    translateX(-50%)
                    translateY(0)
                    rotate(0);

            }

        }


        /* =========================
           PELOTA
        ========================= */

        #penaltyBall25 {

            position: absolute;

            left: 50%;

            bottom: 22%;

            transform:
                translate(-50%,-50%);

            z-index: 16025;

            font-size: 35px;

            pointer-events: none;

        }


        #penaltyBall25.fly {

            animation:
                penaltyBallFly25
                .75s
                cubic-bezier(
                    .15,
                    .75,
                    .25,
                    1
                )
                forwards;

        }


        /* =========================
           APUNTADOR
        ========================= */

        #penaltyAim25 {

            position: absolute;

            width: 42px;

            height: 42px;

            border:
                3px solid
                white;

            border-radius: 50%;

            z-index: 16040;

            pointer-events: none;

            transform:
                translate(-50%,-50%);

            box-shadow:
                0 0 15px
                rgba(255,255,255,.8);

        }


        #penaltyAim25::before,

        #penaltyAim25::after {

            content: "";

            position: absolute;

            background: white;

        }


        #penaltyAim25::before {

            width: 58px;

            height: 2px;

            left: -11px;

            top: 18px;

        }


        #penaltyAim25::after {

            height: 58px;

            width: 2px;

            left: 18px;

            top: -11px;

        }


        /* =========================
           PANEL
        ========================= */

        #penaltyPanel25 {

            position: absolute;

            left: 50%;

            bottom: 3%;

            transform:
                translateX(-50%);

            width: min(430px, 90vw);

            z-index: 17000;

            display: flex;

            flex-direction: column;

            align-items: center;

            gap: 10px;

        }


        #penaltyPower25 {

            width: 100%;

            height: 18px;

            border-radius: 20px;

            background:
                rgba(0,0,0,.5);

            overflow: hidden;

            border:
                2px solid
                rgba(255,255,255,.8);

        }


        #penaltyPowerFill25 {

            height: 100%;

            width: 70%;

            background:
                linear-gradient(
                    90deg,
                    #34d058,
                    #f6d32d,
                    #ff4d4d
                );

            transition:
                width .08s linear;

        }


        #penaltyPowerText25 {

            color: white;

            font-weight: 900;

            text-shadow:
                0 3px 8px black;

        }


        #penaltyHelp25 {

            color: white;

            font-size: 13px;

            font-weight: 700;

            text-align: center;

            text-shadow:
                0 3px 8px black;

        }


        #penaltyShoot25 {

            padding:
                13px 28px;

            border: none;

            border-radius: 12px;

            background:
                #168b35;

            color: white;

            font-weight: 1000;

            font-size: 15px;

            cursor: pointer;

            box-shadow:
                0 6px 15px
                rgba(0,0,0,.3);

        }


        #penaltyShoot25:hover {

            transform:
                translateY(-2px);

        }


        #penaltyExit25 {

            position: absolute;

            top: 15px;

            right: 15px;

            z-index: 18000;

            border: none;

            border-radius: 10px;

            padding: 9px 13px;

            background:
                rgba(0,0,0,.6);

            color: white;

            cursor: pointer;

            font-weight: 800;

        }


        #penaltyResult25 {

            position: absolute;

            left: 50%;

            top: 12%;

            transform:
                translateX(-50%);

            z-index: 18000;

            color: white;

            font-size: clamp(
                30px,
                6vw,
                65px
            );

            font-weight: 1000;

            text-shadow:
                0 5px 20px black;

            opacity: 0;

            pointer-events: none;

        }


        #penaltyResult25.show {

            animation:
                penaltyResult25
                1.2s
                ease-out;

        }


        @keyframes penaltyResult25 {

            0% {

                opacity: 0;

                transform:
                    translateX(-50%)
                    scale(.6);

            }

            20% {

                opacity: 1;

                transform:
                    translateX(-50%)
                    scale(1.15);

            }

            70% {

                opacity: 1;

            }

            100% {

                opacity: 0;

                transform:
                    translateX(-50%)
                    scale(1);

            }

        }


        @media(max-width:700px) {

            #penaltyGoal25 {

                top: 24%;

            }

            #penaltyKeeper25 {

                top: 36%;

            }

            #penaltyPlayer25 {

                bottom: 17%;

            }

            #penaltyBall25 {

                bottom: 25%;

            }

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       CREAR ESCENA
    ===================================================== */

    function createPenaltyScene25() {

        if (
            document.getElementById(
                "penalty25"
            )
        )
            return;


        const scene =
            document.createElement(
                "div"
            );

        scene.id =
            "penalty25";


        scene.innerHTML = `

            <div id="penaltyStadium25">

                <div id="penaltyLights25"></div>

                <div id="penaltyCrowd25"></div>

                <div id="penaltyField25"></div>

                <div id="penaltyBox25"></div>

                <div id="penaltyGoal25"></div>

                <div
                    id="penaltyKeeper25">
                    🧤
                </div>

                <div
                    id="penaltyPlayer25">
                    🧍‍♂️
                </div>

                <div
                    id="penaltyBall25">
                    ⚽
                </div>

                <div
                    id="penaltyAim25">
                </div>

                <div
                    id="penaltyResult25">
                </div>

                <div
                    id="penaltyPanel25">

                    <div
                        id="penaltyHelp25">
                        🖱️ Mové el mouse
                        para apuntar
                    </div>

                    <div
                        id="penaltyPower25">

                        <div
                            id="penaltyPowerFill25">
                        </div>

                    </div>

                    <div
                        id="penaltyPowerText25">
                        Potencia: 70%
                    </div>

                    <button
                        id="penaltyShoot25">
                        ⚽ PATEAR
                    </button>

                </div>

                <button
                    id="penaltyExit25">
                    ✕ Salir
                </button>

            </div>

        `;


        document.body.appendChild(
            scene
        );


        connectPenaltyControls25();

    }


    /* =====================================================
       ABRIR PENAL
    ===================================================== */

    window.startPenaltyMode25 =
        function() {

            createPenaltyScene25();


            const scene =
                document.getElementById(
                    "penalty25"
                );


            scene.classList.add(
                "active"
            );


            penalty25.active =
                true;


            penalty25.locked =
                false;


            resetPenalty25();


            moveAimToCenter25();

        };


    /* =====================================================
       CERRAR
    ===================================================== */

    function closePenalty25() {

        const scene =
            document.getElementById(
                "penalty25"
            );


        if (scene) {

            scene.classList.remove(
                "active"
            );

        }


        penalty25.active =
            false;

        penalty25.locked =
            false;

    }


    /* =====================================================
       RESET
    ===================================================== */

    function resetPenalty25() {

        penalty25.aiming =
            true;

        penalty25.shooting =
            false;

        penalty25.targetX =
            50;

        penalty25.targetY =
            35;

        penalty25.power =
            70;


        const keeper =
            document.getElementById(
                "penaltyKeeper25"
            );


        if (keeper) {

            keeper.className = "";

            keeper.style.left =
                "50%";

        }


        const player =
            document.getElementById(
                "penaltyPlayer25"
            );


        if (player) {

            player.classList.remove(
                "kick"
            );

        }


        const ball =
            document.getElementById(
                "penaltyBall25"
            );


        if (ball) {

            ball.classList.remove(
                "fly"
            );

            ball.style.left =
                "50%";

            ball.style.top =
                "";

            ball.style.bottom =
                "22%";

            ball.style.transform =
                "translate(-50%,-50%)";

        }


        updatePower25();

    }


    /* =====================================================
       CONTROLES
    ===================================================== */

    function connectPenaltyControls25() {

        const scene =
            document.getElementById(
                "penalty25"
            );


        if (!scene)
            return;


        if (
            scene.dataset
                .connected25
            ===
            "true"
        )
            return;


        scene.dataset
            .connected25 =
            "true";


        /*
           APUNTAR CON MOUSE
        */

       scene.addEventListener(
    "mousedown",
    event => {

        if (event.button !== 0)
            return;

        if (event.target.closest("button"))
            return;

        if (
            !penalty25.active ||
            penalty25.locked
        )
            return;

        shootPenalty25();
    }
        );


        /*
           CLICK IZQUIERDO
           TAMBIÉN PUEDE PATEAR.
        */

        scene.addEventListener(
            "mousedown",
            event => {

                if (
                    event.button !== 0
                )
                    return;


                if (
                    event.target.closest(
                        "button"
                    )
                )
                    return;


                if (
                    !penalty25.active ||
                    penalty25.locked
                )
                    return;


                /*
                   En el penal primero
                   apuntamos y después
                   podemos usar el botón
                   PATEAR.
                */

            }
        );


        /*
           BOTÓN PATEAR
        */

        const shoot =
            document.getElementById(
                "penaltyShoot25"
            );


        if (shoot) {

            shoot.addEventListener(
                "click",
                shootPenalty25
            );

        }


        /*
           SALIR
        */

        const exit =
            document.getElementById(
                "penaltyExit25"
            );


        if (exit) {

            exit.addEventListener(
                "click",
                closePenalty25
            );

        }


        /*
           ESPACIO TAMBIÉN PUEDE
           PATEAR.
        */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    !penalty25.active
                )
                    return;


                if (
                    event.code ===
                    "Space"
                ) {

                    event.preventDefault();

                    shootPenalty25();

                }

            }
        );

    }


    /* =====================================================
       APUNTAR
    ===================================================== */

    function updateAim25(
        mouseX,
        mouseY
    ) {

        const goal =
            document.getElementById(
                "penaltyGoal25"
            );


        const aim =
            document.getElementById(
                "penaltyAim25"
            );


        if (
            !goal ||
            !aim
        )
            return;


        const rect =
            goal.getBoundingClientRect();


        /*
           Limitamos el objetivo
           al área del arco.
        */

        const x =
            Math.max(
                rect.left + 15,
                Math.min(
                    rect.right - 15,
                    mouseX
                )
            );


        const y =
            Math.max(
                rect.top + 15,
                Math.min(
                    rect.bottom - 15,
                    mouseY
                )
            );


        aim.style.left =
            x + "px";


        aim.style.top =
            y + "px";


        penalty25.targetX =
            (
                x -
                rect.left
            ) /
            rect.width *
            100;


        penalty25.targetY =
            (
                y -
                rect.top
            ) /
            rect.height *
            100;

    }


    /* =====================================================
       CENTRO
    ===================================================== */

    function moveAimToCenter25() {

        const goal =
            document.getElementById(
                "penaltyGoal25"
            );


        if (!goal)
            return;


        const rect =
            goal.getBoundingClientRect();


        updateAim25(

            rect.left +
            rect.width / 2,

            rect.top +
            rect.height / 2

        );

    }


    /* =====================================================
       POTENCIA
    ===================================================== */

    function updatePower25() {

        const fill =
            document.getElementById(
                "penaltyPowerFill25"
            );


        const text =
            document.getElementById(
                "penaltyPowerText25"
            );


        if (fill) {

            fill.style.width =
                penalty25.power +
                "%";

        }


        if (text) {

            text.textContent =
                "Potencia: " +
                Math.round(
                    penalty25.power
                ) +
                "%";

        }

    }


    /* =====================================================
       CICLO DE POTENCIA
    ===================================================== */

    let powerDirection25 =
        1;


    setInterval(
        () => {

            if (
                !penalty25.active ||
                penalty25.locked
            )
                return;


            penalty25.power +=
                powerDirection25 *
                2;


            if (
                penalty25.power >=
                100
            ) {

                penalty25.power =
                    100;

                powerDirection25 =
                    -1;

            }


            if (
                penalty25.power <=
                20
            ) {

                penalty25.power =
                    20;

                powerDirection25 =
                    1;

            }


            updatePower25();

        },
        35
    );


    /* =====================================================
       PATEAR
    ===================================================== */

    function shootPenalty25() {

        if (
            !penalty25.active ||
            penalty25.locked ||
            penalty25.shooting
        )
            return;


        penalty25.locked =
            true;

        penalty25.shooting =
            true;


        penalty25.shots++;


        const player =
            document.getElementById(
                "penaltyPlayer25"
            );


        if (player) {

            player.classList.remove(
                "kick"
            );


            void player.offsetWidth;


            player.classList.add(
                "kick"
            );

        }


        setTimeout(
            () => {

                shootBall25();

            },
            350
        );

    }


    /* =====================================================
       PELOTA
    ===================================================== */

    function shootBall25() {

        const ball =
            document.getElementById(
                "penaltyBall25"
            );


        const goal =
            document.getElementById(
                "penaltyGoal25"
            );


        if (
            !ball ||
            !goal
        )
            return;


        const rect =
            goal.getBoundingClientRect();


        const targetX =
            rect.left +
            (
                penalty25.targetX /
                100
            ) *
            rect.width;


        const targetY =
            rect.top +
            (
                penalty25.targetY /
                100
            ) *
            rect.height;


        ball.classList.remove(
            "fly"
        );


        void ball.offsetWidth;


        ball.style.left =
            "50%";


        ball.style.bottom =
            "22%";


        ball.style.top =
            "";


        ball.style.setProperty(
            "--target-x",
            targetX + "px"
        );


        ball.style.setProperty(
            "--target-y",
            targetY + "px"
        );


        /*
           Animación personalizada.
        */

        const startX =
            window.innerWidth / 2;


        const startY =
            window.innerHeight *
            .76;


        ball.animate(

            [

                {

                    left:
                        startX + "px",

                    top:
                        startY + "px",

                    transform:
                        "translate(-50%,-50%) scale(1) rotate(0deg)"

                },

                {

                    left:
                        targetX + "px",

                    top:
                        targetY + "px",

                    transform:
                        "translate(-50%,-50%) scale(.38) rotate(700deg)"

                }

            ],

            {

                duration:
                    config25.shotDuration,

                easing:
                    "cubic-bezier(.15,.7,.2,1)",

                fill:
                    "forwards"

            }

        );


        setTimeout(
            decidePenaltyResult25,
            config25.keeperReaction
        );

    }


    /* =====================================================
       RESULTADO
    ===================================================== */

    function decidePenaltyResult25() {

        const target =
            penalty25.targetX;


        /*
           El arquero decide hacia
           qué lado lanzarse.
        */

        let keeperDirection;


        if (
            Math.random() <
            .34
        ) {

            /*
               Centro
            */

            keeperDirection =
                0;

        }

        else if (
            Math.random() <
            .5
        ) {

            keeperDirection =
                -1;

        }

        else {

            keeperDirection =
                1;

        }


        const keeper =
            document.getElementById(
                "penaltyKeeper25"
            );


        if (keeper) {

            keeper.className = "";


            void keeper.offsetWidth;


            if (
                keeperDirection <
                0
            ) {

                keeper.classList.add(
                    "left"
                );

            }

            else if (
                keeperDirection >
                0
            ) {

                keeper.classList.add(
                    "right"
                );

            }

            else {

                keeper.classList.add(
                    "center"
                );

            }

        }


        /*
           Distancia entre el objetivo
           y el lugar al que se tiró
           el arquero.
        */

        const keeperTarget =
            keeperDirection === 0
                ? 50
                : keeperDirection < 0
                    ? 22
                    : 78;


        const distance =
            Math.abs(
                target -
                keeperTarget
            );


        /*
           Potencia alta mejora
           el disparo.
        */

        const powerBonus =
            (
                penalty25.power -
                50
            ) *
            .15;


        /*
           Cuanto más cerca está
           del lugar correcto,
           más probable es que
           ataje.
        */

        let saveChance =
            38 -
            distance *
            .55;


        saveChance -=
            powerBonus;


        /*
           Tiros demasiado centrales
           son más fáciles de atajar.
        */

        if (
            target > 42 &&
            target < 58
        ) {

            saveChance +=
                15;

        }


        /*
           Determinar resultado.
        */

        const random =
            Math.random() *
            100;


        /*
           Si el tiro sale muy cerca
           del borde, puede ser afuera.
        */

        const outside =
            target < 1 ||
            target > 99;


        let result;


        if (
            outside
        ) {

            result =
                "miss";

        }

        else if (
            random <
            Math.max(
                5,
                saveChance
            )
        ) {

            result =
                "save";

        }

        else {

            result =
                "goal";

        }


        finishPenalty25(
            result
        );

    }


    /* =====================================================
       FINALIZAR PENAL
    ===================================================== */

    function finishPenalty25(
        result
    ) {

        penalty25.shooting =
            false;


        penalty25.aiming =
            false;


        penalty25.locked =
            true;


        const resultElement =
            document.getElementById(
                "penaltyResult25"
            );


        if (result === "goal") {

            penalty25.goals++;


            if (
                typeof window
                    .registerGoal19
                    ===
                    "function"
            ) {

                window.registerGoal19(
                    penalty25.power,
                    0
                );

            }


            showPenaltyResult25(
                "⚽ ¡GOOOOOOOL!"
            );

        }

        else if (
            result === "save"
        ) {

            penalty25.saves++;


            if (
                typeof window
                    .registerSave19
                    ===
                    "function"
            ) {

                window.registerSave19(
                    penalty25.power,
                    0
                );

            }


            showPenaltyResult25(
                "🧤 ¡ATAJÓ!"
            );

        }

        else {

            penalty25.misses++;


            if (
                typeof window
                    .registerMiss19
                    ===
                    "function"
            ) {

                window.registerMiss19(
                    penalty25.power,
                    0
                );

            }


            showPenaltyResult25(
                "❌ ¡AFUERA!"
            );

        }


        setTimeout(
            () => {

                penalty25.locked =
                    false;

                penalty25.aiming =
                    true;

                resetPenalty25();

            },
            1500
        );

    }


    /* =====================================================
       RESULTADO VISUAL
    ===================================================== */

    function showPenaltyResult25(
        text
    ) {

        const element =
            document.getElementById(
                "penaltyResult25"
            );


        if (!element)
            return;


        element.textContent =
            text;


        element.classList.remove(
            "show"
        );


        void element.offsetWidth;


        element.classList.add(
            "show"
        );

    }


    /* =====================================================
       ESTADÍSTICAS
    ===================================================== */

    window.getPenaltyStats25 =
        function() {

            return {

                goals:
                    penalty25.goals,

                shots:
                    penalty25.shots,

                saves:
                    penalty25.saves,

                misses:
                    penalty25.misses,

                accuracy:
                    penalty25.shots > 0

                        ? Math.round(
                            penalty25.goals /
                            penalty25.shots *
                            100
                        )

                        : 0

            };

        };


    /* =====================================================
       INICIAR AUTOMÁTICAMENTE
    ===================================================== */

    createPenaltyScene25();


    console.log(
        "⚽ Parte 25 cargada: sistema de penales"
    );

})();
