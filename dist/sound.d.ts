export declare const audioContext: AudioContext;
export declare const soundMixer: GainNode;
export declare function playSound(gainNode: GainNode, audioBuffer: AudioBuffer, time?: number, loop?: boolean): AudioBufferSourceNode;
export declare function stopSound(source: AudioBufferSourceNode, time?: number): void;
export declare function setVolue(gainNode: GainNode, volume?: number): void;
