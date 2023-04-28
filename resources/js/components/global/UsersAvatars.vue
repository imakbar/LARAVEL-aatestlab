<template>
    <span>Total {{role.users.length}} usersData</span>
    <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
        <li
        v-for="(item,index) in usersData.data" :key="index"
        data-bs-toggle="tooltip"
        data-popup="tooltip-custom"
        data-bs-placement="top"
        :title="item.profile.first_name+' '+item.profile.last_name"
        class="xavatar avatar-sm pull-up"
        >
            <div v-if="item.profile && item.profile.avatar" class="avatar avatar-sm">
                <img :src="Helpers.mediaPath()+Helpers.getMedia(item.profile.avatar)['path']" alt="avatar">
            </div>
            <div v-else class="avatar bg-light-success avatar-sm">
                <span class="avatar-data">
                    {{Helpers.getShortName(item.profile.first_name)}}
                </span>
            </div>
        </li>
        <li
        v-if="usersData.total > 0"
        data-bs-toggle="tooltip"
        data-popup="tooltip-custom"
        data-bs-placement="top"
        title=""
        class="xavatar avatar-sm pull-up"
        >
            <div class="avatar bg-light-success avatar-sm">
                <span class="avatar-data">
                    +{{usersData.total}}
                </span>
            </div>
        </li>
    </ul>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import Helpers from "../helpers/helpers";
export default defineComponent({
    name: "role-avatars",
    props: {
        role: {
            type: Object,
            default: ''
        }
    },
    watch:{
        role: {
            handler: function (val, oldVal) {
                this.refreshData()
            },
            deep: true
        },
    },
    setup(props){
        // const appEndPoint = ref(process.env.MIX_APP_END_POINT)
        // const apiEndPoint = ref(process.env.MIX_APP_API_END_POINT)
        // const pageLevelEndPoint = ref('/usersData')
        // const agencyId = ref(props.role.id)
        const usersData = ref({})
        
        onMounted(() => {
            usersData.value = Helpers.AvatarsLimit(2,props.role.users)
        });

        const refreshData = () => {
            usersData.value = Helpers.AvatarsLimit(2,props.role.users)
        }

        return {
            Helpers,
            // appEndPoint,
            // apiEndPoint,
            // pageLevelEndPoint,
            // agencyId,
            usersData,
            refreshData,
        }
    }
})
</script>