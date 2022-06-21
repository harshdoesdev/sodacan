var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { audioContext } from "./sound";
export var ASSET_TYPE;
(function (ASSET_TYPE) {
    ASSET_TYPE["IMAGE"] = "image";
    ASSET_TYPE["SOUND"] = "sound";
    ASSET_TYPE["JSON"] = "json";
})(ASSET_TYPE || (ASSET_TYPE = {}));
const loadImage = (name, src) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = src;
        return {
            value: image,
            name,
            type: ASSET_TYPE.IMAGE
        };
    }
    catch (_a) {
        console.error(`Couldn't Load Image "${name}" from ${src}`);
    }
});
const loadSound = (name, src) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield fetch(src);
        const arrayBuffer = yield request.arrayBuffer();
        const audioBuffer = yield audioContext.decodeAudioData(arrayBuffer);
        return {
            value: audioBuffer,
            name,
            type: ASSET_TYPE.SOUND
        };
    }
    catch (e) {
        console.error(`Couldn't Load Sound "${name}" from ${src}`);
    }
});
const loadJSON = (name, src) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield fetch(src);
        const json = yield request.json();
        return {
            value: json,
            name,
            type: ASSET_TYPE.JSON
        };
    }
    catch (e) {
        console.error(`Couldn't Load JSON "${name}" from ${src}`);
    }
});
const getAssetLoadPromise = ({ name, src, type }) => {
    switch (type) {
        case ASSET_TYPE.IMAGE:
            return loadImage(name, src);
        case ASSET_TYPE.SOUND:
            return loadSound(name, src);
        case ASSET_TYPE.JSON:
            return loadJSON(name, src);
    }
};
export default class AssetLoader {
    constructor() {
        this.loading = false;
        this.queue = [];
    }
    enqueueAsset(name, src, type) {
        const queuedAsset = {
            name,
            src,
            type
        };
        this.queue.push(queuedAsset);
    }
    addImage(name, src) {
        this.enqueueAsset(name, src, ASSET_TYPE.IMAGE);
    }
    addSound(name, src) {
        this.enqueueAsset(name, src, ASSET_TYPE.SOUND);
    }
    addJSON(name, src) {
        this.enqueueAsset(name, src, ASSET_TYPE.JSON);
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.loading) {
                throw new Error('AssetLoader is Already Loading Assets.');
            }
            try {
                this.loading = true;
                const loadPromises = this.queue.map(getAssetLoadPromise);
                const loadedAssets = yield Promise.all(loadPromises);
                const assetMap = {
                    [ASSET_TYPE.IMAGE]: {},
                    [ASSET_TYPE.SOUND]: {},
                    [ASSET_TYPE.JSON]: {}
                };
                for (let i = 0; i < loadedAssets.length; i++) {
                    const asset = loadedAssets[i];
                    if (asset) {
                        const { name, type, value } = asset;
                        const assetsOfType = assetMap[type];
                        assetsOfType[name] = value;
                    }
                }
                return assetMap;
            }
            catch (_a) {
                console.error("Loading Failed.");
            }
            finally {
                this.reset();
            }
        });
    }
    reset() {
        this.loading = false;
        this.clearQueue();
    }
    clearQueue() {
        this.queue.length = 0;
    }
}
