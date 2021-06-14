document.getElementById("loading").style.display = "none";
/*
CLASS WACK MOLE - para controle do jogo
*/
class WhackMole2 {
    constructor() {
        this.actualPage = 0;
        this.playerName = "";
        this.playerTotalPoints = 0;
        this.playerPhases = [
            { "name": "Dagobah", "id": "fase-dagobah", "score-easy": 0, "score-normal": 0, "score-hard": 0, "score-total": 0, "enable": true },
            { "name": "Tatooine", "id": "fase-tatooine", "score-easy": 0, "score-normal": 0, "score-hard": 0, "score-total": 0, "enable": true },
            { "name": "Hoth", "id": "fase-hoth", "score-easy": 0, "score-normal": 0, "score-hard": 0, "score-total": 0, "enable": false },
            { "name": "Death Star", "id": "fase-deathstar", "score-easy": 0, "score-normal": 0, "score-hard": 0, "score-total": 0, "enable": false }];
        this.playerConfig = {
            "config": "config",
            "music": 1,
            "effects": 1,
            "control": "keyboard",
            "keys": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"] // acrescentar o numero do botão força.
        };
        this.playerLanguage = { "language": "pt-br", "title": "MOLE WARS", "buttonLogin": "Iniciar", "screenLoadingText": "CARREGANDO" };

        //////////////////////////////////////////////////////////////////////
        // SOUND SYSTEM //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        // MUSIC
        this.soundGameMusicIntro;
        this.soundGameMusicMap;
        this.soundGameMusicDifficult;
        this.soundGameMusicPhase;
        this.soundGameMusicGameOver;
        this.soundGameMusicVictory;
        //EFFECTS
        this.soundGameEffectsMoleKill = [];
        this.soundGameEffectsSelectPhase;
        this.soundGameEffectsHoverPhase;
        this.soundGameEffectsDifficultSelected;
        this.soundGameEffectsAppearStormTrooper;
        this.soundGameEffectsAppearMandalorian;
        this.soundGameEffectsAppearDarthVader;

    }

