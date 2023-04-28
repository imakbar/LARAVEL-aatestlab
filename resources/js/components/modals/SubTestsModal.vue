<template>
    <Transition name="modal">
        <div
            v-if="recordObj.showModal && recordObj.modalName == 'SubTestsModal'"
            class="modal-mask modal modal-overlay"
            >
            <div class="modal-dialog fancy-scroll">
                <div class="modal-content modal-container">
                    <div class="modal-header bg-transparent">
                        <button @click="closeModal()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body px-sm-2 pb-35 pt-0">
                        <div class="text-center mb-2">
                            <h1 class="mb-1">
                                <span v-if="recordObj.actionMode == 'add'">Add New Test</span>
                                <span v-if="recordObj.actionMode == 'edit'">Edit Test</span>
                            </h1>
                        </div>

                        <div class="row">
                            <div class="col-sm-12 mt-15 mb-10">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="isAdvance" :class="[errors.is_advance != null?'is-invalid':'']" v-model="record.is_advance" value="1">
                                    <label class="form-check-label" for="isAdvance">Is Advance?</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4 mb-10">
                                <label class="form-label" for="test_code">Test Code</label>
                                <input type="text" v-model="record.test_code" id="test_code" class="form-control" :class="[errors.test_code != null?'is-invalid':'']" />
                                <div class="invalid-feedback" v-if="errors.test_code != null">{{errors.test_code[0]}}</div>
                            </div>
                            <div class="col-sm-4 mb-10">
                                <label class="form-label" for="test_rate">Test Rate</label>
                                <input type="text" v-model="record.test_rate" id="test_rate" class="form-control" :class="[errors.test_rate != null?'is-invalid':'']" />
                                <div class="invalid-feedback" v-if="errors.test_rate != null">{{errors.test_rate[0]}}</div>
                            </div>
                            <div class="col-sm-4 mb-10">
                                <label class="form-label" for="test_unit">Test Unit</label>
                                <input type="text" v-model="record.test_unit" id="test_unit" class="form-control" :class="[errors.test_unit != null?'is-invalid':'']" />
                                <div class="invalid-feedback" v-if="errors.test_unit != null">{{errors.test_unit[0]}}</div>
                            </div>
                            <div class="col-sm-12 mb-10">
                                <label class="form-label" for="test_name">Test Name</label>
                                <input type="text" v-model="record.test_name" id="test_name" class="form-control" :class="[errors.test_name != null?'is-invalid':'']" />
                                <div class="invalid-feedback" v-if="errors.test_name != null">{{errors.test_name[0]}}</div>
                            </div>
                            <div class="col-sm-12 mb-10">
                                <label class="form-label" for="test_name">Test Detail</label>
                                <textarea v-model="record.test_detail" type="text" class="form-control" :class="[errors.test_name != null?'is-invalid':'']" ref="focusinput"></textarea>
                                <div class="invalid-feedback" v-if="errors.test_name != null">{{errors.test_name[0]}}</div>
                            </div>
                            <div class="col-md-12 mb-10">
                                <label class="form-label" for="reporting_time">Reporting Time</label>
                                <v-select
                                    id="reporting_time"
                                    class="dropdown"
                                    :class="[errors.reporting_time != null?'is-invalid':'']"
                                    v-model="record.reporting_time"
                                    placeholder="Bulk actions"
                                    :clearable="true"
                                    :reduce="(option) => option.time"
                                    :options="reportingTimings"
                                    label="title"
                                >
                                    <template v-slot:option="option">
                                        <div class="list-item">
                                            {{ option.title }}
                                        </div>
                                    </template>
                                </v-select>
                                <div class="invalid-feedback" v-if="errors.reporting_time != null">{{errors.reporting_time[0]}}</div>
                            </div>
                            <div class="col-md-12 mb-10">
                                <label class="form-label" for="status">Status</label>
                                <v-select
                                    id="status"
                                    class="dropdown"
                                    :class="[errors.status != null?'is-invalid':'']"
                                    v-model="record.status"
                                    placeholder="Bulk actions"
                                    :clearable="true"
                                    :reduce="(option) => option.key"
                                    :options="bulkOptions"
                                    label="label"
                                >
                                    <template v-slot:option="option">
                                        <div class="list-item">
                                            <vue-feather class="icon" :type="option.icon" size="16"></vue-feather>
                                            {{ option.label }}
                                        </div>
                                    </template>
                                </v-select>
                                <div class="invalid-feedback" v-if="errors.status != null">{{errors.status[0]}}</div>
                            </div>
                            <div class="col-12 mt-20 text-center">
                                <button v-if="recordObj.recordId" @click="updateBtn()" type="button" class="btn btn-primary me-1">Update</button>
                                <button v-else @click="saveBtn()" type="button" class="btn btn-primary me-1">Submit</button>
                                <button @click="closeModal()" type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Close" ref="Close">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import Swal from 'sweetalert2'
import $ from "jquery";
import * as Helpers from "../../components/helpers/helpers"

