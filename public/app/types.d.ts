export interface WebMCPPayload {
    lessonId: string;
    gameMechanic: string;
    config: PayloadConfig;
    audioIntro?: string;
    canvas?: CanvasConfig;
    interactiveElements: InteractiveElement[];
    fallbackTimeoutMs?: number;
    onTimeout?: {
        audioResponse: string;
    };
}
export interface PayloadConfig {
    trackingTarget: string;
    interactionThresholdMs: number;
    hitboxGenerosity: number;
}
export interface CanvasConfig {
    background?: {
        type: string;
        value: string;
    };
    foregroundOverlay?: {
        type: string;
        brushSize: number;
    };
}
export interface InteractiveElement {
    id: string;
    type: string;
    src?: string;
    label: string;
    isCorrectTarget: boolean;
    coordinates: {
        x: number;
        y: number;
        radius: number;
    };
    onInteraction: InteractionResponse;
}
export interface InteractionResponse {
    audioResponse?: string;
    triggerEffect?: string;
    nextStateTrigger: string;
}
