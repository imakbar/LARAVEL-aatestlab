<template>
    <loading 
        :active="loaderSettings.active" 
        :can-cancel="false" 
        :on-cancel="onCancelLoader"
        :is-full-page="isLoadingFullPage"
        :color="color"
        :background-color="backgroundColor"
        :opacity="opacity"
    >
    </loading>
</template>
<script>
import { defineComponent, ref } from 'vue'
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
export default defineComponent({
    name: "global-loader",
    components: {
        Loading
    },
    props:{
        // propHeightChanged:Number,
        // loaderProps:Object,
        loaderProps: {
            type: Object,
            required: true
        },
    },
    watch: {
        loaderProps: {
            handler: function (val, oldVal) {
                this.loaderSettings = val
            },
            deep: true,
        },
    },
    setup(props) {
        const isLoadingFullPage = ref(false)
        const loaderSettings = ref(props.loaderProps)
        const color= ref("#ffffff")
        const backgroundColor= ref("#1c67a8")
        const opacity = ref("0.9")
        
        const onCancelLoader =() => {
          console.log('User cancelled the loader.')
        };
        
        return {
            isLoadingFullPage,
            loaderSettings,
            onCancelLoader,
            color,
            backgroundColor,
            opacity,
        }
    },
})
</script>
