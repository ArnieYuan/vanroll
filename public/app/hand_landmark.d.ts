export declare class HandTracking {
    worker: Worker | undefined;
    lastVideoTime: number;
    isProcessing: boolean;
    onResults: ((results: any) => void) | undefined;
    initialize(): Promise<void>;
    detect(videoElement: HTMLVideoElement, startTimeMs: number): Promise<void>;
}
