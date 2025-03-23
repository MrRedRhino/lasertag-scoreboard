import {reactive, ref} from "vue";

export const leaderboard = ref([
    {
        teamId: 0,
        kills: 2,
        deaths: 0,
        score: 1000,
        playerId: "Penis"
    },
    {
        teamId: 0,
        kills: 2,
        deaths: 0,
        score: 1100,
        playerId: "Penis"
    },

    {
        teamId: 1,
        kills: 0,
        deaths: 3,
        score: 1000,
        playerId: "Nogger"
    },
    {
        teamId: 1,
        kills: 4,
        deaths: 2,
        score: 6942,
        playerId: "Olek"
    }
]);
export const teams = reactive([[], []]);
export const gameConfig = reactive({
    gameMode: "arcade",
    prepPhaseSeconds: 40,
    roundDurationSeconds: 165,
    baseDamage: 42,
    resistance: 1,
    regenerationSpeed: 1,
    friendlyFire: true,
    doGunSound: true,
    enableLaser: true,
});
export const running = ref(false);
let countdownIntervalId = 0;
export const secondsLeft = ref(165);

export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const second = seconds % 60;

    return `${minutes}:${second.toString().padStart(2, "0")}`;
}

export function startGame() {
    if (running.value) return;
    running.value = true;
    countdownIntervalId = setInterval(countdown, 1000);
    countdown();
}

function countdown() {
    if (secondsLeft.value-- === 0) {
        stopGame();
    }
}

export function stopGame() {
    clearInterval(countdownIntervalId);
    running.value = false;
}
