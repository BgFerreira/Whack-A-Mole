// ------------------------------------------ CLASSE DE CONTROLE DO JOGO -------------------------------------------------------
class WhackAMole {
    constructor(_gameTotalTimer = 60000, _gameInterval = 3000) {
        // 
        this.gamePause = false;
        this.gameTotalTimer = _gameTotalTimer;
        this.gameInterval = _gameInterval;

        // ----------------------------------- INFORMAÇÕES DO JOGADOR ------------------------------------------
        this.playerName = "";
        this.playerTotalPoints = 0;
        this.playerStages = [
            { "name": "Dagobah", "id": "fase-dagobah", "score-easy": 0, "score-normal": 0, "score-hard": 0, "score-total": 0, "enable": true, "bg": "./images/Game-Background_pantano.png" },
            { "name": "Tatooine", "id": "fase-tatooine", "score-easy": 0, "score-normal": 0, "score-hard": 0, "score-total": 0, "enable": true, "bg": "./images/Game-Background-desert.png" },
            { "name": "Hoth", "id": "fase-hoth", "score-easy": 0, "score-normal": 0, "score-hard": 0, "score-total": 0, "enable": false, "id": "fase-hoth", "bg": "./images/background_snow2.png" },
            { "name": "Death Star", "id": "fase-deathstar", "score-easy": 0, "score-normal": 0, "score-hard": 0, "score-total": 0, "enable": false, "bg": "./images/Elevator_room_1.jpg" }];
        this.playerConfig = {
            "config": "config",
            "music": 1,
            "effects": 1,
            "control": "keyboard",
            "keys": ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
        };
        this.playerLanguage = { "language": "pt-br", "title": "MOLE WARS", "buttonLogin": "Iniciar", "screenLoadingText": "CARREGANDO" };

        // ----------------------------- FASE QUE SERÁ JOGADA -----------------------------------
        this.stagePlayId;
        this.stagePlayName;

        // SCORE
        this.stageScore = 0; // -------  pontuacao total da fase do jogo.
        this.stagePlayerScore = 0; // -- pontuação do jogador na fase do jogo.
        this.stageResult = 0; // ------- resultado

        // STAGE
        this.stageDifficultSelected; // ---- nível de dificuldade escolhido para a fase.
        this.stageActualSelected; // ------- fase escolhida

        // GAME
        this.amountMoles = 0; //------- variavel que armaneza a quantidade de mole por vez
        this.currentMole = 0; // -------numero maximo pro random de moles
        this.mole = 0; //-------------- número de toupeiras
        this.spaceTeste = []; // -------armazena a ordem das moles

        // -------------- SOUND --------------
        // -------------- MUSIC --------------
        this.soundGameMusicIntro;
        this.soundGameMusicMap;
        this.soundGameMusicDifficult;
        this.soundGameMusicPhase;
        this.soundGameMusicGameOver;
        this.soundGameMusicVictory;
        // -------------- EFFECTS ------------
        this.soundGameEffectsMoleKill = [];
        this.soundGameEffectsSelectPhase;
        this.soundGameEffectsHoverPhase;
        this.soundGameEffectsDifficultSelected;
        this.soundGameEffectsAppearStormTrooper;
        this.soundGameEffectsAppearMandalorian;
        this.soundGameEffectsAppearDarthVader;
    }
    // --------------------- FASE SELECIONADA - SELECIONA E RETORNA A FASE QUE SERÁ JOGADA ---------------------
    setStagePlayId(_stageId) {
        this.stagePlayId = _stageId;
    }
    getStagePlayId() {
        return this.stagePlayId;
    }
    setStagePlayName(_stageName) {
        this.stagePlayName = _stageName;
    }
    getStagePlayName() {
        return this.stagePlayName;
    }
    setMoleChac(_numberMole) {
        this.moleNumber = _numberMole;
    }
    getBringingMole() {
        this.moleNumber = this.moleNumber * 10;
        return this.moleNumber
    }

    // ----------------------------------- ENVIA A "HOLES" AONDE VAI SER COLOCADO A "MOLE" ----------------------------
    getMoleShowHole() {
        this.amountMoles = Math.floor(Math.random() * this.currentMole + 1)
        let espaces = []
        while (this.amountMoles != espaces.length) {
            this.local = Math.floor(Math.random() * this.mole) + 1;
            if (espaces.indexOf(this.local, 0) == -1) {
                this.spaceTeste.push(this.local);
                espaces.push(this.local);
            }
        }
        return espaces;
    }

    // ------------------------------------------ RETORNA O TEMPO TOTAL DO JOGO ----------------------------------------
    getGameTotalTimer() {
        return this.gameTotalTimer;
    }

    // --------------------------------- DIFICULDADE - SELECIONA E RETORNA A DIFICULDADE -----------------------------
    setDificult(_difficult) {
        this.stageDifficultSelected = _difficult;
        this.currentMole = 2;
        if (this.stageDifficultSelected == 100) {
            this.mole = 3;
        }
        else if (this.stageDifficultSelected == 200) {
            this.mole = 6;
        }
        else if (this.stageDifficultSelected == 300) {
            this.currentMole = 3
            this.mole = 9;
        }
    }
    getDifficult() {
        return this.stageDifficultSelected;
    }

    // --------------------- STAGE SCORE - SETA E RETORNA O SCORE DO ESTAGIO QUE O JOGADOR ESTA JOGANDO --------------
    setStageScore(_score,_reset) {
        if(_reset == 0){
            this.stageScore = 0;
        }else{
            this.stageScore += _score;
        }
        
    }
    getStageScore() {
        return this.stageScore;
    }

    // ---------------  PLAYER SCORE - SETA E RETORNA O SCORE DO JOGADOR NO ESTAGIO QUE ESTA JOGANDO ------------------
    setStagePlayerScore(_score, _reset) {
        if(_reset == 0){
            this.stagePlayerScore = 0;
        }else{
            this.stagePlayerScore += _score;
        }
    }
    getStagePlayerScore() {
        return this.stagePlayerScore;
    }

