export const audioContext = new AudioContext();

export const soundMixer: GainNode = audioContext.createGain();

soundMixer.connect(audioContext.destination);

export function playSound(
    gainNode: GainNode, 
    audioBuffer: AudioBuffer, 
    time: number = 0,
    loop: boolean = false
): AudioBufferSourceNode {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(gainNode);
    source.start(time);
    source.loop = loop;

    return source;
}

export function stopSound(source: AudioBufferSourceNode, time: number = 0) {
    source.stop(time);
}

export function setVolue(gainNode: GainNode, volume: number = 1.0) {
    gainNode.gain.value = volume;
}

const resumeAudioContext = () => {
    if(/interrupted|suspended/.test(audioContext.state)) {
        audioContext.resume();
    }

    removeEventListener('click', resumeAudioContext);
}

addEventListener('click', resumeAudioContext);