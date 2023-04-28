<template>
    <div class="d-flex align-items-center justify-content-center" style="min-height:200px;">
        <h1 class="mb-0">
            You don't have permission
        </h1>
    </div>
</template>
<script lang="ts">
import { defineComponent} from "vue";
export default defineComponent({
    name: "status",
    props: {
        // status: {
        //     type: String,
        //     default: ''
        // }
    },
    computed: {
        // statusClass() {
        //     switch (this.status) {
        //         case 'pending':
        //             return 'badge-light-warning'
        //         case 'active':
        //             return 'badge-light-success'
        //         case 'inactive':
        //             return 'badge-light-secondary'
        //         case 'trash':
        //             return 'badge-light-danger'
        //         default:
        //             return 'badge-light-warning'
        //     }
        // }
    }
})
</script>