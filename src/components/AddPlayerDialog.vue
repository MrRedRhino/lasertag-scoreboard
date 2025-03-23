<script setup>
import {ref} from "vue";
import {teams} from "@/game_state.js";

const visible = defineModel("visible");
const team = defineModel("team");

const playerId = ref();
const playerName = ref();

function addPlayer() {
  if (playerId.value != null && playerName.value.trim().length > 0) {
    teams[team.value].push({id: playerId.value, name: playerName.value});
    visible.value = false;
  }
}
</script>

<template>
  <Dialog v-model:visible="visible" header="Add Player" class="w-64">
    <div class="flex flex-col mb-2">
      <label class="text-lg">Weapon ID</label>
      <InputNumber v-model="playerId" :use-grouping="false" :invalid="playerId === null"/>
    </div>

    <div class="flex flex-col mb-2">
      <label class="text-lg">Player Name</label>
      <InputText v-model="playerName" :use-grouping="false" :invalid="playerName === undefined || playerName?.trim().length === 0"/>
    </div>

    <Button @click="addPlayer" label="Add Player" fluid/>
  </Dialog>
</template>

<style scoped>

</style>