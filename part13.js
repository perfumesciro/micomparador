/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 13
   SISTEMA DE FLUJO:
   MENÚ → MODO → TUTORIAL → JUEGO
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ESTILOS
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `

        #modeTutorial {

            position: fixed;

            inset: 0;

            z-index: 30000;

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 20px;

            background:
                rgba(0,0,0,.88);

            backdrop-filter:
                blur(10px);

            color: white;

            font-family:
                Arial,
                sans-serif;

        }


        #modeTutorialBox {

            width:
                min(760px,95vw);

            max-height:
                90vh;

            overflow-y:
                auto;

            padding:
                28px;

            border-radius:
                22px;

            background:
                linear-gradient(
                    145deg,
                    #132219,
                    #07100a
                );

            border:
                1px solid
                rgba(255,255,255,.15);

            box-shadow:
                0 25px 80px
                rgba(0,0,0,.7);

        }


        #modeTutorialTitle {

            text-align:
                center;

            font-size:
                clamp(
                    28px,
                    5vw,
                    48px
                );

            margin:
                0 0 8px;

        }


        #modeTutorialSubtitle {

            text-align:
                center;

            color:
                rgba(255,255,255,.65);

            margin-bottom:
                25px;

        }


        .modeTutorialControl {

            display:
                flex;

            align-items:
                center;

            gap:
                15px;

            padding:
                14px 0;

            border-bottom:
                1px solid
                rgba(255,255,255,.08);

        }


        .modeTutorialControl:last-child {

            border-bottom:
                none;

        }


        .modeTutorialKey {

            min-width:
                110px;

            padding:
                10px;

            border-radius:
                10px;

            background:
                rgba(255,255,255,.1);

            text-align:
                center;

            font-weight:
                900;

        }


        .modeTutorialText {

            color:
                rgba(255,255,255,.82);

            line-height:
                1.45;

        }


        #tutorialButtons {

            display:
                flex;

            gap:
                12px;

            margin-top:
                25px;

        }


        #tutorialStart,
        #tutorialBack {

            flex:
                1;

            border:
                none;

            padding:
                14px;

            border-radius:
                12px;

            color:
                white;

            font-weight:
                900;

            font-size:
                15px;

            cursor:
                pointer;

        }


        #tutorialStart {

            background:
                linear-gradient(
                    135deg,
                    #1abd5a,
                    #087d38
                );

        }


        #tutorialBack {

            background:
                rgba(255,255,255,.1);

        }


        #tutorialStart:hover,
        #tutorialBack:hover {

            filter:
                brightness(1.12);

            transform:
                translateY(-2px);

        }


        .tutorialTip13 {

            margin-top:
                18px;

            padding:
                14px;

            border-radius:
                12px;

            background:
                rgba(24,185,87,.12);

            border:
                1px solid
                rgba(24,185,87,.3);

            line-height:
                1.5;

        }


        @media(max-width:600px) {

            #modeTutorialBox {

                padding:
                    18px;

            }


            .modeTutorialControl {

                align-items:
                    flex-start;

            }


            #tutorialButtons {

                flex-direction:
                    column;

            }

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       VARIABLES
    ===================================================== */

    let currentMode =
        "Penales";


    /* =====================================================
       DATOS DE TUTORIALES
    ===================================================== */

    const tutorials = {

        "Penales": {

            icon: "🥅",

            title:
                "Tutorial de Penales",

            subtitle:
                "Aprendé a vencer al arquero",

            controls: [

                [
                    "🖱️ CLICK",
                    "Mové el mouse y apuntá hacia el lugar del arco donde querés colocar la pelota."
                ],

                [
                    "🔋 POTENCIA",
                    "Mantené presionado el botón de potencia y soltalo cuando llegues a la fuerza deseada."
                ],

                [
                    "🌀 EFECTO",
                    "Usá el efecto para modificar la trayectoria y alejar la pelota de la posición del arquero."
                ],

                [
                    "1 - 4",
                    "Elegí entre Normal, Colocado, Potente y Picadita."
                ]

            ],

            tip:
                "💡 Para empezar, probá un tiro colocado hacia uno de los palos."

        },


        "Tiros Libres": {

            icon: "🎯",

            title:
                "Tutorial de Tiros Libres",

            subtitle:
                "Superá la barrera y buscá el ángulo",

            controls: [

                [
                    "🖱️ CLICK",
                    "Apuntá con el mouse al lugar del arco donde querés dirigir la pelota."
                ],

                [
                    "🔋 POTENCIA",
                    "Elegí la potencia del disparo. Más potencia significa mayor velocidad."
                ],

                [
                    "🌀 CURVA",
                    "Aplicá efecto para hacer que la pelota cambie su trayectoria durante el vuelo."
                ],

                [
                    "1 - 4",
                    "Elegí el tipo de tiro que querés utilizar."
                ]

            ],

            tip:
                "💡 En un tiro libre, intentá apuntar por encima o alrededor de la barrera."

        },


        "Desafío": {

            icon: "🏆",

            title:
                "Tutorial del Desafío",

            subtitle:
                "Conseguí la mayor cantidad de puntos",

            controls: [

                [
                    "🎯 APUNTAR",
                    "Apuntá con el mouse al lugar que quieras."
                ],

                [
                    "🔋 POTENCIA",
                    "Controlá la fuerza del disparo."
                ],

                [
                    "⚽ TIRO",
                    "Elegí el tipo de tiro que mejor se adapte al objetivo."
                ],

                [
                    "🏆 PUNTOS",
                    "Cuanto más preciso sea tu tiro, mayor será la recompensa."
                ]

            ],

            tip:
                "💡 La precisión es más importante que simplemente pegarle fuerte."

        },


        "Entrenamiento": {

            icon: "🎮",

            title:
                "Tutorial de Entrenamiento",

            subtitle:
                "Practicá sin presión",

            controls: [

                [
                    "🖱️ APUNTAR",
                    "Mové el mouse para elegir la dirección."
                ],

                [
                    "🔋 POTENCIA",
                    "Controlá la potencia del disparo."
                ],

                [
                    "🌀 EFECTO",
                    "Experimentá con diferentes trayectorias."
                ],

                [
                    "1 - 4",
                    "Probá todos los tipos de tiro."
                ]

            ],

            tip:
                "💡 Este modo está pensado para practicar y conocer cómo responde la pelota."

        }

    };


    /* =====================================================
       CREAR TUTORIAL
    ===================================================== */

    function showModeTutorial(
        mode
    ) {

        currentMode =
            mode;


        const data =
            tutorials[mode];


        if (!data)
            return;


        const old =
            document.getElementById(
                "modeTutorial"
            );


        if (old)
            old.remove();


        const overlay =
            document.createElement(
                "div"
            );


        overlay.id =
            "modeTutorial";


        let controlsHTML =
            "";


        data.controls.forEach(
            control => {

                controlsHTML += `

                    <div class="modeTutorialControl">

                        <div class="modeTutorialKey">
                            ${control[0]}
                        </div>

                        <div class="modeTutorialText">
                            ${control[1]}
                        </div>

                    </div>

                `;

            }
        );


        overlay.innerHTML = `

            <div id="modeTutorialBox">

                <h1 id="modeTutorialTitle">

                    ${data.icon}
                    ${data.title}

                </h1>


                <div id="modeTutorialSubtitle">

                    ${data.subtitle}

                </div>


                ${controlsHTML}


                <div class="tutorialTip13">

                    ${data.tip}

                </div>


                <div id="tutorialButtons">

                    <button id="tutorialBack">

                        ← VOLVER AL MENÚ

                    </button>


                    <button id="tutorialStart">

                        ⚽ ¡JUGAR!

                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(
            overlay
        );


        document
            .getElementById(
                "tutorialStart"
            )
            .addEventListener(
                "click",
                () => {

                    closeTutorial();

                    startMode(
                        currentMode
                    );

                }
            );


        document
            .getElementById(
                "tutorialBack"
            )
            .addEventListener(
                "click",
                () => {

                    closeTutorial();

                    showMainMenu();

                }
            );

    }


    /* =====================================================
       CERRAR TUTORIAL
    ===================================================== */

    function closeTutorial() {

        const tutorial =
            document.getElementById(
                "modeTutorial"
            );


        if (!tutorial)
            return;


        tutorial.style.opacity =
            "0";


        tutorial.style.transition =
            "opacity .25s ease";


        setTimeout(
            () => {

                tutorial.remove();

            },
            250
        );

    }


    /* =====================================================
       MOSTRAR MENÚ
    ===================================================== */

    function showMainMenu() {

        const menu =
            document.getElementById(
                "mainMenu"
            );


        if (menu) {

            menu.style.display =
                "flex";

            menu.style.opacity =
                "1";

            return;

        }


        /*
           Si part12.js ya tiene
           la función interna,
           recreamos el menú
           mediante el botón
           disponible.
        */

        if (
            typeof window.createMainMenu ===
            "function"
        ) {

            window.createMainMenu();

        }

    }


    /* =====================================================
       INICIAR MODO
    ===================================================== */

    function startMode(
        mode
    ) {

        /*
           Penales:
           dejamos el juego actual.
        */

        if (
            mode ===
            "Penales"
        ) {

            enablePenaltyMode();

            return;

        }


        /*
           Tiros libres:
           si existe el sistema,
           lo iniciamos.
        */

        if (
            mode ===
            "Tiros Libres"
        ) {

            if (
                typeof window.startFreeKickMode ===
                "function"
            ) {

                window.startFreeKickMode();

            }
            else {

                showTemporaryMessage(
                    "🎯 Modo tiros libres preparado"
                );

            }

            return;

        }


        if (
            mode ===
            "Desafío"
        ) {

            if (
                typeof window.startChallengeMode ===
                "function"
            ) {

                window.startChallengeMode();

            }
            else {

                showTemporaryMessage(
                    "🏆 Modo desafío preparado"
                );

            }

            return;

        }


        if (
            mode ===
            "Entrenamiento"
        ) {

            if (
                typeof window.startTrainingMode ===
                "function"
            ) {

                window.startTrainingMode();

            }
            else {

                showTemporaryMessage(
                    "🎮 Entrenamiento preparado"
                );

            }

        }

    }


    /* =====================================================
       PENAL
    ===================================================== */

    function enablePenaltyMode() {

        /*
           El juego ya está preparado
           para comenzar el penal.
        */

        const gameElement =
            document.getElementById(
                "game"
            );


        if (gameElement) {

            gameElement.style.display =
                "";

        }


        /*
           Si existe un botón de iniciar,
           intentamos utilizarlo.
        */

        const possibleButtons = [

            "startButton",

            "startGame",

            "playButton"

        ];


        for (
            const id of possibleButtons
        ) {

            const button =
                document.getElementById(id);


            if (button) {

                button.click();

                break;

            }

        }

    }


    /* =====================================================
       MENSAJE TEMPORAL
    ===================================================== */

    function showTemporaryMessage(
        text
    ) {

        const message =
            document.createElement(
                "div"
            );


        message.style.position =
            "fixed";


        message.style.left =
            "50%";


        message.style.top =
            "50%";


        message.style.transform =
            "translate(-50%,-50%)";


        message.style.zIndex =
            "40000";


        message.style.padding =
            "18px 25px";


        message.style.borderRadius =
            "14px";


        message.style.background =
            "rgba(0,0,0,.9)";


        message.style.color =
            "white";


        message.style.fontWeight =
            "bold";


        message.textContent =
            text;


        document.body.appendChild(
            message
        );


        setTimeout(
            () => {

                message.remove();

            },
            1400
        );

    }


    /* =====================================================
       CONECTAR CON EL MENÚ
    ===================================================== */

    function connectMenu() {

        document.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        ".menuButton"
                    );


                if (!button)
                    return;


                const mode =
                    button.dataset.mode;


                if (!mode)
                    return;


                /*
                   Esperar a que Parte 12
                   termine su animación.
                */

                setTimeout(
                    () => {

                        const menu =
                            document.getElementById(
                                "mainMenu"
                            );


                        if (menu) {

                            menu.style.display =
                                "none";

                        }


                        showModeTutorial(
                            mode
                        );

                    },
                    650
                );

            }
        );

    }


    /* =====================================================
       DESACTIVAR TUTORIAL ANTIGUO
    ===================================================== */

    function disableOldTutorial() {

        const oldTutorial =
            document.getElementById(
                "tutorialOverlay"
            );


        if (
            oldTutorial
        ) {

            oldTutorial.remove();

        }

    }


    /* =====================================================
       INICIO
    ===================================================== */

    function initialize() {

        /*
           Eliminamos el tutorial
           automático de la Parte 11
           para que ahora aparezca
           según el modo elegido.
        */

        disableOldTutorial();


        connectMenu();

    }


    setTimeout(
        initialize,
        1200
    );


})();
