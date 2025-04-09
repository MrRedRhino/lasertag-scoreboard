<script setup>
import {ref} from "vue";
import {InputGroup} from "primevue";
import {removePlayer} from "@/game_state.js";

const props = defineProps({
  player: {
    type: Object,
    required: true
  }
});

const editing = ref(false);
const ctxMenu = ref();
const ctxMenuItems = ref([
  {label: "Rename", icon: "pi pi-pencil", command: () => editing.value = true},
  {label: "Remove", icon: "pi pi-trash", command: () => removePlayer(props.player.id)},
]);

</script>

<template>
  <div class="flex items-center border-b border-zinc-800 p-2" @contextmenu="ctxMenu.show($event)">
    <ContextMenu ref="ctxMenu" :model="ctxMenuItems"/>

    <InputGroup v-if="editing">
      <InputText v-model="props.player.name" size="small"/>
      <Button icon="pi pi-check" size="small" @click="editing = false"/>
    </InputGroup>
    <template v-else>
      {{ props.player.name }}
    </template>
  </div>
</template>

<style scoped>

</style>