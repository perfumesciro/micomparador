/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 17
   FÍSICA DE PELOTA
========================================================= */

(() => {

    "use strict";

    let physicsBall = null;

    let animationFrame = null;

    let activePhysics = false;


    /* =====================================================
       ESTILOS
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `

        #physicsBall17 {

            position: fixed;

            width: 32px;

            height: 32px;

            display: flex;

            align-items: center;

            justify-content: center;

            font-size: 30px;

            z-index: 20000;

            pointer-events: none;

            transform:
                translate(-50%,-50%);

            filter:
                drop-shadow(
                    0 6px 5px
                    rgba(0,0,0,.35)
                );

        }


        #ballTrail17 {

            position: fixed;

            width: 8px;

            height: 8px;

            border-radius: 50%;

            background:
                rgba(255,255,255,.4);

            pointer-events: none;

            z-index: 19990;

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       CREAR PELOTA
    ===================================================== */

    function createPhysicsBall() {

        if (
            document.getElementById(
                "physicsBall17"
            )
        ) {

            physicsBall =
                document.getElementById(
                    "physicsBall17"
                );

            return;

        }


        physicsBall =
            document.createElement(
                "div"
            );


        physicsBall.id =
            "physicsBall17";


        physicsBall.textContent =
            "⚽";


        document.body.appendChild(
            physicsBall
        );

    }


    /* =====================================================
       FÍSICA
    ===================================================== */

    function shootPhysicsBall(
        options = {}
    ) {

        createPhysicsBall();


        cancelAnimationFrame(
            animationFrame
        );


        activePhysics =
            true;


        /*
           Posición inicial.
        */

        let x =
            options.startX ??
            window.innerWidth / 2;


        let y =
            options.startY ??
            window.innerHeight * .72;


        /*
           Dirección.
        */

        const targetX =
            options.targetX ??
            window.innerWidth / 2;


        const targetY =
            options.targetY ??
            window.innerHeight * .35;


        /*
           Potencia de 0 a 100.
        */

        const power =
            Math.max(
                1,
                Math.min(
                    100,
                    options.power ?? 70
                )
            );


        /*
           Curva.

           Negativo:
           curva hacia izquierda.

           Positivo:
           curva hacia derecha.
        */

        const curve =
            options.curve ?? 0;


        /*
           Velocidad horizontal.
        */

        let vx =
            (
                targetX -
                x
            ) * 0.045;


        /*
           Velocidad vertical.
        */

        let vy =
            -(
                power *
                0.16
            );


        /*
           Gravedad.
        */

        const gravity =
            0.012;


        /*
           Fuerza del efecto.
        */

        let spin =
            curve *
            0.0009;


        /*
           Rotación visual.
        */

        let rotation =
            0;


        /*
           Tiempo.
        */

        let lastTime =
            performance.now();


        function frame(
            now
        ) {

            if (
                !activePhysics
            )
                return;


            const delta =
                Math.min(
                    32,
                    now -
                    lastTime
                );


            lastTime =
                now;


            /*
               Normalizar tiempo.
            */

            const dt =
                delta / 16.67;


            /*
               Curva.
            */

            vx +=
                spin *
                dt;


            /*
               Gravedad.
            */

            vy +=
                gravity *
                dt;


            /*
               Posición.
            */

            x +=
                vx *
                dt;


            y +=
                vy *
                dt;


            /*
               Rotación.
            */

            rotation +=
                (
                    Math.abs(vx) +
                    Math.abs(vy)
                ) *
                1.5 *
                dt;


            /*
               Mostrar.
            */

            physicsBall.style.left =
                x + "px";


            physicsBall.style.top =
                y + "px";


            physicsBall.style.transform =
                `
                translate(-50%,-50%)
                rotate(${rotation}deg)
                scale(${1 + Math.max(0, -vy) * .002})
                `;


            /*
               Crear pequeño rastro.
            */

            createTrail(
                x,
                y
            );


            /*
               Final de trayectoria.
            */

            if (
                y <
                window.innerHeight * .18
                ||
                y >
                window.innerHeight * .90
                ||
                x <
                -100
                ||
                x >
                window.innerWidth + 100
            ) {

                finishPhysics();

                return;

            }


            animationFrame =
                requestAnimationFrame(
                    frame
                );

        }


        animationFrame =
            requestAnimationFrame(
                frame
            );

    }


    /* =====================================================
       RASTRO
    ===================================================== */

    function createTrail(
        x,
        y
    ) {

        /*
           No crear demasiados elementos.
        */

        if (
            Math.random() > .22
        )
            return;


        const trail =
            document.createElement(
                "div"
            );


        trail.id =
            "ballTrail17";


        trail.style.left =
            x + "px";


        trail.style.top =
            y + "px";


        trail.style.opacity =
            ".35";


        document.body.appendChild(
            trail
        );


        trail.animate(
            [

                {
                    transform:
                        "translate(-50%,-50%) scale(1)",

                    opacity:
                        .35

                },

                {

                    transform:
                        "translate(-50%,-50%) scale(.1)",

                    opacity:
                        0

                }

            ],
            {

                duration:
                    350,

                easing:
                    "ease-out"

            }
        );


        setTimeout(
            () => {

                trail.remove();

            },
            400
        );

    }


    /* =====================================================
       FINAL
    ===================================================== */

    function finishPhysics() {

        activePhysics =
            false;


        cancelAnimationFrame(
            animationFrame
        );


        /*
           Ocultar la pelota.
        */

        if (physicsBall) {

            physicsBall.style.display =
                "none";

        }


        setTimeout(
            () => {

                if (physicsBall) {

                    physicsBall.style.display =
                        "flex";

                }

            },
            400
        );

    }


    /* =====================================================
       DETENER
    ===================================================== */

    window.stopBallPhysics17 =
        function() {

            activePhysics =
                false;


            cancelAnimationFrame(
                animationFrame
            );

        };


    /* =====================================================
       FUNCIÓN PÚBLICA
    ===================================================== */

    window.shootFootballPhysics =
        function(
            options
        ) {

            shootPhysicsBall(
                options
            );

        };


    /* =====================================================
       CONECTAR CON TIRO LIBRE
    ===================================================== */

    function connectFreeKickPhysics() {

        /*
           No reemplazamos el sistema
           anterior.

           Solamente observamos
           cuándo aparece una pelota
           de tiro libre.
        */

        const observer =
            new MutationObserver(
                () => {

                    if (
                        !window.startFreeKickMode
                    )
                        return;

                }
            );


        observer.observe(
            document.body,
            {

                childList:
                    true,

                subtree:
                    true

            }
        );

    }


    /* =====================================================
       PRUEBA DE FÍSICA
    ===================================================== */

    window.testFootballPhysics =
        function() {

            shootPhysicsBall({

                startX:
                    window.innerWidth / 2,

                startY:
                    window.innerHeight * .72,

                targetX:
                    window.innerWidth * .68,

                targetY:
                    window.innerHeight * .32,

                power:
                    75,

                curve:
                    30

            });

        };


    /* =====================================================
       INICIO
    ===================================================== */

    function initialize() {

        createPhysicsBall();

        connectFreeKickPhysics();

        console.log(
            "⚽ Parte 17 cargada: física de pelota"
        );

    }


    setTimeout(
        initialize,
        1000
    );


})();
