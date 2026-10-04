/* =========================================================
   LOVE ARCADE
   GAME 01 — LOVE INVADERS
   Versión móvil simplificada
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const arcadeScreen =
        document.getElementById("arcade-screen");

    const gameScreen =
        document.getElementById("love-invaders-screen");

    const gameButton =
        document.getElementById("game-1-button");

    const gameModal =
        document.getElementById("arcade-game-modal");

    const backButton =
        document.getElementById("back-from-love-invaders");


    const intro =
        document.getElementById("invaders-intro");

    const gameSection =
        document.getElementById("invaders-game-section");

    const victoryScreen =
        document.getElementById("invaders-victory");


    const board =
        document.getElementById("invaders-game-board");

    const ship =
        document.getElementById("love-ship");

    const enemiesContainer =
        document.getElementById("invaders-enemies");

    const projectilesContainer =
        document.getElementById("invaders-projectiles");

    const readyMessage =
        document.getElementById("invaders-ready-message");


    const scoreElement =
        document.getElementById("invaders-score");

    const lovePowerFill =
        document.getElementById("love-power-fill");

    const finalScoreElement =
        document.getElementById("invaders-final-score");


    const leftButton =
        document.getElementById("invaders-left");

    const rightButton =
        document.getElementById("invaders-right");

    const fireButton =
        document.getElementById("invaders-fire");


    const secretButton =
        document.getElementById("invaders-secret-button");

    const returnArcadeButton =
        document.getElementById("invaders-return-arcade");

    const secretModal =
        document.getElementById("invaders-secret-modal");

    const secretClose =
        document.getElementById("invaders-secret-close");

    const secretContinue =
        document.getElementById("invaders-secret-continue");


    /* =====================================================
       COMPROBACIÓN
       ===================================================== */

    if (
        !arcadeScreen ||
        !gameScreen ||
        !gameButton ||
        !gameSection ||
        !board ||
        !ship ||
        !enemiesContainer ||
        !projectilesContainer
    ) {

        console.error(
            "LOVE INVADERS: faltan elementos HTML."
        );

        return;
    }


    /* =====================================================
       CONFIGURACIÓN
       ===================================================== */

    const TOTAL_ENEMIES = 20;

    const ENEMIES_PER_WAVE = 5;

    const SHIP_SPEED = 0.85;

    const PROJECTILE_SPEED = 0.95;

    const FIRE_INTERVAL = 550;


    /* =====================================================
       ESTADO
       ===================================================== */

    let running = false;

    let finished = false;

    let score = 0;

    let destroyed = 0;

    let spawned = 0;

    let shipX = 50;

    let movingLeft = false;

    let movingRight = false;

    let enemies = [];

    let projectiles = [];

    let animationId = null;

    let autoFireTimer = null;

    let waveTimer = null;

    let startTimer = null;


    /* =====================================================
       UTILIDADES DE PANTALLA
       ===================================================== */

    function unlockPageScroll() {

        document.documentElement.style.overflow = "";
        document.documentElement.style.overflowY = "auto";

        document.body.style.overflow = "";
        document.body.style.overflowY = "auto";
        document.body.style.height = "auto";

    }


    function prepareGameLayout() {

        gameScreen.classList.remove(
            "victory-mode"
        );

        gameScreen.classList.add(
            "playing-mode"
        );


        gameScreen.style.height = "";
        gameScreen.style.maxHeight = "";
        gameScreen.style.minHeight = "";
        gameScreen.style.overflow = "";
        gameScreen.style.overflowX = "";
        gameScreen.style.overflowY = "";


        if (victoryScreen) {

            victoryScreen.classList.remove(
                "visible"
            );

            victoryScreen.style.display = "";

        }


        gameSection.style.display = "";

    }


    function prepareVictoryLayout() {

        /*
         * Dejamos de estar en modo juego.
         */

        gameScreen.classList.remove(
            "playing-mode"
        );

        gameScreen.classList.add(
            "victory-mode"
        );


        /*
         * El tablero desaparece completamente.
         */

        gameSection.classList.remove(
            "visible"
        );

        gameSection.style.display =
            "none";


        /*
         * La pantalla deja de tener una altura fija.
         * Ahora puede crecer todo lo que necesite.
         */

        gameScreen.style.height =
            "auto";

        gameScreen.style.maxHeight =
            "none";

        gameScreen.style.minHeight =
            "100svh";

        gameScreen.style.overflowX =
            "hidden";

        gameScreen.style.overflowY =
            "visible";


        /*
         * Liberamos también HTML y BODY.
         */

        unlockPageScroll();


        /*
         * Mostramos victoria.
         */

        if (victoryScreen) {

            victoryScreen.style.display =
                "flex";

            victoryScreen.classList.add(
                "visible"
            );

        }


        /*
         * Arriba de la pantalla de victoria.
         */

        requestAnimationFrame(() => {

            window.scrollTo(
                0,
                0
            );

        });

    }


    /* =====================================================
       ABRIR JUEGO
       ===================================================== */

    function openGame() {

        stopGame();

        prepareGameLayout();


        /*
         * Cerramos el modal temporal
         * del Arcade.
         */

        if (gameModal) {

            gameModal.classList.remove(
                "visible"
            );

        }


        /*
         * Ocultamos Arcade.
         */

        arcadeScreen.classList.remove(
            "visible"
        );

        arcadeScreen.style.display =
            "none";


        /*
         * Mostramos Love Invaders.
         */

        gameScreen.style.display =
            "block";

        gameScreen.classList.add(
            "visible"
        );


        /*
         * La introducción ya no se usa.
         */

        if (intro) {

            intro.style.display =
                "none";

        }


        /*
         * Mostramos directamente
         * la zona jugable.
         */

        gameSection.style.display =
            "";

        gameSection.classList.add(
            "visible"
        );


        window.scrollTo(
            0,
            0
        );


        /*
         * Esperamos a que el navegador
         * calcule el tamaño del tablero.
         */

        startTimer =
            setTimeout(() => {

                resetGame();

                startGame();

            }, 100);

    }


    /* =====================================================
       VOLVER AL ARCADE
       ===================================================== */

    function returnToArcade() {

        stopGame();


        secretModal?.classList.remove(
            "visible"
        );


        prepareGameLayout();

        unlockPageScroll();


        /*
         * Ocultamos juego.
         */

        gameScreen.classList.remove(
            "visible"
        );

        gameScreen.style.display =
            "none";


        /*
         * Restauramos Arcade.
         */

        arcadeScreen.style.display =
            "block";

        arcadeScreen.classList.add(
            "visible"
        );


        window.scrollTo(
            0,
            0
        );

    }


    /* =====================================================
       BOTÓN GAME 01
       ===================================================== */

    gameButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            openGame();

        }
    );


    backButton?.addEventListener(
        "click",
        returnToArcade
    );


    returnArcadeButton?.addEventListener(
        "click",
        returnToArcade
    );


    /* =====================================================
       RESET
       ===================================================== */

    function resetGame() {

        stopGame();


        running = false;

        finished = false;

        score = 0;

        destroyed = 0;

        spawned = 0;

        shipX = 50;

        movingLeft = false;

        movingRight = false;

        enemies = [];

        projectiles = [];


        /*
         * Limpiamos elementos de
         * la partida anterior.
         */

        enemiesContainer.innerHTML =
            "";

        projectilesContainer.innerHTML =
            "";


        ship.style.left =
            "50%";


        if (scoreElement) {

            scoreElement.textContent =
                "0000";

        }


        if (lovePowerFill) {

            lovePowerFill.style.width =
                "0%";

        }


        readyMessage?.classList.remove(
            "hidden"
        );

    }


    /* =====================================================
       INICIAR
       ===================================================== */

    function startGame() {

        readyMessage?.classList.remove(
            "hidden"
        );


        startTimer =
            setTimeout(() => {

                if (finished) {
                    return;
                }


                readyMessage?.classList.add(
                    "hidden"
                );


                running = true;


                spawnWave();


                /*
                 * DISPARO AUTOMÁTICO.
                 */

                autoFireTimer =
                    setInterval(() => {

                        if (running) {

                            fire();

                        }

                    }, FIRE_INTERVAL);


                gameLoop();

            }, 850);

    }


    /* =====================================================
       DETENER
       ===================================================== */

    function stopGame() {

        running = false;

        movingLeft = false;

        movingRight = false;


        if (animationId) {

            cancelAnimationFrame(
                animationId
            );

            animationId = null;

        }


        if (autoFireTimer) {

            clearInterval(
                autoFireTimer
            );

            autoFireTimer = null;

        }


        if (waveTimer) {

            clearTimeout(
                waveTimer
            );

            waveTimer = null;

        }


        if (startTimer) {

            clearTimeout(
                startTimer
            );

            startTimer = null;

        }

    }


    /* =====================================================
       ENEMIGOS
       ===================================================== */

    function spawnWave() {

        if (
            !running ||
            finished ||
            spawned >= TOTAL_ENEMIES
        ) {
            return;
        }


        const remaining =
            TOTAL_ENEMIES - spawned;


        const amount =
            Math.min(
                ENEMIES_PER_WAVE,
                remaining
            );


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const spacing =
                100 / (amount + 1);


            createEnemy(
                spacing * (i + 1),
                -5 - Math.random() * 8
            );

        }


        spawned += amount;

    }


    function createEnemy(
        x,
        y
    ) {

        const element =
            document.createElement(
                "div"
            );


        element.className =
            "love-enemy";


        /*
         * Pixel art 5 x 4.
         */

        const pattern = [

            0, 1, 0, 1, 0,

            1, 1, 1, 1, 1,

            1, 0, 1, 0, 1,

            0, 1, 0, 1, 0

        ];


        pattern.forEach(
            (pixel) => {

                const span =
                    document.createElement(
                        "span"
                    );


                if (!pixel) {

                    span.classList.add(
                        "empty"
                    );

                }


                element.appendChild(
                    span
                );

            }
        );


        enemiesContainer.appendChild(
            element
        );


        const enemy = {

            element,

            x,

            y,

            speed:
                0.055 +
                Math.random() * 0.025,

            direction:
                Math.random() > 0.5
                    ? 1
                    : -1,

            horizontalSpeed:
                0.025,

            alive:
                true

        };


        enemies.push(
            enemy
        );


        positionEnemy(
            enemy
        );

    }


    function positionEnemy(
        enemy
    ) {

        enemy.element.style.left =
            `${enemy.x}%`;

        enemy.element.style.top =
            `${enemy.y}%`;

        enemy.element.style.transform =
            "translate(-50%, -50%)";

    }


    /* =====================================================
       MOVIMIENTO DE ENEMIGOS
       ===================================================== */

    function updateEnemies() {

        enemies.forEach(
            (enemy) => {

                if (!enemy.alive) {
                    return;
                }


                enemy.y +=
                    enemy.speed;


                enemy.x +=
                    enemy.horizontalSpeed *
                    enemy.direction;


                /*
                 * Rebote lateral.
                 */

                if (enemy.x <= 7) {

                    enemy.x = 7;

                    enemy.direction = 1;

                }


                if (enemy.x >= 93) {

                    enemy.x = 93;

                    enemy.direction = -1;

                }


                /*
                 * VIDAS INFINITAS.
                 *
                 * Si un invasor llega abajo,
                 * reaparece arriba.
                 */

                if (enemy.y > 95) {

                    enemy.y =
                        -5 -
                        Math.random() * 10;


                    enemy.x =
                        10 +
                        Math.random() * 80;

                }


                positionEnemy(
                    enemy
                );

            }
        );


        enemies =
            enemies.filter(
                enemy =>
                    enemy.alive
            );

    }


    /* =====================================================
       NAVE
       ===================================================== */

    function updateShip() {

        if (movingLeft) {

            shipX -=
                SHIP_SPEED;

        }


        if (movingRight) {

            shipX +=
                SHIP_SPEED;

        }


        shipX =
            Math.max(
                7,
                Math.min(
                    93,
                    shipX
                )
            );


        ship.style.left =
            `${shipX}%`;

    }


    /* =====================================================
       DISPARO AUTOMÁTICO
       ===================================================== */

    function fire() {

        if (
            !running ||
            finished
        ) {
            return;
        }


        const element =
            document.createElement(
                "div"
            );


        element.className =
            "love-projectile";


        projectilesContainer.appendChild(
            element
        );


        const projectile = {

            element,

            x:
                shipX,

            y:
                87,

            alive:
                true

        };


        projectiles.push(
            projectile
        );


        positionProjectile(
            projectile
        );

    }


    function positionProjectile(
        projectile
    ) {

        projectile.element.style.left =
            `${projectile.x}%`;

        projectile.element.style.top =
            `${projectile.y}%`;

        projectile.element.style.transform =
            "translate(-50%, -50%)";

    }


    function updateProjectiles() {

        projectiles.forEach(
            (projectile) => {

                if (!projectile.alive) {
                    return;
                }


                projectile.y -=
                    PROJECTILE_SPEED;


                if (
                    projectile.y < -5
                ) {

                    removeProjectile(
                        projectile
                    );

                    return;

                }


                positionProjectile(
                    projectile
                );

            }
        );


        projectiles =
            projectiles.filter(
                projectile =>
                    projectile.alive
            );

    }


    function removeProjectile(
        projectile
    ) {

        if (!projectile.alive) {
            return;
        }


        projectile.alive =
            false;


        projectile.element.remove();

    }


    /* =====================================================
       COLISIONES
       ===================================================== */

    function checkCollisions() {

        projectiles.forEach(
            (projectile) => {

                if (!projectile.alive) {
                    return;
                }


                const shotRect =
                    projectile.element
                        .getBoundingClientRect();


                enemies.forEach(
                    (enemy) => {

                        if (
                            !enemy.alive ||
                            !projectile.alive
                        ) {
                            return;
                        }


                        const enemyRect =
                            enemy.element
                                .getBoundingClientRect();


                        const collision =
                            !(
                                shotRect.right <
                                    enemyRect.left ||

                                shotRect.left >
                                    enemyRect.right ||

                                shotRect.bottom <
                                    enemyRect.top ||

                                shotRect.top >
                                    enemyRect.bottom
                            );


                        if (collision) {

                            destroyEnemy(
                                enemy
                            );


                            removeProjectile(
                                projectile
                            );

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       DESTRUIR ENEMIGO
       ===================================================== */

    function destroyEnemy(
        enemy
    ) {

        if (
            !enemy.alive ||
            finished
        ) {
            return;
        }


        enemy.alive =
            false;


        enemy.element.classList.add(
            "hit"
        );


        score += 100;

        destroyed++;


        updateHUD();


        setTimeout(() => {

            enemy.element.remove();

        }, 180);


        /*
         * VICTORIA.
         */

        if (
            destroyed >=
            TOTAL_ENEMIES
        ) {

            finishGame();

            return;

        }


        /*
         * Si eliminamos toda la oleada,
         * cargamos la siguiente.
         */

        const living =
            enemies.filter(
                currentEnemy =>
                    currentEnemy.alive
            ).length;


        if (
            living === 0 &&
            spawned < TOTAL_ENEMIES
        ) {

            waveTimer =
                setTimeout(
                    spawnWave,
                    450
                );

        }

    }


    /* =====================================================
       HUD
       ===================================================== */

    function updateHUD() {

        if (scoreElement) {

            scoreElement.textContent =
                String(score)
                    .padStart(
                        4,
                        "0"
                    );

        }


        if (lovePowerFill) {

            const percentage =
                (
                    destroyed /
                    TOTAL_ENEMIES
                ) * 100;


            lovePowerFill.style.width =
                `${percentage}%`;

        }

    }


    /* =====================================================
       LOOP PRINCIPAL
       ===================================================== */

    function gameLoop() {

        if (
            !running ||
            finished
        ) {
            return;
        }


        updateShip();

        updateEnemies();

        updateProjectiles();

        checkCollisions();


        animationId =
            requestAnimationFrame(
                gameLoop
            );

    }


    /* =====================================================
       VICTORIA
       ===================================================== */

    function finishGame() {

        if (finished) {
            return;
        }


        finished =
            true;


        stopGame();


        /*
         * Bonus por completar.
         */

        score += 500;


        if (finalScoreElement) {

            finalScoreElement.textContent =
                String(score)
                    .padStart(
                        4,
                        "0"
                    );

        }


        /*
         * GAME 01 COMPLETADO.
         *
         * completeGame() está definido
         * en app.js.
         */

        if (
            typeof completeGame ===
            "function"
        ) {

            completeGame(1);

        }


        /*
         * Cambiamos completamente
         * del modo juego al modo victoria.
         */

        setTimeout(() => {

            prepareVictoryLayout();

        }, 400);

    }


    /* =====================================================
       CONTROLES MÓVILES
       ===================================================== */

    function pressLeft(
        event
    ) {

        event.preventDefault();

        if (!running) {
            return;
        }


        movingLeft =
            true;

    }


    function pressRight(
        event
    ) {

        event.preventDefault();

        if (!running) {
            return;
        }


        movingRight =
            true;

    }


    function releaseMovement(
        event
    ) {

        if (event) {

            /*
             * Solo evitamos la acción por defecto
             * si estamos jugando.
             *
             * Así no bloqueamos accidentalmente
             * el scroll de la pantalla de victoria.
             */

            if (running) {

                event.preventDefault();

            }

        }


        movingLeft =
            false;

        movingRight =
            false;

    }


    leftButton?.addEventListener(
        "pointerdown",
        pressLeft
    );


    rightButton?.addEventListener(
        "pointerdown",
        pressRight
    );


    leftButton?.addEventListener(
        "pointerup",
        releaseMovement
    );


    rightButton?.addEventListener(
        "pointerup",
        releaseMovement
    );


    leftButton?.addEventListener(
        "pointercancel",
        releaseMovement
    );


    rightButton?.addEventListener(
        "pointercancel",
        releaseMovement
    );


    /*
     * Si se suelta fuera del botón,
     * detenemos el movimiento.
     *
     * IMPORTANTE:
     * aquí ya NO hacemos preventDefault()
     * globalmente.
     */

    window.addEventListener(
        "pointerup",
        () => {

            movingLeft =
                false;

            movingRight =
                false;

        }
    );


    /*
     * FIRE ya no se utiliza.
     */

    if (fireButton) {

        fireButton.style.display =
            "none";

    }


    /* =====================================================
       TECLADO PARA PRUEBAS EN PC
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (!running) {
                return;
            }


            const key =
                event.key.toLowerCase();


            if (
                key === "arrowleft" ||
                key === "a"
            ) {

                event.preventDefault();

                movingLeft =
                    true;

            }


            if (
                key === "arrowright" ||
                key === "d"
            ) {

                event.preventDefault();

                movingRight =
                    true;

            }

        }
    );


    document.addEventListener(
        "keyup",
        (event) => {

            const key =
                event.key.toLowerCase();


            if (
                key === "arrowleft" ||
                key === "a"
            ) {

                movingLeft =
                    false;

            }


            if (
                key === "arrowright" ||
                key === "d"
            ) {

                movingRight =
                    false;

            }

        }
    );


    /* =====================================================
       SECRETO
       ===================================================== */

    secretButton?.addEventListener(
        "click",
        () => {

            secretModal?.classList.add(
                "visible"
            );

        }
    );


    function closeSecret() {

        secretModal?.classList.remove(
            "visible"
        );

    }


    secretClose?.addEventListener(
        "click",
        closeSecret
    );


    secretContinue?.addEventListener(
        "click",
        closeSecret
    );


    /*
     * Cerrar tocando fuera.
     */

    secretModal?.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                secretModal
            ) {

                closeSecret();

            }

        }
    );


    /* =====================================================
       ESCAPE
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !==
                "Escape"
            ) {
                return;
            }


            if (
                secretModal?.classList
                    .contains("visible")
            ) {

                closeSecret();

                return;

            }


            if (
                gameScreen.classList
                    .contains("visible")
            ) {

                returnToArcade();

            }

        }
    );

});

/* =========================================================
   LOVE ARCADE
   GAME 02 — LOVE MAZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const arcadeScreen =
        document.getElementById("arcade-screen");

    const gameScreen =
        document.getElementById("love-maze-screen");

    const gameButton =
        document.getElementById("game-2-button");

    const gameModal =
        document.getElementById("arcade-game-modal");

    const backButton =
        document.getElementById("back-from-love-maze");

    const gameSection =
        document.getElementById("maze-game-section");

    const victoryScreen =
        document.getElementById("maze-victory");

    const board =
        document.getElementById("maze-game-board");

    const gridElement =
        document.getElementById("maze-grid");

    const playerElement =
        document.getElementById("maze-player");

    const ghostOneElement =
        document.getElementById("maze-ghost-1");

    const ghostTwoElement =
        document.getElementById("maze-ghost-2");

    const readyMessage =
        document.getElementById("maze-ready-message");

    const scoreElement =
        document.getElementById("maze-score");

    const powerFill =
        document.getElementById("maze-power-fill");

    const finalScoreElement =
        document.getElementById("maze-final-score");

    const upButton =
        document.getElementById("maze-up");

    const downButton =
        document.getElementById("maze-down");

    const leftButton =
        document.getElementById("maze-left");

    const rightButton =
        document.getElementById("maze-right");

    const secretButton =
        document.getElementById("maze-secret-button");

    const returnArcadeButton =
        document.getElementById("maze-return-arcade");

    const secretModal =
        document.getElementById("maze-secret-modal");

    const secretClose =
        document.getElementById("maze-secret-close");

    const secretContinue =
        document.getElementById("maze-secret-continue");


    /* =====================================================
       COMPROBACIÓN
       ===================================================== */

    if (
        !arcadeScreen ||
        !gameScreen ||
        !gameButton ||
        !gameSection ||
        !board ||
        !gridElement ||
        !playerElement
    ) {

        console.error(
            "LOVE MAZE: faltan elementos HTML."
        );

        return;
    }


    /* =====================================================
       CONFIGURACIÓN
       ===================================================== */

    const ROWS = 11;
    const COLS = 11;

    /*
     * 1 = pared
     * 0 = camino
     *
     * IMPORTANTE:
     * Todos los espacios transitables están conectados.
     */

    const MAZE = [

        [1,1,1,1,1,1,1,1,1,1,1],

        [1,0,0,0,0,0,0,0,0,0,1],

        [1,0,1,1,0,1,0,1,1,0,1],

        [1,0,0,0,0,1,0,0,0,0,1],

        [1,1,0,1,0,0,0,1,0,1,1],

        [1,0,0,1,0,0,0,1,0,0,1],

        [1,0,1,1,0,0,0,1,1,0,1],

        [1,0,0,0,0,1,0,0,0,0,1],

        [1,0,1,1,0,1,0,1,1,0,1],

        [1,0,0,0,0,0,0,0,0,0,1],

        [1,1,1,1,1,1,1,1,1,1,1]

    ];


    /*
     * Posición inicial de Daniela.
     */

    const PLAYER_START = {
        row: 5,
        col: 5
    };


    /*
     * Posiciones iniciales de fantasmas.
     */

    const GHOST_STARTS = [

        {
            row: 1,
            col: 1
        },

        {
            row: 9,
            col: 9
        }

    ];


    /*
     * Colocamos exactamente
     * 20 corazones.
     */

    const HEART_POSITIONS = [

        [1,1],
        [1,3],
        [1,5],
        [1,7],
        [1,9],

        [3,1],
        [3,3],
        [3,6],
        [3,8],

        [4,2],
        [4,4],
        [4,6],
        [4,8],

        [5,1],
        [5,9],

        [7,1],
        [7,3],
        [7,7],
        [7,9],

        [9,5]

    ];


    const TOTAL_HEARTS =
        HEART_POSITIONS.length;


    /*
     * Velocidad de fantasmas.
     *
     * No queremos que sea difícil.
     */

    const GHOST_MOVE_TIME =
        620;


    /* =====================================================
       ESTADO
       ===================================================== */

    let running = false;

    let finished = false;

    let playerLocked = false;

    let collectedHearts = 0;

    let player = {
        ...PLAYER_START
    };

    let ghosts = [];

    let heartMap =
        new Map();

    let startTimer = null;

    let ghostTimer = null;

    let hitTimer = null;


    /* =====================================================
       UTILIDADES
       ===================================================== */

    function cellKey(
        row,
        col
    ) {

        return `${row}-${col}`;

    }


    function isInside(
        row,
        col
    ) {

        return (
            row >= 0 &&
            row < ROWS &&
            col >= 0 &&
            col < COLS
        );

    }


    function isPath(
        row,
        col
    ) {

        return (
            isInside(row, col) &&
            MAZE[row][col] === 0
        );

    }


    function unlockPageScroll() {

        document.documentElement.style.overflow =
            "";

        document.documentElement.style.overflowY =
            "auto";

        document.body.style.overflow =
            "";

        document.body.style.overflowY =
            "auto";

        document.body.style.height =
            "auto";

    }


    /* =====================================================
       LAYOUT DEL JUEGO
       ===================================================== */

    function prepareGameLayout() {

        gameScreen.classList.remove(
            "victory-mode"
        );

        gameScreen.classList.add(
            "playing-mode"
        );

        gameScreen.style.height =
            "";

        gameScreen.style.maxHeight =
            "";

        gameScreen.style.minHeight =
            "";

        gameScreen.style.overflow =
            "";

        gameScreen.style.overflowX =
            "";

        gameScreen.style.overflowY =
            "";


        gameSection.style.display =
            "";


        if (victoryScreen) {

            victoryScreen.style.display =
                "";

        }

    }


    function prepareVictoryLayout() {

        gameScreen.classList.remove(
            "playing-mode"
        );

        gameScreen.classList.add(
            "victory-mode"
        );


        /*
         * Quitamos completamente
         * el tablero.
         */

        gameSection.style.display =
            "none";


        /*
         * Liberamos altura y scroll.
         */

        gameScreen.style.height =
            "auto";

        gameScreen.style.maxHeight =
            "none";

        gameScreen.style.minHeight =
            "100svh";

        gameScreen.style.overflowX =
            "hidden";

        gameScreen.style.overflowY =
            "visible";


        unlockPageScroll();


        if (victoryScreen) {

            victoryScreen.style.display =
                "flex";

        }


        requestAnimationFrame(() => {

            window.scrollTo(
                0,
                0
            );

        });

    }


    /* =====================================================
       ABRIR LOVE MAZE
       ===================================================== */

    function openGame() {

        stopGame();

        prepareGameLayout();


        /*
         * Cerramos el modal temporal
         * del selector.
         */

        gameModal?.classList.remove(
            "visible"
        );


        /*
         * Ocultamos Arcade.
         */

        arcadeScreen.classList.remove(
            "visible"
        );

        arcadeScreen.style.display =
            "none";


        /*
         * Mostramos Love Maze.
         */

        gameScreen.style.display =
            "block";

        gameScreen.classList.add(
            "visible"
        );


        window.scrollTo(
            0,
            0
        );


        startTimer =
            setTimeout(() => {

                resetGame();

                startGame();

            }, 100);

    }


    /* =====================================================
       VOLVER AL ARCADE
       ===================================================== */

    function returnToArcade() {

        stopGame();


        secretModal?.classList.remove(
            "visible"
        );


        prepareGameLayout();

        unlockPageScroll();


        gameScreen.classList.remove(
            "visible"
        );

        gameScreen.style.display =
            "none";


        arcadeScreen.style.display =
            "block";

        arcadeScreen.classList.add(
            "visible"
        );


        window.scrollTo(
            0,
            0
        );

    }


    /* =====================================================
       BOTONES PRINCIPALES
       ===================================================== */

    gameButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            openGame();

        }
    );


    backButton?.addEventListener(
        "click",
        returnToArcade
    );


    returnArcadeButton?.addEventListener(
        "click",
        returnToArcade
    );


    /* =====================================================
       CREAR TABLERO
       ===================================================== */

    function buildMaze() {

        gridElement.innerHTML =
            "";

        heartMap.clear();


        for (
            let row = 0;
            row < ROWS;
            row++
        ) {

            for (
                let col = 0;
                col < COLS;
                col++
            ) {

                const cell =
                    document.createElement(
                        "div"
                    );


                cell.classList.add(
                    "maze-cell"
                );


                if (
                    MAZE[row][col] === 1
                ) {

                    cell.classList.add(
                        "wall"
                    );

                } else {

                    cell.classList.add(
                        "path"
                    );

                }


                cell.dataset.row =
                    row;

                cell.dataset.col =
                    col;


                /*
                 * ¿Esta celda tiene corazón?
                 */

                const hasHeart =
                    HEART_POSITIONS.some(
                        position =>
                            position[0] === row &&
                            position[1] === col
                    );


                if (hasHeart) {

                    const heart =
                        document.createElement(
                            "span"
                        );


                    heart.className =
                        "maze-heart-item";

                    heart.textContent =
                        "♥";


                    cell.appendChild(
                        heart
                    );


                    heartMap.set(
                        cellKey(
                            row,
                            col
                        ),
                        heart
                    );

                }


                gridElement.appendChild(
                    cell
                );

            }

        }

    }


    /* =====================================================
       RESET
       ===================================================== */

    function resetGame() {

        stopGame();


        running =
            false;

        finished =
            false;

        playerLocked =
            false;

        collectedHearts =
            0;


        player = {
            ...PLAYER_START
        };


        ghosts = [

            {
                row:
                    GHOST_STARTS[0].row,

                col:
                    GHOST_STARTS[0].col,

                element:
                    ghostOneElement,

                previousRow:
                    null,

                previousCol:
                    null
            },

            {
                row:
                    GHOST_STARTS[1].row,

                col:
                    GHOST_STARTS[1].col,

                element:
                    ghostTwoElement,

                previousRow:
                    null,

                previousCol:
                    null
            }

        ];


        buildMaze();


        readyMessage?.classList.remove(
            "hidden"
        );


        playerElement.classList.remove(
            "ghost-hit"
        );


        updatePlayerPosition();


        ghosts.forEach(
            ghost =>
                updateGhostPosition(
                    ghost
                )
        );


        updateHUD();

    }


    /* =====================================================
       INICIAR
       ===================================================== */

    function startGame() {

        readyMessage?.classList.remove(
            "hidden"
        );


        startTimer =
            setTimeout(() => {

                if (finished) {
                    return;
                }


                readyMessage?.classList.add(
                    "hidden"
                );


                running =
                    true;


                /*
                 * Si hubiera un corazón
                 * en la posición inicial,
                 * también se recogería.
                 */

                collectHeart();


                ghostTimer =
                    setInterval(
                        moveGhosts,
                        GHOST_MOVE_TIME
                    );

            }, 850);

    }


    /* =====================================================
       DETENER
       ===================================================== */

    function stopGame() {

        running =
            false;

        playerLocked =
            false;


        if (startTimer) {

            clearTimeout(
                startTimer
            );

            startTimer =
                null;

        }


        if (ghostTimer) {

            clearInterval(
                ghostTimer
            );

            ghostTimer =
                null;

        }


        if (hitTimer) {

            clearTimeout(
                hitTimer
            );

            hitTimer =
                null;

        }

    }


    /* =====================================================
       POSICIONES VISUALES
       ===================================================== */

    function getCellCenter(
        row,
        col
    ) {

        return {

            x:
                (
                    (
                        col + 0.5
                    ) /
                    COLS
                ) * 100,

            y:
                (
                    (
                        row + 0.5
                    ) /
                    ROWS
                ) * 100

        };

    }


    function updatePlayerPosition() {

        const position =
            getCellCenter(
                player.row,
                player.col
            );


        playerElement.style.left =
            `${position.x}%`;

        playerElement.style.top =
            `${position.y}%`;

    }


    function updateGhostPosition(
        ghost
    ) {

        if (!ghost.element) {
            return;
        }


        const position =
            getCellCenter(
                ghost.row,
                ghost.col
            );


        ghost.element.style.left =
            `${position.x}%`;

        ghost.element.style.top =
            `${position.y}%`;

    }


    /* =====================================================
       MOVIMIENTO DEL JUGADOR
       ===================================================== */

    function movePlayer(
        deltaRow,
        deltaCol
    ) {

        if (
            !running ||
            finished ||
            playerLocked
        ) {
            return;
        }


        const nextRow =
            player.row +
            deltaRow;

        const nextCol =
            player.col +
            deltaCol;


        /*
         * No atravesamos paredes.
         */

        if (
            !isPath(
                nextRow,
                nextCol
            )
        ) {
            return;
        }


        player.row =
            nextRow;

        player.col =
            nextCol;


        updatePlayerPosition();


        collectHeart();


        checkGhostCollision();

    }


    /* =====================================================
       RECOGER CORAZONES
       ===================================================== */

    function collectHeart() {

        if (finished) {
            return;
        }


        const key =
            cellKey(
                player.row,
                player.col
            );


        const heart =
            heartMap.get(
                key
            );


        if (!heart) {
            return;
        }


        heart.classList.add(
            "collected"
        );


        heartMap.delete(
            key
        );


        collectedHearts++;


        updateHUD();


        /*
         * Quitamos el corazón del DOM
         * después de la animación.
         */

        setTimeout(() => {

            heart.remove();

        }, 220);


        if (
            collectedHearts >=
            TOTAL_HEARTS
        ) {

            finishGame();

        }

    }


    /* =====================================================
       HUD
       ===================================================== */

    function updateHUD() {

        if (scoreElement) {

            scoreElement.textContent =
                `${collectedHearts} / ${TOTAL_HEARTS}`;

        }


        if (powerFill) {

            const percentage =
                (
                    collectedHearts /
                    TOTAL_HEARTS
                ) * 100;


            powerFill.style.width =
                `${percentage}%`;

        }


        if (finalScoreElement) {

            finalScoreElement.textContent =
                `${TOTAL_HEARTS} / ${TOTAL_HEARTS}`;

        }

    }


    /* =====================================================
       MOVIMIENTO DE FANTASMAS
       ===================================================== */

    function getAvailableMoves(
        row,
        col
    ) {

        const directions = [

            {
                row: -1,
                col: 0
            },

            {
                row: 1,
                col: 0
            },

            {
                row: 0,
                col: -1
            },

            {
                row: 0,
                col: 1
            }

        ];


        return directions
            .map(
                direction => ({

                    row:
                        row +
                        direction.row,

                    col:
                        col +
                        direction.col

                })
            )
            .filter(
                position =>
                    isPath(
                        position.row,
                        position.col
                    )
            );

    }


    function moveGhosts() {

        if (
            !running ||
            finished
        ) {
            return;
        }


        ghosts.forEach(
            ghost => {

                let moves =
                    getAvailableMoves(
                        ghost.row,
                        ghost.col
                    );


                if (
                    moves.length === 0
                ) {
                    return;
                }


                /*
                 * Evitamos que el fantasma
                 * vuelva inmediatamente atrás
                 * siempre que tenga otra opción.
                 */

                if (
                    moves.length > 1 &&
                    ghost.previousRow !== null
                ) {

                    const filtered =
                        moves.filter(
                            position =>
                                !(
                                    position.row ===
                                        ghost.previousRow &&
                                    position.col ===
                                        ghost.previousCol
                                )
                        );


                    if (
                        filtered.length > 0
                    ) {

                        moves =
                            filtered;

                    }

                }


                /*
                 * A veces el fantasma elige
                 * acercarse a Daniela.
                 *
                 * Otras veces se mueve al azar.
                 *
                 * Así parece vivo pero
                 * no se vuelve frustrante.
                 */

                let selectedMove;


                if (
                    Math.random() < 0.42
                ) {

                    moves.sort(
                        (a, b) => {

                            const distanceA =
                                Math.abs(
                                    a.row -
                                    player.row
                                ) +
                                Math.abs(
                                    a.col -
                                    player.col
                                );


                            const distanceB =
                                Math.abs(
                                    b.row -
                                    player.row
                                ) +
                                Math.abs(
                                    b.col -
                                    player.col
                                );


                            return (
                                distanceA -
                                distanceB
                            );

                        }
                    );


                    selectedMove =
                        moves[0];

                } else {

                    selectedMove =
                        moves[
                            Math.floor(
                                Math.random() *
                                moves.length
                            )
                        ];

                }


                ghost.previousRow =
                    ghost.row;

                ghost.previousCol =
                    ghost.col;


                ghost.row =
                    selectedMove.row;

                ghost.col =
                    selectedMove.col;


                updateGhostPosition(
                    ghost
                );

            }
        );


        /*
         * Esperamos un poquito a que
         * termine la transición visual.
         */

        setTimeout(() => {

            checkGhostCollision();

        }, 140);

    }


    /* =====================================================
       COLISIÓN CON FANTASMAS
       ===================================================== */

    function checkGhostCollision() {

        if (
            !running ||
            finished ||
            playerLocked
        ) {
            return;
        }


        const collision =
            ghosts.some(
                ghost =>
                    ghost.row ===
                        player.row &&
                    ghost.col ===
                        player.col
            );


        if (!collision) {
            return;
        }


        ghostHit();

    }


    function ghostHit() {

        if (
            playerLocked ||
            finished
        ) {
            return;
        }


        /*
         * VIDAS INFINITAS.
         */

        playerLocked =
            true;


        playerElement.classList.remove(
            "ghost-hit"
        );


        /*
         * Reiniciamos animación.
         */

        void playerElement.offsetWidth;


        playerElement.classList.add(
            "ghost-hit"
        );


        /*
         * Después del golpe Daniela
         * reaparece en el centro.
         */

        hitTimer =
            setTimeout(() => {

                player = {
                    ...PLAYER_START
                };


                updatePlayerPosition();


                playerElement.classList.remove(
                    "ghost-hit"
                );


                playerLocked =
                    false;


                /*
                 * Por seguridad revisamos
                 * que un fantasma no esté
                 * exactamente en el centro.
                 */

                ghosts.forEach(
                    (ghost, index) => {

                        if (
                            ghost.row ===
                                player.row &&
                            ghost.col ===
                                player.col
                        ) {

                            ghost.row =
                                GHOST_STARTS[index].row;

                            ghost.col =
                                GHOST_STARTS[index].col;

                            ghost.previousRow =
                                null;

                            ghost.previousCol =
                                null;

                            updateGhostPosition(
                                ghost
                            );

                        }

                    }
                );

            }, 650);

    }


    /* =====================================================
       VICTORIA
       ===================================================== */

    function finishGame() {

        if (finished) {
            return;
        }


        finished =
            true;


        stopGame();


        if (finalScoreElement) {

            finalScoreElement.textContent =
                `${TOTAL_HEARTS} / ${TOTAL_HEARTS}`;

        }


        /*
         * GAME 02 COMPLETADO.
         */

        if (
            typeof completeGame ===
            "function"
        ) {

            completeGame(2);

        }


        setTimeout(() => {

            prepareVictoryLayout();

        }, 350);

    }


    /* =====================================================
       CONTROLES TÁCTILES
       ===================================================== */

    function handleDirection(
        event,
        row,
        col
    ) {

        event.preventDefault();

        movePlayer(
            row,
            col
        );

    }


    upButton?.addEventListener(
        "pointerdown",
        event => {

            handleDirection(
                event,
                -1,
                0
            );

        }
    );


    downButton?.addEventListener(
        "pointerdown",
        event => {

            handleDirection(
                event,
                1,
                0
            );

        }
    );


    leftButton?.addEventListener(
        "pointerdown",
        event => {

            handleDirection(
                event,
                0,
                -1
            );

        }
    );


    rightButton?.addEventListener(
        "pointerdown",
        event => {

            handleDirection(
                event,
                0,
                1
            );

        }
    );


    /* =====================================================
       TECLADO
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !running ||
                !gameScreen.classList
                    .contains("visible")
            ) {
                return;
            }


            const key =
                event.key.toLowerCase();


            if (
                key === "arrowup" ||
                key === "w"
            ) {

                event.preventDefault();

                movePlayer(
                    -1,
                    0
                );

                return;

            }


            if (
                key === "arrowdown" ||
                key === "s"
            ) {

                event.preventDefault();

                movePlayer(
                    1,
                    0
                );

                return;

            }


            if (
                key === "arrowleft" ||
                key === "a"
            ) {

                event.preventDefault();

                movePlayer(
                    0,
                    -1
                );

                return;

            }


            if (
                key === "arrowright" ||
                key === "d"
            ) {

                event.preventDefault();

                movePlayer(
                    0,
                    1
                );

            }

        }
    );


    /* =====================================================
       SECRETO 02
       ===================================================== */

    secretButton?.addEventListener(
        "click",
        () => {

            secretModal?.classList.add(
                "visible"
            );

        }
    );


    function closeSecret() {

        secretModal?.classList.remove(
            "visible"
        );

    }


    secretClose?.addEventListener(
        "click",
        closeSecret
    );


    secretContinue?.addEventListener(
        "click",
        closeSecret
    );


    secretModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                secretModal
            ) {

                closeSecret();

            }

        }
    );


    /* =====================================================
       ESCAPE
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !==
                "Escape"
            ) {
                return;
            }


            if (
                secretModal?.classList
                    .contains("visible")
            ) {

                closeSecret();

                return;

            }


            if (
                gameScreen.classList
                    .contains("visible")
            ) {

                returnToArcade();

            }

        }
    );

});

/* =========================================================
   LOVE ARCADE
   GAME 03 — BREAK MY HEART
   Versión completa + Power-Ups
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const arcadeScreen =
        document.getElementById("arcade-screen");

    const gameScreen =
        document.getElementById("break-heart-screen");

    const gameButton =
        document.getElementById("game-3-button");

    const gameModal =
        document.getElementById("arcade-game-modal");

    const backButton =
        document.getElementById("back-from-break-heart");

    const gameSection =
        document.getElementById("break-heart-game-section");

    const victoryScreen =
        document.getElementById("break-heart-victory");

    const board =
        document.getElementById("break-heart-board");

    const bricksContainer =
        document.getElementById("break-heart-bricks");

    const ballElement =
        document.getElementById("break-heart-ball");

    const paddleElement =
        document.getElementById("break-heart-paddle");

    const readyMessage =
        document.getElementById("break-heart-ready");

    const missMessage =
        document.getElementById("break-heart-miss-message");

    const scoreElement =
        document.getElementById("break-heart-score");

    const progressFill =
        document.getElementById("break-heart-progress-fill");

    const finalScoreElement =
        document.getElementById("break-heart-final-score");

    const leftButton =
        document.getElementById("break-heart-left");

    const rightButton =
        document.getElementById("break-heart-right");

    const secretButton =
        document.getElementById("break-heart-secret-button");

    const returnArcadeButton =
        document.getElementById("break-heart-return-arcade");

    const secretModal =
        document.getElementById("break-heart-secret-modal");

    const secretClose =
        document.getElementById("break-heart-secret-close");

    const secretContinue =
        document.getElementById("break-heart-secret-continue");


    /* =====================================================
       COMPROBACIÓN
       ===================================================== */

    if (
        !arcadeScreen ||
        !gameScreen ||
        !gameButton ||
        !gameSection ||
        !board ||
        !bricksContainer ||
        !ballElement ||
        !paddleElement
    ) {

        console.error(
            "BREAK MY HEART: faltan elementos HTML."
        );

        return;
    }


    /* =====================================================
       CONFIGURACIÓN DEL CORAZÓN
       ===================================================== */

    const HEART_PATTERN = [

        [0, 1, 1, 0, 1, 1, 0],

        [1, 1, 1, 1, 1, 1, 1],

        [1, 1, 1, 1, 1, 1, 1],

        [0, 1, 1, 1, 1, 1, 0],

        [0, 0, 1, 1, 1, 0, 0],

        [0, 0, 0, 1, 0, 0, 0]

    ];


    /* =====================================================
       VELOCIDADES
       ===================================================== */

    const PADDLE_SPEED = 0.95;

    /*
     * Velocidad aprobada.
     */

    const BALL_SPEED_X = 0.42;

    const BALL_SPEED_Y = 0.50;


    /* =====================================================
       CONFIGURACIÓN POWER-UPS
       ===================================================== */

    /*
     * 28% de posibilidad de que un bloque
     * deje caer un power-up.
     */

    const POWER_UP_CHANCE = 0.28;

    /*
     * Velocidad de caída.
     */

    const POWER_UP_SPEED = 0.22;

    /*
     * WIDE y FIRE duran 7 segundos.
     */

    const POWER_DURATION = 7000;


    /* =====================================================
       ESTADO GENERAL
       ===================================================== */

    let running = false;

    let finished = false;

    let resettingBall = false;

    let score = 0;

    let destroyed = 0;

    let totalBricks = 0;

    let paddleX = 50;

    let ballX = 50;

    let ballY = 78;

    let ballDX = BALL_SPEED_X;

    let ballDY = -BALL_SPEED_Y;

    let movingLeft = false;

    let movingRight = false;

    let bricks = [];

    let animationId = null;

    let startTimer = null;

    let resetBallTimer = null;

    let missTimer = null;

    let lastFrameTime = null;


    /* =====================================================
       ESTADO POWER-UPS
       ===================================================== */

    let powerUps = [];

    let fireMode = false;

    /*
     * MULTI funciona por cargas.
     *
     * Cada M recogida añade una explosión.
     */

    let multiCharges = 0;

    let wideTimer = null;

    let fireTimer = null;

    let powerMessageTimer = null;


    /* =====================================================
       UTILIDADES DE PANTALLA
       ===================================================== */

    function unlockPageScroll() {

        document.documentElement.style.overflow =
            "";

        document.documentElement.style.overflowY =
            "auto";

        document.body.style.overflow =
            "";

        document.body.style.overflowY =
            "auto";

        document.body.style.height =
            "auto";
    }


    function prepareGameLayout() {

        gameScreen.classList.remove(
            "victory-mode"
        );

        gameScreen.classList.add(
            "playing-mode"
        );

        gameScreen.style.height =
            "";

        gameScreen.style.maxHeight =
            "";

        gameScreen.style.minHeight =
            "";

        gameScreen.style.overflow =
            "";

        gameScreen.style.overflowX =
            "";

        gameScreen.style.overflowY =
            "";

        gameSection.style.display =
            "";

        gameSection.classList.add(
            "visible"
        );

        if (victoryScreen) {

            victoryScreen.classList.remove(
                "visible"
            );

            victoryScreen.style.display =
                "";
        }
    }


    function prepareVictoryLayout() {

        gameScreen.classList.remove(
            "playing-mode"
        );

        gameScreen.classList.add(
            "victory-mode"
        );

        gameSection.classList.remove(
            "visible"
        );

        gameSection.style.display =
            "none";

        gameScreen.style.height =
            "auto";

        gameScreen.style.maxHeight =
            "none";

        gameScreen.style.minHeight =
            "100svh";

        gameScreen.style.overflowX =
            "hidden";

        gameScreen.style.overflowY =
            "visible";

        unlockPageScroll();

        if (victoryScreen) {

            victoryScreen.style.display =
                "flex";

            victoryScreen.classList.add(
                "visible"
            );
        }

        requestAnimationFrame(() => {

            window.scrollTo(
                0,
                0
            );
        });
    }


    /* =====================================================
       ABRIR GAME 03
       ===================================================== */

    function openGame() {

        stopGame();

        clearAllPowers();

        prepareGameLayout();

        gameModal?.classList.remove(
            "visible"
        );

        arcadeScreen.classList.remove(
            "visible"
        );

        arcadeScreen.style.display =
            "none";

        gameScreen.style.display =
            "block";

        gameScreen.classList.add(
            "visible"
        );

        window.scrollTo(
            0,
            0
        );

        startTimer =
            setTimeout(() => {

                resetGame();

                startGame();

            }, 120);
    }


    /* =====================================================
       VOLVER AL ARCADE
       ===================================================== */

    function returnToArcade() {

        stopGame();

        clearAllPowers();

        secretModal?.classList.remove(
            "visible"
        );

        prepareGameLayout();

        unlockPageScroll();

        gameScreen.classList.remove(
            "visible"
        );

        gameScreen.style.display =
            "none";

        arcadeScreen.style.display =
            "block";

        arcadeScreen.classList.add(
            "visible"
        );

        window.scrollTo(
            0,
            0
        );
    }


    /* =====================================================
       BOTONES PRINCIPALES
       ===================================================== */

    gameButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            openGame();
        }
    );


    backButton?.addEventListener(
        "click",
        returnToArcade
    );


    returnArcadeButton?.addEventListener(
        "click",
        returnToArcade
    );


    /* =====================================================
       CREAR CORAZÓN
       ===================================================== */

    function buildHeart() {

        bricksContainer.innerHTML =
            "";

        bricks = [];

        totalBricks = 0;


        HEART_PATTERN.forEach(
            (row, rowIndex) => {

                row.forEach(
                    (value, columnIndex) => {

                        const slot =
                            document.createElement(
                                "div"
                            );


                        /*
                         * Espacio vacío.
                         */

                        if (value === 0) {

                            slot.style.visibility =
                                "hidden";

                            bricksContainer.appendChild(
                                slot
                            );

                            return;
                        }


                        /*
                         * Bloque real.
                         */

                        slot.className =
                            "break-heart-brick";

                        slot.dataset.row =
                            rowIndex;

                        slot.dataset.column =
                            columnIndex;


                        bricksContainer.appendChild(
                            slot
                        );


                        bricks.push({

                            element: slot,

                            row: rowIndex,

                            column: columnIndex,

                            alive: true

                        });


                        totalBricks++;
                    }
                );
            }
        );
    }


    /* =====================================================
       PREPARAR SISTEMA POWER-UPS
       ===================================================== */

    function preparePowerUps() {

        powerUps.forEach(
            power => {

                power.element?.remove();
            }
        );

        powerUps = [];


        /*
         * Capa donde caen los premios.
         */

        let container =
            board.querySelector(
                ".break-heart-powerups"
            );


        if (!container) {

            container =
                document.createElement(
                    "div"
                );

            container.className =
                "break-heart-powerups";

            board.appendChild(
                container
            );
        }


        container.innerHTML =
            "";


        /*
         * Mensaje grande:
         *
         * WIDE PADDLE ♥
         * FIRE BALL ♥
         * MULTI BREAK ♥
         */

        let message =
            board.querySelector(
                ".break-heart-power-message"
            );


        if (!message) {

            message =
                document.createElement(
                    "div"
                );

            message.className =
                "break-heart-power-message";

            board.appendChild(
                message
            );
        }


        message.classList.remove(
            "visible"
        );

        message.textContent =
            "";


        /*
         * Indicador pequeño.
         */

        let indicator =
            board.querySelector(
                ".break-heart-active-power"
            );


        if (!indicator) {

            indicator =
                document.createElement(
                    "div"
                );

            indicator.className =
                "break-heart-active-power";

            board.appendChild(
                indicator
            );
        }


        indicator.classList.remove(
            "visible"
        );

        indicator.textContent =
            "";
    }


    /* =====================================================
       RESET
       ===================================================== */

    function resetGame() {

        stopGame();

        clearAllPowers();

        running =
            false;

        finished =
            false;

        resettingBall =
            false;

        score =
            0;

        destroyed =
            0;

        paddleX =
            50;

        movingLeft =
            false;

        movingRight =
            false;

        lastFrameTime =
            null;


        buildHeart();

        preparePowerUps();


        paddleElement.style.left =
            "50%";

        paddleElement.classList.remove(
            "wide-power"
        );


        ballElement.classList.remove(
            "fire-power"
        );

        ballElement.style.opacity =
            "1";


        resetBallPosition();


        readyMessage?.classList.remove(
            "hidden"
        );


        missMessage?.classList.remove(
            "visible"
        );


        updateHUD();

        updatePowerIndicator();
    }


    /* =====================================================
       INICIAR
       ===================================================== */

    function startGame() {

        readyMessage?.classList.remove(
            "hidden"
        );


        startTimer =
            setTimeout(() => {

                if (finished) {
                    return;
                }


                readyMessage?.classList.add(
                    "hidden"
                );


                running =
                    true;


                lastFrameTime =
                    performance.now();


                gameLoop(
                    lastFrameTime
                );

            }, 850);
    }


    /* =====================================================
       DETENER
       ===================================================== */

    function stopGame() {

        running =
            false;

        movingLeft =
            false;

        movingRight =
            false;

        lastFrameTime =
            null;


        if (animationId) {

            cancelAnimationFrame(
                animationId
            );

            animationId =
                null;
        }


        if (startTimer) {

            clearTimeout(
                startTimer
            );

            startTimer =
                null;
        }


        if (resetBallTimer) {

            clearTimeout(
                resetBallTimer
            );

            resetBallTimer =
                null;
        }


        if (missTimer) {

            clearTimeout(
                missTimer
            );

            missTimer =
                null;
        }
    }


    /* =====================================================
       POSICIONES
       ===================================================== */

    function updatePaddlePosition() {

        paddleElement.style.left =
            `${paddleX}%`;
    }


    function updateBallPosition() {

        ballElement.style.left =
            `${ballX}%`;

        ballElement.style.top =
            `${ballY}%`;

        ballElement.style.bottom =
            "auto";
    }


    function resetBallPosition() {

        ballX =
            paddleX;

        ballY =
            78;


        /*
         * Dirección aleatoria.
         */

        const direction =
            Math.random() > 0.5
                ? 1
                : -1;


        ballDX =
            BALL_SPEED_X *
            direction;

        ballDY =
            -BALL_SPEED_Y;


        updateBallPosition();
    }


    /* =====================================================
       MOVIMIENTO DE PALETA
       ===================================================== */

    function updatePaddle(
        frameScale
    ) {

        if (movingLeft) {

            paddleX -=
                PADDLE_SPEED *
                frameScale;
        }


        if (movingRight) {

            paddleX +=
                PADDLE_SPEED *
                frameScale;
        }


        /*
         * Si WIDE está activo dejamos
         * un poquito más de margen.
         */

        const wideActive =
            paddleElement.classList
                .contains("wide-power");


        const limit =
            wideActive
                ? 16
                : 10;


        paddleX =
            Math.max(
                limit,
                Math.min(
                    100 - limit,
                    paddleX
                )
            );


        updatePaddlePosition();
    }


    /* =====================================================
       MOVIMIENTO DE PELOTA
       ===================================================== */

    function updateBall(
        frameScale
    ) {

        if (
            resettingBall ||
            finished
        ) {
            return;
        }


        ballX +=
            ballDX *
            frameScale;

        ballY +=
            ballDY *
            frameScale;


        /*
         * Pared izquierda.
         */

        if (ballX <= 1.5) {

            ballX =
                1.5;

            ballDX =
                Math.abs(
                    ballDX
                );
        }


        /*
         * Pared derecha.
         */

        if (ballX >= 98.5) {

            ballX =
                98.5;

            ballDX =
                -Math.abs(
                    ballDX
                );
        }


        /*
         * Techo.
         */

        if (ballY <= 2) {

            ballY =
                2;

            ballDY =
                Math.abs(
                    ballDY
                );
        }


        /*
         * VIDAS INFINITAS.
         */

        if (ballY >= 103) {

            missBall();

            return;
        }


        updateBallPosition();
    }


    /* =====================================================
       COLISIÓN RECTANGULAR
       ===================================================== */

    function rectanglesOverlap(
        first,
        second
    ) {

        return !(
            first.right <
                second.left ||

            first.left >
                second.right ||

            first.bottom <
                second.top ||

            first.top >
                second.bottom
        );
    }


    /* =====================================================
       COLISIÓN CON PALETA
       ===================================================== */

    function checkPaddleCollision() {

        if (
            resettingBall ||
            ballDY <= 0
        ) {
            return;
        }


        const ballRect =
            ballElement
                .getBoundingClientRect();


        const paddleRect =
            paddleElement
                .getBoundingClientRect();


        if (
            !rectanglesOverlap(
                ballRect,
                paddleRect
            )
        ) {
            return;
        }


        /*
         * Siempre rebota hacia arriba.
         */

        ballDY =
            -Math.abs(
                ballDY
            );


        /*
         * Podemos dirigirla dependiendo
         * de dónde golpee la paleta.
         */

        const ballCenter =
            ballRect.left +
            ballRect.width / 2;


        const paddleCenter =
            paddleRect.left +
            paddleRect.width / 2;


        const difference =
            (
                ballCenter -
                paddleCenter
            ) /
            (
                paddleRect.width / 2
            );


        /*
         * Valor aprobado:
         * permite buenos ángulos.
         */

        ballDX =
            difference *
            0.62;


        /*
         * Evitamos trayectoria
         * perfectamente vertical.
         */

        if (
            Math.abs(ballDX) <
            0.12
        ) {

            ballDX =
                ballDX < 0
                    ? -0.12
                    : 0.12;
        }


        /*
         * Sacamos la pelota de la paleta.
         */

        const boardRect =
            board
                .getBoundingClientRect();


        ballY =
            (
                (
                    paddleRect.top -
                    boardRect.top -
                    ballRect.height
                ) /
                boardRect.height
            ) * 100;


        updateBallPosition();
    }


    /* =====================================================
       COLISIONES CON BLOQUES
       ===================================================== */

    function checkBrickCollisions() {

        if (
            resettingBall ||
            finished
        ) {
            return;
        }


        const ballRect =
            ballElement
                .getBoundingClientRect();


        for (
            const brick
            of bricks
        ) {

            if (!brick.alive) {
                continue;
            }


            const brickRect =
                brick.element
                    .getBoundingClientRect();


            if (
                !rectanglesOverlap(
                    ballRect,
                    brickRect
                )
            ) {
                continue;
            }


            /*
             * Guardamos dirección antes
             * de destruir por si este era
             * el último bloque.
             */

            const wasFire =
                fireMode;


            destroyBrick(
                brick,
                true
            );


            if (finished) {
                return;
            }


            /*
             * FIRE:
             *
             * destruye el bloque y continúa
             * atravesando el corazón.
             */

            if (wasFire) {

                continue;
            }


            /*
             * MULTI:
             *
             * consume una carga y destruye
             * dos bloques cercanos.
             */

            if (multiCharges > 0) {

                multiCharges--;

                explodeNearbyBricks(
                    brick
                );

                updatePowerIndicator();


                if (finished) {
                    return;
                }
            }


            /*
             * Rebote normal.
             */

            ballDY *=
                -1;


            break;
        }
    }


    /* =====================================================
       DESTRUIR BLOQUE
       ===================================================== */

    function destroyBrick(
        brick,
        allowPowerUp = true
    ) {

        if (
            !brick ||
            !brick.alive ||
            finished
        ) {
            return;
        }


        /*
         * IMPORTANTE:
         *
         * El power-up se calcula ANTES
         * de esconder el bloque.
         */

        if (allowPowerUp) {

            maybeSpawnPowerUp(
                brick
            );
        }


        brick.alive =
            false;


        brick.element.classList.add(
            "broken"
        );


        destroyed++;

        score +=
            100;


        updateHUD();


        setTimeout(() => {

            brick.element.style.visibility =
                "hidden";

        }, 180);


        /*
         * Victoria.
         */

        if (
            destroyed >=
            totalBricks
        ) {

            finishGame();
        }
    }


    /* =====================================================
       CREAR POWER-UP
       ===================================================== */

    function maybeSpawnPowerUp(
        brick
    ) {

        if (
            finished ||
            Math.random() >
                POWER_UP_CHANCE
        ) {
            return;
        }


        const types = [
            "wide",
            "multi",
            "fire"
        ];


        const type =
            types[
                Math.floor(
                    Math.random() *
                    types.length
                )
            ];


        const boardRect =
            board
                .getBoundingClientRect();


        const brickRect =
            brick.element
                .getBoundingClientRect();


        if (
            boardRect.width <= 0 ||
            boardRect.height <= 0
        ) {
            return;
        }


        const x =
            (
                (
                    brickRect.left +
                    brickRect.width / 2 -
                    boardRect.left
                ) /
                boardRect.width
            ) * 100;


        const y =
            (
                (
                    brickRect.top +
                    brickRect.height / 2 -
                    boardRect.top
                ) /
                boardRect.height
            ) * 100;


        const element =
            document.createElement(
                "div"
            );


        element.className =
            `break-heart-powerup ${type}`;


        /*
         * Letra estilo Arkanoid.
         */

        if (type === "wide") {

            element.textContent =
                "W";
        }


        if (type === "multi") {

            element.textContent =
                "M";
        }


        if (type === "fire") {

            element.textContent =
                "F";
        }


        const container =
            board.querySelector(
                ".break-heart-powerups"
            );


        if (!container) {
            return;
        }


        container.appendChild(
            element
        );


        const power = {

            element,

            type,

            x,

            y,

            alive: true
        };


        powerUps.push(
            power
        );


        positionPowerUp(
            power
        );
    }


    /* =====================================================
       POSICIÓN POWER-UP
       ===================================================== */

    function positionPowerUp(
        power
    ) {

        power.element.style.left =
            `${power.x}%`;

        power.element.style.top =
            `${power.y}%`;
    }


    /* =====================================================
       MOVIMIENTO POWER-UPS
       ===================================================== */

    function updatePowerUps(
        frameScale
    ) {

        if (finished) {
            return;
        }


        const paddleRect =
            paddleElement
                .getBoundingClientRect();


        powerUps.forEach(
            power => {

                if (!power.alive) {
                    return;
                }


                power.y +=
                    POWER_UP_SPEED *
                    frameScale;


                positionPowerUp(
                    power
                );


                const powerRect =
                    power.element
                        .getBoundingClientRect();


                /*
                 * ATRAPADO.
                 */

                if (
                    rectanglesOverlap(
                        powerRect,
                        paddleRect
                    )
                ) {

                    collectPowerUp(
                        power
                    );

                    return;
                }


                /*
                 * Cayó fuera.
                 */

                if (power.y > 105) {

                    power.alive =
                        false;

                    power.element.remove();
                }
            }
        );


        powerUps =
            powerUps.filter(
                power =>
                    power.alive
            );
    }


    /* =====================================================
       RECOGER POWER-UP
       ===================================================== */

    function collectPowerUp(
        power
    ) {

        if (
            !power.alive ||
            finished
        ) {
            return;
        }


        power.alive =
            false;


        power.element.classList.add(
            "collected"
        );


        /*
         * Activamos antes de eliminarlo.
         */

        activatePower(
            power.type
        );


        setTimeout(() => {

            power.element.remove();

        }, 180);
    }


    /* =====================================================
       ACTIVAR POWER-UP
       ===================================================== */

    function activatePower(
        type
    ) {

        /*
         * WIDE
         * ===============================================
         */

        if (type === "wide") {

            if (wideTimer) {

                clearTimeout(
                    wideTimer
                );
            }


            paddleElement.classList.add(
                "wide-power"
            );


            showPowerMessage(
                "WIDE PADDLE ♥"
            );


            wideTimer =
                setTimeout(() => {

                    paddleElement.classList.remove(
                        "wide-power"
                    );

                    wideTimer =
                        null;

                    updatePowerIndicator();

                }, POWER_DURATION);
        }


        /*
         * MULTI
         * ===============================================
         *
         * No usa temporizador.
         * Cada M añade 2 cargas.
         */

        if (type === "multi") {

            multiCharges +=
                2;


            showPowerMessage(
                "MULTI BREAK ♥"
            );
        }


        /*
         * FIRE
         * ===============================================
         */

        if (type === "fire") {

            if (fireTimer) {

                clearTimeout(
                    fireTimer
                );
            }


            fireMode =
                true;


            ballElement.classList.add(
                "fire-power"
            );


            showPowerMessage(
                "FIRE BALL ♥"
            );


            fireTimer =
                setTimeout(() => {

                    fireMode =
                        false;


                    ballElement.classList.remove(
                        "fire-power"
                    );


                    fireTimer =
                        null;


                    updatePowerIndicator();

                }, POWER_DURATION);
        }


        updatePowerIndicator();
    }


    /* =====================================================
       MENSAJE DE POWER
       ===================================================== */

    function showPowerMessage(
        text
    ) {

        const message =
            board.querySelector(
                ".break-heart-power-message"
            );


        if (!message) {
            return;
        }


        if (powerMessageTimer) {

            clearTimeout(
                powerMessageTimer
            );
        }


        message.textContent =
            text;


        /*
         * Reiniciamos transición.
         */

        message.classList.remove(
            "visible"
        );


        void message.offsetWidth;


        message.classList.add(
            "visible"
        );


        powerMessageTimer =
            setTimeout(() => {

                message.classList.remove(
                    "visible"
                );

                powerMessageTimer =
                    null;

            }, 900);
    }


    /* =====================================================
       INDICADOR DE PODERES
       ===================================================== */

    function updatePowerIndicator() {

        const indicator =
            board.querySelector(
                ".break-heart-active-power"
            );


        if (!indicator) {
            return;
        }


        const powers = [];


        if (
            paddleElement.classList
                .contains("wide-power")
        ) {

            powers.push(
                "WIDE"
            );
        }


        if (fireMode) {

            powers.push(
                "FIRE"
            );
        }


        if (multiCharges > 0) {

            powers.push(
                `MULTI ×${multiCharges}`
            );
        }


        if (powers.length === 0) {

            indicator.textContent =
                "";

            indicator.classList.remove(
                "visible"
            );

            return;
        }


        indicator.textContent =
            powers.join(
                " + "
            ) + " ♥";


        indicator.classList.add(
            "visible"
        );
    }


    /* =====================================================
       LIMPIAR TODOS LOS PODERES
       ===================================================== */

    function clearAllPowers() {

        /*
         * Timers.
         */

        if (wideTimer) {

            clearTimeout(
                wideTimer
            );

            wideTimer =
                null;
        }


        if (fireTimer) {

            clearTimeout(
                fireTimer
            );

            fireTimer =
                null;
        }


        if (powerMessageTimer) {

            clearTimeout(
                powerMessageTimer
            );

            powerMessageTimer =
                null;
        }


        /*
         * Estados.
         */

        fireMode =
            false;

        multiCharges =
            0;


        /*
         * Clases.
         */

        paddleElement.classList.remove(
            "wide-power"
        );


        ballElement.classList.remove(
            "fire-power"
        );


        /*
         * Power-ups cayendo.
         */

        powerUps.forEach(
            power => {

                power.element?.remove();
            }
        );


        powerUps =
            [];


        /*
         * Mensajes.
         */

        const message =
            board.querySelector(
                ".break-heart-power-message"
            );


        message?.classList.remove(
            "visible"
        );


        /*
         * Indicador.
         */

        const indicator =
            board.querySelector(
                ".break-heart-active-power"
            );


        if (indicator) {

            indicator.textContent =
                "";

            indicator.classList.remove(
                "visible"
            );
        }
    }


    /* =====================================================
       MULTI — EXPLOSIÓN
       ===================================================== */

    function explodeNearbyBricks(
        centerBrick
    ) {

        if (
            !centerBrick ||
            finished
        ) {
            return;
        }


        const centerRect =
            centerBrick.element
                .getBoundingClientRect();


        const boardRect =
            board
                .getBoundingClientRect();


        const centerX =
            centerRect.left +
            centerRect.width / 2;


        const centerY =
            centerRect.top +
            centerRect.height / 2;


        /*
         * EXPLOSIÓN VISUAL.
         */

        const explosion =
            document.createElement(
                "div"
            );


        explosion.className =
            "break-heart-explosion";


        explosion.style.left =
            `${
                (
                    centerX -
                    boardRect.left
                ) /
                boardRect.width *
                100
            }%`;


        explosion.style.top =
            `${
                (
                    centerY -
                    boardRect.top
                ) /
                boardRect.height *
                100
            }%`;


        board.appendChild(
            explosion
        );


        setTimeout(() => {

            explosion.remove();

        }, 420);


        /*
         * Buscamos los bloques vivos
         * más cercanos.
         */

        const candidates =
            bricks
                .filter(
                    brick =>
                        brick.alive &&
                        brick !==
                            centerBrick
                )
                .map(
                    brick => {

                        const rect =
                            brick.element
                                .getBoundingClientRect();


                        const x =
                            rect.left +
                            rect.width / 2;


                        const y =
                            rect.top +
                            rect.height / 2;


                        return {

                            brick,

                            distance:
                                Math.hypot(
                                    x -
                                        centerX,

                                    y -
                                        centerY
                                )
                        };
                    }
                )
                .sort(
                    (a, b) =>
                        a.distance -
                        b.distance
                );


        /*
         * Destruimos DOS adicionales.
         *
         * Estos bloques NO generan nuevos
         * power-ups para evitar una cadena
         * absurda de premios.
         */

        candidates
            .slice(
                0,
                2
            )
            .forEach(
                candidate => {

                    if (finished) {
                        return;
                    }


                    destroyBrick(
                        candidate.brick,
                        false
                    );
                }
            );
    }


    /* =====================================================
       PELOTA PERDIDA
       ===================================================== */

    function missBall() {

        if (
            resettingBall ||
            finished
        ) {
            return;
        }


        resettingBall =
            true;


        missMessage?.classList.add(
            "visible"
        );


        ballElement.style.opacity =
            "0";


        missTimer =
            setTimeout(() => {

                missMessage?.classList.remove(
                    "visible"
                );

                missTimer =
                    null;

            }, 650);


        /*
         * VIDAS INFINITAS.
         */

        resetBallTimer =
            setTimeout(() => {

                if (finished) {
                    return;
                }


                resetBallPosition();


                ballElement.style.opacity =
                    "1";


                resettingBall =
                    false;


                resetBallTimer =
                    null;

            }, 750);
    }


    /* =====================================================
       HUD
       ===================================================== */

    function updateHUD() {

        if (scoreElement) {

            scoreElement.textContent =
                String(score)
                    .padStart(
                        4,
                        "0"
                    );
        }


        const percentage =
            totalBricks > 0
                ? (
                    destroyed /
                    totalBricks
                ) * 100
                : 0;


        if (progressFill) {

            progressFill.style.width =
                `${
                    Math.min(
                        100,
                        percentage
                    )
                }%`;
        }


        if (finalScoreElement) {

            finalScoreElement.textContent =
                finished
                    ? "100%"
                    : `${
                        Math.round(
                            percentage
                        )
                    }%`;
        }
    }


    /* =====================================================
       LOOP PRINCIPAL
       ===================================================== */

    function gameLoop(
        currentTime
    ) {

        if (
            !running ||
            finished
        ) {
            return;
        }


        /*
         * Normalización para pantallas
         * de 60 / 120 / 144 Hz.
         */

        const elapsed =
            currentTime -
            lastFrameTime;


        lastFrameTime =
            currentTime;


        const frameScale =
            Math.min(
                2,
                elapsed /
                    16.6667
            );


        updatePaddle(
            frameScale
        );


        updateBall(
            frameScale
        );


        updatePowerUps(
            frameScale
        );


        checkPaddleCollision();


        checkBrickCollisions();


        animationId =
            requestAnimationFrame(
                gameLoop
            );
    }


    /* =====================================================
       VICTORIA
       ===================================================== */

    function finishGame() {

        if (finished) {
            return;
        }


        finished =
            true;


        destroyed =
            totalBricks;


        updateHUD();


        stopGame();


        /*
         * Limpiamos power-ups restantes.
         */

        clearAllPowers();


        /*
         * GAME 03 COMPLETADO.
         */

        if (
            typeof completeGame ===
            "function"
        ) {

            completeGame(3);
        }


        /*
         * Dejamos ver el último golpe.
         */

        setTimeout(() => {

            prepareVictoryLayout();

        }, 450);
    }


    /* =====================================================
       CONTROLES MÓVILES
       ===================================================== */

    function pressLeft(
        event
    ) {

        event.preventDefault();


        if (
            !running ||
            finished
        ) {
            return;
        }


        movingLeft =
            true;

        movingRight =
            false;
    }


    function pressRight(
        event
    ) {

        event.preventDefault();


        if (
            !running ||
            finished
        ) {
            return;
        }


        movingRight =
            true;

        movingLeft =
            false;
    }


    function releaseMovement(
        event
    ) {

        if (
            event &&
            running
        ) {

            event.preventDefault();
        }


        movingLeft =
            false;

        movingRight =
            false;
    }


    leftButton?.addEventListener(
        "pointerdown",
        pressLeft
    );


    rightButton?.addEventListener(
        "pointerdown",
        pressRight
    );


    leftButton?.addEventListener(
        "pointerup",
        releaseMovement
    );


    rightButton?.addEventListener(
        "pointerup",
        releaseMovement
    );


    leftButton?.addEventListener(
        "pointercancel",
        releaseMovement
    );


    rightButton?.addEventListener(
        "pointercancel",
        releaseMovement
    );


    window.addEventListener(
        "pointerup",
        () => {

            movingLeft =
                false;

            movingRight =
                false;
        }
    );


    /* =====================================================
       TECLADO PC
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !running ||
                !gameScreen.classList
                    .contains("visible")
            ) {
                return;
            }


            const key =
                event.key.toLowerCase();


            if (
                key === "arrowleft" ||
                key === "a"
            ) {

                event.preventDefault();


                movingLeft =
                    true;

                movingRight =
                    false;
            }


            if (
                key === "arrowright" ||
                key === "d"
            ) {

                event.preventDefault();


                movingRight =
                    true;

                movingLeft =
                    false;
            }
        }
    );


    document.addEventListener(
        "keyup",
        event => {

            const key =
                event.key.toLowerCase();


            if (
                key === "arrowleft" ||
                key === "a"
            ) {

                movingLeft =
                    false;
            }


            if (
                key === "arrowright" ||
                key === "d"
            ) {

                movingRight =
                    false;
            }
        }
    );


    /* =====================================================
       SECRETO 03
       ===================================================== */

    secretButton?.addEventListener(
        "click",
        () => {

            secretModal?.classList.add(
                "visible"
            );
        }
    );


    function closeSecret() {

        secretModal?.classList.remove(
            "visible"
        );
    }


    secretClose?.addEventListener(
        "click",
        closeSecret
    );


    secretContinue?.addEventListener(
        "click",
        closeSecret
    );


    secretModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                secretModal
            ) {

                closeSecret();
            }
        }
    );


    /* =====================================================
       ESCAPE
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !==
                "Escape"
            ) {
                return;
            }


            /*
             * Primero cerramos secreto.
             */

            if (
                secretModal?.classList
                    .contains("visible")
            ) {

                closeSecret();

                return;
            }


            /*
             * Si GAME 03 está abierto,
             * regresamos al Arcade.
             */

            if (
                gameScreen.classList
                    .contains("visible")
            ) {

                returnToArcade();
            }
        }
    );

});

