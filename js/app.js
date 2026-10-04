/* =====================================================
   ESTEBAN + DANIELA
   II ANIVERSARIO

   Sistema principal
   ===================================================== */


/* =====================================================
   ELEMENTOS DEL LOGIN
   ===================================================== */

const dateInput =
    document.getElementById("anniversary-date");

const enterButton =
    document.getElementById("enter-button");

const loginMessage =
    document.getElementById("login-message");

const loginScreen =
    document.getElementById("login-screen");

const homeScreen =
    document.getElementById("home-screen");

const memoriesScreen =
    document.getElementById("memories-screen");

const arcadeScreen =
    document.getElementById("arcade-screen");


/* =====================================================
   BOTONES PRINCIPALES
   ===================================================== */

const memoriesButton =
    document.getElementById("memories-button");

const arcadeButton =
    document.getElementById("arcade-button");

const messagesButton =
    document.getElementById("messages-button");

const vaultButton =
    document.getElementById("vault-button");


/* =====================================================
   BOTONES DE RECUERDOS
   ===================================================== */

const backFromMemories =
    document.getElementById("back-from-memories");

const memoriesHomeButton =
    document.getElementById("memories-home-button");


/* =====================================================
   BOTONES DEL ARCADE
   ===================================================== */

const backFromArcade =
    document.getElementById("back-from-arcade");

const arcadeGameModal =
    document.getElementById("arcade-game-modal");

const arcadeModalClose =
    document.getElementById("arcade-modal-close");

const arcadeModalButton =
    document.getElementById("arcade-modal-button");

const arcadeModalTitle =
    document.getElementById("arcade-modal-title");

const arcadeModalText =
    document.getElementById("arcade-modal-text");


/* =====================================================
   PROGRESO DEL ARCADE
   ===================================================== */

const arcadeProgressNumber =
    document.getElementById("arcade-progress-number");

const arcadeProgressFill =
    document.getElementById("arcade-progress-fill");

const arcadeNavProgress =
    document.getElementById("arcade-nav-progress");

const vaultProgress =
    document.getElementById("vault-progress");

const vaultDescription =
    document.getElementById("vault-description");


/* =====================================================
   PREGUNTA DEL PRIMER BESO
   ===================================================== */

const kissEstebanButton =
    document.getElementById("kiss-esteban");

const kissDanielaButton =
    document.getElementById("kiss-daniela");

const kissAnswer =
    document.getElementById("kiss-answer");


/* =====================================================
   CONFIGURACIÓN
   ===================================================== */

const correctDate =
    "11/10/2024";

let attempts = 0;

let loveCounterInterval = null;


/* =====================================================
   FORMATEAR FECHA AUTOMÁTICAMENTE
   ===================================================== */

dateInput.addEventListener(
    "input",
    function () {

        let value =
            this.value.replace(/\D/g, "");

        if (value.length > 8) {

            value =
                value.slice(0, 8);
        }


        if (value.length > 4) {

            value =
                value.slice(0, 2)

                + "/"

                + value.slice(2, 4)

                + "/"

                + value.slice(4);

        }

        else if (value.length > 2) {

            value =
                value.slice(0, 2)

                + "/"

                + value.slice(2);
        }


        this.value = value;
    }
);


/* =====================================================
   COMPROBAR FECHA
   ===================================================== */

function checkDate() {

    const enteredDate =
        dateInput.value.trim();


    if (enteredDate === correctDate) {

        loginMessage.style.color =
            "#c6a15b";

        loginMessage.textContent =
            "Sabía que la recordarías. ❤️";


        dateInput.disabled = true;

        enterButton.disabled = true;


        setTimeout(
            function () {

                loginMessage.textContent =
                    "Bienvenida a nuestra historia...";

            },
            900
        );


        setTimeout(
            function () {

                openHome();

            },
            1900
        );

    }

    else {

        attempts++;

        loginMessage.style.color =
            "#c51f2e";


        if (attempts === 1) {

            loginMessage.textContent =
                "Daniela... ¿En serio? 💀";

        }

        else if (attempts === 2) {

            loginMessage.textContent =
                "Te voy a dar otra oportunidad porque te amo.";

        }

        else if (attempts === 3) {

            loginMessage.textContent =
                "Pista: 11/10/20... tampoco te voy a hacer todo. 🙄";

        }

        else {

            loginMessage.textContent =
                "Amor, a estas alturas ya me estoy preocupando. 😂";

        }


        dateInput.value = "";

        dateInput.focus();
    }
}


