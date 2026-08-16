/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 21
   ANIMACIÓN DEL JUGADOR AL PATEAR
========================================================= */

(() => {

    "use strict";

    let player21 = null;
    let isKicking21 = false;

    /* =====================================================
       ESTILOS
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `

        #player21 {

            position: fixed;

            left: 50%;

            top: 69%;

            width: 75px;

            height: 120px;

            transform:
                translate(-50%, -50%);

            z-index: 18000;

            pointer-events: none;

            font-size: 76px;

            display: flex;

            align-items: center;

            justify-content: center;

            filter:
                drop-shadow(
                    0 8px 5px
                    rgba(0,0,0,.4)
                );

        }


        #player21.kick {

            animation:
                playerKick21
                .72s
                cubic-bezier(
                    .2,
                    .8,
                    .25,
                    1
                );

        }


        @keyframes playerKick21 {

            0% {

                transform:
                    translate(-50%, -50%)
                    rotate(0deg)
                    scale(1);

            }

            20% {

                transform:
                    translate(-56%, -50%)
                    rotate(-5deg)
                    scale(1.02);

            }

            42% {

                transform:
                    translate(-50%, -58%)
                    rotate(7deg)
                    scale(1.05);

            }

            58% {

                transform:
                    translate(-44%, -55%)
                    rotate(18deg)
                    scale(1.08);

            }

            72% {

                transform:
                    translate(-47%, -50%)
                    rotate(5deg)
                    scale(1.02);

            }

            100% {

                transform:
                    translate(-50%, -50%)
                    rotate(0deg)
                    scale(1);

            }

        }


        #kickPowerEffect21 {

            position: fixed;

            left: 50%;

            top: 68%;

            width: 90px;

            height: 90px;

            border-radius: 50%;

            z-index: 17900;

            pointer-events: none;

            opacity: 0;

            transform:
                translate(-50%, -50%)
                scale(.2);

            background:
                radial-gradient(
                    circle,
                    rgba(255,255,255,.8),
                    rgba(255,255,255,.15) 35%,
                    transparent 70%
                );

        }


        #kickPowerEffect21.show {

            animation:
                kickEffect21
                .35s
                ease-out
                forwards;

        }


        @keyframes kickEffect21 {

            0% {

                opacity: .9;

                transform:
                    translate(-50%, -50%)
                    scale(.2);

            }

            100% {

                opacity: 0;

                transform:
                    translate(-50%, -50%)
                    scale(1.8);

            }

        }


        #kickText21 {

            position: fixed;

            left: 50%;

            top: 58%;

            transform:
                translate(-50%, -50%);

            z-index: 21000;

            color: white;

            font-family:
                Arial,
                sans-serif;

            font-size: 18px;

            font-weight: 900;

            text-shadow:
                0 3px 10px
                rgba(0,0,0,.9);

            opacity: 0;

            pointer-events: none;

        }


        #kickText21.show {

            animation:
                kickTextAnimation21
                .7s
                ease-out
                forwards;

        }


        @keyframes kickTextAnimation21 {

            0% {

                opacity: 0;

                transform:
                    translate(-50%, -50%)
                    translateY(10px);

            }

            30% {

                opacity: 1;

            }

            100% {

                opacity: 0;

                transform:
                    translate(-50%, -50%)
                    translateY(-20px);

            }

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       CREAR JUGADOR
    ===================================================== */

    function createPlayer21() {

        if (
            document.getElementById(
                "player21"
            )
        ) {

            player21 =
                document.getElementById(
                    "player21"
                );

            return;

        }

        player21 =
            document.createElement(
                "div"
            );

        player21.id =
            "player21";

        player21.textContent =
            "🧍‍♂️";

        document.body.appendChild(
            player21
        );

        createKickEffects21();

    }


    /* =====================================================
       EFECTOS
    ===================================================== */

    function createKickEffects21() {

        if (
            !document.getElementById(
                "kickPowerEffect21"
            )
        ) {

            const effect =
                document.createElement(
                    "div"
                );

            effect.id =
                "kickPowerEffect21";

            document.body.appendChild(
                effect
            );

        }


        if (
            !document.getElementById(
                "kickText21"
            )
        ) {

            const text =
                document.createElement(
                    "div"
                );

            text.id =
                "kickText21";

            document.body.appendChild(
                text
            );

        }

    }


    /* =====================================================
       ANIMACIÓN DE PATEO
    ===================================================== */

    function kickAnimation21(
        power = 70
    ) {

        if (
            isKicking21
        )
            return;


        isKicking21 =
            true;


        createPlayer21();


        player21.classList.remove(
            "kick"
        );


        void player21.offsetWidth;


        player21.classList.add(
            "kick"
        );


        /*
           Efecto de golpeo.
        */

        setTimeout(
            () => {

                showKickImpact21(
                    power
                );

            },
            400
        );


        setTimeout(
            () => {

                player21.classList.remove(
                    "kick"
                );

                isKicking21 =
                    false;

            },
            750
        );

    }


    /* =====================================================
       EFECTO DEL GOLPE
    ===================================================== */

    function showKickImpact21(
        power
    ) {

        const effect =
            document.getElementById(
                "kickPowerEffect21"
            );


        if (!effect)
            return;


        effect.style.transform =
            `
            translate(-50%,-50%)
            scale(${.4 + power / 150})
            `;


        effect.classList.remove(
            "show"
        );


        void effect.offsetWidth;


        effect.classList.add(
            "show"
        );


        const text =
            document.getElementById(
                "kickText21"
            );


        if (!text)
            return;


        if (
            power >= 85
        ) {

            text.textContent =
                "💥 ¡POTENCIA MÁXIMA!";

        }

        else if (
            power >= 65
        ) {

            text.textContent =
                "💨 ¡BUEN GOLPEO!";

        }

        else {

            text.textContent =
                "⚽ ¡LE PEGÓ!";

        }


        text.classList.remove(
            "show"
        );


        void text.offsetWidth;


        text.classList.add(
            "show"
        );

    }


    /* =====================================================
       FUNCIÓN PÚBLICA
    ===================================================== */

    window.playKickAnimation21 =
        function(
            power
        ) {

            kickAnimation21(
                power ?? 70
            );

        };


    /* =====================================================
       CONECTAR CON TIRO LIBRE
    ===================================================== */

    function connectFreeKick21() {

        const scene =
            document.getElementById(
                "freeKickScene16"
            );


        if (!scene)
            return;


        if (
            scene.dataset
                .player21Connected
            ===
            "true"
        )
            return;


        scene.dataset
            .player21Connected =
            "true";


        scene.addEventListener(
            "mouseup",
            event => {

                if (
                    event.button !== 0
                )
                    return;


                const power =
                    getPower21();


                /*
                   Primero animamos
                   al jugador.
                */

                kickAnimation21(
                    power
                );

            }
        );

    }


    /* =====================================================
       OBTENER POTENCIA
    ===================================================== */

    function getPower21() {

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
       CONECTAR AUTOMÁTICAMENTE
    ===================================================== */

    function monitor21() {

        createPlayer21();

        connectFreeKick21();

    }


    /* =====================================================
       API
    ===================================================== */

    window.getKickAnimationState21 =
        function() {

            return {

                kicking:
                    isKicking21

            };

        };


    /* =====================================================
       INICIO
    ===================================================== */

    createPlayer21();

    monitor21();


    setInterval(
        monitor21,
        800
    );


    console.log(
        "⚽ Parte 21 cargada: animación de pateo"
    );

})();
