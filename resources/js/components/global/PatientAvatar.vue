<template>
    <span>
        <div v-if="user.avatar" class="avatar avatar-lg">
            <img :src="Helpers.mediaPath()+Helpers.getMedia(user.avatar)['path']" alt="avatar">
        </div>
        <div v-else class="avatar bg-light-success avatar-lg">
            <span class="avatar-content text-uppercase">
                {{user.name[0]}}
            </span>
        </div>
    </span>
</template>
<script lang="ts">
import { defineComponent} from "vue";
import Helpers from "../helpers/helpers";
export default defineComponent({
    name: "patient-avatar-and-name",
    props: {
        user: {
            type: Object,
            default: ''
        }
    },
    setup(){
        return {
            Helpers,
        }
    }
})
</script>