/*
SOUND CONTROL - v0 - 13/06/2021
Classe para controle de audio para ser utilizado com JavaScript
*/

class SoundControl {
    constructor() {
        musicArray = [];
        effectsArray = [];

        soundMusicVolume = 1;
        soundEffectsVolume = 1;

    }
    setSoundMusic(_position, _src) {
        musicArray[_position] = new Audio(_src);
    }
    setSoundMusicVolume(_position, _volume) {
        musicArray[_position].volume = _volume;
    }
    setSoundMusicPlayPause(_position, _playPause){
        _playPause == "play" ? musicArray[_position].play() : musicArray[_position].pause();
    }
    setSoundMusicStop(_position){
        musicArray[_position].pause();
        musicArray[_position].currentTime = 0;
    }

    setSoundEffects(_position, _src) {
        effectsArray[_position] = new Audio(_src);  
    }
    setSoundEffectsVolume(_position, _volume) {
        effectsArray[_position].volume = _volume;
    }
    setSoundMusicPlayStop(_position, _status){
        _playPause == "play" ? effectsArray[_position].play() : effectsArray[_position].pause();
    }
    setSoundEffectsRestart(_position){
        effectsArray[_position].pause();
        effectsArray[_position].currentTime = 0;
    }

}
