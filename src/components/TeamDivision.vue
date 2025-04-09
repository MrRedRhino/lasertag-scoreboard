<script setup>
import draggable from 'vuedraggable';
import {teams} from "@/game_state.js";
import {ref} from "vue";
import AddPlayerDialog from "@/components/AddPlayerDialog.vue";
import {teamColors} from "@/main.js";
import TeamDivisionEntry from "@/components/TeamDivisionEntry.vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});

const addPlayerDialogVisible = ref(false);
const addPlayerTeam = ref();

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

  <div class="flex flex-row flex-wrap gap-2 w-130">
    <div v-for="(_, i) in teams" class="flex flex-col bg-zinc-900 w-64">
      <div class="flex items-center border-b-4 p-2"
           :style="`border-bottom-width: 3px; border-bottom-color: ${teamColors[i]}`">
        <h1 class="font-bold">
          {{ `Team ${i + 1}` }}
        </h1>
        <Button :disabled class="ml-auto" @click="removeTeam" icon="pi pi-trash" variant="text" size="small"/>
      </div>
      <draggable class="border-zinc-800" :class="{'pointer-events-none': disabled}"
                 v-model="teams[i]"
                 group="team"
                 item-key="id"
                 :sort="false"
                 :animation="150">
        <template #item="{element}">
          <TeamDivisionEntry :player="element"/>
        </template>
      </draggable>
      <div v-if="teams[i].length === 0" class="border-zinc-800 border-b p-2 text-gray-500">
        There are no players in this team
      </div>
      <Button :disabled class="self-center" icon="pi pi-plus" label="Add Player" size="small" outlined
              @click="openAddPlayerDialog(i)"/>
    </div>
  </div>
</template>

<style scoped>

</style>