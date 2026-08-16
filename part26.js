/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 26
   MODO COMPLETO DE TIROS LIBRES
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ESTADO
    ===================================================== */

    const freeKick26 = {

        active: false,

        aiming: true,

        shooting: false,

        locked: false,

        targetX: 50,

        targetY: 35,

        power: 70,

        curve: 0,

        goals: 0,

        shots: 0,

        saves: 0,

        misses: 0

    };


    /* =====================================================
       CONFIGURACIÓN
    ===================================================== */

    const config26 = {

        shotDuration: 1100,

        keeperReaction: 500,

        cooldown: 1400,

        wallPlayers: 5

    };


    /* =====================================================
       ESTILOS
    ===================================================== */

    const style =
        document.createElement("style");


    style.textContent = `

        #freeKick26 {

            position: fixed;

            inset: 0;

            z-index: 15000;

            display: none;

            overflow: hidden;

            background:
                linear-gradient(
                    to bottom,
                    #5da9dc 0%,
                    #c7edff 42%,
                    #318c3b 43%,
                    #236f2d 100%
                );

            font-family:
                Arial,
                sans-serif;

        }


        #freeKick26.active {

            display: block;

        }


        /* =================================================
           ESTADIO
        ================================================= */

        #freeKickStadium26 {

            position: absolute;

            inset: 0;

            overflow: hidden;

        }


        #freeKickLights26 {

            position: absolute;

            inset: 0 0 auto 0;

            height: 18%;

            background:
                radial-gradient(
                    ellipse,
                    rgba(255,255,255,.8),
                    transparent 65%
                );

        }


        #freeKickCrowd26 {

            position: absolute;

            left: 0;

            right: 0;

            top: 13%;

            height: 20%;

            background:
                repeating-linear-gradient(
                    90deg,
                    #202020 0 9px,
                    #555 9px 18px
                );

            opacity: .75;

        }


        #freeKickField26 {

            position: absolute;

            left: 0;

            right: 0;

            bottom: 0;

            height: 60%;

            background:
                repeating-linear-gradient(
                    90deg,
                    #328c3c 0 85px,
                    #3b9945 85px 170px
                );

        }


        /* =================================================
           ÁREA
        ================================================= */

        #freeKickBox26 {

            position: absolute;

            left: 50%;

            top: 35%;

            transform:
                translateX(-50%);

            width:
                min(700px, 88vw);

            height: 260px;

            border:
                4px solid
                rgba(255,255,255,.85);

            border-bottom: none;

        }


        /* =================================================
           ARCO
        ================================================= */

        #freeKickGoal26 {

            position: absolute;

            left: 50%;

            top: 20%;

            transform:
                translateX(-50%);

            width:
                min(620px, 84vw);

            height:
                min(270px, 34vw);

            border:
                9px solid white;

            background:
                repeating-linear-gradient(
                    0deg,
                    transparent 0 17px,
                    rgba(255,255,255,.17)
                    17px 19px
                ),
                repeating-linear-gradient(
                    90deg,
                    transparent 0 18px,
                    rgba(255,255,255,.17)
                    18px 20px
                );

            box-shadow:
                0 10px 25px
                rgba(0,0,0,.4);

        }


        /* =================================================
           BARRERA
        ================================================= */

        #freeKickWall26 {

            position: absolute;

            left: 50%;

            top: 48%;

            transform:
                translateX(-50%);

            display: flex;

            gap: 5px;

            z-index: 16000;

        }


        .wall-player26 {

            width: 43px;

            height: 70px;

            display: flex;

            align-items: center;

            justify-content: center;

            font-size: 47px;

            filter:
                drop-shadow(
                    0 5px 5px
                    rgba(0,0,0,.4)
                );

        }


        /* =================================================
           ARQUERO
        ================================================= */

        #freeKickKeeper26 {

            position: absolute;

            left: 50%;

            top: 34%;

            transform:
                translate(-50%,-50%);

            font-size: 65px;

            z-index: 16020;

            pointer-events: none;

        }


        #freeKickKeeper26.left {

            animation:
                keeperLeft26
                .6s
                ease-out
                forwards;

        }


        #freeKickKeeper26.right {

            animation:
                keeperRight26
                .6s
                ease-out
                forwards;

        }


        #freeKickKeeper26.center {

            animation:
                keeperCenter26
                .55s
                ease-out
                forwards;

        }


        @keyframes keeperLeft26 {

            to {

                transform:
                    translate(
                        -175%,
                        -65%
                    )
                    rotate(-45deg);

            }

        }


        @keyframes keeperRight26 {

            to {

                transform:
                    translate(
                        75%,
                        -65%
                    )
                    rotate(45deg);

            }

        }


        @keyframes keeperCenter26 {

            50% {

                transform:
                    translate(
                        -50%,
                        -80%
                    )
                    scale(1.12);

            }

            100% {

                transform:
                    translate(
                        -50%,
                        -50%
                    );

            }

        }


        /* =================================================
           JUGADOR
        ================================================= */

        #freeKickPlayer26 {

            position: absolute;

            left: 50%;

            bottom: 13%;

            transform:
                translateX(-50%);

            font-size: 82px;

            z-index: 16030;

        }


        #freeKickPlayer26.kick {

            animation:
                freeKickPlayerKick26
                .75s
                ease-out;

        }


        @keyframes freeKickPlayerKick26 {

            0% {

                transform:
                    translateX(-50%)
                    rotate(0);

            }

            35% {

                transform:
                    translateX(-56%)
                    translateY(-14px)
                    rotate(-7deg);

            }

            55% {

                transform:
                    translateX(-42%)
                    translateY(-3px)
                    rotate(22deg);

            }

            100% {

                transform:
                    translateX(-50%)
                    rotate(0);

            }

        }


        /* =================================================
           PELOTA
        ================================================= */

        #freeKickBall26 {

            position: absolute;

            left: 50%;

            bottom: 22%;

            transform:
                translate(-50%,-50%);

            font-size: 35px;

            z-index: 16025;

            pointer-events: none;

        }


        /* =================================================
           MIRA
        ================================================= */

        #freeKickAim26 {

            position: absolute;

            width: 45px;

            height: 45px;

            border:
                3px solid white;

            border-radius: 50%;

            transform:
                translate(-50%,-50%);

            z-index: 17000;

            pointer-events: none;

            box-shadow:
                0 0 18px
                rgba(255,255,255,.9);

        }


        #freeKickAim26::before {

            content: "";

            position: absolute;

            left: -10px;

            top: 19px;

            width: 59px;

            height: 2px;

            background: white;

        }


        #freeKickAim26::after {

            content: "";

            position: absolute;

            left: 19px;

            top: -10px;

            width: 2px;

            height: 59px;

            background: white;

        }


        /* =================================================
           PANEL
        ================================================= */

        #freeKickPanel26 {

            position: absolute;

            left: 50%;

            bottom: 3%;

            transform:
                translateX(-50%);

            width:
                min(500px, 92vw);

            z-index: 18000;

            display: flex;

            flex-direction: column;

            gap: 9px;

            align-items: center;

        }


        #freeKickPower26 {

            width: 100%;

            height: 17px;

            background:
                rgba(0,0,0,.55);

            border:
                2px solid white;

            border-radius: 20px;

            overflow: hidden;

        }


        #freeKickPowerFill26 {

            height: 100%;

            width: 70%;

            background:
                linear-gradient(
                    90deg,
                    #25c75b,
                    #f0d52d,
                    #ef4141
                );

        }


        #freeKickPowerText26 {

            color: white;

            font-weight: 900;

            text-shadow:
                0 3px 7px black;

        }


        #freeKickCurve26 {

            width: 100%;

            height: 15px;

            accent-color: white;

        }


        #freeKickCurveText26 {

            color: white;

            font-size: 12px;

            font-weight: 900;

            text-shadow:
                0 3px 7px black;

        }


        #freeKickShoot26 {

            border: none;

            border-radius: 12px;

            padding:
                13px 30px;

            background:
                #138b35;

            color: white;

            font-weight: 1000;

            font-size: 15px;

            cursor: pointer;

            box-shadow:
                0 6px 16px
                rgba(0,0,0,.35);

        }


        #freeKickShoot26:hover {

            transform:
                translateY(-2px);

        }


        #freeKickHelp26 {

            color: white;

            font-size: 12px;

            font-weight: 800;

            text-align: center;

            text-shadow:
                0 3px 8px black;

        }


        #freeKickExit26 {

            position: absolute;

            right: 15px;

            top: 15px;

            z-index: 19000;

            border: none;

            border-radius: 10px;

            padding: 9px 13px;

            background:
                rgba(0,0,0,.65);

            color: white;

            font-weight: 900;

            cursor: pointer;

        }


        #freeKickResult26 {

            position: absolute;

            left: 50%;

            top: 11%;

            transform:
                translateX(-50%);

            z-index: 20000;

            color: white;

            font-size:
                clamp(
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


        #freeKickResult26.show {

            animation:
                freeKickResultAnimation26
                1.3s
                ease-out;

        }


        @keyframes freeKickResultAnimation26 {

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

            #freeKickGoal26 {

                top: 23%;

            }

            #freeKickWall26 {

                top: 50%;

            }

            .wall-player26 {

                width: 32px;

                font-size: 38px;

            }

            #freeKickPlayer26 {

                bottom: 16%;

            }

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       CREAR ESCENA
    ===================================================== */

    function createFreeKick26() {

        if (
            document.getElementById(
                "freeKick26"
            )
        )
            return;


        const scene =
            document.createElement(
                "div"
            );


        scene.id =
            "freeKick26";


        scene.innerHTML = `

            <div id="freeKickStadium26">

                <div id="freeKickLights26"></div>

                <div id="freeKickCrowd26"></div>

                <div id="freeKickField26"></div>

                <div id="freeKickBox26"></div>

                <div id="freeKickGoal26"></div>

                <div id="freeKickWall26"></div>

                <div
                    id="freeKickKeeper26">
                    🧤
                </div>

                <div
                    id="freeKickPlayer26">
                    🧍‍♂️
                </div>

                <div
                    id="freeKickBall26">
                    ⚽
                </div>

                <div
                    id="freeKickAim26">
                </div>

                <div
                    id="freeKickResult26">
                </div>

                <div
                    id="freeKickPanel26">

                    <div
                        id="freeKickHelp26">

                        🖱️ Mové el mouse
                        para apuntar
                        ·
                        ⚡ Elegí potencia
                        ·
                        🌀 Elegí efecto

                    </div>


                    <div
                        id="freeKickPower26">

                        <div
                            id="freeKickPowerFill26">
                        </div>

                    </div>


                    <div
                        id="freeKickPowerText26">

                        Potencia: 70%

                    </div>


                    <input
                        id="freeKickCurve26"
                        type="range"
                        min="-100"
                        max="100"
                        value="0"
                    >


                    <div
                        id="freeKickCurveText26">

                        Efecto: 0

                    </div>


                    <button
                        id="freeKickShoot26">

                        ⚽ PATEAR

                    </button>

                </div>


                <button
                    id="freeKickExit26">

                    ✕ Salir

                </button>

            </div>

        `;


        document.body.appendChild(
            scene
        );


        createWall26();

        connectControls26();

    }


    /* =====================================================
       CREAR BARRERA
    ===================================================== */

    function createWall26() {

        const wall =
            document.getElementById(
                "freeKickWall26"
            );


        if (!wall)
            return;


        wall.innerHTML = "";


        for (
            let i = 0;
            i < config26.wallPlayers;
            i++
        ) {

            const player =
                document.createElement(
                    "div"
                );


            player.className =
                "wall-player26";


            player.textContent =
                "🧍";


            wall.appendChild(
                player
            );

        }

    }


    /* =====================================================
       ABRIR TIRO LIBRE
    ===================================================== */

    window.startFreeKickMode26 =
        function() {

            createFreeKick26();


            const scene =
                document.getElementById(
                    "freeKick26"
                );


            scene.classList.add(
                "active"
            );


            freeKick26.active =
                true;


            freeKick26.locked =
                false;


            freeKick26.shooting =
                false;


            resetFreeKick26();

        };


    /* =====================================================
       CERRAR
    ===================================================== */

    function closeFreeKick26() {

        const scene =
            document.getElementById(
                "freeKick26"
            );


        if (scene) {

            scene.classList.remove(
                "active"
            );

        }


        freeKick26.active =
            false;

        freeKick26.locked =
            false;

    }


    /* =====================================================
       RESET
    ===================================================== */

    function resetFreeKick26() {

        freeKick26.targetX =
            50;

        freeKick26.targetY =
            30;

        freeKick26.power =
            70;

        freeKick26.curve =
            0;


        const keeper =
            document.getElementById(
                "freeKickKeeper26"
            );


        if (keeper) {

            keeper.className = "";

            keeper.style.left =
                "50%";

        }


        const player =
            document.getElementById(
                "freeKickPlayer26"
            );


        if (player) {

            player.classList.remove(
                "kick"
            );

        }


        const ball =
            document.getElementById(
                "freeKickBall26"
            );


        if (ball) {

            ball.style.left =
                "50%";

            ball.style.top =
                "";

            ball.style.bottom =
                "22%";

            ball.style.transform =
                "translate(-50%,-50%)";

        }


        const slider =
            document.getElementById(
                "freeKickCurve26"
            );


        if (slider) {

            slider.value =
                "0";

        }


        updatePower26();

        updateCurve26();

        centerAim26();

    }


    /* =====================================================
       CONTROLES
    ===================================================== */

    function connectControls26() {

        const scene =
            document.getElementById(
                "freeKick26"
            );


        if (!scene)
            return;


        if (
            scene.dataset
                .connected26
            ===
            "true"
        )
            return;


        scene.dataset
            .connected26 =
            "true";


        /* APUNTAR */

        scene.addEventListener(
            "mousemove",
            event => {

                if (
                    !freeKick26.active ||
                    freeKick26.locked
                )
                    return;


                updateAim26(
                    event.clientX,
                    event.clientY
                );

            }
        );


        /* BOTÓN PATEAR */

        const shoot =
            document.getElementById(
                "freeKickShoot26"
            );


        if (shoot) {

            shoot.addEventListener(
                "click",
                shootFreeKick26
            );

        }


        /* SALIR */

        const exit =
            document.getElementById(
                "freeKickExit26"
            );


        if (exit) {

            exit.addEventListener(
                "click",
                closeFreeKick26
            );

        }


        /* EFECTO */

        const curve =
            document.getElementById(
                "freeKickCurve26"
            );


        if (curve) {

            curve.addEventListener(
                "input",
                updateCurve26
            );

        }


        /* ESPACIO */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    !freeKick26.active
                )
                    return;


                if (
                    event.code ===
                    "Space"
                ) {

                    event.preventDefault();

                    shootFreeKick26();

                }

            }
        );

    }


    /* =====================================================
       APUNTAR
    ===================================================== */

    function updateAim26(
        mouseX,
        mouseY
    ) {

        const goal =
            document.getElementById(
                "freeKickGoal26"
            );


        const aim =
            document.getElementById(
                "freeKickAim26"
            );


        if (
            !goal ||
            !aim
        )
            return;


        const rect =
            goal.getBoundingClientRect();


        const x =
            Math.max(
                rect.left + 12,
                Math.min(
                    rect.right - 12,
                    mouseX
                )
            );


        const y =
            Math.max(
                rect.top + 12,
                Math.min(
                    rect.bottom - 12,
                    mouseY
                )
            );


        aim.style.left =
            x + "px";


        aim.style.top =
            y + "px";


        freeKick26.targetX =
            (
                x -
                rect.left
            ) /
            rect.width *
            100;


        freeKick26.targetY =
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

    function centerAim26() {

        const goal =
            document.getElementById(
                "freeKickGoal26"
            );


        if (!goal)
            return;


        const rect =
            goal.getBoundingClientRect();


        updateAim26(

            rect.left +
            rect.width / 2,

            rect.top +
            rect.height * .35

        );

    }


    /* =====================================================
       POTENCIA
    ===================================================== */

    let powerDirection26 =
        1;


    setInterval(
        () => {

            if (
                !freeKick26.active ||
                freeKick26.locked
            )
                return;


            freeKick26.power +=
                powerDirection26 *
                1.8;


            if (
                freeKick26.power >=
                100
            ) {

                freeKick26.power =
                    100;

                powerDirection26 =
                    -1;

            }


            if (
                freeKick26.power <=
                20
            ) {

                freeKick26.power =
                    20;

                powerDirection26 =
                    1;

            }


            updatePower26();

        },
        35
    );


    function updatePower26() {

        const fill =
            document.getElementById(
                "freeKickPowerFill26"
            );


        const text =
            document.getElementById(
                "freeKickPowerText26"
            );


        if (fill) {

            fill.style.width =
                freeKick26.power +
                "%";

        }


        if (text) {

            text.textContent =
                "Potencia: " +
                Math.round(
                    freeKick26.power
                ) +
                "%";

        }

    }


    /* =====================================================
       EFECTO
    ===================================================== */

    function updateCurve26() {

        const slider =
            document.getElementById(
                "freeKickCurve26"
            );


        const text =
            document.getElementById(
                "freeKickCurveText26"
            );


        if (!slider)
            return;


        freeKick26.curve =
            Number(
                slider.value
            );


        if (text) {

            let direction =
                "Sin efecto";


            if (
                freeKick26.curve >
                10
            ) {

                direction =
                    "Efecto →";

            }

            else if (
                freeKick26.curve <
                -10
            ) {

                direction =
                    "← Efecto";

            }


            text.textContent =
                direction +
                " (" +
                freeKick26.curve +
                ")";

        }

    }


    /* =====================================================
       DISPARO
    ===================================================== */

    function shootFreeKick26() {

        if (
            !freeKick26.active ||
            freeKick26.locked ||
            freeKick26.shooting
        )
            return;


        freeKick26.locked =
            true;


        freeKick26.shooting =
            true;


        freeKick26.shots++;


        const player =
            document.getElementById(
                "freeKickPlayer26"
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
            shootBall26,
            360
        );

    }


    /* =====================================================
       PELOTA
    ===================================================== */

    function shootBall26() {

        const ball =
            document.getElementById(
                "freeKickBall26"
            );


        const goal =
            document.getElementById(
                "freeKickGoal26"
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
            freeKick26.targetX /
            100 *
            rect.width;


        const targetY =
            rect.top +
            freeKick26.targetY /
            100 *
            rect.height;


        const startX =
            window.innerWidth / 2;


        const startY =
            window.innerHeight *
            .76;


        const curve =
            freeKick26.curve;


        const middleX =
            startX +
            (
                targetX -
                startX
            ) *
            .5 +
            curve *
            1.5;


        const middleY =
            startY -
            220 -
            (
                freeKick26.power *
                1.2
            );


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
                        middleX + "px",

                    top:
                        middleY + "px",

                    transform:
                        "translate(-50%,-50%) scale(.7) rotate(450deg)"

                },

                {

                    left:
                        targetX + "px",

                    top:
                        targetY + "px",

                    transform:
                        "translate(-50%,-50%) scale(.35) rotate(1000deg)"

                }

            ],

            {

                duration:
                    config26.shotDuration,

                easing:
                    "cubic-bezier(.15,.65,.2,1)",

                fill:
                    "forwards"

            }

        );


        setTimeout(
            decideFreeKick26,
            config26.keeperReaction
        );

    }


    /* =====================================================
       RESULTADO
    ===================================================== */

    function decideFreeKick26() {

        const target =
            freeKick26.targetX;


        /*
           El arquero puede
           reaccionar al lado.
        */

        let keeperDirection;


        const randomKeeper =
            Math.random();


        if (
            randomKeeper <
            .33
        ) {

            keeperDirection =
                -1;

        }

        else if (
            randomKeeper <
            .66
        ) {

            keeperDirection =
                0;

        }

        else {

            keeperDirection =
                1;

        }


        const keeper =
            document.getElementById(
                "freeKickKeeper26"
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
           El efecto ayuda a
           colocar la pelota.
        */

        const effectiveTarget =
            target +
            freeKick26.curve *
            .12;


        const keeperTarget =
            keeperDirection === 0
                ? 50
                : keeperDirection < 0
                    ? 25
                    : 75;


        const distance =
            Math.abs(
                effectiveTarget -
                keeperTarget
            );


        /*
           Barrera.

           Si apuntamos demasiado
           bajo o hacia el centro,
           existe posibilidad de
           que la pelota choque.
        */

        const wallZone =
            target > 38 &&
            target < 62 &&
            freeKick26.targetY >
            42;


        const wallChance =
            wallZone
                ? 25
                : 5;


        const keeperChance =
            Math.max(
                8,
                42 -
                distance *
                .55
            );


        const powerBonus =
            (
                freeKick26.power -
                50
            ) *
            .18;


        let saveChance =
            keeperChance -
            powerBonus;


        if (
            Math.abs(
                freeKick26.curve
            ) > 60
        ) {

            saveChance -=
                7;

        }


        const random =
            Math.random() *
            100;


        let result;


        if (
            random <
            wallChance
        ) {

            result =
                "wall";

        }

        else if (
            random <
            wallChance +
            saveChance
        ) {

            result =
                "save";

        }

        else if (
            target < 1 ||
            target > 99
        ) {

            result =
                "miss";

        }

        else {

            result =
                "goal";

        }


        finishFreeKick26(
            result
        );

    }


    /* =====================================================
       FINAL
    ===================================================== */

    function finishFreeKick26(
        result
    ) {

        freeKick26.shooting =
            false;


        if (
            result ===
            "goal"
        ) {

            freeKick26.goals++;


            if (
                typeof window
                    .registerGoal19
                    ===
                    "function"
            ) {

                window.registerGoal19(
                    freeKick26.power,
                    freeKick26.curve
                );

            }


            showResult26(
                "⚽ ¡GOOOOOOOL!"
            );

        }

        else if (
            result ===
            "save"
        ) {

            freeKick26.saves++;


            if (
                typeof window
                    .registerSave19
                    ===
                    "function"
            ) {

                window.registerSave19(
                    freeKick26.power,
                    freeKick26.curve
                );

            }


            showResult26(
                "🧤 ¡ATAJADÓN!"
            );

        }

        else if (
            result ===
            "wall"
        ) {

            freeKick26.misses++;


            if (
                typeof window
                    .registerMiss19
                    ===
                    "function"
            ) {

                window.registerMiss19(
                    freeKick26.power,
                    freeKick26.curve
                );

            }


            showResult26(
                "🧱 ¡PEGÓ EN LA BARRERA!"
            );

        }

        else {

            freeKick26.misses++;


            if (
                typeof window
                    .registerMiss19
                    ===
                    "function"
            ) {

                window.registerMiss19(
                    freeKick26.power,
                    freeKick26.curve
                );

            }


            showResult26(
                "❌ ¡AFUERA!"
            );

        }


        setTimeout(
            () => {

                freeKick26.locked =
                    false;

                freeKick26.aiming =
                    true;

                resetFreeKick26();

            },
            1600
        );

    }


    /* =====================================================
       RESULTADO VISUAL
    ===================================================== */

    function showResult26(
        text
    ) {

        const element =
            document.getElementById(
                "freeKickResult26"
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

    window.getFreeKickStats26 =
        function() {

            return {

                goals:
                    freeKick26.goals,

                shots:
                    freeKick26.shots,

                saves:
                    freeKick26.saves,

                misses:
                    freeKick26.misses,

                accuracy:
                    freeKick26.shots > 0

                        ? Math.round(
                            freeKick26.goals /
                            freeKick26.shots *
                            100
                        )

                        : 0

            };

        };


    /* =====================================================
       INICIO
    ===================================================== */

    createFreeKick26();


    console.log(
        "⚽ Parte 26 cargada: tiros libres"
    );

})();
