<template>
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper container-xxl p-0">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-3">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-start mb-12">Case</h2>
                            <div class="d-flex align-items-center">
                                <!-- <router-link :to="'/admin/cases'" class="btn btn-sm btn-primary ml-10 mb-12" v-if="Helpers.hasPermission('case_management','can_view')">
                                    View Cases
                                </router-link> -->
                                <button type="button" class="btn btn-sm btn-primary ml-10 mb-12" @click="addTestModalBtn('add','')" v-if="Helpers.hasPermission('case_management','can_add')">
                                    Add Test
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-header-right text-md-end col-md-3 col-12 d-md-block d-none">
                    <div class="mb-1 breadcrumb-right">
                    </div>
                </div>
            </div>
            <div class="content-body" ref="loadingRefContainer">
                <section class="app-user-list">

                    <PatientDetails></PatientDetails>
                    
                    <div class="card">
                        <div class="card-body">
                            
                            <!-- Loading -->
                            <GlobalLoader :loaderProps="loaderSettings"></GlobalLoader>


                            <div v-if="Helpers.hasPermission('case_management','can_view')">
                                
                                <div class="row">
                                    <div class="col-sm-5 mb-10">
                                        <label for="reffer_id" class="form-label">Reffers</label>
                                        <v-select
                                            id="reffer_id"
                                            class="dropdown"
                                            :class="[errors.reffer_id != null?'is-invalid':'']"
                                            v-model="record.reffer_id"
                                            placeholder="--Select--"
                                            :clearable="true"
                                            :reduce="(option) => option.id"
                                            :options="reffers"
                                            label="name"
                                        >
                                            <template v-slot:option="option">
                                                <div class="list-item">
                                                    {{ option.name }}
                                                </div>
                                            </template>
                                        </v-select>
                                        <small class="text-size-11 d-block text-danger">
                                            <span v-if="errors.reffer_id != null">{{errors.reffer_id[0]}}</span>
                                        </small>
                                    </div>
                                    <div class="col-sm-5 mb-10">
                                        <label for="samplelocation_id" class="form-label">Sample Locations</label>
                                        <v-select
                                            id="samplelocation_id"
                                            class="dropdown"
                                            :class="[errors.samplelocation_id != null?'is-invalid':'']"
                                            v-model="record.samplelocation_id"
                                            placeholder="--Select--"
                                            :clearable="true"
                                            :reduce="(option) => option.id"
                                            :options="sampleLocations"
                                            label="title"
                                        >
                                            <template v-slot:option="option">
                                                <div class="list-item">
                                                    {{ option.title }}
                                                </div>
                                            </template>
                                        </v-select>
                                        <small class="text-size-11 d-block text-danger">
                                            <span v-if="errors.samplelocation_id != null">{{errors.samplelocation_id[0]}}</span>
                                        </small>
                                    </div>
                                    <div class="col-sm-2">
                                        <button @click="updateBtn(),btnLoaderAction('save')" type="button" class="btn btn-primary me-1 mt-22">
                                            <span v-if="btnLoader.active && btnLoader.activeContent == 'save'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            <span :class="[btnLoader.active && btnLoader.activeContent == 'save'?'visually-hidden':'']">Save</span>
                                        </button>
                                    </div>
                                </div>

                                <div class="table-responsive pt-0 min-h-300">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Main Test Code</th>
                                                <th>Main Test Name</th>
                                                <th>Sub Test Code</th>
                                                <th>Sub Test Name</th>
                                                <th>Sub Test Rate</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="patientTests.length > 0">
                                            <tr v-for="(item,index) in patientTests" :key="index">
                                                <td>
                                                    <span>{{item.main_test_code}}</span>
                                                </td>
                                                <td>
                                                    <span>{{item.main_test_name}}</span>
                                                </td>
                                                <td>
                                                    <span>{{item.sub_test_code}}</span>
                                                </td>
                                                <td>
                                                    <span>{{item.sub_test_name}}</span>
                                                </td>
                                                <td>
                                                    <span>{{item.sub_test_rate}}</span>
                                                </td>
                                                <td class="text-center">
                                                    <button @click="removeBtn(index),btnLoaderAction('remove'+index)" type="button" class="btn btn-danger btn-sm">
                                                        <span v-if="btnLoader.active && btnLoader.activeContent == 'remove'+index" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        <span :class="[btnLoader.active && btnLoader.activeContent == 'remove'+index?'visually-hidden':'']">
                                                            <vue-feather class="icon" type="trash-2" size="16"></vue-feather>
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div v-else>
                                <PermissionError></PermissionError>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <Teleport to="body">
            <AddTestModal 
                :recordObj="{
                    actionMode:actionMode,
                    showModal:showModal,
                    modalName:modalName,
                }" 
                @refresh-parent-data="loadParentData"
                @close-modal="closeModal"
            ></AddTestModal>
        </Teleport>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import Status from "@/components/global/Status.vue";
import PermissionError from "@/components/global/PermissionError.vue";
import GlobalLoader from "@/components/global/Loader.vue";
import Swal from 'sweetalert2'
import $ from "jquery"
import Helpers from "./helpers/helpers";
import AddTestModal from "@/components/modals/AddTestModal.vue";
import PatientDetails from "@/components/PatientDetails.vue";

