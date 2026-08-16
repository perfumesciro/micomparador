/* =========================================================
   ULTIMATE FOOTBALL
   PARTE 7
   EQUIPOS + CAMISETAS + ESTADIO + PÚBLICO + TV
========================================================= */


/* =========================================================
   REFERENCIAS
========================================================= */

const menu =
    document.getElementById("menu");

const tutorial =
    document.getElementById("tutorial");

const game =
    document.getElementById("game");

const tutorialContent =
    document.getElementById("tutorialContent");

const tutorialNext =
    document.getElementById("tutorialNext");

const field =
    document.getElementById("field");

const ball =
    document.getElementById("ball");

const player =
    document.getElementById("player");

const keeper =
    document.getElementById("keeper");

const wall =
    document.getElementById("wall");

const aim =
    document.getElementById("aim");

const powerBar =
    document.getElementById("power");

const curve =
    document.getElementById("curve");

const message =
    document.getElementById("gameMessage");

const resultPanel =
    document.getElementById("resultPanel");

const resultTitle =
    document.getElementById("resultTitle");

const resultText =
    document.getElementById("resultText");


/* =========================================================
   EQUIPOS
========================================================= */

const teams = [

    {
        name: "Argentina",
        short: "ARG",
        primary: "#75AADB",
        secondary: "#FFFFFF",
        accent: "#111111"
    },

    {
        name: "Brasil",
        short: "BRA",
        primary: "#1E8F3D",
        secondary: "#F7D117",
        accent: "#173F21"
    },

    {
        name: "España",
        short: "ESP",
        primary: "#D9162A",
        secondary: "#F2C230",
        accent: "#8E0E1C"
    },

    {
        name: "Francia",
        short: "FRA",
        primary: "#172B85",
        secondary: "#FFFFFF",
        accent: "#D72838"
    },

    {
        name: "Alemania",
        short: "GER",
        primary: "#171717",
        secondary: "#E7C23A",
        accent: "#FFFFFF"
    },

    {
        name: "Italia",
        short: "ITA",
        primary: "#1C65B8",
        secondary: "#FFFFFF",
        accent: "#D71E2A"
    },

    {
        name: "Portugal",
        short: "POR",
        primary: "#C51E29",
        secondary: "#0A7A42",
        accent: "#F1C64B"
    },

    {
        name: "Inglaterra",
        short: "ENG",
        primary: "#FFFFFF",
        secondary: "#D71920",
        accent: "#193C8F"
    }

];


/* =========================================================
   JUGADORES
========================================================= */

const players = [

    {
        name: "Mateo Silva",
        number: 10,
        power: 92,
        precision: 94,
        curve: 90,
        penalty: 95
    },

    {
        name: "Lucas Fernández",
        number: 9,
        power: 96,
        precision: 87,
        curve: 82,
        penalty: 91
    },

    {
        name: "Nicolás Romero",
        number: 11,
        power: 86,
        precision: 92,
        curve: 96,
        penalty: 89
    },

    {
        name: "Santiago Torres",
        number: 7,
        power: 89,
        precision: 95,
        curve: 86,
        penalty: 93
    },

    {
        name: "Thiago Gómez",
        number: 8,
        power: 84,
        precision: 90,
        curve: 94,
        penalty: 88
    },

    {
        name: "Franco Díaz",
        number: 20,
        power: 91,
        precision: 84,
        curve: 79,
        penalty: 86
    }

];


/* =========================================================
   ARQUEROS
========================================================= */

const goalkeepers = [

    {
        name: "Martín Herrera",
        reflexes: 90,
        penalties: 87
    },

    {
        name: "Tomás Acosta",
        reflexes: 94,
        penalties: 91
    },

    {
        name: "Juan Pérez",
        reflexes: 84,
        penalties: 82
    },

    {
        name: "Agustín Molina",
        reflexes: 88,
        penalties: 90
    }

];


/* =========================================================
   ESTADO DEL JUEGO
========================================================= */

let selectedTeam =
    teams[0];

let opponentTeam =
    teams[1];

let selectedPlayer =
    players[0];

let selectedKeeper =
    goalkeepers[0];

let difficulty =
    "NORMAL";

let mode =
    "penalty";

let goals =
    0;

let opponentGoals =
    0;

let shots =
    0;

let opponentShots =
    0;

const maxShots =
    5;

let mouseX =
    innerWidth / 2;

let mouseY =
    innerHeight / 2;

let powerValue =
    0;

let powerDirection =
    1;

let curveValue =
    0;

let charging =
    false;

let isShooting =
    false;

let wallJumping =
    false;

let cameraX =
    0;

let cameraY =
    0;

let cameraShake =
    0;

let commentaryTimer =
    null;


/* =========================================================
   FÍSICA
========================================================= */

let physics = {

    x: 0,
    y: 0,

    vx: 0,
    vy: 0,

    gravity: .17,

    curve: 0,

    rotation: 0,

    rotationSpeed: 15,

    active: false,

    time: 0,

    duration: 1200,

    rect: null

};


/* =========================================================
   CREAR ESTADIO
========================================================= */

function createStadium(){

    if(
        document.getElementById(
            "stadiumEnvironment"
        )
    )
        return;


    const stadium =
        document.createElement(
            "div"
        );


    stadium.id =
        "stadiumEnvironment";


    stadium.innerHTML = `

        <div class="stadium-lights">

            <div></div>
            <div></div>
            <div></div>
            <div></div>

        </div>

        <div class="crowd crowd-top"></div>

        <div class="stadium-banner">
            ULTIMATE FOOTBALL
        </div>

    `;


    game.prepend(
        stadium
    );

}


/* =========================================================
   ESTILOS DEL ESTADIO
========================================================= */