/* =====================================================
   BOTÓN ENTRAR
   ===================================================== */

enterButton.addEventListener(
    "click",
    checkDate
);


/* =====================================================
   TECLA ENTER
   ===================================================== */

dateInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            checkDate();
        }

    }
);


/* =====================================================
   ABRIR HOME DESDE LOGIN
   ===================================================== */

function openHome() {

    loginScreen.classList.add(
        "goodbye"
    );


    setTimeout(
        function () {

            loginScreen.style.display =
                "none";


            homeScreen.style.display =
                "block";

            homeScreen.classList.add(
                "visible"
            );


            window.scrollTo(
                0,
                0
            );


            startLoveCounter();

            updateArcadeProgress();

        },
        900
    );
}


/* =====================================================
   CONTADOR DE NUESTRA HISTORIA
   ===================================================== */

function startLoveCounter() {

    const startDate =
        new Date(
            2024,
            9,
            11,
            0,
            0,
            0
        );


    updateLoveCounter(
        startDate
    );


    if (
        loveCounterInterval !== null
    ) {

        clearInterval(
            loveCounterInterval
        );
    }


    loveCounterInterval =
        setInterval(
            function () {

                updateLoveCounter(
                    startDate
                );

            },
            60000
        );
}


/* =====================================================
   ACTUALIZAR CONTADOR
   ===================================================== */

function updateLoveCounter(startDate) {

    const now =
        new Date();


    const difference =
        now - startDate;


    if (difference < 0) {

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            difference /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            difference /
            (1000 * 60)
        );


    document
        .getElementById("counter-days")
        .textContent =
        days.toLocaleString();


    document
        .getElementById("counter-detail")
        .textContent =

        `${hours.toLocaleString()} horas · ` +

        `${minutes.toLocaleString()} minutos · ` +

        "y contando ❤️";
}


/* =====================================================
   OCULTAR PANTALLAS PRINCIPALES
   ===================================================== */

function hideMainScreens() {

    homeScreen.classList.remove(
        "visible"
    );

    memoriesScreen.classList.remove(
        "visible"
    );

    arcadeScreen.classList.remove(
        "visible"
    );


    homeScreen.style.display =
        "none";

    memoriesScreen.style.display =
        "none";

    arcadeScreen.style.display =
        "none";
}


/* =====================================================
   ABRIR NUESTRA HISTORIA
   ===================================================== */

function openMemories() {

    hideMainScreens();


    memoriesScreen.style.display =
        "block";

    memoriesScreen.classList.add(
        "visible"
    );


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


    prepareRevealAnimations();
}


/* =====================================================
   ABRIR ARCADE
   ===================================================== */

function openArcade() {

    hideMainScreens();


    arcadeScreen.style.display =
        "block";

    arcadeScreen.classList.add(
        "visible"
    );


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


    updateArcadeProgress();
}


/* =====================================================
   VOLVER AL HOME
   ===================================================== */

function returnHome() {

    hideMainScreens();


    homeScreen.style.display =
        "block";

    homeScreen.classList.add(
        "visible"
    );


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


    startLoveCounter();

    updateArcadeProgress();
}


/* =====================================================
   BOTÓN RECUERDOS
   ===================================================== */

memoriesButton.addEventListener(
    "click",
    function () {

        openMemories();
    }
);


/* =====================================================
   BOTÓN ARCADE
   ===================================================== */

arcadeButton.addEventListener(
    "click",
    function () {

        openArcade();
    }
);


/* =====================================================
   VOLVER DESDE RECUERDOS
   ===================================================== */

backFromMemories.addEventListener(
    "click",
    function () {

        returnHome();
    }
);


memoriesHomeButton.addEventListener(
    "click",
    function () {

        returnHome();
    }
);


/* =====================================================
   VOLVER DESDE ARCADE
   ===================================================== */

