import { WebMCPPayload } from './types';
export declare class PayloadEngine {
    private currentPayload;
    private dwellTimers;
    private completedElements;
    private container;
    private audioObj;
    constructor(containerId: string);
    loadPayload(payload: WebMCPPayload): void;
    processFrame(landmarks: any[]): void;
    private triggerInteraction;
    private reportResultToWebMCP;
}
