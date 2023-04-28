<template>
    <!-- BEGIN: Content-->
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" :key="$route.path" />
        </transition>
    </router-view>
    <!-- <router-view></router-view> -->
    <!-- END: Content-->
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance } from "vue";
export default defineComponent({
    components: {
    },
    setup() {
        
    },
})
</script>
<style lang="css">
.slide-enter-active,
.slide-leave-active {
    transition: opacity 1s, transform 1s;
}
.slide-enter-from,
.slide-leave-from {
    opacity: 0;
    transform: translateX(-30%);
}
.moveUp-enter-active,
.moveUp-leave-active {
    animation: fadeIn 1s ease-in;
}
@keyframes fadeIn {
    0% { opacity: 0s; }
    50% { opacity: 0.5s; }
    100% { opacity: 1s; }
}
/* .moveUp-leave-active {
    animation: moveUp 0.3s ease-in;
}
@keyframes moveUp {
    0% { transform: translateY(0); }
    100% { transform: translateY(-400px); }
} */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>