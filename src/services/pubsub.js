const listeners = [];

export function subscribe(callback) {
    listeners.push(callback);
}

export function publish(dataPayload) {
   listeners.forEach((listener) => listener(dataPayload));
}
