<template>
<Transition name="modal">
    <div class="card overflow-hidden" v-if="recordObj.activeTab == 'smtp'">
        <!-- Loading -->
        <GlobalLoader :loaderProps="loaderSettings"></GlobalLoader>

        <div class="card-body py-2 my-25">
            <div class="mb-10 row">
                <div class="col-sm-3">
                    <label class="col-form-label" for="smtp_type">SMTP Type</label>
                </div>
                <div class="col-sm-9">
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="radio"
                            v-model="record.smtp_type"
                            id="simple_smtp"
                            value="simple_smtp"
                        />
                        <label class="form-check-label" for="simple_smtp">Simple SMTP</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="radio"
                            v-model="record.smtp_type"
                            id="amazon_ses"
                            value="amazon_ses"
                        />
                        <label class="form-check-label" for="amazon_ses">Amazon SES</label>
                    </div>
                </div>
            </div>
            <div v-if="record.smtp_type == 'simple_smtp'">
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="simple_smtp_driver">Driver</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" id="simple_smtp_driver" class="form-control" v-model="record.simple_smtp_driver" placeholder="Driver">
                    </div>
                </div>
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="simple_smtp_host">Host</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" id="simple_smtp_host" class="form-control" v-model="record.simple_smtp_host" placeholder="Host">
                    </div>
                </div>
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="simple_smtp_port">Port</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" id="simple_smtp_port" class="form-control" v-model="record.simple_smtp_port" placeholder="Port">
                    </div>
                </div>
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="simple_smtp_user_name">User Name</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" id="simple_smtp_user_name" class="form-control" v-model="record.simple_smtp_user_name" placeholder="User Name">
                    </div>
                </div>
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="simple_smtp_password">Password</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="password" id="simple_smtp_password" class="form-control" v-model="record.simple_smtp_password" placeholder="Password">
                    </div>
                </div>
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="simple_smtp_encryption">Encryption</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" id="simple_smtp_encryption" class="form-control" v-model="record.simple_smtp_encryption" placeholder="Encryption">
                    </div>
                </div>
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="simple_smtp_from_email">From Email</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" id="simple_smtp_from_email" class="form-control" v-model="record.simple_smtp_from_email" placeholder="From Email">
                    </div>
                </div>
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="simple_smtp_from_name">From Name</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" id="simple_smtp_from_name" class="form-control" v-model="record.simple_smtp_from_name" placeholder="From Name">
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="aws_ses_smtp_driver">Driver</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" id="aws_ses_smtp_driver" class="form-control" v-model="record.aws_ses_smtp_driver" placeholder="Driver">
                    </div>
                </div>
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="aws_ses_smtp_host">Host</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" id="aws_ses_smtp_host" class="form-control" v-model="record.aws_ses_smtp_host" placeholder="Host">
                    </div>
                </div>
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="aws_ses_smtp_port">Port</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" id="aws_ses_smtp_port" class="form-control" v-model="record.aws_ses_smtp_port" placeholder="Port">
                    </div>
                </div>
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="aws_ses_smtp_user_name">User Name</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" id="aws_ses_smtp_user_name" class="form-control" v-model="record.aws_ses_smtp_user_name" placeholder="User Name">
                    </div>
                </div>
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="aws_ses_smtp_password">Password</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" id="aws_ses_smtp_password" class="form-control" v-model="record.aws_ses_smtp_password" placeholder="Password">
                    </div>
                </div>
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="aws_ses_smtp_encryption">Encryption</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" id="aws_ses_smtp_encryption" class="form-control" v-model="record.aws_ses_smtp_encryption" placeholder="Encryption">
                    </div>
                </div>
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="aws_ses_smtp_from_email">From Email</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" id="aws_ses_smtp_from_email" class="form-control" v-model="record.aws_ses_smtp_from_email" placeholder="From Email">
                    </div>
                </div>
                <div class="mb-10 row">
                    <div class="col-sm-3">
                        <label class="col-form-label" for="aws_ses_smtp_from_name">From Name</label>
                    </div>
                    <div class="col-sm-9">
                        <input type="text" id="aws_ses_smtp_from_name" class="form-control" v-model="record.aws_ses_smtp_from_name" placeholder="From Name">
                    </div>
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
    name: "settings-smtp",
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
                val.activeTab == 'smtp'?this.getSettings():''
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
                    // console.log('res.data.app_settings_smtp',res.data.app_settings_smtp)
                    record.value = res.data.app_settings_smtp
                    setTimeout(() => {
                        loaderSettings.value.active = false;
                    },500)
                })
        }

        const updateBtn = () => {
            loaderSettings.value.active = true;
            axios.put(Helpers.completeUrl()+pageLevelEndPoint.value, {
                type:'smtp',
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