    // --------------------- VERIFICA SE O JOGADOR CONSEGUIU PONTO SUFICIENTE PARA PASSAR DE FASE ---------------------
    getStageFinalResult() {
        if (this.stagePlayerScore < this.stageScore / 2) {
            this.stageResult = false;
        }
        else if (this.stagePlayerScore >= this.stageScore / 2) {
            this.stageResult = true;
        }
        return this.stageResult;
    }

    // ------------------------------------------- CONFIGURA O CONTROLE -----------------------------------------------
    setControlGame(_controlGame) {
        this.controlGame = _controlGame;
    }

    // --------------------------------------------------- SOUND ------------------------------------------------------
    setAudio(_typeAudio, _audioSrc) {
        if (_typeAudio != "soundGameEffectsMoleKill") {
            this[_typeAudio] = new Audio(`${_audioSrc}`);
            this[_typeAudio].volume = this.playerConfig.music;
        } else if (_typeAudio == "soundGameEffectsMoleKill") {
            this[_typeAudio][0] = new Audio(`${_audioSrc}`);
            this[_typeAudio][0].volume = this.playerConfig.effects;
            this[_typeAudio][1] = new Audio(`${_audioSrc}`);
            this[_typeAudio][1].volume = this.playerConfig.effects;
            this[_typeAudio][2] = new Audio(`${_audioSrc}`);
            this[_typeAudio][2].volume = this.playerConfig.effects;
            this[_typeAudio][3] = new Audio(`${_audioSrc}`);
            this[_typeAudio][3].volume = this.playerConfig.effects;
        }
    }
    playAudio(_typeAudio, _playStop) {
        if (_typeAudio != "soundGameEffectsMoleKill") {
            _playStop == "play" ? this[_typeAudio].play() : this[_typeAudio].pause();
        } else if (_typeAudio == "soundGameEffectsMoleKill") {
            for (let s = 0; s < this.soundGameEffectsMoleKill.length; s++) {
                if (this.soundGameEffectsMoleKill[s].paused) {
                    this.soundGameEffectsMoleKill[s].play();
                    break;
                }
            }
        }
    }
}

// ----------------------------- CLASS TIMER PARA CONTROLE DE TODOS OS TEMPORIZADORES DO JOGO ----------------------------------
class Timer {
    constructor(_time = 0, _timerInterval = 1000, _callbackTimeout = () => { console.log("[TIMER:TIMEROUT:NO-EXTERNAL-MESSAGE]") }, _callbackTimerInterval = () => { console.log("[TIMER:TIMERINTERVAL:NO-EXTERNAL-MESSAGE]") }) {
        this.time = _time;
        this.currentTimer = 0;
        this.timerInterval = _timerInterval;
        this.callbackTimerout = _callbackTimeout;
        this.callbackTimerInterval = _callbackTimerInterval;
        this.internalTimer;
        this.internalTimerout;
    }
    setTimer(_time) {
        this.time = _time;
        console.log("SetTimer:" + _time);
        console.log(this)
    }
    setTimerInterval(_timerInterval) {
        this.timerInterval = _timerInterval;
        console.log("SetTimerInterval:" + _timerInterval);
    }
    getCurrentTimer() {
        return this.currentTimer;
    }
    stopTimer() {
        clearInterval(this.internalTimer);
        clearTimeout(this.internalTimerout);
    }
    resetTimer() {
        clearInterval(this.internalTimer);
        clearTimeout(this.internalTimerout);
        console.log(this.internalTimerout)
        this.internalTimer = 0;
        this.time = 0;
        this.currentTimer = 0;
        this.timerInterval = 0;

    }
    setCallbackTimerout(_callbackTimerout = () => { console.log("[TIMER:TIMEROUT:NO-EXTERNAL-MESSAGE]") }) {
        this.callbackTimerout = () => {
            console.log("External callbackTimerout:");
            _callbackTimerout();

            console.log("Internal callbackTimerout: TIMER OUT");
            this.time = 0;
            this.currentTimer = 0;
            clearTimeout(this.internalTimerout);
            clearInterval(this.internalTimer);

        }
    }
    setCallbackTimerInterval(_callbackTimerInterval = () => { console.log("[TIMER:TIMERINTEVAL:NO-EXTERNAL-MESSAGE]") }) {
        this.callbackTimerInterval = () => {

            // ------------------------------ CURRENT TIME NORMAL ------------------------------
            this.currentTimer += this.timerInterval;
            _callbackTimerInterval()
        }
    }
    startTimer(_buttonElement) {
        this.internalTimerout = setTimeout(this.callbackTimerout, this.time - this.currentTimer);
        this.internalTimer = setInterval(this.callbackTimerInterval, this.timerInterval)
    }
    currentTimeString() {
        let time = this.time - this.currentTimer;

        let hourTime;
        if (time >= 3600000 && time < 36000000) {
            hourTime = `0${parseInt(time / 3600000)}`;
        } else if (time >= 36000000) {
            hourTime = `${parseInt(time / 3600000)}`;
        } else if (time < 3600000) {
            hourTime = "00";
        }

        let minuteTime;
        if (parseInt((time - (3600000 * hourTime)) / 60000) < 10) {
            minuteTime = `0${parseInt((time - (3600000 * hourTime)) / 60000)}`;
        } else if (parseInt((time - (3600000 * hourTime)) / 60000) >= 10) {
            minuteTime = `${parseInt((time - (3600000 * hourTime)) / 60000)}`;
        } else if (time < 60000) {
            minuteTime = "00";
        }

        let secondTime;
        if (parseInt((time - (60000 * minuteTime + (3600000 * hourTime))) / 1000) < 10) {
            secondTime = `0${parseInt((time - (60000 * minuteTime + (3600000 * hourTime))) / 1000)}`;
        } else if (parseInt((time - (60000 * minuteTime + (3600000 * hourTime))) / 1000) >= 10) {
            secondTime = `${parseInt((time - (60000 * minuteTime + (3600000 * hourTime))) / 1000)}`;
        } else if (time < 1000) {
            secondTime = "00";
        }

        let decimalSecondTime;
        if (parseInt((time - ((1000 * secondTime) + (60000 * minuteTime) + (3600000 * hourTime))) / 10) < 10) {
            decimalSecondTime = `0${parseInt((time - ((1000 * secondTime) + (60000 * minuteTime) + (3600000 * hourTime))) / 10)}`;

        } else if (parseInt((time - ((1000 * secondTime) + (60000 * minuteTime) + (3600000 * hourTime))) / 10) >= 10) {
            decimalSecondTime = `${parseInt((time - ((1000 * secondTime) + (60000 * minuteTime) + (3600000 * hourTime))) / 10)}`;

        } else if (time < 10) {
            decimalSecondTime = "00";
        }
        console.log(hourTime + ":" + minuteTime + ":" + secondTime + " " + decimalSecondTime);
        return hourTime + ":" + minuteTime + ":" + secondTime + " " + decimalSecondTime;
    }
}