function createStadiumStyles(){

    if(
        document.getElementById(
            "stadiumStyles"
        )
    )
        return;


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "stadiumStyles";


    style.textContent = `

        #stadiumEnvironment {

            position:
                absolute;

            inset:
                0;

            pointer-events:
                none;

            overflow:
                hidden;

            z-index:
                0;

            background:
                radial-gradient(
                    ellipse at 50% 20%,
                    #56606a 0%,
                    #1b2228 38%,
                    #080b0e 100%
                );

        }


        .stadium-lights {

            position:
                absolute;

            top:
                15px;

            left:
                0;

            width:
                100%;

            display:
                flex;

            justify-content:
                space-around;

        }


        .stadium-lights div {

            width:
                100px;

            height:
                25px;

            border-radius:
                50%;

            background:
                rgba(
                    255,
                    255,
                    255,
                    .9
                );

            box-shadow:
                0 0 35px
                rgba(
                    255,
                    255,
                    255,
                    .7
                );

        }


        .crowd {

            position:
                absolute;

            left:
                0;

            width:
                100%;

            height:
                130px;

            background:
                repeating-linear-gradient(
                    90deg,
                    #252b30 0 8px,
                    #40484e 8px 16px,
                    #161a1e 16px 24px
                );

            opacity:
                .9;

        }


        .crowd-top {

            top:
                60px;

        }


        .stadium-banner {

            position:
                absolute;

            top:
                150px;

            left:
                50%;

            transform:
                translateX(-50%);

            padding:
                8px 30px;

            border-radius:
                6px;

            background:
                rgba(
                    0,
                    0,
                    0,
                    .7
                );

            color:
                white;

            font-weight:
                900;

            letter-spacing:
                4px;

        }


        #game {

            position:
                relative;

            overflow:
                hidden;

        }


        #field {

            position:
                relative;

            z-index:
                2;

        }


        #player,
        #keeper,
        #ball {

            z-index:
                10;

        }


        .team-shirt {

            position:
                absolute;

            pointer-events:
                none;

        }


        #broadcastScore {

            position:
                fixed;

            top:
                20px;

            left:
                50%;

            transform:
                translateX(-50%);

            z-index:
                500;

            display:
                flex;

            align-items:
                center;

            gap:
                15px;

            padding:
                10px 20px;

            border-radius:
                10px;

            background:
                rgba(
                    5,
                    10,
                    15,
                    .9
                );

            color:
                white;

            font-family:
                Arial,
                sans-serif;

            font-weight:
                900;

            box-shadow:
                0 5px 25px
                rgba(
                    0,
                    0,
                    0,
                    .45
                );

        }


        .broadcast-team {

            display:
                flex;

            align-items:
                center;

            gap:
                8px;

        }


        .team-badge {

            width:
                22px;

            height:
                22px;

            border-radius:
                50%;

            border:
                2px solid
                white;

        }


        #broadcastScore .score-number {

            font-size:
                25px;

            min-width:
                30px;

            text-align:
                center;

        }


        #stadiumClock {

            position:
                fixed;

            top:
                20px;

            right:
                20px;

            z-index:
                500;

            padding:
                7px 12px;

            border-radius:
                7px;

            background:
                rgba(
                    0,
                    0,
                    0,
                    .65
                );

            color:
                white;

            font-family:
                monospace;

            font-weight:
                bold;

        }


        #teamSelectionPanel {

            position:
                fixed;

            inset:
                0;

            display:
                none;

            align-items:
                center;

            justify-content:
                center;

            background:
                rgba(
                    0,
                    0,
                    0,
                    .82
                );

            z-index:
                10000;

            font-family:
                Arial,
                sans-serif;

        }


        #teamSelectionPanel.active {

            display:
                flex;

        }


        .team-selection-box {

            width:
                min(
                    850px,
                    94vw
                );

            max-height:
                90vh;

            overflow:
                auto;

            padding:
                25px;

            border-radius:
                22px;

            background:
                linear-gradient(
                    145deg,
                    #101820,
                    #172b20
                );

            color:
                white;

            box-shadow:
                0 20px 80px
                rgba(
                    0,
                    0,
                    0,
                    .7
                );

        }


        .team-grid {

            display:
                grid;

            grid-template-columns:
                repeat(
                    auto-fit,
                    minmax(
                        150px,
                        1fr
                    )
                );

            gap:
                12px;

        }


        .team-button {

            min-height:
                100px;

            border:
                2px solid
                rgba(
                    255,
                    255,
                    255,
                    .15
                );

            border-radius:
                15px;

            color:
                white;

            cursor:
                pointer;

            font-weight:
                bold;

            transition:
                .2s;

        }


        .team-button:hover {

            transform:
                translateY(-3px);

        }


        .team-button.selected {

            outline:
                3px solid
                #4dff88;

            transform:
                scale(1.03);

        }


        #continueTeamSelection {

            width:
                100%;

            margin-top:
                20px;

            padding:
                15px;

            border:
                0;

            border-radius:
                14px;

            background:
                #18b957;

            color:
                white;

            font-size:
                17px;

            font-weight:
                bold;

            cursor:
                pointer;

        }

    `;


    document.head.appendChild(
        style
    );

}


createStadiumStyles();

createStadium();


/* =========================================================
   PANEL DE EQUIPOS
========================================================= */

