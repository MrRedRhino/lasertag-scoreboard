<script setup>
import draggable from 'vuedraggable';
import {teams} from "@/game_state.js";
import {ref} from "vue";
import AddPlayerDialog from "@/components/AddPlayerDialog.vue";
import {teamColors} from "@/main.js";

const addPlayerDialogVisible = ref(false);
const addPlayerTeam = ref();
const playerContextMenu = ref();
const playerContextMenuItems = ref([
  {label: "Rename", icon: "pi pi-pencil"},
  {label: "Remove", icon: "pi pi-trash"},
]);

function openAddPlayerDialog(teamId) {
  addPlayerTeam.value = teamId;
  addPlayerDialogVisible.value = true;
}

function removeTeam(teamId) {
  teams.splice(teams.indexOf(teamId), 1);
}
</script>

<template>
  <AddPlayerDialog v-model:visible="addPlayerDialogVisible" v-model:team="addPlayerTeam"/>
  <ContextMenu ref="playerContextMenu" :model="playerContextMenuItems"/>

  <div class="w-64">
    <div v-for="(_, i) in teams" class="flex flex-col mb-2 bg-zinc-900">
      <div class="flex items-center border-b-4 p-2"
           :style="`border-bottom-width: 3px; border-bottom-color: ${teamColors[i]}`">
        <h1 class="font-bold">
          {{ `Team ${i + 1}` }}
        </h1>
        <Button class="ml-auto" @click="removeTeam" icon="pi pi-trash" variant="text" size="small"/>
      </div>
      <draggable class="border-zinc-800"
                 v-model="teams[i]"
                 group="team"
                 item-key="id"
                 :sort="false"
                 :animation="150">
        <template #item="{element}">
          <div class="flex items-center border-b border-zinc-800 p-2" @contextmenu="playerContextMenu.show($event)">
            {{ element.name }}
          </div>
        </template>
      </draggable>
      <div v-if="teams[i].length === 0" class="border-zinc-800 border-b p-2 text-gray-500">
        There are no players in this team
      </div>
      <Button class="self-center" icon="pi pi-plus" label="Add Player" @click="openAddPlayerDialog(i)"/>
    </div>
  </div>
</template>

<style scoped>

</style>