    //////////////////////////////////////////////////////////////////////
    // SOUND SYSTEM //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    /*
    SETA OS AUDIOS DO JOGO.
    */
    setAudio(_typeAudio, _audioSrc) {
        switch (_typeAudio) {
            case "soundGameMusicIntro":
                this.soundGameMusicIntro = new Audio(`${_audioSrc}`);
                this.soundGameMusicIntro.volume = this.playerConfig.music;
                break;
            case "soundGameMusicMap":
                this.soundGameMusicMap = new Audio(`${_audioSrc}`);
                this.soundGameMusicMap.volume = this.playerConfig.music;
                break;
            case "soundGameMusicDifficult":
                this.soundGameMusicDifficult = new Audio(`${_audioSrc}`);
                this.soundGameMusicDifficult.volume = this.playerConfig.music;
                break;
            case "soundGameMusicPhase":
                this.soundGameMusicPhase = new Audio(`${_audioSrc}`);
                this.soundGameMusicPhase.volume = this.playerConfig.music;
                break;
            case "soundGameMusicGameOver":
                this.soundGameMusicGameOver = new Audio(`${_audioSrc}`);
                this.soundGameMusicGameOver.volume = this.playerConfig.music;
                break;
            case "soundGameMusicVictory":
                this.soundGameMusicVictory = new Audio(`${_audioSrc}`);
                this.soundGameMusicVictory.volume = this.playerConfig.music;
                break;
            case "soundGameEffectsMoleKill":
                this.soundGameEffectsMoleKill[0] = new Audio(`${_audioSrc}`);
                this.soundGameEffectsMoleKill[1] = new Audio(`${_audioSrc}`);
                this.soundGameEffectsMoleKill[2] = new Audio(`${_audioSrc}`);
                this.soundGameEffectsMoleKill[3] = new Audio(`${_audioSrc}`);
                this.soundGameEffectsMoleKill[0].volume = this.playerConfig.effects;
                this.soundGameEffectsMoleKill[1].volume = this.playerConfig.effects;
                this.soundGameEffectsMoleKill[2].volume = this.playerConfig.effects;
                this.soundGameEffectsMoleKill[3].volume = this.playerConfig.effects;
                break;
            case "soundGameEffectsSelectPhase":
                this.soundGameEffectsSelectPhase = new Audio(`${_audioSrc}`);
                this.soundGameEffectsSelectPhase.volume = this.playerConfig.effects;
                break;
            case "soundGameEffectsHoverPhase":
                this.soundGameEffectsHoverPhase = new Audio(`${_audioSrc}`);
                this.soundGameEffectsHoverPhase.volume = this.playerConfig.effects;
                break;
            case "soundGameEffectsDifficultSelected":
                this.soundGameEffectsDifficultSelected = new Audio(`${_audioSrc}`);
                this.soundGameEffectsDifficultSelected.volume = this.playerConfig.effects;
                break;
            case "soundGameEffectsAppearMandalorian":
                this.soundGameEffectsAppearMandalorian = new Audio(`${_audioSrc}`);
                this.soundGameEffectsAppearMandalorian.volume = this.playerConfig.effects;
                break;
            case "soundGameEffectsAppearDarthVader":
                this.soundGameEffectsAppearDarthVader = new Audio(`${_audioSrc}`);
                this.soundGameEffectsAppearDarthVader.volume = this.playerConfig.effects;
                break;
            default:
                console.log("ERRO: setAudio: " + _typeAudio + " - " + _audioSrc)
                break;
        }
    }
    playAudio(_typeAudio,_playStop){
        switch (_typeAudio) {
            case "soundGameMusicIntro":
                this.soundGameMusicIntro.play();
                break;
            case "soundGameMusicMap":
                this.soundGameMusicMap.play();
                break;
            case "soundGameMusicDifficult":
                this.soundGameMusicDifficult.play();
                break;
            case "soundGameMusicPhase":
                this.soundGameMusicPhase.play();
                break;
            case "soundGameMusicGameOver":
                this.soundGameMusicGameOver.play();
                break;
            case "soundGameMusicVictory":
                this.soundGameMusicVictory.play();
                break;
            case "soundGameEffectsMoleKill":
                for (s = 0; s < this.soundGameEffectsMoleKill.length;){
                    if(this.soundGameEffectsMoleKill[s].paused){
                        this.soundGameEffectsMoleKill[s].play;
                    }
                }
                break;
            case "soundGameEffectsSelectPhase":
                this.soundGameEffectsSelectPhase = new Audio(`${_audioSrc}`);
                this.soundGameEffectsSelectPhase.volume = this.playerConfig.effects;
                break;
            case "soundGameEffectsHoverPhase":
                this.soundGameEffectsHoverPhase = new Audio(`${_audioSrc}`);
                this.soundGameEffectsHoverPhase.volume = this.playerConfig.effects;
                break;
            case "soundGameEffectsDifficultSelected":
                this.soundGameEffectsDifficultSelected = new Audio(`${_audioSrc}`);
                this.soundGameEffectsDifficultSelected.volume = this.playerConfig.effects;
                break;
            case "soundGameEffectsAppearMandalorian":
                this.soundGameEffectsAppearMandalorian = new Audio(`${_audioSrc}`);
                this.soundGameEffectsAppearMandalorian.volume = this.playerConfig.effects;
                break;
            case "soundGameEffectsAppearDarthVader":
                this.soundGameEffectsAppearDarthVader = new Audio(`${_audioSrc}`);
                this.soundGameEffectsAppearDarthVader.volume = this.playerConfig.effects;
                break;
            default:
                console.log("ERRO: setAudio: " + _typeAudio + " - " + _audioSrc)
                break;
        }

    }
    ////////////////////////////////////////////////////////////////////// 
    
    