// ------------------------------------------ INSTANCIA CLASSE DO WHACK MOLE ---------------------------------------------------
const whackMoleGame = new WhackAMole();

// ------------------------------------------ INSTANCIA A CLASSE TIMER ---------------------------------------------------------
const updateTimer = new Timer();
const gameTimer = new Timer();

// ------------------------------------------- SETANDO AS MUSICAS --------------------------------------------------------------
whackMoleGame.setAudio("soundGameMusicPhase", "./music/cantina-band.mp3");
whackMoleGame.setAudio("soundGameMusicGameOver", "./music/game-over-sound-effect.mp3");
whackMoleGame.setAudio("soundGameMusicVictory", "./music/2_r2d2_wins.mp3");

// ------------------------------------------- SETANDO OS EFEITOS --------------------------------------------------------------
whackMoleGame.setAudio("soundGameEffectsMoleKill", "./music/litght.mp3");

//------------------------------------------------------------------------------------------------------------------------------
let moleShowHoleNumber = [];
let userData = {};

// ------------------------------------------- FUNÇÃO DE ACERTAR A MOLE --------------------------------------------------------
function hitMole(_mole, _quadrante) {
    _mole.removeAttribute("onclick");
    _mole.setAttribute("src", "./images/hurt_mole.png");
    _mole.classList.add("chac_cry");
    _mole.classList.remove("chac_game");
    whackMoleGame.setStagePlayerScore(whackMoleGame.getDifficult());
    whackMoleGame.playAudio("soundGameEffectsMoleKill", "play");
    document.getElementById("punctuation_number").innerHTML = whackMoleGame.getStagePlayerScore();
    setTimeout(() => _quadrante.innerHTML = "", 200)
}

// ------------------------------------------- SELECIONANDO A FASE NO MAPA E MUDANDO PARA A TELA DE DIFICULDADE -----------------
function selectStage(_pageSelected, _stagePlaySelected) {
    whackMoleGame.setStagePlayId(_stagePlaySelected);
    selectPage(_pageSelected, _stagePlaySelected);
}

// ------------------------------------------- SELECIONANDO O NIVEL DE DIFICULDADE E INICIANDO O JOGO ---------------------------
function selectDificult(_dificult) {
    whackMoleGame.setDificult(_dificult);
    selectPage(3, whackMoleGame.stagePlayId)

    document.getElementById("result_screen").innerHTML = `<span id="result_screen_fase">INICIO DO JOGO</span>`;
    document.getElementById("result_screen").style.display = "flex";
    setTimeout(() => {
        document.getElementById("result_screen").style.display = "none";
        startGame()
    }, 1500);
}