backFromArcade.addEventListener(
    "click",
    function () {

        closeArcadeModal();

        returnHome();
    }
);


/* =====================================================
   ANIMACIONES DE RECUERDOS
   ===================================================== */

let revealObserver = null;


function prepareRevealAnimations() {

    const revealElements =
        memoriesScreen.querySelectorAll(
            ".reveal"
        );


    revealElements.forEach(
        function (element) {

            element.classList.remove(
                "revealed"
            );
        }
    );


    if (revealObserver) {

        revealObserver.disconnect();
    }


    revealObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "revealed"
                                );


                            revealObserver
                                .unobserve(
                                    entry.target
                                );
                        }

                    }
                );

            },

            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );
        }
    );
}


/* =====================================================
   PREGUNTA DEL PRIMER BESO
   ===================================================== */

kissEstebanButton.addEventListener(
    "click",
    function () {

        kissAnswer.style.color =
            "#c51f2e";


        kissAnswer.innerHTML =

            "❌ Información históricamente incorrecta." +

            "<br><br>" +

            "Buen intento, Daniela. 😂";


        kissEstebanButton.style.borderColor =
            "#c51f2e";

        kissDanielaButton.style.borderColor =
            "rgba(198, 161, 91, 0.35)";
    }
);


kissDanielaButton.addEventListener(
    "click",
    function () {

        kissAnswer.style.color =
            "#c6a15b";


        kissAnswer.innerHTML =

            "✓ Correcto." +

            "<br><br>" +

            "Daniela se robó el primer beso." +

            "<br>" +

            "El acusado Esteban no presentó resistencia. 😂❤️";


        kissDanielaButton.style.borderColor =
            "#c6a15b";

        kissEstebanButton.style.borderColor =
            "rgba(198, 161, 91, 0.35)";
    }
);


/* =====================================================
   LOVE ARCADE
   SISTEMA DE PROGRESO
   ===================================================== */


/*
   Aquí guardaremos qué juegos
   han sido completados.

   IMPORTANTE:

   Por ahora los juegos NO se completan
   desde esta pantalla.

   Cada juego real llamará después a:

   completeGame(1)
   completeGame(2)
   etc.

   De esta forma no falseamos el progreso.
*/


const arcadeStorageKey =
    "estebanDanielaArcadeProgress";


/* =====================================================
   OBTENER PROGRESO GUARDADO
   ===================================================== */

function getArcadeProgress() {

    const savedProgress =
        localStorage.getItem(
            arcadeStorageKey
        );


    if (!savedProgress) {

        return [];
    }


    try {

        const parsedProgress =
            JSON.parse(
                savedProgress
            );


        if (
            Array.isArray(
                parsedProgress
            )
        ) {

            return parsedProgress;
        }

    }

    catch (error) {

        console.log(
            "No se pudo leer el progreso del arcade."
        );
    }


    return [];
}


/* =====================================================
   GUARDAR PROGRESO
   ===================================================== */

function saveArcadeProgress(
    progress
) {

    localStorage.setItem(
        arcadeStorageKey,
        JSON.stringify(
            progress
        )
    );
}


/* =====================================================
   COMPLETAR JUEGO

   Esta función ya queda preparada
   para los juegos reales.
   ===================================================== */

function completeGame(
    gameNumber
) {

    let progress =
        getArcadeProgress();


    if (
        !progress.includes(
            gameNumber
        )
    ) {

        progress.push(
            gameNumber
        );


        progress.sort(
            function (a, b) {

                return a - b;
            }
        );


        saveArcadeProgress(
            progress
        );
    }


    updateArcadeProgress();
}


/* =====================================================
   ACTUALIZAR INTERFAZ DE PROGRESO
   ===================================================== */

