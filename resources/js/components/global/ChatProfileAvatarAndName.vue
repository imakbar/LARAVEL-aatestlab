<template>
    <div class="d-flex justify-content-left align-items-center">
        <div class="avatar-wrapper" v-if="avatar != ''">
            <div class="avatar avatar-lg">
                <img :src="Helpers.mediaPath()+Helpers.getMedia(avatar)['path']" alt="avatar">
            </div>
        </div>
        <div v-else class="avatar bg-light-success avatar-lg">
            <span class="avatar-content">
                {{Helpers.getShortName(first_name)}}{{Helpers.getShortName(last_name)}}
            </span>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import Helpers from "../helpers/helpers";
export default defineComponent({
    name: "chat-profile-avatar-and-name",
    props: {
        user: {
            type: Object,
            default: ''
        }
    },
    created(){
        this.userData()
    },
    setup(props){
        const first_name = ref('')
        const last_name = ref('')
        const avatar : any = ref('')
        const userData = () => {
            if(props.user.created_user){
                if(props.user.created_user.sender_profile){
                    first_name.value = props.user.created_user.sender_profile.first_name
                    last_name.value = props.user.created_user.sender_profile.last_name
                }
                if(props.user.created_user.sender_profile.avatar){
                    avatar.value = props.user.created_user.sender_profile.avatar.media
                }
            }
        }
        return {
            Helpers,
            userData,
            first_name,
            last_name,
            avatar,
        }
    }
})
</script>