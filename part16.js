/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 16
   MODO TIROS LIBRES
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       VARIABLES
    ===================================================== */

    let freeKickActive = false;
    let freeKickAiming = false;

    let freeKickPower = 0;
    let powerDirection = 1;

    let freeKickX = window.innerWidth / 2;
    let freeKickY = window.innerHeight / 2;

    let freeKickBusy = false;

    let goalkeeper16 = null;
    let ball16 = null;


    /* =====================================================
       ESTILOS
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `

        #freeKickScene16 {

            position: fixed;

            inset: 0;

            z-index: 10000;

            pointer-events: none;

            font-family: Arial, sans-serif;

        }


        #freeKickAim16 {

            position: fixed;

            width: 28px;

            height: 28px;

            border: 3px solid white;

            border-radius: 50%;

            transform:
                translate(-50%, -50%);

            box-shadow:
                0 0 15px rgba(255,255,255,.9);

            pointer-events: none;

            z-index: 11000;

        }


        #freeKickAim16::after {

            content: "";

            position: absolute;

            width: 7px;

            height: 7px;

            left: 50%;

            top: 50%;

            transform:
                translate(-50%,-50%);

            border-radius: 50%;

            background: white;

        }


        #freeKickPower16 {

            position: fixed;

            left: 50%;

            bottom: 25px;

            transform:
                translateX(-50%);

            width:
                min(420px, 88vw);

            padding: 15px;

            border-radius: 17px;

            background:
                rgba(0,0,0,.78);

            backdrop-filter:
                blur(10px);

            color: white;

            pointer-events: none;

            z-index: 12000;

        }


        #freeKickPowerBar16 {

            height: 18px;

            width: 100%;

            overflow: hidden;

            border-radius: 20px;

            background:
                rgba(255,255,255,.12);

        }


        #freeKickPowerFill16 {

            height: 100%;

            width: 0%;

            background:
                linear-gradient(
                    90deg,
                    #20c96a,
                    #f1d000,
                    #ff3e3e
                );

        }


        #freeKickPowerText16 {

            text-align: center;

            margin-bottom: 8px;

            font-size: 13px;

            font-weight: 900;

        }


        #freeKickHint16 {

            text-align: center;

            margin-top: 7px;

            font-size: 11px;

            color:
                rgba(255,255,255,.65);

        }


        /* ================================================
           BARRERA
        ================================================ */

        #freeKickWall16 {

            position: fixed;

            left: 50%;

            top: 53%;

            transform:
                translateX(-50%);

            display: flex;

            gap: 4px;

            z-index: 10200;

        }


        .freeKickPlayer16 {

            position: relative;

            width: 30px;

            height: 75px;

        }


        .freeKickPlayer16 .head {

            position: absolute;

            width: 18px;

            height: 18px;

            left: 50%;

            top: 0;

            transform:
                translateX(-50%);

            border-radius: 50%;

            background: #d49a72;

        }


        .freeKickPlayer16 .body {

            position: absolute;

            width: 25px;

            height: 38px;

            left: 50%;

            top: 18px;

            transform:
                translateX(-50%);

            border-radius:
                7px 7px 4px 4px;

            background:
                #e8e8e8;

            border:
                1px solid #aaa;

        }


        .freeKickPlayer16 .leg {

            position: absolute;

            width: 8px;

            height: 25px;

            top: 53px;

            background: #222;

            border-radius: 5px;

        }


        .freeKickPlayer16 .leg.left {

            left: 7px;

        }


        .freeKickPlayer16 .leg.right {

            right: 7px;

        }


        /* ================================================
           ARQUERO
        ================================================ */

        #freeKickGK16 {

            position: fixed;

            left: 50%;

            top: 37%;

            width: 60px;

            height: 105px;

            transform:
                translate(-50%,-50%);

            z-index: 10400;

            transition:
                .15s;

        }


        #freeKickGK16 .head {

            position: absolute;

            width: 24px;

            height: 24px;

            left: 50%;

            top: 0;

            transform:
                translateX(-50%);

            border-radius: 50%;

            background: #d79b72;

        }


        #freeKickGK16 .body {

            position: absolute;

            width: 40px;

            height: 48px;

            left: 50%;

            top: 24px;

            transform:
                translateX(-50%);

            border-radius: 10px;

            background:
                #176bd1;

        }


        #freeKickGK16 .arm {

            position: absolute;

            width: 13px;

            height: 45px;

            top: 26px;

            border-radius: 10px;

            background: #d79b72;

        }


        #freeKickGK16 .arm.left {

            left: 2px;

            transform:
                rotate(25deg);

        }


        #freeKickGK16 .arm.right {

            right: 2px;

            transform:
                rotate(-25deg);

        }


        #freeKickGK16.diveLeft16 {

            animation:
                freeKickDiveLeft16
                .55s
                ease-out
                forwards;

        }


        #freeKickGK16.diveRight16 {

            animation:
                freeKickDiveRight16
                .55s
                ease-out
                forwards;

        }


        #freeKickGK16.diveCenter16 {

            animation:
                freeKickDiveCenter16
                .5s
                ease-out
                forwards;

        }


        @keyframes freeKickDiveLeft16 {

            to {

                transform:
                    translate(-125%,-55%)
                    rotate(-42deg);

            }

        }


        @keyframes freeKickDiveRight16 {

            to {

                transform:
                    translate(25%,-55%)
                    rotate(42deg);

            }

        }


        @keyframes freeKickDiveCenter16 {

            50% {

                transform:
                    translate(-50%,-70%)
                    scale(1.08);

            }

            100% {

                transform:
                    translate(-50%,-50%);

            }

        }


        /* ================================================
           PELOTA
        ================================================ */

        #freeKickBall16 {

            position: fixed;

            left: 50%;

            top: 70%;

            z-index: 11500;

            font-size: 30px;

            transform:
                translate(-50%,-50%);

            pointer-events: none;

        }


        /* ================================================
           RESULTADO
        ================================================ */

        #freeKickResult16 {

            position: fixed;

            left: 50%;

            top: 28%;

            transform:
                translate(-50%,-50%);

            z-index: 13000;

            color: white;

            font-size:
                clamp(30px,6vw,70px);

            font-weight: 1000;

            text-shadow:
                0 5px 25px black;

            opacity: 0;

            pointer-events: none;

            white-space: nowrap;

        }


        #freeKickResult16.show {

            animation:
                freeKickResult16
                1.4s
                ease;

        }


        @keyframes freeKickResult16 {

            0% {

                opacity: 0;

                transform:
                    translate(-50%,-50%)
                    scale(.7);

            }

            20% {

                opacity: 1;

                transform:
                    translate(-50%,-50%)
                    scale(1.1);

            }

            45% {

                transform:
                    translate(-50%,-50%)
                    scale(1);

            }

            80% {

                opacity: 1;

            }

            100% {

                opacity: 0;

            }

        }


        /* ================================================
           CURVA
        ================================================ */

        #freeKickCurve16 {

            position: fixed;

            left: 50%;

            top: 63%;

            width: 150px;

            height: 70px;

            border-top:
                3px dashed
                rgba(255,255,255,.35);

            border-radius:
                50%;

            transform:
                translateX(-50%)
                rotate(-10deg);

            z-index: 10300;

            pointer-events: none;

        }


        /* ================================================
           BOTÓN SALIR
        ================================================ */

        #freeKickExit16 {

            position: fixed;

            right: 18px;

            top: 18px;

            z-index: 15000;

            border: none;

            padding: 9px 14px;

            border-radius: 10px;

            background:
                rgba(0,0,0,.65);

            color: white;

            cursor: pointer;

            font-weight: bold;

            pointer-events: auto;

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       CREAR ESCENA
    ===================================================== */

    function createFreeKickScene() {

        removeFreeKickScene();


        const scene =
            document.createElement("div");

        scene.id =
            "freeKickScene16";


        scene.innerHTML = `

            <div id="freeKickAim16"></div>


            <div id="freeKickWall16">

                ${createWallPlayers()}

            </div>


            <div id="freeKickGK16">

                <div class="head"></div>

                <div class="body"></div>

                <div class="arm left"></div>

                <div class="arm right"></div>

            </div>


            <div id="freeKickCurve16"></div>


            <div id="freeKickBall16">
                ⚽
            </div>


            <div id="freeKickResult16"></div>


            <div id="freeKickPower16">

                <div id="freeKickPowerText16">
                    POTENCIA
                </div>

                <div id="freeKickPowerBar16">

                    <div id="freeKickPowerFill16"></div>

                </div>

                <div id="freeKickHint16">
                    Mantené CLICK IZQUIERDO
                    y soltá para patear
                </div>

            </div>


            <button id="freeKickExit16">
                ✕ Salir
            </button>

        `;


        document.body.appendChild(
            scene
        );


        goalkeeper16 =
            document.getElementById(
                "freeKickGK16"
            );


        ball16 =
            document.getElementById(
                "freeKickBall16"
            );


        document
            .getElementById(
                "freeKickExit16"
            )
            .addEventListener(
                "click",
                exitFreeKick
            );

    }


    /* =====================================================
       CREAR BARRERA
    ===================================================== */

    function createWallPlayers() {

        let html = "";

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            html += `

                <div class="freeKickPlayer16">

                    <div class="head"></div>

                    <div class="body"></div>

                    <div class="leg left"></div>

                    <div class="leg right"></div>

                </div>

            `;

        }

        return html;

    }


    /* =====================================================
       ACTIVAR MODO
    ===================================================== */

    window.startFreeKickMode =
        function() {

            freeKickActive =
                true;

            freeKickBusy =
                false;

            createFreeKickScene();

            updateFreeKickAim();

        };


    /* =====================================================
       SALIR
    ===================================================== */

    function exitFreeKick() {

        freeKickActive =
            false;

        freeKickBusy =
            false;

        removeFreeKickScene();

        /*
           Volver al menú si existe.
        */

        const menu =
            document.getElementById(
                "mainMenu"
            );

        if (menu) {

            menu.style.display =
                "flex";

            menu.style.opacity =
                "1";

        }

    }


    /* =====================================================
       ELIMINAR ESCENA
    ===================================================== */

    function removeFreeKickScene() {

        const scene =
            document.getElementById(
                "freeKickScene16"
            );

        if (scene)
            scene.remove();

    }


    /* =====================================================
       MOUSE
    ===================================================== */

    document.addEventListener(
        "mousemove",
        event => {

            if (!freeKickActive)
                return;


            freeKickX =
                event.clientX;

            freeKickY =
                event.clientY;


            updateFreeKickAim();

        }
    );


    /* =====================================================
       ACTUALIZAR PUNTERO
    ===================================================== */

    function updateFreeKickAim() {

        if (!freeKickActive)
            return;


        const aim =
            document.getElementById(
                "freeKickAim16"
            );


        if (!aim)
            return;


        aim.style.left =
            freeKickX + "px";

        aim.style.top =
            freeKickY + "px";


        updateCurve();

    }


    /* =====================================================
       CURVA VISUAL
    ===================================================== */

    function updateCurve() {

        const curve =
            document.getElementById(
                "freeKickCurve16"
            );


        if (!curve)
            return;


        const center =
            window.innerWidth / 2;


        const difference =
            freeKickX - center;


        const rotation =
            Math.max(
                -35,
                Math.min(
                    35,
                    difference / 10
                )
            );


        curve.style.transform =
            `translateX(-50%) rotate(${rotation}deg)`;

    }


    /* =====================================================
       CLICK PARA POTENCIA
    ===================================================== */

    document.addEventListener(
        "mousedown",
        event => {

            if (!freeKickActive)
                return;


            if (
                event.button !== 0
            )
                return;


            if (
                event.target.closest(
                    "#freeKickExit16"
                )
            )
                return;


            if (freeKickBusy)
                return;


            freeKickAiming =
                true;

            freeKickPower =
                0;

            powerDirection =
                1;


            updateFreeKickPower();

        }
    );


    /* =====================================================
       SOLTAR PARA DISPARAR
    ===================================================== */

    document.addEventListener(
        "mouseup",
        event => {

            if (!freeKickActive)
                return;


            if (
                event.button !== 0
            )
                return;


            if (!freeKickAiming)
                return;


            freeKickAiming =
                false;


            shootFreeKick();

        }
    );


    /* =====================================================
       CARGAR POTENCIA
    ===================================================== */

    function updateFreeKickPower() {

        if (
            !freeKickAiming
        )
            return;


        freeKickPower +=
            powerDirection * 1.4;


        if (
            freeKickPower >= 100
        ) {

            freeKickPower =
                100;

            powerDirection =
                -1;

        }


        if (
            freeKickPower <= 0
        ) {

            freeKickPower =
                0;

            powerDirection =
                1;

        }


        const fill =
            document.getElementById(
                "freeKickPowerFill16"
            );


        if (fill) {

            fill.style.width =
                freeKickPower + "%";

        }


        requestAnimationFrame(
            updateFreeKickPower
        );

    }


    /* =====================================================
       DISPARO
    ===================================================== */

    function shootFreeKick() {

        if (
            freeKickBusy
        )
            return;


        freeKickBusy =
            true;


        const shot =
            calculateFreeKick();


        animateFreeKickBall(
            shot
        );


        goalkeeperFreeKickReact(
            shot
        );


        setTimeout(
            () => {

                showFreeKickResult(
                    shot
                );

            },
            850
        );


        setTimeout(
            () => {

                freeKickBusy =
                    false;

                freeKickPower =
                    0;

                const fill =
                    document.getElementById(
                        "freeKickPowerFill16"
                    );

                if (fill)
                    fill.style.width =
                        "0%";

            },
            1700
        );

    }


    /* =====================================================
       CALCULAR TIRO
    ===================================================== */

    function calculateFreeKick() {

        const centerX =
            window.innerWidth / 2;


        const targetY =
            window.innerHeight * .37;


        const distance =
            Math.abs(
                freeKickX -
                centerX
            );


        /*
           Distancia del centro:
           afecta la dificultad.
        */

        let precision =
            100 -
            distance / 6;


        /*
           Potencia excesiva
           reduce precisión.
        */

        if (
            freeKickPower > 88
        ) {

            precision -=
                (
                    freeKickPower -
                    88
                ) * .6;

        }


        precision +=
            Math.random() * 12 - 6;


        precision =
            Math.max(
                0,
                Math.min(
                    100,
                    precision
                )
            );


        /*
           Curva.
        */

        const curve =
            (
                freeKickX -
                centerX
            ) / 4;


        let result;


        if (
            precision >= 68
        ) {

            result =
                "goal";

        }

        else if (
            precision >= 43
        ) {

            result =
                "save";

        }

        else {

            result =
                "miss";

        }


        return {

            x:
                freeKickX,

            y:
                targetY,

            power:
                freeKickPower,

            precision:
                precision,

            curve:
                curve,

            result:
                result

        };

    }


    /* =====================================================
       ANIMAR PELOTA
    ===================================================== */

    function animateFreeKickBall(
        shot
    ) {

        if (!ball16)
            return;


        const startX =
            window.innerWidth / 2;


        const startY =
            window.innerHeight * .70;


        const curveAmount =
            shot.curve;


        ball16.style.left =
            startX + "px";


        ball16.style.top =
            startY + "px";


        ball16.animate(
            [

                {

                    left:
                        startX + "px",

                    top:
                        startY + "px",

                    transform:
                        "translate(-50%,-50%) scale(1)"

                },

                {

                    left:
                        (
                            startX +
                            curveAmount
                        ) + "px",

                    top:
                        (
                            startY -
                            130
                        ) + "px",

                    transform:
                        "translate(-50%,-50%) scale(1.15)"

                },

                {

                    left:
                        shot.x + "px",

                    top:
                        shot.y + "px",

                    transform:
                        "translate(-50%,-50%) scale(.55)"

                }

            ],
            {

                duration:
                    900,

                easing:
                    "cubic-bezier(.15,.7,.25,1)"

            }
        );

    }


    /* =====================================================
       ARQUERO
    ===================================================== */

    function goalkeeperFreeKickReact(
        shot
    ) {

        if (!goalkeeper16)
            return;


        let direction;


        const center =
            window.innerWidth / 2;


        if (
            shot.x <
            center - 90
        ) {

            direction =
                "left";

        }

        else if (
            shot.x >
            center + 90
        ) {

            direction =
                "right";

        }

        else {

            direction =
                "center";

        }


        let saveChance =
            .35;


        if (
            shot.precision < 45
        ) {

            saveChance =
                .70;

        }

        else if (
            shot.precision < 60
        ) {

            saveChance =
                .52;

        }

        else if (
            shot.precision > 80
        ) {

            saveChance =
                .17;

        }


        if (
            shot.power > 90
        ) {

            saveChance -=
                .08;

        }


        const saved =
            Math.random() <
            saveChance;


        setTimeout(
            () => {

                goalkeeper16.classList.remove(
                    "diveLeft16",
                    "diveRight16",
                    "diveCenter16"
                );


                void goalkeeper16.offsetWidth;


                if (
                    direction ===
                    "left"
                ) {

                    goalkeeper16.classList.add(
                        "diveLeft16"
                    );

                }

                else if (
                    direction ===
                    "right"
                ) {

                    goalkeeper16.classList.add(
                        "diveRight16"
                    );

                }

                else {

                    goalkeeper16.classList.add(
                        "diveCenter16"
                    );

                }

            },
            400
        );


        return saved;

    }


    /* =====================================================
       RESULTADO
    ===================================================== */

    function showFreeKickResult(
        shot
    ) {

        const result =
            document.getElementById(
                "freeKickResult16"
            );


        if (!result)
            return;


        let text;


        if (
            shot.result ===
            "goal"
        ) {

            text =
                "⚽ ¡GOOOOOOOL!";

            createFreeKickConfetti();

        }

        else if (
            shot.result ===
            "save"
        ) {

            text =
                "🧤 ¡ATAJADÓN!";

        }

        else {

            text =
                "😱 ¡AFUERA!";

        }


        result.textContent =
            text;


        result.classList.remove(
            "show"
        );


        void result.offsetWidth;


        result.classList.add(
            "show"
        );

    }


    /* =====================================================
       CONFETI
    ===================================================== */

    function createFreeKickConfetti() {

        for (
            let i = 0;
            i < 25;
            i++
        ) {

            const confetti =
                document.createElement(
                    "div"
                );


            confetti.textContent =
                "●";


            confetti.style.position =
                "fixed";


            confetti.style.left =
                "50%";


            confetti.style.top =
                "35%";


            confetti.style.zIndex =
                "14000";


            confetti.style.color =
                i % 2 === 0
                    ? "#20d66a"
                    : "#ffffff";


            confetti.style.pointerEvents =
                "none";


            document.body.appendChild(
                confetti
            );


            const x =
                (
                    Math.random() *
                    500
                ) - 250;


            const y =
                (
                    Math.random() *
                    350
                ) + 100;


            confetti.animate(
                [

                    {
                        transform:
                            "translate(0,0) scale(1)",

                        opacity: 1

                    },

                    {
                        transform:
                            `translate(${x}px,${y}px) rotate(360deg)`,

                        opacity: 0

                    }

                ],
                {

                    duration:
                        1000 +
                        Math.random() *
                        700,

                    easing:
                        "ease-out"

                }
            );


            setTimeout(
                () => {

                    confetti.remove();

                },
                1800
            );

        }

    }


    /* =====================================================
       ESC PARA SALIR
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                if (
                    freeKickActive
                ) {

                    exitFreeKick();

                }

            }

        }
    );


    /* =====================================================
       INICIO
    ===================================================== */

    console.log(
        "⚽ Parte 16 cargada: Tiros Libres"
    );

})();