// ----------------------------------- INICIO DO JOGO ---------------------------------------------------
function startGame() {
    whackMoleGame.setStageScore(0,0);
    whackMoleGame.setStagePlayerScore(0,0);
    whackMoleGame.playAudio("soundGameMusicPhase", "play");
    setTimeout(() => {
        // ---------------------------- FUNÇÃO EXECUTADA A CADA INTERVAL PARA ATUALIZAÇÃO DO HTML -------------------------------
        const repeatFunTime = () => {
            document.getElementById("time_number").innerHTML = (whackMoleGame.gameTotalTimer - updateTimer.getCurrentTimer()) / 1000;
        }

        // ---------------------------- FUNÇÃO EXECUTADA A CADA TIME INTERVAL ---------------------------------------------------
        const repeatFunGame = () => {
            if ((whackMoleGame.gameTotalTimer - updateTimer.getCurrentTimer()) / 1000 > 3) {
                console.log("CT:" + (whackMoleGame.gameTotalTimer - updateTimer.getCurrentTimer()) / 1000);
                moleShowHoleNumber = whackMoleGame.getMoleShowHole();
                for (let i = 0; i < moleShowHoleNumber.length; i++) {
                    showMoles(moleShowHoleNumber[i])
                }
            }
        }

        // ----------------------------------- FUNÇÃO PARA EXIBIR AS MOLES ------------------------------------------------------
        function showMoles(_moleShowHoleNumber) {          
            console.log(_moleShowHoleNumber);
            const quadrante = document.getElementById(`quadrant_${_moleShowHoleNumber}`);
            setTimeout(() => {
                const quadranteMoleStart = quadrante;
                quadranteMoleStart.innerHTML = `<img src="./images/mole_.png"  id="moleFace_${_moleShowHoleNumber}" class="chac_game" />`
                setTimeout(() => {
                    whackMoleGame.setStageScore(whackMoleGame.getDifficult());
                    document.getElementById(`moleFace_${_moleShowHoleNumber}`).setAttribute("src", "./images/mole_white.png");
                    document.getElementById(`moleFace_${_moleShowHoleNumber}`).setAttribute("onClick", `hitMole(this, quadrant_${_moleShowHoleNumber})`);
                }, 200);
            }, 500);
            setTimeout(() => {
                const quadrantMoleClear = quadrante;
                quadrantMoleClear.innerHTML = "";
            }, 2300);
        }
        

        // --------------------------------- FUNÇÃO A SER EXECUTADA QUANDO O TEMPO DA FASE TERMINAR --------------------------------
        const theEndFun = () => {
            
            whackMoleGame.playAudio("soundGameMusicPhase", "stop");
            document.getElementById("time_number").innerHTML = "0";
            document.getElementById("map-area-fases-game").innerHTML = "";

            let resultScreen = document.getElementById("result_screen");
            resultScreen.innerHTML = "";

            setTimeout(() => {
                resultScreen.innerHTML = `<span id="result_screen_fase">FIM DO JOGO</span>`;
            }, 500);

            //  ------------------------------------------------ VITÓRIA ---------------------------------------------------------------
            if (whackMoleGame.getStageFinalResult() == true) {
                resultScreen.style.display = "flex";
                setTimeout(() => {
                    resultScreen.innerHTML = `
                    <!--OVERLAY DE VITÓRIA-->
                    <main id="victory-overlay" class="result-overlay">
                        <div class="result-screen">
                            <h2 class="victory-header">VITÓRIA!!</h2>
                
                            <div class="result-screen-line"></div>
                
                            <div class="score-container">
                                <div class="score-display">
                                    <span>Pontuação <br /> TOTAL</span>
                                    <span class="score" id="total-score">${whackMoleGame.getStageScore()}</span>
                                </div>
                
                                <div class="score-display">
                                    <span>Pontuação <br /> JOGADOR</span>
                                    <span class="score" id="player-score">${whackMoleGame.getStagePlayerScore()}</span>
                                </div>
                            </div>
                
                            <img id="victory-image" src="./images/starwars-r2-d2.png" alt="Imagem desenhada do R2-D2" />
                
                            <img width="50px" src="./images/seta.svg"  onclick="selectPage(1,''), endStageBackToMap()" /> <!-- botão de retorno -->
                        </div>
                    </main>
                    `;
                    whackMoleGame.playAudio("soundGameMusicVictory", "play");
                }, 2000)
            } else {

                //------------------------------------------------ DERROTA -------------------------------------------------
                resultScreen.style.display = "flex";
                setTimeout(() => {
                    resultScreen.innerHTML = `
                    <!--OVERLAY DE DERROTA-->
                    <main id="defeat-overlay" class="result-overlay">
                        <div class="result-screen">
                            <h2 class="defeat-header">DERROTA</h2>
                
                            <div class="result-screen-line"></div>
                
                            <div class="score-container">
                                <div class="score-display">
                                    <span>Pontuação <br /> TOTAL</span>
                                    <span class="score" id="total-score">${whackMoleGame.getStageScore()}</span>
                                </div>
                
                                <div class="score-display">
                                    <span>Pontuação <br /> JOGADOR</span>
                                    <span class="score" id="player-score">${whackMoleGame.getStagePlayerScore()}</span>
                                </div>
                            </div>
                
                            <img id="defeat-image" src="./images/starwars-darth-vader.png" alt="Imagem desenhada do darth-vader" />
                
                            <img width="50px" src="./images/seta.svg"  onclick="selectPage(1,''), endStageBackToMap()" />
                             <!-- botão de retorno -->
                        </div>
                    </main> 
                       
                    `;
                    whackMoleGame.playAudio("soundGameMusicGameOver", "play");
                }, 2000)
            }
        }

        // --------------------------------------- TIMER DO JOGO ------------------------------------------
        // --------------------------------------- INICIA O JOGO ------------------------------------------
        gameTimer.setTimer(whackMoleGame.gameTotalTimer);
        updateTimer.setTimer(whackMoleGame.gameTotalTimer);

        gameTimer.setTimerInterval(whackMoleGame.gameInterval);
        updateTimer.setTimerInterval(1000);

        gameTimer.setCallbackTimerout(theEndFun);
        updateTimer.setCallbackTimerout()

        gameTimer.setCallbackTimerInterval(repeatFunGame);
        updateTimer.setCallbackTimerInterval(repeatFunTime);

        gameTimer.startTimer()
        updateTimer.startTimer();
    }, 1000);
}

