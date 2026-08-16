/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 12
   MENÚ PRINCIPAL
========================================================= */

(() => {

    "use strict";

    /* =====================================================
       ESTILOS
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `

        #mainMenu {

            position: fixed;

            inset: 0;

            z-index: 15000;

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 20px;

            background:

                radial-gradient(
                    circle at 50% 30%,
                    rgba(27,185,87,.22),
                    transparent 40%
                ),

                linear-gradient(
                    135deg,
                    #07130b,
                    #0d2416
                );

            font-family:
                Arial,
                sans-serif;

            color: white;

        }


        #mainMenuContent {

            width:
                min(900px, 95vw);

            text-align:
                center;

        }


        #gameLogo {

            font-size:
                clamp(
                    40px,
                    8vw,
                    82px
                );

            font-weight:
                1000;

            letter-spacing:
                -3px;

            margin:
                0;

            text-shadow:
                0 8px 30px
                rgba(0,0,0,.7);

            animation:
                logoIntro
                .8s ease;

        }


        #gameSubtitle {

            margin:
                5px 0 35px;

            color:
                rgba(255,255,255,.65);

            font-size:
                15px;

        }


        #menuButtons {

            display:
                grid;

            grid-template-columns:
                repeat(
                    2,
                    minmax(0,1fr)
                );

            gap:
                15px;

        }


        .menuButton {

            position:
                relative;

            min-height:
                105px;

            padding:
                18px;

            border:
                1px solid
                rgba(255,255,255,.12);

            border-radius:
                18px;

            background:
                rgba(255,255,255,.06);

            color:
                white;

            cursor:
                pointer;

            text-align:
                left;

            transition:
                .25s;

            overflow:
                hidden;

        }


        .menuButton::after {

            content:
                "";

            position:
                absolute;

            width:
                100px;

            height:
                100px;

            right:
                -40px;

            bottom:
                -40px;

            border-radius:
                50%;

            background:
                rgba(255,255,255,.05);

        }


        .menuButton:hover {

            transform:
                translateY(-4px);

            background:
                rgba(255,255,255,.1);

            border-color:
                rgba(255,255,255,.3);

            box-shadow:
                0 12px 35px
                rgba(0,0,0,.25);

        }


        .menuIcon {

            font-size:
                30px;

            display:
                block;

            margin-bottom:
                7px;

        }


        .menuTitle {

            display:
                block;

            font-size:
                18px;

            font-weight:
                900;

        }


        .menuDescription {

            display:
                block;

            margin-top:
                5px;

            color:
                rgba(255,255,255,.6);

            font-size:
                12px;

        }


        #selectedMode {

            margin-top:
                20px;

            color:
                rgba(255,255,255,.6);

            font-size:
                13px;

        }


        #selectedMode strong {

            color:
                white;

        }


        #menuFooter {

            margin-top:
                28px;

            color:
                rgba(255,255,255,.35);

            font-size:
                11px;

        }


        #modeMessage {

            position:
                fixed;

            left:
                50%;

            top:
                50%;

            transform:
                translate(
                    -50%,
                    -50%
                );

            z-index:
                16000;

            padding:
                25px 35px;

            border-radius:
                16px;

            background:
                rgba(0,0,0,.9);

            color:
                white;

            font-size:
                20px;

            font-weight:
                bold;

            opacity:
                0;

            pointer-events:
                none;

            transition:
                .25s;

        }


        #modeMessage.show {

            opacity:
                1;

        }


        @keyframes logoIntro {

            from {

                opacity:
                    0;

                transform:
                    translateY(-30px)
                    scale(.9);

            }

            to {

                opacity:
                    1;

                transform:
                    translateY(0)
                    scale(1);

            }

        }


        @media(max-width:650px) {

            #menuButtons {

                grid-template-columns:
                    1fr;

            }


            .menuButton {

                min-height:
                    80px;

            }


            #gameLogo {

                letter-spacing:
                    -2px;

            }

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       ESTADO
    ===================================================== */

    let selectedMode =
        "Penales";


    /* =====================================================
       CREAR MENÚ
    ===================================================== */

    function createMenu() {

        if (
            document.getElementById(
                "mainMenu"
            )
        )
            return;


        const menu =
            document.createElement(
                "div"
            );


        menu.id =
            "mainMenu";


        menu.innerHTML = `

            <div id="mainMenuContent">

                <h1 id="gameLogo">
                    ⚽ ULTIMATE FOOTBALL
                </h1>

                <div id="gameSubtitle">
                    La experiencia de penales y tiros libres
                </div>


                <div id="menuButtons">

                    <button
                        class="menuButton"
                        data-mode="Penales">

                        <span class="menuIcon">
                            🥅
                        </span>

                        <span class="menuTitle">
                            Penales
                        </span>

                        <span class="menuDescription">
                            Enfrentate al arquero
                            desde los doce pasos.
                        </span>

                    </button>


                    <button
                        class="menuButton"
                        data-mode="Tiros Libres">

                        <span class="menuIcon">
                            🎯
                        </span>

                        <span class="menuTitle">
                            Tiros libres
                        </span>

                        <span class="menuDescription">
                            Superá la barrera y
                            buscá el ángulo.
                        </span>

                    </button>


                    <button
                        class="menuButton"
                        data-mode="Desafío">

                        <span class="menuIcon">
                            🏆
                        </span>

                        <span class="menuTitle">
                            Desafío
                        </span>

                        <span class="menuDescription">
                            Intentá conseguir
                            la mayor puntuación.
                        </span>

                    </button>


                    <button
                        class="menuButton"
                        data-mode="Entrenamiento">

                        <span class="menuIcon">
                            🎮
                        </span>

                        <span class="menuTitle">
                            Entrenamiento
                        </span>

                        <span class="menuDescription">
                            Practicá sin presión
                            y mejorá tus tiros.
                        </span>

                    </button>

                </div>


                <div id="selectedMode">

                    Modo seleccionado:
                    <strong>
                        Penales
                    </strong>

                </div>


                <div id="menuFooter">

                    Ultimate Football
                    • Parte 12

                </div>

            </div>

        `;


        document.body.appendChild(
            menu
        );


        setupButtons();

    }


    /* =====================================================
       BOTONES
    ===================================================== */

    function setupButtons() {

        document
            .querySelectorAll(
                ".menuButton"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const mode =
                            button.dataset.mode;


                        selectedMode =
                            mode;


                        updateSelectedMode(
                            mode
                        );


                        showModeMessage(
                            mode
                        );


                        setTimeout(
                            () => {

                                startSelectedMode(
                                    mode
                                );

                            },
                            550
                        );

                    }
                );

            });

    }


    /* =====================================================
       ACTUALIZAR MODO
    ===================================================== */

    function updateSelectedMode(
        mode
    ) {

        const element =
            document.querySelector(
                "#selectedMode strong"
            );


        if (element) {

            element.textContent =
                mode;

        }

    }


    /* =====================================================
       MENSAJE
    ===================================================== */

    function showModeMessage(
        mode
    ) {

        let message =
            document.getElementById(
                "modeMessage"
            );


        if (!message) {

            message =
                document.createElement(
                    "div"
                );

            message.id =
                "modeMessage";

            document.body.appendChild(
                message
            );

        }


        message.textContent =
            `⚽ ${mode}`;


        message.classList.add(
            "show"
        );


        setTimeout(
            () => {

                message.classList.remove(
                    "show"
                );

            },
            500
        );

    }


    /* =====================================================
       INICIAR MODO
    ===================================================== */

    function startSelectedMode(
        mode
    ) {

        const menu =
            document.getElementById(
                "mainMenu"
            );


        /*
           En esta primera versión
           dejamos preparado el sistema
           para conectar cada modo
           con su pantalla correspondiente.
        */


        if (
            mode === "Penales"
        ) {

            closeMenu();


            return;

        }


        if (
            mode === "Tiros Libres"
        ) {

            closeMenu();


            /*
               Si más adelante existe
               una función específica
               para tiros libres,
               la utilizaremos.
            */

            if (
                typeof startFreeKickMode ===
                "function"
            ) {

                startFreeKickMode();

            }


            return;

        }


        if (
            mode === "Desafío"
        ) {

            closeMenu();


            if (
                typeof startChallengeMode ===
                "function"
            ) {

                startChallengeMode();

            }


            return;

        }


        if (
            mode === "Entrenamiento"
        ) {

            closeMenu();


            if (
                typeof startTrainingMode ===
                "function"
            ) {

                startTrainingMode();

            }


            return;

        }

    }


    /* =====================================================
       CERRAR
    ===================================================== */

    function closeMenu() {

        const menu =
            document.getElementById(
                "mainMenu"
            );


        if (!menu)
            return;


        menu.style.transition =
            "opacity .3s ease";


        menu.style.opacity =
            "0";


        setTimeout(
            () => {

                menu.remove();

            },
            300
        );

    }


    /* =====================================================
       INICIAR
    ===================================================== */

    function initialize() {

        createMenu();

    }


    setTimeout(
        initialize,
        900
    );


})();