function createTeamSelection(){

    if(
        document.getElementById(
            "teamSelectionPanel"
        )
    )
        return;


    const panel =
        document.createElement(
            "div"
        );


    panel.id =
        "teamSelectionPanel";


    panel.innerHTML = `

        <div class="team-selection-box">

            <h2>
                🌎 ELEGÍ TU SELECCIÓN
            </h2>

            <p>
                Seleccioná el equipo que querés representar.
            </p>

            <div
                id="teamGrid"
                class="team-grid">
            </div>

            <button
                id="continueTeamSelection">
                CONTINUAR
            </button>

        </div>

    `;


    document.body.appendChild(
        panel
    );


    const grid =
        document.getElementById(
            "teamGrid"
        );


    teams.forEach(
        (team,index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "team-button";


            button.textContent =
                team.name;


            button.style.background =
                `
                linear-gradient(
                    135deg,
                    ${team.primary},
                    ${team.secondary}
                )
                `;


            button.style.color =
                getContrastColor(
                    team.primary
                );


            button.addEventListener(
                "click",
                () => {

                    selectedTeam =
                        team;


                    document
                    .querySelectorAll(
                        ".team-button"
                    )
                    .forEach(
                        b =>
                            b.classList.remove(
                                "selected"
                            )
                    );


                    button.classList.add(
                        "selected"
                    );

                }
            );


            if(index === 0){

                button.classList.add(
                    "selected"
                );

            }


            grid.appendChild(
                button
            );

        }
    );


    document
    .getElementById(
        "continueTeamSelection"
    )
    .addEventListener(
        "click",
        () => {

            selectOpponent();

            panel.classList.remove(
                "active"
            );

            showPlayerSelection();

        }
    );

}


createTeamSelection();


/* =========================================================
   COLOR DEL TEXTO
========================================================= */

function getContrastColor(
    hex
){

    const clean =
        hex.replace(
            "#",
            ""
        );


    const r =
        parseInt(
            clean.substring(
                0,
                2
            ),
            16
        );


    const g =
        parseInt(
            clean.substring(
                2,
                4
            ),
            16
        );


    const b =
        parseInt(
            clean.substring(
                4,
                6
            ),
            16
        );


    const brightness =
        (
            r * 299 +
            g * 587 +
            b * 114
        )
        /
        1000;


    return brightness >
        150
        ? "#111"
        : "#fff";

}


/* =========================================================
   ELEGIR RIVAL
========================================================= */

function selectOpponent(){

    const possible =
        teams.filter(
            t =>
                t !== selectedTeam
        );


    opponentTeam =
        possible[
            Math.floor(
                Math.random() *
                possible.length
            )
        ];

}


/* =========================================================
   PANEL JUGADORES
========================================================= */

function showPlayerSelection(){

    let panel =
        document.getElementById(
            "selectionPanel"
        );


    if(!panel){

        createSelectionPanel();

        panel =
            document.getElementById(
                "selectionPanel"
            );

    }


    panel.classList.add(
        "active"
    );

}


/* =========================================================
   CREAR PANEL ANTERIOR
========================================================= */

function createSelectionPanel(){

    const panel =
        document.createElement(
            "div"
        );


    panel.id =
        "selectionPanel";


    panel.innerHTML = `

        <div class="selection-box">

            <h2>
                ⚽ CONFIGURACIÓN
            </h2>

            <h3>
                Elegí tu jugador
            </h3>

            <div id="playerOptions"></div>

            <h3>
                Arquero rival
            </h3>

            <div id="keeperOptions"></div>

            <h3>
                Dificultad
            </h3>

            <div
                class="difficulty-buttons">

                <button
                    data-difficulty="EASY">
                    FÁCIL
                </button>

                <button
                    data-difficulty="NORMAL">
                    NORMAL
                </button>

                <button
                    data-difficulty="HARD">
                    DIFÍCIL
                </button>

            </div>

            <button
                id="startConfiguredGame">
                CONTINUAR
            </button>

        </div>

    `;


    document.body.appendChild(
        panel
    );


    const playerOptions =
        document.getElementById(
            "playerOptions"
        );


    players.forEach(
        (p,index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "player-option";


            button.innerHTML =
                `
                <strong>
                    ${p.name}
                </strong>

                <br>

                #${p.number}
                `;


            button.addEventListener(
                "click",
                () => {

                    selectedPlayer =
                        p;


                    document
                    .querySelectorAll(
                        ".player-option"
                    )
                    .forEach(
                        b =>
                            b.classList.remove(
                                "selected"
                            )
                    );


                    button.classList.add(
                        "selected"
                    );

                }
            );


            if(index === 0){

                button.classList.add(
                    "selected"
                );

            }


            playerOptions.appendChild(
                button
            );

        }
    );


    const keeperOptions =
        document.getElementById(
            "keeperOptions"
        );


    goalkeepers.forEach(
        (g,index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "keeper-option";


            button.innerHTML =
                `
                <strong>
                    ${g.name}
                </strong>

                <br>

                Reflejos:
                ${g.reflexes}
                `;


            button.addEventListener(
                "click",
                () => {

                    selectedKeeper =
                        g;


                    document
                    .querySelectorAll(
                        ".keeper-option"
                    )
                    .forEach(
                        b =>
                            b.classList.remove(
                                "selected"
                            )
                    );


                    button.classList.add(
                        "selected"
                    );

                }
            );


            if(index === 0){

                button.classList.add(
                    "selected"
                );

            }


            keeperOptions.appendChild(
                button
            );

        }
    );


    document
    .querySelectorAll(
        "[data-difficulty]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    difficulty =
                        button.dataset
                        .difficulty;


                    document
                    .querySelectorAll(
                        "[data-difficulty]"
                    )
                    .forEach(
                        b =>
                            b.classList.remove(
                                "selected"
                            )
                    );


                    button.classList.add(
                        "selected"
                    );

                }
            );

        }
    );


    document
    .querySelector(
        '[data-difficulty="NORMAL"]'
    )
    .classList.add(
        "selected"
    );


    document
    .getElementById(
        "startConfiguredGame"
    )
    .addEventListener(
        "click",
        () => {

            panel.classList.remove(
                "active"
            );

            startGame(
                mode
            );

        }
    );

}


/* =========================================================
   ESTILOS PANEL JUGADORES
========================================================= */

