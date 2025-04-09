<script setup>
import {running, startGame, stopGame, teams} from "@/game_state.js";
import TeamDivision from "@/components/TeamDivision.vue";
import GameConfigDrawer from "@/components/GameConfigDrawer.vue";
import {ref} from "vue";

const gameSettingsVisible = ref(false);

function startStopClicked() {
  running.value ? stopGame() : startGame();
}
</script>

<template>
  <GameConfigDrawer v-model:visible="gameSettingsVisible"/>

  <div>
    <TeamDivision :disabled="running"/>

    <div class="flex gap-2 justify-center mt-4">
      <Button icon="pi pi-plus" label="Create Team" :disabled="running" @click="teams.push([])"/>
      <Button :icon="`pi pi-${running ? 'times' : 'check'}`" :label="running ? 'Cancel game' : 'Begin now'" :severity="running ? 'danger' : 'primary'" @click="startStopClicked()"/>
      <Button icon="pi pi-cog" label="Match options" :disabled="running" @click="gameSettingsVisible = true"/>
    </div>
  </div>
</template>

<style scoped>

</style>