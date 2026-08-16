/* =========================================================
   ULTIMATE FOOTBALL
   PART 9
   TIROS AVANZADOS + EFECTO + CÁMARA + ATAJADAS
========================================================= */

(() => {

    "use strict";

    /* =====================================================
       ESTILOS
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `

        #shotTypePanel {
            position: fixed;
            left: 50%;
            bottom: 85px;
            transform: translateX(-50%);
            z-index: 800;

            display: flex;
            gap: 8px;

            padding: 8px;

            background: rgba(0,0,0,.65);
            backdrop-filter: blur(10px);

            border-radius: 15px;
        }

        .shotTypeButton {
            border: 1px solid rgba(255,255,255,.2);

            background: rgba(255,255,255,.1);

            color: white;

            border-radius: 10px;

            padding: 9px 13px;

            cursor: pointer;

            font-weight: bold;

            transition: .2s;
        }

        .shotTypeButton:hover {
            transform: translateY(-2px);
            background: rgba(255,255,255,.2);
        }

        .shotTypeButton.selected {
            background: #18b957;
            border-color: #75ffa9;
        }

        #shotInfo {
            position: fixed;

            left: 20px;
            bottom: 20px;

            z-index: 800;

            padding: 9px 13px;

            color: white;

            background: rgba(0,0,0,.6);

            border-radius: 10px;

            font-family: Arial, sans-serif;

            font-size: 13px;
        }

        .ball-trail {
            position: absolute;

            width: 9px;
            height: 9px;

            border-radius: 50%;

            background: rgba(255,255,255,.3);

            pointer-events: none;

            z-index: 2;

            filter: blur(2px);
        }

        .save-effect {
            position: fixed;

            left: 50%;
            top: 40%;

            transform: translate(-50%,-50%);

            z-index: 9999;

            color: white;

            font-size: clamp(28px,5vw,65px);

            font-weight: 900;

            text-shadow: 0 5px 15px black;

            pointer-events: none;

            animation: saveAnimation .8s ease forwards;
        }

        @keyframes saveAnimation {

            0% {
                opacity: 0;
                transform:
                    translate(-50%,-30%)
                    scale(.7);
            }

            30% {
                opacity: 1;
                transform:
                    translate(-50%,-50%)
                    scale(1.1);
            }

            100% {
                opacity: 0;
                transform:
                    translate(-50%,-70%)
                    scale(1);
            }

        }

        @media(max-width:700px) {

            #shotTypePanel {
                bottom: 105px;
                max-width: 95vw;
                overflow-x: auto;
            }

            .shotTypeButton {
                white-space: nowrap;
                font-size: 11px;
                padding: 8px;
            }

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       CONFIGURACIÓN
    ===================================================== */

    let selectedShotType = "normal";

    let advancedShooting = false;

    let cameraFollow = false;

    let cameraX = 0;

    let cameraY = 0;

    let ballSpin = 0;


    /* =====================================================
       TIPOS DE TIRO
    ===================================================== */

    const shotTypes = {

        normal: {
            name: "Normal",
            power: 1,
            curve: 1,
            accuracy: 1,
            height: 1
        },

        placed: {
            name: "Colocado",
            power: .78,
            curve: 1.45,
            accuracy: 1.25,
            height: .95
        },

        powerful: {
            name: "Potente",
            power: 1.28,
            curve: .55,
            accuracy: .82,
            height: 1
        },

        chip: {
            name: "Picadita",
            power: .72,
            curve: .3,
            accuracy: .9,
            height: 1.55
        }

    };


    /* =====================================================
       CREAR PANEL
    ===================================================== */

    function createShotPanel() {

        if (
            document.getElementById("shotTypePanel")
        ) return;


        const panel =
            document.createElement("div");


        panel.id =
            "shotTypePanel";


        panel.innerHTML = `

            <button
                class="shotTypeButton selected"
                data-shot="normal">
                ⚽ Normal
            </button>

            <button
                class="shotTypeButton"
                data-shot="placed">
                🎯 Colocado
            </button>

            <button
                class="shotTypeButton"
                data-shot="powerful">
                💥 Potente
            </button>

            <button
                class="shotTypeButton"
                data-shot="chip">
                🟡 Picadita
            </button>

        `;


        document.body.appendChild(panel);


        const buttons =
            panel.querySelectorAll(
                ".shotTypeButton"
            );


        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    selectedShotType =
                        button.dataset.shot;


                    buttons.forEach(b => {

                        b.classList.remove(
                            "selected"
                        );

                    });


                    button.classList.add(
                        "selected"
                    );


                    updateShotInfo();

                }
            );

        });

    }


    /* =====================================================
       INFORMACIÓN
    ===================================================== */

    function createShotInfo() {

        if (
            document.getElementById("shotInfo")
        ) return;


        const info =
            document.createElement("div");


        info.id =
            "shotInfo";


        document.body.appendChild(info);


        updateShotInfo();

    }


    function updateShotInfo() {

        const info =
            document.getElementById(
                "shotInfo"
            );


        if (!info) return;


        const type =
            shotTypes[
                selectedShotType
            ];


        info.innerHTML =
            `Tiro: <strong>${type.name}</strong>`;

    }


    /* =====================================================
       TECLAS 1-4
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "1")
                chooseShot("normal");

            if (event.key === "2")
                chooseShot("placed");

            if (event.key === "3")
                chooseShot("powerful");

            if (event.key === "4")
                chooseShot("chip");

        }
    );


    function chooseShot(type) {

        selectedShotType =
            type;


        document
            .querySelectorAll(
                ".shotTypeButton"
            )
            .forEach(button => {

                button.classList.toggle(
                    "selected",
                    button.dataset.shot === type
                );

            });


        updateShotInfo();

    }


    /* =====================================================
       ANIMACIÓN DEL JUGADOR
    ===================================================== */

    function kickAnimation() {

        if (!player)
            return;


        player.style.transition =
            "transform .12s ease";


        player.style.transform =
            "translateX(-50%) rotate(-10deg) translateY(-4px)";


        setTimeout(() => {

            player.style.transform =
                "translateX(-50%) rotate(16deg) translateY(2px)";

        }, 120);


        setTimeout(() => {

            player.style.transform =
                "translateX(-50%)";

        }, 400);

    }


    /* =====================================================
       CALCULAR TIRO
    ===================================================== */

    function calculateAdvancedShot() {

        const rect =
            field.getBoundingClientRect();


        let targetX =
            mouseX -
            rect.left;


        let targetY =
            mouseY -
            rect.top;


        /*
           Convertir posición
           del mouse a dirección.
        */

        let directionX =
            (
                targetX -
                rect.width / 2
            )
            /
            (
                rect.width / 2
            );


        let directionY =
            (
                targetY -
                rect.height * .3
            )
            /
            (
                rect.height * .65
            );


        directionX =
            Math.max(
                -1,
                Math.min(
                    1,
                    directionX
                )
            );


        directionY =
            Math.max(
                -1,
                Math.min(
                    1,
                    directionY
                )
            );


        const type =
            shotTypes[
                selectedShotType
            ];


        /*
           Precisión del jugador.
        */

        let precision =
            selectedPlayer.precision /
            100;


        precision *=
            type.accuracy;


        const error =
            Math.max(
                .01,
                (1 - precision) * .18
            );


        directionX +=
            (
                Math.random() - .5
            )
            *
            error;


        directionY +=
            (
                Math.random() - .5
            )
            *
            error;


        /*
           Objetivo final.
        */

        let finalX =
            rect.width / 2 +
            directionX *
            rect.width *
            .36;


        let finalY =
            rect.height * .08 +
            directionY *
            rect.height *
            .22;


        /*
           Picadita.
        */

        if (
            selectedShotType === "chip"
        ) {

            finalY -=
                rect.height * .07;

        }


        /*
           Limitar arco.
        */

        finalX =
            Math.max(
                rect.width * .2,
                Math.min(
                    rect.width * .8,
                    finalX
                )
            );


        finalY =
            Math.max(
                rect.height * .03,
                Math.min(
                    rect.height * .34,
                    finalY
                )
            );


        startAdvancedBall(
            finalX,
            finalY,
            rect
        );

    }


    /* =====================================================
       FÍSICA DE PELOTA
    ===================================================== */

    function startAdvancedBall(
        targetX,
        targetY,
        rect
    ) {

        const type =
            shotTypes[
                selectedShotType
            ];


        const startX =
            rect.width / 2;


        const startY =
            rect.height * .78;


        let dx =
            targetX -
            startX;


        let dy =
            targetY -
            startY;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        let power =
            powerValue /
            100;


        power =
            Math.max(
                .15,
                Math.min(
                    1,
                    power
                )
            );


        power *=
            type.power;


        /*
           Estadística de potencia.
        */

        const playerPower =
            selectedPlayer.power /
            100;


        const speed =
            (
                7 +
                power * 14
            )
            *
            (
                .9 +
                playerPower * .18
            );


        physics.x =
            startX;


        physics.y =
            startY;


        physics.vx =
            dx /
            distance *
            speed;


        physics.vy =
            -(
                6 +
                power *
                9 *
                type.height
            );


        physics.gravity =
            .16 +
            power *
            .05;


        /*
           Efecto según dirección.
        */

        physics.curve =
            (
                curveValue /
                100
            )
            *
            type.curve
            *
            .06;


        physics.rotation =
            0;


        physics.rotationSpeed =
            12 +
            power * 30;


        physics.time =
            0;


        physics.active =
            true;


        physics.duration =
            1600 +
            power * 500;


        physics.rect =
            rect;


        cameraFollow =
            true;


        advancedShooting =
            true;


        requestAnimationFrame(
            advancedPhysicsLoop
        );

    }


    /* =====================================================
       BUCLE DE FÍSICA
    ===================================================== */

    function advancedPhysicsLoop() {

        if (
            !physics.active
        ) {

            cameraFollow =
                false;

            advancedShooting =
                false;

            return;

        }


        physics.time +=
            16;


        /*
           Gravedad.
        */

        physics.vy +=
            physics.gravity;


        /*
           Curva.
        */

        physics.vx +=
            physics.curve;


        /*
           Movimiento.
        */

        physics.x +=
            physics.vx;


        physics.y +=
            physics.vy;


        /*
           Frenado del aire.
        */

        physics.vx *=
            .988;


        physics.vy *=
            .996;


        /*
           Rotación.
        */

        physics.rotation +=
            physics.rotationSpeed;


        /*
           Altura visual.
        */

        const height =
            Math.max(
                0,
                physics.rect.height * .78 -
                physics.y
            );


        let scale =
            1 +
            height /
            physics.rect.height *
            .7;


        scale =
            Math.max(
                .75,
                Math.min(
                    1.5,
                    scale
                )
            );


        /*
           Dibujar pelota.
        */

        ball.style.left =
            physics.x - 14 + "px";


        ball.style.top =
            physics.y - 14 + "px";


        ball.style.transform =
            `
            scale(${scale})
            rotate(${physics.rotation}deg)
            `;


        /*
           Cámara.
        */

        updateCamera();


        /*
           Estela.
        */

        if (
            Math.abs(physics.vx) +
            Math.abs(physics.vy)
            > 12
        ) {

            createTrail(
                physics.x,
                physics.y
            );

        }


        /*
           Final.
        */

        if (
            physics.y <=
            physics.rect.height * .04
            ||
            physics.time >
            physics.duration
        ) {

            physics.active =
                false;


            cameraFollow =
                false;


            advancedShooting =
                false;


            resetCamera();


            /*
               Dejar que el juego
               existente procese
               el resultado.
            */

            setTimeout(() => {

                if (
                    typeof goalkeeperDecision ===
                    "function"
                ) {

                    goalkeeperDecision();

                }

            }, 120);


            return;

        }


        requestAnimationFrame(
            advancedPhysicsLoop
        );

    }


    /* =====================================================
       CÁMARA
    ===================================================== */

    function updateCamera() {

        if (
            !cameraFollow
        )
            return;


        const rect =
            physics.rect;


        const targetCameraX =
            (
                rect.width / 2 -
                physics.x
            )
            *
            .08;


        const targetCameraY =
            (
                rect.height * .45 -
                physics.y
            )
            *
            .05;


        cameraX +=
            (
                targetCameraX -
                cameraX
            )
            *
            .12;


        cameraY +=
            (
                targetCameraY -
                cameraY
            )
            *
            .12;


        cameraX =
            Math.max(
                -40,
                Math.min(
                    40,
                    cameraX
                )
            );


        cameraY =
            Math.max(
                -25,
                Math.min(
                    25,
                    cameraY
                )
            );


        field.style.transform =
            `
            translate(
                ${cameraX}px,
                ${cameraY}px
            )
            `;

    }


    function resetCamera() {

        cameraX = 0;

        cameraY = 0;

        if (field) {

            field.style.transform =
                "translate(0,0)";

        }

    }


    /* =====================================================
       ESTELA
    ===================================================== */

    function createTrail(x, y) {

        const trail =
            document.createElement(
                "div"
            );


        trail.className =
            "ball-trail";


        trail.style.left =
            x - 4 + "px";


        trail.style.top =
            y - 4 + "px";


        field.appendChild(
            trail
        );


        trail.animate(
            [
                {
                    opacity: .4,
                    transform: "scale(1)"
                },

                {
                    opacity: 0,
                    transform: "scale(.1)"
                }
            ],
            {
                duration: 220
            }
        );


        setTimeout(() => {

            trail.remove();

        }, 250);

    }


    /* =====================================================
       ATAJADA ESPECIAL
    ===================================================== */

    function saveEffect() {

        const element =
            document.createElement(
                "div"
            );


        element.className =
            "save-effect";


        const texts = [

            "🧤 ¡ATAJADÓN!",

            "🧤 ¡QUÉ ATAJADA!",

            "🧤 ¡INCREÍBLE!",

            "🧤 ¡LA SACÓ!"

        ];


        element.textContent =
            texts[
                Math.floor(
                    Math.random() *
                    texts.length
                )
            ];


        document.body.appendChild(
            element
        );


        setTimeout(() => {

            element.remove();

        }, 850);

    }


    /* =====================================================
       ATAJADA DEL ARQUERO
    ===================================================== */

    function advancedKeeperAnimation(
        direction
    ) {

        if (!keeper)
            return;


        const random =
            Math.random();


        keeper.style.transition =
            "left .4s ease, transform .4s ease";


        keeper.style.left =
            `calc(50% + ${direction * 30}%)`;


        if (
            random < .33
        ) {

            keeper.style.transform =
                `
                translateX(-50%)
                translateY(-25px)
                rotate(${direction * -25}deg)
                `;

        }
        else if (
            random < .66
        ) {

            keeper.style.transform =
                `
                translateX(-50%)
                translateY(18px)
                rotate(${direction * -35}deg)
                `;

        }
        else {

            keeper.style.transform =
                `
                translateX(-50%)
                rotate(${direction * -18}deg)
                scale(1.05)
                `;

        }

    }


    /* =====================================================
       REEMPLAZAR ANIMACIÓN DE TIRO
    ===================================================== */

    const oldShoot =
        window.shoot;


    window.shoot =
        function() {

            if (
                advancedShooting
            )
                return;


            if (
                typeof isShooting !==
                "undefined" &&
                isShooting
            )
                return;


            isShooting =
                true;


            if (
                typeof shots !==
                "undefined"
            ) {

                shots++;

            }


            kickAnimation();


            if (
                typeof commentary ===
                "function"
            ) {

                commentary(
                    `${selectedPlayer.name} prepara un tiro ${shotTypes[selectedShotType].name.toLowerCase()}...`
                );

            }


            setTimeout(() => {

                calculateAdvancedShot();

            }, 300);

        };


    /* =====================================================
       DETECTAR ATAJADA
    ===================================================== */

    const oldShowMessage =
        window.showMessage;


    window.showMessage =
        function(text) {

            if (
                text &&
                (
                    text.includes("ATAJ")
                    ||
                    text.includes("ATAJAD")
                )
            ) {

                saveEffect();

            }


            if (
                typeof oldShowMessage ===
                "function"
            ) {

                oldShowMessage(text);

            }

        };


    /* =====================================================
       INICIALIZACIÓN
    ===================================================== */

    function initialize() {

        createShotPanel();

        createShotInfo();

    }


    /*
       Esperar a que game.js
       haya creado el juego.
    */

    setTimeout(
        initialize,
        700
    );


})();
