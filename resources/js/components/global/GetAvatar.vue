<template>
    <a class="mr-15">
        <div v-if="avatar" class="avatar avatar-lg">
            <img :src="Helpers.mediaPath()+Helpers.getMedia(avatar)['path']" alt="avatar">
        </div>
        <div v-else class="avatar bg-light-success avatar-lg">
            <span class="avatar-content">
                {{Helpers.getShortName(name)}}
            </span>
        </div>
    </a>
</template>
<script lang="ts">
import { defineComponent} from "vue";
import Helpers from "../helpers/helpers";
export default defineComponent({
    name: "get-avatar",
    props: {
        avatar: {
            type: Object,
            default: ''
        },
        name: {
            type: String,
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