// ----------------------------------- SELECIONANDO A PAGINA QUE SERÁ EXIBIDA --------------------------
function selectPage(_pageId, _loadingId) {
    let titlescreen = document.getElementById("title-screen");
    let map = document.getElementById("map");
    let difficult = document.getElementById("difficult");
    let body_game = document.getElementById("body_game");
    let ranking = document.getElementById("ranking-overlay");
    let config = document.getElementById("settings-overlay");
    let loadingPage = document.getElementById("loadingPage");

    switch (_pageId) {
        case 0:
            map.style.display = "none";
            difficult.style.display = "none";
            body_game.style.display = "none";
            ranking.style.display = "none";
            config.style.display = "none";
            loadingPage.style.display = "none";

            titlescreen.style.display = "flex";
            break;
        case 1:
            titlescreen.style.display = "none";
            difficult.style.display = "none";
            body_game.style.display = "none";
            ranking.style.display = "none";
            config.style.display = "none";
            loadingPage.style.display = "none";

            map.style.display = "unset";
            break;
        case 2:
            titlescreen.style.display = "none";
            map.style.display = "none";
            body_game.style.display = "none";
            ranking.style.display = "none";
            config.style.display = "none";
            loadingPage.style.display = "none";

            for (x of whackMoleGame["playerStages"]) {
                if (x.id == whackMoleGame.getStagePlayId()) {
                    whackMoleGame.setStagePlayName(x.name);
                    document.getElementById("stage-name").innerText = x.name;
                }
            }
            difficult.style.display = "flex";
            break;
        case 3:
            titlescreen.style.display = "none";
            map.style.display = "none";
            difficult.style.display = "none";
            ranking.style.display = "none";
            config.style.display = "none";
            loadingPage.style.display = "none";

            for (b of whackMoleGame.playerStages) {
                if (b.id == _loadingId) {
                    body_game.style.backgroundImage = `url("${b.bg}")`;
                }
            }
            if (_loadingId == "fase-dagobah") {
                document.getElementById("map-area-fases-game").remove()
                body_game.innerHTML += `
            <div id="map-area-fases-game">
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">1-1</div>
                    <div class="map-area-itens">1-2</div>
                    <div class="map-area-itens">1-3</div>
                    <div class="map-area-itens">1-4</div>
                    <div id="quadrant_7" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">1-4</div>
                    <div class="map-area-itens">1-7</div>
                    <div class="map-area-itens">1-8</div>
                    <div class="map-area-itens">1-9</div>
                    <div class="map-area-itens">1-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">2-1</div>
                    <div class="map-area-itens">2-2</div>
                    <div class="map-area-itens">2-3</div>
                    <div class="map-area-itens">2-4</div>
                    <div class="map-area-itens">2-5</div>
                    <div class="map-area-itens">2-6</div>
                    <div id="quadrant_4" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">2-8</div>
                    <div class="map-area-itens">2-9</div>
                    <div class="map-area-itens">2-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">3-1</div>
                    <div class="map-area-itens">3-2</div>
                    <div class="map-area-itens">3-3</div>
                    <div class="map-area-itens">3-4</div>
                    <div class="map-area-itens">3-5</div>
                    <div class="map-area-itens">3-6</div>
                    <div class="map-area-itens">3-7</div>
                    <div class="map-area-itens">3-8</div>
                    <div id="quadrant_1" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">3-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">4-1</div>
                    <div class="map-area-itens">4-2</div>
                    <div class="map-area-itens">4-3</div>
                    <div class="map-area-itens">4-4</div>
                    <div class="map-area-itens">4-5</div>
                    <div class="map-area-itens">4-6</div>
                    <div class="map-area-itens">4-7</div>
                    <div class="map-area-itens">4-8</div>
                    <div class="map-area-itens">4-9</div>
                    <div class="map-area-itens">4-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">5-1</div>
                    <div class="map-area-itens">5-2</div>
                    <div class="map-area-itens">5-3</div>
                    <div class="map-area-itens">5-4</div>
                    <div class="map-area-itens">5-5</div>
                    <div class="map-area-itens">5-6</div>
                    <div id="quadrant_5" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">5-8</div>
                    <div class="map-area-itens">5-9</div>
                    <div class="map-area-itens">5-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">6-1</div>
                    <div class="map-area-itens">6-2</div>
                    <div class="map-area-itens">6-3</div>
                    <div class="map-area-itens">6-4</div>
                    <div class="map-area-itens">6-5</div>
                    <div id="quadrant_8" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">6-7</div>
                    <div class="map-area-itens">6-8</div>
                    <div id="quadrant_2" class="map-area-itens"></div>
                    <div class="map-area-itens">6-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">7-1</div>
                    <div class="map-area-itens">7-2</div>
                    <div class="map-area-itens">7-3</div>
                    <div class="map-area-itens">7-4</div>
                    <div class="map-area-itens">7-5</div>
                    <div class="map-area-itens">7-6</div>
                    <div class="map-area-itens">7-7</div>
                    <div class="map-area-itens">7-8</div>
                    <div class="map-area-itens">7-9</div>
                    <div class="map-area-itens">7-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">8-1</div>
                    <div class="map-area-itens">8-2</div>
                    <div class="map-area-itens">8-3</div>
                    <div class="map-area-itens">8-4</div>
                    <div class="map-area-itens">8-5</div>
                    <div class="map-area-itens">8-6</div>
                    <div class="map-area-itens">8-7</div>
                    <div class="map-area-itens">8-8</div>
                    <div class="map-area-itens">8-9</div>
                    <div class="map-area-itens">8-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">9-1</div>
                    <div class="map-area-itens">9-2</div>
                    <div class="map-area-itens">9-3</div>
                    <div class="map-area-itens">9-4</div>
                    <div class="map-area-itens">9-5</div>
                    <div class="map-area-itens">9-6</div>
                    <div id="quadrant_6" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">9-8</div>
                    <div id="quadrant_3" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">9-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">10-1</div>
                    <div class="map-area-itens">10-2</div>
                    <div class="map-area-itens">10-3</div>
                    <div class="map-area-itens">10-4</div>
                    <div class="map-area-itens">10-5</div>
                    <div id="quadrant_9" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">10-7</div>
                    <div class="map-area-itens">10-8</div>
                    <div class="map-area-itens">10-9</div>
                    <div class="map-area-itens">10-10</div>
                </div>
               
            </div>
            `;
            } else if (_loadingId == "fase-tatooine") {
                document.getElementById("map-area-fases-game").remove()
                body_game.innerHTML += `
            <div id="map-area-fases-game">
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">1-1</div>
                    <div class="map-area-itens">1-2</div>
                    <div class="map-area-itens">1-3</div>
                    <div class="map-area-itens">1-4</div>
                    <div id="quadrant_7" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">1-4</div>
                    <div class="map-area-itens">1-7</div>
                    <div class="map-area-itens">1-8</div>
                    <div class="map-area-itens">1-9</div>
                    <div class="map-area-itens">1-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">2-1</div>
                    <div class="map-area-itens">2-2</div>
                    <div class="map-area-itens">2-3</div>
                    <div class="map-area-itens">2-4</div>
                    <div class="map-area-itens">2-5</div>
                    <div class="map-area-itens">2-6</div>
                    <div id="quadrant_4" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">2-8</div>
                    <div class="map-area-itens">2-9</div>
                    <div class="map-area-itens">2-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">3-1</div>
                    <div class="map-area-itens">3-2</div>
                    <div class="map-area-itens">3-3</div>
                    <div class="map-area-itens">3-4</div>
                    <div class="map-area-itens">3-5</div>
                    <div class="map-area-itens">3-6</div>
                    <div class="map-area-itens">3-7</div>
                    <div class="map-area-itens">3-8</div>
                    <div id="quadrant_1" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">3-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">4-1</div>
                    <div class="map-area-itens">4-2</div>
                    <div class="map-area-itens">4-3</div>
                    <div class="map-area-itens">4-4</div>
                    <div class="map-area-itens">4-5</div>
                    <div class="map-area-itens">4-6</div>
                    <div class="map-area-itens">4-7</div>
                    <div class="map-area-itens">4-8</div>
                    <div class="map-area-itens">4-9</div>
                    <div class="map-area-itens">4-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">5-1</div>
                    <div class="map-area-itens">5-2</div>
                    <div class="map-area-itens">5-3</div>
                    <div class="map-area-itens">5-4</div>
                    <div class="map-area-itens">5-5</div>
                    <div class="map-area-itens">5-6</div>
                    <div id="quadrant_5" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">5-8</div>
                    <div class="map-area-itens">5-9</div>
                    <div class="map-area-itens">5-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">6-1</div>
                    <div class="map-area-itens">6-2</div>
                    <div class="map-area-itens">6-3</div>
                    <div class="map-area-itens">6-4</div>
                    <div class="map-area-itens">6-5</div>
                    <div id="quadrant_8" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">6-7</div>
                    <div class="map-area-itens">6-8</div>
                    <div id="quadrant_2" class="map-area-itens"></div>
                    <div class="map-area-itens">6-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">7-1</div>
                    <div class="map-area-itens">7-2</div>
                    <div class="map-area-itens">7-3</div>
                    <div class="map-area-itens">7-4</div>
                    <div class="map-area-itens">7-5</div>
                    <div class="map-area-itens">7-6</div>
                    <div class="map-area-itens">7-7</div>
                    <div class="map-area-itens">7-8</div>
                    <div class="map-area-itens">7-9</div>
                    <div class="map-area-itens">7-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">8-1</div>
                    <div class="map-area-itens">8-2</div>
                    <div class="map-area-itens">8-3</div>
                    <div class="map-area-itens">8-4</div>
                    <div class="map-area-itens">8-5</div>
                    <div class="map-area-itens">8-6</div>
                    <div class="map-area-itens">8-7</div>
                    <div class="map-area-itens">8-8</div>
                    <div class="map-area-itens">8-9</div>
                    <div class="map-area-itens">8-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">9-1</div>
                    <div class="map-area-itens">9-2</div>
                    <div class="map-area-itens">9-3</div>
                    <div class="map-area-itens">9-4</div>
                    <div class="map-area-itens">9-5</div>
                    <div class="map-area-itens">9-6</div>
                    <div id="quadrant_6" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">9-8</div>
                    <div id="quadrant_3" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">9-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">10-1</div>
                    <div class="map-area-itens">10-2</div>
                    <div class="map-area-itens">10-3</div>
                    <div class="map-area-itens">10-4</div>
                    <div class="map-area-itens">10-5</div>
                    <div id="quadrant_9" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">10-7</div>
                    <div class="map-area-itens">10-8</div>
                    <div class="map-area-itens">10-9</div>
                    <div class="map-area-itens">10-10</div>
                </div>
               
            </div>
            `;
            } else if (_loadingId == "fase-hoth") {
                document.getElementById("map-area-fases-game").remove()
                body_game.innerHTML += `
                <div id="map-area-fases-game">
                    <div class="map-area-fases-sub">
                        <div class="map-area-itens">1-1</div>
                        <div class="map-area-itens">1-2</div>
                        <div class="map-area-itens">1-3</div>
                        <div class="map-area-itens">1-4</div>
                        <div id="quadrant_7" class="map-area-itens map-area-itens-quadant"></div>
                        <div class="map-area-itens">1-4</div>
                        <div class="map-area-itens">1-7</div>
                        <div class="map-area-itens">1-8</div>
                        <div class="map-area-itens">1-9</div>
                        <div class="map-area-itens">1-10</div>
                    </div>
                    <div class="map-area-fases-sub">
                        <div class="map-area-itens">2-1</div>
                        <div class="map-area-itens">2-2</div>
                        <div class="map-area-itens">2-3</div>
                        <div class="map-area-itens">2-4</div>
                        <div class="map-area-itens">2-5</div>
                        <div class="map-area-itens">2-6</div>
                        <div id="quadrant_4" class="map-area-itens map-area-itens-quadant"></div>
                        <div class="map-area-itens">2-8</div>
                        <div class="map-area-itens">2-9</div>
                        <div class="map-area-itens">2-10</div>
                    </div>
                    <div class="map-area-fases-sub">
                        <div class="map-area-itens">3-1</div>
                        <div class="map-area-itens">3-2</div>
                        <div class="map-area-itens">3-3</div>
                        <div class="map-area-itens">3-4</div>
                        <div class="map-area-itens">3-5</div>
                        <div class="map-area-itens">3-6</div>
                        <div class="map-area-itens">3-7</div>
                        <div class="map-area-itens">3-8</div>
                        <div id="quadrant_1" class="map-area-itens map-area-itens-quadant"></div>
                        <div class="map-area-itens">3-10</div>
                    </div>
                    <div class="map-area-fases-sub">
                        <div class="map-area-itens">4-1</div>
                        <div class="map-area-itens">4-2</div>
                        <div class="map-area-itens">4-3</div>
                        <div class="map-area-itens">4-4</div>
                        <div class="map-area-itens">4-5</div>
                        <div class="map-area-itens">4-6</div>
                        <div class="map-area-itens">4-7</div>
                        <div class="map-area-itens">4-8</div>
                        <div class="map-area-itens">4-9</div>
                        <div class="map-area-itens">4-10</div>
                    </div>
                    <div class="map-area-fases-sub">
                        <div class="map-area-itens">5-1</div>
                        <div class="map-area-itens">5-2</div>
                        <div class="map-area-itens">5-3</div>
                        <div class="map-area-itens">5-4</div>
                        <div class="map-area-itens">5-5</div>
                        <div class="map-area-itens">5-6</div>
                        <div id="quadrant_5" class="map-area-itens map-area-itens-quadant"></div>
                        <div class="map-area-itens">5-8</div>
                        <div class="map-area-itens">5-9</div>
                        <div class="map-area-itens">5-10</div>
                    </div>
                    <div class="map-area-fases-sub">
                        <div class="map-area-itens">6-1</div>
                        <div class="map-area-itens">6-2</div>
                        <div class="map-area-itens">6-3</div>
                        <div class="map-area-itens">6-4</div>
                        <div class="map-area-itens">6-5</div>
                        <div id="quadrant_8" class="map-area-itens map-area-itens-quadant"></div>
                        <div class="map-area-itens">6-7</div>
                        <div class="map-area-itens">6-8</div>
                        <div id="quadrant_2" class="map-area-itens"></div>
                        <div class="map-area-itens">6-10</div>
                    </div>
                    <div class="map-area-fases-sub">
                        <div class="map-area-itens">7-1</div>
                        <div class="map-area-itens">7-2</div>
                        <div class="map-area-itens">7-3</div>
                        <div class="map-area-itens">7-4</div>
                        <div class="map-area-itens">7-5</div>
                        <div class="map-area-itens">7-6</div>
                        <div class="map-area-itens">7-7</div>
                        <div class="map-area-itens">7-8</div>
                        <div class="map-area-itens">7-9</div>
                        <div class="map-area-itens">7-10</div>
                    </div>
                    <div class="map-area-fases-sub">
                        <div class="map-area-itens">8-1</div>
                        <div class="map-area-itens">8-2</div>
                        <div class="map-area-itens">8-3</div>
                        <div class="map-area-itens">8-4</div>
                        <div class="map-area-itens">8-5</div>
                        <div class="map-area-itens">8-6</div>
                        <div class="map-area-itens">8-7</div>
                        <div class="map-area-itens">8-8</div>
                        <div class="map-area-itens">8-9</div>
                        <div class="map-area-itens">8-10</div>
                    </div>
                    <div class="map-area-fases-sub">
                        <div class="map-area-itens">9-1</div>
                        <div class="map-area-itens">9-2</div>
                        <div class="map-area-itens">9-3</div>
                        <div class="map-area-itens">9-4</div>
                        <div class="map-area-itens">9-5</div>
                        <div class="map-area-itens">9-6</div>
                        <div id="quadrant_6" class="map-area-itens map-area-itens-quadant"></div>
                        <div class="map-area-itens">9-8</div>
                        <div id="quadrant_3" class="map-area-itens map-area-itens-quadant"></div>
                        <div class="map-area-itens">9-10</div>
                    </div>
                    <div class="map-area-fases-sub">
                        <div class="map-area-itens">10-1</div>
                        <div class="map-area-itens">10-2</div>
                        <div class="map-area-itens">10-3</div>
                        <div class="map-area-itens">10-4</div>
                        <div class="map-area-itens">10-5</div>
                        <div id="quadrant_9" class="map-area-itens map-area-itens-quadant"></div>
                        <div class="map-area-itens">10-7</div>
                        <div class="map-area-itens">10-8</div>
                        <div class="map-area-itens">10-9</div>
                        <div class="map-area-itens">10-10</div>
                    </div>
                   
                </div>
                `;
            } else if (_loadingId == "fase-deathstar") {
                document.getElementById("map-area-fases-game").remove()
                body_game.innerHTML += `
            <div id="map-area-fases-game">
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">1-1</div>
                    <div class="map-area-itens">1-2</div>
                    <div class="map-area-itens">1-3</div>
                    <div class="map-area-itens">1-4</div>
                    <div id="quadrant_7" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">1-4</div>
                    <div class="map-area-itens">1-7</div>
                    <div class="map-area-itens">1-8</div>
                    <div class="map-area-itens">1-9</div>
                    <div class="map-area-itens">1-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">2-1</div>
                    <div class="map-area-itens">2-2</div>
                    <div class="map-area-itens">2-3</div>
                    <div class="map-area-itens">2-4</div>
                    <div class="map-area-itens">2-5</div>
                    <div class="map-area-itens">2-6</div>
                    <div id="quadrant_4" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">2-8</div>
                    <div class="map-area-itens">2-9</div>
                    <div class="map-area-itens">2-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">3-1</div>
                    <div class="map-area-itens">3-2</div>
                    <div class="map-area-itens">3-3</div>
                    <div class="map-area-itens">3-4</div>
                    <div class="map-area-itens">3-5</div>
                    <div class="map-area-itens">3-6</div>
                    <div class="map-area-itens">3-7</div>
                    <div class="map-area-itens">3-8</div>
                    <div id="quadrant_1" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">3-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">4-1</div>
                    <div class="map-area-itens">4-2</div>
                    <div class="map-area-itens">4-3</div>
                    <div class="map-area-itens">4-4</div>
                    <div class="map-area-itens">4-5</div>
                    <div class="map-area-itens">4-6</div>
                    <div class="map-area-itens">4-7</div>
                    <div class="map-area-itens">4-8</div>
                    <div class="map-area-itens">4-9</div>
                    <div class="map-area-itens">4-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">5-1</div>
                    <div class="map-area-itens">5-2</div>
                    <div class="map-area-itens">5-3</div>
                    <div class="map-area-itens">5-4</div>
                    <div class="map-area-itens">5-5</div>
                    <div class="map-area-itens">5-6</div>
                    <div id="quadrant_5" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">5-8</div>
                    <div class="map-area-itens">5-9</div>
                    <div class="map-area-itens">5-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">6-1</div>
                    <div class="map-area-itens">6-2</div>
                    <div class="map-area-itens">6-3</div>
                    <div class="map-area-itens">6-4</div>
                    <div class="map-area-itens">6-5</div>
                    <div id="quadrant_8" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">6-7</div>
                    <div class="map-area-itens">6-8</div>
                    <div id="quadrant_2" class="map-area-itens"></div>
                    <div class="map-area-itens">6-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">7-1</div>
                    <div class="map-area-itens">7-2</div>
                    <div class="map-area-itens">7-3</div>
                    <div class="map-area-itens">7-4</div>
                    <div class="map-area-itens">7-5</div>
                    <div class="map-area-itens">7-6</div>
                    <div class="map-area-itens">7-7</div>
                    <div class="map-area-itens">7-8</div>
                    <div class="map-area-itens">7-9</div>
                    <div class="map-area-itens">7-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">8-1</div>
                    <div class="map-area-itens">8-2</div>
                    <div class="map-area-itens">8-3</div>
                    <div class="map-area-itens">8-4</div>
                    <div class="map-area-itens">8-5</div>
                    <div class="map-area-itens">8-6</div>
                    <div class="map-area-itens">8-7</div>
                    <div class="map-area-itens">8-8</div>
                    <div class="map-area-itens">8-9</div>
                    <div class="map-area-itens">8-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">9-1</div>
                    <div class="map-area-itens">9-2</div>
                    <div class="map-area-itens">9-3</div>
                    <div class="map-area-itens">9-4</div>
                    <div class="map-area-itens">9-5</div>
                    <div class="map-area-itens">9-6</div>
                    <div id="quadrant_6" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">9-8</div>
                    <div id="quadrant_3" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">9-10</div>
                </div>
                <div class="map-area-fases-sub">
                    <div class="map-area-itens">10-1</div>
                    <div class="map-area-itens">10-2</div>
                    <div class="map-area-itens">10-3</div>
                    <div class="map-area-itens">10-4</div>
                    <div class="map-area-itens">10-5</div>
                    <div id="quadrant_9" class="map-area-itens map-area-itens-quadant"></div>
                    <div class="map-area-itens">10-7</div>
                    <div class="map-area-itens">10-8</div>
                    <div class="map-area-itens">10-9</div>
                    <div class="map-area-itens">10-10</div>
                </div>
               
            </div>
            `;
            }
            body_game.style.display = "flex";
            break;
        case 4:
            loadingPage.style.display = "flex";

            titlescreen.style.display = "none";
            map.style.display = "none";
            difficult.style.display = "none";
            body_game.style.display = "none";
            ranking.style.display = "none";
            config.style.display = "none";
            break;
        default:
            break;
    }
}

