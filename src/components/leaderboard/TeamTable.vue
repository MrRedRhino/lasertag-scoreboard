<script setup>
import {leaderboard} from "@/game_state.js";
import {roundDivision, teamColors} from "@/main.js";

const props = defineProps({
  team: {
    type: Number,
    required: true
  }
});

const headerPt = {
  headerCell: {
    style: `border-bottom-width: 3px; border-bottom-color: ${teamColors[props.team]}`
  }
}
</script>

<template>
  <DataTable :value="leaderboard.filter(p => p.teamId === props.team).sort((a, b) => Math.sign(b.score - a.score))" class="w-[800px]">
    <Column :pt="headerPt" class="" field="playerId" header="Name"/>
    <Column :pt="headerPt" class="w-24" field="score" header="Score">
      <template #body="{ field, data }">
        {{ data[field].toLocaleString("de") }}
      </template>
    </Column>
    <Column :pt="headerPt" class="w-24" field="kills" header="Kills"></Column>
    <Column :pt="headerPt" class="w-24" field="deaths" header="Deaths"></Column>
    <Column :pt="headerPt" class="w-24" header="K/D">
      <template #body="{ data }">
        {{ roundDivision(data.kills, data.deaths) }}
      </template>
    </Column>
  </DataTable>

</template>

<style scoped>

</style>