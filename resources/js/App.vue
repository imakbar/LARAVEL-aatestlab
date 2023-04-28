<template>
    <router-view></router-view>
    <div id="gist"></div>
</template>
 
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance } from "vue";
// import MainMenu from "@/components/core/MainMenu.vue";
import postscribe from 'postscribe'
export default defineComponent({
    name: "app",
    components: {
        // MainMenu
    },
    setup() {
        onMounted(() => {
            postscribe('#gist', `
                <script src="/backend/app-assets/vendors/js/vendors.min.js"><\/script>
                <script src="/backend/app-assets/vendors/js/forms/select/select2.full.min.js"><\/script>
                <script src="/backend/app-assets/js/core/app-menu.js"><\/script>
                <script src="/backend/app-assets/js/core/app.js"><\/script>
                <script src="/backend/app-assets/js/scripts/forms/form-select2.min.js"><\/script>
            `)
                // <script src="/backend/app-assets/vendors/js/forms/wizard/bs-stepper.min.js"><\/script>
                // <script src="/backend/app-assets/js/scripts/forms/form-wizard.min.js"><\/script>
                // <script src="/backend/app-assets/js/scripts/pages/app-chatx.js"><\/script>
                
            // const scripts = [
            //     "/backend/app-assets/vendors/js/vendors.min.js",
            //     "/backend/app-assets/vendors/js/charts/apexcharts.min.js",
            //     "/backend/app-assets/vendors/js/extensions/toastr.min.js",
            //     "/backend/app-assets/js/core/app-menu.js",
            //     "/backend/app-assets/js/core/app.js",
            //     "/backend/app-assets/js/scripts/pages/dashboard-ecommerce.js",
            //     "/plugins/ckeditor/ckeditor.js",
            //     "/plugins/ckeditor/samples/js/sample.js",
            // ];
            // scripts.forEach(script => {
            //     let tag = document.head.querySelector(`[src="${ script }"`);
            //     if (!tag) {
            //         tag = document.createElement("script");
            //         tag.setAttribute("src", script);
            //         tag.setAttribute("type", 'text/javascript');
            //         document.head.appendChild(tag); 
            //     }
            // });
            nextTick(() => {
                // MainMenu.reinitialization();
            });
        });
    },
})
</script>


<style lang="css">
@import "/backend/app-assets/vendors/css/vendors.min.css";
@import "/backend/app-assets/vendors/css/charts/apexcharts.css";
@import "/backend/app-assets/vendors/css/extensions/toastr.min.css";
@import "/backend/app-assets/css/bootstrap.css";
@import "/backend/app-assets/css/bootstrap-extended.css";
@import "/backend/app-assets/css/colors.css";
@import "/backend/app-assets/css/components.css";
@import "/backend/app-assets/css/themes/dark-layout.css";
@import "/backend/app-assets/css/themes/bordered-layout.css";
@import "/backend/app-assets/css/themes/semi-dark-layout.css";
@import "/backend/vendors/icons/simple-line-icons.css";
@import "/backend/app-assets/css/core/menu/menu-types/vertical-menu.css";
@import "/backend/app-assets/css/pages/dashboard-ecommerce.css";
@import "/backend/app-assets/css/plugins/charts/chart-apex.css";
@import "/backend/app-assets/css/plugins/extensions/ext-component-toastr.css";
@import "/backend/app-assets/css/plugins/extensions/ext-component-sweet-alerts.css";
@import "/backend/app-assets/css/plugins/forms/form-wizard.min.css";
@import "/backend/app-assets/vendors/css/forms/wizard/bs-stepper.min.css";

/* BEGIN: LOGIN Page CSS */
/* @import "/backend/app-assets/css/core/menu/menu-types/vertical-menu.min.css"; */
/* @import "/backend/app-assets/css/plugins/forms/form-validation.css"; */
@import "/backend/app-assets/css/pages/authentication.css";
/* END: LOGIN Page CSS */

/* BEGIN: Filemanager CSS */
/* @import "/backend/app-assets/css/plugins/extensions/ext-component-tree.min.css"; */
@import "/backend/app-assets/css/pages/app-file-manager.min.css";
/* END: Filemanager CSS */

@import "/backend/app-assets/vendors/css/forms/select/select2.min.css";

@import "/backend/app-assets/css/pages/app-chat.css";
@import "/backend/app-assets/css/pages/app-chat-list.css";

@import "/backend/assets/css/style.css";
@import "/backend/custom.css";
</style>