<script setup>
import {connected, discoverDevices} from "@/serial.js";
import {useToast} from "primevue";
import {watch} from "vue";
import {formatTime, gameConfig, gameState, gameStates, running, secondsLeft} from "@/game_state.js";

const toast = useToast();
// const serialUnavailable = navigator.serial === undefined;
const serialUnavailable = false;

watch(connected, value => {
  if (value) {
    toast.add({severity: 'success', summary: "Connection", detail: 'Game Master has been connected', life: 3000});
  } else {
    toast.add({severity: 'warn', summary: "Connection", detail: 'Lost connection to Game Master', life: 3000});
  }
});

function mapGameStateToString(state) {
  switch (state) {
    case gameStates.NOT_STARTED:
      return "Not Started";
    case gameStates.PREP_PHASE:
      return "Prep Phase";
    case gameStates.ACTION_PHASE:
      return "Action Phase";
    case gameStates.ENDED:
      return "Ended";
  }
}
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
      <h1 class="text-3xl font-bold">{{ formatTime(running ? secondsLeft : gameConfig.prepPhaseSeconds) }}</h1>
      <Tag severity="secondary" :value="mapGameStateToString(gameState)"/>
    </div>

    <div class="flex-1"></div>
  </div>

  <div class="content flex items-center flex-col mt-12">
    <router-view/>
  </div>
</template>

<style scoped>

</style>
