<template>
    <div class="d-flex justify-content-left align-items-center">
        <div class="avatar-wrapper" v-if="user.profile">
            <a class="mr-15">
                <div v-if="user.profile.avatar" class="avatar avatar-lg">
                    <img :src="Helpers.mediaPath()+Helpers.getMedia(user.profile.avatar)['path']" alt="avatar">
                </div>
                <div v-else class="avatar bg-light-success avatar-lg">
                    <span class="avatar-content">
                        {{Helpers.getProfileShortName(user)}}
                    </span>
                </div>
            </a>
        </div>
        <div class="d-flex flex-column">
            <span class="user_name text-body text-truncate" v-if="user.profile">
                <span class="fw-bolder">
                    {{user.profile.first_name}}
                    {{user.profile.last_name}}
                </span>
            </span>
            <small class="emp_post text-muted">
                {{user.email}}
            </small>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent} from "vue";
import Helpers from "../helpers/helpers";
export default defineComponent({
    name: "profile-avatar-and-name",
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