function updateArcadeProgress() {

    const progress =
        getArcadeProgress();


    const completedGames =
        progress.length;


    /*
       Número principal
    */

    arcadeProgressNumber.textContent =
        `${completedGames} / 5`;


    /*
       Navegación superior
    */

    arcadeNavProgress.textContent =
        `${completedGames} / 5`;


    /*
       Barra
    */

    const percentage =
        completedGames * 20;


    arcadeProgressFill.style.width =
        `${percentage}%`;


    /*
       Corazones
    */

    document
        .querySelectorAll(
            ".progress-heart"
        )
        .forEach(
            function (heart) {

                const gameNumber =
                    Number(
                        heart.dataset.game
                    );


                if (
                    progress.includes(
                        gameNumber
                    )
                ) {

                    heart.classList.add(
                        "unlocked"
                    );

                }

                else {

                    heart.classList.remove(
                        "unlocked"
                    );
                }

            }
        );


    /*
       Tarjetas de juegos
    */

    document
        .querySelectorAll(
            ".arcade-game-card"
        )
        .forEach(
            function (card) {

                const gameNumber =
                    Number(
                        card.dataset.game
                    );


                const status =
                    card.querySelector(
                        ".game-status"
                    );


                if (
                    progress.includes(
                        gameNumber
                    )
                ) {

                    card.classList.add(
                        "completed"
                    );


                    status.innerHTML =
                        '<span class="status-complete">COMPLETE ♥</span>';

                }

                else {

                    card.classList.remove(
                        "completed"
                    );


                    status.innerHTML =
                        '<span class="status-ready">READY</span>';
                }

            }
        );


    /*
       Bóveda del Home
    */

    updateVault(
        completedGames
    );
}


/* =====================================================
   ACTUALIZAR BÓVEDA
   ===================================================== */

function updateVault(
    completedGames
) {

    if (
        completedGames >= 5
    ) {

        vaultProgress.textContent =
            "DESBLOQUEADA";


        vaultDescription.textContent =
            "Hay algo esperándote.";


        vaultButton.classList.remove(
            "locked-card"
        );


        vaultButton.classList.add(
            "vault-unlocked"
        );

    }

    else {

        vaultProgress.textContent =
            `${completedGames} / 5`;


        vaultDescription.textContent =
            "Completa el arcade para descubrirlo todo.";


        vaultButton.classList.add(
            "locked-card"
        );


        vaultButton.classList.remove(
            "vault-unlocked"
        );
    }
}


/* =====================================================
   INFORMACIÓN DE LOS JUEGOS
   ===================================================== */

const arcadeGames = {

    1: {

        title:
            "LOVE INVADERS",

        text:
            "GAME 01 // Nuestra primera misión. Defiende nuestro amor de todo lo que intente interponerse. ❤️"

    },


    2: {

        title:
            "LOVE MAZE",

        text:
            "GAME 02 // Hay muchos caminos, pero solamente uno termina donde quiero estar: contigo. ❤️"

    },


    3: {

        title:
            "BREAK MY HEART",

        text:
            "GAME 03 // Rompe todos los bloques. Aunque técnicamente llegaste tarde... mi corazón ya es tuyo. 😂❤️"

    },


    4: {

        title:
            "LOVE SNAKE",

        text:
            "GAME 04 // Recoge corazones y haz crecer nuestra historia. Aquí tampoco existe el Game Over. ❤️"

    },


    5: {

        title:
            "ROAD TO US",

        text:
            "FINAL GAME // Un último viaje. Tú, yo y todo el camino que todavía nos queda por recorrer. ❤️"

    }

};


/* =====================================================
   ABRIR MODAL DE JUEGO
   ===================================================== */

function openGamePreview(
    gameNumber
) {

    const game =
        arcadeGames[
            gameNumber
        ];


    if (!game) {

        return;
    }


    arcadeModalTitle.textContent =
        game.title;


    arcadeModalText.innerHTML =

        game.text

        + "<br><br>"

        + "<span style='color:#ffc85c;'>"

        + "INSERT COIN..."

        + "</span>"

        + "<br><br>"

        + "El juego se instalará en el siguiente paso.";


    arcadeGameModal.classList.add(
        "visible"
    );


    document.body.style.overflow =
        "hidden";
}


/* =====================================================
   CERRAR MODAL
   ===================================================== */

function closeArcadeModal() {

    arcadeGameModal.classList.remove(
        "visible"
    );


    document.body.style.overflow =
        "";
}


/* =====================================================
   TARJETAS DE JUEGOS
   ===================================================== */

