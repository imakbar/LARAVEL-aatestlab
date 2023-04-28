<template>
    <router-link class="avatar-group" :to="appEndPoint+pageLevelEndPoint+'/'+agencyId">
        <div 
        v-for="(item,index) in agents.data" :key="index"
        data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="bottom" title="" class="xavatar pull-up" :data-bs-original-title="Helpers.getFullName(item.user)">
            <div v-if="item.user.profile && item.user.profile.avatar" class="avatar avatar-lg">
                <img :src="Helpers.mediaPath()+Helpers.getMedia(item.user.profile.avatar)['path']" alt="avatar">
            </div>
            <div v-else class="avatar bg-light-success avatar-lg">
                <span class="avatar-data">
                    {{Helpers.getProfileShortName(item.user)}}
                </span>
            </div>
            <!-- <img :src="Helpers.mediaPath()+Helpers.getMedia(item.user.profile.avatar)['path']" alt="Avatar" width="45" height="45"> -->
        </div>
        <router-link v-if="agents.total > 0" :to="appEndPoint+pageLevelEndPoint+'/'+agencyId" class="align-self-center cursor-pointer ms-50 mb-0">+{{agents.total}}</router-link>
        <!-- <router-link class="xavatar pull-up"
            v-if="agents.total > 0" :to="appEndPoint+pageLevelEndPoint+'/'+agencyId" 
        >
            <div class="avatar bg-light-success avatar-lg">
                <span class="avatar-data">
                    +{{agents.total}}
                </span>
            </div>
        </router-link> -->
    </router-link>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import Helpers from "../helpers/helpers";
export default defineComponent({
    name: "agency-agents-avatars",
    props: {
        agency: {
            type: Object,
            default: ''
        }
    },
    watch:{
        agency: {
            handler: function (val, oldVal) {
                this.refreshData()
            },
            deep: true
        },
    },
    setup(props){
        const appEndPoint = ref(process.env.MIX_APP_END_POINT)
        const apiEndPoint = ref(process.env.MIX_APP_API_END_POINT)
        const pageLevelEndPoint = ref('/agents')
        const agencyId = ref(props.agency.id)
        const agents = ref({})
        
        onMounted(() => {
            agents.value = Helpers.AvatarsLimit(3,props.agency.agents)
        });

        const refreshData = () => {
            agents.value = Helpers.AvatarsLimit(3,props.agency.agents)
        }

        return {
            Helpers,
            appEndPoint,
            apiEndPoint,
            pageLevelEndPoint,
            agencyId,
            agents,
            refreshData,
        }
    }
})
</script>