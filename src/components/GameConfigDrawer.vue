<script setup>
import {Select} from "primevue";
import {computed, ref, watch} from "vue";
import {formatTime, gameConfig} from "@/game_state.js";

const visible = defineModel("visible", {type: Boolean});
const prepPhaseDur = ref(formatTime(gameConfig.prepPhaseSeconds));

watch(prepPhaseDur, v => {
  const split = v.replace("_", "").split(":");
  gameConfig.prepPhaseSeconds = +split[0] * 60 + +split[1];
});
const roundDur = ref(formatTime(gameConfig.roundDurationSeconds));
watch(roundDur, v => {
  const split = v.replace("_", "").split(":");
  gameConfig.roundDurationSeconds = +split[0] * 60 + +split[1];
});
const gameMode = computed({
  get: () => gameModes.find(g => g.id === gameConfig.gameMode),
  set: g => gameConfig.gameMode = g.id
});
const gameModes = [
  {label: "Arcade", id: "arcade"}
];

function save() {

}
</script>

<template>
  <Drawer v-model:visible="visible" header="Game Settings" position="right">
    <div class="flex flex-col h-full">
      <div class="flex flex-col justify-center mb-4">
        <label>Game Mode</label>
        <Select v-model="gameMode" :options="gameModes" option-label="label"/>
      </div>

      <div class="flex flex-col justify-center mb-4">
        <label>Prep Phase Duration</label>
        <InputMask v-model="prepPhaseDur" mask="9:99" placeholder="0:40"/>
      </div>

      <div class="flex flex-col justify-center mb-4">
        <label>Round Duration</label>
        <InputMask v-model="roundDur" mask="9:99" placeholder="2:00"/>
      </div>

      <div class="flex flex-col justify-center mb-4">
        <label>Base Damage</label>
        <InputNumber v-model="gameConfig.baseDamage"/>
      </div>

      <div class="flex flex-col justify-center mb-4">
        <label>Resistance</label>
        <InputNumber v-model="gameConfig.resistance"/>
      </div>

      <div class="flex mb-4 items-center">
        <label>Friendly Fire</label>
        <ToggleSwitch class="ml-auto" v-model="gameConfig.friendlyFire"/>
      </div>

      <div class="flex mb-4 items-center">
        <label>Gun Sound</label>
        <ToggleSwitch class="ml-auto" v-model="gameConfig.doGunSound"/>
      </div>

      <div class="flex mb-4 items-center">
        <label>Enable Laser</label>
        <ToggleSwitch class="ml-auto" v-model="gameConfig.enableLaser"/>
      </div>

      <Button class="mt-auto" @click="visible = false" label="Close" fluid/>
    </div>
  </Drawer>
</template>

<style scoped>

</style>