    /*
    seta a pagina que deve ser exibida, este set serve para mudar de uma página para outra alterando a numeração
    */
    setActualPage(_actualPage) {
        this.actualPage = _actualPage;
    }
    /*
    QUANDO RECEBE AS INFORMAÇÕES DO SERVIDOR COLOCA TUDO NA INSTANCIA DO JOGADOR DA CLASSE.
    */
    setPlayerInfo(_playerInfo) {
        this.playerName = _playerInfo.player;
        this.playerPhases = _playerInfo.phases;
        this.playerConfig = _playerInfo.config;
        this.playerLanguage = _playerInfo.language;
    }
    /*
    MODIFICAR O VOLUME DA MUSICA E DOS EFEITOS.
    */
    setChangeVolume(_changeType, _changeValue) {
        if (_changeType == "music") {
            this.playerConfig.music = _changeValue
        } else if (_changeType == "effects") {
            this.playerConfig.effects = _changeValue;
        }
    }
    /*
    MODIFICA AS TECLAS DO JOGO.
    */
    setChangeControls(_controlKeys) {
        this.playerConfig.keys = _controlKeys;
    }
    /*
    RETORNA A LISTA DE TODAS AS FASES E SUAS PROPRIEDADES.
    */
    getPlayerPhase() {
        return this.playerPhases;
    }

}

/*
instancia a classe WhackMole para controle do jogo - Pedro
*/
let whackMoleGameClass = new WhackMole2


//SET MUSICS
whackMoleGameClass.setAudio("soundGameMusicPhase","./music/cantina-band.mp3");
whackMoleGameClass.setAudio("soundGameMusicGameOver","./music/game-over-sound-effect.mp3");
whackMoleGameClass.setAudio("soundGameMusicVictory","./music/2_r2d2_wins.mp3");
//this.soundGameMusicIntro
//this.soundGameMusicMap;
//this.soundGameMusicDifficult;

//SET EFFECTS
whackMoleGameClass.setAudio("soundGameEffectsMoleKill","./music/litght.mp3");

//this.soundGameEffectsSelectPhase;
//this.soundGameEffectsHoverPhase;
//this.soundGameEffectsDifficultSelected;
//this.soundGameEffectsAppearStormTrooper;
//this.soundGameEffectsAppearMandalorian;
//this.soundGameEffectsAppearDarthVader;



























/*
DEVE SER CHAMADA TODA VEZ QUE FOR PARA A TELA DO MAPA.
*/
console.log(whackMoleGameClass.getPlayerFase());
mapFasesUnlock(whackMoleGameClass.getPlayerFase());
function mapFasesUnlock(_fasesCheck) {
    for (f of _fasesCheck) {
        /*console.log(f);
        console.log(f.name);
        console.log(f.id);
        console.log(f.enable);*/
        !f.enable ? document.getElementById(f.id).setAttribute("hidden", "false") : "";
    }
}


/*
função da tela de loading (transição entre uma tela e outra) - Pedro
*/
function loadingPage(_pageId) {
    /* - as variaveis foram inicializadas mas não declaradas, mesmo assim as funções são executadas.
    let loadTimerInterval;
    let loadTimerOut
    */
    showOrHideOverlay("loading", true);
    let timeInterval = 500;
    let totalInterval = 0;

    loadTimerInterval = setInterval(() => {
        totalInterval += timeInterval;
        console.log(totalInterval)

    }, 500);

    loadTimerOut = setTimeout(() => {
        console.log(_pageId);
        selectPage(_pageId, 0);
        showOrHideOverlay("loading", false);
        clearInterval(loadTimerInterval);
        clearTimeout(loadTimerOut);
    }, 5000);
}

































////////////////////////////
// REQUEST SERVER
///////////////////////////
// AJAX
const xhttp = new XMLHttpRequest();

/*
   Envia dados do login para a API - Pedro
*/
function doLogin(_player) {
    // colocar tela de carregar
    let sendUserJsonData = `{"request":"user","user":"${_player}"}`;
    console.log("UserEnviandoDados: " + sendUserJsonData);
    xhttp.open("POST", "/game", true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.send(sendUserJsonData);
}

/*
   Enviar dados do mapa para a API - Pedro
*/
function sendMap() {
    let sendMapJson = `{"request":"map","user":"${playerName}"}`;
    console.log("UserEnviandoDados: " + sendMapJson);
    xhttp.open("POST", "/game", true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.send(sendMapJson);
}

/*
RECEIVE RESPONSE FROM SERVER AND REDIRECT TO FUNCTION - Pedro
*/
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let recListServidor = JSON.parse(this.responseText);

    }
}