export default defineComponent({
    name: "sub-tests-modal",
    emit: ["refresh-parent-data","close-modal"],
    props: {
        recordObj: {
            type: Object,
            required: true
        },
    },
    watch:{
        recordObj: {
            handler: function (val, oldVal) {
                this.mainTestId = val.mainTestId
                this.record.maintest_id = val.mainTestId
                if(val.actionMode == 'edit'){
                    this.getData()
                }
                this.showModal = val.showModal
                if(val.showModal == true){
                    $("body").css({"overflow":"hidden","padding-right":"17px"});
                } else {
                    $("body").css({"overflow":"visible","padding-right":"0"});
                }
            },
            deep: true
        },
    },
    created(){
        this.getData()
        this.getReportingTimings()
    },
    setup(props, {emit}) {
        const route = useRoute();
        const pageLevelEndPoint = ref('/sub-tests')
        
        const bulkOptions = ref([])
        const mainTestId = ref(props.recordObj.mainTestId)
        const record : any = ref({
            maintest_id: mainTestId.value,
        });
        const errors : any = ref([]);
        const reportingTimings = ref([]);

        const addEditModalClose = ref(null)

        const showModal = ref(props.recordObj.showModal)
        const modalName = ref(props.recordObj.modalName)
        const modalSettings = ref({
            preventClick: "false",
            zIndexAuto: "true",
            zIndexBase: "10000",
            zIndex: "true",
            transition: "vfm"
        })

        const saveBtn = () => {
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/save', record.value)
                .then((res) => {
                    if(res.data.status == 'success'){
                        errors.value = []
                        parentToChild()
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
                        setTimeout(() => {
                            closeModal()
                        },100)
                    } else {
                        errors.value = res.data.errors
                    }
                })
                .catch((error) => {
                    sweetalertMessage({
                        status: 'error',
                        title: '',
                        message: error.response.data.message,
                        position: 'bottom-end',
                        timer: 5000,
                        progressBar: true,
                        toast: true,
                        showConfirmButton: false,
                    })
                });
        }

        const getData = () => {
            errors.value = []
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/edit',props.recordObj)
                .then((res) => {
                    if(props.recordObj.recordId){
                        record.value = res.data.itemData
                    }
                    bulkOptions.value = res.data.bulkOptions
                })
                .catch((error) => {
                    sweetalertMessage({
                        status: 'error',
                        title: '',
                        message: error.response.data.message,
                        position: 'bottom-end',
                        timer: 5000,
                        progressBar: true,
                        toast: true,
                        showConfirmButton: false,
                    })
                })
        }
        
        const getReportingTimings = () => {
            axios.get(Helpers.completeUrl()+'/get/reporting-times')
                .then((res) => {
                    reportingTimings.value = res.data
                })
                .catch((error) => {
                    sweetalertMessage({
                        status: 'error',
                        title: '',
                        message: error.response.data.message,
                        position: 'bottom-end',
                        timer: 5000,
                        progressBar: true,
                        toast: true,
                        showConfirmButton: false,
                    })
                })
            // axios.get('/admin/get/reporting-times')
            //     .then((res) => {
            //         this.reportingTimings = res.data
            //     })
        }

        const updateBtn = () => {
            axios.put(Helpers.completeUrl()+pageLevelEndPoint.value, record.value)
                .then((res) => {
                    if(res.data.status == 'success'){
                        errors.value = []
                        parentToChild()
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
                        setTimeout(() => {
                            closeModal()
                        },100)
                    } else {
                        errors.value = res.data.errors
                    }
                })
                .catch((error) => {
                    sweetalertMessage({
                        status: 'error',
                        title: '',
                        message: error.response.data.message,
                        position: 'bottom-end',
                        timer: 5000,
                        progressBar: true,
                        toast: true,
                        showConfirmButton: false,
                    })
                });
        };

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

        const sweetalertAction = (data) => {
            const Toast = Swal.mixin({
                toast: data.toast,
                position: data.position,
                showConfirmButton: data.confirmBtn,
                showCancelButton: data.cancelBtn,
                confirmButtonText: data.confirmButtonText,
                timer: data.timer,
                timerProgressBar: data.progressBar,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            if(data.status == 'success' || data.status == 'error' || data.status == 'warning' || data.status == 'info' || data.status == 'question'){
                if(data.toast == true){
                    if(data.requestType == 'trash' || data.requestType == 'delete'){
                        Toast.fire({
                            icon: data.status,
                            title: data.title,
                            text: data.message
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // bulkAction.value = data.requestType,
                                // selectedItems.value.push(data.requestedId)
                                // bulkActionRequest()
                            }
                        })
                    } else {
                        Toast.fire({
                            icon: data.status,
                            title: data.title,
                            text: data.message
                        })
                    }
                } else {
                    if(data.requestType == 'trash' || data.requestType == 'delete'){
                        Swal.fire({
                            title: data.title,
                            text: data.message,
                            icon: data.icon,
                            showCloseButton: data.showCloseButton,
                            showCancelButton: data.cancelBtn,
                            confirmButtonText: data.confirmButtonText,
                            cancelButtonText: data.cancelButtonText,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // bulkAction.value = data.requestType,
                                // selectedItems.value.push(data.requestedId)
                                // bulkActionRequest()
                            }
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
            }
        }

        const closeModal = () => {
            emit('close-modal', {showModal:false})
            record.value = {}
        }

        return {
            pageLevelEndPoint,

            bulkOptions,
            record,
            errors,

            saveBtn,
            getData,
            updateBtn,
            parentToChild,
            sweetalertMessage,
            sweetalertAction,
            closeModal,

            addEditModalClose,
            showModal,
            modalName,
            modalSettings,
            getReportingTimings,
            reportingTimings,
            mainTestId,
        }
    },
})
</script>