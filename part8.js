/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 8
   MEJORA VISUAL DEL ESTADIO
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ESTILOS VISUALES
    ===================================================== */

    const style = document.createElement("style");

    style.id = "part8VisualStyles";

    style.textContent = `

    /* ================================================
       ESTADIO
    ================================================ */

    #stadiumEnvironment {

        background:
        radial-gradient(
            ellipse at 50% 15%,
            #66727a 0%,
            #30383e 25%,
            #11171b 65%,
            #050709 100%
        );

    }


    /* ================================================
       LUCES
    ================================================ */

    .stadium-lights div {

        width: 120px !important;
        height: 30px !important;

        background:
        linear-gradient(
            white,
            #dff4ff
        ) !important;

        box-shadow:
        0 0 15px white,
        0 0 35px rgba(255,255,255,.8),
        0 0 80px rgba(220,240,255,.45) !important;

    }


    /* ================================================
       PÚBLICO
    ================================================ */

    .crowd {

        background:

        radial-gradient(
            circle,
            #c7c7c7 0 2px,
            transparent 3px
        ),

        radial-gradient(
            circle,
            #666 0 2px,
            transparent 3px
        ),

        #20262b !important;

        background-size:
            13px 13px,
            17px 17px,
            auto !important;

        box-shadow:
            inset 0 -15px 20px
            rgba(0,0,0,.65);

    }


    /* ================================================
       CAMPO
    ================================================ */

    #field {

        overflow: visible !important;

        background:

        repeating-linear-gradient(
            90deg,
            rgba(255,255,255,.035) 0,
            rgba(255,255,255,.035) 50px,
            transparent 50px,
            transparent 100px
        ),

        linear-gradient(
            180deg,
            #218b3c,
            #166f30
        ) !important;

        box-shadow:

            inset 0 0 80px
            rgba(0,0,0,.28),

            0 20px 70px
            rgba(0,0,0,.5);

    }


    /* ================================================
       SOMBRA DEL JUGADOR
    ================================================ */

    .player-shadow {

        position: absolute;

        width: 70px;
        height: 20px;

        border-radius: 50%;

        background:
            rgba(0,0,0,.35);

        filter:
            blur(5px);

        pointer-events:
            none;

        z-index:
            5;

        transform:
            translateX(-50%);

    }


    /* ================================================
       SOMBRA ARQUERO
    ================================================ */

    .keeper-shadow {

        position: absolute;

        width: 80px;
        height: 22px;

        border-radius: 50%;

        background:
            rgba(0,0,0,.4);

        filter:
            blur(5px);

        z-index:
            5;

        pointer-events:
            none;

        transform:
            translateX(-50%);

    }


    /* ================================================
       BALÓN
    ================================================ */

    #ball {

        border-radius: 50% !important;

        background:

        radial-gradient(
            circle at 32% 28%,
            white 0%,
            #eeeeee 35%,
            #bbbbbb 70%,
            #777 100%
        ) !important;

        border:
            2px solid
            rgba(0,0,0,.3);

        box-shadow:

            inset -5px -6px 8px
            rgba(0,0,0,.25),

            0 5px 12px
            rgba(0,0,0,.35);

    }


    /* ================================================
       JUGADOR
    ================================================ */

    #player {

        border-radius:
            12px 12px 8px 8px !important;

        box-shadow:

            inset 5px 0 5px
            rgba(255,255,255,.25),

            inset -6px 0 7px
            rgba(0,0,0,.25),

            0 8px 12px
            rgba(0,0,0,.35) !important;

        transition:
            transform .18s ease;

    }


    /* ================================================
       CABEZA DEL JUGADOR
    ================================================ */

    #player::before {

        content: "";

        position: absolute;

        width: 38px;
        height: 38px;

        left: 50%;
        top: -34px;

        transform:
            translateX(-50%);

        border-radius: 50%;

        background:
            radial-gradient(
                circle at 35% 30%,
                #f5c6a5,
                #c98d68
            );

        border:
            2px solid
            rgba(0,0,0,.25);

        box-shadow:
            0 3px 5px
            rgba(0,0,0,.3);

    }


    /* ================================================
       PELO
    ================================================ */

    #player::after {

        content: "";

        position: absolute;

        width: 40px;
        height: 17px;

        left: 50%;
        top: -37px;

        transform:
            translateX(-50%);

        border-radius:
            50% 50% 30% 30%;

        background:
            #171717;

    }


    /* ================================================
       ARQUERO
    ================================================ */

    #keeper {

        border-radius:
            12px 12px 9px 9px !important;

        box-shadow:

            inset 5px 0 6px
            rgba(255,255,255,.25),

            inset -6px 0 7px
            rgba(0,0,0,.3),

            0 8px 14px
            rgba(0,0,0,.4);

    }


    /* ================================================
       GUANTES
    ================================================ */

    #keeper::before,
    #keeper::after {

        content: "";

        position: absolute;

        width: 17px;
        height: 28px;

        top: 35%;

        border-radius:
            10px;

        background:
            #f4f4f4;

        box-shadow:
            0 3px 5px
            rgba(0,0,0,.3);

    }


    #keeper::before {

        left: -14px;

    }


    #keeper::after {

        right: -14px;

    }


    /* ================================================
       ARCO
    ================================================ */

    .real-goal {

        position: absolute;

        left: 50%;

        top: 4%;

        width: 52%;

        height: 27%;

        transform:
            translateX(-50%);

        z-index: 3;

        pointer-events:
            none;

    }


    .goal-post {

        position: absolute;

        background:
            linear-gradient(
                90deg,
                #ddd,
                white,
                #aaa
            );

        box-shadow:
            0 2px 5px
            rgba(0,0,0,.4);

    }


    .goal-left {

        left: 0;

        top: 0;

        width: 8px;

        height: 100%;

    }


    .goal-right {

        right: 0;

        top: 0;

        width: 8px;

        height: 100%;

    }


    .goal-crossbar {

        left: 0;

        top: 0;

        width: 100%;

        height: 8px;

    }


    /* ================================================
       RED
    ================================================ */

    .goal-net {

        position: absolute;

        inset: 7px;

        opacity: .65;

        background:

        repeating-linear-gradient(
            0deg,
            transparent 0 10px,
            rgba(255,255,255,.65) 10px 11px
        ),

        repeating-linear-gradient(
            90deg,
            transparent 0 10px,
            rgba(255,255,255,.65) 10px 11px
        );

        transform-origin:
            center top;

        transition:
            transform .35s ease;

    }


    /* ================================================
       BARRERA
    ================================================ */

    .wall-player {

        position: relative;

        width: 32px !important;
        height: 60px !important;

        border-radius:
            8px 8px 4px 4px !important;

        box-shadow:
            inset 4px 0 4px
            rgba(255,255,255,.2),

            inset -4px 0 4px
            rgba(0,0,0,.25),

            0 5px 8px
            rgba(0,0,0,.35);

        transition:
            transform .35s ease;

    }


    .wall-player::before {

        content: "";

        position: absolute;

        width: 22px;
        height: 22px;

        left: 50%;
        top: -20px;

        transform:
            translateX(-50%);

        border-radius: 50%;

        background:
            #d09a72;

    }


    /* ================================================
       EFECTO DE PROFUNDIDAD
    ================================================ */

    #field::after {

        content: "";

        position: absolute;

        inset: 0;

        pointer-events:
            none;

        background:

        radial-gradient(
            ellipse at center,
            transparent 40%,
            rgba(0,0,0,.25) 100%
        );

        z-index:
            50;

    }


    /* ================================================
       MARCADOR
    ================================================ */

    #broadcastScore {

        backdrop-filter:
            blur(10px);

        border:
            1px solid
            rgba(255,255,255,.15);

        animation:
            scoreAppear .5s ease;

    }


    @keyframes scoreAppear {

        from {

            opacity: 0;

            transform:
                translateX(-50%)
                translateY(-15px);

        }

        to {

            opacity: 1;

            transform:
                translateX(-50%)
                translateY(0);

        }

    }


    /* ================================================
       RELATOR
    ================================================ */

    #commentator {

        backdrop-filter:
            blur(10px);

        border:
            1px solid
            rgba(255,255,255,.12);

    }


    /* ================================================
       MENSAJES
    ================================================ */

    #gameMessage {

        text-shadow:
            0 4px 12px
            rgba(0,0,0,.8);

        font-size:
            clamp(
                28px,
                5vw,
                65px
            ) !important;

    }


    /* ================================================
       MÓVIL
    ================================================ */

    @media(max-width:700px){

        #broadcastScore {

            top: 10px;

            padding:
                7px 12px;

            font-size:
                12px;

        }


        #stadiumClock {

            top: 10px;

            right: 10px;

            font-size:
                11px;

        }


        .stadium-lights div {

            width:
                55px !important;

            height:
                17px !important;

        }


        .crowd {

            height:
                90px;

        }

    }

    `;


    document.head.appendChild(style);


    /* =====================================================
       CREAR ARCO
    ===================================================== */

    function createGoal(){

        if(
            document.querySelector(
                ".real-goal"
            )
        )
            return;


        const goal =
            document.createElement(
                "div"
            );


        goal.className =
            "real-goal";


        goal.innerHTML = `

            <div
                class="goal-post goal-left">
            </div>

            <div
                class="goal-post goal-right">
            </div>

            <div
                class="goal-post goal-crossbar">
            </div>

            <div
                class="goal-net"
                id="net">
            </div>

        `;


        field.appendChild(
            goal
        );

    }


    /* =====================================================
       SOMBRAS
    ===================================================== */

    function createShadows(){

        if(
            !document.querySelector(
                ".player-shadow"
            )
        ){

            const shadow =
                document.createElement(
                    "div"
                );

            shadow.className =
                "player-shadow";

            field.appendChild(
                shadow
            );

        }


        if(
            !document.querySelector(
                ".keeper-shadow"
            )
        ){

            const shadow =
                document.createElement(
                    "div"
                );

            shadow.className =
                "keeper-shadow";

            field.appendChild(
                shadow
            );

        }


        updateShadows();

    }


    function updateShadows(){

        const pShadow =
            document.querySelector(
                ".player-shadow"
            );


        const kShadow =
            document.querySelector(
                ".keeper-shadow"
            );


        if(
            pShadow &&
            player
        ){

            pShadow.style.left =
                player.offsetLeft +
                player.offsetWidth / 2 +
                "px";


            pShadow.style.top =
                player.offsetTop +
                player.offsetHeight +
                5 +
                "px";

        }


        if(
            kShadow &&
            keeper
        ){

            kShadow.style.left =
                keeper.offsetLeft +
                keeper.offsetWidth / 2 +
                "px";


            kShadow.style.top =
                keeper.offsetTop +
                keeper.offsetHeight +
                5 +
                "px";

        }

    }


    /* =====================================================
       LÍNEAS DE CANCHA
    ===================================================== */

    function improveField(){

        if(
            document.getElementById(
                "fieldMarkings"
            )
        )
            return;


        const markings =
            document.createElement(
                "div"
            );


        markings.id =
            "fieldMarkings";


        markings.style.position =
            "absolute";


        markings.style.inset =
            "0";


        markings.style.pointerEvents =
            "none";


        markings.style.zIndex =
            "1";


        markings.innerHTML = `

            <div
                style="
                position:absolute;
                left:50%;
                top:0;
                bottom:0;
                width:3px;
                background:rgba(255,255,255,.75);
                transform:translateX(-50%);
                ">
            </div>


            <div
                style="
                position:absolute;
                left:50%;
                top:50%;
                width:130px;
                height:130px;
                border:3px solid rgba(255,255,255,.75);
                border-radius:50%;
                transform:translate(-50%,-50%);
                ">
            </div>


            <div
                style="
                position:absolute;
                left:50%;
                top:4%;
                width:52%;
                height:27%;
                border:3px solid rgba(255,255,255,.8);
                border-bottom:0;
                transform:translateX(-50%);
                ">
            </div>


            <div
                style="
                position:absolute;
                left:50%;
                top:0;
                width:27%;
                height:11%;
                border:3px solid rgba(255,255,255,.8);
                border-bottom:0;
                transform:translateX(-50%);
                ">
            </div>

        `;


        field.appendChild(
            markings
        );

    }


    /* =====================================================
       ILUMINACIÓN DINÁMICA
    ===================================================== */

    function createLightEffect(){

        if(
            document.getElementById(
                "stadiumLightEffect"
            )
        )
            return;


        const light =
            document.createElement(
                "div"
            );


        light.id =
            "stadiumLightEffect";


        light.style.position =
            "absolute";


        light.style.inset =
            "0";


        light.style.pointerEvents =
            "none";


        light.style.zIndex =
            "4";


        light.style.background =
            `
            radial-gradient(
                ellipse at 50% 15%,
                rgba(
                    255,
                    255,
                    255,
                    .16
                ),
                transparent 58%
            )
            `;


        game.appendChild(
            light
        );

    }


    /* =====================================================
       PEQUEÑO MOVIMIENTO DEL PÚBLICO
    ===================================================== */

    function animateCrowd(){

        const crowd =
            document.querySelector(
                ".crowd"
            );


        if(!crowd)
            return;


        let t =
            0;


        function loop(){

            t += .02;


            crowd.style.transform =
                `
                translateX(
                    ${Math.sin(t) * 3}px
                )
                `;


            requestAnimationFrame(
                loop
            );

        }


        loop();

    }


    /* =====================================================
       CÁMARA CINEMÁTICA
    ===================================================== */

    function cinematicCamera(){

        let targetZoom =
            1;


        let currentZoom =
            1;


        function update(){

            if(
                !game.classList.contains(
                    "active"
                )
            ){

                requestAnimationFrame(
                    update
                );

                return;

            }


            currentZoom +=
                (
                    targetZoom -
                    currentZoom
                )
                *
                .03;


            field.style.transformOrigin =
                "center center";


            requestAnimationFrame(
                update
            );

        }


        update();


        window.footballCameraZoom =
            zoom => {

                targetZoom =
                    Math.max(
                        .9,
                        Math.min(
                            1.12,
                            zoom
                        )
                    );

            };

    }


    /* =====================================================
       EFECTO CUANDO SE PATEA
    ===================================================== */

    document.addEventListener(
        "mousedown",
        event => {

            if(
                event.target.id ===
                "shootBtn"
            ){

                if(
                    window.footballCameraZoom
                ){

                    window.footballCameraZoom(
                        1.035
                    );

                }

            }

        }
    );


    /* =====================================================
       EFECTO AL TERMINAR
    ===================================================== */

    document.addEventListener(
        "mouseup",
        event => {

            if(
                event.target.id ===
                "shootBtn"
            ){

                setTimeout(
                    () => {

                        if(
                            window.footballCameraZoom
                        ){

                            window.footballCameraZoom(
                                1
                            );

                        }

                    },
                    650
                );

            }

        }
    );


    /* =====================================================
       ARRANQUE
    ===================================================== */

    function initialize(){

        if(!field)
            return;


        createGoal();

        improveField();

        createShadows();

        createLightEffect();

        animateCrowd();

        cinematicCamera();

    }


    /*
       Esperamos un momento porque
       game.js crea algunos elementos
       dinámicamente.
    */

    setTimeout(
        initialize,
        300
    );


    /*
       Actualizar sombras constantemente.
    */

    setInterval(
        updateShadows,
        100
    );


})();
