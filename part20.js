/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 20
   ARQUERO INTELIGENTE
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       CONFIGURACIÓN
    ===================================================== */

    const goalkeeper = {

        difficulty: "normal",

        position: 50,

        targetPosition: 50,

        jumping: false,

        connected: false,

        saves: 0,

        goalsReceived: 0

    };


    /* =====================================================
       ESTILOS
    ===================================================== */

    const style =
        document.createElement("style");


    style.textContent = `

        #goalkeeper20 {

            position: fixed;

            width: 55px;

            height: 90px;

            z-index: 19000;

            pointer-events: none;

            transform:
                translate(-50%,-50%);

            transition:
                none;

            font-size: 58px;

            display: flex;

            align-items: center;

            justify-content: center;

            filter:
                drop-shadow(
                    0 7px 5px
                    rgba(0,0,0,.4)
                );

        }


        #goalkeeper20.diveLeft {

            animation:
                keeperDiveLeft20
                .55s
                ease-out
                forwards;

        }


        #goalkeeper20.diveRight {

            animation:
                keeperDiveRight20
                .55s
                ease-out
                forwards;

        }


        #goalkeeper20.diveCenter {

            animation:
                keeperDiveCenter20
                .5s
                ease-out
                forwards;

        }


        @keyframes keeperDiveLeft20 {

            0% {

                transform:
                    translate(-50%,-50%)
                    rotate(0deg);

            }

            55% {

                transform:
                    translate(-150%,-80%)
                    rotate(-55deg);

            }

            100% {

                transform:
                    translate(-190%,-20%)
                    rotate(-70deg);

            }

        }


        @keyframes keeperDiveRight20 {

            0% {

                transform:
                    translate(-50%,-50%)
                    rotate(0deg);

            }

            55% {

                transform:
                    translate(50%,-80%)
                    rotate(55deg);

            }

            100% {

                transform:
                    translate(90%,-20%)
                    rotate(70deg);

            }

        }


        @keyframes keeperDiveCenter20 {

            0% {

                transform:
                    translate(-50%,-50%)
                    scale(1);

            }

            50% {

                transform:
                    translate(-50%,-80%)
                    scale(1.15);

            }

            100% {

                transform:
                    translate(-50%,-55%)
                    scale(1);

            }

        }


        #difficulty20 {

            position: fixed;

            top: 70px;

            left: 18px;

            z-index: 25000;

            padding: 9px 13px;

            border-radius: 10px;

            background:
                rgba(0,0,0,.65);

            color: white;

            font-family:
                Arial,
                sans-serif;

            font-weight: 800;

            font-size: 12px;

            cursor: pointer;

            pointer-events: auto;

        }

    `;


    document.head.appendChild(
        style
    );


    /* =====================================================
       CREAR ARQUERO
    ===================================================== */

    function createGoalkeeper() {

        if (
            document.getElementById(
                "goalkeeper20"
            )
        )
            return;


        const keeper =
            document.createElement(
                "div"
            );


        keeper.id =
            "goalkeeper20";


        keeper.textContent =
            "🧤";


        document.body.appendChild(
            keeper
        );


        positionGoalkeeper();


        createDifficultyButton();

    }


    /* =====================================================
       POSICIÓN
    ===================================================== */

    function positionGoalkeeper() {

        const keeper =
            document.getElementById(
                "goalkeeper20"
            );


        if (!keeper)
            return;


        const x =
            window.innerWidth *
            (
                goalkeeper.position /
                100
            );


        const y =
            window.innerHeight *
            .39;


        keeper.style.left =
            x + "px";


        keeper.style.top =
            y + "px";

    }


    /* =====================================================
       DIFICULTAD
    ===================================================== */

    function createDifficultyButton() {

        if (
            document.getElementById(
                "difficulty20"
            )
        )
            return;


        const button =
            document.createElement(
                "button"
            );


        button.id =
            "difficulty20";


        button.textContent =
            "🧤 Arquero: NORMAL";


        document.body.appendChild(
            button
        );


        button.addEventListener(
            "click",
            changeDifficulty
        );

    }


    function changeDifficulty() {

        if (
            goalkeeper.difficulty ===
            "normal"
        ) {

            goalkeeper.difficulty =
                "difícil";

        }

        else if (
            goalkeeper.difficulty ===
            "difícil"
        ) {

            goalkeeper.difficulty =
                "experto";

        }

        else {

            goalkeeper.difficulty =
                "normal";

        }


        const button =
            document.getElementById(
                "difficulty20"
            );


        if (!button)
            return;


        const names = {

            normal:
                "NORMAL",

            difícil:
                "DIFÍCIL",

            experto:
                "EXPERTO"

        };


        button.textContent =
            "🧤 Arquero: " +
            names[
                goalkeeper.difficulty
            ];

    }


    /* =====================================================
       CALCULAR REACCIÓN
    ===================================================== */

    function calculateGoalkeeperReaction(
        targetX,
        power,
        curve
    ) {

        const goalCenter =
            window.innerWidth / 2;


        const difference =
            targetX -
            goalCenter;


        let direction;


        /*
           -1 = izquierda
            0 = centro
            1 = derecha
        */

        if (
            Math.abs(difference) <
            window.innerWidth * .07
        ) {

            direction = 0;

        }

        else if (
            difference < 0
        ) {

            direction = -1;

        }

        else {

            direction = 1;

        }


        /*
           Error natural del arquero.
        */

        let error;


        if (
            goalkeeper.difficulty ===
            "normal"
        ) {

            error =
                (
                    Math.random() -
                    .5
                ) *
                .45;

        }

        else if (
            goalkeeper.difficulty ===
            "difícil"
        ) {

            error =
                (
                    Math.random() -
                    .5
                ) *
                .22;

        }

        else {

            error =
                (
                    Math.random() -
                    .5
                ) *
                .10;

        }


        /*
           El efecto también puede
           engañar al arquero.
        */

        error +=
            curve *
            0.004;


        /*
           El arquero se mueve.
        */

        goalkeeper.targetPosition =
            Math.max(
                10,
                Math.min(
                    90,
                    50 +
                    direction *
                    32 +
                    error *
                    30
                )
            );


        goalkeeper.position =
            goalkeeper.targetPosition;


        positionGoalkeeper();


        return direction;

    }


    /* =====================================================
       ANIMACIÓN DE ATAJADA
    ===================================================== */

    function goalkeeperDive(
        direction
    ) {

        const keeper =
            document.getElementById(
                "goalkeeper20"
            );


        if (!keeper)
            return;


        keeper.classList.remove(
            "diveLeft",
            "diveRight",
            "diveCenter"
        );


        void keeper.offsetWidth;


        if (
            direction < 0
        ) {

            keeper.classList.add(
                "diveLeft"
            );

        }

        else if (
            direction > 0
        ) {

            keeper.classList.add(
                "diveRight"
            );

        }

        else {

            keeper.classList.add(
                "diveCenter"
            );

        }

    }


    /* =====================================================
       DECIDIR SI ATAJA
    ===================================================== */

    function goalkeeperCanSave(
        targetX,
        targetY,
        power,
        curve
    ) {

        const center =
            window.innerWidth / 2;


        const horizontalDistance =
            Math.abs(
                targetX -
                center
            );


        /*
           Los tiros muy cerca de
           los palos son difíciles.
        */

        let difficultyBonus =
            0;


        if (
            goalkeeper.difficulty ===
            "normal"
        ) {

            difficultyBonus =
                0;

        }

        else if (
            goalkeeper.difficulty ===
            "difícil"
        ) {

            difficultyBonus =
                .12;

        }

        else {

            difficultyBonus =
                .22;

        }


        /*
           Probabilidad base.
        */

        let saveChance =
            .22 +
            difficultyBonus;


        /*
           Si el tiro va al centro,
           es más fácil atajarlo.
        */

        if (
            horizontalDistance <
            window.innerWidth * .10
        ) {

            saveChance +=
                .22;

        }


        /*
           Potencia alta dificulta
           la reacción.
        */

        saveChance -=
            power *
            .0015;


        /*
           Mucho efecto dificulta
           la lectura.
        */

        saveChance -=
            Math.abs(curve) *
            .002;


        /*
           No permitimos valores
           absurdos.
        */

        saveChance =
            Math.max(
                .04,
                Math.min(
                    .70,
                    saveChance
                )
            );


        return (
            Math.random() <
            saveChance
        );

    }


    /* =====================================================
       EJECUTAR REACCIÓN
    ===================================================== */

    function goalkeeperReact(
        targetX,
        targetY,
        power,
        curve
    ) {

        const direction =
            calculateGoalkeeperReaction(
                targetX,
                power,
                curve
            );


        const save =
            goalkeeperCanSave(
                targetX,
                targetY,
                power,
                curve
            );


        /*
           El arquero reacciona
           un poquito después.
        */

        setTimeout(
            () => {

                goalkeeperDive(
                    direction
                );

            },
            120
        );


        /*
           Resultado.
        */

        setTimeout(
            () => {

                if (save) {

                    goalkeeper.saves++;

                    if (
                        typeof window.registerSave19 ===
                        "function"
                    ) {

                        window.registerSave19(
                            power,
                            curve
                        );

                    }

                    showGoalkeeperMessage(
                        "🧤 ¡ATAJADÓN!"
                    );

                }

                else {

                    goalkeeper.goalsReceived++;


                    if (
                        typeof window.registerGoal19 ===
                        "function"
                    ) {

                        window.registerGoal19(
                            power,
                            curve
                        );

                    }


                    showGoalkeeperMessage(
                        "⚽ ¡GOOOOOOOL!"
                    );

                }

            },
            550
        );

    }


    /* =====================================================
       MENSAJE
    ===================================================== */

    function showGoalkeeperMessage(
        text
    ) {

        let message =
            document.getElementById(
                "goalkeeperMessage20"
            );


        if (!message) {

            message =
                document.createElement(
                    "div"
                );


            message.id =
                "goalkeeperMessage20";


            message.style.position =
                "fixed";


            message.style.left =
                "50%";


            message.style.top =
                "18%";


            message.style.transform =
                "translateX(-50%)";


            message.style.zIndex =
                "26000";


            message.style.color =
                "white";


            message.style.fontSize =
                "42px";


            message.style.fontWeight =
                "1000";


            message.style.fontFamily =
                "Arial";


            message.style.textShadow =
                "0 4px 15px black";


            message.style.pointerEvents =
                "none";


            document.body.appendChild(
                message
            );

        }


        message.textContent =
            text;


        message.animate(
            [

                {
                    opacity: 0,

                    transform:
                        "translateX(-50%) scale(.7)"

                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) scale(1.1)"

                },

                {
                    opacity: 0,

                    transform:
                        "translateX(-50%) scale(1)"

                }

            ],
            {

                duration:
                    1300,

                easing:
                    "ease-out"

            }
        );

    }


    /* =====================================================
       CONECTAR CON FÍSICA
    ===================================================== */

    window.goalkeeperReact20 =
        function(
            targetX,
            targetY,
            power,
            curve
        ) {

            goalkeeperReact(
                targetX,
                targetY,
                power,
                curve
            );

        };


    /* =====================================================
       CONECTAR CON TIRO LIBRE
    ===================================================== */

    function connectFreeKick() {

        const scene =
            document.getElementById(
                "freeKickScene16"
            );


        if (!scene)
            return;


        if (
            scene.dataset
                .goalkeeper20Connected
            ===
            "true"
        )
            return;


        scene.dataset
            .goalkeeper20Connected =
            "true";


        scene.addEventListener(
            "mouseup",
            event => {

                if (
                    event.button !== 0
                )
                    return;


                const target =
                    getTarget();


                const power =
                    getPower();


                const curve =
                    getCurve();


                goalkeeperReact(
                    target.x,
                    target.y,
                    power,
                    curve
                );

            }
        );

    }


    /* =====================================================
       OBTENER OBJETIVO
    ===================================================== */

    function getTarget() {

        const aim =
            document.getElementById(
                "freeKickAim16"
            );


        if (aim) {

            const rect =
                aim.getBoundingClientRect();


            return {

                x:
                    rect.left +
                    rect.width / 2,

                y:
                    rect.top +
                    rect.height / 2

            };

        }


        return {

            x:
                window.innerWidth / 2,

            y:
                window.innerHeight * .35

        };

    }


    /* =====================================================
       POTENCIA
    ===================================================== */

    function getPower() {

        if (
            typeof window.freeKickPower16
            ===
            "number"
        ) {

            return window.freeKickPower16;

        }


        const fill =
            document.getElementById(
                "freeKickPowerFill16"
            );


        if (!fill)
            return 70;


        const width =
            parseFloat(
                fill.style.width
            );


        return Number.isFinite(width)
            ? width
            : 70;

    }


    /* =====================================================
       EFECTO
    ===================================================== */

    function getCurve() {

        const element =
            document.getElementById(
                "freeKickCurve16"
            );


        if (!element)
            return 0;


        const transform =
            element.style.transform;


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
       CAMBIAR DIFICULTAD DESDE CÓDIGO
    ===================================================== */

    window.setGoalkeeperDifficulty20 =
        function(
            difficulty
        ) {

            if (
                [
                    "normal",
                    "difícil",
                    "experto"
                ].includes(
                    difficulty
                )
            ) {

                goalkeeper.difficulty =
                    difficulty;

            }

        };


    /* =====================================================
       ESTADÍSTICAS DEL ARQUERO
    ===================================================== */

    window.getGoalkeeperStats20 =
        function() {

            return {

                difficulty:
                    goalkeeper.difficulty,

                saves:
                    goalkeeper.saves,

                goalsReceived:
                    goalkeeper.goalsReceived

            };

        };


    /* =====================================================
       INICIO
    ===================================================== */

    function initialize() {

        createGoalkeeper();


        setTimeout(
            connectFreeKick,
            1000
        );


        /*
           Comprobamos periódicamente
           porque la escena puede
           crearse después.
        */

        setInterval(
            connectFreeKick,
            1000
        );


        console.log(
            "🧤 Parte 20 cargada: arquero inteligente"
        );

    }


    initialize();


})();
