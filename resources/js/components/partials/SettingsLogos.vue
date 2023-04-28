<template>
<Transition name="modal">
    <div class="card overflow-hidden" v-if="recordObj.activeTab == 'logos'">
        <!-- Loading -->
        <GlobalLoader :loaderProps="loaderSettings"></GlobalLoader>

        <div class="card-body py-2 my-25">
            <div class="mb-10 row">
                <div class="col-sm-3">
                    <label class="col-form-label" for="logo_light">Logo Light</label>
                </div>
                <div class="col-sm-9">
                    <!-- header section -->
                    <div class="">
                        <a>
                            <div v-if="record.logo_light" class="avatar avatar-xl">
                                <img :src="Helpers.mediaPath()+Helpers.findInArray(record.logo_light.thumbnails,{thumbnail:'thumbnail'})['path']" alt="avatar">
                            </div>
                        </a>
                        <!-- upload and reset button -->
                        <div class="d-flex align-items-end mt-15">
                            <div>
                            <label @click="addEditModalBtn('add',''),selectMediaBtn({field:'logo_light'})" for="account-upload" class="btn btn-sm btn-primary mb-10 me-75">Upload</label>
                            <p class="mb-0">Allowed file types: png, jpg, jpeg.</p>
                            </div>
                        </div>
                        <!--/ upload and reset button -->
                    </div>
                    <!--/ header section -->
                </div>
            </div>
            <div class="mb-10 row">
                <div class="col-sm-3">
                    <label class="col-form-label" for="logo_dark">Dark Logo</label>
                </div>
                <div class="col-sm-9">
                    <!-- header section -->
                    <div class="">
                        <a>
                            <div v-if="record.logo_dark" class="avatar avatar-xl">
                                <img :src="Helpers.mediaPath()+Helpers.findInArray(record.logo_dark.thumbnails,{thumbnail:'thumbnail'})['path']" alt="avatar">
                            </div>
                        </a>
                        <!-- upload and reset button -->
                        <div class="d-flex align-items-end mt-15">
                            <div>
                            <label @click="addEditModalBtn('add',''),selectMediaBtn({field:'logo_dark'})" for="account-upload" class="btn btn-sm btn-primary mb-10 me-75">Upload</label>
                            <p class="mb-0">Allowed file types: png, jpg, jpeg.</p>
                            </div>
                        </div>
                        <!--/ upload and reset button -->
                    </div>
                    <!--/ header section -->
                </div>
            </div>
            <div class="mb-10 row">
                <div class="col-sm-3">
                    <label class="col-form-label" for="fav_icon">Fav Icon</label>
                </div>
                <div class="col-sm-9">
                    <!-- header section -->
                    <div class="">
                        <a>
                            <div v-if="record.fav_icon" class="avatar avatar-xl">
                                <img :src="Helpers.mediaPath()+Helpers.findInArray(record.fav_icon.thumbnails,{thumbnail:'thumbnail'})['path']" alt="avatar">
                            </div>
                        </a>
                        <!-- upload and reset button -->
                        <div class="d-flex align-items-end mt-15">
                            <div>
                            <label @click="addEditModalBtn('add',''),selectMediaBtn({field:'fav_icon'})" for="account-upload" class="btn btn-sm btn-primary mb-10 me-75">Upload</label>
                            <p class="mb-0">Allowed file types: png, jpg, jpeg.</p>
                            </div>
                        </div>
                        <!--/ upload and reset button -->
                    </div>
                    <!--/ header section -->
                </div>
            </div>
            <div class="row">
                <div class="col-sm-9 offset-sm-3">
                    <button @click.prevent="updateBtn()" type="reset" class="btn btn-primary me-1 waves-effect waves-float waves-light">Submit</button>
                </div>
            </div>
        </div>

        <Teleport to="body">
            <FileManagerModal 
                :recordObj="{
                    actionMode:actionMode,
                    activeStatus:activeStatus,
                    showModal:showModal,
                    modalName:modalName,
                }" 
                @refresh-parent-data="loadParentData"
                @close-modal="closeModal"
                @selected-media-files="selectedMediaFiles"
            ></FileManagerModal>
        </Teleport>

    </div>
</Transition>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import { useStore } from "vuex";
import { Actions, Mutations } from "../../store/enums/StoreEnums";
import axios from "axios";
import Swal from 'sweetalert2'
import Helpers from "../../components/helpers/helpers"
import GlobalLoader from "@/components/global/Loader.vue";
import FileManagerModal from "@/components/modals/FileManagerModal.vue";
export default defineComponent({
    name: "settings-logos",
    emit: ["refresh-parent-data"],
    components: {
        GlobalLoader,
        FileManagerModal,
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
                val.activeTab == 'logos'?this.getSettings():''
            },
            deep: true
        },
    },
    created(){
        // this.getSettings()
    },
    setup(props, {emit}) {
        const store = useStore();
        const pageLevelEndPoint = ref('/settings')
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });

        // const activeTab = ref('')

        const record : any = ref({})
        const errors : any = ref([])

        const actionMode = ref('')
        const showModal = ref(false)
        const modalName = ref('')

        const getSettings = () => {
            loaderSettings.value.active = true;
            axios.get(Helpers.completeUrl()+pageLevelEndPoint.value)
                .then(res => {
                    // console.log('res.data.app_settings_logos',res.data.app_settings_logos)
                    record.value = res.data.app_settings_logos
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },500)
                })
        }

        const updateBtn = () => {
            loaderSettings.value.active = true;
            axios.put(Helpers.completeUrl()+pageLevelEndPoint.value, {
                type:'logos',
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

        const addEditModalBtn = (mode,itemId) => {
            actionMode.value = mode
            // recordId.value = itemId
            showModal.value = true
            modalName.value = 'FileManagerModal'
            $("body").css({"overflow":"hidden","padding-right":"17px"});
        }

        const selectMediaBtn = (data:any) => {
            var mediaSettings = Helpers.defaultThumbnailSizes()['logo']
            mediaSettings['field'] = data.field
            store.dispatch(Actions.SET_SELECT_MEDIA_ACTION,mediaSettings);
            window.dispatchEvent(new CustomEvent(
                'fileManagerModalListener', 
                {
                    detail: {
                        value:true
                    }
                }
            ))
            // console.log('SET_SELECT_MEDIA_ACTION after',JSON.stringify(store.state.SelectMediaModule.select_media_data))
        }

        const closeModal = (data) => {
            $("body").css({"overflow":"visible","padding-right":"0"});
            if(data.showModal == false){
                showModal.value = data.showModal
            }
        }

        const selectedMediaFiles = (data) => {
            // profile.value.avatar = res.data.profile.avatar
            console.log('data.files[0]=',Helpers.findInArray(data.files[0].thumbnails,{thumbnail:'thumbnail'})['path'])
            record.value[data.field] = data.files[0]
            // profile.value.avatar = data.files[0]
            // profile.value.media_meta = data.mediaMeta
            //console.log('selectedMediaFiles=',data)
        }
        
        return {
            store,
            loaderSettings,

            actionMode,
            showModal,
            modalName,
            addEditModalBtn,
            selectMediaBtn,
            closeModal,
            selectedMediaFiles,
            
            // activeTab,
            record,
            errors,
            getSettings,
            updateBtn,
            Helpers,
        }
    }
});
</script>