function createSelectionStyles(){

    if(
        document.getElementById(
            "part7SelectionStyles"
        )
    )
        return;


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "part7SelectionStyles";


    style.textContent = `

        #selectionPanel {

            position:
                fixed;

            inset:
                0;

            display:
                none;

            align-items:
                center;

            justify-content:
                center;

            background:
                rgba(
                    0,
                    0,
                    0,
                    .8
                );

            z-index:
                10001;

        }


        #selectionPanel.active {

            display:
                flex;

        }


        .selection-box {

            width:
                min(
                    720px,
                    92vw
                );

            max-height:
                90vh;

            overflow:
                auto;

            padding:
                28px;

            border-radius:
                22px;

            background:
                #101820;

            color:
                white;

        }


        .selection-box h2 {

            text-align:
                center;

        }


        #playerOptions,
        #keeperOptions {

            display:
                grid;

            grid-template-columns:
                repeat(
                    auto-fit,
                    minmax(
                        130px,
                        1fr
                    )
                );

            gap:
                10px;

        }


        .player-option,
        .keeper-option,
        .difficulty-buttons button {

            padding:
                12px;

            border:
                1px solid
                rgba(
                    255,
                    255,
                    255,
                    .2
                );

            border-radius:
                12px;

            background:
                rgba(
                    255,
                    255,
                    255,
                    .08
                );

            color:
                white;

            cursor:
                pointer;

        }


        .player-option.selected,
        .keeper-option.selected,
        .difficulty-buttons button.selected {

            outline:
                2px solid
                #49ed83;

        }


        .difficulty-buttons {

            display:
                flex;

            gap:
                10px;

        }


        #startConfiguredGame {

            width:
                100%;

            margin-top:
                20px;

            padding:
                15px;

            border:
                0;

            border-radius:
                14px;

            background:
                #19b957;

            color:
                white;

            font-weight:
                bold;

            cursor:
                pointer;

        }

    `;


    document.head.appendChild(
        style
    );

}


createSelectionStyles();


/* =========================================================
   BOTONES PENALES / TIROS LIBRES
========================================================= */

document
.getElementById("playPenalty")
.addEventListener(
    "click",
    () => {

        mode =
            "penalty";

        openTeamPanel();

    }
);


document
.getElementById("playFreeKick")
.addEventListener(
    "click",
    () => {

        mode =
            "freekick";

        openTeamPanel();

    }
);


function openTeamPanel(){

    const panel =
        document.getElementById(
            "teamSelectionPanel"
        );


    panel.classList.add(
        "active"
    );

}


/* =========================================================
   INICIAR JUEGO
========================================================= */

function startGame(
    selectedMode
){

    mode =
        selectedMode;


    goals =
        0;


    opponentGoals =
        0;


    shots =
        0;


    opponentShots =
        0;


    isShooting =
        false;


    cameraX =
        0;


    cameraY =
        0;


    cameraShake =
        0;


    menu.classList.remove(
        "active"
    );


    tutorial.classList.remove(
        "active"
    );


    game.classList.add(
        "active"
    );


    document.getElementById(
        "score"
    ).textContent =
        "0";


    document.getElementById(
        "gameMode"
    ).textContent =
        mode === "penalty"
        ? "PENALES"
        : "TIROS LIBRES";


    wall.style.display =
        mode === "freekick"
        ? "flex"
        : "none";


    const curveUI =
        document.getElementById(
            "curveUI"
        );


    if(curveUI){

        curveUI.style.display =
            mode === "freekick"
            ? "block"
            : "none";

    }


    createBroadcastScore();

    createStadiumClock();

    applyTeamKit();

    createWall();

    resetScene();

    updateRound();

    updatePlayerDisplay();


    commentary(
        `${selectedTeam.name}: ${selectedPlayer.name} se prepara.`
    );

}


/* =========================================================
   CAMISETA
========================================================= */

function applyTeamKit(){

    if(!player)
        return;


    player.style.background =
        selectedTeam.primary;


    player.style.borderColor =
        selectedTeam.secondary;


    player.style.boxShadow =
        `
        0 0 0 4px
        ${selectedTeam.secondary}
        `;


    if(keeper){

        keeper.style.background =
            opponentTeam.primary;


        keeper.style.borderColor =
            opponentTeam.secondary;

    }

}


/* =========================================================
   MARCADOR TV
========================================================= */

function createBroadcastScore(){

    let score =
        document.getElementById(
            "broadcastScore"
        );


    if(!score){

        score =
            document.createElement(
                "div"
            );


        score.id =
            "broadcastScore";


        game.appendChild(
            score
        );

    }


    score.innerHTML = `

        <div class="broadcast-team">

            <div
                class="team-badge"
                style="
                    background:
                    ${selectedTeam.primary};
                ">
            </div>

            <span>
                ${selectedTeam.short}
            </span>

        </div>


        <div class="score-number">
            ${goals}
        </div>


        <span>
            -
        </span>


        <div class="score-number">
            ${opponentGoals}
        </div>


        <div class="broadcast-team">

            <span>
                ${opponentTeam.short}
            </span>

            <div
                class="team-badge"
                style="
                    background:
                    ${opponentTeam.primary};
                ">
            </div>

        </div>

    `;

}


/* =========================================================
   ACTUALIZAR MARCADOR TV
========================================================= */

function updateBroadcastScore(){

    const score =
        document.getElementById(
            "broadcastScore"
        );


    if(!score)
        return;


    score.querySelectorAll(
        ".score-number"
    )[0].textContent =
        goals;


    score.querySelectorAll(
        ".score-number"
    )[1].textContent =
        opponentGoals;

}


/* =========================================================
   RELOJ
========================================================= */

function createStadiumClock(){

    let clock =
        document.getElementById(
            "stadiumClock"
        );


    if(!clock){

        clock =
            document.createElement(
                "div"
            );


        clock.id =
            "stadiumClock";


        game.appendChild(
            clock
        );

    }


    clock.textContent =
        mode === "penalty"
        ? "PEN  •  00:00"
        : "FK  •  00:00";

}


