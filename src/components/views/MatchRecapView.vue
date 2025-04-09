<script setup>
import CombinedLeaderboardStat from "@/components/leaderboard/AggregatedLeaderboardStat.vue";
import TeamTable from "@/components/leaderboard/TeamTable.vue";
import {leaderboard} from "@/game_state.js";
import {roundDivision} from "@/main.js";
import {ref} from "vue";
import LoadingButton from "@/components/LoadingButton.vue";
import {saveMatchStats} from "@/backend.js";

const teamCount = new Set(leaderboard.value.map(e => e.teamId)).size;
const saving = ref(false);

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
</script>

<template>
  <div class="bg-zinc-950">
    <template v-for="i in Math.max(0, teamCount - 1)">
      <TeamTable :team="i - 1"/>

      <div class="flex flex-row gap-8 m-4 justify-center">
        <CombinedLeaderboardStat
            title="AVG. K/D"
            :value-team1="computeAverageKD(i - 1)"
            :value-team2="computeAverageKD(i)"
            :team1-id="i - 1"
            :team2-id="i"/>
        <CombinedLeaderboardStat
            title="AVG. KILLS"
            :value-team1="computeAverageKills(i - 1)"
            :value-team2="computeAverageKills(i)"
            :team1-id="i - 1"
            :team2-id="i"/>
      </div>
    </template>

    <TeamTable v-if="teamCount >= 1" :team="teamCount - 1"/>
  </div>

  <div class="flex gap-2 justify-center mt-8">
    <Button icon="pi pi-chevron-left" label="Back" outlined @click="$router.push('/')"/>
    <LoadingButton v-slot="{ loading, callback }">
      <Button icon="pi pi-upload" label="Save stats" :loading="loading" @click="callback(async () => await saveMatchStats({}))"/>
    </LoadingButton>
  </div>
</template>

<style scoped>

</style>