/* =========================================================
   LOVE ARCADE
   GAME 04 — LOVE SNAKE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const arcadeScreen =
        document.getElementById("arcade-screen");

    const gameScreen =
        document.getElementById("love-snake-screen");

    const gameButton =
        document.getElementById("game-4-button");

    const gameModal =
        document.getElementById("arcade-game-modal");

    const backButton =
        document.getElementById("back-from-love-snake");

    const gameSection =
        document.getElementById("love-snake-game-section");

    const victoryScreen =
        document.getElementById("love-snake-victory");

    const board =
        document.getElementById("love-snake-board");

    const grid =
        document.getElementById("love-snake-grid");

    const readyMessage =
        document.getElementById("love-snake-ready");

    const quickMessage =
        document.getElementById("love-snake-message");

    const bonkMessage =
        document.getElementById("love-snake-bonk");

    const activePowerElement =
        document.getElementById("love-snake-active-power");

    const scoreElement =
        document.getElementById("love-snake-score");

    const progressFill =
        document.getElementById("love-snake-progress-fill");

    const finalScore =
        document.getElementById("love-snake-final-score");

    const upButton =
        document.getElementById("love-snake-up");

    const downButton =
        document.getElementById("love-snake-down");

    const leftButton =
        document.getElementById("love-snake-left");

    const rightButton =
        document.getElementById("love-snake-right");

    const secretButton =
        document.getElementById("love-snake-secret-button");

    const returnArcadeButton =
        document.getElementById("love-snake-return-arcade");

    const secretModal =
        document.getElementById("love-snake-secret-modal");

    const secretClose =
        document.getElementById("love-snake-secret-close");

    const secretContinue =
        document.getElementById("love-snake-secret-continue");


    /* =====================================================
       COMPROBACIÓN
       ===================================================== */

    if (
        !arcadeScreen ||
        !gameScreen ||
        !gameButton ||
        !gameSection ||
        !board ||
        !grid
    ) {

        console.error(
            "LOVE SNAKE: faltan elementos HTML."
        );

        return;
    }


    /* =====================================================
       CONFIGURACIÓN
       ===================================================== */

    const GRID_SIZE = 15;

    const TARGET_HEARTS = 20;

    /*
     * Velocidad inicial.
     *
     * Un número más pequeño =
     * serpiente más rápida.
     */

    const BASE_SPEED = 190;

    /*
     * Velocidad máxima.
     *
     * No queremos convertirlo en
     * Dark Souls versión serpiente 😂
     */

    const MAX_SPEED = 105;

    /*
     * Cada 4 corazones aceleramos
     * ligeramente.
     */

    const SPEED_STEP = 12;

    /*
     * Duración de MAGNET y SLOW.
     */

    const POWER_DURATION = 6500;

    /*
     * Posibilidad de generar power-up
     * después de recoger un corazón.
     */

    const POWER_CHANCE = 0.30;


    /* =====================================================
       ESTADO
       ===================================================== */

    let snake = [];

    let direction = {
        x: 1,
        y: 0
    };

    let nextDirection = {
        x: 1,
        y: 0
    };

    let food = null;

    let powerUp = null;

    let heartsCollected = 0;

    let currentSpeed = BASE_SPEED;

    let running = false;

    let finished = false;

    let recovering = false;

    let gameTimer = null;

    let startTimer = null;

    let recoveryTimer = null;

    let messageTimer = null;

    let magnetTimer = null;

    let slowTimer = null;

    let magnetActive = false;

    let slowActive = false;


    /* =====================================================
       MENSAJES
       ===================================================== */

    const LOVE_MESSAGES = [

        "TE AMO ♥",

        "YO MÁS ♥",

        "+1 BESITO",

        "NICE ♥",

        "PIECITOS? 😂",

        "MUA ♥",

        "DANIELA + ESTEBAN",

        "OTRO CORAZÓN ♥",

        "EZ 😂",

        "LOVE +1"

    ];


    /* =====================================================
       SCROLL
       ===================================================== */

    function unlockPageScroll() {

        document.documentElement.style.overflow =
            "";

        document.documentElement.style.overflowY =
            "auto";

        document.body.style.overflow =
            "";

        document.body.style.overflowY =
            "auto";

        document.body.style.height =
            "auto";
    }


    /* =====================================================
       LAYOUT JUEGO
       ===================================================== */

    function prepareGameLayout() {

        gameScreen.classList.remove(
            "victory-mode"
        );

        gameScreen.classList.add(
            "playing-mode"
        );

        gameScreen.style.height =
            "";

        gameScreen.style.maxHeight =
            "";

        gameScreen.style.minHeight =
            "";

        gameScreen.style.overflow =
            "";

        gameScreen.style.overflowX =
            "";

        gameScreen.style.overflowY =
            "";

        gameSection.style.display =
            "";

        if (victoryScreen) {

            victoryScreen.classList.remove(
                "visible"
            );

            victoryScreen.style.display =
                "";
        }
    }


    /* =====================================================
       LAYOUT VICTORIA
       ===================================================== */

    function prepareVictoryLayout() {

        gameScreen.classList.remove(
            "playing-mode"
        );

        gameScreen.classList.add(
            "victory-mode"
        );

        gameSection.style.display =
            "none";

        gameScreen.style.height =
            "auto";

        gameScreen.style.maxHeight =
            "none";

        gameScreen.style.minHeight =
            "100svh";

        gameScreen.style.overflowX =
            "hidden";

        gameScreen.style.overflowY =
            "visible";

        unlockPageScroll();


        if (victoryScreen) {

            victoryScreen.style.display =
                "flex";

            victoryScreen.classList.add(
                "visible"
            );
        }


        requestAnimationFrame(() => {

            window.scrollTo(
                0,
                0
            );
        });
    }


    /* =====================================================
       ABRIR GAME 04
       ===================================================== */

    function openGame() {

        stopGame();

        clearPowerEffects();

        gameModal?.classList.remove(
            "visible"
        );

        prepareGameLayout();


        arcadeScreen.classList.remove(
            "visible"
        );

        arcadeScreen.style.display =
            "none";


        gameScreen.style.display =
            "block";

        gameScreen.classList.add(
            "visible"
        );


        window.scrollTo(
            0,
            0
        );


        startTimer =
            setTimeout(() => {

                resetGame();

                startGame();

            }, 120);
    }


    /* =====================================================
       VOLVER AL ARCADE
       ===================================================== */

    function returnToArcade() {

        stopGame();

        clearPowerEffects();

        secretModal?.classList.remove(
            "visible"
        );


        gameScreen.classList.remove(
            "visible"
        );

        gameScreen.style.display =
            "none";


        arcadeScreen.style.display =
            "block";

        arcadeScreen.classList.add(
            "visible"
        );


        unlockPageScroll();


        window.scrollTo(
            0,
            0
        );
    }


    /* =====================================================
       BOTONES PRINCIPALES
       ===================================================== */

    gameButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            openGame();
        }
    );


    backButton?.addEventListener(
        "click",
        returnToArcade
    );


    returnArcadeButton?.addEventListener(
        "click",
        returnToArcade
    );


    /* =====================================================
       RESET COMPLETO
       ===================================================== */

    function resetGame() {

        stopGame();

        clearPowerEffects();


        finished = false;

        recovering = false;

        running = false;

        heartsCollected = 0;

        currentSpeed = BASE_SPEED;


        direction = {
            x: 1,
            y: 0
        };


        nextDirection = {
            x: 1,
            y: 0
        };


        /*
         * Serpiente inicial.
         */

        snake = [

            {
                x: 7,
                y: 7
            },

            {
                x: 6,
                y: 7
            },

            {
                x: 5,
                y: 7
            }

        ];


        food = null;

        powerUp = null;


        grid.classList.remove(
            "hit"
        );


        board.classList.remove(
            "magnet-active",
            "slow-active"
        );


        readyMessage?.classList.remove(
            "hidden"
        );


        bonkMessage?.classList.remove(
            "visible"
        );


        quickMessage?.classList.remove(
            "visible"
        );


        createFood();

        updateHUD();

        updatePowerIndicator();

        render();
    }


    /* =====================================================
       START
       ===================================================== */

    function startGame() {

        readyMessage?.classList.remove(
            "hidden"
        );


        startTimer =
            setTimeout(() => {

                if (finished) {
                    return;
                }


                readyMessage?.classList.add(
                    "hidden"
                );


                running =
                    true;


                scheduleNextTick();

            }, 850);
    }


    /* =====================================================
       STOP
       ===================================================== */

    function stopGame() {

        running =
            false;


        if (gameTimer) {

            clearTimeout(
                gameTimer
            );

            gameTimer =
                null;
        }


        if (startTimer) {

            clearTimeout(
                startTimer
            );

            startTimer =
                null;
        }


        if (recoveryTimer) {

            clearTimeout(
                recoveryTimer
            );

            recoveryTimer =
                null;
        }


        if (messageTimer) {

            clearTimeout(
                messageTimer
            );

            messageTimer =
                null;
        }
    }


    /* =====================================================
       LOOP
       ===================================================== */

    function scheduleNextTick() {

        if (
            !running ||
            finished
        ) {
            return;
        }


        gameTimer =
            setTimeout(() => {

                gameTimer =
                    null;


                gameTick();


                scheduleNextTick();

            }, getEffectiveSpeed());
    }


    /* =====================================================
       VELOCIDAD EFECTIVA
       ===================================================== */

    function getEffectiveSpeed() {

        /*
         * SLOW añade tiempo entre movimientos.
         */

        if (slowActive) {

            return Math.max(
                150,
                currentSpeed + 75
            );
        }


        return currentSpeed;
    }


    /* =====================================================
       TICK
       ===================================================== */

    function gameTick() {

        if (
            !running ||
            finished ||
            recovering
        ) {
            return;
        }


        /*
         * Aplicamos dirección solicitada.
         */

        direction = {
            ...nextDirection
        };


        const head =
            snake[0];


        const newHead = {

            x:
                head.x +
                direction.x,

            y:
                head.y +
                direction.y

        };


        /*
         * MAGNET:
         *
         * Si el corazón está muy cerca,
         * lo recogemos automáticamente.
         */

        if (
            magnetActive &&
            food
        ) {

            const distance =
                Math.abs(
                    newHead.x -
                    food.x
                ) +
                Math.abs(
                    newHead.y -
                    food.y
                );


            if (distance <= 2) {

                collectFood(
                    true
                );
            }
        }


        /*
         * PARED.
         */

        if (
            newHead.x < 0 ||
            newHead.x >= GRID_SIZE ||
            newHead.y < 0 ||
            newHead.y >= GRID_SIZE
        ) {

            bonk();

            return;
        }


        /*
         * CHOQUE CONSIGO MISMA.
         */

        const hitSelf =
            snake.some(
                segment =>
                    segment.x ===
                        newHead.x &&
                    segment.y ===
                        newHead.y
            );


        if (hitSelf) {

            bonk();

            return;
        }


        /*
         * Movimiento.
         */

        snake.unshift(
            newHead
        );


        /*
         * COMIDA.
         */

        const ateFood =
            food &&
            newHead.x ===
                food.x &&
            newHead.y ===
                food.y;


        if (ateFood) {

            collectFood(
                false
            );

        } else {

            /*
             * Movimiento normal:
             * quitamos la cola.
             */

            snake.pop();
        }


        /*
         * POWER-UP.
         */

        if (
            powerUp &&
            newHead.x ===
                powerUp.x &&
            newHead.y ===
                powerUp.y
        ) {

            collectPowerUp();
        }


        render();
    }


    /* =====================================================
       CREAR CORAZÓN
       ===================================================== */

    function createFood() {

        if (finished) {
            return;
        }


        const position =
            getRandomFreeCell();


        if (!position) {
            return;
        }


        food = position;
    }


    /* =====================================================
       CELDA LIBRE
       ===================================================== */

    function getRandomFreeCell() {

        const freeCells = [];


        for (
            let y = 0;
            y < GRID_SIZE;
            y++
        ) {

            for (
                let x = 0;
                x < GRID_SIZE;
                x++
            ) {

                const occupiedBySnake =
                    snake.some(
                        segment =>
                            segment.x === x &&
                            segment.y === y
                    );


                const occupiedByFood =
                    food &&
                    food.x === x &&
                    food.y === y;


                const occupiedByPower =
                    powerUp &&
                    powerUp.x === x &&
                    powerUp.y === y;


                if (
                    !occupiedBySnake &&
                    !occupiedByFood &&
                    !occupiedByPower
                ) {

                    freeCells.push({
                        x,
                        y
                    });
                }
            }
        }


        if (
            freeCells.length === 0
        ) {

            return null;
        }


        return freeCells[
            Math.floor(
                Math.random() *
                freeCells.length
            )
        ];
    }


    /* =====================================================
       RECOGER CORAZÓN
       ===================================================== */

    function collectFood(
        magnetPickup = false
    ) {

        if (
            finished ||
            !food
        ) {
            return;
        }


        /*
         * Con MAGNET podemos recogerlo
         * sin que la cabeza esté encima.
         *
         * Para conservar el crecimiento,
         * duplicamos la cola.
         */

        if (magnetPickup) {

            const tail =
                snake[
                    snake.length - 1
                ];


            snake.push({

                x: tail.x,

                y: tail.y

            });
        }


        heartsCollected++;


        showRandomLoveMessage();


        /*
         * Victoria.
         */

        if (
            heartsCollected >=
            TARGET_HEARTS
        ) {

            heartsCollected =
                TARGET_HEARTS;


            updateHUD();

            render();

            finishGame();

            return;
        }


        /*
         * Aceleración gradual.
         */

        updateGameSpeed();


        /*
         * Quitamos corazón anterior
         * antes de buscar nueva posición.
         */

        food =
            null;


        createFood();


        /*
         * Posibilidad de power-up.
         *
         * Solo uno puede estar en tablero.
         */

        if (
            !powerUp &&
            Math.random() <
                POWER_CHANCE
        ) {

            createPowerUp();
        }


        updateHUD();
    }


    /* =====================================================
       VELOCIDAD GRADUAL
       ===================================================== */

    function updateGameSpeed() {

        const level =
            Math.floor(
                heartsCollected /
                4
            );


        currentSpeed =
            Math.max(
                MAX_SPEED,
                BASE_SPEED -
                level *
                SPEED_STEP
            );
    }


    /* =====================================================
       CREAR POWER-UP
       ===================================================== */

    function createPowerUp() {

        const position =
            getRandomFreeCell();


        if (!position) {
            return;
        }


        const types = [
            "magnet",
            "slow",
            "bonus"
        ];


        const type =
            types[
                Math.floor(
                    Math.random() *
                    types.length
                )
            ];


        powerUp = {

            ...position,

            type

        };
    }


    /* =====================================================
       RECOGER POWER-UP
       ===================================================== */

    function collectPowerUp() {

        if (
            !powerUp ||
            finished
        ) {
            return;
        }


        const type =
            powerUp.type;


        powerUp =
            null;


        activatePower(
            type
        );
    }


    /* =====================================================
       ACTIVAR POWER-UP
       ===================================================== */

    function activatePower(
        type
    ) {

        /*
         * MAGNET
         * ===============================================
         */

        if (
            type ===
            "magnet"
        ) {

            if (magnetTimer) {

                clearTimeout(
                    magnetTimer
                );
            }


            magnetActive =
                true;


            board.classList.add(
                "magnet-active"
            );


            showMessage(
                "MAGNET ♥"
            );


            magnetTimer =
                setTimeout(() => {

                    magnetActive =
                        false;


                    board.classList.remove(
                        "magnet-active"
                    );


                    magnetTimer =
                        null;


                    updatePowerIndicator();

                }, POWER_DURATION);
        }


        /*
         * SLOW
         * ===============================================
         */

        if (
            type ===
            "slow"
        ) {

            if (slowTimer) {

                clearTimeout(
                    slowTimer
                );
            }


            slowActive =
                true;


            board.classList.add(
                "slow-active"
            );


            showMessage(
                "SLOW MODE ♥"
            );


            slowTimer =
                setTimeout(() => {

                    slowActive =
                        false;


                    board.classList.remove(
                        "slow-active"
                    );


                    slowTimer =
                        null;


                    updatePowerIndicator();

                }, POWER_DURATION);
        }


        /*
         * BONUS
         * ===============================================
         *
         * +3 corazones instantáneos.
         */

        if (
            type ===
            "bonus"
        ) {

            heartsCollected =
                Math.min(
                    TARGET_HEARTS,
                    heartsCollected + 3
                );


            showMessage(
                "BONUS +3 ♥"
            );


            updateGameSpeed();

            updateHUD();


            if (
                heartsCollected >=
                TARGET_HEARTS
            ) {

                finishGame();

                return;
            }
        }


        updatePowerIndicator();
    }


    /* =====================================================
       INDICADOR POWER
       ===================================================== */

    function updatePowerIndicator() {

        if (!activePowerElement) {
            return;
        }


        const active = [];


        if (magnetActive) {

            active.push(
                "MAGNET"
            );
        }


        if (slowActive) {

            active.push(
                "SLOW"
            );
        }


        if (
            active.length === 0
        ) {

            activePowerElement.textContent =
                "";

            activePowerElement.classList.remove(
                "visible"
            );

            return;
        }


        activePowerElement.textContent =
            active.join(
                " + "
            ) + " ♥";


        activePowerElement.classList.add(
            "visible"
        );
    }


    /* =====================================================
       LIMPIAR POWERS
       ===================================================== */

    function clearPowerEffects() {

        if (magnetTimer) {

            clearTimeout(
                magnetTimer
            );

            magnetTimer =
                null;
        }


        if (slowTimer) {

            clearTimeout(
                slowTimer
            );

            slowTimer =
                null;
        }


        magnetActive =
            false;

        slowActive =
            false;


        board.classList.remove(
            "magnet-active",
            "slow-active"
        );


        if (activePowerElement) {

            activePowerElement.textContent =
                "";

            activePowerElement.classList.remove(
                "visible"
            );
        }
    }


    /* =====================================================
       BONK — VIDAS INFINITAS
       ===================================================== */

    function bonk() {

        if (
            recovering ||
            finished
        ) {
            return;
        }


        recovering =
            true;


        /*
         * Efecto visual.
         */

        grid.classList.remove(
            "hit"
        );


        void grid.offsetWidth;


        grid.classList.add(
            "hit"
        );


        bonkMessage?.classList.remove(
            "visible"
        );


        void bonkMessage?.offsetWidth;


        bonkMessage?.classList.add(
            "visible"
        );


        /*
         * Después del golpe,
         * reiniciamos SOLO la serpiente.
         *
         * NO perdemos corazones.
         */

        recoveryTimer =
            setTimeout(() => {

                resetSnakeAfterBonk();


                bonkMessage?.classList.remove(
                    "visible"
                );


                grid.classList.remove(
                    "hit"
                );


                recovering =
                    false;


                recoveryTimer =
                    null;


                render();

            }, 650);
    }


    /* =====================================================
       REINICIO DESPUÉS DE BONK
       ===================================================== */

    function resetSnakeAfterBonk() {

        direction = {
            x: 1,
            y: 0
        };


        nextDirection = {
            x: 1,
            y: 0
        };


        /*
         * Conservamos parte del crecimiento.
         *
         * Base 3 + crecimiento por progreso,
         * con límite razonable para que no
         * reaparezca ocupando medio tablero.
         */

        const desiredLength =
            Math.min(
                8,
                3 +
                Math.floor(
                    heartsCollected /
                    3
                )
            );


        snake = [];


        for (
            let index = 0;
            index < desiredLength;
            index++
        ) {

            snake.push({

                x:
                    8 -
                    index,

                y:
                    7

            });
        }


        /*
         * Si comida o power quedaron justo
         * sobre la nueva serpiente,
         * los recolocamos.
         */

        if (
            food &&
            snake.some(
                segment =>
                    segment.x ===
                        food.x &&
                    segment.y ===
                        food.y
            )
        ) {

            food =
                null;

            createFood();
        }


        if (
            powerUp &&
            snake.some(
                segment =>
                    segment.x ===
                        powerUp.x &&
                    segment.y ===
                        powerUp.y
            )
        ) {

            powerUp =
                null;

            createPowerUp();
        }
    }


    /* =====================================================
       MENSAJES ROMÁNTICOS
       ===================================================== */

    function showRandomLoveMessage() {

        const text =
            LOVE_MESSAGES[
                Math.floor(
                    Math.random() *
                    LOVE_MESSAGES.length
                )
            ];


        showMessage(
            text
        );
    }


    function showMessage(
        text
    ) {

        if (!quickMessage) {
            return;
        }


        if (messageTimer) {

            clearTimeout(
                messageTimer
            );
        }


        quickMessage.textContent =
            text;


        quickMessage.classList.remove(
            "visible"
        );


        void quickMessage.offsetWidth;


        quickMessage.classList.add(
            "visible"
        );


        messageTimer =
            setTimeout(() => {

                quickMessage.classList.remove(
                    "visible"
                );


                messageTimer =
                    null;

            }, 850);
    }


    /* =====================================================
       HUD
       ===================================================== */

    function updateHUD() {

        if (scoreElement) {

            scoreElement.textContent =
                `${
                    String(
                        heartsCollected
                    ).padStart(
                        2,
                        "0"
                    )
                } / ${TARGET_HEARTS}`;
        }


        const percentage =
            Math.min(
                100,
                (
                    heartsCollected /
                    TARGET_HEARTS
                ) * 100
            );


        if (progressFill) {

            progressFill.style.width =
                `${percentage}%`;
        }


        if (finalScore) {

            finalScore.textContent =
                finished
                    ? "20 / 20"
                    : `${
                        heartsCollected
                    } / ${TARGET_HEARTS}`;
        }
    }


    /* =====================================================
       RENDER
       ===================================================== */

    function render() {

        grid.innerHTML =
            "";


        /*
         * SERPIENTE
         */

        snake.forEach(
            (segment, index) => {

                const element =
                    document.createElement(
                        "div"
                    );


                element.className =
                    "love-snake-segment";


                if (index === 0) {

                    element.classList.add(
                        "head"
                    );
                }


                if (
                    index ===
                    snake.length - 1
                ) {

                    element.classList.add(
                        "tail"
                    );
                }


                setGridPosition(
                    element,
                    segment.x,
                    segment.y
                );


                grid.appendChild(
                    element
                );
            }
        );


        /*
         * CORAZÓN
         */

        if (food) {

            const foodElement =
                document.createElement(
                    "div"
                );


            foodElement.className =
                "love-snake-food";


            foodElement.textContent =
                "♥";


            setGridPosition(
                foodElement,
                food.x,
                food.y
            );


            grid.appendChild(
                foodElement
            );
        }


        /*
         * POWER-UP
         */

        if (powerUp) {

            const powerElement =
                document.createElement(
                    "div"
                );


            powerElement.className =
                `love-snake-powerup ${powerUp.type}`;


            if (
                powerUp.type ===
                "magnet"
            ) {

                powerElement.textContent =
                    "M";
            }


            if (
                powerUp.type ===
                "slow"
            ) {

                powerElement.textContent =
                    "S";
            }


            if (
                powerUp.type ===
                "bonus"
            ) {

                powerElement.textContent =
                    "+";
            }


            setGridPosition(
                powerElement,
                powerUp.x,
                powerUp.y
            );


            grid.appendChild(
                powerElement
            );
        }
    }


    /* =====================================================
       POSICIÓN EN GRID
       ===================================================== */

    function setGridPosition(
        element,
        x,
        y
    ) {

        element.style.gridColumn =
            `${x + 1}`;

        element.style.gridRow =
            `${y + 1}`;
    }


    /* =====================================================
       CAMBIAR DIRECCIÓN
       ===================================================== */

    function changeDirection(
        x,
        y
    ) {

        if (
            !running ||
            finished ||
            recovering
        ) {
            return;
        }


        /*
         * Snake clásico:
         * no puede girar directamente
         * 180 grados.
         */

        const isOpposite =
            (
                x ===
                    -direction.x &&
                y ===
                    -direction.y
            );


        if (isOpposite) {

            return;
        }


        nextDirection = {
            x,
            y
        };
    }


    /* =====================================================
       CONTROLES EN PANTALLA
       ===================================================== */

    upButton?.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            changeDirection(
                0,
                -1
            );
        }
    );


    downButton?.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            changeDirection(
                0,
                1
            );
        }
    );


    leftButton?.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            changeDirection(
                -1,
                0
            );
        }
    );


    rightButton?.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            changeDirection(
                1,
                0
            );
        }
    );


    /* =====================================================
       SWIPE EN EL TABLERO
       ===================================================== */

    let touchStartX = 0;

    let touchStartY = 0;


    board.addEventListener(
        "pointerdown",
        event => {

            touchStartX =
                event.clientX;

            touchStartY =
                event.clientY;
        }
    );


    board.addEventListener(
        "pointerup",
        event => {

            if (
                !running ||
                finished
            ) {
                return;
            }


            const differenceX =
                event.clientX -
                touchStartX;


            const differenceY =
                event.clientY -
                touchStartY;


            /*
             * Evitamos interpretar
             * un simple toque como swipe.
             */

            if (
                Math.abs(
                    differenceX
                ) < 20 &&
                Math.abs(
                    differenceY
                ) < 20
            ) {

                return;
            }


            if (
                Math.abs(
                    differenceX
                ) >
                Math.abs(
                    differenceY
                )
            ) {

                if (
                    differenceX > 0
                ) {

                    changeDirection(
                        1,
                        0
                    );

                } else {

                    changeDirection(
                        -1,
                        0
                    );
                }

            } else {

                if (
                    differenceY > 0
                ) {

                    changeDirection(
                        0,
                        1
                    );

                } else {

                    changeDirection(
                        0,
                        -1
                    );
                }
            }
        }
    );


    /* =====================================================
       TECLADO
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !gameScreen.classList
                    .contains("visible")
            ) {
                return;
            }


            const key =
                event.key.toLowerCase();


            if (
                key === "arrowup" ||
                key === "w"
            ) {

                event.preventDefault();

                changeDirection(
                    0,
                    -1
                );
            }


            if (
                key === "arrowdown" ||
                key === "s"
            ) {

                event.preventDefault();

                changeDirection(
                    0,
                    1
                );
            }


            if (
                key === "arrowleft" ||
                key === "a"
            ) {

                event.preventDefault();

                changeDirection(
                    -1,
                    0
                );
            }


            if (
                key === "arrowright" ||
                key === "d"
            ) {

                event.preventDefault();

                changeDirection(
                    1,
                    0
                );
            }
        }
    );


    /* =====================================================
       VICTORIA
       ===================================================== */

    function finishGame() {

        if (finished) {
            return;
        }


        finished =
            true;

        running =
            false;

        heartsCollected =
            TARGET_HEARTS;


        updateHUD();


        stopGame();

        clearPowerEffects();


        /*
         * GAME 04 COMPLETADO.
         */

        if (
            typeof completeGame ===
            "function"
        ) {

            completeGame(4);
        }


        setTimeout(() => {

            prepareVictoryLayout();

        }, 500);
    }


    /* =====================================================
       SECRET 04
       ===================================================== */

    secretButton?.addEventListener(
        "click",
        () => {

            secretModal?.classList.add(
                "visible"
            );
        }
    );


    function closeSecret() {

        secretModal?.classList.remove(
            "visible"
        );
    }


    secretClose?.addEventListener(
        "click",
        closeSecret
    );


    secretContinue?.addEventListener(
        "click",
        closeSecret
    );


    secretModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                secretModal
            ) {

                closeSecret();
            }
        }
    );


    /* =====================================================
       ESCAPE
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !==
                "Escape"
            ) {
                return;
            }


            /*
             * Cerrar secreto primero.
             */

            if (
                secretModal?.classList
                    .contains("visible")
            ) {

                closeSecret();

                return;
            }


            /*
             * Volver al Arcade.
             */

            if (
                gameScreen.classList
                    .contains("visible")
            ) {

                returnToArcade();
            }
        }
    );

});