/* =========================================================
   BARRERA
========================================================= */

function createWall(){

    wall.innerHTML =
        "";


    if(
        mode !== "freekick"
    )
        return;


    for(
        let i = 0;
        i < 5;
        i++
    ){

        const defender =
            document.createElement(
                "div"
            );


        defender.className =
            "wall-player";


        defender.style.background =
            opponentTeam.primary;


        defender.style.borderColor =
            opponentTeam.secondary;


        wall.appendChild(
            defender
        );

    }

}


/* =========================================================
   NOMBRE DEL JUGADOR
========================================================= */

function updatePlayerDisplay(){

    let display =
        document.getElementById(
            "playerNameDisplay"
        );


    if(!display){

        display =
            document.createElement(
                "div"
            );


        display.id =
            "playerNameDisplay";


        display.className =
            "player-name-display";


        display.style.position =
            "absolute";


        display.style.left =
            "50%";


        display.style.bottom =
            "5%";


        display.style.transform =
            "translateX(-50%)";


        display.style.padding =
            "8px 16px";


        display.style.borderRadius =
            "10px";


        display.style.background =
            "rgba(0,0,0,.65)";


        display.style.color =
            "white";


        display.style.fontWeight =
            "bold";


        display.style.zIndex =
            "30";


        game.appendChild(
            display
        );

    }


    display.textContent =
        `#${selectedPlayer.number}
         ${selectedPlayer.name}`;

}


/* =========================================================
   APUNTAR
========================================================= */

document.addEventListener(
    "mousemove",
    event => {

        mouseX =
            event.clientX;


        mouseY =
            event.clientY;


        if(
            aim &&
            !isShooting
        ){

            aim.style.left =
                mouseX + "px";


            aim.style.top =
                mouseY + "px";

        }

    }
);


/* =========================================================
   POTENCIA
========================================================= */

document
.getElementById("shootBtn")
.addEventListener(
    "mousedown",
    startPower
);


document
.getElementById("shootBtn")
.addEventListener(
    "mouseup",
    releasePower
);


document
.getElementById("shootBtn")
.addEventListener(
    "mouseleave",
    () => {

        if(charging)
            releasePower();

    }
);


document.addEventListener(
    "keydown",
    event => {

        if(
            event.code ===
            "Space"
        ){

            event.preventDefault();

            startPower();

        }

    }
);


document.addEventListener(
    "keyup",
    event => {

        if(
            event.code ===
            "Space"
        ){

            releasePower();

        }

    }
);


function startPower(){

    if(
        charging ||
        isShooting
    )
        return;


    charging =
        true;


    powerValue =
        0;


    powerDirection =
        1;


    animatePower();

}


function animatePower(){

    if(!charging)
        return;


    powerValue +=
        powerDirection *
        2;


    if(
        powerValue >=
        100
    ){

        powerValue =
            100;


        powerDirection =
            -1;

    }


    if(
        powerValue <=
        0
    ){

        powerValue =
            0;


        powerDirection =
            1;

    }


    if(powerBar){

        powerBar.style.width =
            powerValue +
            "%";

    }


    requestAnimationFrame(
        animatePower
    );

}


function releasePower(){

    if(!charging)
        return;


    charging =
        false;


    shoot();

}


/* =========================================================
   EFECTO
========================================================= */

if(curve){

    curve.addEventListener(
        "input",
        () => {

            curveValue =
                Number(
                    curve.value
                );

        }
    );

}


/* =========================================================
   DISPARO
========================================================= */

function shoot(){

    if(isShooting)
        return;


    isShooting =
        true;


    shots++;


    updateRound();


    animatePlayerKick();


    commentary(
        `${selectedPlayer.name} toma carrera...`
    );


    setTimeout(
        calculateShot,
        300
    );

}


/* =========================================================
   ANIMACIÓN
========================================================= */

function animatePlayerKick(){

    player.style.transition =
        "transform .15s ease";


    player.style.transform =
        "translateX(-50%) rotate(-7deg)";


    setTimeout(
        () => {

            player.style.transform =
                "translateX(-50%) rotate(14deg)";

        },
        130
    );


    setTimeout(
        () => {

            player.style.transform =
                "translateX(-50%) rotate(0deg)";

        },
        450
    );

}


/* =========================================================
   OBJETIVO
========================================================= */

function calculateShot(){

    const rect =
        field.getBoundingClientRect();


    let targetX =
        mouseX -
        rect.left;


    let targetY =
        mouseY -
        rect.top;


    let nx =
        (
            targetX -
            rect.width / 2
        )
        /
        (
            rect.width / 2
        );


    let ny =
        (
            targetY -
            rect.height * .28
        )
        /
        (
            rect.height * .60
        );


    nx =
        Math.max(
            -1,
            Math.min(
                1,
                nx
            )
        );


    ny =
        Math.max(
            -1,
            Math.min(
                1,
                ny
            )
        );


    const precision =
        selectedPlayer.precision /
        100;


    const error =
        (
            1 -
            precision
        ) * 45;


    nx +=
        (
            Math.random() -
            .5
        )
        *
        error /
        100;


    let finalX =
        rect.width / 2
        +
        nx *
        rect.width *
        .36;


    let finalY =
        rect.height *
        .08
        +
        ny *
        rect.height *
        .22;


    finalX =
        Math.max(
            rect.width *
            .23,
            Math.min(
                rect.width *
                .77,
                finalX
            )
        );


    finalY =
        Math.max(
            rect.height *
            .04,
            Math.min(
                rect.height *
                .32,
                finalY
            )
        );


    startPhysics(
        finalX,
        finalY,
        curveValue / 100,
        rect
    );

}