document
    .querySelectorAll(
        ".arcade-game-card"
    )
    .forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    const gameNumber =
                        Number(
                            card.dataset.game
                        );


                    openGamePreview(
                        gameNumber
                    );
                }
            );

        }
    );


/* =====================================================
   CERRAR MODAL
   ===================================================== */

arcadeModalClose.addEventListener(
    "click",
    closeArcadeModal
);


arcadeModalButton.addEventListener(
    "click",
    closeArcadeModal
);


/*
   Cerrar tocando fuera de la ventana
*/

arcadeGameModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            arcadeGameModal
        ) {

            closeArcadeModal();
        }

    }
);


/*
   Cerrar con ESC
*/

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
            &&
            arcadeGameModal.classList.contains(
                "visible"
            )
        ) {

            closeArcadeModal();
        }

    }
);


/* =====================================================
   PRESS START
   ===================================================== */

const arcadeStartButton =
    document.querySelector(
        ".arcade-start-button"
    );


arcadeStartButton.addEventListener(
    "click",
    function () {

        /*
           El enlace ya baja hasta
           #arcade-games.

           Esto solamente actualiza
           el progreso justo antes.
        */

        updateArcadeProgress();
    }
);


/* =====================================================
   BOTÓN MENSAJES

   Todavía no está construido.
   ===================================================== */

messagesButton.addEventListener(
    "click",
    function () {

        /*
           Lo construiremos después.

           Por ahora no hacemos nada
           para no utilizar alert().
        */

    }
);


/* =====================================================
   BÓVEDA
   ===================================================== */

vaultButton.addEventListener(
    "click",
    function () {

        const progress =
            getArcadeProgress();


        /*
           Solamente podrá abrirse
           cuando estén los cinco juegos.
        */

        if (
            progress.length < 5
        ) {

            return;
        }


        /*
           La pantalla final de la bóveda
           la construiremos después.
        */

    }
);


/* =====================================================
   CORAZÓN SECRETO
   ===================================================== */

let secretHeartClicks = 0;


const secretHeart =
    document.getElementById(
        "secret-heart"
    );


secretHeart.addEventListener(
    "click",
    function () {

        secretHeartClicks++;


        /*
           Este pequeño desgraciado
           todavía tiene secretos 😂
        */

    }
);


/* =====================================================
   PREVENCIÓN DE IMÁGENES ARRASTRADAS
   ===================================================== */

const memoryImages =
    document.querySelectorAll(
        ".memories-screen img"
    );


memoryImages.forEach(
    function (image) {

        image.setAttribute(
            "draggable",
            "false"
        );
    }
);


/* =====================================================
   CARGA INICIAL DEL PROGRESO
   ===================================================== */

updateArcadeProgress();


/* =====================================================
   FUNCIÓN TEMPORAL DE DESARROLLO

   NO se ejecuta automáticamente.

   Si alguna vez necesitamos comprobar
   visualmente el desbloqueo de la bóveda,
   podremos usarla desde la consola.

   resetArcadeProgress()
   ===================================================== */

function resetArcadeProgress() {

    localStorage.removeItem(
        arcadeStorageKey
    );


    updateArcadeProgress();


    console.log(
        "Progreso del arcade reiniciado."
    );
}

/* =====================================================
   MENSAJES
   ESTEBAN + DANIELA
   ===================================================== */


/* =====================================================
   ELEMENTOS DE MENSAJES
   ===================================================== */

const messagesScreen =
    document.getElementById("messages-screen");

const backFromMessages =
    document.getElementById("back-from-messages");

const messagesHomeButton =
    document.getElementById("messages-home-button");

const messagesProgressText =
    document.getElementById("messages-progress-text");

const messageViewer =
    document.getElementById("message-viewer");

const messageViewerNumber =
    document.getElementById("message-viewer-number");

const messageViewerClose =
    document.getElementById("message-viewer-close");

const messageViewerDone =
    document.getElementById("message-viewer-done");

const messagesComplete =
    document.getElementById("messages-complete");

const openFinalMessageButton =
    document.getElementById("open-final-message");

const finalMessageModal =
    document.getElementById("final-message-modal");

