/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 23
   SISTEMA CENTRAL DE DISPAROS
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ESTADO CENTRAL
    ===================================================== */

    const match23 = {

        shooting: false,

        shotNumber: 0,

        lastShotTime: 0,

        mode: "freeKick",

        power: 70,

        curve: 0,

        targetX: 0,

        targetY: 0,

        result: null

    };


    /* =====================================================
       CONFIGURACIÓN
    ===================================================== */

    const CONFIG = {

        cooldown: 1200,

        playerAnimationDelay: 80,

        cameraDelay: 50,

        goalkeeperDelay: 100,

        resultDelay: 600

    };


    /* =====================================================
       ESTILOS
    ===================================================== */

    const style =
        document.createElement("style");


    style.textContent = `

        #shotStatus23 {

            position: fixed;

            left: 50%;

            bottom: 105px;

            transform:
                translateX(-50%);

            z-index: 27000;

            padding: 9px 15px;

            border-radius: 12px;

            background:
                rgba(0,0,0,.75);

            color: white;

            font-family:
                Arial,
                sans-serif;

            font-size: 12px;

            font-weight: 800;

            opacity: 0;

            pointer-events: none;

            transition:
                opacity .2s ease;

        }


        #shotStatus23.show {

            opacity: 1;

        }


        #shotResult23 {

            position: fixed;

            left: 50%;

            top: 25%;

            transform:
                translate(-50%,-50%);

            z-index: 28000;

            font-family:
                Arial,
                sans-serif;

            font-size: 48px;

            font-weight: 1000;

            color: white;

            text-shadow:
                0 5px 20px
                rgba(0,0,0,.9);

            opacity: 0;

            pointer-events: none;

        }


        #shotResult23.show {

            animation:
                shotResultAnimation23
                1s
                ease-out
                forwards;

        }


        @keyframes shotResultAnimation23 {

            0% {

                opacity: 0;

                transform:
                    translate(-50%,-50%)
                    scale(.65);

            }

            20% {

                opacity: 1;

                transform:
                    translate(-50%,-50%)
                    scale(1.15);

            }

            70% {

                opacity: 1;

            }

            100% {

                opacity: 0;

                transform:
                    translate(-50%,-50%)
                    scale(1);

            }

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       UI
    ===================================================== */

    function createUI23() {

        if (
            document.getElementById(
                "shotStatus23"
            )
        )
            return;


        const status =
            document.createElement(
                "div"
            );


        status.id =
            "shotStatus23";


        status.textContent =
            "Preparando disparo...";


        document.body.appendChild(
            status
        );


        const result =
            document.createElement(
                "div"
            );


        result.id =
            "shotResult23";


        document.body.appendChild(
            result
        );

    }


    /* =====================================================
       MENSAJE DE ESTADO
    ===================================================== */

    function showStatus23(
        text
    ) {

        const status =
            document.getElementById(
                "shotStatus23"
            );


        if (!status)
            return;


        status.textContent =
            text;


        status.classList.add(
            "show"
        );


        setTimeout(
            () => {

                status.classList.remove(
                    "show"
                );

            },
            700
        );

    }


    /* =====================================================
       RESULTADO
    ===================================================== */

    function showResult23(
        text
    ) {

        const result =
            document.getElementById(
                "shotResult23"
            );


        if (!result)
            return;


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
       OBTENER OBJETIVO
    ===================================================== */

    function getTarget23() {

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

    function getPower23() {

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


        if (
            Number.isFinite(width)
        ) {

            return width;

        }


        return 70;

    }


    /* =====================================================
       EFECTO
    ===================================================== */

    function getCurve23() {

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
       PREPARAR DISPARO
    ===================================================== */

    function prepareShot23(
        mode = "freeKick"
    ) {

        if (
            match23.shooting
        ) {

            return false;

        }


        const now =
            performance.now();


        if (
            now -
            match23.lastShotTime
            <
            CONFIG.cooldown
        ) {

            return false;

        }


        match23.shooting =
            true;


        match23.mode =
            mode;


        match23.shotNumber++;


        match23.lastShotTime =
            now;


        match23.power =
            getPower23();


        match23.curve =
            getCurve23();


        const target =
            getTarget23();


        match23.targetX =
            target.x;


        match23.targetY =
            target.y;


        match23.result =
            null;


        return true;

    }


    /* =====================================================
       ANIMACIÓN DEL JUGADOR
    ===================================================== */

    function playPlayerAnimation23() {

        if (
            typeof window.playKickAnimation21
            ===
            "function"
        ) {

            window.playKickAnimation21(
                match23.power
            );

        }

    }


    /* =====================================================
       CÁMARA
    ===================================================== */

    function playCamera23() {

        if (
            typeof window.startFootballCamera22
            ===
            "function"
        ) {

            window.startFootballCamera22(

                match23.targetX,

                match23.targetY,

                match23.power

            );

        }

    }


    /* =====================================================
       ARQUERO
    ===================================================== */

    function playGoalkeeper23() {

        if (
            typeof window.goalkeeperReact20
            ===
            "function"
        ) {

            window.goalkeeperReact20(

                match23.targetX,

                match23.targetY,

                match23.power,

                match23.curve

            );

        }

    }


    /* =====================================================
       RESULTADO ESTADÍSTICAS
    ===================================================== */

    function detectResult23() {

        /*
           El arquero ya se encarga
           de registrar las estadísticas.
        */

        setTimeout(
            () => {

                const stats =
                    typeof window
                        .getFootballStats19
                        ===
                        "function"

                        ? window
                            .getFootballStats19()

                        : null;


                if (!stats)
                    return;


                /*
                   Determinamos el último
                   resultado basándonos
                   en los cambios.

                   Esto no modifica
                   las estadísticas.
                */

                if (
                    stats.goals >
                    0 &&
                    stats.goals +
                    stats.saves +
                    stats.misses ===
                    stats.shots
                ) {

                    /*
                       No mostramos resultado
                       aquí para evitar
                       duplicados de otras
                       partes.
                    */

                }

            },
            CONFIG.resultDelay
        );

    }


    /* =====================================================
       FINALIZAR
    ===================================================== */

    function finishShot23() {

        setTimeout(
            () => {

                match23.shooting =
                    false;


                if (
                    typeof window
                        .stopFootballCamera22
                        ===
                        "function"
                ) {

                    window
                        .stopFootballCamera22();

                }

            },
            1500
        );

    }


    /* =====================================================
       EJECUTAR DISPARO
    ===================================================== */

    function executeShot23(
        mode = "freeKick"
    ) {

        if (
            !prepareShot23(
                mode
            )
        ) {

            return;

        }


        showStatus23(
            "🎯 Preparando disparo..."
        );


        /*
           1. Animación del jugador.
        */

        setTimeout(
            () => {

                playPlayerAnimation23();

            },
            CONFIG.playerAnimationDelay
        );


        /*
           2. Cámara.
        */

        setTimeout(
            () => {

                playCamera23();

            },
            CONFIG.cameraDelay
        );


        /*
           3. Arquero.
        */

        setTimeout(
            () => {

                playGoalkeeper23();

            },
            CONFIG.goalkeeperDelay
        );


        /*
           4. Estadísticas.
        */

        detectResult23();


        /*
           5. Final.
        */

        finishShot23();

    }


    /* =====================================================
       CONECTAR AL TIRO LIBRE
    ===================================================== */

    function connectFreeKick23() {

        const scene =
            document.getElementById(
                "freeKickScene16"
            );


        if (!scene)
            return;


        if (
            scene.dataset
                .centralSystem23
            ===
            "true"
        )
            return;


        scene.dataset
            .centralSystem23 =
            "true";


        /*
           Importante:
           usamos CAPTURE para
           intentar controlar el
           disparo antes de otras
           partes.
        */

        scene.addEventListener(
            "click",
            event => {

                /*
                   No ejecutamos si
                   se está usando un
                   botón o control.
                */

                if (
                    event.target.closest(
                        "button"
                    )
                )
                    return;


                executeShot23(
                    "freeKick"
                );

            },
            true
        );

    }


    /* =====================================================
       PENAL
    ===================================================== */

    window.executePenalty23 =
        function() {

            executeShot23(
                "penalty"
            );

        };


    /* =====================================================
       TIRO LIBRE
    ===================================================== */

    window.executeFreeKick23 =
        function() {

            executeShot23(
                "freeKick"
            );

        };


    /* =====================================================
       CAMBIAR MODO
    ===================================================== */

    window.setShotMode23 =
        function(
            mode
        ) {

            if (
                mode ===
                "penalty"
            ) {

                match23.mode =
                    "penalty";

            }

            else {

                match23.mode =
                    "freeKick";

            }

        };


    /* =====================================================
       ESTADO
    ===================================================== */

    window.getShotState23 =
        function() {

            return {
                ...match23
            };

        };


    /* =====================================================
       MONITOR
    ===================================================== */

    function monitor23() {

        createUI23();

        connectFreeKick23();

    }


    /* =====================================================
       INICIO
    ===================================================== */

    createUI23();

    monitor23();


    setInterval(
        monitor23,
        800
    );


    console.log(
        "⚽ Parte 23 cargada: sistema central de disparos"
    );

})();
