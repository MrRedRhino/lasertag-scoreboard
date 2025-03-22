import {ref} from "vue";
import {leaderboard} from "@/game_state.js";

let currentMessage = "";

let connectedPort = null;
export const connected = ref(false);

setTimeout(async () => {
    const ports = await navigator.serial.getPorts();
    if (ports.length > 0) {
        const port = ports[0];

        if (port.connected) {
            await onConnect(port);
        }
    }
}, 100);

async function onConnect(port) {
    const previousPort = connectedPort;
    connectedPort = port;
    if (previousPort !== port) {
        port.addEventListener("connect", () => onConnect(port));
        port.addEventListener("disconnect", () => onDisconnect(port));
        try {
            await openPort(port);
        } catch (e) {
            await port.forget();
        }
    }

    connected.value = true;
}

function onDisconnect(port) {
    if (connectedPort === port) {
        connected.value = false;
        connectedPort = null;
    }
}

async function openPort(port) {
    await port.open({baudRate: 9600});

    const writer = port.writable.getWriter();
    setTimeout(async () => {
        await writer.write(new Uint8Array([1]));
        writer.releaseLock();
    }, 2000);

    setTimeout(async () => {
        try {
            const reader = port.readable.getReader();
            while (true) {
                const {value, done} = await reader.read();
                if (done) break;
                const message = new TextDecoder().decode(value);
                currentMessage += message;
                if (message.endsWith("\n")) {
                    console.log(currentMessage);
                    leaderboard.value = JSON.parse(currentMessage);
                    currentMessage = "";
                }
            }
        } catch (e) {
            onDisconnect(port);
        }
    });
}

export async function discoverDevices() {
    const port = await navigator.serial.requestPort();
    await onConnect(port);
}

export class connect {
}