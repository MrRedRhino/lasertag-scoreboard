<script setup>

import {teamColors} from "@/main.js";

const props = defineProps({
  valueTeam1: {
    type: String,
    required: true
  },
  valueTeam2: {
    type: String,
    required: true
  },
  team1Id: {
    type: Number,
    required: true
  },
  team2Id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="flex gap-2 items-center">
    <h1 class="p-1 w-14 pr-2 text-right" :style="`background: ${teamColors[team1Id]}`">{{ props.valueTeam1 }}</h1>
    <h1>{{ props.title }}</h1>
    <h1 class="p-1 pl-2 w-14" :style="`background: ${teamColors[team2Id]}`">{{ props.valueTeam2 }}</h1>
  </div>
</template>

<style scoped>

</style>