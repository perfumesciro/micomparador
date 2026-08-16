/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 27
   MENÚ PRINCIPAL DE MODOS
========================================================= */

(() => {

    "use strict";

    const style = document.createElement("style");

    style.textContent = `

        #footballMenu27 {

            position: fixed;
            inset: 0;
            z-index: 14000;

            display: none;

            align-items: center;
            justify-content: center;

            overflow: hidden;

            font-family: Arial, sans-serif;

            background:
                linear-gradient(
                    rgba(0,0,0,.35),
                    rgba(0,0,0,.65)
                ),
                linear-gradient(
                    135deg,
                    #08752e,
                    #0e9c43,
                    #063e20
                );
        }

        #footballMenu27.active {
            display: flex;
        }

        #menuField27 {

            position: absolute;
            inset: 0;
            opacity: .25;

            background:
                repeating-linear-gradient(
                    90deg,
                    transparent 0 90px,
                    rgba(255,255,255,.15)
                    90px 92px
                ),

                repeating-linear-gradient(
                    0deg,
                    transparent 0 90px,
                    rgba(255,255,255,.15)
                    90px 92px
                );
        }

        #menuPanel27 {

            position: relative;
            z-index: 2;

            width: min(850px, 92vw);

            padding: 35px;

            border-radius: 24px;

            background:
                rgba(10,25,18,.92);

            border:
                1px solid
                rgba(255,255,255,.15);

            box-shadow:
                0 25px 80px
                rgba(0,0,0,.55);

            text-align: center;

            backdrop-filter:
                blur(12px);
        }

        #menuTitle27 {

            margin: 0;

            color: white;

            font-size:
                clamp(
                    35px,
                    7vw,
                    70px
                );

            font-weight: 1000;

            letter-spacing: 2px;

            text-shadow:
                0 5px 20px
                rgba(0,0,0,.7);
        }

        #menuSubtitle27 {

            color:
                rgba(255,255,255,.75);

            margin:
                8px 0 30px;

            font-size: 16px;
        }

        #menuButtons27 {

            display: grid;

            grid-template-columns:
                repeat(2, 1fr);

            gap: 18px;
        }

        .menuButton27 {

            min-height: 150px;

            border: none;

            border-radius: 18px;

            color: white;

            cursor: pointer;

            padding: 22px;

            transition:
                transform .2s,
                box-shadow .2s;

            box-shadow:
                0 10px 25px
                rgba(0,0,0,.3);
        }

        .menuButton27:hover {

            transform:
                translateY(-5px)
                scale(1.02);

            box-shadow:
                0 18px 35px
                rgba(0,0,0,.4);
        }

        .menuButton27:active {

            transform:
                scale(.98);
        }

        #penaltyButton27 {

            background:
                linear-gradient(
                    135deg,
                    #087f36,
                    #11b653
                );
        }

        #freeKickButton27 {

            background:
                linear-gradient(
                    135deg,
                    #075ca8,
                    #118be6
                );
        }

        #tutorialButton27 {

            background:
                linear-gradient(
                    135deg,
                    #6c42b8,
                    #a15ce6
                );
        }

        #statsButton27 {

            background:
                linear-gradient(
                    135deg,
                    #bd7411,
                    #edaa24
                );
        }

        .menuIcon27 {

            display: block;

            font-size: 45px;

            margin-bottom: 10px;
        }

        .menuButtonTitle27 {

            display: block;

            font-size: 22px;

            font-weight: 1000;
        }

        .menuButtonText27 {

            display: block;

            margin-top: 7px;

            font-size: 13px;

            opacity: .8;
        }

        /* =========================
           TUTORIAL
        ========================= */

        #tutorial27 {

            position: fixed;

            inset: 0;

            z-index: 15000;

            display: none;

            align-items: center;

            justify-content: center;

            padding: 20px;

            background:
                rgba(0,0,0,.78);
        }

        #tutorial27.active {

            display: flex;
        }

        #tutorialPanel27 {

            width:
                min(700px, 94vw);

            max-height:
                85vh;

            overflow-y:
                auto;

            background:
                #101815;

            border-radius:
                22px;

            padding:
                30px;

            color: white;

            box-shadow:
                0 25px 80px
                rgba(0,0,0,.7);
        }

        #tutorialPanel27 h2 {

            margin-top: 0;

            text-align: center;

            font-size: 32px;
        }

        .tutorialItem27 {

            display: flex;

            align-items: center;

            gap: 15px;

            padding: 15px;

            margin:
                10px 0;

            border-radius: 13px;

            background:
                rgba(255,255,255,.07);
        }

        .tutorialIcon27 {

            min-width: 48px;

            height: 48px;

            display: flex;

            align-items: center;

            justify-content: center;

            border-radius: 12px;

            background:
                rgba(255,255,255,.1);

            font-size: 25px;
        }

        .tutorialText27 strong {

            display: block;

            font-size: 17px;
        }

        .tutorialText27 span {

            display: block;

            margin-top: 4px;

            color:
                rgba(255,255,255,.65);

            font-size: 13px;
        }

        #closeTutorial27 {

            display: block;

            margin:
                25px auto 0;

            padding:
                12px 30px;

            border: none;

            border-radius: 11px;

            background:
                #159447;

            color: white;

            font-weight: 900;

            cursor: pointer;
        }

        /* =========================
           ESTADÍSTICAS
        ========================= */

        #stats27 {

            position: fixed;

            inset: 0;

            z-index: 15000;

            display: none;

            align-items: center;

            justify-content: center;

            padding: 20px;

            background:
                rgba(0,0,0,.8);
        }

        #stats27.active {

            display: flex;
        }

        #statsPanel27 {

            width:
                min(500px, 94vw);

            background:
                #111;

            color: white;

            border-radius: 20px;

            padding: 30px;

            text-align: center;
        }

        #statsGrid27 {

            display: grid;

            grid-template-columns:
                repeat(2, 1fr);

            gap: 12px;

            margin-top: 20px;
        }

        .statCard27 {

            padding: 18px;

            border-radius: 13px;

            background:
                rgba(255,255,255,.08);
        }

        .statNumber27 {

            font-size: 30px;

            font-weight: 1000;
        }

        .statLabel27 {

            font-size: 12px;

            opacity: .7;
        }

        .closeModal27 {

            margin-top: 20px;

            padding:
                11px 25px;

            border: none;

            border-radius: 10px;

            background:
                #168d43;

            color: white;

            font-weight: 900;

            cursor: pointer;
        }

        @media(max-width:650px) {

            #menuButtons27 {

                grid-template-columns: 1fr;
            }

            #menuPanel27 {

                padding: 22px;
            }

            .menuButton27 {

                min-height: 110px;
            }

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       CREAR MENÚ
    ===================================================== */

    function createMenu27() {

        if (
            document.getElementById(
                "footballMenu27"
            )
        )
            return;


        const menu =
            document.createElement("div");

        menu.id =
            "footballMenu27";


        menu.innerHTML = `

            <div id="menuField27"></div>

            <div id="menuPanel27">

                <h1 id="menuTitle27">
                    ⚽ ULTIMATE FOOTBALL
                </h1>

                <div id="menuSubtitle27">
                    Elegí cómo querés jugar
                </div>

                <div id="menuButtons27">

                    <button
                        class="menuButton27"
                        id="penaltyButton27"
                    >

                        <span
                            class="menuIcon27">
                            🥅
                        </span>

                        <span
                            class="menuButtonTitle27">
                            PENALES
                        </span>

                        <span
                            class="menuButtonText27">
                            Apuntá, elegí potencia
                            y vencé al arquero
                        </span>

                    </button>


                    <button
                        class="menuButton27"
                        id="freeKickButton27"
                    >

                        <span
                            class="menuIcon27">
                            🌀
                        </span>

                        <span
                            class="menuButtonTitle27">
                            TIROS LIBRES
                        </span>

                        <span
                            class="menuButtonText27">
                            Superá la barrera
                            con efecto
                        </span>

                    </button>


                    <button
                        class="menuButton27"
                        id="tutorialButton27"
                    >

                        <span
                            class="menuIcon27">
                            🎮
                        </span>

                        <span
                            class="menuButtonTitle27">
                            TUTORIAL
                        </span>

                        <span
                            class="menuButtonText27">
                            Aprendé todos
                            los controles
                        </span>

                    </button>


                    <button
                        class="menuButton27"
                        id="statsButton27"
                    >

                        <span
                            class="menuIcon27">
                            📊
                        </span>

                        <span
                            class="menuButtonTitle27">
                            ESTADÍSTICAS
                        </span>

                        <span
                            class="menuButtonText27">
                            Mirá tu rendimiento
                        </span>

                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(menu);


        createTutorial27();

        createStats27();

        connectMenu27();

    }


    /* =====================================================
       TUTORIAL
    ===================================================== */

    function createTutorial27() {

        const tutorial =
            document.createElement("div");

        tutorial.id =
            "tutorial27";


        tutorial.innerHTML = `

            <div id="tutorialPanel27">

                <h2>
                    🎮 TUTORIAL
                </h2>


                <div class="tutorialItem27">

                    <div class="tutorialIcon27">
                        🖱️
                    </div>

                    <div class="tutorialText27">

                        <strong>
                            Apuntar
                        </strong>

                        <span>
                            Mové el mouse para
                            elegir dónde querés
                            mandar la pelota.
                        </span>

                    </div>

                </div>


                <div class="tutorialItem27">

                    <div class="tutorialIcon27">
                        ⚡
                    </div>

                    <div class="tutorialText27">

                        <strong>
                            Potencia
                        </strong>

                        <span>
                            La barra de potencia
                            determina la fuerza
                            del disparo.
                        </span>

                    </div>

                </div>


                <div class="tutorialItem27">

                    <div class="tutorialIcon27">
                        ⚽
                    </div>

                    <div class="tutorialText27">

                        <strong>
                            Patear
                        </strong>

                        <span>
                            Presioná el botón
                            PATEAR o la tecla
                            ESPACIO.
                        </span>

                    </div>

                </div>


                <div class="tutorialItem27">

                    <div class="tutorialIcon27">
                        🌀
                    </div>

                    <div class="tutorialText27">

                        <strong>
                            Efecto
                        </strong>

                        <span>
                            En los tiros libres
                            podés usar el control
                            de efecto para curvar
                            la pelota.
                        </span>

                    </div>

                </div>


                <div class="tutorialItem27">

                    <div class="tutorialIcon27">
                        🧱
                    </div>

                    <div class="tutorialText27">

                        <strong>
                            Barrera
                        </strong>

                        <span>
                            En los tiros libres
                            tenés que superar
                            la barrera.
                        </span>

                    </div>

                </div>


                <div class="tutorialItem27">

                    <div class="tutorialIcon27">
                        🧤
                    </div>

                    <div class="tutorialText27">

                        <strong>
                            Arquero
                        </strong>

                        <span>
                            El arquero intentará
                            adivinar dónde
                            pateás.
                        </span>

                    </div>

                </div>


                <button
                    id="closeTutorial27">

                    ✓ ENTENDIDO

                </button>

            </div>

        `;


        document.body.appendChild(tutorial);


        document
            .getElementById(
                "closeTutorial27"
            )
            .addEventListener(
                "click",
                () => {

                    tutorial
                        .classList
                        .remove(
                            "active"
                        );

                }
            );

    }


    /* =====================================================
       ESTADÍSTICAS
    ===================================================== */

    function createStats27() {

        const stats =
            document.createElement("div");

        stats.id =
            "stats27";


        stats.innerHTML = `

            <div id="statsPanel27">

                <h2>
                    📊 ESTADÍSTICAS
                </h2>

                <div id="statsGrid27">

                    <div class="statCard27">

                        <div
                            class="statNumber27"
                            id="statsGoals27">
                            0
                        </div>

                        <div
                            class="statLabel27">
                            GOLES
                        </div>

                    </div>


                    <div class="statCard27">

                        <div
                            class="statNumber27"
                            id="statsShots27">
                            0
                        </div>

                        <div
                            class="statLabel27">
                            TIROS
                        </div>

                    </div>


                    <div class="statCard27">

                        <div
                            class="statNumber27"
                            id="statsSaves27">
                            0
                        </div>

                        <div
                            class="statLabel27">
                            ATAJADAS
                        </div>

                    </div>


                    <div class="statCard27">

                        <div
                            class="statNumber27"
                            id="statsAccuracy27">
                            0%
                        </div>

                        <div
                            class="statLabel27">
                            PRECISIÓN
                        </div>

                    </div>

                </div>


                <button
                    class="closeModal27"
                    id="closeStats27">

                    CERRAR

                </button>

            </div>

        `;


        document.body.appendChild(stats);


        document
            .getElementById(
                "closeStats27"
            )
            .addEventListener(
                "click",
                () => {

                    stats
                        .classList
                        .remove(
                            "active"
                        );

                }
            );

    }


    /* =====================================================
       ESTADÍSTICAS
    ===================================================== */

    function updateStats27() {

        let penalty = null;

        let freeKick = null;


        if (
            typeof window
                .getPenaltyStats25
                ===
                "function"
        ) {

            penalty =
                window.getPenaltyStats25();

        }


        if (
            typeof window
                .getFreeKickStats26
                ===
                "function"
        ) {

            freeKick =
                window.getFreeKickStats26();

        }


        const goals =
            (penalty?.goals || 0) +
            (freeKick?.goals || 0);


        const shots =
            (penalty?.shots || 0) +
            (freeKick?.shots || 0);


        const saves =
            (penalty?.saves || 0) +
            (freeKick?.saves || 0);


        const accuracy =
            shots > 0

                ? Math.round(
                    goals /
                    shots *
                    100
                )

                : 0;


        document
            .getElementById(
                "statsGoals27"
            )
            .textContent =
            goals;


        document
            .getElementById(
                "statsShots27"
            )
            .textContent =
            shots;


        document
            .getElementById(
                "statsSaves27"
            )
            .textContent =
            saves;


        document
            .getElementById(
                "statsAccuracy27"
            )
            .textContent =
            accuracy + "%";

    }


    /* =====================================================
       BOTONES
    ===================================================== */

    function connectMenu27() {

        document
            .getElementById(
                "penaltyButton27"
            )
            .addEventListener(
                "click",
                () => {

                    if (
                        typeof window
                            .startPenaltyMode25
                            ===
                            "function"
                    ) {

                        window
                            .startPenaltyMode25();

                    }

                }
            );


        document
            .getElementById(
                "freeKickButton27"
            )
            .addEventListener(
                "click",
                () => {

                    if (
                        typeof window
                            .startFreeKickMode26
                            ===
                            "function"
                    ) {

                        window
                            .startFreeKickMode26();

                    }

                }
            );


        document
            .getElementById(
                "tutorialButton27"
            )
            .addEventListener(
                "click",
                () => {

                    document
                        .getElementById(
                            "tutorial27"
                        )
                        .classList
                        .add(
                            "active"
                        );

                }
            );


        document
            .getElementById(
                "statsButton27"
            )
            .addEventListener(
                "click",
                () => {

                    updateStats27();

                    document
                        .getElementById(
                            "stats27"
                        )
                        .classList
                        .add(
                            "active"
                        );

                }
            );

    }


    /* =====================================================
       ABRIR MENÚ
    ===================================================== */

    window.openFootballMenu27 =
        function() {

            createMenu27();

            document
                .getElementById(
                    "footballMenu27"
                )
                .classList
                .add(
                    "active"
                );

        };


    /* =====================================================
       CERRAR MENÚ
    ===================================================== */

    window.closeFootballMenu27 =
        function() {

            const menu =
                document
                    .getElementById(
                        "footballMenu27"
                    );


            if (menu) {

                menu.classList
                    .remove(
                        "active"
                    );

            }

        };


    /* =====================================================
       INICIAR
    ===================================================== */

    createMenu27();


    console.log(
        "⚽ Parte 27 cargada correctamente"
    );

})();