const finalMessageClose =
    document.getElementById("final-message-close");

const messageTabs =
    document.querySelectorAll(".message-tab");

const messagePanels =
    document.querySelectorAll(".message-panel");


/* =====================================================
   CONFIGURACIÓN DEL PROGRESO
   ===================================================== */

const messagesStorageKey =
    "estebanDanielaMessagesProgress";


/* =====================================================
   OBTENER MENSAJES LEÍDOS
   ===================================================== */

function getMessagesProgress() {

    const savedProgress =
        localStorage.getItem(
            messagesStorageKey
        );


    if (!savedProgress) {

        return [];
    }


    try {

        const parsedProgress =
            JSON.parse(
                savedProgress
            );


        if (
            Array.isArray(
                parsedProgress
            )
        ) {

            return parsedProgress;
        }

    }

    catch (error) {

        console.log(
            "No se pudo leer el progreso de Mensajes."
        );
    }


    return [];
}


/* =====================================================
   GUARDAR PROGRESO
   ===================================================== */

function saveMessagesProgress(
    progress
) {

    localStorage.setItem(
        messagesStorageKey,
        JSON.stringify(
            progress
        )
    );
}


/* =====================================================
   OCULTAR PANTALLA DE MENSAJES
   ===================================================== */

function hideMessagesScreen() {

    if (!messagesScreen) {

        return;
    }


    messagesScreen.classList.remove(
        "visible"
    );


    messagesScreen.style.display =
        "none";


    messagesScreen.hidden =
        true;


    closeMessageViewer();

    closeFinalMessage();
}


/* =====================================================
   ABRIR MENSAJES
   ===================================================== */

function openMessages() {

    /*
       Usamos la función que ya existe
       para ocultar Home, Recuerdos y Arcade.
    */

    hideMainScreens();


    /*
       Quitamos hidden porque el HTML
       mantiene Mensajes protegido al iniciar.
    */

    messagesScreen.hidden =
        false;


    messagesScreen.style.display =
        "block";


    messagesScreen.classList.add(
        "visible"
    );


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


    updateMessagesProgress();
}


/* =====================================================
   VOLVER AL HOME DESDE MENSAJES
   ===================================================== */

function returnHomeFromMessages() {

    hideMessagesScreen();


    homeScreen.style.display =
        "block";


    homeScreen.classList.add(
        "visible"
    );


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


    startLoveCounter();

    updateArcadeProgress();
}


/* =====================================================
   ABRIR UN MENSAJE
   ===================================================== */

function openMessage(
    messageNumber
) {

    /*
       Primero escondemos todos los paneles.
       Así jamás pueden aparecer dos monitos
       al mismo tiempo.
    */

    messagePanels.forEach(
        function (panel) {

            panel.hidden =
                true;
        }
    );


    /*
       Buscamos solamente el mensaje
       seleccionado.
    */

    const selectedPanel =
        document.querySelector(
            `.message-panel[data-panel="${messageNumber}"]`
        );


    if (!selectedPanel) {

        return;
    }


    /*
       Número mostrado arriba.
       1 -> 01
       2 -> 02
       etc.
    */

    messageViewerNumber.textContent =
        String(
            messageNumber
        ).padStart(
            2,
            "0"
        );


    /*
       Mostramos únicamente
       el panel seleccionado.
    */

    selectedPanel.hidden =
        false;


    /*
       Abrimos el visor.
    */

    messageViewer.hidden =
        false;


    document.body.style.overflow =
        "hidden";


    /*
       Guardamos el mensaje como leído.
    */

    markMessageAsRead(
        messageNumber
    );
}


/* =====================================================
   CERRAR VISOR
   ===================================================== */

function closeMessageViewer() {

    if (!messageViewer) {

        return;
    }


    messageViewer.hidden =
        true;


    /*
       Volvemos a ocultar todos
       los paneles individuales.
    */

    messagePanels.forEach(
        function (panel) {

            panel.hidden =
                true;
        }
    );


    document.body.style.overflow =
        "";
}


/* =====================================================
   MARCAR MENSAJE COMO LEÍDO
   ===================================================== */

