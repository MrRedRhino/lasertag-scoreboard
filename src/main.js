import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import {Button, Column, DataTable, Dialog, Message, Toast, ToastService} from "primevue";
import {definePreset} from "@primevue/themes";

export const teamColors = [
    "#ed292c",
    "#0070cd",
    "#da6200"
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
    .use(ToastService)
    .component("Toast", Toast)
    .component("DataTable", DataTable)
    .component("Column", Column)
    .component("Button", Button)
    .component("Dialog", Dialog)
    .component("Message", Message)
    .mount('#app');
