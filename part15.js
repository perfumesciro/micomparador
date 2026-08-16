/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 15
   ARQUERO FUNCIONAL
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ESTILOS
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `

        #goalkeeper15 {

            position: fixed;

            left: 50%;

            top: 34%;

            width: 62px;

            height: 105px;

            transform:
                translate(-50%, -50%);

            z-index: 10500;

            pointer-events: none;

            transition:
                left .15s ease,
                transform .15s ease;

        }


        #goalkeeper15 .gk-head {

            position: absolute;

            width: 25px;

            height: 25px;

            left: 50%;

            top: 0;

            transform:
                translateX(-50%);

            border-radius: 50%;

            background:
                #d79b72;

            border:
                2px solid
                rgba(0,0,0,.35);

        }


        #goalkeeper15 .gk-body {

            position: absolute;

            width: 42px;

            height: 48px;

            left: 50%;

            top: 25px;

            transform:
                translateX(-50%);

            border-radius:
                12px 12px 8px 8px;

            background:
                linear-gradient(
                    135deg,
                    #ff9d00,
                    #d84b00
                );

            border:
                2px solid
                rgba(0,0,0,.35);

        }


        #goalkeeper15 .gk-leg {

            position: absolute;

            width: 14px;

            height: 35px;

            top: 68px;

            border-radius: 8px;

            background:
                #222;

        }


        #goalkeeper15 .gk-leg.left {

            left: 17px;

            transform:
                rotate(5deg);

        }


        #goalkeeper15 .gk-leg.right {

            right: 17px;

            transform:
                rotate(-5deg);

        }


        #goalkeeper15 .gk-arm {

            position: absolute;

            width: 15px;

            height: 45px;

            top: 27px;

            border-radius: 10px;

            background:
                #d79b72;

        }


        #goalkeeper15 .gk-arm.left {

            left: 1px;

            transform:
                rotate(25deg);

        }


        #goalkeeper15 .gk-arm.right {

            right: 1px;

            transform:
                rotate(-25deg);

        }


        /* ================================================
           ESTADO DE ESTIRADA
        ================================================ */

        #goalkeeper15.dive-left {

            animation:
                diveLeft15
                .55s
                cubic-bezier(.2,.8,.3,1)
                forwards;

        }


        #goalkeeper15.dive-right {

            animation:
                diveRight15
                .55s
                cubic-bezier(.2,.8,.3,1)
                forwards;

        }


        #goalkeeper15.dive-center {

            animation:
                diveCenter15
                .5s
                ease-out
                forwards;

        }


        @keyframes diveLeft15 {

            0% {

                transform:
                    translate(-50%,-50%)
                    rotate(0deg)
                    scale(1);

            }

            40% {

                transform:
                    translate(-95%,-55%)
                    rotate(-22deg)
                    scale(1.05);

            }

            100% {

                transform:
                    translate(-130%,-45%)
                    rotate(-48deg)
                    scale(1.05);

            }

        }


        @keyframes diveRight15 {

            0% {

                transform:
                    translate(-50%,-50%)
                    rotate(0deg)
                    scale(1);

            }

            40% {

                transform:
                    translate(-5%,-55%)
                    rotate(22deg)
                    scale(1.05);

            }

            100% {

                transform:
                    translate(30%,-45%)
                    rotate(48deg)
                    scale(1.05);

            }

        }


        @keyframes diveCenter15 {

            0% {

                transform:
                    translate(-50%,-50%)
                    scale(1);

            }

            45% {

                transform:
                    translate(-50%,-65%)
                    scale(1.08);

            }

            100% {

                transform:
                    translate(-50%,-55%)
                    scale(1);

            }

        }


        /* ================================================
           GUANTES
        ================================================ */

        #goalkeeper15 .glove {

            position: absolute;

            width: 20px;

            height: 20px;

            border-radius: 50%;

            background:
                white;

            border:
                2px solid
                #222;

        }


        #goalkeeper15 .glove.left {

            left: -8px;

            top: 20px;

        }


        #goalkeeper15 .glove.right {

            right: -8px;

            top: 20px;

        }


        /* ================================================
           SOMBRA
        ================================================ */

        #goalkeeperShadow15 {

            position: fixed;

            left: 50%;

            top: 39%;

            width: 65px;

            height: 14px;

            transform:
                translateX(-50%);

            border-radius: 50%;

            background:
                rgba(0,0,0,.35);

            filter:
                blur(4px);

            z-index: 10490;

            pointer-events: none;

        }


        /* ================================================
           INDICADOR DE REACCIÓN
        ================================================ */

        #goalkeeperReaction15 {

            position: fixed;

            left: 50%;

            top: 28%;

            transform:
                translateX(-50%);

            z-index: 10600;

            color:
                white;

            font-family:
                Arial,
                sans-serif;

            font-size:
                12px;

            font-weight:
                bold;

            background:
                rgba(0,0,0,.55);

            padding:
                5px 9px;

            border-radius:
                8px;

            opacity:
                0;

            pointer-events:
                none;

        }


        #goalkeeperReaction15.show {

            animation:
                reaction15
                .7s
                ease;

        }


        @keyframes reaction15 {

            0% {

                opacity: 0;

                transform:
                    translateX(-50%)
                    translateY(8px);

            }

            25% {

                opacity: 1;

            }

            80% {

                opacity: 1;

            }

            100% {

                opacity: 0;

                transform:
                    translateX(-50%)
                    translateY(-5px);

            }

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       VARIABLES
    ===================================================== */

    let goalkeeper = null;

    let goalkeeperShadow = null;

    let goalkeeperReaction = null;

    let goalkeeperX =
        window.innerWidth / 2;


    let goalkeeperBusy =
        false;


    /* =====================================================
       CREAR ARQUERO
    ===================================================== */

    function createGoalkeeper() {

        if (
            document.getElementById(
                "goalkeeper15"
            )
        ) {

            goalkeeper =
                document.getElementById(
                    "goalkeeper15"
                );

            return;

        }


        goalkeeper =
            document.createElement(
                "div"
            );


        goalkeeper.id =
            "goalkeeper15";


        goalkeeper.innerHTML = `

            <div class="gk-head"></div>

            <div class="gk-body"></div>

            <div class="gk-leg left"></div>

            <div class="gk-leg right"></div>

            <div class="gk-arm left"></div>

            <div class="gk-arm right"></div>

            <div class="glove left"></div>

            <div class="glove right"></div>

        `;


        document.body.appendChild(
            goalkeeper
        );


        goalkeeperShadow =
            document.createElement(
                "div"
            );


        goalkeeperShadow.id =
            "goalkeeperShadow15";


        document.body.appendChild(
            goalkeeperShadow
        );


        goalkeeperReaction =
            document.createElement(
                "div"
            );


        goalkeeperReaction.id =
            "goalkeeperReaction15";


        document.body.appendChild(
            goalkeeperReaction
        );


        positionGoalkeeper();

    }


    /* =====================================================
       POSICIÓN
    ===================================================== */

    function positionGoalkeeper() {

        if (!goalkeeper)
            return;


        goalkeeperX =
            window.innerWidth / 2;


        goalkeeper.style.left =
            goalkeeperX + "px";


        if (goalkeeperShadow) {

            goalkeeperShadow.style.left =
                goalkeeperX + "px";

        }

    }


    /* =====================================================
       DIRECCIÓN DEL TIRO
    ===================================================== */

    function getShotDirection(
        shot
    ) {

        const center =
            window.innerWidth / 2;


        const difference =
            shot.x - center;


        const threshold =
            window.innerWidth * .12;


        if (
            difference <
            -threshold
        ) {

            return "left";

        }


        if (
            difference >
            threshold
        ) {

            return "right";

        }


        return "center";

    }


    /* =====================================================
       REACCIÓN DEL ARQUERO
    ===================================================== */

    function goalkeeperReact(
        shot
    ) {

        if (
            goalkeeperBusy
        )
            return;


        goalkeeperBusy =
            true;


        const direction =
            getShotDirection(
                shot
            );


        /*
           La precisión del tiro
           determina qué tan difícil
           es la atajada.
        */

        const precision =
            Number(
                shot.precision || 50
            );


        /*
           Probabilidad base de atajada.
        */

        let saveChance =
            0.25;


        /*
           Tiros menos precisos:
           más fáciles de atajar.
        */

        if (
            precision < 45
        ) {

            saveChance =
                .72;

        }

        else if (
            precision < 60
        ) {

            saveChance =
                .52;

        }

        else if (
            precision < 75
        ) {

            saveChance =
                .32;

        }

        else {

            saveChance =
                .14;

        }


        /*
           Un tiro demasiado potente
           puede ser más difícil.
        */

        if (
            shot.power > 90
        ) {

            saveChance -=
                .08;

        }


        saveChance =
            Math.max(
                .05,
                Math.min(
                    .85,
                    saveChance
                )
            );


        const saves =
            Math.random() <
            saveChance;


        /*
           El arquero intenta anticiparse
           un poco antes de que llegue
           la pelota.
        */

        setTimeout(
            () => {

                diveGoalkeeper(
                    direction,
                    saves
                );

            },
            400
        );


        return saves;

    }


    /* =====================================================
       ESTIRADA
    ===================================================== */

    function diveGoalkeeper(
        direction,
        saved
    ) {

        if (!goalkeeper)
            return;


        goalkeeper.classList.remove(
            "dive-left",
            "dive-right",
            "dive-center"
        );


        void goalkeeper.offsetWidth;


        if (
            direction ===
            "left"
        ) {

            goalkeeper.classList.add(
                "dive-left"
            );

        }

        else if (
            direction ===
            "right"
        ) {

            goalkeeper.classList.add(
                "dive-right"
            );

        }

        else {

            goalkeeper.classList.add(
                "dive-center"
            );

        }


        if (saved) {

            showReaction(
                "🧤 ¡LLEGÓ!"
            );

        }


        setTimeout(
            () => {

                goalkeeper.classList.remove(
                    "dive-left",
                    "dive-right",
                    "dive-center"
                );


                goalkeeper.style.transform =
                    "translate(-50%,-50%)";


                goalkeeperBusy =
                    false;

            },
            1100
        );

    }


    /* =====================================================
       TEXTO DEL ARQUERO
    ===================================================== */

    function showReaction(
        text
    ) {

        if (
            !goalkeeperReaction
        )
            return;


        goalkeeperReaction.classList.remove(
            "show"
        );


        void goalkeeperReaction.offsetWidth;


        goalkeeperReaction.textContent =
            text;


        goalkeeperReaction.classList.add(
            "show"
        );

    }


    /* =====================================================
       CONECTAR CON EL DISPARO
    ===================================================== */

    function connectShotSystem() {

        /*
           Guardamos la función original
           si existe.
        */

        const originalShoot =
            window.shootPenalty;


        window.shootPenalty =
            function() {

                /*
                   Si el sistema anterior
                   devuelve información,
                   la usamos.
                */

                let shot = null;


                if (
                    typeof originalShoot ===
                    "function"
                ) {

                    shot =
                        originalShoot.apply(
                            this,
                            arguments
                        );

                }


                /*
                   Si no devuelve datos,
                   generamos una estimación
                   utilizando las variables
                   disponibles.
                */

                if (!shot) {

                    shot = {

                        x:
                            window.innerWidth / 2,

                        y:
                            window.innerHeight * .38,

                        power:
                            60,

                        precision:
                            55

                    };

                }


                goalkeeperReact(
                    shot
                );


                return shot;

            };

    }


    /* =====================================================
       OBSERVAR RESULTADO
    ===================================================== */

    function observeResult() {

        const result =
            document.getElementById(
                "shotResult14"
            );


        if (!result)
            return;


        const observer =
            new MutationObserver(
                () => {

                    const text =
                        result.textContent
                            .toUpperCase();


                    if (
                        text.includes(
                            "GOOOOOOL"
                        )
                    ) {

                        goalkeeperBusy =
                            false;

                    }

                }
            );


        observer.observe(
            result,
            {
                childList: true,
                subtree: true,
                characterData: true
            }
        );

    }


    /* =====================================================
       RESPONSIVE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                !goalkeeperBusy
            ) {

                positionGoalkeeper();

            }

        }
    );


    /* =====================================================
       INICIO
    ===================================================== */

    function initialize() {

        createGoalkeeper();

        observeResult();

        /*
           La conexión se hace después
           de que las partes anteriores
           hayan terminado de cargar.
        */

        setTimeout(
            connectShotSystem,
            800
        );

    }


    setTimeout(
        initialize,
        700
    );


})();
