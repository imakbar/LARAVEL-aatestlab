<template>
    <span class="badge rounded-pill text-capitalized" :class="statusClass">{{status}}</span>
</template>
<script lang="ts">
import { defineComponent} from "vue";
export default defineComponent({
    name: "status",
    props: {
        status: {
            type: String,
            default: ''
        }
    },
    computed: {
        statusClass() {
            switch (this.status) {
                case 'pending':
                    return 'badge-light-warning'
                case 'active':
                    return 'badge-light-success'
                case 'inactive':
                    return 'badge-light-secondary'
                case 'trash':
                    return 'badge-light-danger'
                default:
                    return 'badge-light-warning'
            }
        }
    }
})
</script>