// ----------------------------------- FUNÇÃO PARA PAUSAR A FASE ---------------------------------------
let controlToPause = false;
function pauseGame() {
    let pauseScreen = document.getElementById("result_screen");
    pauseScreen.innerHTML = "";
    if (controlToPause == false) {
        whackMoleGame.playAudio("soundGameMusicPhase", "stop");
        pauseScreen.innerHTML = `
        
    <!--OVERLAY DE PAUSA-->
    <main id="pause-overlay">
        <div class="pause-screen">
            <h2 class="pause-header">PAUSA</h2>

            <div class="pause-screen-line"></div>

            <div class="info-container">
                <div class="pause-info-display">
                    <span>TEMPO</span>
                    <span class="info" id="pause-time" >${document.getElementById("time_number").innerHTML = (whackMoleGame.gameTotalTimer - updateTimer.getCurrentTimer()) / 1000}</span>
                </div>

                <div class="pause-info-display">
                    <span>PONTUAÇÃO</span>
                    <span class="info" id="player-score-pause">${whackMoleGame.getStagePlayerScore()}</span>
                </div>
            </div>

            <img id="pause-image" src="./images/starwars-c-3po.png" alt="Imagem desenhada do R2-D2" />

            <img width="50px" id="replayButton"src="./images/seta.svg" onclick="pauseGame()" /> <!-- botão de retorno -->
        </div>
    </main>
        `;
        pauseScreen.style.display = "flex";
        document.getElementById("icon_pause").src = "./images/play.svg";
        gameTimer.stopTimer();
        updateTimer.stopTimer();
        controlToPause = true;
    } else {
        whackMoleGame.playAudio("soundGameMusicPhase", "play");
        pauseScreen.style.display = "none";
        document.getElementById("icon_pause").src = "./images/pause.svg";
        gameTimer.startTimer();
        updateTimer.startTimer();
        controlToPause = false;
    }
    console.log("tentiva de pause");
}





///////////////////////////////////////////////////////////////////////////////////////////////////////
//  ----------------------------------- REQUEST SERVER ----------------------------------------------//
///////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------------- AJAX -----------------------------------------------------//

// ---------------------------  Envia dados do login para a API - Pedro -----------------------------//
function doLogin(_player) {

    let player = {};
    // ------------ Objeto usado no POST -----------------------------//
    player.name = document.getElementById("userName").value;

    // -------------Objeto usado no PUT --------------------------//
    userData.name = player.name

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/user", true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        console.log("enviado com sucesso");
    }
    xhr.send(JSON.stringify(player));
}

// --------------------------- Função de fim de jogo - Tela Jogo --------------------- //
function endStageBackToMap() {
    document.getElementById("result_screen").style.display = "none";
    userData.phase = " ";
    userData.scorePoint = whackMoleGame.getStagePlayerScore();
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "/score", true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
    }
    xhr.send(JSON.stringify(userData));
}

// --------------------------- Seta de voltar - Tela Jogo --------------------- //
function backToMap() {
    whackMoleGame.getClearGame();
    gameTimer.resetTimer()
    updateTimer.resetTimer();
}

