<template>
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper container-xxl p-0">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-3">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-start mb-12">Case Receipt</h2>
                            <div class="d-flex align-items-center">
                                <router-link :to="'/admin/cases'" class="btn btn-sm btn-primary ml-10 mb-12" v-if="Helpers.hasPermission('case_management','can_view')">
                                    View Cases
                                </router-link>
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
                                    <div class="col-sm-2 mb-10">
                                        <label for="">Sub Total</label>
                                        <input v-model="caseData.subTotal" type="number" class="form-control" disabled>
                                    </div>
                                    <div class="col-sm-2 mb-10">
                                        <label for="">Discount</label>
                                        <div class="input-group">
                                            <select :disabled="caseData.paid > 0" @change="getCalculateByCaseId()" v-model="caseData.discountType" class="form-select" style="appearance: none !important; background-image:none; padding-left:8px; padding-right:8px; width:22%; text-align:center;">
                                                <option value="%">%</option>
                                                <option value="rs">Rs</option>
                                            </select>
                                            <input :disabled="caseData.paid > 0" @input="getCalculateByCaseId()" v-if="caseData.discountType == 'rs'" v-model="caseData.discount" type="number" class="form-control" style="width:78%;">
                                            <select :disabled="caseData.paid > 0" @change="getCalculateByCaseId()" v-if="caseData.discountType == '%'" v-model="caseData.discount" class="form-select" style="width:78%;">
                                                <option value="0">0%</option>
                                                <option :value="i+'.00'" v-for="(i,index) in 100" :key="index">{{i}}%</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-2 mb-10">
                                        <label for="">Net Total</label>
                                        <input v-model="caseData.netTotal" type="number" class="form-control" disabled>
                                    </div>
                                    <div class="col-sm-2 mb-10">
                                        <label for="">Paid Amount</label>
                                        <input @input="getCalculateByCaseId()" v-model="caseData.paid" type="number" class="form-control" disabled>
                                    </div>
                                    <div class="col-sm-2 mb-10">
                                        <label for="">Due Amount</label>
                                        <input v-model="caseData.dueAmount" type="number" class="form-control" disabled>
                                    </div>
                                    <div class="col-sm-2 mb-10">
                                        <label for="">Pay</label>
                                        <input v-model="caseData.pay" type="number" class="form-control">
                                        <small class="text-size-11 d-block text-danger">
                                            <span v-if="errors.pay != null">{{errors.pay[0]}}</span>
                                        </small>
                                    </div>
                                </div>

                                <button @click="saveBtn(),btnLoaderAction('save')" :disabled="caseData.dueAmount < caseData.pay" type="button" class="btn btn-primary me-1">
                                    <span v-if="btnLoader.active && btnLoader.activeContent == 'save'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span :class="[btnLoader.active && btnLoader.activeContent == 'save'?'visually-hidden':'']">Save</span>
                                </button>

                                <table class="table table-bordered mt-10">
                                    <thead>
                                        <tr>
                                            <th>Paid</th>
                                            <th>Date</th>
                                            <th>Received By</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,index) in paymentHistory" :key="index">
                                            <td>{{ item.paid }}</td>
                                            <td>{{ item.created_date }}</td>
                                            <td>
                                                <ProfileAvatarAndName :user="item.created_by"></ProfileAvatarAndName>
                                            </td>
                                            <td class="text-center">
                                                <button @click="removeBtn(item.id),btnLoaderAction('remove'+item.id)" type="button" class="btn btn-danger btn-sm">
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
                            <div v-else>
                                <PermissionError></PermissionError>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <!-- <Teleport to="body">
            <AddTestModal 
                :recordObj="{
                    actionMode:actionMode,
                    showModal:showModal,
                    modalName:modalName,
                }" 
                @refresh-parent-data="loadParentData"
                @close-modal="closeModal"
            ></AddTestModal>
        </Teleport> -->

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import Status from "@/components/global/Status.vue";
import PermissionError from "@/components/global/PermissionError.vue";
import GlobalLoader from "@/components/global/Loader.vue";
import ProfileAvatarAndName from "@/components/global/ProfileAvatarAndName.vue";
import Swal from 'sweetalert2'
import $ from "jquery"
import Helpers from "./helpers/helpers";
// import AddTestModal from "@/components/modals/AddTestModal.vue";
import PatientDetails from "@/components/PatientDetails.vue";