/* =========================================================
   FÍSICA
========================================================= */

function startPhysics(
    targetX,
    targetY,
    curveAmount,
    rect
){

    const startX =
        rect.width / 2;


    const startY =
        rect.height * .78;


    const dx =
        targetX -
        startX;


    const dy =
        targetY -
        startY;


    const power =
        powerValue /
        100;


    const playerPower =
        selectedPlayer.power /
        100;


    const speed =
        7 +
        power *
        14 *
        (
            .85 +
            playerPower *
            .25
        );


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
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
            10
        );


    physics.curve =
        curveAmount *
        (
            .035 +
            power *
            .075
        )
        *
        (
            .8 +
            (
                selectedPlayer.curve /
                100
            ) *
            .3
        );


    physics.gravity =
        .17 +
        power *
        .045;


    physics.rotation =
        0;


    physics.rotationSpeed =
        15 +
        power *
        30;


    physics.active =
        true;


    physics.time =
        0;


    physics.duration =
        1200 +
        power *
        700;


    physics.rect =
        rect;


    requestAnimationFrame(
        updatePhysics
    );

}


/* =========================================================
   ACTUALIZAR FÍSICA
========================================================= */

function updatePhysics(){

    if(
        !physics.active
    )
        return;


    physics.time +=
        16;


    physics.vy +=
        physics.gravity;


    physics.vx +=
        physics.curve;


    physics.x +=
        physics.vx;


    physics.y +=
        physics.vy;


    physics.vx *=
        .986;


    physics.rotation +=
        physics.rotationSpeed;


    let scale =
        1 +
        Math.max(
            0,
            -physics.vy
        )
        *
        .025;


    scale =
        Math.max(
            .75,
            Math.min(
                1.35,
                scale
            )
        );


    ball.style.left =
        physics.x -
        14 +
        "px";


    ball.style.top =
        physics.y -
        14 +
        "px";


    ball.style.transform =
        `
        scale(${scale})
        rotate(${physics.rotation}deg)
        `;


    updateCamera();


    if(
        Math.random() <
        .3
    ){

        createTrailParticle(
            physics.x,
            physics.y
        );

    }


    if(
        mode ===
        "freekick"
    ){

        detectWallCollision();

    }


    if(
        physics.y <=
        physics.rect.height *
        .055
        ||
        physics.time >
        physics.duration
    ){

        finishPhysics();

        return;

    }


    requestAnimationFrame(
        updatePhysics
    );

}


/* =========================================================
   CÁMARA
========================================================= */

function updateCamera(){

    const rect =
        physics.rect;


    const desiredX =
        (
            rect.width / 2 -
            physics.x
        )
        *
        .035;


    const desiredY =
        (
            rect.height *
            .55 -
            physics.y
        )
        *
        .035;


    cameraX +=
        (
            desiredX -
            cameraX
        )
        *
        .12;


    cameraY +=
        (
            desiredY -
            cameraY
        )
        *
        .12;


    if(
        cameraShake >
        0
    ){

        cameraX +=
            (
                Math.random() -
                .5
            )
            *
            cameraShake;


        cameraY +=
            (
                Math.random() -
                .5
            )
            *
            cameraShake;


        cameraShake *=
            .88;

    }


    field.style.transform =
        `
        translate(
            ${cameraX}px,
            ${cameraY}px
        )
        `;

}


/* =========================================================
   BARRERA
========================================================= */

function detectWallCollision(){

    if(wallJumping)
        return;


    const rect =
        physics.rect;


    const wallY =
        rect.height *
        .57;


    const verticalDistance =
        Math.abs(
            physics.y -
            wallY
        );


    const horizontalDistance =
        Math.abs(
            physics.x -
            rect.width / 2
        );


    if(
        verticalDistance <
        30
        &&
        horizontalDistance <
        rect.width *
        .24
    ){

        if(
            Math.random() <
            .24
        ){

            wallCollision();

        }

    }

}


function wallCollision(){

    wallJumping =
        true;


    physics.vy =
        -Math.abs(
            physics.vy
        )
        *
        .58;


    physics.vx *=
        .45;


    cameraShake =
        8;


    animateWallJump();


    commentary(
        "¡La barrera bloquea el disparo!"
    );


    showMessage(
        "🧱 ¡BARRERA!"
    );


    setTimeout(
        () => {

            wallJumping =
                false;

        },
        500
    );

}


function animateWallJump(){

    document
    .querySelectorAll(
        ".wall-player"
    )
    .forEach(
        (
            person,
            index
        ) => {

            setTimeout(
                () => {

                    person.style.transform =
                        "translateY(-28px)";

                },
                index *
                35
            );


            setTimeout(
                () => {

                    person.style.transform =
                        "translateY(0)";

                },
                420 +
                index *
                35
            );

        }
    );

}


/* =========================================================
   ESTELA
========================================================= */

function createTrailParticle(
    x,
    y
){

    const particle =
        document.createElement(
            "div"
        );


    particle.style.position =
        "absolute";


    particle.style.left =
        x + "px";


    particle.style.top =
        y + "px";


    particle.style.width =
        "5px";


    particle.style.height =
        "5px";


    particle.style.borderRadius =
        "50%";


    particle.style.background =
        "rgba(255,255,255,.3)";


    particle.style.pointerEvents =
        "none";


    particle.style.zIndex =
        "3";


    field.appendChild(
        particle
    );


    let opacity =
        1;


    function fade(){

        opacity -=
            .07;


        particle.style.opacity =
            opacity;


        if(
            opacity <=
            0
        ){

            particle.remove();

            return;

        }


        requestAnimationFrame(
            fade
        );

    }


    fade();

}


/* =========================================================
   FINAL FÍSICA
========================================================= */

function finishPhysics(){

    physics.active =
        false;


    cameraShake =
        4;


    goalkeeperDecision();

}


