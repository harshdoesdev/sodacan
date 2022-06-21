export declare enum ASSET_TYPE {
    IMAGE = "image",
    SOUND = "sound",
    JSON = "json"
}
interface QueuedAsset {
    name: string;
    src: string;
    type: ASSET_TYPE;
}
interface AssetMap {
    [ASSET_TYPE.IMAGE]: any;
    [ASSET_TYPE.SOUND]: any;
    [ASSET_TYPE.JSON]: any;
}
export default class AssetLoader {
    loading: boolean;
    queue: QueuedAsset[];
    enqueueAsset(name: string, src: string, type: ASSET_TYPE): void;
    addImage(name: string, src: string): void;
    addSound(name: string, src: string): void;
    addJSON(name: string, src: string): void;
    load(): Promise<AssetMap | void>;
    reset(): void;
    clearQueue(): void;
}
export {};
