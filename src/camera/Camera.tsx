export type FacingMode = 'user' | 'environment';
export type AspectRatio = 'cover' | number; // for example 16/9, 4/3, 1/1
export type Stream = MediaStream | null;

const stop = (stream: Stream) => {
    if (stream) {
        stream.getTracks().forEach((track) => {
            track.stop();
        });
    }
}

const initCameraStream = async (
    facingMode: FacingMode,
    deviceId: string | undefined
) => {
    const constraints = {
        audio: false,
        video: {
            deviceId: deviceId,
            facingMode: facingMode,
        },
    };

    return navigator.mediaDevices.getUserMedia(constraints);
};

// initCarmeraStream needs to be called first.
const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((i) => i.kind == "videoinput");
};

export { initCameraStream, getDevices, stop };