function markMessageAsRead(
    messageNumber
) {

    let progress =
        getMessagesProgress();


    if (
        !progress.includes(
            messageNumber
        )
    ) {

        progress.push(
            messageNumber
        );


        progress.sort(
            function (a, b) {

                return a - b;
            }
        );


        saveMessagesProgress(
            progress
        );
    }


    updateMessagesProgress();
}


/* =====================================================
   ACTUALIZAR PROGRESO 0 / 8
   ===================================================== */

function updateMessagesProgress() {

    const progress =
        getMessagesProgress();


    const completedMessages =
        progress.length;


    /*
       Contador superior
    */

    messagesProgressText.textContent =
        `${completedMessages} / 8`;


    /*
       Actualizamos visualmente
       cada pestaña.
    */

    messageTabs.forEach(
        function (tab) {

            const messageNumber =
                Number(
                    tab.dataset.message
                );


            const status =
                tab.querySelector(
                    "small"
                );


            if (
                progress.includes(
                    messageNumber
                )
            ) {

                tab.classList.add(
                    "read"
                );


                if (status) {

                    status.textContent =
                        "LEÍDO";
                }

            }

            else {

                tab.classList.remove(
                    "read"
                );


                if (status) {

                    status.textContent =
                        "CERRADO";
                }
            }

        }
    );


    /*
       Cuando Daniela haya abierto
       los ocho mensajes aparece
       el pequeño secreto.
    */

    if (
        completedMessages >= 8
    ) {

        messagesComplete.hidden =
            false;

    }

    else {

        messagesComplete.hidden =
            true;
    }
}


/* =====================================================
   PESTAÑAS 01 - 08
   ===================================================== */

messageTabs.forEach(
    function (tab) {

        tab.addEventListener(
            "click",
            function () {

                const messageNumber =
                    Number(
                        tab.dataset.message
                    );


                openMessage(
                    messageNumber
                );
            }
        );

    }
);


/* =====================================================
   CERRAR MENSAJE
   ===================================================== */

messageViewerClose.addEventListener(
    "click",
    function () {

        closeMessageViewer();
    }
);


messageViewerDone.addEventListener(
    "click",
    function () {

        closeMessageViewer();
    }
);


/*
   También se puede cerrar tocando
   el fondo oscuro.
*/

messageViewer.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            messageViewer
        ) {

            closeMessageViewer();
        }
    }
);


/* =====================================================
   MENSAJE EXTRA
   ===================================================== */

function openFinalMessage() {

    finalMessageModal.hidden =
        false;


    document.body.style.overflow =
        "hidden";
}


function closeFinalMessage() {

    if (!finalMessageModal) {

        return;
    }


    finalMessageModal.hidden =
        true;


    document.body.style.overflow =
        "";
}


openFinalMessageButton.addEventListener(
    "click",
    function () {

        openFinalMessage();
    }
);


finalMessageClose.addEventListener(
    "click",
    function () {

        closeFinalMessage();
    }
);


/*
   Cerrar mensaje final
   tocando fuera de la tarjeta.
*/

finalMessageModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            finalMessageModal
        ) {

            closeFinalMessage();
        }
    }
);


/* =====================================================
   TECLA ESC
   ===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !==
            "Escape"
        ) {

            return;
        }


        if (
            !finalMessageModal.hidden
        ) {

            closeFinalMessage();

            return;
        }


        if (
            !messageViewer.hidden
        ) {

            closeMessageViewer();
        }
    }
);


/* =====================================================
   BOTÓN MENSAJES DEL HOME

   El app.js original ya tiene un listener
   vacío en este mismo botón.

   No hace falta eliminarlo:
   este segundo listener es el que realmente
   abre la nueva sección.
   ===================================================== */

messagesButton.addEventListener(
    "click",
    function () {

        openMessages();
    }
);


/* =====================================================
   VOLVER DESDE MENSAJES
   ===================================================== */

backFromMessages.addEventListener(
    "click",
    function () {

        returnHomeFromMessages();
    }
);


messagesHomeButton.addEventListener(
    "click",
    function () {

        returnHomeFromMessages();
    }
);


/* =====================================================
   EVITAR ARRASTRAR LOS MONITOS
   ===================================================== */

