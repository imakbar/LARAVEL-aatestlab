<template>
<Transition name="modal">
    <div class="card overflow-hidden" v-if="recordObj.activeTab == 'socials'">
        <!-- Loading -->
        <GlobalLoader :loaderProps="loaderSettings"></GlobalLoader>

        <div class="card-body py-2 my-25">
            <div class="mb-10 row" v-for="(social,index) in record" :key="index">
                <div class="col-sm-3">
                    <label class="col-form-label" :for="index">{{index}}</label>
                </div>
                <div class="col-sm-9">
                    <input type="text" :id="index" class="form-control" v-model="record[index]" :placeholder="index">
                </div>
            </div>
            <div class="row">
                <div class="col-sm-9 offset-sm-3">
                    <button @click.prevent="updateBtn()" type="reset" class="btn btn-primary me-1 waves-effect waves-float waves-light">Submit</button>
                </div>
            </div>
        </div>
    </div>
</Transition>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import axios from "axios";
import Swal from 'sweetalert2'
import Helpers from "../../components/helpers/helpers"
import GlobalLoader from "@/components/global/Loader.vue";
export default defineComponent({
    name: "settings-socials",
    emit: ["refresh-parent-data"],
    components: {
        GlobalLoader,
    },
    props: {
        recordObj: {
            type: Object,
            required: true
        },
    },
    watch:{
        recordObj: {
            handler: function (val, oldVal) {
                val.activeTab == 'socials'?this.getSettings():''
            },
            deep: true
        },
    },
    created(){
        // this.getSettings()
    },
    setup(props, {emit}) {
        const pageLevelEndPoint = ref('/settings')
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });

        // const activeTab = ref('')

        const record : any = ref({})
        const errors : any = ref([])

        const getSettings = () => {
            loaderSettings.value.active = true;
            axios.get(Helpers.completeUrl()+pageLevelEndPoint.value)
                .then(res => {
                    // console.log('res.data.app_settings_socials',res.data.app_settings_socials)
                    record.value = res.data.app_settings_socials
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },500)
                })
        }

        const updateBtn = () => {
            loaderSettings.value.active = true;
            axios.put(Helpers.completeUrl()+pageLevelEndPoint.value, {
                type:'socials',
                data:record.value
            })
                .then((res) => {
                    if(res.data.status == 'success'){
                        errors.value = []
                        sweetalertMessage({
                            status: res.data.status,
                            title: '',
                            message: res.data.message,
                            position: 'bottom-end',
                            timer: 5000,
                            progressBar: true,
                            toast: true,
                            showConfirmButton: false,
                        })
                        parentToChild()
                        getSettings()
                        setTimeout(() => {
                            loaderSettings.value.active = false;
                        },300)
                    } else {
                        errors.value = res.data.errors
                        setTimeout(() => {
                            loaderSettings.value.active = false;
                        },300)
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },100)
                });
        }

        const parentToChild = () => {
            emit('refresh-parent-data', {refresh:true})
        }

        const sweetalertMessage = (data) => {
            const Toast = Swal.mixin({
                toast: data.toast,
                position: data.position,
                timer: data.timer,
                timerProgressBar: data.progressBar,
                showConfirmButton: data.showConfirmButton,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            if(data.toast == true){
                Toast.fire({
                    icon: data.status,
                    title: data.title,
                    text: data.message
                })
            } else {
                Swal.fire({
                    position: data.position,
                    timer: data.timer,
                    timerProgressBar: data.progressBar,
                    showConfirmButton: data.showConfirmButton,
                    icon: data.status,
                    title: data.title,
                    text: data.message,
                })
            }
        }
        
        return {
            loaderSettings,
            // activeTab,
            record,
            errors,
            getSettings,
            updateBtn,
        }
    }
});
</script>