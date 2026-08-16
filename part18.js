/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 18
   CONEXIÓN DE FÍSICA + TIROS LIBRES
========================================================= */

(() => {

    "use strict";

    let connected = false;
    let freeKickObserver = null;


    /* =====================================================
       ESTILOS
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `

        #physicsImpact18 {

            position: fixed;

            width: 70px;
            height: 70px;

            border-radius: 50%;

            pointer-events: none;

            z-index: 22000;

            transform:
                translate(-50%, -50%)
                scale(.2);

            opacity: 0;

            background:
                radial-gradient(
                    circle,
                    rgba(255,255,255,.95) 0%,
                    rgba(255,255,255,.35) 35%,
                    transparent 70%
                );

        }


        #physicsImpact18.show {

            animation:
                impact18
                .45s
                ease-out
                forwards;

        }


        @keyframes impact18 {

            0% {

                opacity: .9;

                transform:
                    translate(-50%,-50%)
                    scale(.2);

            }

            100% {

                opacity: 0;

                transform:
                    translate(-50%,-50%)
                    scale(2);

            }

        }


        #physicsMessage18 {

            position: fixed;

            left: 50%;

            top: 22%;

            transform:
                translate(-50%,-50%);

            z-index: 23000;

            color: white;

            font-family:
                Arial,
                sans-serif;

            font-size:
                clamp(25px,5vw,60px);

            font-weight: 1000;

            text-shadow:
                0 4px 20px rgba(0,0,0,.9);

            opacity: 0;

            pointer-events: none;

            white-space: nowrap;

        }


        #physicsMessage18.show {

            animation:
                message18
                1.2s
                ease;

        }


        @keyframes message18 {

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

    `;

    document.head.appendChild(style);


    /* =====================================================
       CREAR ELEMENTOS
    ===================================================== */

    function createEffects() {

        if (
            !document.getElementById(
                "physicsImpact18"
            )
        ) {

            const impact =
                document.createElement("div");

            impact.id =
                "physicsImpact18";

            document.body.appendChild(
                impact
            );

        }


        if (
            !document.getElementById(
                "physicsMessage18"
            )
        ) {

            const message =
                document.createElement("div");

            message.id =
                "physicsMessage18";

            document.body.appendChild(
                message
            );

        }

    }


    /* =====================================================
       MOSTRAR MENSAJE
    ===================================================== */

    function showMessage(text) {

        const message =
            document.getElementById(
                "physicsMessage18"
            );

        if (!message)
            return;


        message.textContent =
            text;


        message.classList.remove(
            "show"
        );


        void message.offsetWidth;


        message.classList.add(
            "show"
        );

    }


    /* =====================================================
       IMPACTO
    ===================================================== */

    function createImpact(
        x,
        y
    ) {

        const impact =
            document.getElementById(
                "physicsImpact18"
            );

        if (!impact)
            return;


        impact.style.left =
            x + "px";


        impact.style.top =
            y + "px";


        impact.classList.remove(
            "show"
        );


        void impact.offsetWidth;


        impact.classList.add(
            "show"
        );

    }


    /* =====================================================
       OBTENER OBJETIVO
    ===================================================== */

    function getFreeKickTarget() {

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
                window.innerHeight * .37

        };

    }


    /* =====================================================
       OBTENER POTENCIA
    ===================================================== */

    function getFreeKickPower() {

        /*
           Primero intentamos obtener
           el valor de la Parte 16.
        */

        if (
            typeof window.freeKickPower16 ===
            "number"
        ) {

            return window.freeKickPower16;

        }


        /*
           Si no está disponible,
           usamos una potencia segura.
        */

        const bar =
            document.getElementById(
                "freeKickPowerFill16"
            );


        if (bar) {

            const width =
                parseFloat(
                    bar.style.width
                );


            if (
                Number.isFinite(width)
            ) {

                return width;

            }

        }


        return 70;

    }


    /* =====================================================
       CALCULAR CURVA
    ===================================================== */

    function calculateCurve(
        targetX
    ) {

        const center =
            window.innerWidth / 2;


        const difference =
            targetX -
            center;


        /*
           La posición horizontal
           determina el efecto.

           Apuntar hacia la izquierda:
           curva izquierda.

           Apuntar hacia derecha:
           curva derecha.
        */

        return Math.max(
            -45,
            Math.min(
                45,
                difference / 5
            )
        );

    }


    /* =====================================================
       DISPARAR CON FÍSICA
    ===================================================== */

    function shootFreeKickWithPhysics() {

        if (
            typeof window.shootFootballPhysics !==
            "function"
        ) {

            console.warn(
                "La física de la Parte 17 no está disponible."
            );

            return;

        }


        const target =
            getFreeKickTarget();


        const power =
            getFreeKickPower();


        const curve =
            calculateCurve(
                target.x
            );


        const startX =
            window.innerWidth / 2;


        const startY =
            window.innerHeight * .70;


        /*
           Potencia mínima.
        */

        const realPower =
            Math.max(
                35,
                power
            );


        /*
           El objetivo se modifica
           ligeramente según la potencia.

           Un tiro muy potente
           tiene una trayectoria
           algo más larga.
        */

        const targetY =
            target.y -
            (
                realPower *
                .08
            );


        window.shootFootballPhysics({

            startX:
                startX,

            startY:
                startY,

            targetX:
                target.x,

            targetY:
                targetY,

            power:
                realPower,

            curve:
                curve

        });


        /*
           Mostrar información.
        */

        if (
            realPower >= 85
        ) {

            showMessage(
                "💨 ¡TIRO POTENTE!"
            );

        }

        else if (
            Math.abs(curve) >= 25
        ) {

            showMessage(
                "🌀 ¡QUÉ EFECTO!"
            );

        }

    }


    /* =====================================================
       INTERCEPTAR EL TIRO LIBRE
    ===================================================== */

    function connectFreeKick() {

        /*
           Evitamos conectar dos veces.
        */

        if (connected)
            return;


        connected =
            true;


        /*
           Observamos la aparición
           de la interfaz de tiro libre.
        */

        freeKickObserver =
            new MutationObserver(
                () => {

                    const power =
                        document.getElementById(
                            "freeKickPower16"
                        );


                    if (!power)
                        return;


                    connectFreeKickControls();

                }
            );


        freeKickObserver.observe(
            document.body,
            {

                childList:
                    true,

                subtree:
                    true

            }
        );


        connectFreeKickControls();

    }


    /* =====================================================
       CONECTAR CONTROLES
    ===================================================== */

    function connectFreeKickControls() {

        const scene =
            document.getElementById(
                "freeKickScene16"
            );


        if (!scene)
            return;


        /*
           Evitamos colocar el listener
           varias veces.
        */

        if (
            scene.dataset.physics18Connected ===
            "true"
        ) {

            return;

        }


        scene.dataset.physics18Connected =
            "true";


        /*
           Guardamos el evento original
           de mouseup en un listener
           adicional.

           La Parte 16 también puede
           reaccionar, por lo que
           esperamos un poco para
           que la física entre después.
        */

        scene.addEventListener(
            "mouseup",
            event => {

                if (
                    event.button !== 0
                )
                    return;


                setTimeout(
                    () => {

                        /*
                           Si la escena sigue
                           activa, hacemos
                           el disparo físico.
                        */

                        if (
                            document.getElementById(
                                "freeKickScene16"
                            )
                        ) {

                            shootFreeKickWithPhysics();

                        }

                    },
                    30
                );

            }
        );

    }


    /* =====================================================
       EVENTO DE TECLADO
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            /*
               Espacio también puede
               iniciar una prueba.

               No interfiere con el tiro
               normal porque solamente
               funciona en modo libre.
            */

            if (
                event.code !==
                "Space"
            )
                return;


            const scene =
                document.getElementById(
                    "freeKickScene16"
                );


            if (!scene)
                return;


            event.preventDefault();

        }
    );


    /* =====================================================
       CONECTAR CON EL RESULTADO
    ===================================================== */

    function watchResult() {

        const result =
            document.getElementById(
                "freeKickResult16"
            );


        if (!result)
            return;


        const observer =
            new MutationObserver(
                mutations => {

                    mutations.forEach(
                        mutation => {

                            const text =
                                result.textContent
                                    .toUpperCase();


                            if (
                                text.includes(
                                    "GOOOOOOL"
                                )
                            ) {

                                const target =
                                    getFreeKickTarget();


                                createImpact(
                                    target.x,
                                    target.y
                                );


                                showMessage(
                                    "⚽ ¡GOOOOOOOL!"
                                );

                            }

                            else if (
                                text.includes(
                                    "ATAJADÓN"
                                )
                            ) {

                                showMessage(
                                    "🧤 ¡ATAJADÓN!"
                                );

                            }

                            else if (
                                text.includes(
                                    "AFUERA"
                                )
                            ) {

                                showMessage(
                                    "😱 ¡AFUERA!"
                                );

                            }

                        }
                    );

                }
            );


        observer.observe(
            result,
            {

                childList:
                    true,

                characterData:
                    true,

                subtree:
                    true

            }
        );

    }


    /* =====================================================
       API PÚBLICA
    ===================================================== */

    window.enablePhysicsFreeKick18 =
        function() {

            createEffects();

            shootFreeKickWithPhysics();

        };


    /* =====================================================
       INICIO
    ===================================================== */

    function initialize() {

        createEffects();

        connectFreeKick();

        /*
           El resultado de la Parte 16
           puede aparecer después,
           así que esperamos.
        */

        setTimeout(
            watchResult,
            1000
        );


        console.log(
            "⚽ Parte 18 cargada: física conectada"
        );

    }


    setTimeout(
        initialize,
        1200
    );

})();
