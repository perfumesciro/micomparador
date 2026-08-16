/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 22
   CÁMARA DINÁMICA
========================================================= */

(() => {

    "use strict";

    let cameraActive22 = false;
    let cameraFrame22 = null;

    let cameraX22 = 0;
    let cameraY22 = 0;
    let cameraZoom22 = 1;

    let targetX22 = 0;
    let targetY22 = 0;
    let targetZoom22 = 1;


    /* =====================================================
       ESTILOS
    ===================================================== */

    const style =
        document.createElement("style");

    style.textContent = `

        #cameraOverlay22 {

            position: fixed;

            inset: 0;

            z-index: 17000;

            pointer-events: none;

            overflow: hidden;

        }


        #cameraVignette22 {

            position: absolute;

            inset: 0;

            opacity: 0;

            background:
                radial-gradient(
                    ellipse at center,
                    transparent 45%,
                    rgba(0,0,0,.35) 100%
                );

            transition:
                opacity .25s ease;

        }


        #cameraVignette22.active {

            opacity: 1;

        }


        #speedLines22 {

            position: absolute;

            inset: 0;

            opacity: 0;

            background:
                repeating-linear-gradient(
                    105deg,
                    transparent 0px,
                    transparent 40px,
                    rgba(255,255,255,.12) 42px,
                    transparent 44px
                );

        }


        #speedLines22.active {

            animation:
                speedLinesAnimation22
                .35s
                linear
                infinite;

            opacity: .8;

        }


        @keyframes speedLinesAnimation22 {

            from {

                transform:
                    translateX(-70px);

            }

            to {

                transform:
                    translateX(70px);

            }

        }


        #cameraFlash22 {

            position: absolute;

            inset: 0;

            background:
                rgba(255,255,255,.75);

            opacity: 0;

        }


        #cameraFlash22.show {

            animation:
                cameraFlashAnimation22
                .25s
                ease-out;

        }


        @keyframes cameraFlashAnimation22 {

            0% {

                opacity: .6;

            }

            100% {

                opacity: 0;

            }

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       CREAR OVERLAY
    ===================================================== */

    function createCameraOverlay() {

        if (
            document.getElementById(
                "cameraOverlay22"
            )
        )
            return;


        const overlay =
            document.createElement("div");

        overlay.id =
            "cameraOverlay22";


        overlay.innerHTML = `

            <div
                id="cameraVignette22">
            </div>

            <div
                id="speedLines22">
            </div>

            <div
                id="cameraFlash22">
            </div>

        `;


        document.body.appendChild(
            overlay
        );

    }


    /* =====================================================
       OBTENER ESCENA
    ===================================================== */

    function getScene22() {

        return (
            document.getElementById(
                "freeKickScene16"
            ) ||
            document.querySelector(
                ".football-scene"
            ) ||
            document.body
        );

    }


    /* =====================================================
       INICIAR CÁMARA
    ===================================================== */

    function startCamera22(
        targetX,
        targetY,
        power = 70
    ) {

        createCameraOverlay();


        cameraActive22 =
            true;


        cameraX22 = 0;

        cameraY22 = 0;

        cameraZoom22 = 1;


        targetX22 =
            targetX -
            window.innerWidth / 2;


        targetY22 =
            targetY -
            window.innerHeight / 2;


        /*
           La potencia determina
           cuánto se acerca la cámara.
        */

        targetZoom22 =
            1 +
            Math.min(
                power / 1000,
                .12
            );


        const vignette =
            document.getElementById(
                "cameraVignette22"
            );


        if (vignette) {

            vignette.classList.add(
                "active"
            );

        }


        if (
            power >= 82
        ) {

            const speed =
                document.getElementById(
                    "speedLines22"
                );


            if (speed) {

                speed.classList.add(
                    "active"
                );

            }

        }


        animateCamera22();

    }


    /* =====================================================
       ANIMACIÓN DE CÁMARA
    ===================================================== */

    function animateCamera22() {

        if (
            !cameraActive22
        )
            return;


        cameraX22 +=
            (
                targetX22 -
                cameraX22
            ) *
            .055;


        cameraY22 +=
            (
                targetY22 -
                cameraY22
            ) *
            .055;


        cameraZoom22 +=
            (
                targetZoom22 -
                cameraZoom22
            ) *
            .055;


        const scene =
            getScene22();


        if (
            scene &&
            scene !== document.body
        ) {

            scene.style.transform =
                `
                translate(
                    ${-cameraX22 * .12}px,
                    ${-cameraY22 * .08}px
                )
                scale(${cameraZoom22})
                `;

            scene.style.transformOrigin =
                "center center";

        }


        cameraFrame22 =
            requestAnimationFrame(
                animateCamera22
            );

    }


    /* =====================================================
       FINALIZAR CÁMARA
    ===================================================== */

    function stopCamera22() {

        cameraActive22 =
            false;


        cancelAnimationFrame(
            cameraFrame22
        );


        const scene =
            getScene22();


        if (
            scene &&
            scene !== document.body
        ) {

            scene.style.transform =
                "";

            scene.style.transformOrigin =
                "";

        }


        const vignette =
            document.getElementById(
                "cameraVignette22"
            );


        const speed =
            document.getElementById(
                "speedLines22"
            );


        if (vignette) {

            vignette.classList.remove(
                "active"
            );

        }


        if (speed) {

            speed.classList.remove(
                "active"
            );

        }

    }


    /* =====================================================
       EFECTO DE IMPACTO
    ===================================================== */

    function cameraImpact22() {

        const flash =
            document.getElementById(
                "cameraFlash22"
            );


        if (!flash)
            return;


        flash.classList.remove(
            "show"
        );


        void flash.offsetWidth;


        flash.classList.add(
            "show"
        );

    }


    /* =====================================================
       OBTENER OBJETIVO
    ===================================================== */

    function getTarget22() {

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
                window.innerHeight * .35

        };

    }


    /* =====================================================
       POTENCIA
    ===================================================== */

    function getPower22() {

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
       CONECTAR CON TIRO
    ===================================================== */

    function connectShot22() {

        const scene =
            document.getElementById(
                "freeKickScene16"
            );


        if (!scene)
            return;


        if (
            scene.dataset
                .camera22Connected
            ===
            "true"
        )
            return;


        scene.dataset
            .camera22Connected =
            "true";


        scene.addEventListener(
            "mousedown",
            event => {

                if (
                    event.button !== 0
                )
                    return;


                const target =
                    getTarget22();


                const power =
                    getPower22();


                startCamera22(
                    target.x,
                    target.y,
                    power
                );


                /*
                   El golpe de la pelota
                   ocurre un poco después.
                */

                setTimeout(
                    () => {

                        cameraImpact22();

                    },
                    350
                );


                /*
                   Volvemos a la cámara
                   normal después del tiro.
                */

                setTimeout(
                    () => {

                        stopCamera22();

                    },
                    1600
                );

            }
        );

    }


    /* =====================================================
       CONEXIÓN AUTOMÁTICA
    ===================================================== */

    function monitor22() {

        createCameraOverlay();

        connectShot22();

    }


    /* =====================================================
       API
    ===================================================== */

    window.startFootballCamera22 =
        function(
            x,
            y,
            power
        ) {

            startCamera22(
                x ??
                    window.innerWidth / 2,

                y ??
                    window.innerHeight * .35,

                power ??
                    70
            );

        };


    window.stopFootballCamera22 =
        function() {

            stopCamera22();

        };


    /* =====================================================
       INICIO
    ===================================================== */

    createCameraOverlay();

    monitor22();


    setInterval(
        monitor22,
        800
    );


    console.log(
        "🎥 Parte 22 cargada: cámara dinámica"
    );

})();