document
    .querySelectorAll(
        ".messages-screen img"
    )
    .forEach(
        function (image) {

            image.setAttribute(
                "draggable",
                "false"
            );
        }
    );


/* =====================================================
   ESTADO INICIAL
   ===================================================== */

hideMessagesScreen();

updateMessagesProgress();


/* =====================================================
   FUNCIÓN DE DESARROLLO

   NO se ejecuta automáticamente.

   Si algún día queremos reiniciar
   solamente Mensajes desde la consola:

   resetMessagesProgress()
   ===================================================== */

function resetMessagesProgress() {

    localStorage.removeItem(
        messagesStorageKey
    );


    updateMessagesProgress();


    console.log(
        "Progreso de Mensajes reiniciado."
    );
}

/* =====================================================
   LA BÓVEDA
   ESTEBAN + DANIELA
   ===================================================== */


/* =====================================================
   ELEMENTOS DE LA BÓVEDA
   ===================================================== */

const vaultScreen =
    document.getElementById("vault-screen");

const backFromVault =
    document.getElementById("back-from-vault");

const vaultHomeButton =
    document.getElementById("vault-home-button");


/* =====================================================
   ABRIR LA BÓVEDA
   ===================================================== */

function openVault() {

    /*
       Seguridad adicional:
       la Bóveda solamente abre
       si los 5 juegos están terminados.
    */

    const progress =
        getArcadeProgress();


    if (
        progress.length < 5
    ) {

        return;
    }


    /*
       Ocultamos Home, Recuerdos
       y Arcade.
    */

    hideMainScreens();


    /*
       Por si Mensajes estuviera abierto.
    */

    if (
        typeof hideMessagesScreen ===
        "function"
    ) {

        hideMessagesScreen();
    }


    /*
       Quitamos la protección inicial
       del HTML.
    */

    vaultScreen.hidden =
        false;


    /*
       Mostramos la pantalla.
    */

    vaultScreen.style.display =
        "block";


    vaultScreen.classList.add(
        "visible"
    );


    /*
       Comenzamos desde arriba.
    */

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* =====================================================
   CERRAR LA BÓVEDA
   ===================================================== */

function hideVaultScreen() {

    if (!vaultScreen) {

        return;
    }


    vaultScreen.classList.remove(
        "visible"
    );


    vaultScreen.style.display =
        "none";


    vaultScreen.hidden =
        true;
}


/* =====================================================
   VOLVER AL HOME
   ===================================================== */

function returnHomeFromVault() {

    hideVaultScreen();


    homeScreen.style.display =
        "block";


    homeScreen.classList.add(
        "visible"
    );


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


    startLoveCounter();

    updateArcadeProgress();
}


/* =====================================================
   CONECTAR TARJETA BÓVEDA

   Tu app.js original ya tiene un listener
   para vaultButton que comprueba el 5 / 5,
   pero todavía no abre ninguna pantalla.

   Podemos añadir este segundo listener
   sin eliminar el anterior.
   ===================================================== */

vaultButton.addEventListener(
    "click",
    function () {

        const progress =
            getArcadeProgress();


        /*
           Si todavía estuviera bloqueada,
           no hacemos absolutamente nada.
        */

        if (
            progress.length < 5
        ) {

            return;
        }


        /*
           5 / 5:
           bienvenida a La Bóveda.
        */

        openVault();
    }
);


/* =====================================================
   BOTÓN ← VOLVER
   ===================================================== */

backFromVault.addEventListener(
    "click",
    function () {

        returnHomeFromVault();
    }
);


/* =====================================================
   BOTÓN VOLVER A NUESTRO LUGAR
   ===================================================== */

vaultHomeButton.addEventListener(
    "click",
    function () {

        returnHomeFromVault();
    }
);


/* =====================================================
   PROTEGER IMAGEN FINAL
   ===================================================== */

const vaultFinalImage =
    document.querySelector(
        ".vault-final-photo"
    );


if (vaultFinalImage) {

    vaultFinalImage.setAttribute(
        "draggable",
        "false"
    );
}


/* =====================================================
   ESTADO INICIAL
   ===================================================== */

hideVaultScreen();