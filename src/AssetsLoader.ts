import { audioContext } from "./sound";

export enum ASSET_TYPE {
    IMAGE = 'image',
    SOUND = 'sound',
    JSON = 'json'
}

interface QueuedAsset {
    name: string,
    src: string,
    type: ASSET_TYPE
}

interface LoadedAsset {
    value: any,
    name: string,
    type: ASSET_TYPE
}

interface AssetMap {
    [ASSET_TYPE.IMAGE]: any,
    [ASSET_TYPE.SOUND]: any,
    [ASSET_TYPE.JSON]: any
}

const loadImage = async (name: string, src: string): Promise<LoadedAsset | void> => {
    try {
        const image = new Image();

        image.crossOrigin = 'anonymous';

        image.src = src;

        return {
            value: image,
            name,
            type: ASSET_TYPE.IMAGE
        };
    } catch {
        console.error(`Couldn't Load Image "${name}" from ${src}`);
    }
};

const loadSound = async (name: string, src: string): Promise<LoadedAsset | void> => {
    try {
        const request = await fetch(src);
        const arrayBuffer = await request.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        return {
            value: audioBuffer,
            name,
            type: ASSET_TYPE.SOUND
        };
    } catch(e) {
        console.error(`Couldn't Load Sound "${name}" from ${src}`);
    }
};

const loadJSON = async (name: string, src: string): Promise<LoadedAsset | void> => {
    try {
        const request = await fetch(src);
        const json = await request.json();

        return {
            value: json,
            name,
            type: ASSET_TYPE.JSON
        };
    } catch(e) {
        console.error(`Couldn't Load JSON "${name}" from ${src}`);
    }
};

const getAssetLoadPromise = ({ name, src, type }: QueuedAsset): Promise<LoadedAsset | void> => {
    switch(type) {
        case ASSET_TYPE.IMAGE:
            return loadImage(name, src);
        case ASSET_TYPE.SOUND:
            return loadSound(name, src);
        case ASSET_TYPE.JSON:
            return loadJSON(name, src);
    }
};

export default class AssetLoader {
    loading: boolean = false
    queue: QueuedAsset[] = []

    enqueueAsset(name: string, src: string, type: ASSET_TYPE) {
        const queuedAsset: QueuedAsset = {
            name,
            src,
            type
        };

        this.queue.push(queuedAsset);
    }

    addImage(name: string, src: string) {
        this.enqueueAsset(name, src, ASSET_TYPE.IMAGE);
    }

    addSound(name: string, src: string) {
        this.enqueueAsset(name, src, ASSET_TYPE.SOUND);
    }

    addJSON(name: string, src: string) {
        this.enqueueAsset(name, src, ASSET_TYPE.JSON);
    }

    async load(): Promise<AssetMap | void> {
        if(this.loading) {
            throw new Error('AssetLoader is Already Loading Assets.');
        }

        try {
            this.loading = true;

            const loadPromises = this.queue.map(getAssetLoadPromise);
    
            const loadedAssets: (LoadedAsset | void)[] = await Promise.all(loadPromises);
    
            const assetMap: AssetMap = {
                [ASSET_TYPE.IMAGE]: {},
                [ASSET_TYPE.SOUND]: {},
                [ASSET_TYPE.JSON]: {}
            };
            
            for(let i = 0; i < loadedAssets.length; i++) {
                const asset: (LoadedAsset | void) = loadedAssets[i];
    
                if(asset) {
                    const { name, type, value } = asset;
    
                    const assetsOfType = assetMap[type];
    
                    assetsOfType[name] = value;
                }
            }
    
            return assetMap;
        } catch {
            console.error("Loading Failed.");
        } finally {
            this.reset();
        }
    }

    reset() {
        this.loading = false;
        this.clearQueue();
    }

    clearQueue() {
        this.queue.length = 0;
    }

}