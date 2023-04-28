<template>
    <span class="badge rounded-pill text-capitalized" :class="roleClass">{{role.name}}</span>
</template>
<script lang="ts">
import { defineComponent} from "vue";
export default defineComponent({
    name: "role-badge",
    props: {
        role: {
            type: Object,
            default: ''
        }
    },
    computed: {
        roleClass() {
            switch (this.role.slug) {
                case 'super_admin':
                    return 'badge-light-warning'
                case 'administrator':
                    return 'badge-light-success'
                case 'normal_user':
                    return 'badge-light-secondary'
                case 'user':
                    return 'badge-light-danger'
                default:
                    return 'badge-light-warning'
            }
        }
    }
})
</script>