/* =========================================================
   ARQUERO
========================================================= */

function goalkeeperDecision(){

    const rect =
        physics.rect;


    const x =
        physics.x /
        rect.width;


    const distance =
        Math.abs(
            x -
            .5
        );


    let saveChance =
        selectedKeeper.reflexes /
        220;


    if(
        difficulty ===
        "EASY"
    ){

        saveChance -=
            .15;

    }


    if(
        difficulty ===
        "HARD"
    ){

        saveChance +=
            .15;

    }


    if(
        distance <
        .10
    ){

        saveChance +=
            .25;

    }


    if(
        distance >
        .34
    ){

        saveChance -=
            .22;

    }


    saveChance -=
        powerValue /
        350;


    saveChance -=
        Math.abs(
            curveValue
        ) /
        650;


    saveChance =
        Math.max(
            .04,
            Math.min(
                .80,
                saveChance
            )
        );


    const saved =
        Math.random() <
        saveChance;


    let direction;


    if(
        x <
        .43
    ){

        direction =
            -1;

    }
    else if(
        x >
        .57
    ){

        direction =
            1;

    }
    else{

        direction =
            Math.random() <
            .5
            ? -1
            : 1;

    }


    animateKeeper(
        direction
    );


    setTimeout(
        () => {

            if(saved){

                showMessage(
                    "🧤 ¡ATAJADÓN!"
                );


                commentary(
                    `¡${selectedKeeper.name} salva a ${opponentTeam.name}!`
                );


                cameraShake =
                    9;

            }
            else{

                scoreGoal();

            }


            setTimeout(
                finishShot,
                700
            );

        },
        500
    );

}


/* =========================================================
   ANIMAR ARQUERO
========================================================= */

function animateKeeper(
    direction
){

    keeper.style.transition =
        "left .45s cubic-bezier(.2,.8,.2,1), transform .45s ease";


    keeper.style.left =
        `calc(
            50% +
            ${direction * 32}%
        )`;


    keeper.style.transform =
        `
        translateX(-50%)
        rotate(${direction * -28}deg)
        scaleX(${direction})
        `;

}


/* =========================================================
   GOL
========================================================= */

function scoreGoal(){

    goals++;


    document.getElementById(
        "score"
    ).textContent =
        goals;


    updateBroadcastScore();


    cameraShake =
        14;


    showMessage(
        "⚽ ¡GOOOOOOOL!"
    );


    commentary(
        `¡GOOOOOOOL DE ${selectedPlayer.name.toUpperCase()} PARA ${selectedTeam.name.toUpperCase()}!`
    );


    celebrate();


    const net =
        document.getElementById(
            "net"
        );


    if(net){

        net.style.transform =
            "scale(1.18)";


        setTimeout(
            () => {

                net.style.transform =
                    "scale(1)";

            },
            400
        );

    }

}


/* =========================================================
   CELEBRACIÓN
========================================================= */

function celebrate(){

    player.style.transition =
        "transform .25s ease";


    player.style.transform =
        `
        translateX(-50%)
        translateY(-18px)
        rotate(15deg)
        `;


    createConfetti();


    setTimeout(
        () => {

            player.style.transform =
                "translateX(-50%)";

        },
        650
    );

}


/* =========================================================
   CONFETI
========================================================= */

function createConfetti(){

    for(
        let i = 0;
        i < 35;
        i++
    ){

        const piece =
            document.createElement(
                "div"
            );


        piece.style.position =
            "fixed";


        piece.style.left =
            "50%";


        piece.style.top =
            "42%";


        piece.style.width =
            "7px";


        piece.style.height =
            "12px";


        piece.style.background =
            selectedTeam.primary;


        piece.style.zIndex =
            "9999";


        piece.style.pointerEvents =
            "none";


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            80 +
            Math.random() *
            250;


        const dx =
            Math.cos(angle) *
            distance;


        const dy =
            Math.sin(angle) *
            distance;


        document.body.appendChild(
            piece
        );


        piece.animate(
            [
                {
                    transform:
                        "translate(0,0) rotate(0deg)",
                    opacity: 1
                },

                {
                    transform:
                        `
                        translate(
                            ${dx}px,
                            ${dy}px
                        )
                        rotate(
                            ${Math.random() * 600}deg
                        )
                        `,
                    opacity: 0
                }
            ],
            {
                duration:
                    900 +
                    Math.random() *
                    700
            }
        );


        setTimeout(
            () => {

                piece.remove();

            },
            1800
        );

    }

}


/* =========================================================
   MENSAJES
========================================================= */

function showMessage(
    text
){

    if(!message)
        return;


    message.textContent =
        text;


    message.classList.add(
        "show"
    );


    setTimeout(
        () => {

            message.classList.remove(
                "show"
            );

        },
        1300
    );

}


/* =========================================================
   RELATOR
========================================================= */

function commentary(
    text
){

    clearTimeout(
        commentaryTimer
    );


    let commentator =
        document.getElementById(
            "commentator"
        );


    if(!commentator){

        commentator =
            document.createElement(
                "div"
            );


        commentator.id =
            "commentator";


        commentator.style.position =
            "fixed";


        commentator.style.left =
            "50%";


        commentator.style.bottom =
            "25px";


        commentator.style.transform =
            "translateX(-50%)";


        commentator.style.padding =
            "12px 22px";


        commentator.style.borderRadius =
            "14px";


        commentator.style.background =
            "rgba(0,0,0,.72)";


        commentator.style.color =
            "white";


        commentator.style.fontFamily =
            "Arial,sans-serif";


        commentator.style.fontSize =
            "18px";


        commentator.style.fontWeight =
            "700";


        commentator.style.zIndex =
            "9999";


        commentator.style.opacity =
            "0";


        commentator.style.transition =
            "opacity .25s ease";


        document.body.appendChild(
            commentator
        );

    }


    commentator.textContent =
        "🎙️ " +
        text;


    commentator.style.opacity =
        "1";


    commentaryTimer =
        setTimeout(
            () => {

                commentator.style.opacity =
                    "0";

            },
            2200
        );

}


