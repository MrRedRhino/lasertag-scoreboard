import {computed, reactive, ref} from "vue";

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
        teamId: 2,
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
export const gameStates = {
    NOT_STARTED: "not_started",
    PREP_PHASE: "prep_phase",
    ACTION_PHASE: "action_phase",
    ENDED: "ended",
};
export const gameState = ref(gameStates.NOT_STARTED);
export const running = computed(() => {
    return ![gameStates.NOT_STARTED, gameStates.ENDED].includes(gameState.value);
});
let countdownIntervalId = 0;
export const secondsLeft = ref(165);

export function getPlayerName(id) {
    for (let team of teams) {
        const player = team.find(p => p.id === id);
        if (player) return player.name;
    }
}

export function removePlayer(id) {
    for (let team of teams) {
        const i = team.findIndex(p => p.id === id);
        if (i >= 0) {
            team.splice(i, 1);
            return;
        }
    }
}

export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const second = seconds % 60;

    return `${minutes}:${second.toString().padStart(2, "0")}`;
}

export function startGame() {
    if (running.value) return;
    gameState.value = gameStates.PREP_PHASE;
    secondsLeft.value = gameConfig.prepPhaseSeconds;
    countdownIntervalId = setInterval(countdown, 1000);
    countdown();
}

function countdown() {
    if (secondsLeft.value-- === 0) {
        if (gameState.value === gameStates.PREP_PHASE) {
            gameState.value = gameStates.ACTION_PHASE;
            secondsLeft.value = gameConfig.roundDurationSeconds;
        } else {
            secondsLeft.value = 0;
            stopGame();
        }
    }
}

export function stopGame() {
    clearInterval(countdownIntervalId);
    gameState.value = gameStates.ENDED;
}
