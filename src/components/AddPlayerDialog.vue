<script setup>
import {computed, ref, watch} from "vue";
import {getPlayerName, teams} from "@/game_state.js";

const visible = defineModel("visible");
const team = defineModel("team");

const playerId = ref();
const playerName = ref();
const idInvalid = computed(() => getPlayerName(playerId.value));

function addPlayer() {
  if (getPlayerName(playerId.value)) return;

  if (playerId.value != null && playerName.value.trim().length > 0) {
    teams[team.value].push({id: playerId.value, name: playerName.value});
    visible.value = false;
  }
}

watch(visible, () => {
  playerId.value = "";
  playerName.value = "";
});
</script>

<template>
  <Dialog v-model:visible="visible" header="Add Player" class="w-64">
    <div class="flex flex-col mb-2">
      <label class="text-lg">Weapon ID</label>
      <InputNumber v-model="playerId" :use-grouping="false" :invalid="playerId === null"/>
      <Message v-if="idInvalid" severity="error" variant="simple">ID already assigned to {{ idInvalid }}</Message>
    </div>

    <div class="flex flex-col mb-2">
      <label class="text-lg">Player Name</label>
      <InputText v-model="playerName" :use-grouping="false" :invalid="playerName === undefined || playerName?.trim().length === 0"/>
    </div>

    <Button @click="addPlayer" :disabled="idInvalid" label="Add Player" fluid/>
  </Dialog>
</template>

<style scoped>

</style>