/* =========================================================
   RONDA
========================================================= */

function updateRound(){

    const roundText =
        document.getElementById(
            "roundText"
        );


    if(roundText){

        roundText.textContent =
            `TIRO ${shots + 1} / ${maxShots}`;

    }

}


/* =========================================================
   RESET
========================================================= */

function resetScene(){

    physics.active =
        false;


    wallJumping =
        false;


    cameraX =
        0;


    cameraY =
        0;


    cameraShake =
        0;


    const rect =
        field.getBoundingClientRect();


    field.style.transform =
        "translate(0,0)";


    ball.style.left =
        rect.width / 2 -
        14 +
        "px";


    ball.style.top =
        rect.height * .78 -
        14 +
        "px";


    ball.style.transform =
        "scale(1)";


    keeper.style.left =
        "50%";


    keeper.style.transform =
        "translateX(-50%)";


    player.style.transform =
        "translateX(-50%)";


    powerValue =
        0;


    if(powerBar){

        powerBar.style.width =
            "0%";

    }


    document
    .querySelectorAll(
        ".wall-player"
    )
    .forEach(
        person => {

            person.style.transform =
                "translateY(0)";

        }
    );

}


/* =========================================================
   FINAL
========================================================= */

function finishShot(){

    if(
        shots >=
        maxShots
    ){

        showResult();

        return;

    }


    resetScene();


    isShooting =
        false;


    updateRound();


    commentary(
        `Preparando el tiro ${shots + 1}...`
    );

}


/* =========================================================
   RESULTADO
========================================================= */

function showResult(){

    if(!resultPanel)
        return;


    resultPanel.classList.add(
        "show"
    );


    if(
        goals >
        opponentGoals
    ){

        resultTitle.textContent =
            "🏆 ¡VICTORIA!";


        resultText.textContent =
            `
            ${selectedTeam.name}
            ${goals}
            -
            ${opponentGoals}
            ${opponentTeam.name}
            `;


        commentary(
            `¡${selectedTeam.name} gana la tanda!`
        );

    }
    else if(
        goals ===
        opponentGoals
    ){

        resultTitle.textContent =
            "🤝 ¡EMPATE!";


        resultText.textContent =
            `
            ${selectedTeam.name}
            ${goals}
            -
            ${opponentGoals}
            ${opponentTeam.name}
            `;

    }
    else{

        resultTitle.textContent =
            "❌ DERROTA";


        resultText.textContent =
            `
            ${selectedTeam.name}
            ${goals}
            -
            ${opponentGoals}
            ${opponentTeam.name}
            `;

    }

}


/* =========================================================
   MENÚ
========================================================= */

function returnMenu(){

    physics.active =
        false;


    isShooting =
        false;


    game.classList.remove(
        "active"
    );


    resultPanel.classList.remove(
        "show"
    );


    menu.classList.add(
        "active"
    );

}


document
.getElementById("menuBtn")
.addEventListener(
    "click",
    returnMenu
);


document
.getElementById("resultMenuBtn")
.addEventListener(
    "click",
    returnMenu
);


/* =========================================================
   JUGAR DE NUEVO
========================================================= */

document
.getElementById("againBtn")
.addEventListener(
    "click",
    () => {

        resultPanel.classList.remove(
            "show"
        );


        startGame(
            mode
        );

    }
);


/* =========================================================
   TUTORIAL
========================================================= */

const tutorialPages = [

    {
        title:
            "1. APUNTAR",

        text:
            "Mové el mouse para elegir dónde querés patear."
    },

    {
        title:
            "2. POTENCIA",

        text:
            "Mantené ESPACIO o el botón PATEAR y soltalo para elegir la potencia."
    },

    {
        title:
            "3. EFECTO",

        text:
            "En los tiros libres podés utilizar el control de efecto para curvar la pelota."
    },

    {
        title:
            "4. EQUIPOS",

        text:
            "Elegí tu selección, jugador y arquero rival antes de comenzar."
    },

    {
        title:
            "5. GANÁ LA TANDA",

        text:
            "Marcá más goles que tu rival para conseguir la victoria."
    }

];


let tutorialPage =
    0;


function updateTutorial(){

    const page =
        tutorialPages[
            tutorialPage
        ];


    tutorialContent.innerHTML =
        `
        <div class="tutorial-step">

            <h2>
                ${page.title}
            </h2>

            <p>
                ${page.text}
            </p>

        </div>

        <p>
            Página
            ${tutorialPage + 1}
            de
            ${tutorialPages.length}
        </p>
        `;


    tutorialNext.textContent =
        tutorialPage ===
        tutorialPages.length - 1
        ? "EMPEZAR"
        : "SIGUIENTE";

}


tutorialNext.addEventListener(
    "click",
    () => {

        if(
            tutorialPage <
            tutorialPages.length - 1
        ){

            tutorialPage++;

            updateTutorial();

        }
        else{

            tutorial.classList.remove(
                "active"
            );

            menu.classList.add(
                "active"
            );

        }

    }
);


document
.getElementById(
    "tutorialBtn"
)
.addEventListener(
    "click",
    () => {

        tutorialPage =
            0;


        updateTutorial();


        menu.classList.remove(
            "active"
        );


        tutorial.classList.add(
            "active"
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

        tutorial.classList.remove(
            "active"
        );


        menu.classList.add(
            "active"
        );

    }
);


/* =========================================================
   INICIO
========================================================= */

updateTutorial();


console.log(
    "ULTIMATE FOOTBALL — PARTE 7 CARGADA"
);