export default defineComponent({
    name: "patient-case-edit",
    components: {
        Status,
        PermissionError,
        GlobalLoader,
        AddTestModal,
        PatientDetails,
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        }
    },
    created(){
        // this.getItems()
        this.loadData()
    },
    methods:{},
    setup(){
        const route = useRoute();
        const router = useRouter();
        const pageLevelEndPoint = ref('/cases')
        
        const loaderSettings = ref({
            active: false,
            isLoadingFullPage: false,
        });
        
        const errors : any = ref([]);
        const sampleLocations : any = ref([]);
        const reffers : any = ref([]);
        
        const actionMode = ref('')
        const showModal = ref(false)
        const modalName = ref('')
        const patientTests : any = ref([])

        const record : any = ref({})

        const btnLoader = ref({
            active: false,
            hideContent: true,
            activeContent: ''
        })

        const btnLoaderAction = (data:any) => {
            btnLoader.value.activeContent = data
        }

        const loadData = () => {
            loaderSettings.value.active = true;
            getSampleLocations()
            getReffers()
            patientCheck()
        }

        const removeBtn = (index:any) => {
            btnLoader.value.active = true;
            setTimeout(() => {
                patientTests.value.splice(index, 1);
                btnLoader.value.active = false;
            }, 1000);
        }

        const updateBtn = () => {
            // console.log('patientTests.value=',patientTests.value)
            record.value.tests = patientTests.value
            record.value.patient_id = route.params.patientId
            // console.log('record.value=',record.value)
            axios.put(Helpers.completeUrl()+pageLevelEndPoint.value+'', record.value)
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
        
		const getSampleLocations = () => {
			axios.get('/admin/get/sample-locations')
			.then((res) => {
				sampleLocations.value = res.data
            })
        }

        const getReffers = () => {
            axios.get(Helpers.completeUrl()+'/get/reffers')
            .then((res) => {
                reffers.value = res.data
            })
        }

        const patientCheck = () => {
            axios.post(Helpers.completeUrl()+'/patients/check',{
                patient_id: route.params.patientId
            })
            .then((res) => {
                if(res.data.exist == false){
                    window.location.href = Helpers.appUrl()+''+Helpers.appEndPoint()+'/cases'
                } else {
                    getData()
                }
                // loaderSettings.value.active = false;
            })
        }

        const getData = () => {
            errors.value = []
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/edit',{
                patient_id: route.params.patientId,
                case_id: route.params.caseId,
                actionMode: 'edit'
            })
                .then((res) => {
                    record.value = res.data.itemData
                    var details = res.data.caseTests
                    if(details.length > 0){
                        details.forEach((element:any) => {
                            patientTests.value.push({
                                maintest_id: element.main_test?element.main_test.id:'',
                                main_test_code: element.main_test?element.main_test.test_code:'',
                                main_test_name: element.main_test?element.main_test.test_name:'',
                                // main_test_rate: element.main_test?element.main_test.test_rate:'',
                                main_test_order_by: element.main_test?element.main_test.order_by:'',
                                subtest_id: element.sub_test?element.sub_test.id:'',
                                sub_test_code: element.sub_test?element.sub_test.test_code:'',
                                sub_test_name: element.sub_test?element.sub_test.test_name:'',
                                sub_test_rate: element.sub_test?element.sub_test.test_rate:'',
                                reporting_time: element.sub_test?element.sub_test.reporting_time:'',
                            })
                        });
                    }
                    loaderSettings.value.active = false;
                })
                .catch((error) => {
                    console.log(error)
                    loaderSettings.value.active = false;
                })
        }

        const addTestModalBtn = (mode,itemId) => {
            actionMode.value = mode
            showModal.value = true
            modalName.value = 'AddTestModal'
            $("body").css({"overflow":"hidden","padding-right":"17px"});
        }

        const loadParentData = (data:any) => {
            if(data.refresh){
                console.log('loadParentData=',JSON.stringify(data))
                // getItems(1)
                // if(data['data'].length > 0){
                //     data['data'].forEach((element:any) => {
                //         patientTests.value.push(element)
                //     });
                // }
                
                if(data['data'].length > 0){
                    data['data'].forEach((e:any) => {
                        patientTests.value.push(e)
                    });
                }

                // getTests(patientTests.value)
            }
        }

        // const getTests = (data:any) => {
        //     errors.value = []
        //     axios.post(Helpers.completeUrl()+'/get/selected-tests',{
        //         tests: data
        //     })
        //         .then((res) => {
        //             // patientTests.value = res.data.tests
        //             // console.log('res.data=',res.data)
        //             var details = res.data.tests
        //             if(details.length > 0){
        //                 details.forEach((element:any) => {
        //                     patientTests.value.push({
        //                         main_test_code: element.main_test?element.main_test.test_code:'',
        //                         main_test_name: element.main_test?element.main_test.test_name:'',
        //                         sub_test_code: element?element.test_code:'',
        //                         sub_test_name: element?element.test_name:'',
        //                         sub_test_rate: element?element.test_rate:'',
        //                     })
        //                 });
        //             }
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //         })
        // }

        const closeModal = (data) => {
            $("body").css({"overflow":"visible","padding-right":"0"});
            if(data.showModal == false){
                showModal.value = data.showModal
            }
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
            pageLevelEndPoint,
            loaderSettings,

            errors,
            loadData,
            getSampleLocations,
            sampleLocations,

            sweetalertMessage,
            Helpers,
            record,

            addTestModalBtn,
            actionMode,
            showModal,
            modalName,

            loadParentData,
            closeModal,
            getReffers,
            reffers,
            patientTests,

            btnLoader,
            btnLoaderAction,
            updateBtn,
            removeBtn,
        }
    }
});
</script>