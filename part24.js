/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 24
   CONTROL CENTRAL Y ANTI-DUPLICADOS
========================================================= */

(() => {

    "use strict";

    /*
       Esta parte NO reemplaza los sistemas anteriores.

       Su función es:

       - Evitar dobles disparos.
       - Evitar doble animación.
       - Evitar doble reacción del arquero.
       - Evitar doble cámara.
       - Controlar el estado del partido.
       - Preparar el juego para penales y tiros libres.
    */


    /* =====================================================
       MOTOR CENTRAL
    ===================================================== */

    const engine24 = {

        initialized: false,

        shooting: false,

        shotId: 0,

        mode: "freeKick",

        locked: false,

        lastShot: 0,

        cooldown: 1400,

        power: 70,

        curve: 0,

        targetX: 0,

        targetY: 0,

        result: null

    };


    /* =====================================================
       ESTADO DEL PARTIDO
    ===================================================== */

    const match24 = {

        playerScore: 0,

        opponentScore: 0,

        attempts: 0,

        playerTurn: true,

        finished: false

    };


    /* =====================================================
       ESTILOS
    ===================================================== */

    const style =
        document.createElement("style");


    style.textContent = `

        #engineStatus24 {

            position: fixed;

            left: 50%;

            bottom: 145px;

            transform:
                translateX(-50%);

            z-index: 30000;

            padding: 10px 16px;

            border-radius: 12px;

            background:
                rgba(0,0,0,.78);

            color: white;

            font-family:
                Arial,
                sans-serif;

            font-size: 12px;

            font-weight: 900;

            opacity: 0;

            pointer-events: none;

            transition:
                opacity .2s ease;

        }


        #engineStatus24.show {

            opacity: 1;

        }


        #matchScore24 {

            position: fixed;

            left: 50%;

            top: 72px;

            transform:
                translateX(-50%);

            z-index: 29000;

            padding: 8px 15px;

            border-radius: 12px;

            background:
                rgba(0,0,0,.65);

            color: white;

            font-family:
                Arial,
                sans-serif;

            font-weight: 900;

            font-size: 14px;

            pointer-events: none;

        }

    `;


    document.head.appendChild(
        style
    );


    /* =====================================================
       CREAR UI
    ===================================================== */

    function createUI24() {

        if (
            !document.getElementById(
                "engineStatus24"
            )
        ) {

            const status =
                document.createElement(
                    "div"
                );

            status.id =
                "engineStatus24";

            status.textContent =
                "Preparando...";

            document.body.appendChild(
                status
            );

        }


        if (
            !document.getElementById(
                "matchScore24"
            )
        ) {

            const score =
                document.createElement(
                    "div"
                );

            score.id =
                "matchScore24";

            document.body.appendChild(
                score
            );

        }


        updateScore24();

    }


    /* =====================================================
       ACTUALIZAR MARCADOR
    ===================================================== */

    function updateScore24() {

        const element =
            document.getElementById(
                "matchScore24"
            );


        if (!element)
            return;


        element.textContent =
            "⚽ " +
            match24.playerScore +
            "  -  " +
            match24.opponentScore;

    }


    /* =====================================================
       MENSAJE
    ===================================================== */

    function showStatus24(
        text
    ) {

        const element =
            document.getElementById(
                "engineStatus24"
            );


        if (!element)
            return;


        element.textContent =
            text;


        element.classList.add(
            "show"
        );


        setTimeout(
            () => {

                element.classList.remove(
                    "show"
                );

            },
            800
        );

    }


    /* =====================================================
       OBTENER OBJETIVO
    ===================================================== */

    function getTarget24() {

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

    function getPower24() {

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

    function getCurve24() {

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
       BLOQUEAR DISPARO
    ===================================================== */

    function lockShot24() {

        engine24.locked =
            true;

        engine24.shooting =
            true;

    }


    /* =====================================================
       DESBLOQUEAR
    ===================================================== */

    function unlockShot24() {

        engine24.locked =
            false;

        engine24.shooting =
            false;

    }


    /* =====================================================
       COMPROBAR SI SE PUEDE PATEAR
    ===================================================== */

    function canShoot24() {

        if (
            engine24.finished
        )
            return false;


        if (
            engine24.locked
        )
            return false;


        const now =
            performance.now();


        if (
            now -
            engine24.lastShot
            <
            engine24.cooldown
        ) {

            return false;

        }


        return true;

    }


    /* =====================================================
       PREPARAR DISPARO
    ===================================================== */

    function prepareShot24(
        mode
    ) {

        if (
            !canShoot24()
        ) {

            showStatus24(
                "⏳ Esperá para volver a patear"
            );

            return false;

        }


        lockShot24();


        engine24.mode =
            mode;


        engine24.shotId++;


        engine24.lastShot =
            performance.now();


        engine24.power =
            getPower24();


        engine24.curve =
            getCurve24();


        const target =
            getTarget24();


        engine24.targetX =
            target.x;


        engine24.targetY =
            target.y;


        engine24.result =
            null;


        engine24.attempts++;


        return true;

    }


    /* =====================================================
       ANIMACIÓN
    ===================================================== */

    function playerAnimation24() {

        if (
            typeof window
                .playKickAnimation21
                ===
                "function"
        ) {

            window.playKickAnimation21(
                engine24.power
            );

        }

    }


    /* =====================================================
       CÁMARA
    ===================================================== */

    function camera24() {

        if (
            typeof window
                .startFootballCamera22
                ===
                "function"
        ) {

            window.startFootballCamera22(

                engine24.targetX,

                engine24.targetY,

                engine24.power

            );

        }

    }


    /* =====================================================
       ARQUERO
    ===================================================== */

    function goalkeeper24() {

        if (
            typeof window
                .goalkeeperReact20
                ===
                "function"
        ) {

            window.goalkeeperReact20(

                engine24.targetX,

                engine24.targetY,

                engine24.power,

                engine24.curve

            );

        }

    }


    /* =====================================================
       EJECUTAR DISPARO
    ===================================================== */

    function executeShot24(
        mode = "freeKick"
    ) {

        if (
            !prepareShot24(
                mode
            )
        )
            return;


        const currentShot =
            engine24.shotId;


        showStatus24(
            "🎯 Preparando disparo..."
        );


        /*
           ANIMACIÓN
        */

        setTimeout(
            () => {

                if (
                    currentShot !==
                    engine24.shotId
                )
                    return;


                playerAnimation24();

            },
            80
        );


        /*
           CÁMARA
        */

        setTimeout(
            () => {

                if (
                    currentShot !==
                    engine24.shotId
                )
                    return;


                camera24();

            },
            130
        );


        /*
           ARQUERO
        */

        setTimeout(
            () => {

                if (
                    currentShot !==
                    engine24.shotId
                )
                    return;


                goalkeeper24();

            },
            220
        );


        /*
           LIBERAR EL SISTEMA
        */

        setTimeout(
            () => {

                if (
                    currentShot !==
                    engine24.shotId
                )
                    return;


                unlockShot24();

            },
            1500
        );

    }


    /* =====================================================
       CONECTAR TIRO LIBRE
    ===================================================== */

    function connectFreeKick24() {

        const scene =
            document.getElementById(
                "freeKickScene16"
            );


        if (!scene)
            return;


        /*
           Solo colocamos nuestro
           listener una vez.
        */

        if (
            scene.dataset
                .part24Connected
            ===
            "true"
        )
            return;


        scene.dataset
            .part24Connected =
            "true";


        /*
           CAPTURE permite que este
           sistema reciba primero
           el evento.
        */

        scene.addEventListener(
            "mousedown",
            event => {

                if (
                    event.button !== 0
                )
                    return;


                /*
                   No interferir con
                   botones.
                */

                if (
                    event.target.closest(
                        "button"
                    )
                )
                    return;


                /*
                   Evitamos iniciar
                   otro tiro si ya
                   existe uno.
                */

                if (
                    engine24.locked
                ) {

                    event.preventDefault();

                    event.stopImmediatePropagation();

                    return;

                }

            },
            true
        );

    }


    /* =====================================================
       MODO PENAL
    ===================================================== */

    window.startPenalty24 =
        function() {

            executeShot24(
                "penalty"
            );

        };


    /* =====================================================
       MODO TIRO LIBRE
    ===================================================== */

    window.startFreeKick24 =
        function() {

            executeShot24(
                "freeKick"
            );

        };


    /* =====================================================
       FORZAR BLOQUEO
    ===================================================== */

    window.lockFootballShot24 =
        function() {

            lockShot24();

        };


    /* =====================================================
       FORZAR DESBLOQUEO
    ===================================================== */

    window.unlockFootballShot24 =
        function() {

            unlockShot24();

        };


    /* =====================================================
       CAMBIAR RESULTADO
    ===================================================== */

    window.setShotResult24 =
        function(
            result
        ) {

            if (
                !engine24.shooting
            )
                return;


            engine24.result =
                result;


            if (
                result ===
                "goal"
            ) {

                match24.playerScore++;

                showStatus24(
                    "⚽ ¡GOOOOOOL!"
                );

            }

            else if (
                result ===
                "save"
            ) {

                showStatus24(
                    "🧤 ¡ATAJADÓN!"
                );

            }

            else if (
                result ===
                "miss"
            ) {

                showStatus24(
                    "❌ ¡AFUERA!"
                );

            }


            updateScore24();

        };


    /* =====================================================
       ESTADO DEL MOTOR
    ===================================================== */

    window.getFootballEngine24 =
        function() {

            return {

                ...engine24,

                match:
                    {
                        ...match24
                    }

            };

        };


    /* =====================================================
       REINICIAR PARTIDO
    ===================================================== */

    window.resetFootballMatch24 =
        function() {

            engine24.shooting =
                false;

            engine24.locked =
                false;

            engine24.shotId =
                0;

            engine24.lastShot =
                0;

            engine24.result =
                null;


            match24.playerScore =
                0;

            match24.opponentScore =
                0;

            match24.attempts =
                0;

            match24.playerTurn =
                true;

            match24.finished =
                false;


            updateScore24();

        };


    /* =====================================================
       MONITOR
    ===================================================== */

    function monitor24() {

        createUI24();

        connectFreeKick24();

    }


    /* =====================================================
       INICIO
    ===================================================== */

    createUI24();

    monitor24();


    setInterval(
        monitor24,
        1000
    );


    console.log(
        "⚙️ Parte 24 cargada: motor central"
    );

})();
