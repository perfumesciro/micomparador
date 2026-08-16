/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 10

   AMBIENTE + RELATOR + PÚBLICO + EFECTOS
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ESTILOS
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `

        /* ================================================
           CONTENEDOR DE AMBIENTE
        ================================================ */

        #stadiumAtmosphere {

            position: fixed;

            inset: 0;

            pointer-events: none;

            z-index: 500;

            overflow: hidden;

        }


        /* ================================================
           FLASH DE GOL
        ================================================ */

        #goalFlash {

            position: fixed;

            inset: 0;

            background:
                radial-gradient(
                    circle,
                    rgba(255,255,255,.65),
                    transparent 65%
                );

            opacity: 0;

            pointer-events: none;

            z-index: 9000;

        }


        #goalFlash.active {

            animation:
                goalFlashAnimation
                .7s ease;

        }


        @keyframes goalFlashAnimation {

            0% {
                opacity: 0;
            }

            15% {
                opacity: .8;
            }

            100% {
                opacity: 0;
            }

        }


        /* ================================================
           TEXTO DEL RELATOR
        ================================================ */

        #commentatorBig {

            position: fixed;

            left: 50%;

            top: 17%;

            transform:
                translateX(-50%)
                scale(.7);

            z-index: 8500;

            color: white;

            font-family:
                Arial,
                sans-serif;

            font-size:
                clamp(
                    24px,
                    5vw,
                    62px
                );

            font-weight:
                1000;

            text-align:
                center;

            text-shadow:
                0 5px 15px black,
                0 0 25px rgba(255,255,255,.4);

            opacity: 0;

            white-space:
                nowrap;

        }


        #commentatorBig.show {

            animation:
                commentatorAnimation
                1.6s ease forwards;

        }


        @keyframes commentatorAnimation {

            0% {

                opacity: 0;

                transform:
                    translateX(-50%)
                    scale(.65);

            }

            18% {

                opacity: 1;

                transform:
                    translateX(-50%)
                    scale(1.08);

            }

            35% {

                transform:
                    translateX(-50%)
                    scale(1);

            }

            80% {

                opacity: 1;

            }

            100% {

                opacity: 0;

                transform:
                    translateX(-50%)
                    scale(1.03);

            }

        }


        /* ================================================
           EFECTO DE GOL
        ================================================ */

        .goal-particle {

            position: fixed;

            width: 7px;

            height: 7px;

            border-radius: 50%;

            background:
                white;

            pointer-events: none;

            z-index: 8999;

        }


        /* ================================================
           PÚBLICO
        ================================================ */

        .crowd-reaction {

            animation:
                crowdReaction
                .6s ease;

        }


        @keyframes crowdReaction {

            0% {

                transform:
                    translateY(0);

            }

            30% {

                transform:
                    translateY(-10px);

            }

            60% {

                transform:
                    translateY(3px);

            }

            100% {

                transform:
                    translateY(0);

            }

        }


        /* ================================================
           INDICADOR DE AMBIENTE
        ================================================ */

        #stadiumNoiseIndicator {

            position: fixed;

            right: 15px;

            bottom: 15px;

            z-index: 800;

            padding:
                7px 10px;

            border-radius:
                10px;

            background:
                rgba(0,0,0,.55);

            color:
                rgba(255,255,255,.75);

            font-size:
                11px;

            backdrop-filter:
                blur(8px);

        }


        /* ================================================
           MOVIMIENTO DE GOL
        ================================================ */

        .goal-shake {

            animation:
                goalShake
                .45s ease;

        }


        @keyframes goalShake {

            0% {
                transform:
                    translate(0,0);
            }

            20% {
                transform:
                    translate(-7px,3px);
            }

            40% {
                transform:
                    translate(6px,-4px);
            }

            60% {
                transform:
                    translate(-4px,2px);
            }

            80% {
                transform:
                    translate(3px,-2px);
            }

            100% {
                transform:
                    translate(0,0);
            }

        }


        /* ================================================
           MÓVIL
        ================================================ */

        @media(max-width:700px) {

            #commentatorBig {

                top: 20%;

                white-space:
                    normal;

                width:
                    95%;

            }

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       CREAR ELEMENTOS
    ===================================================== */

    function createAtmosphere() {

        if (
            document.getElementById(
                "stadiumAtmosphere"
            )
        )
            return;


        const atmosphere =
            document.createElement("div");


        atmosphere.id =
            "stadiumAtmosphere";


        atmosphere.innerHTML = `

            <div id="goalFlash"></div>

            <div id="commentatorBig"></div>

        `;


        document.body.appendChild(
            atmosphere
        );


        const indicator =
            document.createElement("div");


        indicator.id =
            "stadiumNoiseIndicator";


        indicator.textContent =
            "🏟️ Ambiente del estadio";


        document.body.appendChild(
            indicator
        );

    }


    /* =====================================================
       SISTEMA DE AUDIO
       No necesita archivos externos.
    ===================================================== */

    let audioContext = null;


    function getAudio() {

        if (!audioContext) {

            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;


            if (!AudioContext)
                return null;


            audioContext =
                new AudioContext();

        }


        if (
            audioContext.state ===
            "suspended"
        ) {

            audioContext.resume();

        }


        return audioContext;

    }


    /* =====================================================
       SONIDO SIMPLE
    ===================================================== */

    function tone(
        frequency,
        duration,
        volume,
        type = "sine"
    ) {

        const ctx =
            getAudio();


        if (!ctx)
            return;


        const oscillator =
            ctx.createOscillator();


        const gain =
            ctx.createGain();


        oscillator.type =
            type;


        oscillator.frequency.value =
            frequency;


        gain.gain.setValueAtTime(
            volume,
            ctx.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            .001,
            ctx.currentTime +
            duration
        );


        oscillator.connect(
            gain
        );


        gain.connect(
            ctx.destination
        );


        oscillator.start();


        oscillator.stop(
            ctx.currentTime +
            duration
        );

    }


    /* =====================================================
       SONIDO DE GOLPE
    ===================================================== */

    function kickSound() {

        tone(
            100,
            .08,
            .08,
            "triangle"
        );


        setTimeout(
            () => {

                tone(
                    55,
                    .12,
                    .045,
                    "sine"
                );

            },
            40
        );

    }


    /* =====================================================
       SONIDO DE GOL
    ===================================================== */

    function goalSound() {

        tone(
            330,
            .15,
            .06,
            "sawtooth"
        );


        setTimeout(
            () => {

                tone(
                    440,
                    .18,
                    .07,
                    "sawtooth"
                );

            },
            100
        );


        setTimeout(
            () => {

                tone(
                    660,
                    .3,
                    .08,
                    "triangle"
                );

            },
            220
        );

    }


    /* =====================================================
       SONIDO DE ATAJADA
    ===================================================== */

    function saveSound() {

        tone(
            180,
            .1,
            .07,
            "triangle"
        );


        setTimeout(
            () => {

                tone(
                    90,
                    .22,
                    .05,
                    "sine"
                );

            },
            80
        );

    }


    /* =====================================================
       SONIDO DE FALLÓ
    ===================================================== */

    function missSound() {

        tone(
            150,
            .25,
            .04,
            "sine"
        );


        setTimeout(
            () => {

                tone(
                    90,
                    .3,
                    .035,
                    "sine"
                );

            },
            120
        );

    }


    /* =====================================================
       RELATOR
    ===================================================== */

    function commentatorBig(
        text
    ) {

        const element =
            document.getElementById(
                "commentatorBig"
            );


        if (!element)
            return;


        element.classList.remove(
            "show"
        );


        /*
           Reiniciar animación.
        */

        void element.offsetWidth;


        element.textContent =
            text;


        element.classList.add(
            "show"
        );

    }


    /* =====================================================
       FRASES
    ===================================================== */

    const goalPhrases = [

        "⚽ ¡GOOOOOOOL!",

        "🔥 ¡QUÉ GOLAZO!",

        "🎙️ ¡GOL DEL EQUIPO!",

        "⚽ ¡ADENTRO!",

        "🔥 ¡NO PUDO EL ARQUERO!"

    ];


    const savePhrases = [

        "🧤 ¡ATAJADÓN!",

        "🧤 ¡QUÉ ATAJADA!",

        "🧤 ¡EL ARQUERO DICE QUE NO!",

        "🧤 ¡INCREÍBLE REFLEJO!"

    ];


    const missPhrases = [

        "😱 ¡AFUERA!",

        "😨 ¡SE FUE DESVIADA!",

        "😮 ¡NO PUDO SER!",

        "⚠️ ¡QUÉ OCASIÓN PERDIDA!"

    ];


    /* =====================================================
       REACCIÓN DEL PÚBLICO
    ===================================================== */

    function crowdReaction() {

        const crowds =
            document.querySelectorAll(
                ".crowd"
            );


        crowds.forEach(crowd => {

            crowd.classList.remove(
                "crowd-reaction"
            );


            void crowd.offsetWidth;


            crowd.classList.add(
                "crowd-reaction"
            );

        });

    }


    /* =====================================================
       PARTÍCULAS DE GOL
    ===================================================== */

    function goalParticles() {

        const centerX =
            window.innerWidth / 2;


        const centerY =
            window.innerHeight * .35;


        for (
            let i = 0;
            i < 55;
            i++
        ) {

            const particle =
                document.createElement(
                    "div"
                );


            particle.className =
                "goal-particle";


            particle.style.left =
                centerX + "px";


            particle.style.top =
                centerY + "px";


            document.body.appendChild(
                particle
            );


            const angle =
                Math.random() *
                Math.PI *
                2;


            const distance =
                80 +
                Math.random() *
                260;


            const x =
                Math.cos(angle) *
                distance;


            const y =
                Math.sin(angle) *
                distance;


            particle.animate(
                [

                    {
                        transform:
                            "translate(0,0) scale(1)",

                        opacity:
                            1

                    },

                    {
                        transform:
                            `
                            translate(
                                ${x}px,
                                ${y}px
                            )
                            scale(.2)
                            `,

                        opacity:
                            0

                    }

                ],
                {

                    duration:
                        700 +
                        Math.random() *
                        500,

                    easing:
                        "cubic-bezier(.2,.8,.3,1)"

                }
            );


            setTimeout(
                () => {

                    particle.remove();

                },
                1300
            );

        }

    }


    /* =====================================================
       EFECTO DE GOL
    ===================================================== */

    function goalAtmosphere() {

        const flash =
            document.getElementById(
                "goalFlash"
            );


        if (flash) {

            flash.classList.remove(
                "active"
            );


            void flash.offsetWidth;


            flash.classList.add(
                "active"
            );

        }


        commentatorBig(
            goalPhrases[
                Math.floor(
                    Math.random() *
                    goalPhrases.length
                )
            ]
        );


        goalSound();


        crowdReaction();


        goalParticles();


        shakeField();

    }


    /* =====================================================
       EFECTO ATAJADA
    ===================================================== */

    function saveAtmosphere() {

        commentatorBig(
            savePhrases[
                Math.floor(
                    Math.random() *
                    savePhrases.length
                )
            ]
        );


        saveSound();


        crowdReaction();


        shakeField();

    }


    /* =====================================================
       EFECTO FALLO
    ===================================================== */

    function missAtmosphere() {

        commentatorBig(
            missPhrases[
                Math.floor(
                    Math.random() *
                    missPhrases.length
                )
            ]
        );


        missSound();

    }


    /* =====================================================
       SACUDIDA DE CÁMARA
    ===================================================== */

    function shakeField() {

        const gameElement =
            document.getElementById(
                "game"
            );


        if (!gameElement)
            return;


        gameElement.classList.remove(
            "goal-shake"
        );


        void gameElement.offsetWidth;


        gameElement.classList.add(
            "goal-shake"
        );


        setTimeout(
            () => {

                gameElement.classList.remove(
                    "goal-shake"
                );

            },
            500
        );

    }


    /* =====================================================
       VIBRACIÓN DE RED
    ===================================================== */

    function shakeNet() {

        const net =
            document.getElementById(
                "net"
            );


        if (!net)
            return;


        net.animate(
            [

                {
                    transform:
                        "scale(1)"
                },

                {
                    transform:
                        "scale(1.04)"
                },

                {
                    transform:
                        "scale(.98)"
                },

                {
                    transform:
                        "scale(1.02)"
                },

                {
                    transform:
                        "scale(1)"
                }

            ],
            {

                duration:
                    500,

                easing:
                    "ease-out"

            }
        );

    }


    /* =====================================================
       DETECTAR CLIC PARA ACTIVAR AUDIO
       Los navegadores permiten audio después
       de una interacción del usuario.
    ===================================================== */

    document.addEventListener(
        "click",
        () => {

            getAudio();

        },
        {
            once: true
        }
    );


    /* =====================================================
       DETECTAR BOTÓN DE PATEAR
    ===================================================== */

    document.addEventListener(
        "mousedown",
        event => {

            if (
                event.target.id ===
                "shootBtn"
            ) {

                kickSound();

            }

        }
    );


    /* =====================================================
       OBSERVAR MENSAJES DEL JUEGO
    ===================================================== */

    const originalShowMessage =
        window.showMessage;


    window.showMessage =
        function(text) {

            if (typeof text === "string") {

                const upper =
                    text.toUpperCase();


                if (
                    upper.includes("GOL")
                ) {

                    goalAtmosphere();


                    setTimeout(
                        shakeNet,
                        100
                    );

                }


                else if (
                    upper.includes("ATAJ")
                ) {

                    saveAtmosphere();

                }


                else if (
                    upper.includes("AFUERA")
                    ||
                    upper.includes("FALL")
                    ||
                    upper.includes("DESVI")
                ) {

                    missAtmosphere();

                }

            }


            if (
                typeof originalShowMessage ===
                "function"
            ) {

                originalShowMessage(
                    text
                );

            }

        };


    /* =====================================================
       RELATOR CUANDO COMIENZA EL TIRO
    ===================================================== */

    document.addEventListener(
        "mousedown",
        event => {

            if (
                event.target.id ===
                "shootBtn"
            ) {

                const playerName =
                    typeof selectedPlayer !==
                    "undefined"
                    ?
                    selectedPlayer.name
                    :
                    "El jugador";


                commentatorBig(
                    `🎙️ ${playerName} se prepara...`
                );

            }

        }
    );


    /* =====================================================
       INICIALIZAR
    ===================================================== */

    function initialize() {

        createAtmosphere();

    }


    setTimeout(
        initialize,
        800
    );


})();
