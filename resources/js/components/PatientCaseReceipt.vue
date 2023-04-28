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

                                <div class="position-relative">

                                    <button @click="printBtn(),btnLoaderAction('print')" :disabled="caseData.dueAmount < caseData.pay" type="button" class="btn btn-warning receiptPrintBtn">
                                        <span v-if="btnLoader.active && btnLoader.activeContent == 'print'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span class="d-flex align-items-center" :class="[btnLoader.active && btnLoader.activeContent == 'print'?'visually-hidden':'']"><vue-feather class="icon" type="printer" size="16"></vue-feather> <span class="menu-title text-truncate ml-5" data-i18n="Print">Print</span></span>
                                    </button>
                                    
                                    <div id="printMe">
                                        <table width="100%" cellpadding="12" cellspacing="0" style="color:#555;font-size:12px;">
                                            <tr>
                                                <td class="p-0">
                                                    <table cellspacing="0" border="0" width="100%" cellpadding="0">
                                                        <tr>
                                                            <td>
                                                                <table cellspacing="0" border="1" width="100%" cellpadding="10">
                                                                    <tr>
                                                                        <td>
                                                                            {{Helpers.appName()}}
                                                                        </td>
                                                                        <td>
                                                                            <table cellspacing="0" border="0" width="100%">
                                                                                <tr>
                                                                                    <th style="text-align: left; font-size:20px;">{{Helpers.appName()}}</th>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th style="text-align: left; font-size:15px;">{{Helpers.appTitle()}}</th>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>{{Helpers.appAddress()}}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Telephone: {{Helpers.appPhone()}}, Mobile: {{Helpers.appMobile()}}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Email: {{Helpers.appEmail()}}, Website: {{Helpers.appUrl()}}</td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table cellspacing="0" border="1" width="100%" style="border-top:none;">
                                                                    <tr>
                                                                        <th style="text-align: left;" width="110">Patient Number</th>
                                                                        <td>
                                                                            <span v-if="patient">
                                                                                {{patient.patient_number}}
                                                                            </span>
                                                                        </td>
                                                                        <th style="text-align: left;" width="110">Case Number</th>
                                                                        <td>
                                                                            <span v-if="record">
                                                                                {{record.case_number}}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table cellspacing="0" border="1" width="100%" style="border-top:none;border-bottom:none;">
                                                                    <tr>
                                                                        <th style="text-align: left;" width="110">Date/Time</th>
                                                                        <td>{{caseData.caseMaxDate}}</td>
                                                                        <th style="text-align: left;" width="110">Lab Number</th>
                                                                        <td>0000</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th style="text-align:left;">Patient</th>
                                                                        <td>
                                                                            <span v-if="patient">
                                                                                {{patient.name}}
                                                                            </span>
                                                                        </td>
                                                                        <th style="text-align:left;">Gender</th>
                                                                        <td>
                                                                            <span v-if="patient.gender">
                                                                                {{patient.gender.title}}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th style="text-align:left;">Ref By</th>
                                                                        <td>
                                                                            <span v-if="record.reffer">
                                                                                {{record.reffer.name}}
                                                                            </span>
                                                                        </td>
                                                                        <th style="text-align:left;">Specimen</th>
                                                                        <td>
                                                                            <span v-if="record.sample_location">
                                                                                {{record.sample_location.title}}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th style="text-align:left;">Address</th>
                                                                        <td>
                                                                            <span v-if="patient">
                                                                                {{patient.address}}
                                                                            </span>
                                                                        </td>
                                                                        <th style="text-align:left;">Phone</th>
                                                                        <td>
                                                                            <span v-if="patient">
                                                                                {{patient.mobile}}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table cellspacing="0" border="1" width="100%" style="border-bottom:none;">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style="text-align: left;" width="50">S.#</th>
                                                                            <th style="text-align:left;">Tests</th>
                                                                            <th width="150" style="text-align:center;">Report Date</th>
                                                                            <th width="110" style="text-align:right;">Charges</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr v-for="(item,index) in caseTests" :key="index">
                                                                            <td>{{index+1}}</td>
                                                                            <td>
                                                                                <span v-if="item.main_test">
                                                                                    {{item.main_test.test_name}}
                                                                                </span>
                                                                            </td>
                                                                            <td style="text-align:center;">
                                                                                <span v-if="item.maintest_id">
                                                                                    {{item.report_given_date}}
                                                                                </span>
                                                                            </td>
                                                                            <td style="text-align:right;">
                                                                                    {{item.total}}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table cellspacing="0" border="1" width="100%">
                                                                    <tr>
                                                                        <td>&nbsp;</td>
                                                                        <td width="250">
                                                                            <table cellspacing="0" border="0" width="100%">
                                                                                <tr>
                                                                                    <th style="text-align:left;">Subtotal</th>
                                                                                    <td width="110" style="text-align:right;">{{caseData.subTotal}}</td>
                                                                                </tr>
                                                                                <tr v-if="record.discounted != 0">
                                                                                    <th style="text-align:left;">Discount</th>
                                                                                    <td width="110" style="text-align:right;">{{caseData.discountedAmount}}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th style="text-align:left;">Net Total</th>
                                                                                    <td width="110" style="text-align:right;">{{caseData.netTotal}}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th style="text-align:left;">Paid</th>
                                                                                    <td width="110" style="text-align:right;">{{caseData.paid}}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th style="text-align:left;">Due Amount</th>
                                                                                    <td width="110" style="text-align:right;">{{caseData.dueAmount}}</td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

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

        const printBtn = () => {
            // Get the printable content
            var printableContent = $("#printMe").html();
            if (printableContent.length) {
                // Open the print dialog
                var printWindow : any = window.open();
                printWindow.document.write(printableContent);
                printWindow.print();
                printWindow.close();
            }
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
                    patient.value = res.data.patient
                    caseTests.value = res.data.caseTestsReceipt
                    record.value = res.data.itemData
                    caseData.value = {
                        caseMaxDate:res.data.caseMaxDate,
                        discountType:res.data.discountType,
                        subTotal:res.data.subTotal,
                        discount:res.data.discount,
                        discountedAmount:res.data.discountedAmount,
                        netTotal:res.data.netTotal,
                        paid:res.data.paid,
                        dueAmount:res.data.dueAmount
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
            printBtn,
        }
    }
});
</script>