/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 14
   SISTEMA DE PENAL:
   APUNTADO + POTENCIA + DISPARO
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ESTILOS
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `

        #penaltyController {

            position: fixed;

            left: 50%;

            bottom: 25px;

            transform:
                translateX(-50%);

            z-index: 12000;

            width:
                min(430px, 90vw);

            padding:
                15px;

            border-radius:
                18px;

            background:
                rgba(0,0,0,.72);

            backdrop-filter:
                blur(10px);

            box-shadow:
                0 10px 40px
                rgba(0,0,0,.4);

            color:
                white;

            font-family:
                Arial,
                sans-serif;

        }


        #powerTitle {

            text-align:
                center;

            font-weight:
                900;

            font-size:
                13px;

            margin-bottom:
                8px;

        }


        #powerBar {

            width:
                100%;

            height:
                18px;

            border-radius:
                20px;

            overflow:
                hidden;

            background:
                rgba(255,255,255,.12);

            border:
                1px solid
                rgba(255,255,255,.2);

        }


        #powerFill {

            width:
                0%;

            height:
                100%;

            background:
                linear-gradient(
                    90deg,
                    #21c96b,
                    #f5d000,
                    #ff4d4d
                );

            transition:
                width .03s linear;

        }


        #powerHint {

            text-align:
                center;

            margin-top:
                8px;

            color:
                rgba(255,255,255,.7);

            font-size:
                11px;

        }


        #aimMarker14 {

            position:
                fixed;

            width:
                25px;

            height:
                25px;

            border:
                3px solid
                white;

            border-radius:
                50%;

            z-index:
                11000;

            pointer-events:
                none;

            transform:
                translate(-50%,-50%);

            box-shadow:
                0 0 12px
                rgba(255,255,255,.9);

        }


        #aimMarker14::after {

            content:
                "";

            position:
                absolute;

            inset:
                5px;

            border-radius:
                50%;

            background:
                rgba(255,255,255,.7);

        }


        #shotInfo14 {

            position:
                fixed;

            left:
                50%;

            top:
                25px;

            transform:
                translateX(-50%);

            z-index:
                12000;

            padding:
                8px 14px;

            border-radius:
                10px;

            background:
                rgba(0,0,0,.55);

            color:
                rgba(255,255,255,.8);

            font-family:
                Arial,
                sans-serif;

            font-size:
                12px;

            pointer-events:
                none;

        }


        #shotResult14 {

            position:
                fixed;

            left:
                50%;

            top:
                42%;

            transform:
                translate(
                    -50%,
                    -50%
                );

            z-index:
                13000;

            color:
                white;

            font-family:
                Arial,
                sans-serif;

            font-size:
                clamp(
                    25px,
                    5vw,
                    60px
                );

            font-weight:
                1000;

            text-align:
                center;

            text-shadow:
                0 5px 20px
                black;

            pointer-events:
                none;

            opacity:
                0;

        }


        #shotResult14.show {

            animation:
                shotResultAnimation
                1.2s ease;

        }


        @keyframes shotResultAnimation {

            0% {

                opacity:
                    0;

                transform:
                    translate(
                        -50%,
                        -50%
                    )
                    scale(.7);

            }

            20% {

                opacity:
                    1;

                transform:
                    translate(
                        -50%,
                        -50%
                    )
                    scale(1.1);

            }

            40% {

                transform:
                    translate(
                        -50%,
                        -50%
                    )
                    scale(1);

            }

            80% {

                opacity:
                    1;

            }

            100% {

                opacity:
                    0;

            }

        }


        @media(max-width:600px) {

            #penaltyController {

                bottom:
                    12px;

            }

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       VARIABLES
    ===================================================== */

    let aiming = false;

    let power = 0;

    let powerDirection = 1;

    let shotInProgress = false;

    let mouseX =
        window.innerWidth / 2;

    let mouseY =
        window.innerHeight / 2;


    /* =====================================================
       CREAR INTERFAZ
    ===================================================== */

    function createPenaltyInterface() {

        if (
            document.getElementById(
                "penaltyController"
            )
        )
            return;


        const controller =
            document.createElement(
                "div"
            );


        controller.id =
            "penaltyController";


        controller.innerHTML = `

            <div id="powerTitle">
                POTENCIA
            </div>

            <div id="powerBar">

                <div id="powerFill"></div>

            </div>

            <div id="powerHint">
                Mantené CLICK IZQUIERDO
                y soltá para patear
            </div>

        `;


        document.body.appendChild(
            controller
        );


        const marker =
            document.createElement(
                "div"
            );


        marker.id =
            "aimMarker14";


        document.body.appendChild(
            marker
        );


        const info =
            document.createElement(
                "div"
            );


        info.id =
            "shotInfo14";


        info.textContent =
            "🎯 Mové el mouse para apuntar";


        document.body.appendChild(
            info
        );


        const result =
            document.createElement(
                "div"
            );


        result.id =
            "shotResult14";


        document.body.appendChild(
            result
        );

    }


    /* =====================================================
       MOUSE
    ===================================================== */

    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;


            mouseY =
                event.clientY;


            updateAim();

        }
    );


    /* =====================================================
       ACTUALIZAR APUNTADO
    ===================================================== */

    function updateAim() {

        const marker =
            document.getElementById(
                "aimMarker14"
            );


        if (!marker)
            return;


        marker.style.left =
            mouseX + "px";


        marker.style.top =
            mouseY + "px";

    }


    /* =====================================================
       CLICK
    ===================================================== */

    document.addEventListener(
        "mousedown",
        event => {

            /*
               Solamente botón izquierdo.
            */

            if (
                event.button !== 0
            )
                return;


            /*
               Si estamos sobre un botón,
               no iniciar el tiro.
            */

            if (
                event.target.closest(
                    "button"
                )
            )
                return;


            if (shotInProgress)
                return;


            aiming =
                true;


            power =
                0;


            powerDirection =
                1;


            updatePower();

        }
    );


    /* =====================================================
       SOLTAR CLICK
    ===================================================== */

    document.addEventListener(
        "mouseup",
        event => {

            if (
                event.button !== 0
            )
                return;


            if (!aiming)
                return;


            aiming =
                false;


            shootPenalty();

        }
    );


    /* =====================================================
       POTENCIA
    ===================================================== */

    function updatePower() {

        if (!aiming)
            return;


        power +=
            powerDirection *
            1.5;


        if (
            power >= 100
        ) {

            power =
                100;

            powerDirection =
                -1;

        }


        if (
            power <= 0
        ) {

            power =
                0;

            powerDirection =
                1;

        }


        const fill =
            document.getElementById(
                "powerFill"
            );


        if (fill) {

            fill.style.width =
                power + "%";

        }


        requestAnimationFrame(
            updatePower
        );

    }


    /* =====================================================
       DISPARO
    ===================================================== */

    function shootPenalty() {

        if (shotInProgress)
            return;


        shotInProgress =
            true;


        const shotData =
            calculateShot();


        showShotResult(
            shotData
        );


        animateBall(
            shotData
        );


        /*
           Esperar antes de permitir
           otro tiro.
        */

        setTimeout(
            () => {

                shotInProgress =
                    false;

                power =
                    0;

                updatePower();

            },
            1800
        );

    }


    /* =====================================================
       CALCULAR TIRO
    ===================================================== */

    function calculateShot() {

        const centerX =
            window.innerWidth / 2;


        const centerY =
            window.innerHeight * .38;


        /*
           Distancia del centro
           de la pantalla.
        */

        const dx =
            mouseX -
            centerX;


        const dy =
            mouseY -
            centerY;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        /*
           Más cerca del centro:
           más precisión.
        */

        let precision =
            100 -
            distance / 5;


        precision =
            Math.max(
                10,
                Math.min(
                    100,
                    precision
                )
            );


        /*
           Potencia demasiado alta
           puede reducir precisión.
        */

        const powerPenalty =
            Math.max(
                0,
                power - 82
            ) * .7;


        precision -=
            powerPenalty;


        /*
           Pequeña variación natural.
        */

        precision +=
            (
                Math.random() *
                10
            ) - 5;


        precision =
            Math.max(
                0,
                Math.min(
                    100,
                    precision
                )
            );


        /*
           Resultado.
        */

        let result;


        if (
            precision >= 70
        ) {

            result =
                "goal";

        }

        else if (
            precision >= 42
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
                mouseX,

            y:
                mouseY,

            power:
                power,

            precision:
                precision,

            result:
                result

        };

    }


    /* =====================================================
       ANIMACIÓN DE PELOTA
    ===================================================== */

    function animateBall(
        shot
    ) {

        let ball =
            document.getElementById(
                "ball"
            );


        /*
           Si el juego todavía no tiene
           una pelota con ID "ball",
           creamos una visual temporal.
        */

        if (!ball) {

            ball =
                document.createElement(
                    "div"
                );


            ball.id =
                "ball";


            ball.textContent =
                "⚽";


            ball.style.position =
                "fixed";


            ball.style.left =
                "50%";


            ball.style.top =
                "75%";


            ball.style.zIndex =
                "11500";


            ball.style.fontSize =
                "28px";


            ball.style.pointerEvents =
                "none";


            document.body.appendChild(
                ball
            );

        }


        const startX =
            window.innerWidth / 2;


        const startY =
            window.innerHeight * .75;


        ball.style.left =
            startX + "px";


        ball.style.top =
            startY + "px";


        ball.animate(
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
                            (
                                shot.x -
                                startX
                            ) * .45
                        ) + "px",

                    top:
                        (
                            startY -
                            120
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
       RESULTADO
    ===================================================== */

    function showShotResult(
        shot
    ) {

        const result =
            document.getElementById(
                "shotResult14"
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

        }

        else if (
            shot.result ===
            "save"
        ) {

            text =
                "🧤 ¡ATAJÓ EL ARQUERO!";

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


        /*
           Intentar utilizar
           los efectos de Part 10.
        */

        if (
            shot.result ===
            "goal"
        ) {

            if (
                typeof window.goalAtmosphere ===
                "function"
            ) {

                window.goalAtmosphere();

            }

        }


        else if (
            shot.result ===
            "save"
        ) {

            if (
                typeof window.saveAtmosphere ===
                "function"
            ) {

                window.saveAtmosphere();

            }

        }


        else {

            if (
                typeof window.missAtmosphere ===
                "function"
            ) {

                window.missAtmosphere();

            }

        }

    }


    /* =====================================================
       MOSTRAR / OCULTAR CONTROLADOR
    ===================================================== */

    window.showPenaltyControls =
        function() {

            createPenaltyInterface();


            const controller =
                document.getElementById(
                    "penaltyController"
                );


            const marker =
                document.getElementById(
                    "aimMarker14"
                );


            if (controller)
                controller.style.display =
                    "block";


            if (marker)
                marker.style.display =
                    "block";

        };


    window.hidePenaltyControls =
        function() {

            const controller =
                document.getElementById(
                    "penaltyController"
                );


            const marker =
                document.getElementById(
                    "aimMarker14"
                );


            if (controller)
                controller.style.display =
                    "none";


            if (marker)
                marker.style.display =
                    "none";

        };


    /* =====================================================
       INICIO
    ===================================================== */

    function initialize() {

        createPenaltyInterface();


        /*
           Mostramos el sistema
           después de cargar.
        */

        setTimeout(
            () => {

                if (
                    document.getElementById(
                        "modeTutorial"
                    )
                )
                    return;


                showPenaltyControls();

            },
            1500
        );

    }


    setTimeout(
        initialize,
        500
    );


})();