/* =========================================================
   LOVE ARCADE
   GAME 05 — ROAD TO US
   FINAL GAME
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const arcadeScreen =
        document.getElementById("arcade-screen");

    const gameScreen =
        document.getElementById("road-us-screen");

    const gameButton =
        document.getElementById("game-5-button");

    const genericGameModal =
        document.getElementById("arcade-game-modal");

    const backButton =
        document.getElementById("back-from-road-us");

    const gameSection =
        document.getElementById("road-us-game-section");

    const victoryScreen =
        document.getElementById("road-us-victory");

    const board =
        document.getElementById("road-us-board");

    const objectsLayer =
        document.getElementById("road-us-objects");

    const car =
        document.getElementById("road-us-car");

    const readyMessage =
        document.getElementById("road-us-ready");

    const quickMessage =
        document.getElementById("road-us-message");

    const bonkMessage =
        document.getElementById("road-us-bonk");

    const activePowerElement =
        document.getElementById("road-us-active-power");

    const finishElement =
        document.getElementById("road-us-finish");

    const heartsElement =
        document.getElementById("road-us-hearts");

    const distanceElement =
        document.getElementById("road-us-distance");

    const progressFill =
        document.getElementById("road-us-progress-fill");

    const leftButton =
        document.getElementById("road-us-left");

    const rightButton =
        document.getElementById("road-us-right");

    const secretButton =
        document.getElementById("road-us-secret-button");

    const returnArcadeButton =
        document.getElementById("road-us-return-arcade");

    const secretModal =
        document.getElementById("road-us-secret-modal");

    const secretClose =
        document.getElementById("road-us-secret-close");

    const secretContinue =
        document.getElementById("road-us-secret-continue");


    /* =====================================================
       COMPROBACIÓN
       ===================================================== */

    if (
        !arcadeScreen ||
        !gameScreen ||
        !gameButton ||
        !gameSection ||
        !board ||
        !objectsLayer ||
        !car
    ) {

        console.error(
            "ROAD TO US: faltan elementos HTML."
        );

        return;
    }


    /* =====================================================
       CONFIGURACIÓN GENERAL
       ===================================================== */

    /*
     * Posiciones horizontales del carro.
     *
     * El camino ocupa aproximadamente
     * del 15% al 85% del tablero.
     */

    const LANES = [
        31,
        50,
        69
    ];

    /*
     * Daniela comienza en el centro.
     */

    let currentLane = 1;


    /*
     * Duración aproximada del recorrido.
     *
     * El progreso aumenta por tiempo.
     * TURBO acelera este progreso.
     */

    const NORMAL_PROGRESS_SPEED = 0.055;

    const TURBO_PROGRESS_SPEED = 0.095;


    /*
     * Velocidad vertical de objetos.
     * Unidad: porcentaje del tablero
     * por frame normalizado.
     */

    const NORMAL_OBJECT_SPEED = 0.34;

    const TURBO_OBJECT_SPEED = 0.47;


    /*
     * Intervalos de aparición.
     */

    const OBSTACLE_INTERVAL = 1650;

    const HEART_INTERVAL = 1250;

    const POWER_INTERVAL = 5200;


    /*
     * Powers.
     */

    const POWER_DURATION = 6500;


    /* =====================================================
       ESTADO DEL JUEGO
       ===================================================== */

    let running = false;

    let finished = false;

    let arriving = false;

    let recovering = false;

    let progress = 0;

    let hearts = 0;

    let lastFrameTime = 0;

    let animationFrame = null;

    let obstacleTimer = null;

    let heartTimer = null;

    let powerTimer = null;

    let startTimer = null;

    let messageTimer = null;

    let recoveryTimer = null;

    let turboTimer = null;

    let shieldTimer = null;

    let finishTimer = null;

    let turboActive = false;

    let shieldActive = false;

    let gameObjects = [];

    let signHistory = new Set();


    /* =====================================================
       MENSAJES DEL CAMINO
       ===================================================== */

    const LOVE_MESSAGES = [

        "RUMBO A NOSOTROS ♥",

        "+1 BESITO",

        "TE ESTOY ESPERANDO ♥",

        "YO TE AMO MÁS",

        "NICE ♥",

        "NO CHOQUES 😂",

        "CASI LLEGAS...",

        "PIECITOS EN CAMINO? 😂",

        "DANIELA + ESTEBAN",

        "SIGUE ♥"

    ];


    /* =====================================================
       CARTELES DE NUESTRA HISTORIA
       ===================================================== */

    const ROAD_SIGNS = [

        {
            progress: 20,
            text: "LECAFÉ ♥",
            id: "lecafe"
        },

        {
            progress: 40,
            text: "GYM ♥",
            id: "gym"
        },

        {
            progress: 60,
            text: "ANTIGUA ♥",
            id: "antigua"
        },

        {
            progress: 80,
            text: "11 · 10 · 2024",
            id: "date"
        },

        {
            progress: 94,
            text: "DESTINATION: ESTEBAN ♥",
            id: "esteban"
        }

    ];


    /* =====================================================
       SCROLL
       ===================================================== */

    function unlockPageScroll() {

        document.documentElement.style.overflow =
            "";

        document.documentElement.style.overflowY =
            "auto";

        document.body.style.overflow =
            "";

        document.body.style.overflowY =
            "auto";

        document.body.style.height =
            "auto";
    }


    /* =====================================================
       LAYOUT DE JUEGO
       ===================================================== */

    function prepareGameLayout() {

        gameScreen.classList.remove(
            "victory-mode"
        );

        gameScreen.classList.add(
            "playing-mode"
        );

        gameScreen.style.height =
            "";

        gameScreen.style.maxHeight =
            "";

        gameScreen.style.minHeight =
            "";

        gameScreen.style.overflow =
            "";

        gameScreen.style.overflowX =
            "";

        gameScreen.style.overflowY =
            "";

        gameSection.style.display =
            "";

        if (victoryScreen) {

            victoryScreen.classList.remove(
                "visible"
            );

            victoryScreen.style.display =
                "";
        }
    }


    /* =====================================================
       LAYOUT DE VICTORIA
       ===================================================== */

    function prepareVictoryLayout() {

        gameScreen.classList.remove(
            "playing-mode"
        );

        gameScreen.classList.add(
            "victory-mode"
        );

        gameSection.style.display =
            "none";

        gameScreen.style.height =
            "auto";

        gameScreen.style.maxHeight =
            "none";

        gameScreen.style.minHeight =
            "100svh";

        gameScreen.style.overflowX =
            "hidden";

        gameScreen.style.overflowY =
            "visible";

        unlockPageScroll();


        if (victoryScreen) {

            victoryScreen.style.display =
                "flex";

            victoryScreen.classList.add(
                "visible"
            );
        }


        requestAnimationFrame(() => {

            window.scrollTo(
                0,
                0
            );
        });
    }


    /* =====================================================
       ABRIR GAME 05
       ===================================================== */

    function openGame() {

        stopGame();

        clearAllPowers();

        clearObjects();


        genericGameModal?.classList.remove(
            "visible"
        );


        prepareGameLayout();


        arcadeScreen.classList.remove(
            "visible"
        );

        arcadeScreen.style.display =
            "none";


        gameScreen.style.display =
            "block";

        gameScreen.classList.add(
            "visible"
        );


        window.scrollTo(
            0,
            0
        );


        startTimer =
            setTimeout(() => {

                resetGame();

                startGame();

            }, 120);
    }


    /* =====================================================
       VOLVER AL ARCADE
       ===================================================== */

    function returnToArcade() {

        stopGame();

        clearAllPowers();

        clearObjects();


        secretModal?.classList.remove(
            "visible"
        );


        gameScreen.classList.remove(
            "visible"
        );

        gameScreen.style.display =
            "none";


        arcadeScreen.style.display =
            "block";

        arcadeScreen.classList.add(
            "visible"
        );


        unlockPageScroll();


        window.scrollTo(
            0,
            0
        );
    }


    /* =====================================================
       BOTONES PRINCIPALES
       ===================================================== */

    gameButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            openGame();
        }
    );


    backButton?.addEventListener(
        "click",
        returnToArcade
    );


    returnArcadeButton?.addEventListener(
        "click",
        returnToArcade
    );


    /* =====================================================
       RESET
       ===================================================== */

    function resetGame() {

        stopGame();

        clearAllPowers();

        clearObjects();


        running = false;

        finished = false;

        arriving = false;

        recovering = false;

        progress = 0;

        hearts = 0;

        currentLane = 1;

        lastFrameTime = 0;

        signHistory =
            new Set();


        car.style.left =
            `${LANES[currentLane]}%`;


        car.style.bottom =
            "8%";


        car.classList.remove(
            "hit",
            "turbo-active",
            "shield-active"
        );


        readyMessage?.classList.remove(
            "hidden"
        );


        quickMessage?.classList.remove(
            "visible"
        );


        bonkMessage?.classList.remove(
            "visible"
        );


        finishElement?.classList.remove(
            "visible"
        );


        if (finishElement) {

            finishElement.style.top =
                "-190px";
        }


        updateHUD();

        updatePowerIndicator();
    }


    /* =====================================================
       START
       ===================================================== */

    function startGame() {

        readyMessage?.classList.remove(
            "hidden"
        );


        startTimer =
            setTimeout(() => {

                if (finished) {
                    return;
                }


                readyMessage?.classList.add(
                    "hidden"
                );


                running =
                    true;


                lastFrameTime =
                    performance.now();


                animationFrame =
                    requestAnimationFrame(
                        gameLoop
                    );


                startSpawnTimers();

            }, 950);
    }


    /* =====================================================
       SPAWN TIMERS
       ===================================================== */

    function startSpawnTimers() {

        obstacleTimer =
            setInterval(() => {

                if (
                    running &&
                    !arriving &&
                    progress < 90
                ) {

                    createObstacle();
                }

            }, OBSTACLE_INTERVAL);


        heartTimer =
            setInterval(() => {

                if (
                    running &&
                    !arriving &&
                    progress < 94
                ) {

                    createHeart();
                }

            }, HEART_INTERVAL);


        powerTimer =
            setInterval(() => {

                if (
                    running &&
                    !arriving &&
                    progress < 88
                ) {

                    createPowerUp();
                }

            }, POWER_INTERVAL);
    }


    /* =====================================================
       STOP
       ===================================================== */

    function stopGame() {

        running =
            false;


        if (animationFrame) {

            cancelAnimationFrame(
                animationFrame
            );

            animationFrame =
                null;
        }


        if (obstacleTimer) {

            clearInterval(
                obstacleTimer
            );

            obstacleTimer =
                null;
        }


        if (heartTimer) {

            clearInterval(
                heartTimer
            );

            heartTimer =
                null;
        }


        if (powerTimer) {

            clearInterval(
                powerTimer
            );

            powerTimer =
                null;
        }


        if (startTimer) {

            clearTimeout(
                startTimer
            );

            startTimer =
                null;
        }


        if (messageTimer) {

            clearTimeout(
                messageTimer
            );

            messageTimer =
                null;
        }


        if (recoveryTimer) {

            clearTimeout(
                recoveryTimer
            );

            recoveryTimer =
                null;
        }


        if (finishTimer) {

            clearTimeout(
                finishTimer
            );

            finishTimer =
                null;
        }
    }


    /* =====================================================
       LOOP PRINCIPAL
       ===================================================== */

    function gameLoop(
        timestamp
    ) {

        if (
            !running ||
            finished
        ) {

            return;
        }


        let delta =
            (
                timestamp -
                lastFrameTime
            ) / 16.6667;


        /*
         * Evita saltos gigantes si
         * la pestaña pierde foco.
         */

        delta =
            Math.min(
                delta,
                2.5
            );


        lastFrameTime =
            timestamp;


        updateProgress(
            delta
        );


        updateObjects(
            delta
        );


        checkRoadSigns();


        if (!arriving) {

            checkCollisions();
        }


        updateHUD();


        animationFrame =
            requestAnimationFrame(
                gameLoop
            );
    }


    /* =====================================================
       PROGRESO
       ===================================================== */

    function updateProgress(
        delta
    ) {

        if (arriving) {
            return;
        }


        const speed =
            turboActive
                ? TURBO_PROGRESS_SPEED
                : NORMAL_PROGRESS_SPEED;


        progress +=
            speed *
            delta;


        /*
         * Al 96% comienza la secuencia
         * de llegada.
         */

        if (
            progress >= 96
        ) {

            progress =
                96;


            beginFinalArrival();
        }
    }


    /* =====================================================
       HUD
       ===================================================== */

    function updateHUD() {

        if (heartsElement) {

            heartsElement.textContent =
                String(
                    hearts
                ).padStart(
                    2,
                    "0"
                );
        }


        const visibleProgress =
            finished
                ? 100
                : Math.min(
                    100,
                    Math.floor(
                        progress
                    )
                );


        if (distanceElement) {

            distanceElement.textContent =
                `${visibleProgress}%`;
        }


        if (progressFill) {

            progressFill.style.width =
                `${visibleProgress}%`;
        }
    }


    /* =====================================================
       CREAR OBSTÁCULO
       ===================================================== */

    function createObstacle() {

        /*
         * No saturamos el tablero.
         */

        const obstacleCount =
            gameObjects.filter(
                object =>
                    object.type ===
                    "obstacle"
            ).length;


        if (
            obstacleCount >= 3
        ) {

            return;
        }


        const lane =
            Math.floor(
                Math.random() *
                LANES.length
            );


        const element =
            document.createElement(
                "div"
            );


        const variants = [
            "",
            "red",
            "gold"
        ];


        const variant =
            variants[
                Math.floor(
                    Math.random() *
                    variants.length
                )
            ];


        element.className =
            `road-us-obstacle ${variant}`;


        objectsLayer.appendChild(
            element
        );


        const object = {

            type: "obstacle",

            lane,

            x: LANES[lane],

            y: -15,

            element,

            removed: false

        };


        gameObjects.push(
            object
        );


        updateObjectPosition(
            object
        );
    }


    /* =====================================================
       CREAR CORAZÓN
       ===================================================== */

    function createHeart() {

        const lane =
            Math.floor(
                Math.random() *
                LANES.length
            );


        const element =
            document.createElement(
                "div"
            );


        element.className =
            "road-us-heart-item";


        element.textContent =
            "♥";


        objectsLayer.appendChild(
            element
        );


        const object = {

            type: "heart",

            lane,

            x: LANES[lane],

            y: -8,

            element,

            removed: false

        };


        gameObjects.push(
            object
        );


        updateObjectPosition(
            object
        );
    }


    /* =====================================================
       CREAR POWER-UP
       ===================================================== */

    function createPowerUp() {

        const existingPower =
            gameObjects.some(
                object =>
                    object.type ===
                    "power"
            );


        if (existingPower) {
            return;
        }


        const lane =
            Math.floor(
                Math.random() *
                LANES.length
            );


        const types = [
            "turbo",
            "shield",
            "love"
        ];


        const type =
            types[
                Math.floor(
                    Math.random() *
                    types.length
                )
            ];


        const element =
            document.createElement(
                "div"
            );


        element.className =
            `road-us-powerup ${type}`;


        if (
            type ===
            "turbo"
        ) {

            element.textContent =
                "T";
        }


        if (
            type ===
            "shield"
        ) {

            element.textContent =
                "S";
        }


        if (
            type ===
            "love"
        ) {

            element.textContent =
                "♥";
        }


        objectsLayer.appendChild(
            element
        );


        const object = {

            type: "power",

            powerType: type,

            lane,

            x: LANES[lane],

            y: -8,

            element,

            removed: false

        };


        gameObjects.push(
            object
        );


        updateObjectPosition(
            object
        );
    }


    /* =====================================================
       ACTUALIZAR OBJETOS
       ===================================================== */

    function updateObjects(
        delta
    ) {

        const speed =
            turboActive
                ? TURBO_OBJECT_SPEED
                : NORMAL_OBJECT_SPEED;


        gameObjects.forEach(
            object => {

                if (
                    object.removed
                ) {

                    return;
                }


                /*
                 * Los carteles se mueven
                 * ligeramente más despacio.
                 */

                const objectSpeed =
                    object.type === "sign"
                        ? speed * 0.82
                        : speed;


                object.y +=
                    objectSpeed *
                    delta;


                updateObjectPosition(
                    object
                );


                if (
                    object.y > 112
                ) {

                    removeObject(
                        object
                    );
                }
            }
        );


        gameObjects =
            gameObjects.filter(
                object =>
                    !object.removed
            );
    }


    /* =====================================================
       POSICIONAR OBJETO
       ===================================================== */

    function updateObjectPosition(
        object
    ) {

        if (
            !object.element
        ) {

            return;
        }


        object.element.style.left =
            `${object.x}%`;


        object.element.style.top =
            `${object.y}%`;


        /*
         * Los objetos del camino se centran
         * respecto a su carril.
         */

        if (
            object.type !==
            "sign"
        ) {

            object.element.style.transform =
                "translateX(-50%)";
        }
    }


    /* =====================================================
       ELIMINAR OBJETO
       ===================================================== */

    function removeObject(
        object
    ) {

        if (
            !object ||
            object.removed
        ) {

            return;
        }


        object.removed =
            true;


        object.element?.remove();
    }


    /* =====================================================
       LIMPIAR OBJETOS
       ===================================================== */

    function clearObjects() {

        gameObjects.forEach(
            object => {

                object.element?.remove();
            }
        );


        gameObjects =
            [];


        objectsLayer.innerHTML =
            "";
    }


    /* =====================================================
       COLISIONES
       ===================================================== */

    function checkCollisions() {

        if (
            recovering ||
            finished ||
            arriving
        ) {

            return;
        }


        const carRect =
            car.getBoundingClientRect();


        gameObjects.forEach(
            object => {

                if (
                    object.removed ||
                    object.type === "sign"
                ) {

                    return;
                }


                const rect =
                    object.element
                        .getBoundingClientRect();


                if (
                    rectanglesOverlap(
                        carRect,
                        rect
                    )
                ) {

                    if (
                        object.type ===
                        "heart"
                    ) {

                        collectHeart(
                            object
                        );

                        return;
                    }


                    if (
                        object.type ===
                        "power"
                    ) {

                        collectPower(
                            object
                        );

                        return;
                    }


                    if (
                        object.type ===
                        "obstacle"
                    ) {

                        hitObstacle(
                            object
                        );
                    }
                }
            }
        );
    }


    /* =====================================================
       RECTÁNGULOS
       ===================================================== */

    function rectanglesOverlap(
        a,
        b
    ) {

        /*
         * Hitbox ligeramente reducida
         * para hacerlo más justo.
         */

        const paddingX =
            7;

        const paddingY =
            6;


        return !(
            a.right -
                paddingX <
                b.left +
                paddingX ||

            a.left +
                paddingX >
                b.right -
                paddingX ||

            a.bottom -
                paddingY <
                b.top +
                paddingY ||

            a.top +
                paddingY >
                b.bottom -
                paddingY
        );
    }


    /* =====================================================
       RECOGER CORAZÓN
       ===================================================== */

    function collectHeart(
        object
    ) {

        if (
            object.removed
        ) {

            return;
        }


        hearts++;


        object.element.classList.add(
            "collected"
        );


        showRandomLoveMessage();


        setTimeout(() => {

            removeObject(
                object
            );

        }, 180);


        updateHUD();
    }


    /* =====================================================
       CHOQUE
       ===================================================== */

    function hitObstacle(
        object
    ) {

        if (
            object.removed ||
            recovering
        ) {

            return;
        }


        /*
         * Con escudo simplemente
         * destruimos el obstáculo.
         */

        if (shieldActive) {

            showMessage(
                "SHIELD! ♥"
            );


            object.element.style.opacity =
                "0";


            removeObject(
                object
            );


            return;
        }


        recovering =
            true;


        removeObject(
            object
        );


        car.classList.remove(
            "hit"
        );


        void car.offsetWidth;


        car.classList.add(
            "hit"
        );


        bonkMessage?.classList.remove(
            "visible"
        );


        void bonkMessage?.offsetWidth;


        bonkMessage?.classList.add(
            "visible"
        );


        /*
         * No quitamos corazones.
         * No quitamos progreso.
         *
         * GAME OVER no existe aquí.
         */

        recoveryTimer =
            setTimeout(() => {

                car.classList.remove(
                    "hit"
                );


                bonkMessage?.classList.remove(
                    "visible"
                );


                recovering =
                    false;


                recoveryTimer =
                    null;

            }, 650);
    }


    /* =====================================================
       RECOGER POWER
       ===================================================== */

    function collectPower(
        object
    ) {

        if (
            object.removed
        ) {

            return;
        }


        const type =
            object.powerType;


        object.element.classList.add(
            "collected"
        );


        setTimeout(() => {

            removeObject(
                object
            );

        }, 170);


        activatePower(
            type
        );
    }


    /* =====================================================
       ACTIVAR POWER
       ===================================================== */

    function activatePower(
        type
    ) {

        /*
         * TURBO
         * ===============================================
         */

        if (
            type ===
            "turbo"
        ) {

            if (turboTimer) {

                clearTimeout(
                    turboTimer
                );
            }


            turboActive =
                true;


            car.classList.add(
                "turbo-active"
            );


            showMessage(
                "TURBO ♥"
            );


            turboTimer =
                setTimeout(() => {

                    turboActive =
                        false;


                    car.classList.remove(
                        "turbo-active"
                    );


                    turboTimer =
                        null;


                    updatePowerIndicator();

                }, POWER_DURATION);
        }


        /*
         * SHIELD
         * ===============================================
         */

        if (
            type ===
            "shield"
        ) {

            if (shieldTimer) {

                clearTimeout(
                    shieldTimer
                );
            }


            shieldActive =
                true;


            car.classList.add(
                "shield-active"
            );


            showMessage(
                "SHIELD ♥"
            );


            shieldTimer =
                setTimeout(() => {

                    shieldActive =
                        false;


                    car.classList.remove(
                        "shield-active"
                    );


                    shieldTimer =
                        null;


                    updatePowerIndicator();

                }, POWER_DURATION);
        }


        /*
         * LOVE BONUS
         * ===============================================
         */

        if (
            type ===
            "love"
        ) {

            hearts +=
                3;


            /*
             * También da un pequeño
             * empujón hacia Esteban.
             */

            progress =
                Math.min(
                    95,
                    progress + 3
                );


            showMessage(
                "LOVE +3 ♥"
            );


            updateHUD();
        }


        updatePowerIndicator();
    }


    /* =====================================================
       INDICADOR POWER
       ===================================================== */

    function updatePowerIndicator() {

        if (!activePowerElement) {
            return;
        }


        const active = [];


        if (turboActive) {

            active.push(
                "TURBO"
            );
        }


        if (shieldActive) {

            active.push(
                "SHIELD"
            );
        }


        if (
            active.length === 0
        ) {

            activePowerElement.textContent =
                "";

            activePowerElement.classList.remove(
                "visible"
            );

            return;
        }


        activePowerElement.textContent =
            active.join(
                " + "
            ) + " ♥";


        activePowerElement.classList.add(
            "visible"
        );
    }


    /* =====================================================
       LIMPIAR POWERS
       ===================================================== */

    function clearAllPowers() {

        if (turboTimer) {

            clearTimeout(
                turboTimer
            );

            turboTimer =
                null;
        }


        if (shieldTimer) {

            clearTimeout(
                shieldTimer
            );

            shieldTimer =
                null;
        }


        turboActive =
            false;

        shieldActive =
            false;


        car.classList.remove(
            "turbo-active",
            "shield-active"
        );


        if (activePowerElement) {

            activePowerElement.textContent =
                "";

            activePowerElement.classList.remove(
                "visible"
            );
        }
    }


    /* =====================================================
       MENSAJES
       ===================================================== */

    function showRandomLoveMessage() {

        const message =
            LOVE_MESSAGES[
                Math.floor(
                    Math.random() *
                    LOVE_MESSAGES.length
                )
            ];


        showMessage(
            message
        );
    }


    function showMessage(
        text
    ) {

        if (!quickMessage) {
            return;
        }


        if (messageTimer) {

            clearTimeout(
                messageTimer
            );
        }


        quickMessage.textContent =
            text;


        quickMessage.classList.remove(
            "visible"
        );


        void quickMessage.offsetWidth;


        quickMessage.classList.add(
            "visible"
        );


        messageTimer =
            setTimeout(() => {

                quickMessage.classList.remove(
                    "visible"
                );


                messageTimer =
                    null;

            }, 900);
    }


    /* =====================================================
       CARTELES
       ===================================================== */

    function checkRoadSigns() {

        ROAD_SIGNS.forEach(
            sign => {

                if (
                    progress >=
                        sign.progress &&
                    !signHistory.has(
                        sign.id
                    )
                ) {

                    signHistory.add(
                        sign.id
                    );


                    createRoadSign(
                        sign.text
                    );
                }
            }
        );
    }


    /* =====================================================
       CREAR CARTEL
       ===================================================== */

    function createRoadSign(
        text
    ) {

        const element =
            document.createElement(
                "div"
            );


        element.className =
            "road-us-sign";


        element.textContent =
            text;


        objectsLayer.appendChild(
            element
        );


        /*
         * Alternamos izquierda y derecha
         * para que no se sienta repetitivo.
         */

        const leftSide =
            signHistory.size %
                2 ===
            1;


        const object = {

            type: "sign",

            x:
                leftSide
                    ? 1.5
                    : 76,

            y: -12,

            element,

            removed: false

        };


        gameObjects.push(
            object
        );


        updateObjectPosition(
            object
        );


        /*
         * Mensaje especial para el
         * último cartel.
         */

        if (
            text.includes(
                "ESTEBAN"
            )
        ) {

            showMessage(
                "CASI LLEGAS ♥"
            );
        }
    }


    /* =====================================================
       MOVER CARRO
       ===================================================== */

    function moveLeft() {

        if (
            !running ||
            finished ||
            arriving
        ) {

            return;
        }


        currentLane =
            Math.max(
                0,
                currentLane - 1
            );


        updateCarPosition();
    }


    function moveRight() {

        if (
            !running ||
            finished ||
            arriving
        ) {

            return;
        }


        currentLane =
            Math.min(
                LANES.length - 1,
                currentLane + 1
            );


        updateCarPosition();
    }


    function updateCarPosition() {

        car.style.left =
            `${LANES[currentLane]}%`;
    }


    /* =====================================================
       CONTROLES EN PANTALLA
       ===================================================== */

    leftButton?.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            moveLeft();
        }
    );


    rightButton?.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            moveRight();
        }
    );


    /* =====================================================
       SWIPE
       ===================================================== */

    let touchStartX =
        0;


    board.addEventListener(
        "pointerdown",
        event => {

            touchStartX =
                event.clientX;
        }
    );


    board.addEventListener(
        "pointerup",
        event => {

            if (
                !running ||
                finished ||
                arriving
            ) {

                return;
            }


            const difference =
                event.clientX -
                touchStartX;


            if (
                Math.abs(
                    difference
                ) < 25
            ) {

                return;
            }


            if (
                difference > 0
            ) {

                moveRight();

            } else {

                moveLeft();
            }
        }
    );


    /* =====================================================
       TECLADO
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !gameScreen.classList
                    .contains("visible")
            ) {

                return;
            }


            const key =
                event.key.toLowerCase();


            if (
                key === "arrowleft" ||
                key === "a"
            ) {

                event.preventDefault();

                moveLeft();
            }


            if (
                key === "arrowright" ||
                key === "d"
            ) {

                event.preventDefault();

                moveRight();
            }
        }
    );


    /* =====================================================
       SECUENCIA FINAL
       ===================================================== */

    function beginFinalArrival() {

        if (
            arriving ||
            finished
        ) {

            return;
        }


        arriving =
            true;


        /*
         * Dejamos de generar tráfico.
         */

        if (obstacleTimer) {

            clearInterval(
                obstacleTimer
            );

            obstacleTimer =
                null;
        }


        if (heartTimer) {

            clearInterval(
                heartTimer
            );

            heartTimer =
                null;
        }


        if (powerTimer) {

            clearInterval(
                powerTimer
            );

            powerTimer =
                null;
        }


        /*
         * Quitamos obstáculos para que
         * el final sea limpio.
         */

        gameObjects
            .filter(
                object =>
                    object.type !==
                    "sign"
            )
            .forEach(
                object => {

                    removeObject(
                        object
                    );
                }
            );


        showMessage(
            "TE ESTOY ESPERANDO ♥"
        );


        finishElement?.classList.add(
            "visible"
        );


        /*
         * Animamos manualmente la meta
         * entrando desde arriba.
         */

        animateFinishLine();
    }


    /* =====================================================
       ANIMAR META
       ===================================================== */

    function animateFinishLine() {

        if (!finishElement) {

            completeFinalArrival();

            return;
        }


        let finishY =
            -190;


        function moveFinish() {

            if (
                finished
            ) {

                return;
            }


            finishY +=
                4.2;


            finishElement.style.top =
                `${finishY}px`;


            /*
             * Cuando la meta está suficientemente
             * cerca del carro, completamos.
             */

            const boardHeight =
                board.clientHeight;


            if (
                finishY >=
                boardHeight * 0.48
            ) {

                finishElement.style.top =
                    `${boardHeight * 0.48}px`;


                completeFinalArrival();

                return;
            }


            requestAnimationFrame(
                moveFinish
            );
        }


        requestAnimationFrame(
            moveFinish
        );
    }


    /* =====================================================
       LLEGADA A ESTEBAN
       ===================================================== */

    function completeFinalArrival() {

        if (
            finished
        ) {

            return;
        }


        progress =
            100;


        updateHUD();


        showMessage(
            "LLEGASTE ♥"
        );


        /*
         * Daniela avanza ligeramente
         * hacia la meta.
         */

        car.style.bottom =
            "24%";


        finishTimer =
            setTimeout(() => {

                finishGame();

            }, 1100);
    }


    /* =====================================================
       FINAL DEL GAME 05
       ===================================================== */

    function finishGame() {

        if (finished) {

            return;
        }


        finished =
            true;

        running =
            false;

        progress =
            100;


        updateHUD();


        stopGame();

        clearAllPowers();


        /*
         * AQUÍ TERMINAMOS TODO EL ARCADE.
         *
         * Esto debe provocar:
         *
         * 5 / 5
         * y desbloquear la Bóveda.
         */

        if (
            typeof completeGame ===
            "function"
        ) {

            completeGame(5);
        }


        setTimeout(() => {

            prepareVictoryLayout();

        }, 450);
    }


    /* =====================================================
       SECRET 05
       ===================================================== */

    secretButton?.addEventListener(
        "click",
        () => {

            secretModal?.classList.add(
                "visible"
            );
        }
    );


    function closeSecret() {

        secretModal?.classList.remove(
            "visible"
        );
    }


    secretClose?.addEventListener(
        "click",
        closeSecret
    );


    secretContinue?.addEventListener(
        "click",
        closeSecret
    );


    secretModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                secretModal
            ) {

                closeSecret();
            }
        }
    );


    /* =====================================================
       ESCAPE
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !==
                "Escape"
            ) {

                return;
            }


            if (
                secretModal?.classList
                    .contains("visible")
            ) {

                closeSecret();

                return;
            }


            if (
                gameScreen.classList
                    .contains("visible")
            ) {

                returnToArcade();
            }
        }
    );

});