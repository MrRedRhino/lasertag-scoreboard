import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import {
    Button,
    Column,
    ContextMenu,
    DataTable,
    Dialog,
    Drawer,
    InputGroup,
    InputMask,
    InputNumber,
    InputText,
    Message,
    Select,
    Tag,
    Toast,
    ToastService,
    ToggleSwitch
} from "primevue";
import {definePreset} from "@primevue/themes";
import {createRouter, createWebHashHistory} from "vue-router";
import SetupView from "@/components/views/SetupView.vue";
import MatchRecapView from "@/components/views/MatchRecapView.vue";

export const teamColors = [
    "#ed292c",
    "#0070cd",
    "#da6200"
];

const routes = [
    {path: "/", component: SetupView},
    {path: "/leaderboard", component: MatchRecapView}
];

export function roundDivision(a, b) {
    const divided = a / b;
    return (isNaN(divided) ? 0 : isFinite(divided) ? divided : a);
}

const preset = definePreset(Aura, {
    components: {
        datatable: {
            header: {
                cell: {
                    border: {
                        color: "white"
                    }
                }
            }
        }
    }
});

createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: preset
        }
    })
    .use(createRouter({
        history: createWebHashHistory(),
        routes: routes
    }))
    .use(ToastService)
    .component("Toast", Toast)
    .component("DataTable", DataTable)
    .component("Column", Column)
    .component("Button", Button)
    .component("Dialog", Dialog)
    .component("Message", Message)
    .component("InputGroup", InputGroup)
    .component("InputNumber", InputNumber)
    .component("InputText", InputText)
    .component("InputMask", InputMask)
    .component("ToggleSwitch", ToggleSwitch)
    .component("Drawer", Drawer)
    .component("ContextMenu", ContextMenu)
    .component("Select", Select)
    .component("Tag", Tag)
    .mount('#app');
