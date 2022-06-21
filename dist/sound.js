export const audioContext = new AudioContext();
export const soundMixer = audioContext.createGain();
soundMixer.connect(audioContext.destination);
export function playSound(gainNode, audioBuffer, time = 0, loop = false) {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(gainNode);
    source.start(time);
    source.loop = loop;
    return source;
}
export function stopSound(source, time = 0) {
    source.stop(time);
}
export function setVolue(gainNode, volume = 1.0) {
    gainNode.gain.value = volume;
}
const resumeAudioContext = () => {
    if (/interrupted|suspended/.test(audioContext.state)) {
        audioContext.resume();
    }
    removeEventListener('click', resumeAudioContext);
};
addEventListener('click', resumeAudioContext);
