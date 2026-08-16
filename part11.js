/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 11
   TUTORIAL INICIAL
========================================================= */

(() => {

    "use strict";

    /* =====================================================
       ESTILOS
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `

        #tutorialOverlay {

            position: fixed;

            inset: 0;

            z-index: 20000;

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 20px;

            background:
                linear-gradient(
                    rgba(0,0,0,.78),
                    rgba(0,0,0,.88)
                );

            backdrop-filter:
                blur(8px);

            font-family:
                Arial,
                sans-serif;

        }


        #tutorialBox {

            width:
                min(850px, 95vw);

            max-height:
                90vh;

            overflow-y:
                auto;

            padding:
                28px;

            border:
                1px solid
                rgba(255,255,255,.18);

            border-radius:
                22px;

            background:
                linear-gradient(
                    145deg,
                    #14221a,
                    #07100b
                );

            color:
                white;

            box-shadow:
                0 20px 80px
                rgba(0,0,0,.65);

        }


        #tutorialTitle {

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


        #tutorialSubtitle {

            text-align:
                center;

            color:
                rgba(255,255,255,.7);

            margin-bottom:
                25px;

        }


        .tutorialSection {

            margin-bottom:
                18px;

            padding:
                18px;

            border-radius:
                15px;

            background:
                rgba(255,255,255,.06);

        }


        .tutorialSection h2 {

            margin-top:
                0;

            font-size:
                20px;

        }


        .controlRow {

            display:
                flex;

            align-items:
                center;

            gap:
                14px;

            padding:
                11px 0;

            border-bottom:
                1px solid
                rgba(255,255,255,.08);

        }


        .controlRow:last-child {

            border-bottom:
                none;

        }


        .controlKey {

            min-width:
                95px;

            padding:
                9px 12px;

            text-align:
                center;

            border-radius:
                9px;

            background:
                rgba(255,255,255,.12);

            border:
                1px solid
                rgba(255,255,255,.15);

            font-weight:
                bold;

        }


        .controlDescription {

            color:
                rgba(255,255,255,.85);

        }


        .tutorialModes {

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


        .modeCard {

            padding:
                17px;

            border-radius:
                14px;

            background:
                rgba(255,255,255,.07);

        }


        .modeCard h3 {

            margin-top:
                0;

        }


        .tutorialTip {

            padding:
                14px;

            border-radius:
                12px;

            background:
                rgba(24,185,87,.14);

            border:
                1px solid
                rgba(24,185,87,.3);

            line-height:
                1.5;

        }


        #startTutorialButton {

            display:
                block;

            width:
                100%;

            margin-top:
                20px;

            padding:
                15px;

            border:
                none;

            border-radius:
                13px;

            background:
                linear-gradient(
                    135deg,
                    #19b957,
                    #0c873e
                );

            color:
                white;

            font-size:
                18px;

            font-weight:
                900;

            cursor:
                pointer;

            transition:
                .2s;

        }


        #startTutorialButton:hover {

            transform:
                translateY(-2px);

            filter:
                brightness(1.1);

        }


        @media(max-width:650px) {

            #tutorialBox {

                padding:
                    19px;

            }


            .tutorialModes {

                grid-template-columns:
                    1fr;

            }


            .controlRow {

                align-items:
                    flex-start;

            }

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       CREAR TUTORIAL
    ===================================================== */

    function createTutorial() {

        if (
            document.getElementById(
                "tutorialOverlay"
            )
        ) {

            return;

        }


        const overlay =
            document.createElement("div");


        overlay.id =
            "tutorialOverlay";


        overlay.innerHTML = `

            <div id="tutorialBox">

                <h1 id="tutorialTitle">
                    ⚽ ULTIMATE FOOTBALL
                </h1>

                <div id="tutorialSubtitle">
                    Aprende los controles antes de comenzar
                </div>


                <!-- =====================================
                     PENAL
                ====================================== -->

                <div class="tutorialSection">

                    <h2>
                        🥅 PENAL
                    </h2>

                    <div class="controlRow">

                        <div class="controlKey">
                            🖱️ CLICK IZQUIERDO
                        </div>

                        <div class="controlDescription">
                            Apunta hacia el lugar del arco
                            donde querés patear.
                        </div>

                    </div>


                    <div class="controlRow">

                        <div class="controlKey">
                            🔋 POTENCIA
                        </div>

                        <div class="controlDescription">
                            Mantené presionado el botón
                            de potencia para cargar el tiro.
                            Soltalo cuando tengas la potencia
                            que querés.
                        </div>

                    </div>


                    <div class="controlRow">

                        <div class="controlKey">
                            🌀 EFECTO
                        </div>

                        <div class="controlDescription">
                            Mové el mouse mientras apuntás
                            para intentar darle efecto
                            a la pelota.
                        </div>

                    </div>

                </div>


                <!-- =====================================
                     TIRO LIBRE
                ====================================== -->

                <div class="tutorialSection">

                    <h2>
                        🎯 TIRO LIBRE
                    </h2>

                    <div class="controlRow">

                        <div class="controlKey">
                            🖱️ CLICK
                        </div>

                        <div class="controlDescription">
                            Elegí el punto del arco
                            al que querés dirigir la pelota.
                        </div>

                    </div>


                    <div class="controlRow">

                        <div class="controlKey">
                            🔋 POTENCIA
                        </div>

                        <div class="controlDescription">
                            Elegí cuánta fuerza darle
                            al disparo.
                        </div>

                    </div>


                    <div class="controlRow">

                        <div class="controlKey">
                            🌀 CURVA
                        </div>

                        <div class="controlDescription">
                            Usá el efecto para intentar
                            pasar la barrera y colocar
                            la pelota en el ángulo.
                        </div>

                    </div>

                </div>


                <!-- =====================================
                     TIPOS DE TIRO
                ====================================== -->

                <div class="tutorialSection">

                    <h2>
                        ⚡ TIPOS DE TIRO
                    </h2>


                    <div class="tutorialModes">

                        <div class="modeCard">

                            <h3>
                                ⚽ Normal
                            </h3>

                            <p>
                                Equilibrado entre
                                potencia, precisión
                                y efecto.
                            </p>

                            <strong>
                                Tecla 1
                            </strong>

                        </div>


                        <div class="modeCard">

                            <h3>
                                🎯 Colocado
                            </h3>

                            <p>
                                Menos potencia,
                                pero mayor precisión
                                y efecto.
                            </p>

                            <strong>
                                Tecla 2
                            </strong>

                        </div>


                        <div class="modeCard">

                            <h3>
                                💥 Potente
                            </h3>

                            <p>
                                Mucha velocidad,
                                aunque cuesta más
                                controlar la dirección.
                            </p>

                            <strong>
                                Tecla 3
                            </strong>

                        </div>


                        <div class="modeCard">

                            <h3>
                                🟡 Picadita
                            </h3>

                            <p>
                                Levanta la pelota
                                para intentar superar
                                al arquero.
                            </p>

                            <strong>
                                Tecla 4
                            </strong>

                        </div>

                    </div>

                </div>


                <!-- =====================================
                     CONSEJO
                ====================================== -->

                <div class="tutorialTip">

                    💡 <strong>CONSEJO:</strong>

                    No siempre conviene pegarle
                    con toda la potencia.

                    Para colocar la pelota cerca
                    de un palo, probá un tiro
                    colocado y apuntá con cuidado.

                </div>


                <button
                    id="startTutorialButton">

                    ⚽ ¡ENTENDIDO, EMPEZAR!

                </button>

            </div>

        `;


        document.body.appendChild(
            overlay
        );


        document
            .getElementById(
                "startTutorialButton"
            )
            .addEventListener(
                "click",
                closeTutorial
            );

    }


    /* =====================================================
       CERRAR
    ===================================================== */

    function closeTutorial() {

        const overlay =
            document.getElementById(
                "tutorialOverlay"
            );


        if (!overlay)
            return;


        overlay.style.opacity =
            "0";


        overlay.style.transition =
            "opacity .3s ease";


        setTimeout(
            () => {

                overlay.remove();

            },
            300
        );

    }


    /* =====================================================
       INICIAR
    ===================================================== */

    function initializeTutorial() {

        createTutorial();

    }


    /*
       Esperamos un poco para que
       el resto del juego cargue primero.
    */

    setTimeout(
        initializeTutorial,
        500
    );


})();
