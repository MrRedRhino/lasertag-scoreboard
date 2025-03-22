<script setup>
import {connected, discoverDevices} from "@/serial.js";
import CombinedLeaderboardStat from "@/components/leaderboard/AggregatedLeaderboardStat.vue";
import {useToast} from "primevue";
import {watch} from "vue";
import {formatTime, leaderboard, secondsLeft, startGame, stopGame} from "@/game_state.js";
import {roundDivision} from "./main.js";
import TeamTable from "@/components/leaderboard/TeamTable.vue";

const toast = useToast();
// const serialUnavailable = navigator.serial === undefined;
const serialUnavailable = false;

function computeAverageKD(teamId) {
  const teamKDs = leaderboard.value
      .filter(p => p.teamId === teamId)
      .map(p => roundDivision(p.kills, p.deaths));

  return roundDivision(teamKDs.reduce((acc, v) => acc + v, 0), teamKDs.length).toFixed(2);
}

function computeAverageKills(teamId) {
  const teamKDs = leaderboard.value
      .filter(p => p.teamId === teamId)
      .map(p => p.kills);

  return roundDivision(teamKDs.reduce((acc, v) => acc + v, 0), teamKDs.length).toFixed(2);
}

watch(connected, value => {
  if (value) {
    toast.add({severity: 'success', summary: "Connection", detail: 'Game Master has been connected', life: 3000});
  } else {
    toast.add({severity: 'warn', summary: "Connection", detail: 'Lost connection to Game Master', life: 3000});
  }
});
</script>

<template>
  <Toast/>
  <Dialog v-model:visible="serialUnavailable" modal pt:mask:class="backdrop-blur-sm">
    <template #container>
      <Message severity="warn" size="large" class="h-12">
        Serial communication is not available in this browser.
      </Message>
    </template>
  </Dialog>

  <div class="flex items-center bg-zinc-900 p-2">
    <div class="flex-1">
      <div class="flex items-center gap-1">
        <div class="rounded-full w-3 h-3" :class="[connected ? 'bg-green-400' : 'bg-rose-700']"></div>
        <h1>{{ connected ? "Connected" : "Disconnected" }}</h1>
      </div>
      <a class="text-green-400 cursor-pointer" @click="discoverDevices()">Choose Device</a>
    </div>

    <div class="flex items-center gap-2">
      <i class="pi pi-clock"></i>
      <h1 class="text-3xl font-bold">{{ formatTime(secondsLeft) }}</h1>
    </div>

    <div class="flex-1"></div>
  </div>

  <Button @click="startGame()">Start</Button>
  <Button @click="stopGame()">Stop</Button>

  <div class="w-screen flex items-center flex-col mt-12">
    <div class="bg-zinc-950">
      <TeamTable :team="0"/>

      <div class="flex flex-row gap-8 m-4 justify-center">
        <CombinedLeaderboardStat
            title="AVG. K/D"
            :value-team1="computeAverageKD(0)"
            :value-team2="computeAverageKD(1)"
            :team1-id="0"
            :team2-id="1"/>
        <CombinedLeaderboardStat
            title="AVG. KILLS"
            :value-team1="computeAverageKills(0)"
            :value-team2="computeAverageKills(1)"
            :team1-id="0"
            :team2-id="1"/>
      </div>

      <TeamTable :team="1"/>

      <div class="h-16"></div>

      <TeamTable :team="2"/>
    </div>
  </div>
</template>

<style scoped>

</style>