export default defineComponent({
    name: "patient-case-receipt",
    components: {
        Status,
        PermissionError,
        GlobalLoader,
        ProfileAvatarAndName,
        // AddTestModal,
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
        const patient : any = ref({})
        const caseTests : any = ref([])
        const caseData : any = ref({})
        const paymentHistory : any = ref([])

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

        const removeBtn = (paymentId:any) => {
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                timer: 0,
                timerProgressBar: false,
                showConfirmButton: true,
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: 'Do you want to trash it!!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // btnLoader.value.active = true;
                    axios.delete(Helpers.completeUrl()+pageLevelEndPoint.value+'/payment/'+paymentId)
                        .then((res) => {
                            getData()
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
                                // errors.value = res.data.errors
                            }
                        })
                        .catch((error) => {
                            getData()
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
            })
        }

        const saveBtn = () => {
            btnLoader.value.active = true;
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/payment',caseData.value)
                .then((res) => {
                    btnLoader.value.active = false;
                    getData()
                    // if(res.data.status == 'success'){
                        
                    // } else {
                    //     alert('else error')
                    // }
                })
                .catch((error) => {
                    btnLoader.value.active = false;
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
        
        const getCalculateByCaseId = () => {
            var subTotal = caseData.value.subTotal
            var discountType = caseData.value.discountType
            var discount = caseData.value.discount
            var discounted = caseData.value.discounted
            var netTotal = caseData.value.netTotal
            var paid = caseData.value.paid?caseData.value.paid:0
            var pay = caseData.value.pay?caseData.value.pay:0
            var dueAmount = caseData.value.dueAmount

            var sumPaidPay : any = parseInt(paid) //+ parseInt(pay)

            if(discountType == '%'){
                netTotal = subTotal - subTotal/100*discount;
            }
            if(discountType == 'rs'){
                netTotal = subTotal - discount;
            }

            dueAmount = parseInt(netTotal) - parseInt(sumPaidPay)

            caseData.value.netTotal = parseFloat(netTotal).toFixed(2)
            caseData.value.dueAmount = parseFloat(dueAmount).toFixed(2)
            caseData.value.pay = parseFloat(pay).toFixed(2)
        }

        const getData = () => {
            loaderSettings.value.active = true;
            errors.value = []
            axios.post(Helpers.completeUrl()+pageLevelEndPoint.value+'/edit',{
                patient_id: route.params.patientId,
                case_id: route.params.caseId,
                actionMode: 'edit'
            })
                .then((res) => {
                    loaderSettings.value.active = false;
                    patient.value = res.data.patient
                    caseTests.value = res.data.caseTests
                    record.value = res.data.itemData
                    paymentHistory.value = res.data.paymentHistory
                    caseData.value = {
                        caseMaxDate:res.data.caseMaxDate,
                        discountType:res.data.discountType,
                        subTotal:res.data.subTotal,
                        discount:res.data.discount,
                        netTotal:res.data.netTotal,
                        paid:res.data.paid,
                        paidHistory:res.data.paidHistory,
                        dueAmount:res.data.dueAmount,
                        patientcase_id:res.data.itemData.id
                    }
                    var details = res.data.itemData.patient_case_details
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
            caseData,

            btnLoader,
            btnLoaderAction,
            updateBtn,
            removeBtn,
            patient,
            caseTests,
            getCalculateByCaseId,
            saveBtn,
            paymentHistory,
        }
    }
});
</script>