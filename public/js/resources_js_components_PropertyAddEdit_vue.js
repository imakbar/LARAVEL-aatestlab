(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_PropertyAddEdit_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PropertyAddEdit.vue?vue&type=script&lang=ts":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PropertyAddEdit.vue?vue&type=script&lang=ts ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.mjs");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm-bundler.js");
/* harmony import */ var _store_enums_StoreEnums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/enums/StoreEnums */ "./resources/js/store/enums/StoreEnums.ts");
/* harmony import */ var _components_global_Status_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/global/Status.vue */ "./resources/js/components/global/Status.vue");
/* harmony import */ var _components_global_ProfileAvatarAndName_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/global/ProfileAvatarAndName.vue */ "./resources/js/components/global/ProfileAvatarAndName.vue");
/* harmony import */ var _components_global_AgencyAgentsAvatars_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/global/AgencyAgentsAvatars.vue */ "./resources/js/components/global/AgencyAgentsAvatars.vue");
/* harmony import */ var _components_global_PermissionError_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/global/PermissionError.vue */ "./resources/js/components/global/PermissionError.vue");
/* harmony import */ var _components_global_Loader_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/global/Loader.vue */ "./resources/js/components/global/Loader.vue");
/* harmony import */ var _components_modals_FileManagerModal_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/modals/FileManagerModal.vue */ "./resources/js/components/modals/FileManagerModal.vue");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./helpers/helpers */ "./resources/js/components/helpers/helpers.ts");




 // import AgenciesModal from "@/components/modals/AgenciesModal.vue";









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: "property-add-edit",
  components: {
    Status: _components_global_Status_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    ProfileAvatarAndName: _components_global_ProfileAvatarAndName_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    AgencyAgentsAvatars: _components_global_AgencyAgentsAvatars_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    PermissionError: _components_global_PermissionError_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
    // AgenciesModal,
    GlobalLoader: _components_global_Loader_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
    FileManagerModal: _components_modals_FileManagerModal_vue__WEBPACK_IMPORTED_MODULE_8__["default"]
  },
  computed: {
    dragOptions: function dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  created: function created() {
    this.getItems();
    this.getItem();
  },
  setup: function setup() {
    var store = (0,vuex__WEBPACK_IMPORTED_MODULE_11__.useStore)();
    var route = (0,vue_router__WEBPACK_IMPORTED_MODULE_12__.useRoute)();
    var router = (0,vue_router__WEBPACK_IMPORTED_MODULE_12__.useRouter)();
    var appEndPoint = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("/admin");
    var apiEndPoint = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("/api");
    var pageLevelEndPoint = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('/property');
    var loaderSettings = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      active: false,
      isLoadingFullPage: false
    });
    var showModal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var modalName = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(''); // const selectedItems : any = ref([])
    // const allSelected = ref(false)

    var agent_id = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(route.params.agentId);
    var property_id = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(route.params.propertyId); // const activeStatus = ref(route.params.status?route.params.status:'all');
    // const statusesCount = ref([])
    // const totalItems = ref(0)
    // const agents : any = ref([]);
    // const recordId = ref('');

    var actionMode = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(route.params.agentId && route.params.propertyId ? 'edit' : 'add');
    var record = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      title: '',
      amenities: [],
      facilities: [],
      valuations: [],
      gallery: []
    });
    var errors = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]); // const bulkAction : any = ref(null)

    var bulkOptions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var currencies = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var propertyTypes = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var propertyPurposes = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var propertyPurposeTimePeriods = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var propertyStatuses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var amenities = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var facilities = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var facilityDistances = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var valuations = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var facility = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var valuation = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({}); // const perPageAction : any = ref(25)
    // const perPageOptions = ref([])
    // const tableColumns : any = ref([])
    // const orderByAction = ref({})
    // const showModal = ref(false)
    // const modalName = ref('')

    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {// window.addEventListener('mousemovenow', (event) => {
      //     if (event['detail'].value) {}
      // })
    }); // const onCancelLoader =() => {
    //   console.log('User cancelled the loader.')
    // };
    // const checkData = (recordFacilities:any,facilities:any) => {
    //     Helpers.CheckData(recordFacilities,facilities)
    // }

    var addFacilityBtn = function addFacilityBtn() {
      if (facility.value == '' || Object.keys(facility.value).length === 0) {
        return;
      }

      record.value.facilities.push({
        facility: facility.value,
        distance: '',
        facilitydistance_id: '',
        facility_id: facility.value.id,
        name: facility.value.name,
        slug: facility.value.slug
      }); // facilities.value.forEach((item:any,index:any) => {
      //     var obj = _.find(record.value.facilities, {id:item['id']});
      //     if(_.isObject(obj)){
      //         facilities.value.splice(index, 1);
      //     }
      // });

      facilitiesDifference();
      facility.value = '';
    };

    var facilitiesDifference = function facilitiesDifference() {
      var objData = _helpers_helpers__WEBPACK_IMPORTED_MODULE_10__["default"].differenceWith(facilities.value, record.value.facilities, 'id', 'facility_id'); // console.log('objData=',objData)

      facilities.value = objData;
    };

    var removeFacilityBtn = function removeFacilityBtn(index, facility) {
      facilities.value.push(facility);
      record.value.facilities.splice(index, 1);
    };

    var addValuationBtn = function addValuationBtn() {
      console.log('valuation.value=', valuation.value);

      if (valuation.value == '' || Object.keys(valuation.value).length === 0) {
        return;
      }

      record.value.valuations.push({
        valuation: valuation.value,
        value: '',
        valuation_id: valuation.value.id,
        name: valuation.value.name,
        slug: valuation.value.slug
      }); // valuations.value.forEach((item:any,index:any) => {
      //     var obj = _.find(record.value.valuations, {id:item['id']});
      //     if(_.isObject(obj)){
      //         valuations.value.splice(index, 1);
      //     }
      // });
      // valuations.value = Helpers.differenceWith(valuations.value,record.value.valuations)

      valuationsDifference();
      valuation.value = '';
    };

    var valuationsDifference = function valuationsDifference() {
      var objData = _helpers_helpers__WEBPACK_IMPORTED_MODULE_10__["default"].differenceWith(valuations.value, record.value.valuations, 'id', 'valuation_id'); // console.log('objData=',objData)

      valuations.value = objData;
    };

    var removeValuationBtn = function removeValuationBtn(index, valuation) {
      valuations.value.push(valuation);
      record.value.valuations.splice(index, 1);
    };

    var getItems = function getItems() {
      loaderSettings.value.active = true;
      axios__WEBPACK_IMPORTED_MODULE_1___default().post(_helpers_helpers__WEBPACK_IMPORTED_MODULE_10__["default"].completeUrl() + pageLevelEndPoint.value + '/get', {// agent_id: agent_id.value,
        // perPageAction: perPageAction.value,
        // orderByAction: orderByAction.value,
      }).then(function (res) {
        // agents.value = res.data.items
        // // totalItems.value = res.data.totalItems
        // statusesCount.value = res.data.statusesCount
        bulkOptions.value = res.data.bulkOptions;
        currencies.value = res.data.currencies;
        propertyTypes.value = res.data.propertyTypes;
        propertyPurposes.value = res.data.propertyPurposes;
        propertyPurposeTimePeriods.value = res.data.propertyPurposeTimePeriods;
        propertyStatuses.value = res.data.propertyStatuses;
        amenities.value = res.data.amenities;
        facilities.value = res.data.facilities;
        facilityDistances.value = res.data.facilityDistances;
        valuations.value = res.data.valuations; // perPageAction.value = res.data.items.per_page
        // perPageOptions.value = res.data.perPageOptions
        // allSelected.value = false
        // selectedItems.value = []
        // tableColumns.value = res.data.tableColumns
        // bulkAction.value = null

        setTimeout(function () {
          loaderSettings.value.active = false;
        }, 500); // checkData(record.value.facilities,facilities.value)
      });
    };

    var getItem = function getItem() {
      if (agent_id.value && property_id.value) {
        loaderSettings.value.active = true;
        axios__WEBPACK_IMPORTED_MODULE_1___default().post(_helpers_helpers__WEBPACK_IMPORTED_MODULE_10__["default"].completeUrl() + pageLevelEndPoint.value + '/edit', {
          agent_id: agent_id.value,
          property_id: property_id.value // actionMode: actionMode.value

        }).then(function (res) {
          // console.log('res.data.itemData=',res.data.itemData)
          // console.log('pluck=',Helpers.pluck('amenity_id',res.data.itemData.valuations))
          record.value = res.data.itemData;
          record.value.amenities = _helpers_helpers__WEBPACK_IMPORTED_MODULE_10__["default"].pluck('amenity_id', res.data.itemData.amenities);
          record.value.valuations = _helpers_helpers__WEBPACK_IMPORTED_MODULE_10__["default"].pluck('amenity_id', res.data.itemData.valuations);
          record.value.facilities = res.data.facilities;
          record.value.valuations = res.data.valuations;
          record.value.gallery = res.data.gallery;
          facilitiesDifference();
          valuationsDifference();
          propertyPurposeDropdown();
          setTimeout(function () {
            loaderSettings.value.active = false;
          }, 500);
        });
      }
    };

    var addEditModalBtn = function addEditModalBtn(mode, itemId) {
      actionMode.value = mode; // recordId.value = itemId

      showModal.value = true;
      modalName.value = 'FileManagerModal';
      $("body").css({
        "overflow": "hidden",
        "padding-right": "17px"
      });
    };

    var selectMediaBtn = function selectMediaBtn() {
      // console.log('SET_SELECT_MEDIA_ACTION before',store.state.SelectMediaModule.select_media_data)
      store.dispatch(_store_enums_StoreEnums__WEBPACK_IMPORTED_MODULE_2__.Actions.SET_SELECT_MEDIA_ACTION, {
        fileName: 'image',
        fileMimes: 'jpeg,jpg,png,pdf,svg,gif,zip',
        fileSelection: 'multiple',
        fileMax: 10,
        fileSize: 100000,
        thumbnailSizes: _helpers_helpers__WEBPACK_IMPORTED_MODULE_10__["default"].defaultThumbnailSizes()['property'] // thumbnailSizes: [
        //     {
        //         name: 'thumbnail',
        //         size: {
        //             width: 150,
        //             height: 150,
        //         }
        //     },
        //     {
        //         name: 'property',
        //         size: {
        //             width: 800,
        //             height: 550,
        //         }
        //     },
        //     {
        //         name: 'featured',
        //         size: {
        //             width: 400,
        //             height: 280,
        //         }
        //     }
        // ]

      });
      window.dispatchEvent(new CustomEvent('fileManagerModalListener', {
        detail: {
          value: true
        }
      })); // console.log('SET_SELECT_MEDIA_ACTION after',JSON.stringify(store.state.SelectMediaModule.select_media_data))
    };

    var closeModal = function closeModal(data) {
      $("body").css({
        "overflow": "visible",
        "padding-right": "0"
      });

      if (data.showModal == false) {
        showModal.value = data.showModal;
      }
    };

    var selectedMediaFiles = function selectedMediaFiles(data) {
      // profile.value.avatar = res.data.profile.avatar
      data.files.forEach(function (item) {
        record.value.gallery.push({
          media: item,
          "new": "yes"
        });
      }); // record.value.gallery = data.files

      record.value.media_meta = data.mediaMeta;

      if (agent_id.value && property_id.value) {
        updateGalleryBtn();
        getItem();
      } //console.log('selectedMediaFiles=',data)

    }; // const editBtn = (itemId) => {
    //     recordId.value = itemId
    // }
    // const selectAllItems = () => {
    //     if (allSelected.value) {
    //         const items :any = agents.value.data
    //         const selectedData = items.map((u) => u.id);
    //         selectedItems.value = selectedData;
    //     } else {
    //         selectedItems.value = [];
    //     }
    // }
    // const selectItem = () => {
    //     checkSelectedItemsLength()
    // }
    // const checkSelectedItemsLength = () => {
    //     if (selectedItems.value.length == agents.value.data.length) {
    //         allSelected.value = true;
    //     } else {
    //         allSelected.value = false;
    //     }
    // }
    // const bulkActionBtn = () => {
    //     if(bulkAction.value == 'trash' || bulkAction.value == 'delete'){
    //         var message = ''
    //         if(activeStatus.value=='trash'){
    //             message = 'Do you want to delete it permanently!!'
    //         } else {
    //             message = 'Do you want to trash it!!'
    //         }
    //         sweetalertAction({
    //             requestedId: '',
    //             status: 'warning',
    //             title: 'Are you sure?',
    //             message: message,
    //             position: 'bottom-end',
    //             confirmationBtn: true,
    //             confirmButtonText: 'Yes',
    //             cancelBtn: true,
    //             timer: 0,
    //             progressBar: false,
    //             toast: true,
    //             requestType: activeStatus.value=='trash'?'delete':'trash'
    //         })
    //     } else {
    //         bulkActionRequest()
    //     }
    // }
    // const bulkActionRequest = () => {
    //     if(bulkAction.value){
    //         loaderSettings.value.active = true;
    //         axios.put(process.env.MIX_APP_URL+`${apiEndPoint.value}`+`${appEndPoint.value}`+pageLevelEndPoint.value+'/bulk-action', {
    //             bulkAction: bulkAction.value,
    //             selectedItems: selectedItems.value,
    //         }).then(res => {
    //             getItems()
    //             selectedItems.value = []
    //             checkSelectedItemsLength()
    //             sweetalertMessage({
    //                 status: res.data.status,
    //                 title: '',
    //                 message: res.data.message,
    //                 position: 'bottom-end',
    //                 timer: 5000,
    //                 progressBar: true,
    //                 toast: true,
    //                 showConfirmButton: false,
    //             })
    //             setTimeout(() => {
    //                 loaderSettings.value.active = false;
    //             },500)
    //         })
    //     }
    // }
    // const bulkActionBtnBack = () => {
    //     selectedItems.value = []
    //     allSelected.value = false
    //     bulkAction.value = null
    // }
    // const perPageActionBtn = (val) => {
    //     perPageAction.value = val.label
    //     getItems(1)
    // }
    // const clearSortInTableColumns = (val) => {
    //     if(orderByAction.value['field'] != val){
    //         for (const key in tableColumns.value) {
    //             var obj : any = tableColumns.value[key];
    //             obj['sort'] = ''
    //         }
    //     }
    // }
    // const orderByBtn = (val) => {
    //     clearSortInTableColumns(val)
    //     for (const key in tableColumns.value) {
    //         var obj : any = tableColumns.value[key];
    //         if(obj['field'] == val){
    //             if(obj['sort'] == 'asc'){
    //                 obj['sort'] = 'desc'
    //             } else {
    //                 obj['sort'] = 'asc'
    //             }
    //             orderByAction.value = obj
    //             console.log('obj',JSON.stringify(obj))
    //         }
    //     }
    //     getItems(1)
    // if(orderByAction.value.field != val){
    //         orderByAction.value.orderBy = 'asc'
    // } else {
    //     if(orderByAction.value.orderBy == 'asc'){
    //         orderByAction.value.orderBy = 'desc'
    //     }else{
    //         orderByAction.value.orderBy = 'asc'
    //     }
    // }
    // orderByAction.value.field = val
    // }


    var saveBtn = function saveBtn() {
      btnLoader.value.active = true;
      record.value.agent_id = agent_id.value;
      record.value.property_id = property_id.value;
      axios__WEBPACK_IMPORTED_MODULE_1___default().post(_helpers_helpers__WEBPACK_IMPORTED_MODULE_10__["default"].completeUrl() + pageLevelEndPoint.value + '/save', record.value).then(function (res) {
        btnLoader.value.active = false;

        if (res.data.status == 'success') {
          errors.value = []; // parentToChild()

          sweetalertMessage({
            status: res.data.status,
            title: '',
            message: res.data.message,
            position: 'bottom-end',
            timer: 5000,
            progressBar: true,
            toast: true,
            showConfirmButton: false
          });
          router.push({
            path: appEndPoint.value + '/properties/' + agent_id.value
          }); // setTimeout(() => {
          // closeModal()
          // },1000)
        } else {
          errors.value = res.data.errors;
          sweetalertMessage({
            status: res.data.status,
            title: '',
            message: res.data.message,
            position: 'bottom-end',
            timer: 5000,
            progressBar: true,
            toast: true,
            showConfirmButton: false
          });
        }
      })["catch"](function (error) {
        console.log(error);
        btnLoader.value.active = false;
      });
    };

    var updateBtn = function updateBtn() {
      btnLoader.value.active = true; // record.value.agent_id = agent_id.value
      // record.value.property_id = property_id.value

      axios__WEBPACK_IMPORTED_MODULE_1___default().put(_helpers_helpers__WEBPACK_IMPORTED_MODULE_10__["default"].completeUrl() + pageLevelEndPoint.value, record.value).then(function (res) {
        btnLoader.value.active = false;

        if (res.data.status == 'success') {
          errors.value = []; // parentToChild()

          sweetalertMessage({
            status: res.data.status,
            title: '',
            message: res.data.message,
            position: 'bottom-end',
            timer: 5000,
            progressBar: true,
            toast: true,
            showConfirmButton: false
          }); // setTimeout(() => {
          // closeModal()
          // },1000)
        } else {
          errors.value = res.data.errors;
          sweetalertMessage({
            status: res.data.status,
            title: '',
            message: res.data.message,
            position: 'bottom-end',
            timer: 5000,
            progressBar: true,
            toast: true,
            showConfirmButton: false
          });
        }
      })["catch"](function (error) {
        sweetalertMessage({
          status: 'error',
          title: '',
          message: error.response.data.message,
          position: 'bottom-end',
          timer: 5000,
          progressBar: true,
          toast: true,
          showConfirmButton: false
        });
        setTimeout(function () {
          // loaderSettings.value.active = false;
          btnLoader.value.active = false;
        }, 500);
      });
    };

    var updateGalleryBtn = function updateGalleryBtn() {
      btnLoader.value.active = true; // record.value.agent_id = agent_id.value
      // record.value.property_id = property_id.value

      axios__WEBPACK_IMPORTED_MODULE_1___default().put(_helpers_helpers__WEBPACK_IMPORTED_MODULE_10__["default"].completeUrl() + pageLevelEndPoint.value + '/gallery', record.value).then(function (res) {
        btnLoader.value.active = false;

        if (res.data.status == 'success') {
          errors.value = []; // parentToChild()

          sweetalertMessage({
            status: res.data.status,
            title: '',
            message: res.data.message,
            position: 'bottom-end',
            timer: 5000,
            progressBar: true,
            toast: true,
            showConfirmButton: false
          }); // setTimeout(() => {
          // closeModal()
          // },1000)
        } else {
          errors.value = res.data.errors;
          sweetalertMessage({
            status: res.data.status,
            title: '',
            message: res.data.message,
            position: 'bottom-end',
            timer: 5000,
            progressBar: true,
            toast: true,
            showConfirmButton: false
          });
        }
      })["catch"](function (error) {
        sweetalertMessage({
          status: 'error',
          title: '',
          message: error.response.data.message,
          position: 'bottom-end',
          timer: 5000,
          progressBar: true,
          toast: true,
          showConfirmButton: false
        });
        setTimeout(function () {
          // loaderSettings.value.active = false;
          btnLoader.value.active = false;
        }, 500);
      });
    };

    var moveBtn = function moveBtn() {
      record.value.gallery.map(function (item, index) {
        item.order_by = index + 1;
      });
      axios__WEBPACK_IMPORTED_MODULE_1___default().put(_helpers_helpers__WEBPACK_IMPORTED_MODULE_10__["default"].completeUrl() + pageLevelEndPoint.value + '/order-by', record.value).then(function (res) {
        errors.value = []; // parentToChild()
        // getItems()
        // getItem()

        sweetalertMessage({
          status: res.data.status,
          title: '',
          message: res.data.message,
          position: 'bottom-end',
          timer: 5000,
          progressBar: true,
          toast: true,
          showConfirmButton: false
        });
      });
    }; // const addEditModalBtn = (mode,itemId) => {
    //     actionMode.value = mode
    //     // recordId.value = itemId
    //     showModal.value = true
    //     modalName.value = 'AgenciesModal'
    //     $("body").css({"overflow":"hidden","padding-right":"17px"});
    // }
    // const loadParentData = (data) => {
    //     if(data.refresh){
    //         getItems(1)
    //     }
    // }
    // const closeModal = (data) => {
    //     $("body").css({"overflow":"visible","padding-right":"0"});
    //     if(data.showModal == false){
    //         showModal.value = data.showModal
    //     }
    //     // close()
    // }


    var btnLoader = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      active: false,
      hideContent: true,
      activeContent: ''
    });

    var btnLoaderAction = function btnLoaderAction(data) {
      btnLoader.value.activeContent = data;
    }; // const deleteBtn = (id) => {
    //     selectedItems.value = []
    //     var message = ''
    //     if(activeStatus.value=='trash'){
    //         bulkAction.value = 'delete'
    //         message = 'Do you want to delete it permanently!'
    //     } else {
    //         bulkAction.value = 'trash'
    //         message = 'Do you want to trash it!'
    //     }
    //     sweetalertAction({
    //         requestedId: id,
    //         status: 'warning',
    //         title: 'Are you sure?',
    //         message: message,
    //         position: 'bottom-end',
    //         confirmationBtn: true,
    //         confirmButtonText: 'Yes',
    //         cancelBtn: true,
    //         timer: 0,
    //         progressBar: false,
    //         toast: true,
    //         requestType: activeStatus.value=='trash'?'delete':'trash'
    //     })
    // }


    var propertyPurposeDropdown = function propertyPurposeDropdown() {
      // alert(record.value.propertypurpose_id)
      // const data = Helpers.parentToChildFilter(
      //     record.value.propertypurpose_id,
      //     propertyPurposeTimePeriods.value,
      //     'propertypurpose_id',
      // )
      // propertyPurposeTimePeriods.value = data
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(_helpers_helpers__WEBPACK_IMPORTED_MODULE_10__["default"].completeUrl() + pageLevelEndPoint.value + '/property-purpose-time-periods/' + record.value.propertypurpose_id).then(function (res) {
        propertyPurposeTimePeriods.value = res.data;
      });
    };

    var sweetalertMessage = function sweetalertMessage(data) {
      var Toast = sweetalert2__WEBPACK_IMPORTED_MODULE_9___default().mixin({
        toast: data.toast,
        position: data.position,
        timer: data.timer,
        timerProgressBar: data.progressBar,
        showConfirmButton: data.showConfirmButton,
        didOpen: function didOpen(toast) {
          toast.addEventListener('mouseenter', (sweetalert2__WEBPACK_IMPORTED_MODULE_9___default().stopTimer));
          toast.addEventListener('mouseleave', (sweetalert2__WEBPACK_IMPORTED_MODULE_9___default().resumeTimer));
        }
      });

      if (data.toast == true) {
        Toast.fire({
          icon: data.status,
          title: data.title,
          text: data.message
        });
      } else {
        sweetalert2__WEBPACK_IMPORTED_MODULE_9___default().fire({
          icon: data.status,
          title: data.title,
          text: data.message
        });
      }
    };

    var sweetalertAction = function sweetalertAction(data) {
      var Toast = sweetalert2__WEBPACK_IMPORTED_MODULE_9___default().mixin({
        toast: data.toast,
        position: data.position,
        showConfirmButton: data.confirmationBtn,
        showCancelButton: data.cancelBtn,
        confirmButtonText: data.confirmButtonText,
        timer: data.timer,
        timerProgressBar: data.progressBar,
        didOpen: function didOpen(toast) {
          toast.addEventListener('mouseenter', (sweetalert2__WEBPACK_IMPORTED_MODULE_9___default().stopTimer));
          toast.addEventListener('mouseleave', (sweetalert2__WEBPACK_IMPORTED_MODULE_9___default().resumeTimer));
        }
      });

      if (data.status == 'success' || data.status == 'error' || data.status == 'warning' || data.status == 'info' || data.status == 'question') {
        if (data.toast == true) {
          if (data.requestType == 'trash' || data.requestType == 'delete') {
            Toast.fire({
              icon: data.status,
              title: data.title,
              text: data.message
            }).then(function (result) {
              if (result.isConfirmed) {// bulkAction.value = data.requestType,
                // selectedItems.value.push(data.requestedId)
                // bulkActionRequest()
              }
            });
          } else {
            Toast.fire({
              icon: data.status,
              title: data.title,
              text: data.message
            });
          }
        } else {
          // not worked on it yet
          if (data.requestedId != '' && data.requestType == 'trash') {
            sweetalert2__WEBPACK_IMPORTED_MODULE_9___default().fire({
              title: data.title,
              text: data.message,
              icon: 'info',
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: true,
              confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
              confirmButtonAriaLabel: 'Thumbs up, great!',
              cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
              cancelButtonAriaLabel: 'Thumbs down'
            });
          } else {
            // if(data.status == 'success' || data.status == 'error' || data.status == 'warning' || data.status == 'info' || data.status == 'question'){
            sweetalert2__WEBPACK_IMPORTED_MODULE_9___default().fire({
              title: data.title,
              text: data.message,
              icon: 'info',
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: true,
              confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
              confirmButtonAriaLabel: 'Thumbs up, great!',
              cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
              cancelButtonAriaLabel: 'Thumbs down'
            }); // }
          }
        }
      }
    };

    return {
      // icons,
      appEndPoint: appEndPoint,
      apiEndPoint: apiEndPoint,
      pageLevelEndPoint: pageLevelEndPoint,
      loaderSettings: loaderSettings,
      // isLoading,
      // isLoadingFullPage,
      // agents,
      // statusesCount,
      // activeStatus,
      // totalItems,
      // recordId,
      actionMode: actionMode,
      // bulkAction,
      bulkOptions: bulkOptions,
      currencies: currencies,
      propertyTypes: propertyTypes,
      propertyPurposes: propertyPurposes,
      propertyPurposeTimePeriods: propertyPurposeTimePeriods,
      propertyStatuses: propertyStatuses,
      amenities: amenities,
      facilities: facilities,
      facilityDistances: facilityDistances,
      valuations: valuations,
      facility: facility,
      valuation: valuation,
      // selectItem,
      // editBtn,
      getItems: getItems,
      getItem: getItem,
      // bulkActionBtn,
      // bulkActionBtnBack,
      // perPageActionBtn,
      // orderByBtn,
      // addEditModalBtn,
      // loadParentData,
      // closeModal,
      // perPageAction,
      // perPageOptions,
      // orderByAction,
      // tableColumns,
      // clearSortInTableColumns,
      // allSelected,
      // selectedItems,
      // selectAllItems,
      // deleteBtn,
      sweetalertMessage: sweetalertMessage,
      sweetalertAction: sweetalertAction,
      // showModal,
      // modalName,
      Helpers: _helpers_helpers__WEBPACK_IMPORTED_MODULE_10__["default"],
      agent_id: agent_id,
      property_id: property_id,
      record: record,
      errors: errors,
      btnLoader: btnLoader,
      btnLoaderAction: btnLoaderAction,
      saveBtn: saveBtn,
      updateBtn: updateBtn,
      updateGalleryBtn: updateGalleryBtn,
      addFacilityBtn: addFacilityBtn,
      removeFacilityBtn: removeFacilityBtn,
      addValuationBtn: addValuationBtn,
      removeValuationBtn: removeValuationBtn,
      addEditModalBtn: addEditModalBtn,
      selectMediaBtn: selectMediaBtn,
      closeModal: closeModal,
      selectedMediaFiles: selectedMediaFiles,
      showModal: showModal,
      modalName: modalName,
      // checkData,
      valuationsDifference: valuationsDifference,
      facilitiesDifference: facilitiesDifference,
      moveBtn: moveBtn,
      propertyPurposeDropdown: propertyPurposeDropdown
    };
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/AgencyAgentsAvatars.vue?vue&type=script&lang=ts":
/*!************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/AgencyAgentsAvatars.vue?vue&type=script&lang=ts ***!
  \************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/helpers */ "./resources/js/components/helpers/helpers.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: "agency-agents-avatars",
  props: {
    agency: {
      type: Object,
      "default": ''
    }
  },
  watch: {
    agency: {
      handler: function handler(val, oldVal) {
        this.refreshData();
      },
      deep: true
    }
  },
  setup: function setup(props) {
    var appEndPoint = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("/admin");
    var apiEndPoint = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("/api");
    var pageLevelEndPoint = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('/agents');
    var agencyId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(props.agency.id);
    var agents = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      agents.value = _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__["default"].AvatarsLimit(3, props.agency.agents);
    });

    var refreshData = function refreshData() {
      agents.value = _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__["default"].AvatarsLimit(3, props.agency.agents);
    };

    return {
      Helpers: _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEndPoint: appEndPoint,
      apiEndPoint: apiEndPoint,
      pageLevelEndPoint: pageLevelEndPoint,
      agencyId: agencyId,
      agents: agents,
      refreshData: refreshData
    };
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/PermissionError.vue?vue&type=script&lang=ts":
/*!********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/PermissionError.vue?vue&type=script&lang=ts ***!
  \********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: "status",
  props: {// status: {
    //     type: String,
    //     default: ''
    // }
  },
  computed: {// statusClass() {
    //     switch (this.status) {
    //         case 'pending':
    //             return 'badge-light-warning'
    //         case 'active':
    //             return 'badge-light-success'
    //         case 'inactive':
    //             return 'badge-light-secondary'
    //         case 'trash':
    //             return 'badge-light-danger'
    //         default:
    //             return 'badge-light-warning'
    //     }
    // }
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/ProfileAvatarAndName.vue?vue&type=script&lang=ts":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/ProfileAvatarAndName.vue?vue&type=script&lang=ts ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/helpers */ "./resources/js/components/helpers/helpers.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: "profile-avatar-and-name",
  props: {
    user: {
      type: Object,
      "default": ''
    }
  },
  setup: function setup() {
    return {
      Helpers: _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__["default"]
    };
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/Status.vue?vue&type=script&lang=ts":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/Status.vue?vue&type=script&lang=ts ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: "status",
  props: {
    status: {
      type: String,
      "default": ''
    }
  },
  computed: {
    statusClass: function statusClass() {
      switch (this.status) {
        case 'pending':
          return 'badge-light-warning';

        case 'active':
          return 'badge-light-success';

        case 'inactive':
          return 'badge-light-secondary';

        case 'trash':
          return 'badge-light-danger';

        default:
          return 'badge-light-warning';
      }
    }
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/modals/FileManagerModal.vue?vue&type=script&lang=ts":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/modals/FileManagerModal.vue?vue&type=script&lang=ts ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.mjs");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm-bundler.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_global_Loader_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/global/Loader.vue */ "./resources/js/components/global/Loader.vue");
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/helpers */ "./resources/js/components/helpers/helpers.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: "file-manager-modal",
  components: {
    GlobalLoader: _components_global_Loader_vue__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  emit: ["refresh-parent-data", "close-modal", "selected-media-files"],
  props: {
    recordObj: {
      type: Object,
      required: true
    }
  },
  watch: {
    recordObj: {
      handler: function handler(val, oldVal) {
        this.showModal = val.showModal;

        if (val.showModal == true && val.modalName == 'FileManagerModal') {
          jquery__WEBPACK_IMPORTED_MODULE_3___default()("body").css({
            "overflow": "hidden",
            "padding-right": "17px"
          });
          this.getItems();
        } else {
          jquery__WEBPACK_IMPORTED_MODULE_3___default()("body").css({
            "overflow": "visible",
            "padding-right": "0"
          });
        }
      },
      deep: true
    }
  },
  create: function create() {
    this.getItems();
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var store = (0,vuex__WEBPACK_IMPORTED_MODULE_6__.useStore)();
    var route = (0,vue_router__WEBPACK_IMPORTED_MODULE_7__.useRoute)();
    var pageLevelEndPoint = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('/upload');
    var loaderSettings = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      active: false,
      isLoadingFullPage: false
    });
    var bulkOptions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var record = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var errors = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var addEditModalClose = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    var showModal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(props.recordObj.showModal);
    var modalName = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(props.recordObj.modalName);
    var modalSettings = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      preventClick: "false",
      zIndexAuto: "true",
      zIndexBase: "10000",
      zIndex: "true",
      transition: "vfm"
    });
    var mediaMeta = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var uploadedFiles = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var field = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    var perPageAction = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(25);
    var perPageOptions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var search = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var selectedMediaFiles = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var actionMode = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('show');
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      window.addEventListener('fileManagerModalListener', function (event) {
        if (event['detail'].value) {
          mediaMeta.value = store.state.SelectMediaModule.select_media_data;
          field.value = store.state.SelectMediaModule.select_media_data.field;
        }
      });
    });

    var addBtn = function addBtn(e) {
      e.preventDefault();
      var files = [];
      var data = new FormData();
      var count = 1;

      var _iterator = _createForOfIteratorHelper(e.target.files),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var file = _step.value;

          // console.log('file=',file)
          try {
            files.push({
              key: mediaMeta.value['fileName'] + count,
              name: file['name'],
              type: file['type']
            });
            data.append(mediaMeta.value['fileName'] + count, file);
            count++;
          } catch (_a) {}
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      data.append('mediaMeta', JSON.stringify(mediaMeta.value));
      data.append('files', JSON.stringify(files));
      axios__WEBPACK_IMPORTED_MODULE_1___default().post(_helpers_helpers__WEBPACK_IMPORTED_MODULE_5__.completeUrl() + pageLevelEndPoint.value + '/add', data).then(function (res) {
        if (res.data.status == 'success') {
          sweetalertMessage({
            status: res.data.status,
            title: '',
            message: res.data.message,
            position: 'bottom-end',
            timer: 5000,
            progressBar: true,
            toast: true,
            showConfirmButton: false
          });
          getItems();
        } else {
          for (var key in res.data.errors) {
            var err = res.data.errors[key][0]; // console.log('err',err)

            sweetalertMessage({
              status: res.data.status,
              title: '',
              message: err,
              position: 'bottom-end',
              timer: 5000,
              progressBar: true,
              toast: true,
              showConfirmButton: false
            });
          }
        }
      })["catch"](function (err) {
        console.log('err', err);
      });
    };

    var getItems = function getItems() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      console.log('getItems=');
      loaderSettings.value.active = true;
      errors.value = [];
      axios__WEBPACK_IMPORTED_MODULE_1___default().post(_helpers_helpers__WEBPACK_IMPORTED_MODULE_5__.completeUrl() + pageLevelEndPoint.value + '?page=' + page, {
        search: search.value
      }).then(function (res) {
        uploadedFiles.value = res.data;
        actionMode.value = 'show';
        setTimeout(function () {
          loaderSettings.value.active = false;
        }, 500);
      })["catch"](function (error) {
        console.log(error);
      });
    };

    var parentToChild = function parentToChild() {
      emit('refresh-parent-data', {
        refresh: true
      });
    };

    var sweetalertMessage = function sweetalertMessage(data) {
      var Toast = sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().mixin({
        toast: data.toast,
        position: data.position,
        timer: data.timer,
        timerProgressBar: data.progressBar,
        showConfirmButton: data.showConfirmButton,
        didOpen: function didOpen(toast) {
          toast.addEventListener('mouseenter', (sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().stopTimer));
          toast.addEventListener('mouseleave', (sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().resumeTimer));
        }
      });

      if (data.toast == true) {
        Toast.fire({
          icon: data.status,
          title: data.title,
          text: data.message
        });
      } else {
        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().fire({
          position: data.position,
          timer: data.timer,
          timerProgressBar: data.progressBar,
          showConfirmButton: data.showConfirmButton,
          icon: data.status,
          title: data.title,
          text: data.message
        });
      }
    };

    var sweetalertAction = function sweetalertAction(data) {
      var Toast = sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().mixin({
        toast: data.toast,
        position: data.position,
        showConfirmButton: data.confirmBtn,
        showCancelButton: data.cancelBtn,
        confirmButtonText: data.confirmButtonText,
        timer: data.timer,
        timerProgressBar: data.progressBar,
        didOpen: function didOpen(toast) {
          toast.addEventListener('mouseenter', (sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().stopTimer));
          toast.addEventListener('mouseleave', (sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().resumeTimer));
        }
      });

      if (data.status == 'success' || data.status == 'error' || data.status == 'warning' || data.status == 'info' || data.status == 'question') {
        if (data.toast == true) {
          if (data.requestType == 'trash' || data.requestType == 'delete') {
            Toast.fire({
              icon: data.status,
              title: data.title,
              text: data.message
            }).then(function (result) {
              if (result.isConfirmed) {// bulkAction.value = data.requestType,
                // selectedMediaFiles.value.push(data.requestedId)
                // bulkActionRequest()
              }
            });
          } else {
            Toast.fire({
              icon: data.status,
              title: data.title,
              text: data.message
            });
          }
        } else {
          if (data.requestType == 'trash' || data.requestType == 'delete') {
            sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().fire({
              title: data.title,
              text: data.message,
              icon: data.icon,
              showCloseButton: data.showCloseButton,
              showCancelButton: data.cancelBtn,
              confirmButtonText: data.confirmButtonText,
              cancelButtonText: data.cancelButtonText
            }).then(function (result) {
              if (result.isConfirmed) {// bulkAction.value = data.requestType,
                // selectedMediaFiles.value.push(data.requestedId)
                // bulkActionRequest()
              }
            });
          } else {
            sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().fire({
              position: data.position,
              timer: data.timer,
              timerProgressBar: data.progressBar,
              showConfirmButton: data.showConfirmButton,
              icon: data.status,
              title: data.title,
              text: data.message
            });
          }
        }
      }
    };

    var closeModal = function closeModal() {
      // $("body").css({"overflow":"visible","padding-right":"0"});
      record.value = {}; // role_permissions.value = []

      emit('close-modal', {
        showModal: false
      });
    };

    var switchBtn = function switchBtn(data) {
      actionMode.value = data;
    };

    var selectBtn = function selectBtn() {
      if (mediaMeta.value.fileSelection == 'single') {
        var filesData = selectedMediaFiles.value[0];
        selectedMediaFiles.value = [];
        selectedMediaFiles.value = [filesData];
      }

      emit('selected-media-files', {
        files: selectedMediaFiles.value,
        mediaMeta: mediaMeta.value,
        field: field.value
      });
      selectedMediaFiles.value = [];
      closeModal();
    };

    return {
      pageLevelEndPoint: pageLevelEndPoint,
      loaderSettings: loaderSettings,
      bulkOptions: bulkOptions,
      record: record,
      errors: errors,
      field: field,
      parentToChild: parentToChild,
      sweetalertMessage: sweetalertMessage,
      sweetalertAction: sweetalertAction,
      closeModal: closeModal,
      switchBtn: switchBtn,
      selectBtn: selectBtn,
      addEditModalClose: addEditModalClose,
      showModal: showModal,
      modalName: modalName,
      modalSettings: modalSettings,
      perPageAction: perPageAction,
      perPageOptions: perPageOptions,
      search: search,
      addBtn: addBtn,
      mediaMeta: mediaMeta,
      getItems: getItems,
      uploadedFiles: uploadedFiles,
      Helpers: _helpers_helpers__WEBPACK_IMPORTED_MODULE_5__,
      selectedMediaFiles: selectedMediaFiles,
      actionMode: actionMode
    };
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PropertyAddEdit.vue?vue&type=template&id=23ed541b&ts=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PropertyAddEdit.vue?vue&type=template&id=23ed541b&ts=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "app-content content"
};

var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "content-overlay"
}, null, -1
/* HOISTED */
);

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "header-navbar-shadow"
}, null, -1
/* HOISTED */
);

var _hoisted_4 = {
  "class": "content-wrapper container-xxl p-0"
};

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"content-header row\"><div class=\"content-header-left col-md-9 col-12 mb-3\"><div class=\"row breadcrumbs-top\"><div class=\"col-12\"><h2 class=\"content-header-title float-start mb-12\">Propertyz</h2><!-- modal trigger button --><div class=\"d-flex align-items-center\"><!-- &lt;button type=&quot;button&quot; class=&quot;btn btn-sm btn-primary ml-10 mb-12&quot; @click=&quot;addEditModalBtn(&#39;add&#39;,&#39;&#39;)&quot; v-if=&quot;Helpers.hasPermission(&#39;property_management&#39;,&#39;can_add&#39;)&quot;&gt;\n                                    Add New\n                                &lt;/button&gt; --></div></div></div></div><div class=\"content-header-right text-md-end col-md-3 col-12 d-md-block d-none\"><div class=\"mb-1 breadcrumb-right\"><!-- &lt;div class=&quot;dropdown&quot;&gt;\n                            &lt;button class=&quot;btn-icon btn btn-primary btn-round btn-sm dropdown-toggle&quot; type=&quot;button&quot; data-bs-toggle=&quot;dropdown&quot; aria-haspopup=&quot;true&quot; aria-expanded=&quot;false&quot;&gt;&lt;i data-feather=&quot;grid&quot;&gt;&lt;/i&gt;&lt;/button&gt;\n                            &lt;div class=&quot;dropdown-menu dropdown-menu-end&quot;&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;app-todo.html&quot;&gt;&lt;i class=&quot;me-1&quot; data-feather=&quot;check-square&quot;&gt;&lt;/i&gt;&lt;span class=&quot;align-middle&quot;&gt;Todo&lt;/span&gt;&lt;/a&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;app-chat.html&quot;&gt;&lt;i class=&quot;me-1&quot; data-feather=&quot;message-square&quot;&gt;&lt;/i&gt;&lt;span class=&quot;align-middle&quot;&gt;Chat&lt;/span&gt;&lt;/a&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;app-email.html&quot;&gt;&lt;i class=&quot;me-1&quot; data-feather=&quot;mail&quot;&gt;&lt;/i&gt;&lt;span class=&quot;align-middle&quot;&gt;Email&lt;/span&gt;&lt;/a&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;app-calendar.html&quot;&gt;&lt;i class=&quot;me-1&quot; data-feather=&quot;calendar&quot;&gt;&lt;/i&gt;&lt;span class=&quot;align-middle&quot;&gt;Calendar&lt;/span&gt;&lt;/a&gt;&lt;/div&gt;\n                        &lt;/div&gt; --></div></div></div>", 1);

var _hoisted_6 = {
  "class": "content-body",
  ref: "loadingRefContainer"
};
var _hoisted_7 = {
  "class": "app-user-list"
};
var _hoisted_8 = {
  "class": "card"
};
var _hoisted_9 = {
  key: 0
};

var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "card-header"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
  "class": "card-title"
}, "Basic Information")], -1
/* HOISTED */
);

var _hoisted_11 = {
  "class": "card-body"
};
var _hoisted_12 = {
  "class": "row"
};
var _hoisted_13 = {
  "class": "col-sm-6"
};
var _hoisted_14 = {
  "class": "col-sm-12 mb-10"
};

var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "title"
}, "Property Title", -1
/* HOISTED */
);

var _hoisted_16 = {
  "class": "col-sm-6"
};
var _hoisted_17 = {
  "class": "row"
};
var _hoisted_18 = {
  "class": "col-sm-6 mb-10"
};

var _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "currency_id"
}, "Currency", -1
/* HOISTED */
);

var _hoisted_20 = {
  "class": "list-item"
};
var _hoisted_21 = {
  "class": "col-sm-6 mb-10"
};

var _hoisted_22 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "price"
}, "Price", -1
/* HOISTED */
);

var _hoisted_23 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "input-group-text"
}, "$", -1
/* HOISTED */
);

var _hoisted_24 = {
  "class": "row"
};
var _hoisted_25 = {
  "class": "col-sm-4 mb-10"
};

var _hoisted_26 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "propertytype_id"
}, "Property Type", -1
/* HOISTED */
);

var _hoisted_27 = {
  "class": "list-item"
};
var _hoisted_28 = {
  "class": "col-sm-4 mb-10"
};

var _hoisted_29 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "propertypurpose_id"
}, "Property Purpose", -1
/* HOISTED */
);

var _hoisted_30 = {
  "class": "list-item"
};
var _hoisted_31 = {
  key: 0,
  "class": "col-sm-4 mb-10"
};

var _hoisted_32 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "propertypurposetimeperiod_id"
}, "Time Period", -1
/* HOISTED */
);

var _hoisted_33 = {
  "class": "list-item"
};

var _hoisted_34 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "card-header"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
  "class": "card-title"
}, "Details")], -1
/* HOISTED */
);

var _hoisted_35 = {
  "class": "card-body"
};
var _hoisted_36 = {
  "class": "row"
};
var _hoisted_37 = {
  "class": "col-sm-4 mb-10"
};

var _hoisted_38 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "bedrooms"
}, "Bedrooms", -1
/* HOISTED */
);

var _hoisted_39 = {
  "class": "col-sm-4 mb-10"
};

var _hoisted_40 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "beds"
}, "Beds", -1
/* HOISTED */
);

var _hoisted_41 = {
  "class": "col-sm-4 mb-10"
};

var _hoisted_42 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "bathrooms"
}, "Bathrooms", -1
/* HOISTED */
);

var _hoisted_43 = {
  "class": "row"
};
var _hoisted_44 = {
  "class": "col-sm-6 mb-10"
};

var _hoisted_45 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "phone"
}, "Phone", -1
/* HOISTED */
);

var _hoisted_46 = {
  "class": "col-sm-6 mb-10"
};

var _hoisted_47 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "mobile"
}, "Mobile", -1
/* HOISTED */
);

var _hoisted_48 = {
  "class": "row"
};
var _hoisted_49 = {
  "class": "col-sm-3 mb-10"
};

var _hoisted_50 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "home_area"
}, "Home Area", -1
/* HOISTED */
);

var _hoisted_51 = {
  "class": "col-sm-3 mb-10"
};

var _hoisted_52 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "lot_area"
}, "Lot Area", -1
/* HOISTED */
);

var _hoisted_53 = {
  "class": "col-sm-3 mb-10"
};

var _hoisted_54 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "year_built"
}, "Year Built", -1
/* HOISTED */
);

var _hoisted_55 = {
  "class": "col-sm-3 mb-10"
};

var _hoisted_56 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "propertystatus_id"
}, "Property Status", -1
/* HOISTED */
);

var _hoisted_57 = {
  "class": "list-item"
};

var _hoisted_58 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "card-header"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
  "class": "card-title"
}, "Description")], -1
/* HOISTED */
);

var _hoisted_59 = {
  "class": "card-body"
};

var _hoisted_60 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "card-header"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
  "class": "card-title"
}, "Amenities")], -1
/* HOISTED */
);

var _hoisted_61 = {
  "class": "card-body"
};
var _hoisted_62 = {
  "class": "row"
};
var _hoisted_63 = {
  "class": "form-check form-check-inline"
};
var _hoisted_64 = ["id", "value"];
var _hoisted_65 = ["for"];

var _hoisted_66 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "card-header"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
  "class": "card-title"
}, "Facilities")], -1
/* HOISTED */
);

var _hoisted_67 = {
  "class": "card-body"
};
var _hoisted_68 = {
  "class": "row"
};
var _hoisted_69 = ["for"];
var _hoisted_70 = {
  "class": "input-group"
};
var _hoisted_71 = ["onUpdate:modelValue", "id"];
var _hoisted_72 = ["onUpdate:modelValue"];
var _hoisted_73 = ["value"];
var _hoisted_74 = ["onClick"];
var _hoisted_75 = {
  "class": "row"
};
var _hoisted_76 = {
  "class": "col-sm-3"
};
var _hoisted_77 = {
  "class": "list-item"
};
var _hoisted_78 = {
  "class": "col-sm-3"
};

var _hoisted_79 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "card-header"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
  "class": "card-title"
}, "Address")], -1
/* HOISTED */
);

var _hoisted_80 = {
  "class": "card-body"
};
var _hoisted_81 = {
  "class": "row"
};
var _hoisted_82 = {
  "class": "col-sm-4 mb-10"
};

var _hoisted_83 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "country"
}, "Country", -1
/* HOISTED */
);

var _hoisted_84 = {
  "class": "col-sm-4 mb-10"
};

var _hoisted_85 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "state"
}, "State", -1
/* HOISTED */
);

var _hoisted_86 = {
  "class": "col-sm-4 mb-10"
};

var _hoisted_87 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "city"
}, "City", -1
/* HOISTED */
);

var _hoisted_88 = {
  "class": "col-sm-4 mb-10"
};

var _hoisted_89 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "neighborhood"
}, "Neighborhood", -1
/* HOISTED */
);

var _hoisted_90 = {
  "class": "col-sm-8 mb-10"
};

var _hoisted_91 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "address"
}, "Address", -1
/* HOISTED */
);

var _hoisted_92 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "card-header"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
  "class": "card-title"
}, "Valuation")], -1
/* HOISTED */
);

var _hoisted_93 = {
  "class": "card-body"
};
var _hoisted_94 = {
  "class": "row"
};
var _hoisted_95 = {
  key: 0
};
var _hoisted_96 = ["for"];
var _hoisted_97 = {
  "class": "input-group"
};
var _hoisted_98 = ["onUpdate:modelValue", "id"];
var _hoisted_99 = ["onClick"];
var _hoisted_100 = {
  "class": "row"
};
var _hoisted_101 = {
  "class": "col-sm-3"
};
var _hoisted_102 = {
  "class": "list-item"
};
var _hoisted_103 = {
  "class": "col-sm-3"
};

var _hoisted_104 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "card-header"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
  "class": "card-title"
}, "Gallery")], -1
/* HOISTED */
);

var _hoisted_105 = {
  "class": "card-body"
};
var _hoisted_106 = {
  key: 0
};
var _hoisted_107 = {
  "class": "avatar avatar-xl handle"
};
var _hoisted_108 = ["src"];

var _hoisted_109 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
  "class": "mb-0"
}, "Allowed file types: png, jpg, jpeg.", -1
/* HOISTED */
);

var _hoisted_110 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "card-header"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
  "class": "card-title"
}, "Status")], -1
/* HOISTED */
);

var _hoisted_111 = {
  "class": "card-body"
};
var _hoisted_112 = {
  "class": "row"
};
var _hoisted_113 = {
  "class": "col-sm-3 mb-10"
};

var _hoisted_114 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "form-label",
  "for": "status"
}, "Status", -1
/* HOISTED */
);

var _hoisted_115 = {
  "class": "list-item"
};
var _hoisted_116 = {
  "class": "card-footer"
};
var _hoisted_117 = {
  "class": "row"
};
var _hoisted_118 = {
  "class": "col-sm-12"
};
var _hoisted_119 = {
  key: 0,
  "class": "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
};
var _hoisted_120 = {
  key: 0,
  "class": "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
};
var _hoisted_121 = {
  key: 1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_GlobalLoader = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("GlobalLoader");

  var _component_v_select = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("v-select");

  var _component_vue_feather = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("vue-feather");

  var _component_draggable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("draggable");

  var _component_PermissionError = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("PermissionError");

  var _component_FileManagerModal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("FileManagerModal");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_hoisted_2, _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_GlobalLoader, {
    loaderProps: _ctx.loaderSettings
  }, null, 8
  /* PROPS */
  , ["loaderProps"]), _ctx.Helpers.hasPermission('property_management', 'can_view') ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [_hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return _ctx.record.title = $event;
    }),
    id: "title",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.title != null ? 'is-invalid' : '']])
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.title]]), _ctx.errors.title != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.title != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.title[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_v_select, {
    id: "currency_id",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["dropdown", [_ctx.errors.currency_id != null ? 'is-invalid' : '']]),
    modelValue: _ctx.record.currency_id,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return _ctx.record.currency_id = $event;
    }),
    placeholder: "--select--",
    clearable: true,
    reduce: function reduce(option) {
      return option.id;
    },
    options: _ctx.currencies,
    label: "name"
  }, {
    option: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (option) {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.name), 1
      /* TEXT */
      )];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["class", "modelValue", "reduce", "options"]), _ctx.errors.currency_id != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.currency_id != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.currency_id[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["input-group", [_ctx.errors.price != null ? 'is-invalid' : '']])
  }, [_hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return _ctx.record.price = $event;
    }),
    id: "price",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.price != null ? 'is-invalid' : '']])
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.price]])], 2
  /* CLASS */
  ), _ctx.errors.price != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.price != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.price[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_v_select, {
    id: "propertytype_id",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["dropdown", [_ctx.errors.propertytype_id != null ? 'is-invalid' : '']]),
    modelValue: _ctx.record.propertytype_id,
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return _ctx.record.propertytype_id = $event;
    }),
    placeholder: "--select--",
    clearable: true,
    reduce: function reduce(option) {
      return option.id;
    },
    options: _ctx.propertyTypes,
    label: "name"
  }, {
    option: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (option) {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.name), 1
      /* TEXT */
      )];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["class", "modelValue", "reduce", "options"]), _ctx.errors.propertytype_id != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.propertytype_id != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.propertytype_id[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [_hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_v_select, {
    id: "propertypurpose_id",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["dropdown", [_ctx.errors.propertypurpose_id != null ? 'is-invalid' : '']]),
    modelValue: _ctx.record.propertypurpose_id,
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return _ctx.record.propertypurpose_id = $event;
    }),
    placeholder: "--select--",
    clearable: true,
    reduce: function reduce(option) {
      return option.id;
    },
    options: _ctx.propertyPurposes,
    label: "name",
    onClose: _cache[5] || (_cache[5] = function ($event) {
      return _ctx.propertyPurposeDropdown();
    })
  }, {
    option: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (option) {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.name), 1
      /* TEXT */
      )];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["class", "modelValue", "reduce", "options"]), _ctx.errors.propertypurpose_id != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.propertypurpose_id != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.propertypurpose_id[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _ctx.propertyPurposeTimePeriods.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_31, [_hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_v_select, {
    id: "propertypurposetimeperiod_id",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["dropdown", [_ctx.errors.propertypurposetimeperiod_id != null ? 'is-invalid' : '']]),
    modelValue: _ctx.record.propertypurposetimeperiod_id,
    "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
      return _ctx.record.propertypurposetimeperiod_id = $event;
    }),
    placeholder: "--select--",
    clearable: true,
    reduce: function reduce(option) {
      return option.id;
    },
    options: _ctx.propertyPurposeTimePeriods,
    label: "name"
  }, {
    option: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (option) {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.name), 1
      /* TEXT */
      )];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["class", "modelValue", "reduce", "options"]), _ctx.errors.propertypurposetimeperiod_id != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.propertypurposetimeperiod_id != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.propertypurposetimeperiod_id[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
      return _ctx.record.bedrooms = $event;
    }),
    id: "bedrooms",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.bedrooms != null ? 'is-invalid' : '']])
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.bedrooms]]), _ctx.errors.bedrooms != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.bedrooms != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.bedrooms[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_hoisted_40, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
      return _ctx.record.beds = $event;
    }),
    id: "beds",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.beds != null ? 'is-invalid' : '']])
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.beds]]), _ctx.errors.beds != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.beds != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.beds[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [_hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[9] || (_cache[9] = function ($event) {
      return _ctx.record.bathrooms = $event;
    }),
    id: "bathrooms",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.bathrooms != null ? 'is-invalid' : '']])
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.bathrooms]]), _ctx.errors.bathrooms != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.bathrooms != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.bathrooms[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [_hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[10] || (_cache[10] = function ($event) {
      return _ctx.record.phone = $event;
    }),
    id: "phone",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.phone != null ? 'is-invalid' : '']])
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.phone]]), _ctx.errors.phone != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.phone != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.phone[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [_hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
      return _ctx.record.mobile = $event;
    }),
    id: "mobile",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.mobile != null ? 'is-invalid' : '']])
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.mobile]]), _ctx.errors.mobile != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.mobile != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.mobile[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [_hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[12] || (_cache[12] = function ($event) {
      return _ctx.record.home_area = $event;
    }),
    id: "home_area",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.home_area != null ? 'is-invalid' : '']])
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.home_area]]), _ctx.errors.home_area != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.home_area != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.home_area[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[13] || (_cache[13] = function ($event) {
      return _ctx.record.lot_area = $event;
    }),
    id: "lot_area",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.lot_area != null ? 'is-invalid' : '']])
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.lot_area]]), _ctx.errors.lot_area != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.lot_area != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.lot_area[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [_hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[14] || (_cache[14] = function ($event) {
      return _ctx.record.year_built = $event;
    }),
    id: "year_built",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.year_built != null ? 'is-invalid' : '']])
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.year_built]]), _ctx.errors.year_built != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.year_built != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.year_built[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [_hoisted_56, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_v_select, {
    id: "propertystatus_id",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["dropdown", [_ctx.errors.propertystatus_id != null ? 'is-invalid' : '']]),
    modelValue: _ctx.record.propertystatus_id,
    "onUpdate:modelValue": _cache[15] || (_cache[15] = function ($event) {
      return _ctx.record.propertystatus_id = $event;
    }),
    placeholder: "--select--",
    clearable: true,
    reduce: function reduce(option) {
      return option.id;
    },
    options: _ctx.propertyStatuses,
    label: "name"
  }, {
    option: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (option) {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.name), 1
      /* TEXT */
      )];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["class", "modelValue", "reduce", "options"]), _ctx.errors.propertystatus_id != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.propertystatus_id != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.propertystatus_id[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), _hoisted_58, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    "onUpdate:modelValue": _cache[16] || (_cache[16] = function ($event) {
      return _ctx.record.description = $event;
    }),
    id: "description",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.description != null ? 'is-invalid' : '']]),
    cols: "30",
    rows: "5"
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.description]]), _ctx.errors.description != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.description != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.description[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _hoisted_60, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.amenities, function (item, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      "class": "col-sm-2",
      key: index
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      "class": "form-check-input",
      type: "checkbox",
      id: item.id,
      value: item.id,
      "onUpdate:modelValue": _cache[17] || (_cache[17] = function ($event) {
        return _ctx.record.amenities = $event;
      })
    }, null, 8
    /* PROPS */
    , _hoisted_64), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, _ctx.record.amenities]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      "class": "form-check-label",
      "for": item.id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name), 9
    /* TEXT, PROPS */
    , _hoisted_65)])]);
  }), 128
  /* KEYED_FRAGMENT */
  ))]), _ctx.errors.amenities != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.amenities != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.amenities[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _hoisted_66, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.record.facilities, function (item, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      "class": "col-sm-4 mb-10",
      key: index
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      "class": "form-label",
      "for": item.facility.id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.facility.name), 9
    /* TEXT, PROPS */
    , _hoisted_69), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "text",
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return _ctx.record.facilities[index]['distance'] = $event;
      },
      id: item.facility.id,
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.facilities != null ? 'is-invalid' : '']])
    }, null, 10
    /* CLASS, PROPS */
    , _hoisted_71), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.facilities[index]['distance']]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return _ctx.record.facilities[index]['facilitydistance_id'] = $event;
      },
      "class": "form-select",
      id: ""
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.facilityDistances, function (fd, fdIndex) {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
        key: fdIndex,
        value: fd.id
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(fd.name), 9
      /* TEXT, PROPS */
      , _hoisted_73);
    }), 128
    /* KEYED_FRAGMENT */
    ))], 8
    /* PROPS */
    , _hoisted_72), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.record.facilities[index]['facilitydistance_id']]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: function onClick($event) {
        return _ctx.removeFacilityBtn(index, item.facility);
      },
      "class": "btn btn-danger"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_vue_feather, {
      "class": "icon",
      type: "trash",
      size: "16"
    })], 8
    /* PROPS */
    , _hoisted_74)]), _ctx.errors.facilities != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.facilities != null ? 'd-block' : '']])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.facilities[0]), 3
    /* TEXT, CLASS */
    )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128
  /* KEYED_FRAGMENT */
  ))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_v_select, {
    id: "facility",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["dropdown", [_ctx.errors.facility != null ? 'is-invalid' : '']]),
    modelValue: _ctx.facility,
    "onUpdate:modelValue": _cache[18] || (_cache[18] = function ($event) {
      return _ctx.facility = $event;
    }),
    placeholder: "--select--",
    clearable: true,
    reduce: function reduce(option) {
      return option;
    },
    options: _ctx.facilities,
    label: "name"
  }, {
    option: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (option) {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_77, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.name), 1
      /* TEXT */
      )];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["class", "modelValue", "reduce", "options"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[19] || (_cache[19] = function ($event) {
      return _ctx.addFacilityBtn();
    }),
    "class": "btn btn-primary"
  }, "Add Facility")])])]), _hoisted_79, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, [_hoisted_83, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[20] || (_cache[20] = function ($event) {
      return _ctx.record.country = $event;
    }),
    id: "country",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.country != null ? 'is-invalid' : '']])
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.country]]), _ctx.errors.country != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.country != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.country[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_84, [_hoisted_85, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[21] || (_cache[21] = function ($event) {
      return _ctx.record.state = $event;
    }),
    id: "state",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.state != null ? 'is-invalid' : '']])
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.state]]), _ctx.errors.state != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.state != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.state[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, [_hoisted_87, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[22] || (_cache[22] = function ($event) {
      return _ctx.record.city = $event;
    }),
    id: "city",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.city != null ? 'is-invalid' : '']])
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.city]]), _ctx.errors.city != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.city != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.city[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [_hoisted_89, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[23] || (_cache[23] = function ($event) {
      return _ctx.record.neighborhood = $event;
    }),
    id: "neighborhood",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.neighborhood != null ? 'is-invalid' : '']])
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.neighborhood]]), _ctx.errors.neighborhood != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.neighborhood != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.neighborhood[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_90, [_hoisted_91, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[24] || (_cache[24] = function ($event) {
      return _ctx.record.address = $event;
    }),
    id: "address",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.address != null ? 'is-invalid' : '']])
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.address]]), _ctx.errors.address != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.address != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.address[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), _hoisted_92, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_93, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"row\">\n                                    <div class=\"col-sm-2 mb-10\" v-for=\"(item,index) in record.valuations\" :key=\"index\">\n                                        <label class=\"form-label\" :for=\"item.name\">{{item.name}}</label>\n                                        <input type=\"text\" v-model=\"record.valuations[index]\" :id=\"item.name\" class=\"form-control\" :class=\"[errors.valuations != null?'is-invalid':'']\" />\n                                        <div class=\"invalid-feedback\" :class=\"[errors.valuations != null?'d-block':'']\" v-if=\"errors.valuations != null\">{{errors.valuations[0]}}</div>\n                                    </div>\n                                </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.record.valuations, function (item, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      "class": "col-sm-4 mb-10",
      key: index
    }, [item && item.valuation ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_95, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      "class": "form-label",
      "for": item.valuation.id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.valuation.name), 9
    /* TEXT, PROPS */
    , _hoisted_96), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "text",
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return _ctx.record.valuations[index]['value'] = $event;
      },
      id: item.valuation.id,
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", [_ctx.errors.valuations != null ? 'is-invalid' : '']])
    }, null, 10
    /* CLASS, PROPS */
    , _hoisted_98), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.record.valuations[index]['value']]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: function onClick($event) {
        return _ctx.removeValuationBtn(index, item.valuation);
      },
      "class": "btn btn-danger"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_vue_feather, {
      "class": "icon",
      type: "trash",
      size: "16"
    })], 8
    /* PROPS */
    , _hoisted_99)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.errors.valuations != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 1,
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.valuations != null ? 'd-block' : '']])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.valuations[0]), 3
    /* TEXT, CLASS */
    )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128
  /* KEYED_FRAGMENT */
  ))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_100, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_101, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_v_select, {
    id: "valuation",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["dropdown", [_ctx.errors.valuation != null ? 'is-invalid' : '']]),
    modelValue: _ctx.valuation,
    "onUpdate:modelValue": _cache[25] || (_cache[25] = function ($event) {
      return _ctx.valuation = $event;
    }),
    placeholder: "--select--",
    clearable: true,
    reduce: function reduce(option) {
      return option;
    },
    options: _ctx.valuations,
    label: "name"
  }, {
    option: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (option) {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_102, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.name), 1
      /* TEXT */
      )];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["class", "modelValue", "reduce", "options"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_103, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[26] || (_cache[26] = function ($event) {
      return _ctx.addValuationBtn();
    }),
    "class": "btn btn-primary"
  }, "Add Valuation")])])]), _hoisted_104, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_105, [_ctx.record.gallery.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_106, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_draggable, (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)({
    modelValue: _ctx.record.gallery,
    "onUpdate:modelValue": _cache[27] || (_cache[27] = function ($event) {
      return _ctx.record.gallery = $event;
    }),
    "component-data": {
      tag: 'div',
      type: 'transition-group',
      name: !_ctx.drag ? 'flip-list' : null
    },
    tag: "div",
    "item-key": "name"
  }, _ctx.dragOptions, {
    onStart: _cache[28] || (_cache[28] = function ($event) {
      return _ctx.drag = true;
    }),
    onEnd: _cache[29] || (_cache[29] = function ($event) {
      return _ctx.drag = false;
    }),
    handle: ".handle",
    onChange: _ctx.moveBtn
  }), {
    item: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (_ref) {
      var element = _ref.element;
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_107, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
        src: _ctx.Helpers.getMedia(element['media'])['path'],
        alt: "avatar"
      }, null, 8
      /* PROPS */
      , _hoisted_108)])];
    }),
    _: 1
    /* STABLE */

  }, 16
  /* FULL_PROPS */
  , ["modelValue", "component-data", "onChange"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-for=\"(item,index) in record.gallery\" :key=\"index\" class=\"avatar avatar-xl\">\n                                        <span>\n                                            <img :src=\"Helpers.getMedia(record.gallery[index]['media'])['path']\" alt=\"avatar\">\n                                        </span>\n                                        <span v-if=\"agent_id && property_id\">\n                                            <img :src=\"Helpers.getMedia(record.gallery[index])['path']\" alt=\"avatar\">\n                                        </span>\n                                        <span v-else>\n                                            <img :src=\"Helpers.getMedia(record.gallery[index]['media'])['path']\" alt=\"avatar\">\n                                        </span>\n                                    </div> ")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    onClick: _cache[30] || (_cache[30] = function ($event) {
      return _ctx.addEditModalBtn('add', ''), _ctx.selectMediaBtn();
    }),
    "for": "account-upload",
    "class": "btn btn-sm btn-primary mb-10 me-75"
  }, "Upload"), _hoisted_109]), _hoisted_110, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_111, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_112, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_113, [_hoisted_114, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_v_select, {
    id: "status",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["dropdown", [_ctx.errors.status != null ? 'is-invalid' : '']]),
    modelValue: _ctx.record.status,
    "onUpdate:modelValue": _cache[31] || (_cache[31] = function ($event) {
      return _ctx.record.status = $event;
    }),
    placeholder: "--select--",
    clearable: true,
    reduce: function reduce(option) {
      return option.key;
    },
    options: _ctx.bulkOptions,
    label: "label"
  }, {
    option: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (option) {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_115, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_vue_feather, {
        "class": "icon",
        type: option.icon,
        size: "16"
      }, null, 8
      /* PROPS */
      , ["type"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.label), 1
      /* TEXT */
      )])];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["class", "modelValue", "reduce", "options"]), _ctx.errors.status != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["invalid-feedback", [_ctx.errors.status != null ? 'd-block' : '']])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errors.status[0]), 3
  /* TEXT, CLASS */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_116, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_117, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_118, [_ctx.agent_id && _ctx.property_id ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    onClick: _cache[32] || (_cache[32] = function ($event) {
      return _ctx.updateBtn(), _ctx.btnLoaderAction('update');
    }),
    type: "button",
    "class": "btn btn-primary me-1"
  }, [_ctx.btnLoader.active && _ctx.btnLoader.activeContent == 'update' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_119)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([_ctx.btnLoader.active && _ctx.btnLoader.activeContent == 'update' ? 'visually-hidden' : ''])
  }, "Update", 2
  /* CLASS */
  )])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 1,
    onClick: _cache[33] || (_cache[33] = function ($event) {
      return _ctx.saveBtn(), _ctx.btnLoaderAction('save');
    }),
    type: "button",
    "class": "btn btn-primary me-1"
  }, [_ctx.btnLoader.active && _ctx.btnLoader.activeContent == 'save' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_120)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([_ctx.btnLoader.active && _ctx.btnLoader.activeContent == 'save' ? 'visually-hidden' : ''])
  }, "Save", 2
  /* CLASS */
  )]))])])])])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_121, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_PermissionError)]))])])], 512
  /* NEED_PATCH */
  )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Teleport to=\"body\">\n            <AgenciesModal \n                :recordObj=\"{\n                    recordId:recordId,\n                    actionMode:actionMode,\n                    activeStatus:activeStatus,\n                    showModal:showModal,\n                    modalName:modalName,\n                }\" \n                @refresh-parent-data=\"loadParentData\"\n                @close-modal=\"closeModal\"\n            ></AgenciesModal>\n        </Teleport> "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_FileManagerModal, {
    recordObj: {
      actionMode: _ctx.actionMode,
      activeStatus: _ctx.activeStatus,
      showModal: _ctx.showModal,
      modalName: _ctx.modalName
    },
    onRefreshParentData: _ctx.loadParentData,
    onCloseModal: _ctx.closeModal,
    onSelectedMediaFiles: _ctx.selectedMediaFiles
  }, null, 8
  /* PROPS */
  , ["recordObj", "onRefreshParentData", "onCloseModal", "onSelectedMediaFiles"])]))]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/AgencyAgentsAvatars.vue?vue&type=template&id=519858c6&ts=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/AgencyAgentsAvatars.vue?vue&type=template&id=519858c6&ts=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = ["data-bs-original-title"];
var _hoisted_2 = {
  key: 0,
  "class": "avatar avatar-lg"
};
var _hoisted_3 = ["src"];
var _hoisted_4 = {
  key: 1,
  "class": "avatar bg-light-success avatar-lg"
};
var _hoisted_5 = {
  "class": "avatar-data"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-link");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_router_link, {
    "class": "avatar-group",
    to: _ctx.appEndPoint + _ctx.pageLevelEndPoint + '/' + _ctx.agencyId
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.agents.data, function (item, index) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: index,
          "data-bs-toggle": "tooltip",
          "data-popup": "tooltip-custom",
          "data-bs-placement": "bottom",
          title: "",
          "class": "xavatar pull-up",
          "data-bs-original-title": _ctx.Helpers.getFullName(item.user)
        }, [item.user.profile && item.user.profile.avatar ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
          src: _ctx.Helpers.getMedia(item.user.profile.avatar)['path'],
          alt: "avatar"
        }, null, 8
        /* PROPS */
        , _hoisted_3)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.Helpers.getProfileShortName(item.user)), 1
        /* TEXT */
        )])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <img :src=\"Helpers.getMedia(item.user.profile.avatar)['path']\" alt=\"Avatar\" width=\"45\" height=\"45\"> ")], 8
        /* PROPS */
        , _hoisted_1);
      }), 128
      /* KEYED_FRAGMENT */
      )), _ctx.agents.total > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_router_link, {
        key: 0,
        to: _ctx.appEndPoint + _ctx.pageLevelEndPoint + '/' + _ctx.agencyId,
        "class": "align-self-center cursor-pointer ms-50 mb-0"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("+" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.agents.total), 1
          /* TEXT */
          )];
        }),
        _: 1
        /* STABLE */

      }, 8
      /* PROPS */
      , ["to"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <router-link class=\"xavatar pull-up\"\r\n            v-if=\"agents.total > 0\" :to=\"appEndPoint+pageLevelEndPoint+'/'+agencyId\" \r\n        >\r\n            <div class=\"avatar bg-light-success avatar-lg\">\r\n                <span class=\"avatar-data\">\r\n                    +{{agents.total}}\r\n                </span>\r\n            </div>\r\n        </router-link> ")];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["to"]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/PermissionError.vue?vue&type=template&id=2810f710&ts=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/PermissionError.vue?vue&type=template&id=2810f710&ts=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "d-flex align-items-center justify-content-center",
  style: {
    "min-height": "200px"
  }
};

var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
  "class": "mb-0"
}, " You don't have permission ", -1
/* HOISTED */
);

var _hoisted_3 = [_hoisted_2];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, _hoisted_3);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/ProfileAvatarAndName.vue?vue&type=template&id=f0b0df5e&ts=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/ProfileAvatarAndName.vue?vue&type=template&id=f0b0df5e&ts=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "d-flex justify-content-left align-items-center"
};
var _hoisted_2 = {
  "class": "avatar-wrapper"
};
var _hoisted_3 = {
  "class": "mr-15"
};
var _hoisted_4 = {
  key: 0,
  "class": "avatar avatar-lg"
};
var _hoisted_5 = ["src"];
var _hoisted_6 = {
  key: 1,
  "class": "avatar bg-light-success avatar-lg"
};
var _hoisted_7 = {
  "class": "avatar-content"
};
var _hoisted_8 = {
  "class": "d-flex flex-column"
};
var _hoisted_9 = {
  "class": "user_name text-body text-truncate"
};
var _hoisted_10 = {
  "class": "fw-bolder"
};
var _hoisted_11 = {
  "class": "emp_post text-muted"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", _hoisted_3, [_ctx.user.profile.avatar ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: _ctx.Helpers.getMedia(_ctx.user.profile.avatar)['path'],
    alt: "avatar"
  }, null, 8
  /* PROPS */
  , _hoisted_5)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.Helpers.getProfileShortName(_ctx.user)), 1
  /* TEXT */
  )]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.user.profile.first_name) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.user.profile.last_name), 1
  /* TEXT */
  )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.user.email), 1
  /* TEXT */
  )])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/Status.vue?vue&type=template&id=e9ff0e7a&ts=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/Status.vue?vue&type=template&id=e9ff0e7a&ts=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["badge rounded-pill text-capitalized", _ctx.statusClass])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.status), 3
  /* TEXT, CLASS */
  );
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/modals/FileManagerModal.vue?vue&type=template&id=75cba16c&ts=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/modals/FileManagerModal.vue?vue&type=template&id=75cba16c&ts=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  key: 0,
  "class": "modal-mask modal modal-overlay"
};
var _hoisted_2 = {
  "class": "modal-dialog modal-fullscreen fancy-scroll"
};
var _hoisted_3 = {
  "class": "modal-content modal-container"
};
var _hoisted_4 = {
  "class": "modal-header"
};
var _hoisted_5 = {
  key: 2,
  "class": "file-manager-content-header d-flex justify-content-between align-items-center"
};
var _hoisted_6 = {
  "class": "d-flex align-items-center fm-search"
};
var _hoisted_7 = {
  "class": "input-group input-group-merge shadow-none m-0 flex-grow-1"
};
var _hoisted_8 = {
  "class": "input-group-text border-0 bg-none"
};
var _hoisted_9 = {
  "class": "modal-body px-sm-2 pb-35 pt-0"
};
var _hoisted_10 = {
  key: 1,
  "class": "custom-file-manager file-manager-application mt-20"
};
var _hoisted_11 = {
  "class": "content-area-wrapper container-xxl p-0"
};
var _hoisted_12 = {
  "class": "file-manager-main-content"
};
var _hoisted_13 = {
  "class": "file-manager-content-body p-0 bg-none"
};
var _hoisted_14 = {
  key: 0,
  "class": "view-container"
};
var _hoisted_15 = ["value", "id"];
var _hoisted_16 = ["for"];
var _hoisted_17 = {
  "class": "card-img-top file-logo-wrapper"
};
var _hoisted_18 = ["src"];
var _hoisted_19 = ["src"];
var _hoisted_20 = {
  "class": "card-body"
};
var _hoisted_21 = {
  "class": "content-wrapper"
};
var _hoisted_22 = {
  "class": "card-text file-name mb-0"
};
var _hoisted_23 = {
  "class": "d-flex align-items-center"
};
var _hoisted_24 = ["src"];
var _hoisted_25 = {
  "class": "card-text file-size mb-0 pl-7"
};
var _hoisted_26 = {
  key: 1,
  "class": "d-none flex-grow-1 align-items-center no-result mb-3"
};

var _hoisted_27 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "data-feather": "alert-circle",
  "class": "me-50"
}, null, -1
/* HOISTED */
);

var _hoisted_28 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" No Results ");

var _hoisted_29 = [_hoisted_27, _hoisted_28];
var _hoisted_30 = {
  key: 1,
  "class": "d-flex justify-content-between align-items-center w-100"
};
var _hoisted_31 = {
  "class": "col_left"
};
var _hoisted_32 = {
  "class": "entries_showing mb-0"
};
var _hoisted_33 = {
  "class": "col_right"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_vue_feather = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("vue-feather");

  var _component_GlobalLoader = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("GlobalLoader");

  var _component_pagination = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("pagination");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "modal"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_ctx.recordObj.showModal && _ctx.recordObj.modalName == 'FileManagerModal' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_ctx.actionMode == 'show' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
        key: 0,
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return _ctx.switchBtn('add');
        }),
        "class": "btn btn-primary w-150 mr-10"
      }, "Upload Files")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.actionMode == 'add' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
        key: 1,
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return _ctx.switchBtn('show');
        }),
        "class": "btn btn-primary w-150 mr-10"
      }, "Media Library")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.actionMode == 'show' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_vue_feather, {
        "class": "icon",
        type: "search",
        size: "14"
      })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        onInput: _cache[2] || (_cache[2] = function ($event) {
          return _ctx.getItems();
        }),
        "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
          return _ctx.search.name = $event;
        }),
        type: "text",
        "class": "form-control files-filter border-0 bg-transparent",
        placeholder: "Search"
      }, null, 544
      /* HYDRATE_EVENTS, NEED_PATCH */
      ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.search.name]])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        onClick: _cache[4] || (_cache[4] = function ($event) {
          return _ctx.closeModal();
        }),
        type: "button",
        "class": "btn-close",
        "data-bs-dismiss": "modal",
        "aria-label": "Close"
      })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_GlobalLoader, {
        loaderProps: _ctx.loaderSettings
      }, null, 8
      /* PROPS */
      , ["loaderProps"]), _ctx.actionMode == 'add' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("input", {
        key: 0,
        type: "file",
        "class": "form-control",
        onChange: _cache[5] || (_cache[5] = //@ts-ignore
        function () {
          return _ctx.addBtn && _ctx.addBtn.apply(_ctx, arguments);
        }),
        multiple: ""
      }, null, 32
      /* HYDRATE_EVENTS */
      )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.actionMode == 'show' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Files Container Starts "), _ctx.uploadedFiles.total > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_14, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.uploadedFiles.data, function (item, index) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          "class": "card file-manager-item file fancyCheckbox",
          key: index
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
          "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
            return _ctx.selectedMediaFiles = $event;
          }),
          value: item,
          type: "checkbox",
          "class": "checkbox",
          id: item.id
        }, null, 8
        /* PROPS */
        , _hoisted_15), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, _ctx.selectedMediaFiles]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "class": "checkbox-label",
          "for": item.id
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_ctx.Helpers.findInArray(item.thumbnails, {
          thumbnail: 'thumbnail'
        }) != false ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("img", {
          key: 0,
          src: _ctx.Helpers.findInArray(item.thumbnails, {
            thumbnail: 'thumbnail'
          })['path'],
          "class": "w-100"
        }, null, 8
        /* PROPS */
        , _hoisted_18)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("img", {
          key: 1,
          src: item.path,
          "class": "w-100"
        }, null, 8
        /* PROPS */
        , _hoisted_19))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + "." + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.extension), 1
        /* TEXT */
        )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
          src: _ctx.Helpers.mediaIcon(item.extension)['icon'],
          alt: "file-icon",
          height: "20"
        }, null, 8
        /* PROPS */
        , _hoisted_24), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.Helpers.fileSize(item.size)), 1
        /* TEXT */
        )])])], 8
        /* PROPS */
        , _hoisted_16)]);
      }), 128
      /* KEYED_FRAGMENT */
      ))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_26, _hoisted_29)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" /Files Container Ends ")])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _ctx.actionMode == 'show' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["modal-footer c-modal-footer filemanager-footer", [_ctx.selectedMediaFiles.length > 0 ? 'bg-primary text-right' : 'justify-content-between']])
      }, [_ctx.selectedMediaFiles.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([_ctx.selectedMediaFiles.length == 0 ? 'd-flex justify-content-between align-items-center w-100' : ''])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        onClick: _cache[7] || (_cache[7] = function ($event) {
          return _ctx.selectBtn();
        }),
        type: "button",
        "class": "btn btn-danger me-1"
      }, "Select"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        onClick: _cache[8] || (_cache[8] = function ($event) {
          return _ctx.closeModal();
        }),
        type: "reset",
        "class": "btn btn-white text-white",
        "data-bs-dismiss": "modal",
        "aria-label": "Close",
        ref: "Close"
      }, "Cancel", 512
      /* NEED_PATCH */
      )], 2
      /* CLASS */
      )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.uploadedFiles.total > 0 && _ctx.selectedMediaFiles.length == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, "Showing " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.uploadedFiles.from) + " to " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.uploadedFiles.to) + " of " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.uploadedFiles.total) + " entries", 1
      /* TEXT */
      )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_pagination, {
        "class": "mb-0",
        data: _ctx.uploadedFiles,
        limit: 2,
        onPaginationChangePage: _ctx.getItems
      }, null, 8
      /* PROPS */
      , ["data", "onPaginationChangePage"])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2
      /* CLASS */
      )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1
    /* STABLE */

  });
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/Loader.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/Loader.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var vue3_loading_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue3-loading-overlay */ "./node_modules/vue3-loading-overlay/dist/index.js");
/* harmony import */ var vue3_loading_overlay_dist_vue3_loading_overlay_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue3-loading-overlay/dist/vue3-loading-overlay.css */ "./node_modules/vue3-loading-overlay/dist/vue3-loading-overlay.css");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: "global-loader",
  components: {
    Loading: vue3_loading_overlay__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    // propHeightChanged:Number,
    // loaderProps:Object,
    loaderProps: {
      type: Object,
      required: true
    }
  },
  watch: {
    loaderProps: {
      handler: function handler(val, oldVal) {
        this.loaderSettings = val;
      },
      deep: true
    }
  },
  setup: function setup(props) {
    var isLoadingFullPage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var loaderSettings = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(props.loaderProps);
    var color = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("#ffffff");
    var backgroundColor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("#ff0000");
    var opacity = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("0.9");

    var onCancelLoader = function onCancelLoader() {
      console.log('User cancelled the loader.');
    };

    return {
      isLoadingFullPage: isLoadingFullPage,
      loaderSettings: loaderSettings,
      onCancelLoader: onCancelLoader,
      color: color,
      backgroundColor: backgroundColor,
      opacity: opacity
    };
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/Loader.vue?vue&type=template&id=e42e3f38":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/Loader.vue?vue&type=template&id=e42e3f38 ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_loading, {
    active: _ctx.loaderSettings.active,
    "can-cancel": false,
    "on-cancel": _ctx.onCancelLoader,
    "is-full-page": _ctx.isLoadingFullPage,
    color: _ctx.color,
    "background-color": _ctx.backgroundColor,
    opacity: _ctx.opacity
  }, null, 8
  /* PROPS */
  , ["active", "on-cancel", "is-full-page", "color", "background-color", "opacity"]);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue3-loading-overlay/dist/vue3-loading-overlay.css":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue3-loading-overlay/dist/vue3-loading-overlay.css ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".vld-shown {\r\n  overflow: hidden;\r\n}\r\n\r\n.vld-overlay {\r\n  bottom: 0;\r\n  left: 0;\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  align-items: center;\r\n  display: none;\r\n  justify-content: center;\r\n  overflow: hidden;\r\n  z-index: 9999;\r\n}\r\n\r\n.vld-overlay.is-active {\r\n  display: flex;\r\n}\r\n\r\n.vld-overlay.is-full-page {\r\n  z-index: 9999;\r\n  position: fixed;\r\n}\r\n\r\n.vld-overlay .vld-background {\r\n  bottom: 0;\r\n  left: 0;\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  background: #fff;\r\n  opacity: 0.5;\r\n}\r\n\r\n.vld-overlay .vld-icon, .vld-parent {\r\n  position: relative;\r\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/vue3-loading-overlay/dist/vue3-loading-overlay.css":
/*!*************************************************************************!*\
  !*** ./node_modules/vue3-loading-overlay/dist/vue3-loading-overlay.css ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_cjs_js_clonedRuleSet_9_use_1_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_vue3_loading_overlay_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./vue3-loading-overlay.css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue3-loading-overlay/dist/vue3-loading-overlay.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_vue3_loading_overlay_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_vue3_loading_overlay_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/sweetalert2/dist/sweetalert2.all.js":
/*!**********************************************************!*\
  !*** ./node_modules/sweetalert2/dist/sweetalert2.all.js ***!
  \**********************************************************/
/***/ (function(module) {

/*!
* sweetalert2 v11.4.29
* Released under the MIT License.
*/
(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, function () { 'use strict';

  const consolePrefix = 'SweetAlert2:';
  /**
   * Filter the unique values into a new array
   *
   * @param {Array} arr
   * @returns {Array}
   */

  const uniqueArray = arr => {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      if (result.indexOf(arr[i]) === -1) {
        result.push(arr[i]);
      }
    }

    return result;
  };
  /**
   * Capitalize the first letter of a string
   *
   * @param {string} str
   * @returns {string}
   */

  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);
  /**
   * Standardize console warnings
   *
   * @param {string | Array} message
   */

  const warn = message => {
    console.warn("".concat(consolePrefix, " ").concat(typeof message === 'object' ? message.join(' ') : message));
  };
  /**
   * Standardize console errors
   *
   * @param {string} message
   */

  const error = message => {
    console.error("".concat(consolePrefix, " ").concat(message));
  };
  /**
   * Private global state for `warnOnce`
   *
   * @type {Array}
   * @private
   */

  const previousWarnOnceMessages = [];
  /**
   * Show a console warning, but only if it hasn't already been shown
   *
   * @param {string} message
   */

  const warnOnce = message => {
    if (!previousWarnOnceMessages.includes(message)) {
      previousWarnOnceMessages.push(message);
      warn(message);
    }
  };
  /**
   * Show a one-time console warning about deprecated params/methods
   *
   * @param {string} deprecatedParam
   * @param {string} useInstead
   */

  const warnAboutDeprecation = (deprecatedParam, useInstead) => {
    warnOnce("\"".concat(deprecatedParam, "\" is deprecated and will be removed in the next major release. Please use \"").concat(useInstead, "\" instead."));
  };
  /**
   * If `arg` is a function, call it (with no arguments or context) and return the result.
   * Otherwise, just pass the value through
   *
   * @param {Function | any} arg
   * @returns {any}
   */

  const callIfFunction = arg => typeof arg === 'function' ? arg() : arg;
  /**
   * @param {any} arg
   * @returns {boolean}
   */

  const hasToPromiseFn = arg => arg && typeof arg.toPromise === 'function';
  /**
   * @param {any} arg
   * @returns {Promise}
   */

  const asPromise = arg => hasToPromiseFn(arg) ? arg.toPromise() : Promise.resolve(arg);
  /**
   * @param {any} arg
   * @returns {boolean}
   */

  const isPromise = arg => arg && Promise.resolve(arg) === arg;
  /**
   * @param {Array} arr
   * @returns {any}
   */

  const getRandomElement = arr => arr[Math.floor(Math.random() * arr.length)];

  const defaultParams = {
    title: '',
    titleText: '',
    text: '',
    html: '',
    footer: '',
    icon: undefined,
    iconColor: undefined,
    iconHtml: undefined,
    template: undefined,
    toast: false,
    showClass: {
      popup: 'swal2-show',
      backdrop: 'swal2-backdrop-show',
      icon: 'swal2-icon-show'
    },
    hideClass: {
      popup: 'swal2-hide',
      backdrop: 'swal2-backdrop-hide',
      icon: 'swal2-icon-hide'
    },
    customClass: {},
    target: 'body',
    color: undefined,
    backdrop: true,
    heightAuto: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    stopKeydownPropagation: true,
    keydownListenerCapture: false,
    showConfirmButton: true,
    showDenyButton: false,
    showCancelButton: false,
    preConfirm: undefined,
    preDeny: undefined,
    confirmButtonText: 'OK',
    confirmButtonAriaLabel: '',
    confirmButtonColor: undefined,
    denyButtonText: 'No',
    denyButtonAriaLabel: '',
    denyButtonColor: undefined,
    cancelButtonText: 'Cancel',
    cancelButtonAriaLabel: '',
    cancelButtonColor: undefined,
    buttonsStyling: true,
    reverseButtons: false,
    focusConfirm: true,
    focusDeny: false,
    focusCancel: false,
    returnFocus: true,
    showCloseButton: false,
    closeButtonHtml: '&times;',
    closeButtonAriaLabel: 'Close this dialog',
    loaderHtml: '',
    showLoaderOnConfirm: false,
    showLoaderOnDeny: false,
    imageUrl: undefined,
    imageWidth: undefined,
    imageHeight: undefined,
    imageAlt: '',
    timer: undefined,
    timerProgressBar: false,
    width: undefined,
    padding: undefined,
    background: undefined,
    input: undefined,
    inputPlaceholder: '',
    inputLabel: '',
    inputValue: '',
    inputOptions: {},
    inputAutoTrim: true,
    inputAttributes: {},
    inputValidator: undefined,
    returnInputValueOnDeny: false,
    validationMessage: undefined,
    grow: false,
    position: 'center',
    progressSteps: [],
    currentProgressStep: undefined,
    progressStepsDistance: undefined,
    willOpen: undefined,
    didOpen: undefined,
    didRender: undefined,
    willClose: undefined,
    didClose: undefined,
    didDestroy: undefined,
    scrollbarPadding: true
  };
  const updatableParams = ['allowEscapeKey', 'allowOutsideClick', 'background', 'buttonsStyling', 'cancelButtonAriaLabel', 'cancelButtonColor', 'cancelButtonText', 'closeButtonAriaLabel', 'closeButtonHtml', 'color', 'confirmButtonAriaLabel', 'confirmButtonColor', 'confirmButtonText', 'currentProgressStep', 'customClass', 'denyButtonAriaLabel', 'denyButtonColor', 'denyButtonText', 'didClose', 'didDestroy', 'footer', 'hideClass', 'html', 'icon', 'iconColor', 'iconHtml', 'imageAlt', 'imageHeight', 'imageUrl', 'imageWidth', 'preConfirm', 'preDeny', 'progressSteps', 'returnFocus', 'reverseButtons', 'showCancelButton', 'showCloseButton', 'showConfirmButton', 'showDenyButton', 'text', 'title', 'titleText', 'willClose'];
  const deprecatedParams = {};
  const toastIncompatibleParams = ['allowOutsideClick', 'allowEnterKey', 'backdrop', 'focusConfirm', 'focusDeny', 'focusCancel', 'returnFocus', 'heightAuto', 'keydownListenerCapture'];
  /**
   * Is valid parameter
   *
   * @param {string} paramName
   * @returns {boolean}
   */

  const isValidParameter = paramName => {
    return Object.prototype.hasOwnProperty.call(defaultParams, paramName);
  };
  /**
   * Is valid parameter for Swal.update() method
   *
   * @param {string} paramName
   * @returns {boolean}
   */

  const isUpdatableParameter = paramName => {
    return updatableParams.indexOf(paramName) !== -1;
  };
  /**
   * Is deprecated parameter
   *
   * @param {string} paramName
   * @returns {string | undefined}
   */

  const isDeprecatedParameter = paramName => {
    return deprecatedParams[paramName];
  };
  /**
   * @param {string} param
   */

  const checkIfParamIsValid = param => {
    if (!isValidParameter(param)) {
      warn("Unknown parameter \"".concat(param, "\""));
    }
  };
  /**
   * @param {string} param
   */


  const checkIfToastParamIsValid = param => {
    if (toastIncompatibleParams.includes(param)) {
      warn("The parameter \"".concat(param, "\" is incompatible with toasts"));
    }
  };
  /**
   * @param {string} param
   */


  const checkIfParamIsDeprecated = param => {
    if (isDeprecatedParameter(param)) {
      warnAboutDeprecation(param, isDeprecatedParameter(param));
    }
  };
  /**
   * Show relevant warnings for given params
   *
   * @param {SweetAlertOptions} params
   */


  const showWarningsForParams = params => {
    if (!params.backdrop && params.allowOutsideClick) {
      warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
    }

    for (const param in params) {
      checkIfParamIsValid(param);

      if (params.toast) {
        checkIfToastParamIsValid(param);
      }

      checkIfParamIsDeprecated(param);
    }
  };

  const swalPrefix = 'swal2-';
  /**
   * @param {string[]} items
   * @returns {object}
   */

  const prefix = items => {
    const result = {};

    for (const i in items) {
      result[items[i]] = swalPrefix + items[i];
    }

    return result;
  };
  const swalClasses = prefix(['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'no-transition', 'toast', 'toast-shown', 'show', 'hide', 'close', 'title', 'html-container', 'actions', 'confirm', 'deny', 'cancel', 'default-outline', 'footer', 'icon', 'icon-content', 'image', 'input', 'file', 'range', 'select', 'radio', 'checkbox', 'label', 'textarea', 'inputerror', 'input-label', 'validation-message', 'progress-steps', 'active-progress-step', 'progress-step', 'progress-step-line', 'loader', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen', 'rtl', 'timer-progress-bar', 'timer-progress-bar-container', 'scrollbar-measure', 'icon-success', 'icon-warning', 'icon-info', 'icon-question', 'icon-error', 'no-war']);
  const iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

  /**
   * Gets the popup container which contains the backdrop and the popup itself.
   *
   * @returns {HTMLElement | null}
   */

  const getContainer = () => document.body.querySelector(".".concat(swalClasses.container));
  /**
   * @param {string} selectorString
   * @returns {HTMLElement | null}
   */

  const elementBySelector = selectorString => {
    const container = getContainer();
    return container ? container.querySelector(selectorString) : null;
  };
  /**
   * @param {string} className
   * @returns {HTMLElement | null}
   */

  const elementByClass = className => {
    return elementBySelector(".".concat(className));
  };
  /**
   * @returns {HTMLElement | null}
   */


  const getPopup = () => elementByClass(swalClasses.popup);
  /**
   * @returns {HTMLElement | null}
   */

  const getIcon = () => elementByClass(swalClasses.icon);
  /**
   * @returns {HTMLElement | null}
   */

  const getTitle = () => elementByClass(swalClasses.title);
  /**
   * @returns {HTMLElement | null}
   */

  const getHtmlContainer = () => elementByClass(swalClasses['html-container']);
  /**
   * @returns {HTMLElement | null}
   */

  const getImage = () => elementByClass(swalClasses.image);
  /**
   * @returns {HTMLElement | null}
   */

  const getProgressSteps = () => elementByClass(swalClasses['progress-steps']);
  /**
   * @returns {HTMLElement | null}
   */

  const getValidationMessage = () => elementByClass(swalClasses['validation-message']);
  /**
   * @returns {HTMLElement | null}
   */

  const getConfirmButton = () => elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.confirm));
  /**
   * @returns {HTMLElement | null}
   */

  const getDenyButton = () => elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.deny));
  /**
   * @returns {HTMLElement | null}
   */

  const getInputLabel = () => elementByClass(swalClasses['input-label']);
  /**
   * @returns {HTMLElement | null}
   */

  const getLoader = () => elementBySelector(".".concat(swalClasses.loader));
  /**
   * @returns {HTMLElement | null}
   */

  const getCancelButton = () => elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.cancel));
  /**
   * @returns {HTMLElement | null}
   */

  const getActions = () => elementByClass(swalClasses.actions);
  /**
   * @returns {HTMLElement | null}
   */

  const getFooter = () => elementByClass(swalClasses.footer);
  /**
   * @returns {HTMLElement | null}
   */

  const getTimerProgressBar = () => elementByClass(swalClasses['timer-progress-bar']);
  /**
   * @returns {HTMLElement | null}
   */

  const getCloseButton = () => elementByClass(swalClasses.close); // https://github.com/jkup/focusable/blob/master/index.js

  const focusable = "\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex=\"0\"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n";
  /**
   * @returns {HTMLElement[]}
   */

  const getFocusableElements = () => {
    const focusableElementsWithTabindex = Array.from(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')) // sort according to tabindex
    .sort((a, b) => {
      const tabindexA = parseInt(a.getAttribute('tabindex'));
      const tabindexB = parseInt(b.getAttribute('tabindex'));

      if (tabindexA > tabindexB) {
        return 1;
      } else if (tabindexA < tabindexB) {
        return -1;
      }

      return 0;
    });
    const otherFocusableElements = Array.from(getPopup().querySelectorAll(focusable)).filter(el => el.getAttribute('tabindex') !== '-1');
    return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements)).filter(el => isVisible(el));
  };
  /**
   * @returns {boolean}
   */

  const isModal = () => {
    return hasClass(document.body, swalClasses.shown) && !hasClass(document.body, swalClasses['toast-shown']) && !hasClass(document.body, swalClasses['no-backdrop']);
  };
  /**
   * @returns {boolean}
   */

  const isToast = () => {
    return getPopup() && hasClass(getPopup(), swalClasses.toast);
  };
  /**
   * @returns {boolean}
   */

  const isLoading = () => {
    return getPopup().hasAttribute('data-loading');
  };

  const states = {
    previousBodyPadding: null
  };
  /**
   * Securely set innerHTML of an element
   * https://github.com/sweetalert2/sweetalert2/issues/1926
   *
   * @param {HTMLElement} elem
   * @param {string} html
   */

  const setInnerHtml = (elem, html) => {
    elem.textContent = '';

    if (html) {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(html, "text/html");
      Array.from(parsed.querySelector('head').childNodes).forEach(child => {
        elem.appendChild(child);
      });
      Array.from(parsed.querySelector('body').childNodes).forEach(child => {
        elem.appendChild(child);
      });
    }
  };
  /**
   * @param {HTMLElement} elem
   * @param {string} className
   * @returns {boolean}
   */

  const hasClass = (elem, className) => {
    if (!className) {
      return false;
    }

    const classList = className.split(/\s+/);

    for (let i = 0; i < classList.length; i++) {
      if (!elem.classList.contains(classList[i])) {
        return false;
      }
    }

    return true;
  };
  /**
   * @param {HTMLElement} elem
   * @param {SweetAlertOptions} params
   */

  const removeCustomClasses = (elem, params) => {
    Array.from(elem.classList).forEach(className => {
      if (!Object.values(swalClasses).includes(className) && !Object.values(iconTypes).includes(className) && !Object.values(params.showClass).includes(className)) {
        elem.classList.remove(className);
      }
    });
  };
  /**
   * @param {HTMLElement} elem
   * @param {SweetAlertOptions} params
   * @param {string} className
   */


  const applyCustomClass = (elem, params, className) => {
    removeCustomClasses(elem, params);

    if (params.customClass && params.customClass[className]) {
      if (typeof params.customClass[className] !== 'string' && !params.customClass[className].forEach) {
        return warn("Invalid type of customClass.".concat(className, "! Expected string or iterable object, got \"").concat(typeof params.customClass[className], "\""));
      }

      addClass(elem, params.customClass[className]);
    }
  };
  /**
   * @param {HTMLElement} popup
   * @param {import('./renderers/renderInput').InputClass} inputClass
   * @returns {HTMLInputElement | null}
   */

  const getInput = (popup, inputClass) => {
    if (!inputClass) {
      return null;
    }

    switch (inputClass) {
      case 'select':
      case 'textarea':
      case 'file':
        return popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses[inputClass]));

      case 'checkbox':
        return popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses.checkbox, " input"));

      case 'radio':
        return popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses.radio, " input:checked")) || popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses.radio, " input:first-child"));

      case 'range':
        return popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses.range, " input"));

      default:
        return popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses.input));
    }
  };
  /**
   * @param {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement} input
   */

  const focusInput = input => {
    input.focus(); // place cursor at end of text in text input

    if (input.type !== 'file') {
      // http://stackoverflow.com/a/2345915
      const val = input.value;
      input.value = '';
      input.value = val;
    }
  };
  /**
   * @param {HTMLElement | HTMLElement[] | null} target
   * @param {string | string[] | readonly string[]} classList
   * @param {boolean} condition
   */

  const toggleClass = (target, classList, condition) => {
    if (!target || !classList) {
      return;
    }

    if (typeof classList === 'string') {
      classList = classList.split(/\s+/).filter(Boolean);
    }

    classList.forEach(className => {
      if (Array.isArray(target)) {
        target.forEach(elem => {
          condition ? elem.classList.add(className) : elem.classList.remove(className);
        });
      } else {
        condition ? target.classList.add(className) : target.classList.remove(className);
      }
    });
  };
  /**
   * @param {HTMLElement | HTMLElement[] | null} target
   * @param {string | string[] | readonly string[]} classList
   */

  const addClass = (target, classList) => {
    toggleClass(target, classList, true);
  };
  /**
   * @param {HTMLElement | HTMLElement[] | null} target
   * @param {string | string[] | readonly string[]} classList
   */

  const removeClass = (target, classList) => {
    toggleClass(target, classList, false);
  };
  /**
   * Get direct child of an element by class name
   *
   * @param {HTMLElement} elem
   * @param {string} className
   * @returns {HTMLElement | null}
   */

  const getDirectChildByClass = (elem, className) => {
    const children = Array.from(elem.children);

    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      if (child instanceof HTMLElement && hasClass(child, className)) {
        return child;
      }
    }
  };
  /**
   * @param {HTMLElement} elem
   * @param {string} property
   * @param {*} value
   */

  const applyNumericalStyle = (elem, property, value) => {
    if (value === "".concat(parseInt(value))) {
      value = parseInt(value);
    }

    if (value || parseInt(value) === 0) {
      elem.style[property] = typeof value === 'number' ? "".concat(value, "px") : value;
    } else {
      elem.style.removeProperty(property);
    }
  };
  /**
   * @param {HTMLElement} elem
   * @param {string} display
   */

  const show = function (elem) {
    let display = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'flex';
    elem.style.display = display;
  };
  /**
   * @param {HTMLElement} elem
   */

  const hide = elem => {
    elem.style.display = 'none';
  };
  /**
   * @param {HTMLElement} parent
   * @param {string} selector
   * @param {string} property
   * @param {string} value
   */

  const setStyle = (parent, selector, property, value) => {
    /** @type {HTMLElement} */
    const el = parent.querySelector(selector);

    if (el) {
      el.style[property] = value;
    }
  };
  /**
   * @param {HTMLElement} elem
   * @param {any} condition
   * @param {string} display
   */

  const toggle = function (elem, condition) {
    let display = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'flex';
    condition ? show(elem, display) : hide(elem);
  };
  /**
   * borrowed from jquery $(elem).is(':visible') implementation
   *
   * @param {HTMLElement} elem
   * @returns {boolean}
   */

  const isVisible = elem => !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));
  /**
   * @returns {boolean}
   */

  const allButtonsAreHidden = () => !isVisible(getConfirmButton()) && !isVisible(getDenyButton()) && !isVisible(getCancelButton());
  /**
   * @returns {boolean}
   */

  const isScrollable = elem => !!(elem.scrollHeight > elem.clientHeight);
  /**
   * borrowed from https://stackoverflow.com/a/46352119
   *
   * @param {HTMLElement} elem
   * @returns {boolean}
   */

  const hasCssAnimation = elem => {
    const style = window.getComputedStyle(elem);
    const animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
    const transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');
    return animDuration > 0 || transDuration > 0;
  };
  /**
   * @param {number} timer
   * @param {boolean} reset
   */

  const animateTimerProgressBar = function (timer) {
    let reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const timerProgressBar = getTimerProgressBar();

    if (isVisible(timerProgressBar)) {
      if (reset) {
        timerProgressBar.style.transition = 'none';
        timerProgressBar.style.width = '100%';
      }

      setTimeout(() => {
        timerProgressBar.style.transition = "width ".concat(timer / 1000, "s linear");
        timerProgressBar.style.width = '0%';
      }, 10);
    }
  };
  const stopTimerProgressBar = () => {
    const timerProgressBar = getTimerProgressBar();
    const timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    timerProgressBar.style.removeProperty('transition');
    timerProgressBar.style.width = '100%';
    const timerProgressBarFullWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    const timerProgressBarPercent = timerProgressBarWidth / timerProgressBarFullWidth * 100;
    timerProgressBar.style.removeProperty('transition');
    timerProgressBar.style.width = "".concat(timerProgressBarPercent, "%");
  };

  /**
   * Detect Node env
   *
   * @returns {boolean}
   */
  const isNodeEnv = () => typeof window === 'undefined' || typeof document === 'undefined';

  const RESTORE_FOCUS_TIMEOUT = 100;

  /** @type {GlobalState} */

  const globalState = {};

  const focusPreviousActiveElement = () => {
    if (globalState.previousActiveElement instanceof HTMLElement) {
      globalState.previousActiveElement.focus();
      globalState.previousActiveElement = null;
    } else if (document.body) {
      document.body.focus();
    }
  };
  /**
   * Restore previous active (focused) element
   *
   * @param {boolean} returnFocus
   * @returns {Promise}
   */


  const restoreActiveElement = returnFocus => {
    return new Promise(resolve => {
      if (!returnFocus) {
        return resolve();
      }

      const x = window.scrollX;
      const y = window.scrollY;
      globalState.restoreFocusTimeout = setTimeout(() => {
        focusPreviousActiveElement();
        resolve();
      }, RESTORE_FOCUS_TIMEOUT); // issues/900

      window.scrollTo(x, y);
    });
  };

  const sweetHTML = "\n <div aria-labelledby=\"".concat(swalClasses.title, "\" aria-describedby=\"").concat(swalClasses['html-container'], "\" class=\"").concat(swalClasses.popup, "\" tabindex=\"-1\">\n   <button type=\"button\" class=\"").concat(swalClasses.close, "\"></button>\n   <ul class=\"").concat(swalClasses['progress-steps'], "\"></ul>\n   <div class=\"").concat(swalClasses.icon, "\"></div>\n   <img class=\"").concat(swalClasses.image, "\" />\n   <h2 class=\"").concat(swalClasses.title, "\" id=\"").concat(swalClasses.title, "\"></h2>\n   <div class=\"").concat(swalClasses['html-container'], "\" id=\"").concat(swalClasses['html-container'], "\"></div>\n   <input class=\"").concat(swalClasses.input, "\" />\n   <input type=\"file\" class=\"").concat(swalClasses.file, "\" />\n   <div class=\"").concat(swalClasses.range, "\">\n     <input type=\"range\" />\n     <output></output>\n   </div>\n   <select class=\"").concat(swalClasses.select, "\"></select>\n   <div class=\"").concat(swalClasses.radio, "\"></div>\n   <label for=\"").concat(swalClasses.checkbox, "\" class=\"").concat(swalClasses.checkbox, "\">\n     <input type=\"checkbox\" />\n     <span class=\"").concat(swalClasses.label, "\"></span>\n   </label>\n   <textarea class=\"").concat(swalClasses.textarea, "\"></textarea>\n   <div class=\"").concat(swalClasses['validation-message'], "\" id=\"").concat(swalClasses['validation-message'], "\"></div>\n   <div class=\"").concat(swalClasses.actions, "\">\n     <div class=\"").concat(swalClasses.loader, "\"></div>\n     <button type=\"button\" class=\"").concat(swalClasses.confirm, "\"></button>\n     <button type=\"button\" class=\"").concat(swalClasses.deny, "\"></button>\n     <button type=\"button\" class=\"").concat(swalClasses.cancel, "\"></button>\n   </div>\n   <div class=\"").concat(swalClasses.footer, "\"></div>\n   <div class=\"").concat(swalClasses['timer-progress-bar-container'], "\">\n     <div class=\"").concat(swalClasses['timer-progress-bar'], "\"></div>\n   </div>\n </div>\n").replace(/(^|\n)\s*/g, '');
  /**
   * @returns {boolean}
   */

  const resetOldContainer = () => {
    const oldContainer = getContainer();

    if (!oldContainer) {
      return false;
    }

    oldContainer.remove();
    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['has-column']]);
    return true;
  };

  const resetValidationMessage = () => {
    globalState.currentInstance.resetValidationMessage();
  };

  const addInputChangeListeners = () => {
    const popup = getPopup();
    const input = getDirectChildByClass(popup, swalClasses.input);
    const file = getDirectChildByClass(popup, swalClasses.file);
    /** @type {HTMLInputElement} */

    const range = popup.querySelector(".".concat(swalClasses.range, " input"));
    /** @type {HTMLOutputElement} */

    const rangeOutput = popup.querySelector(".".concat(swalClasses.range, " output"));
    const select = getDirectChildByClass(popup, swalClasses.select);
    /** @type {HTMLInputElement} */

    const checkbox = popup.querySelector(".".concat(swalClasses.checkbox, " input"));
    const textarea = getDirectChildByClass(popup, swalClasses.textarea);
    input.oninput = resetValidationMessage;
    file.onchange = resetValidationMessage;
    select.onchange = resetValidationMessage;
    checkbox.onchange = resetValidationMessage;
    textarea.oninput = resetValidationMessage;

    range.oninput = () => {
      resetValidationMessage();
      rangeOutput.value = range.value;
    };

    range.onchange = () => {
      resetValidationMessage();
      rangeOutput.value = range.value;
    };
  };
  /**
   * @param {string | HTMLElement} target
   * @returns {HTMLElement}
   */


  const getTarget = target => typeof target === 'string' ? document.querySelector(target) : target;
  /**
   * @param {SweetAlertOptions} params
   */


  const setupAccessibility = params => {
    const popup = getPopup();
    popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
    popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');

    if (!params.toast) {
      popup.setAttribute('aria-modal', 'true');
    }
  };
  /**
   * @param {HTMLElement} targetElement
   */


  const setupRTL = targetElement => {
    if (window.getComputedStyle(targetElement).direction === 'rtl') {
      addClass(getContainer(), swalClasses.rtl);
    }
  };
  /**
   * Add modal + backdrop + no-war message for Russians to DOM
   *
   * @param {SweetAlertOptions} params
   */


  const init = params => {
    // Clean up the old popup container if it exists
    const oldContainerExisted = resetOldContainer();
    /* istanbul ignore if */

    if (isNodeEnv()) {
      error('SweetAlert2 requires document to initialize');
      return;
    }

    const container = document.createElement('div');
    container.className = swalClasses.container;

    if (oldContainerExisted) {
      addClass(container, swalClasses['no-transition']);
    }

    setInnerHtml(container, sweetHTML);
    const targetElement = getTarget(params.target);
    targetElement.appendChild(container);
    setupAccessibility(params);
    setupRTL(targetElement);
    addInputChangeListeners();
  };

  /**
   * @param {HTMLElement | object | string} param
   * @param {HTMLElement} target
   */

  const parseHtmlToContainer = (param, target) => {
    // DOM element
    if (param instanceof HTMLElement) {
      target.appendChild(param);
    } // Object
    else if (typeof param === 'object') {
      handleObject(param, target);
    } // Plain string
    else if (param) {
      setInnerHtml(target, param);
    }
  };
  /**
   * @param {object} param
   * @param {HTMLElement} target
   */

  const handleObject = (param, target) => {
    // JQuery element(s)
    if (param.jquery) {
      handleJqueryElem(target, param);
    } // For other objects use their string representation
    else {
      setInnerHtml(target, param.toString());
    }
  };
  /**
   * @param {HTMLElement} target
   * @param {HTMLElement} elem
   */


  const handleJqueryElem = (target, elem) => {
    target.textContent = '';

    if (0 in elem) {
      for (let i = 0; (i in elem); i++) {
        target.appendChild(elem[i].cloneNode(true));
      }
    } else {
      target.appendChild(elem.cloneNode(true));
    }
  };

  /**
   * @returns {'webkitAnimationEnd' | 'animationend' | false}
   */

  const animationEndEvent = (() => {
    // Prevent run in Node env

    /* istanbul ignore if */
    if (isNodeEnv()) {
      return false;
    }

    const testEl = document.createElement('div');
    const transEndEventNames = {
      WebkitAnimation: 'webkitAnimationEnd',
      // Chrome, Safari and Opera
      animation: 'animationend' // Standard syntax

    };

    for (const i in transEndEventNames) {
      if (Object.prototype.hasOwnProperty.call(transEndEventNames, i) && typeof testEl.style[i] !== 'undefined') {
        return transEndEventNames[i];
      }
    }

    return false;
  })();

  /**
   * Measure scrollbar width for padding body during modal show/hide
   * https://github.com/twbs/bootstrap/blob/master/js/src/modal.js
   *
   * @returns {number}
   */

  const measureScrollbar = () => {
    const scrollDiv = document.createElement('div');
    scrollDiv.className = swalClasses['scrollbar-measure'];
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };

  /**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */

  const renderActions = (instance, params) => {
    const actions = getActions();
    const loader = getLoader(); // Actions (buttons) wrapper

    if (!params.showConfirmButton && !params.showDenyButton && !params.showCancelButton) {
      hide(actions);
    } else {
      show(actions);
    } // Custom class


    applyCustomClass(actions, params, 'actions'); // Render all the buttons

    renderButtons(actions, loader, params); // Loader

    setInnerHtml(loader, params.loaderHtml);
    applyCustomClass(loader, params, 'loader');
  };
  /**
   * @param {HTMLElement} actions
   * @param {HTMLElement} loader
   * @param {SweetAlertOptions} params
   */

  function renderButtons(actions, loader, params) {
    const confirmButton = getConfirmButton();
    const denyButton = getDenyButton();
    const cancelButton = getCancelButton(); // Render buttons

    renderButton(confirmButton, 'confirm', params);
    renderButton(denyButton, 'deny', params);
    renderButton(cancelButton, 'cancel', params);
    handleButtonsStyling(confirmButton, denyButton, cancelButton, params);

    if (params.reverseButtons) {
      if (params.toast) {
        actions.insertBefore(cancelButton, confirmButton);
        actions.insertBefore(denyButton, confirmButton);
      } else {
        actions.insertBefore(cancelButton, loader);
        actions.insertBefore(denyButton, loader);
        actions.insertBefore(confirmButton, loader);
      }
    }
  }
  /**
   * @param {HTMLElement} confirmButton
   * @param {HTMLElement} denyButton
   * @param {HTMLElement} cancelButton
   * @param {SweetAlertOptions} params
   */


  function handleButtonsStyling(confirmButton, denyButton, cancelButton, params) {
    if (!params.buttonsStyling) {
      return removeClass([confirmButton, denyButton, cancelButton], swalClasses.styled);
    }

    addClass([confirmButton, denyButton, cancelButton], swalClasses.styled); // Buttons background colors

    if (params.confirmButtonColor) {
      confirmButton.style.backgroundColor = params.confirmButtonColor;
      addClass(confirmButton, swalClasses['default-outline']);
    }

    if (params.denyButtonColor) {
      denyButton.style.backgroundColor = params.denyButtonColor;
      addClass(denyButton, swalClasses['default-outline']);
    }

    if (params.cancelButtonColor) {
      cancelButton.style.backgroundColor = params.cancelButtonColor;
      addClass(cancelButton, swalClasses['default-outline']);
    }
  }
  /**
   * @param {HTMLElement} button
   * @param {'confirm' | 'deny' | 'cancel'} buttonType
   * @param {SweetAlertOptions} params
   */


  function renderButton(button, buttonType, params) {
    toggle(button, params["show".concat(capitalizeFirstLetter(buttonType), "Button")], 'inline-block');
    setInnerHtml(button, params["".concat(buttonType, "ButtonText")]); // Set caption text

    button.setAttribute('aria-label', params["".concat(buttonType, "ButtonAriaLabel")]); // ARIA label
    // Add buttons custom classes

    button.className = swalClasses[buttonType];
    applyCustomClass(button, params, "".concat(buttonType, "Button"));
    addClass(button, params["".concat(buttonType, "ButtonClass")]);
  }

  /**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */

  const renderContainer = (instance, params) => {
    const container = getContainer();

    if (!container) {
      return;
    }

    handleBackdropParam(container, params.backdrop);
    handlePositionParam(container, params.position);
    handleGrowParam(container, params.grow); // Custom class

    applyCustomClass(container, params, 'container');
  };
  /**
   * @param {HTMLElement} container
   * @param {SweetAlertOptions['backdrop']} backdrop
   */

  function handleBackdropParam(container, backdrop) {
    if (typeof backdrop === 'string') {
      container.style.background = backdrop;
    } else if (!backdrop) {
      addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
    }
  }
  /**
   * @param {HTMLElement} container
   * @param {SweetAlertOptions['position']} position
   */


  function handlePositionParam(container, position) {
    if (position in swalClasses) {
      addClass(container, swalClasses[position]);
    } else {
      warn('The "position" parameter is not valid, defaulting to "center"');
      addClass(container, swalClasses.center);
    }
  }
  /**
   * @param {HTMLElement} container
   * @param {SweetAlertOptions['grow']} grow
   */


  function handleGrowParam(container, grow) {
    if (grow && typeof grow === 'string') {
      const growClass = "grow-".concat(grow);

      if (growClass in swalClasses) {
        addClass(container, swalClasses[growClass]);
      }
    }
  }

  /**
   * This module contains `WeakMap`s for each effectively-"private  property" that a `Swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */
  var privateProps = {
    awaitingPromise: new WeakMap(),
    promise: new WeakMap(),
    innerParams: new WeakMap(),
    domCache: new WeakMap()
  };

  /// <reference path="../../../../sweetalert2.d.ts"/>
  /** @type {InputClass[]} */

  const inputClasses = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
  /**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */

  const renderInput = (instance, params) => {
    const popup = getPopup();
    const innerParams = privateProps.innerParams.get(instance);
    const rerender = !innerParams || params.input !== innerParams.input;
    inputClasses.forEach(inputClass => {
      const inputContainer = getDirectChildByClass(popup, swalClasses[inputClass]); // set attributes

      setAttributes(inputClass, params.inputAttributes); // set class

      inputContainer.className = swalClasses[inputClass];

      if (rerender) {
        hide(inputContainer);
      }
    });

    if (params.input) {
      if (rerender) {
        showInput(params);
      } // set custom class


      setCustomClass(params);
    }
  };
  /**
   * @param {SweetAlertOptions} params
   */

  const showInput = params => {
    if (!renderInputType[params.input]) {
      return error("Unexpected type of input! Expected \"text\", \"email\", \"password\", \"number\", \"tel\", \"select\", \"radio\", \"checkbox\", \"textarea\", \"file\" or \"url\", got \"".concat(params.input, "\""));
    }

    const inputContainer = getInputContainer(params.input);
    const input = renderInputType[params.input](inputContainer, params);
    show(inputContainer); // input autofocus

    setTimeout(() => {
      focusInput(input);
    });
  };
  /**
   * @param {HTMLInputElement} input
   */


  const removeAttributes = input => {
    for (let i = 0; i < input.attributes.length; i++) {
      const attrName = input.attributes[i].name;

      if (!['type', 'value', 'style'].includes(attrName)) {
        input.removeAttribute(attrName);
      }
    }
  };
  /**
   * @param {InputClass} inputClass
   * @param {SweetAlertOptions['inputAttributes']} inputAttributes
   */


  const setAttributes = (inputClass, inputAttributes) => {
    const input = getInput(getPopup(), inputClass);

    if (!input) {
      return;
    }

    removeAttributes(input);

    for (const attr in inputAttributes) {
      input.setAttribute(attr, inputAttributes[attr]);
    }
  };
  /**
   * @param {SweetAlertOptions} params
   */


  const setCustomClass = params => {
    const inputContainer = getInputContainer(params.input);

    if (typeof params.customClass === 'object') {
      addClass(inputContainer, params.customClass.input);
    }
  };
  /**
   * @param {HTMLInputElement | HTMLTextAreaElement} input
   * @param {SweetAlertOptions} params
   */


  const setInputPlaceholder = (input, params) => {
    if (!input.placeholder || params.inputPlaceholder) {
      input.placeholder = params.inputPlaceholder;
    }
  };
  /**
   * @param {Input} input
   * @param {Input} prependTo
   * @param {SweetAlertOptions} params
   */


  const setInputLabel = (input, prependTo, params) => {
    if (params.inputLabel) {
      input.id = swalClasses.input;
      const label = document.createElement('label');
      const labelClass = swalClasses['input-label'];
      label.setAttribute('for', input.id);
      label.className = labelClass;

      if (typeof params.customClass === 'object') {
        addClass(label, params.customClass.inputLabel);
      }

      label.innerText = params.inputLabel;
      prependTo.insertAdjacentElement('beforebegin', label);
    }
  };
  /**
   * @param {SweetAlertOptions['input']} inputType
   * @returns {HTMLElement}
   */


  const getInputContainer = inputType => {
    return getDirectChildByClass(getPopup(), swalClasses[inputType] || swalClasses.input);
  };
  /**
   * @param {HTMLInputElement | HTMLOutputElement | HTMLTextAreaElement} input
   * @param {SweetAlertOptions['inputValue']} inputValue
   */


  const checkAndSetInputValue = (input, inputValue) => {
    if (['string', 'number'].includes(typeof inputValue)) {
      input.value = "".concat(inputValue);
    } else if (!isPromise(inputValue)) {
      warn("Unexpected type of inputValue! Expected \"string\", \"number\" or \"Promise\", got \"".concat(typeof inputValue, "\""));
    }
  };
  /** @type Record<string, (input: Input | HTMLElement, params: SweetAlertOptions) => Input> */


  const renderInputType = {};
  /**
   * @param {HTMLInputElement} input
   * @param {SweetAlertOptions} params
   * @returns {HTMLInputElement}
   */

  renderInputType.text = renderInputType.email = renderInputType.password = renderInputType.number = renderInputType.tel = renderInputType.url = (input, params) => {
    checkAndSetInputValue(input, params.inputValue);
    setInputLabel(input, input, params);
    setInputPlaceholder(input, params);
    input.type = params.input;
    return input;
  };
  /**
   * @param {HTMLInputElement} input
   * @param {SweetAlertOptions} params
   * @returns {HTMLInputElement}
   */


  renderInputType.file = (input, params) => {
    setInputLabel(input, input, params);
    setInputPlaceholder(input, params);
    return input;
  };
  /**
   * @param {HTMLInputElement} range
   * @param {SweetAlertOptions} params
   * @returns {HTMLInputElement}
   */


  renderInputType.range = (range, params) => {
    const rangeInput = range.querySelector('input');
    const rangeOutput = range.querySelector('output');
    checkAndSetInputValue(rangeInput, params.inputValue);
    rangeInput.type = params.input;
    checkAndSetInputValue(rangeOutput, params.inputValue);
    setInputLabel(rangeInput, range, params);
    return range;
  };
  /**
   * @param {HTMLSelectElement} select
   * @param {SweetAlertOptions} params
   * @returns {HTMLSelectElement}
   */


  renderInputType.select = (select, params) => {
    select.textContent = '';

    if (params.inputPlaceholder) {
      const placeholder = document.createElement('option');
      setInnerHtml(placeholder, params.inputPlaceholder);
      placeholder.value = '';
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);
    }

    setInputLabel(select, select, params);
    return select;
  };
  /**
   * @param {HTMLInputElement} radio
   * @returns {HTMLInputElement}
   */


  renderInputType.radio = radio => {
    radio.textContent = '';
    return radio;
  };
  /**
   * @param {HTMLLabelElement} checkboxContainer
   * @param {SweetAlertOptions} params
   * @returns {HTMLInputElement}
   */


  renderInputType.checkbox = (checkboxContainer, params) => {
    const checkbox = getInput(getPopup(), 'checkbox');
    checkbox.value = '1';
    checkbox.id = swalClasses.checkbox;
    checkbox.checked = Boolean(params.inputValue);
    const label = checkboxContainer.querySelector('span');
    setInnerHtml(label, params.inputPlaceholder);
    return checkbox;
  };
  /**
   * @param {HTMLTextAreaElement} textarea
   * @param {SweetAlertOptions} params
   * @returns {HTMLTextAreaElement}
   */


  renderInputType.textarea = (textarea, params) => {
    checkAndSetInputValue(textarea, params.inputValue);
    setInputPlaceholder(textarea, params);
    setInputLabel(textarea, textarea, params);
    /**
     * @param {HTMLElement} el
     * @returns {number}
     */

    const getMargin = el => parseInt(window.getComputedStyle(el).marginLeft) + parseInt(window.getComputedStyle(el).marginRight); // https://github.com/sweetalert2/sweetalert2/issues/2291


    setTimeout(() => {
      // https://github.com/sweetalert2/sweetalert2/issues/1699
      if ('MutationObserver' in window) {
        const initialPopupWidth = parseInt(window.getComputedStyle(getPopup()).width);

        const textareaResizeHandler = () => {
          const textareaWidth = textarea.offsetWidth + getMargin(textarea);

          if (textareaWidth > initialPopupWidth) {
            getPopup().style.width = "".concat(textareaWidth, "px");
          } else {
            getPopup().style.width = null;
          }
        };

        new MutationObserver(textareaResizeHandler).observe(textarea, {
          attributes: true,
          attributeFilter: ['style']
        });
      }
    });
    return textarea;
  };

  /**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */

  const renderContent = (instance, params) => {
    const htmlContainer = getHtmlContainer();
    applyCustomClass(htmlContainer, params, 'htmlContainer'); // Content as HTML

    if (params.html) {
      parseHtmlToContainer(params.html, htmlContainer);
      show(htmlContainer, 'block');
    } // Content as plain text
    else if (params.text) {
      htmlContainer.textContent = params.text;
      show(htmlContainer, 'block');
    } // No content
    else {
      hide(htmlContainer);
    }

    renderInput(instance, params);
  };

  /**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */

  const renderFooter = (instance, params) => {
    const footer = getFooter();
    toggle(footer, params.footer);

    if (params.footer) {
      parseHtmlToContainer(params.footer, footer);
    } // Custom class


    applyCustomClass(footer, params, 'footer');
  };

  /**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */

  const renderCloseButton = (instance, params) => {
    const closeButton = getCloseButton();
    setInnerHtml(closeButton, params.closeButtonHtml); // Custom class

    applyCustomClass(closeButton, params, 'closeButton');
    toggle(closeButton, params.showCloseButton);
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
  };

  /**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */

  const renderIcon = (instance, params) => {
    const innerParams = privateProps.innerParams.get(instance);
    const icon = getIcon(); // if the given icon already rendered, apply the styling without re-rendering the icon

    if (innerParams && params.icon === innerParams.icon) {
      // Custom or default content
      setContent(icon, params);
      applyStyles(icon, params);
      return;
    }

    if (!params.icon && !params.iconHtml) {
      hide(icon);
      return;
    }

    if (params.icon && Object.keys(iconTypes).indexOf(params.icon) === -1) {
      error("Unknown icon! Expected \"success\", \"error\", \"warning\", \"info\" or \"question\", got \"".concat(params.icon, "\""));
      hide(icon);
      return;
    }

    show(icon); // Custom or default content

    setContent(icon, params);
    applyStyles(icon, params); // Animate icon

    addClass(icon, params.showClass.icon);
  };
  /**
   * @param {HTMLElement} icon
   * @param {SweetAlertOptions} params
   */

  const applyStyles = (icon, params) => {
    for (const iconType in iconTypes) {
      if (params.icon !== iconType) {
        removeClass(icon, iconTypes[iconType]);
      }
    }

    addClass(icon, iconTypes[params.icon]); // Icon color

    setColor(icon, params); // Success icon background color

    adjustSuccessIconBackgroundColor(); // Custom class

    applyCustomClass(icon, params, 'icon');
  }; // Adjust success icon background color to match the popup background color


  const adjustSuccessIconBackgroundColor = () => {
    const popup = getPopup();
    const popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
    /** @type {NodeListOf<HTMLElement>} */

    const successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');

    for (let i = 0; i < successIconParts.length; i++) {
      successIconParts[i].style.backgroundColor = popupBackgroundColor;
    }
  };

  const successIconHtml = "\n  <div class=\"swal2-success-circular-line-left\"></div>\n  <span class=\"swal2-success-line-tip\"></span> <span class=\"swal2-success-line-long\"></span>\n  <div class=\"swal2-success-ring\"></div> <div class=\"swal2-success-fix\"></div>\n  <div class=\"swal2-success-circular-line-right\"></div>\n";
  const errorIconHtml = "\n  <span class=\"swal2-x-mark\">\n    <span class=\"swal2-x-mark-line-left\"></span>\n    <span class=\"swal2-x-mark-line-right\"></span>\n  </span>\n";
  /**
   * @param {HTMLElement} icon
   * @param {SweetAlertOptions} params
   */

  const setContent = (icon, params) => {
    let oldContent = icon.innerHTML;
    let newContent;

    if (params.iconHtml) {
      newContent = iconContent(params.iconHtml);
    } else if (params.icon === 'success') {
      newContent = successIconHtml;
      oldContent = oldContent.replace(/ style=".*?"/g, ''); // undo adjustSuccessIconBackgroundColor()
    } else if (params.icon === 'error') {
      newContent = errorIconHtml;
    } else {
      const defaultIconHtml = {
        question: '?',
        warning: '!',
        info: 'i'
      };
      newContent = iconContent(defaultIconHtml[params.icon]);
    }

    if (oldContent.trim() !== newContent.trim()) {
      setInnerHtml(icon, newContent);
    }
  };
  /**
   * @param {HTMLElement} icon
   * @param {SweetAlertOptions} params
   */


  const setColor = (icon, params) => {
    if (!params.iconColor) {
      return;
    }

    icon.style.color = params.iconColor;
    icon.style.borderColor = params.iconColor;

    for (const sel of ['.swal2-success-line-tip', '.swal2-success-line-long', '.swal2-x-mark-line-left', '.swal2-x-mark-line-right']) {
      setStyle(icon, sel, 'backgroundColor', params.iconColor);
    }

    setStyle(icon, '.swal2-success-ring', 'borderColor', params.iconColor);
  };
  /**
   * @param {string} content
   * @returns {string}
   */


  const iconContent = content => "<div class=\"".concat(swalClasses['icon-content'], "\">").concat(content, "</div>");

  /**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */

  const renderImage = (instance, params) => {
    const image = getImage();

    if (!params.imageUrl) {
      return hide(image);
    }

    show(image, ''); // Src, alt

    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt); // Width, height

    applyNumericalStyle(image, 'width', params.imageWidth);
    applyNumericalStyle(image, 'height', params.imageHeight); // Class

    image.className = swalClasses.image;
    applyCustomClass(image, params, 'image');
  };

  /**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */

  const renderProgressSteps = (instance, params) => {
    const progressStepsContainer = getProgressSteps();

    if (!params.progressSteps || params.progressSteps.length === 0) {
      return hide(progressStepsContainer);
    }

    show(progressStepsContainer);
    progressStepsContainer.textContent = '';

    if (params.currentProgressStep >= params.progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }

    params.progressSteps.forEach((step, index) => {
      const stepEl = createStepElement(step);
      progressStepsContainer.appendChild(stepEl);

      if (index === params.currentProgressStep) {
        addClass(stepEl, swalClasses['active-progress-step']);
      }

      if (index !== params.progressSteps.length - 1) {
        const lineEl = createLineElement(params);
        progressStepsContainer.appendChild(lineEl);
      }
    });
  };
  /**
   * @param {string} step
   * @returns {HTMLLIElement}
   */

  const createStepElement = step => {
    const stepEl = document.createElement('li');
    addClass(stepEl, swalClasses['progress-step']);
    setInnerHtml(stepEl, step);
    return stepEl;
  };
  /**
   * @param {SweetAlertOptions} params
   * @returns {HTMLLIElement}
   */


  const createLineElement = params => {
    const lineEl = document.createElement('li');
    addClass(lineEl, swalClasses['progress-step-line']);

    if (params.progressStepsDistance) {
      applyNumericalStyle(lineEl, 'width', params.progressStepsDistance);
    }

    return lineEl;
  };

  /**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */

  const renderTitle = (instance, params) => {
    const title = getTitle();
    toggle(title, params.title || params.titleText, 'block');

    if (params.title) {
      parseHtmlToContainer(params.title, title);
    }

    if (params.titleText) {
      title.innerText = params.titleText;
    } // Custom class


    applyCustomClass(title, params, 'title');
  };

  /**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */

  const renderPopup = (instance, params) => {
    const container = getContainer();
    const popup = getPopup(); // Width
    // https://github.com/sweetalert2/sweetalert2/issues/2170

    if (params.toast) {
      applyNumericalStyle(container, 'width', params.width);
      popup.style.width = '100%';
      popup.insertBefore(getLoader(), getIcon());
    } else {
      applyNumericalStyle(popup, 'width', params.width);
    } // Padding


    applyNumericalStyle(popup, 'padding', params.padding); // Color

    if (params.color) {
      popup.style.color = params.color;
    } // Background


    if (params.background) {
      popup.style.background = params.background;
    }

    hide(getValidationMessage()); // Classes

    addClasses(popup, params);
  };
  /**
   * @param {HTMLElement} popup
   * @param {SweetAlertOptions} params
   */

  const addClasses = (popup, params) => {
    // Default Class + showClass when updating Swal.update({})
    popup.className = "".concat(swalClasses.popup, " ").concat(isVisible(popup) ? params.showClass.popup : '');

    if (params.toast) {
      addClass([document.documentElement, document.body], swalClasses['toast-shown']);
      addClass(popup, swalClasses.toast);
    } else {
      addClass(popup, swalClasses.modal);
    } // Custom class


    applyCustomClass(popup, params, 'popup');

    if (typeof params.customClass === 'string') {
      addClass(popup, params.customClass);
    } // Icon class (#1842)


    if (params.icon) {
      addClass(popup, swalClasses["icon-".concat(params.icon)]);
    }
  };

  /**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */

  const render = (instance, params) => {
    renderPopup(instance, params);
    renderContainer(instance, params);
    renderProgressSteps(instance, params);
    renderIcon(instance, params);
    renderImage(instance, params);
    renderTitle(instance, params);
    renderCloseButton(instance, params);
    renderContent(instance, params);
    renderActions(instance, params);
    renderFooter(instance, params);

    if (typeof params.didRender === 'function') {
      params.didRender(getPopup());
    }
  };

  const DismissReason = Object.freeze({
    cancel: 'cancel',
    backdrop: 'backdrop',
    close: 'close',
    esc: 'esc',
    timer: 'timer'
  });

  // Adding aria-hidden="true" to elements outside of the active modal dialog ensures that
  // elements not within the active modal dialog will not be surfaced if a user opens a screen
  // reader’s list of elements (headings, form controls, landmarks, etc.) in the document.

  const setAriaHidden = () => {
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach(el => {
      if (el === getContainer() || el.contains(getContainer())) {
        return;
      }

      if (el.hasAttribute('aria-hidden')) {
        el.setAttribute('data-previous-aria-hidden', el.getAttribute('aria-hidden'));
      }

      el.setAttribute('aria-hidden', 'true');
    });
  };
  const unsetAriaHidden = () => {
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach(el => {
      if (el.hasAttribute('data-previous-aria-hidden')) {
        el.setAttribute('aria-hidden', el.getAttribute('data-previous-aria-hidden'));
        el.removeAttribute('data-previous-aria-hidden');
      } else {
        el.removeAttribute('aria-hidden');
      }
    });
  };

  const swalStringParams = ['swal-title', 'swal-html', 'swal-footer'];
  const getTemplateParams = params => {
    const template = typeof params.template === 'string' ? document.querySelector(params.template) : params.template;

    if (!template) {
      return {};
    }
    /** @type {DocumentFragment} */


    const templateContent = template.content;
    showWarningsForElements(templateContent);
    const result = Object.assign(getSwalParams(templateContent), getSwalButtons(templateContent), getSwalImage(templateContent), getSwalIcon(templateContent), getSwalInput(templateContent), getSwalStringParams(templateContent, swalStringParams));
    return result;
  };
  /**
   * @param {DocumentFragment} templateContent
   */

  const getSwalParams = templateContent => {
    const result = {};
    /** @type {HTMLElement[]} */

    const swalParams = Array.from(templateContent.querySelectorAll('swal-param'));
    swalParams.forEach(param => {
      showWarningsForAttributes(param, ['name', 'value']);
      const paramName = param.getAttribute('name');
      const value = param.getAttribute('value');

      if (typeof defaultParams[paramName] === 'boolean' && value === 'false') {
        result[paramName] = false;
      }

      if (typeof defaultParams[paramName] === 'object') {
        result[paramName] = JSON.parse(value);
      }
    });
    return result;
  };
  /**
   * @param {DocumentFragment} templateContent
   */


  const getSwalButtons = templateContent => {
    const result = {};
    /** @type {HTMLElement[]} */

    const swalButtons = Array.from(templateContent.querySelectorAll('swal-button'));
    swalButtons.forEach(button => {
      showWarningsForAttributes(button, ['type', 'color', 'aria-label']);
      const type = button.getAttribute('type');
      result["".concat(type, "ButtonText")] = button.innerHTML;
      result["show".concat(capitalizeFirstLetter(type), "Button")] = true;

      if (button.hasAttribute('color')) {
        result["".concat(type, "ButtonColor")] = button.getAttribute('color');
      }

      if (button.hasAttribute('aria-label')) {
        result["".concat(type, "ButtonAriaLabel")] = button.getAttribute('aria-label');
      }
    });
    return result;
  };
  /**
   * @param {DocumentFragment} templateContent
   */


  const getSwalImage = templateContent => {
    const result = {};
    /** @type {HTMLElement} */

    const image = templateContent.querySelector('swal-image');

    if (image) {
      showWarningsForAttributes(image, ['src', 'width', 'height', 'alt']);

      if (image.hasAttribute('src')) {
        result.imageUrl = image.getAttribute('src');
      }

      if (image.hasAttribute('width')) {
        result.imageWidth = image.getAttribute('width');
      }

      if (image.hasAttribute('height')) {
        result.imageHeight = image.getAttribute('height');
      }

      if (image.hasAttribute('alt')) {
        result.imageAlt = image.getAttribute('alt');
      }
    }

    return result;
  };
  /**
   * @param {DocumentFragment} templateContent
   */


  const getSwalIcon = templateContent => {
    const result = {};
    /** @type {HTMLElement} */

    const icon = templateContent.querySelector('swal-icon');

    if (icon) {
      showWarningsForAttributes(icon, ['type', 'color']);

      if (icon.hasAttribute('type')) {
        result.icon = icon.getAttribute('type');
      }

      if (icon.hasAttribute('color')) {
        result.iconColor = icon.getAttribute('color');
      }

      result.iconHtml = icon.innerHTML;
    }

    return result;
  };
  /**
   * @param {DocumentFragment} templateContent
   */


  const getSwalInput = templateContent => {
    const result = {};
    /** @type {HTMLElement} */

    const input = templateContent.querySelector('swal-input');

    if (input) {
      showWarningsForAttributes(input, ['type', 'label', 'placeholder', 'value']);
      result.input = input.getAttribute('type') || 'text';

      if (input.hasAttribute('label')) {
        result.inputLabel = input.getAttribute('label');
      }

      if (input.hasAttribute('placeholder')) {
        result.inputPlaceholder = input.getAttribute('placeholder');
      }

      if (input.hasAttribute('value')) {
        result.inputValue = input.getAttribute('value');
      }
    }
    /** @type {HTMLElement[]} */


    const inputOptions = Array.from(templateContent.querySelectorAll('swal-input-option'));

    if (inputOptions.length) {
      result.inputOptions = {};
      inputOptions.forEach(option => {
        showWarningsForAttributes(option, ['value']);
        const optionValue = option.getAttribute('value');
        const optionName = option.innerHTML;
        result.inputOptions[optionValue] = optionName;
      });
    }

    return result;
  };
  /**
   * @param {DocumentFragment} templateContent
   * @param {string[]} paramNames
   */


  const getSwalStringParams = (templateContent, paramNames) => {
    const result = {};

    for (const i in paramNames) {
      const paramName = paramNames[i];
      /** @type {HTMLElement} */

      const tag = templateContent.querySelector(paramName);

      if (tag) {
        showWarningsForAttributes(tag, []);
        result[paramName.replace(/^swal-/, '')] = tag.innerHTML.trim();
      }
    }

    return result;
  };
  /**
   * @param {DocumentFragment} templateContent
   */


  const showWarningsForElements = templateContent => {
    const allowedElements = swalStringParams.concat(['swal-param', 'swal-button', 'swal-image', 'swal-icon', 'swal-input', 'swal-input-option']);
    Array.from(templateContent.children).forEach(el => {
      const tagName = el.tagName.toLowerCase();

      if (allowedElements.indexOf(tagName) === -1) {
        warn("Unrecognized element <".concat(tagName, ">"));
      }
    });
  };
  /**
   * @param {HTMLElement} el
   * @param {string[]} allowedAttributes
   */


  const showWarningsForAttributes = (el, allowedAttributes) => {
    Array.from(el.attributes).forEach(attribute => {
      if (allowedAttributes.indexOf(attribute.name) === -1) {
        warn(["Unrecognized attribute \"".concat(attribute.name, "\" on <").concat(el.tagName.toLowerCase(), ">."), "".concat(allowedAttributes.length ? "Allowed attributes are: ".concat(allowedAttributes.join(', ')) : 'To set the value, use HTML within the element.')]);
      }
    });
  };

  var defaultInputValidators = {
    /**
     * @param {string} string
     * @param {string} validationMessage
     * @returns {Promise<void | string>}
     */
    email: (string, validationMessage) => {
      return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid email address');
    },

    /**
     * @param {string} string
     * @param {string} validationMessage
     * @returns {Promise<void | string>}
     */
    url: (string, validationMessage) => {
      // taken from https://stackoverflow.com/a/3809435 with a small change from #1306 and #2013
      return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid URL');
    }
  };

  /**
   * @param {SweetAlertOptions} params
   */

  function setDefaultInputValidators(params) {
    // Use default `inputValidator` for supported input types if not provided
    if (!params.inputValidator) {
      Object.keys(defaultInputValidators).forEach(key => {
        if (params.input === key) {
          params.inputValidator = defaultInputValidators[key];
        }
      });
    }
  }
  /**
   * @param {SweetAlertOptions} params
   */


  function validateCustomTargetElement(params) {
    // Determine if the custom target element is valid
    if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
      warn('Target parameter is not valid, defaulting to "body"');
      params.target = 'body';
    }
  }
  /**
   * Set type, text and actions on popup
   *
   * @param {SweetAlertOptions} params
   */


  function setParameters(params) {
    setDefaultInputValidators(params); // showLoaderOnConfirm && preConfirm

    if (params.showLoaderOnConfirm && !params.preConfirm) {
      warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
    }

    validateCustomTargetElement(params); // Replace newlines with <br> in title

    if (typeof params.title === 'string') {
      params.title = params.title.split('\n').join('<br />');
    }

    init(params);
  }

  class Timer {
    constructor(callback, delay) {
      this.callback = callback;
      this.remaining = delay;
      this.running = false;
      this.start();
    }

    start() {
      if (!this.running) {
        this.running = true;
        this.started = new Date();
        this.id = setTimeout(this.callback, this.remaining);
      }

      return this.remaining;
    }

    stop() {
      if (this.running) {
        this.running = false;
        clearTimeout(this.id);
        this.remaining -= new Date().getTime() - this.started.getTime();
      }

      return this.remaining;
    }

    increase(n) {
      const running = this.running;

      if (running) {
        this.stop();
      }

      this.remaining += n;

      if (running) {
        this.start();
      }

      return this.remaining;
    }

    getTimerLeft() {
      if (this.running) {
        this.stop();
        this.start();
      }

      return this.remaining;
    }

    isRunning() {
      return this.running;
    }

  }

  const fixScrollbar = () => {
    // for queues, do not do this more than once
    if (states.previousBodyPadding !== null) {
      return;
    } // if the body has overflow


    if (document.body.scrollHeight > window.innerHeight) {
      // add padding so the content doesn't shift after removal of scrollbar
      states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
      document.body.style.paddingRight = "".concat(states.previousBodyPadding + measureScrollbar(), "px");
    }
  };
  const undoScrollbar = () => {
    if (states.previousBodyPadding !== null) {
      document.body.style.paddingRight = "".concat(states.previousBodyPadding, "px");
      states.previousBodyPadding = null;
    }
  };

  /* istanbul ignore file */

  const iOSfix = () => {
    const iOS = // @ts-ignore
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

    if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
      const offset = document.body.scrollTop;
      document.body.style.top = "".concat(offset * -1, "px");
      addClass(document.body, swalClasses.iosfix);
      lockBodyScroll();
      addBottomPaddingForTallPopups();
    }
  };
  /**
   * https://github.com/sweetalert2/sweetalert2/issues/1948
   */

  const addBottomPaddingForTallPopups = () => {
    const ua = navigator.userAgent;
    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    const webkit = !!ua.match(/WebKit/i);
    const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

    if (iOSSafari) {
      const bottomPanelHeight = 44;

      if (getPopup().scrollHeight > window.innerHeight - bottomPanelHeight) {
        getContainer().style.paddingBottom = "".concat(bottomPanelHeight, "px");
      }
    }
  };
  /**
   * https://github.com/sweetalert2/sweetalert2/issues/1246
   */


  const lockBodyScroll = () => {
    const container = getContainer();
    let preventTouchMove;
    /**
     * @param {TouchEvent} e
     */

    container.ontouchstart = e => {
      preventTouchMove = shouldPreventTouchMove(e);
    };
    /**
     * @param {TouchEvent} e
     */


    container.ontouchmove = e => {
      if (preventTouchMove) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
  };
  /**
   * @param {TouchEvent} event
   * @returns {boolean}
   */


  const shouldPreventTouchMove = event => {
    const target = event.target;
    const container = getContainer();

    if (isStylus(event) || isZoom(event)) {
      return false;
    }

    if (target === container) {
      return true;
    }

    if (!isScrollable(container) && target instanceof HTMLElement && target.tagName !== 'INPUT' && // #1603
    target.tagName !== 'TEXTAREA' && // #2266
    !(isScrollable(getHtmlContainer()) && // #1944
    getHtmlContainer().contains(target))) {
      return true;
    }

    return false;
  };
  /**
   * https://github.com/sweetalert2/sweetalert2/issues/1786
   *
   * @param {*} event
   * @returns {boolean}
   */


  const isStylus = event => {
    return event.touches && event.touches.length && event.touches[0].touchType === 'stylus';
  };
  /**
   * https://github.com/sweetalert2/sweetalert2/issues/1891
   *
   * @param {TouchEvent} event
   * @returns {boolean}
   */


  const isZoom = event => {
    return event.touches && event.touches.length > 1;
  };

  const undoIOSfix = () => {
    if (hasClass(document.body, swalClasses.iosfix)) {
      const offset = parseInt(document.body.style.top, 10);
      removeClass(document.body, swalClasses.iosfix);
      document.body.style.top = '';
      document.body.scrollTop = offset * -1;
    }
  };

  const SHOW_CLASS_TIMEOUT = 10;
  /**
   * Open popup, add necessary classes and styles, fix scrollbar
   *
   * @param {SweetAlertOptions} params
   */

  const openPopup = params => {
    const container = getContainer();
    const popup = getPopup();

    if (typeof params.willOpen === 'function') {
      params.willOpen(popup);
    }

    const bodyStyles = window.getComputedStyle(document.body);
    const initialBodyOverflow = bodyStyles.overflowY;
    addClasses$1(container, popup, params); // scrolling is 'hidden' until animation is done, after that 'auto'

    setTimeout(() => {
      setScrollingVisibility(container, popup);
    }, SHOW_CLASS_TIMEOUT);

    if (isModal()) {
      fixScrollContainer(container, params.scrollbarPadding, initialBodyOverflow);
      setAriaHidden();
    }

    if (!isToast() && !globalState.previousActiveElement) {
      globalState.previousActiveElement = document.activeElement;
    }

    if (typeof params.didOpen === 'function') {
      setTimeout(() => params.didOpen(popup));
    }

    removeClass(container, swalClasses['no-transition']);
  };
  /**
   * @param {AnimationEvent} event
   */

  const swalOpenAnimationFinished = event => {
    const popup = getPopup();

    if (event.target !== popup) {
      return;
    }

    const container = getContainer();
    popup.removeEventListener(animationEndEvent, swalOpenAnimationFinished);
    container.style.overflowY = 'auto';
  };
  /**
   * @param {HTMLElement} container
   * @param {HTMLElement} popup
   */


  const setScrollingVisibility = (container, popup) => {
    if (animationEndEvent && hasCssAnimation(popup)) {
      container.style.overflowY = 'hidden';
      popup.addEventListener(animationEndEvent, swalOpenAnimationFinished);
    } else {
      container.style.overflowY = 'auto';
    }
  };
  /**
   * @param {HTMLElement} container
   * @param {boolean} scrollbarPadding
   * @param {string} initialBodyOverflow
   */


  const fixScrollContainer = (container, scrollbarPadding, initialBodyOverflow) => {
    iOSfix();

    if (scrollbarPadding && initialBodyOverflow !== 'hidden') {
      fixScrollbar();
    } // sweetalert2/issues/1247


    setTimeout(() => {
      container.scrollTop = 0;
    });
  };
  /**
   * @param {HTMLElement} container
   * @param {HTMLElement} popup
   * @param {SweetAlertOptions} params
   */


  const addClasses$1 = (container, popup, params) => {
    addClass(container, params.showClass.backdrop); // this workaround with opacity is needed for https://github.com/sweetalert2/sweetalert2/issues/2059

    popup.style.setProperty('opacity', '0', 'important');
    show(popup, 'grid');
    setTimeout(() => {
      // Animate popup right after showing it
      addClass(popup, params.showClass.popup); // and remove the opacity workaround

      popup.style.removeProperty('opacity');
    }, SHOW_CLASS_TIMEOUT); // 10ms in order to fix #2062

    addClass([document.documentElement, document.body], swalClasses.shown);

    if (params.heightAuto && params.backdrop && !params.toast) {
      addClass([document.documentElement, document.body], swalClasses['height-auto']);
    }
  };

  /**
   * Shows loader (spinner), this is useful with AJAX requests.
   * By default the loader be shown instead of the "Confirm" button.
   */

  const showLoading = buttonToReplace => {
    let popup = getPopup();

    if (!popup) {
      new Swal(); // eslint-disable-line no-new
    }

    popup = getPopup();
    const loader = getLoader();

    if (isToast()) {
      hide(getIcon());
    } else {
      replaceButton(popup, buttonToReplace);
    }

    show(loader);
    popup.setAttribute('data-loading', 'true');
    popup.setAttribute('aria-busy', 'true');
    popup.focus();
  };

  const replaceButton = (popup, buttonToReplace) => {
    const actions = getActions();
    const loader = getLoader();

    if (!buttonToReplace && isVisible(getConfirmButton())) {
      buttonToReplace = getConfirmButton();
    }

    show(actions);

    if (buttonToReplace) {
      hide(buttonToReplace);
      loader.setAttribute('data-button-to-replace', buttonToReplace.className);
    }

    loader.parentNode.insertBefore(loader, buttonToReplace);
    addClass([popup, actions], swalClasses.loading);
  };

  const handleInputOptionsAndValue = (instance, params) => {
    if (params.input === 'select' || params.input === 'radio') {
      handleInputOptions(instance, params);
    } else if (['text', 'email', 'number', 'tel', 'textarea'].includes(params.input) && (hasToPromiseFn(params.inputValue) || isPromise(params.inputValue))) {
      showLoading(getConfirmButton());
      handleInputValue(instance, params);
    }
  };
  const getInputValue = (instance, innerParams) => {
    const input = instance.getInput();

    if (!input) {
      return null;
    }

    switch (innerParams.input) {
      case 'checkbox':
        return getCheckboxValue(input);

      case 'radio':
        return getRadioValue(input);

      case 'file':
        return getFileValue(input);

      default:
        return innerParams.inputAutoTrim ? input.value.trim() : input.value;
    }
  };

  const getCheckboxValue = input => input.checked ? 1 : 0;

  const getRadioValue = input => input.checked ? input.value : null;

  const getFileValue = input => input.files.length ? input.getAttribute('multiple') !== null ? input.files : input.files[0] : null;

  const handleInputOptions = (instance, params) => {
    const popup = getPopup();

    const processInputOptions = inputOptions => populateInputOptions[params.input](popup, formatInputOptions(inputOptions), params);

    if (hasToPromiseFn(params.inputOptions) || isPromise(params.inputOptions)) {
      showLoading(getConfirmButton());
      asPromise(params.inputOptions).then(inputOptions => {
        instance.hideLoading();
        processInputOptions(inputOptions);
      });
    } else if (typeof params.inputOptions === 'object') {
      processInputOptions(params.inputOptions);
    } else {
      error("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(typeof params.inputOptions));
    }
  };

  const handleInputValue = (instance, params) => {
    const input = instance.getInput();
    hide(input);
    asPromise(params.inputValue).then(inputValue => {
      input.value = params.input === 'number' ? parseFloat(inputValue) || 0 : "".concat(inputValue);
      show(input);
      input.focus();
      instance.hideLoading();
    }).catch(err => {
      error("Error in inputValue promise: ".concat(err));
      input.value = '';
      show(input);
      input.focus();
      instance.hideLoading();
    });
  };

  const populateInputOptions = {
    select: (popup, inputOptions, params) => {
      const select = getDirectChildByClass(popup, swalClasses.select);

      const renderOption = (parent, optionLabel, optionValue) => {
        const option = document.createElement('option');
        option.value = optionValue;
        setInnerHtml(option, optionLabel);
        option.selected = isSelected(optionValue, params.inputValue);
        parent.appendChild(option);
      };

      inputOptions.forEach(inputOption => {
        const optionValue = inputOption[0];
        const optionLabel = inputOption[1]; // <optgroup> spec:
        // https://www.w3.org/TR/html401/interact/forms.html#h-17.6
        // "...all OPTGROUP elements must be specified directly within a SELECT element (i.e., groups may not be nested)..."
        // check whether this is a <optgroup>

        if (Array.isArray(optionLabel)) {
          // if it is an array, then it is an <optgroup>
          const optgroup = document.createElement('optgroup');
          optgroup.label = optionValue;
          optgroup.disabled = false; // not configurable for now

          select.appendChild(optgroup);
          optionLabel.forEach(o => renderOption(optgroup, o[1], o[0]));
        } else {
          // case of <option>
          renderOption(select, optionLabel, optionValue);
        }
      });
      select.focus();
    },
    radio: (popup, inputOptions, params) => {
      const radio = getDirectChildByClass(popup, swalClasses.radio);
      inputOptions.forEach(inputOption => {
        const radioValue = inputOption[0];
        const radioLabel = inputOption[1];
        const radioInput = document.createElement('input');
        const radioLabelElement = document.createElement('label');
        radioInput.type = 'radio';
        radioInput.name = swalClasses.radio;
        radioInput.value = radioValue;

        if (isSelected(radioValue, params.inputValue)) {
          radioInput.checked = true;
        }

        const label = document.createElement('span');
        setInnerHtml(label, radioLabel);
        label.className = swalClasses.label;
        radioLabelElement.appendChild(radioInput);
        radioLabelElement.appendChild(label);
        radio.appendChild(radioLabelElement);
      });
      const radios = radio.querySelectorAll('input');

      if (radios.length) {
        radios[0].focus();
      }
    }
  };
  /**
   * Converts `inputOptions` into an array of `[value, label]`s
   * @param inputOptions
   */

  const formatInputOptions = inputOptions => {
    const result = [];

    if (typeof Map !== 'undefined' && inputOptions instanceof Map) {
      inputOptions.forEach((value, key) => {
        let valueFormatted = value;

        if (typeof valueFormatted === 'object') {
          // case of <optgroup>
          valueFormatted = formatInputOptions(valueFormatted);
        }

        result.push([key, valueFormatted]);
      });
    } else {
      Object.keys(inputOptions).forEach(key => {
        let valueFormatted = inputOptions[key];

        if (typeof valueFormatted === 'object') {
          // case of <optgroup>
          valueFormatted = formatInputOptions(valueFormatted);
        }

        result.push([key, valueFormatted]);
      });
    }

    return result;
  };

  const isSelected = (optionValue, inputValue) => {
    return inputValue && inputValue.toString() === optionValue.toString();
  };

  /**
   * Hides loader and shows back the button which was hidden by .showLoading()
   */

  function hideLoading() {
    // do nothing if popup is closed
    const innerParams = privateProps.innerParams.get(this);

    if (!innerParams) {
      return;
    }

    const domCache = privateProps.domCache.get(this);
    hide(domCache.loader);

    if (isToast()) {
      if (innerParams.icon) {
        show(getIcon());
      }
    } else {
      showRelatedButton(domCache);
    }

    removeClass([domCache.popup, domCache.actions], swalClasses.loading);
    domCache.popup.removeAttribute('aria-busy');
    domCache.popup.removeAttribute('data-loading');
    domCache.confirmButton.disabled = false;
    domCache.denyButton.disabled = false;
    domCache.cancelButton.disabled = false;
  }

  const showRelatedButton = domCache => {
    const buttonToReplace = domCache.popup.getElementsByClassName(domCache.loader.getAttribute('data-button-to-replace'));

    if (buttonToReplace.length) {
      show(buttonToReplace[0], 'inline-block');
    } else if (allButtonsAreHidden()) {
      hide(domCache.actions);
    }
  };

  /**
   * Gets the input DOM node, this method works with input parameter.
   * @returns {HTMLElement | null}
   */

  function getInput$1(instance) {
    const innerParams = privateProps.innerParams.get(instance || this);
    const domCache = privateProps.domCache.get(instance || this);

    if (!domCache) {
      return null;
    }

    return getInput(domCache.popup, innerParams.input);
  }

  /**
   * This module contains `WeakMap`s for each effectively-"private  property" that a `Swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */
  var privateMethods = {
    swalPromiseResolve: new WeakMap(),
    swalPromiseReject: new WeakMap()
  };

  /*
   * Global function to determine if SweetAlert2 popup is shown
   */

  const isVisible$1 = () => {
    return isVisible(getPopup());
  };
  /*
   * Global function to click 'Confirm' button
   */

  const clickConfirm = () => getConfirmButton() && getConfirmButton().click();
  /*
   * Global function to click 'Deny' button
   */

  const clickDeny = () => getDenyButton() && getDenyButton().click();
  /*
   * Global function to click 'Cancel' button
   */

  const clickCancel = () => getCancelButton() && getCancelButton().click();

  /**
   * @param {GlobalState} globalState
   */

  const removeKeydownHandler = globalState => {
    if (globalState.keydownTarget && globalState.keydownHandlerAdded) {
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = false;
    }
  };
  /**
   * @param {SweetAlert2} instance
   * @param {GlobalState} globalState
   * @param {SweetAlertOptions} innerParams
   * @param {*} dismissWith
   */

  const addKeydownHandler = (instance, globalState, innerParams, dismissWith) => {
    removeKeydownHandler(globalState);

    if (!innerParams.toast) {
      globalState.keydownHandler = e => keydownHandler(instance, e, dismissWith);

      globalState.keydownTarget = innerParams.keydownListenerCapture ? window : getPopup();
      globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
      globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = true;
    }
  };
  /**
   * @param {SweetAlertOptions} innerParams
   * @param {number} index
   * @param {number} increment
   */

  const setFocus = (innerParams, index, increment) => {
    const focusableElements = getFocusableElements(); // search for visible elements and select the next possible match

    if (focusableElements.length) {
      index = index + increment; // rollover to first item

      if (index === focusableElements.length) {
        index = 0; // go to last item
      } else if (index === -1) {
        index = focusableElements.length - 1;
      }

      return focusableElements[index].focus();
    } // no visible focusable elements, focus the popup


    getPopup().focus();
  };
  const arrowKeysNextButton = ['ArrowRight', 'ArrowDown'];
  const arrowKeysPreviousButton = ['ArrowLeft', 'ArrowUp'];
  /**
   * @param {SweetAlert2} instance
   * @param {KeyboardEvent} e
   * @param {function} dismissWith
   */

  const keydownHandler = (instance, e, dismissWith) => {
    const innerParams = privateProps.innerParams.get(instance);

    if (!innerParams) {
      return; // This instance has already been destroyed
    } // Ignore keydown during IME composition
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event#ignoring_keydown_during_ime_composition
    // https://github.com/sweetalert2/sweetalert2/issues/720
    // https://github.com/sweetalert2/sweetalert2/issues/2406


    if (e.isComposing || e.keyCode === 229) {
      return;
    }

    if (innerParams.stopKeydownPropagation) {
      e.stopPropagation();
    } // ENTER


    if (e.key === 'Enter') {
      handleEnter(instance, e, innerParams);
    } // TAB
    else if (e.key === 'Tab') {
      handleTab(e, innerParams);
    } // ARROWS - switch focus between buttons
    else if ([...arrowKeysNextButton, ...arrowKeysPreviousButton].includes(e.key)) {
      handleArrows(e.key);
    } // ESC
    else if (e.key === 'Escape') {
      handleEsc(e, innerParams, dismissWith);
    }
  };
  /**
   * @param {SweetAlert2} instance
   * @param {KeyboardEvent} e
   * @param {SweetAlertOptions} innerParams
   */


  const handleEnter = (instance, e, innerParams) => {
    // https://github.com/sweetalert2/sweetalert2/issues/2386
    if (!callIfFunction(innerParams.allowEnterKey)) {
      return;
    }

    if (e.target && instance.getInput() && e.target instanceof HTMLElement && e.target.outerHTML === instance.getInput().outerHTML) {
      if (['textarea', 'file'].includes(innerParams.input)) {
        return; // do not submit
      }

      clickConfirm();
      e.preventDefault();
    }
  };
  /**
   * @param {KeyboardEvent} e
   * @param {SweetAlertOptions} innerParams
   */


  const handleTab = (e, innerParams) => {
    const targetElement = e.target;
    const focusableElements = getFocusableElements();
    let btnIndex = -1;

    for (let i = 0; i < focusableElements.length; i++) {
      if (targetElement === focusableElements[i]) {
        btnIndex = i;
        break;
      }
    } // Cycle to the next button


    if (!e.shiftKey) {
      setFocus(innerParams, btnIndex, 1);
    } // Cycle to the prev button
    else {
      setFocus(innerParams, btnIndex, -1);
    }

    e.stopPropagation();
    e.preventDefault();
  };
  /**
   * @param {string} key
   */


  const handleArrows = key => {
    const confirmButton = getConfirmButton();
    const denyButton = getDenyButton();
    const cancelButton = getCancelButton();

    if (document.activeElement instanceof HTMLElement && ![confirmButton, denyButton, cancelButton].includes(document.activeElement)) {
      return;
    }

    const sibling = arrowKeysNextButton.includes(key) ? 'nextElementSibling' : 'previousElementSibling';
    let buttonToFocus = document.activeElement;

    for (let i = 0; i < getActions().children.length; i++) {
      buttonToFocus = buttonToFocus[sibling];

      if (!buttonToFocus) {
        return;
      }

      if (buttonToFocus instanceof HTMLButtonElement && isVisible(buttonToFocus)) {
        break;
      }
    }

    if (buttonToFocus instanceof HTMLButtonElement) {
      buttonToFocus.focus();
    }
  };
  /**
   * @param {KeyboardEvent} e
   * @param {SweetAlertOptions} innerParams
   * @param {function} dismissWith
   */


  const handleEsc = (e, innerParams, dismissWith) => {
    if (callIfFunction(innerParams.allowEscapeKey)) {
      e.preventDefault();
      dismissWith(DismissReason.esc);
    }
  };

  /*
   * Instance method to close sweetAlert
   */

  function removePopupAndResetState(instance, container, returnFocus, didClose) {
    if (isToast()) {
      triggerDidCloseAndDispose(instance, didClose);
    } else {
      restoreActiveElement(returnFocus).then(() => triggerDidCloseAndDispose(instance, didClose));
      removeKeydownHandler(globalState);
    }

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent); // workaround for #2088
    // for some reason removing the container in Safari will scroll the document to bottom

    if (isSafari) {
      container.setAttribute('style', 'display:none !important');
      container.removeAttribute('class');
      container.innerHTML = '';
    } else {
      container.remove();
    }

    if (isModal()) {
      undoScrollbar();
      undoIOSfix();
      unsetAriaHidden();
    }

    removeBodyClasses();
  }

  function removeBodyClasses() {
    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['toast-shown']]);
  }

  function close(resolveValue) {
    resolveValue = prepareResolveValue(resolveValue);
    const swalPromiseResolve = privateMethods.swalPromiseResolve.get(this);
    const didClose = triggerClosePopup(this);

    if (this.isAwaitingPromise()) {
      // A swal awaiting for a promise (after a click on Confirm or Deny) cannot be dismissed anymore #2335
      if (!resolveValue.isDismissed) {
        handleAwaitingPromise(this);
        swalPromiseResolve(resolveValue);
      }
    } else if (didClose) {
      // Resolve Swal promise
      swalPromiseResolve(resolveValue);
    }
  }
  function isAwaitingPromise() {
    return !!privateProps.awaitingPromise.get(this);
  }

  const triggerClosePopup = instance => {
    const popup = getPopup();

    if (!popup) {
      return false;
    }

    const innerParams = privateProps.innerParams.get(instance);

    if (!innerParams || hasClass(popup, innerParams.hideClass.popup)) {
      return false;
    }

    removeClass(popup, innerParams.showClass.popup);
    addClass(popup, innerParams.hideClass.popup);
    const backdrop = getContainer();
    removeClass(backdrop, innerParams.showClass.backdrop);
    addClass(backdrop, innerParams.hideClass.backdrop);
    handlePopupAnimation(instance, popup, innerParams);
    return true;
  };

  function rejectPromise(error) {
    const rejectPromise = privateMethods.swalPromiseReject.get(this);
    handleAwaitingPromise(this);

    if (rejectPromise) {
      // Reject Swal promise
      rejectPromise(error);
    }
  }
  const handleAwaitingPromise = instance => {
    if (instance.isAwaitingPromise()) {
      privateProps.awaitingPromise.delete(instance); // The instance might have been previously partly destroyed, we must resume the destroy process in this case #2335

      if (!privateProps.innerParams.get(instance)) {
        instance._destroy();
      }
    }
  };

  const prepareResolveValue = resolveValue => {
    // When user calls Swal.close()
    if (typeof resolveValue === 'undefined') {
      return {
        isConfirmed: false,
        isDenied: false,
        isDismissed: true
      };
    }

    return Object.assign({
      isConfirmed: false,
      isDenied: false,
      isDismissed: false
    }, resolveValue);
  };

  const handlePopupAnimation = (instance, popup, innerParams) => {
    const container = getContainer(); // If animation is supported, animate

    const animationIsSupported = animationEndEvent && hasCssAnimation(popup);

    if (typeof innerParams.willClose === 'function') {
      innerParams.willClose(popup);
    }

    if (animationIsSupported) {
      animatePopup(instance, popup, container, innerParams.returnFocus, innerParams.didClose);
    } else {
      // Otherwise, remove immediately
      removePopupAndResetState(instance, container, innerParams.returnFocus, innerParams.didClose);
    }
  };

  const animatePopup = (instance, popup, container, returnFocus, didClose) => {
    globalState.swalCloseEventFinishedCallback = removePopupAndResetState.bind(null, instance, container, returnFocus, didClose);
    popup.addEventListener(animationEndEvent, function (e) {
      if (e.target === popup) {
        globalState.swalCloseEventFinishedCallback();
        delete globalState.swalCloseEventFinishedCallback;
      }
    });
  };

  const triggerDidCloseAndDispose = (instance, didClose) => {
    setTimeout(() => {
      if (typeof didClose === 'function') {
        didClose.bind(instance.params)();
      }

      instance._destroy();
    });
  };

  function setButtonsDisabled(instance, buttons, disabled) {
    const domCache = privateProps.domCache.get(instance);
    buttons.forEach(button => {
      domCache[button].disabled = disabled;
    });
  }

  function setInputDisabled(input, disabled) {
    if (!input) {
      return false;
    }

    if (input.type === 'radio') {
      const radiosContainer = input.parentNode.parentNode;
      const radios = radiosContainer.querySelectorAll('input');

      for (let i = 0; i < radios.length; i++) {
        radios[i].disabled = disabled;
      }
    } else {
      input.disabled = disabled;
    }
  }

  function enableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], false);
  }
  function disableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], true);
  }
  function enableInput() {
    return setInputDisabled(this.getInput(), false);
  }
  function disableInput() {
    return setInputDisabled(this.getInput(), true);
  }

  function showValidationMessage(error) {
    const domCache = privateProps.domCache.get(this);
    const params = privateProps.innerParams.get(this);
    setInnerHtml(domCache.validationMessage, error);
    domCache.validationMessage.className = swalClasses['validation-message'];

    if (params.customClass && params.customClass.validationMessage) {
      addClass(domCache.validationMessage, params.customClass.validationMessage);
    }

    show(domCache.validationMessage);
    const input = this.getInput();

    if (input) {
      input.setAttribute('aria-invalid', true);
      input.setAttribute('aria-describedby', swalClasses['validation-message']);
      focusInput(input);
      addClass(input, swalClasses.inputerror);
    }
  } // Hide block with validation message

  function resetValidationMessage$1() {
    const domCache = privateProps.domCache.get(this);

    if (domCache.validationMessage) {
      hide(domCache.validationMessage);
    }

    const input = this.getInput();

    if (input) {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      removeClass(input, swalClasses.inputerror);
    }
  }

  function getProgressSteps$1() {
    const domCache = privateProps.domCache.get(this);
    return domCache.progressSteps;
  }

  /**
   * Updates popup parameters.
   */

  function update(params) {
    const popup = getPopup();
    const innerParams = privateProps.innerParams.get(this);

    if (!popup || hasClass(popup, innerParams.hideClass.popup)) {
      return warn("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
    }

    const validUpdatableParams = filterValidParams(params);
    const updatedParams = Object.assign({}, innerParams, validUpdatableParams);
    render(this, updatedParams);
    privateProps.innerParams.set(this, updatedParams);
    Object.defineProperties(this, {
      params: {
        value: Object.assign({}, this.params, params),
        writable: false,
        enumerable: true
      }
    });
  }

  const filterValidParams = params => {
    const validUpdatableParams = {};
    Object.keys(params).forEach(param => {
      if (isUpdatableParameter(param)) {
        validUpdatableParams[param] = params[param];
      } else {
        warn("Invalid parameter to update: ".concat(param));
      }
    });
    return validUpdatableParams;
  };

  function _destroy() {
    const domCache = privateProps.domCache.get(this);
    const innerParams = privateProps.innerParams.get(this);

    if (!innerParams) {
      disposeWeakMaps(this); // The WeakMaps might have been partly destroyed, we must recall it to dispose any remaining WeakMaps #2335

      return; // This instance has already been destroyed
    } // Check if there is another Swal closing


    if (domCache.popup && globalState.swalCloseEventFinishedCallback) {
      globalState.swalCloseEventFinishedCallback();
      delete globalState.swalCloseEventFinishedCallback;
    }

    if (typeof innerParams.didDestroy === 'function') {
      innerParams.didDestroy();
    }

    disposeSwal(this);
  }
  /**
   * @param {SweetAlert2} instance
   */

  const disposeSwal = instance => {
    disposeWeakMaps(instance); // Unset this.params so GC will dispose it (#1569)
    // @ts-ignore

    delete instance.params; // Unset globalState props so GC will dispose globalState (#1569)

    delete globalState.keydownHandler;
    delete globalState.keydownTarget; // Unset currentInstance

    delete globalState.currentInstance;
  };
  /**
   * @param {SweetAlert2} instance
   */


  const disposeWeakMaps = instance => {
    // If the current instance is awaiting a promise result, we keep the privateMethods to call them once the promise result is retrieved #2335
    // @ts-ignore
    if (instance.isAwaitingPromise()) {
      unsetWeakMaps(privateProps, instance);
      privateProps.awaitingPromise.set(instance, true);
    } else {
      unsetWeakMaps(privateMethods, instance);
      unsetWeakMaps(privateProps, instance);
    }
  };
  /**
   * @param {object} obj
   * @param {SweetAlert2} instance
   */


  const unsetWeakMaps = (obj, instance) => {
    for (const i in obj) {
      obj[i].delete(instance);
    }
  };



  var instanceMethods = /*#__PURE__*/Object.freeze({
    hideLoading: hideLoading,
    disableLoading: hideLoading,
    getInput: getInput$1,
    close: close,
    isAwaitingPromise: isAwaitingPromise,
    rejectPromise: rejectPromise,
    handleAwaitingPromise: handleAwaitingPromise,
    closePopup: close,
    closeModal: close,
    closeToast: close,
    enableButtons: enableButtons,
    disableButtons: disableButtons,
    enableInput: enableInput,
    disableInput: disableInput,
    showValidationMessage: showValidationMessage,
    resetValidationMessage: resetValidationMessage$1,
    getProgressSteps: getProgressSteps$1,
    update: update,
    _destroy: _destroy
  });

  /**
   * @param {SweetAlert2} instance
   */

  const handleConfirmButtonClick = instance => {
    const innerParams = privateProps.innerParams.get(instance);
    instance.disableButtons();

    if (innerParams.input) {
      handleConfirmOrDenyWithInput(instance, 'confirm');
    } else {
      confirm(instance, true);
    }
  };
  /**
   * @param {SweetAlert2} instance
   */

  const handleDenyButtonClick = instance => {
    const innerParams = privateProps.innerParams.get(instance);
    instance.disableButtons();

    if (innerParams.returnInputValueOnDeny) {
      handleConfirmOrDenyWithInput(instance, 'deny');
    } else {
      deny(instance, false);
    }
  };
  /**
   * @param {SweetAlert2} instance
   * @param {Function} dismissWith
   */

  const handleCancelButtonClick = (instance, dismissWith) => {
    instance.disableButtons();
    dismissWith(DismissReason.cancel);
  };
  /**
   * @param {SweetAlert2} instance
   * @param {'confirm' | 'deny'} type
   */

  const handleConfirmOrDenyWithInput = (instance, type) => {
    const innerParams = privateProps.innerParams.get(instance);

    if (!innerParams.input) {
      error("The \"input\" parameter is needed to be set when using returnInputValueOn".concat(capitalizeFirstLetter(type)));
      return;
    }

    const inputValue = getInputValue(instance, innerParams);

    if (innerParams.inputValidator) {
      handleInputValidator(instance, inputValue, type);
    } else if (!instance.getInput().checkValidity()) {
      instance.enableButtons();
      instance.showValidationMessage(innerParams.validationMessage);
    } else if (type === 'deny') {
      deny(instance, inputValue);
    } else {
      confirm(instance, inputValue);
    }
  };
  /**
   * @param {SweetAlert2} instance
   * @param {string} inputValue
   * @param {'confirm' | 'deny'} type
   */


  const handleInputValidator = (instance, inputValue, type) => {
    const innerParams = privateProps.innerParams.get(instance);
    instance.disableInput();
    const validationPromise = Promise.resolve().then(() => asPromise(innerParams.inputValidator(inputValue, innerParams.validationMessage)));
    validationPromise.then(validationMessage => {
      instance.enableButtons();
      instance.enableInput();

      if (validationMessage) {
        instance.showValidationMessage(validationMessage);
      } else if (type === 'deny') {
        deny(instance, inputValue);
      } else {
        confirm(instance, inputValue);
      }
    });
  };
  /**
   * @param {SweetAlert2} instance
   * @param {any} value
   */


  const deny = (instance, value) => {
    const innerParams = privateProps.innerParams.get(instance || undefined);

    if (innerParams.showLoaderOnDeny) {
      showLoading(getDenyButton());
    }

    if (innerParams.preDeny) {
      privateProps.awaitingPromise.set(instance || undefined, true); // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preDeny's promise is received

      const preDenyPromise = Promise.resolve().then(() => asPromise(innerParams.preDeny(value, innerParams.validationMessage)));
      preDenyPromise.then(preDenyValue => {
        if (preDenyValue === false) {
          instance.hideLoading();
          handleAwaitingPromise(instance);
        } else {
          instance.close({
            isDenied: true,
            value: typeof preDenyValue === 'undefined' ? value : preDenyValue
          });
        }
      }).catch(error$$1 => rejectWith(instance || undefined, error$$1));
    } else {
      instance.close({
        isDenied: true,
        value
      });
    }
  };
  /**
   * @param {SweetAlert2} instance
   * @param {any} value
   */


  const succeedWith = (instance, value) => {
    instance.close({
      isConfirmed: true,
      value
    });
  };
  /**
   *
   * @param {SweetAlert2} instance
   * @param {string} error
   */


  const rejectWith = (instance, error$$1) => {
    // @ts-ignore
    instance.rejectPromise(error$$1);
  };
  /**
   *
   * @param {SweetAlert2} instance
   * @param {any} value
   */


  const confirm = (instance, value) => {
    const innerParams = privateProps.innerParams.get(instance || undefined);

    if (innerParams.showLoaderOnConfirm) {
      showLoading();
    }

    if (innerParams.preConfirm) {
      instance.resetValidationMessage();
      privateProps.awaitingPromise.set(instance || undefined, true); // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preConfirm's promise is received

      const preConfirmPromise = Promise.resolve().then(() => asPromise(innerParams.preConfirm(value, innerParams.validationMessage)));
      preConfirmPromise.then(preConfirmValue => {
        if (isVisible(getValidationMessage()) || preConfirmValue === false) {
          instance.hideLoading();
          handleAwaitingPromise(instance);
        } else {
          succeedWith(instance, typeof preConfirmValue === 'undefined' ? value : preConfirmValue);
        }
      }).catch(error$$1 => rejectWith(instance || undefined, error$$1));
    } else {
      succeedWith(instance, value);
    }
  };

  const handlePopupClick = (instance, domCache, dismissWith) => {
    const innerParams = privateProps.innerParams.get(instance);

    if (innerParams.toast) {
      handleToastClick(instance, domCache, dismissWith);
    } else {
      // Ignore click events that had mousedown on the popup but mouseup on the container
      // This can happen when the user drags a slider
      handleModalMousedown(domCache); // Ignore click events that had mousedown on the container but mouseup on the popup

      handleContainerMousedown(domCache);
      handleModalClick(instance, domCache, dismissWith);
    }
  };

  const handleToastClick = (instance, domCache, dismissWith) => {
    // Closing toast by internal click
    domCache.popup.onclick = () => {
      const innerParams = privateProps.innerParams.get(instance);

      if (innerParams && (isAnyButtonShown(innerParams) || innerParams.timer || innerParams.input)) {
        return;
      }

      dismissWith(DismissReason.close);
    };
  };
  /**
   * @param {*} innerParams
   * @returns {boolean}
   */


  const isAnyButtonShown = innerParams => {
    return innerParams.showConfirmButton || innerParams.showDenyButton || innerParams.showCancelButton || innerParams.showCloseButton;
  };

  let ignoreOutsideClick = false;

  const handleModalMousedown = domCache => {
    domCache.popup.onmousedown = () => {
      domCache.container.onmouseup = function (e) {
        domCache.container.onmouseup = undefined; // We only check if the mouseup target is the container because usually it doesn't
        // have any other direct children aside of the popup

        if (e.target === domCache.container) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  const handleContainerMousedown = domCache => {
    domCache.container.onmousedown = () => {
      domCache.popup.onmouseup = function (e) {
        domCache.popup.onmouseup = undefined; // We also need to check if the mouseup target is a child of the popup

        if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  const handleModalClick = (instance, domCache, dismissWith) => {
    domCache.container.onclick = e => {
      const innerParams = privateProps.innerParams.get(instance);

      if (ignoreOutsideClick) {
        ignoreOutsideClick = false;
        return;
      }

      if (e.target === domCache.container && callIfFunction(innerParams.allowOutsideClick)) {
        dismissWith(DismissReason.backdrop);
      }
    };
  };

  const isJqueryElement = elem => typeof elem === 'object' && elem.jquery;

  const isElement = elem => elem instanceof Element || isJqueryElement(elem);

  const argsToParams = args => {
    const params = {};

    if (typeof args[0] === 'object' && !isElement(args[0])) {
      Object.assign(params, args[0]);
    } else {
      ['title', 'html', 'icon'].forEach((name, index) => {
        const arg = args[index];

        if (typeof arg === 'string' || isElement(arg)) {
          params[name] = arg;
        } else if (arg !== undefined) {
          error("Unexpected type of ".concat(name, "! Expected \"string\" or \"Element\", got ").concat(typeof arg));
        }
      });
    }

    return params;
  };

  function fire() {
    const Swal = this; // eslint-disable-line @typescript-eslint/no-this-alias

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Swal(...args);
  }

  /**
   * Returns an extended version of `Swal` containing `params` as defaults.
   * Useful for reusing Swal configuration.
   *
   * For example:
   *
   * Before:
   * const textPromptOptions = { input: 'text', showCancelButton: true }
   * const {value: firstName} = await Swal.fire({ ...textPromptOptions, title: 'What is your first name?' })
   * const {value: lastName} = await Swal.fire({ ...textPromptOptions, title: 'What is your last name?' })
   *
   * After:
   * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
   * const {value: firstName} = await TextPrompt('What is your first name?')
   * const {value: lastName} = await TextPrompt('What is your last name?')
   *
   * @param mixinParams
   */
  function mixin(mixinParams) {
    class MixinSwal extends this {
      _main(params, priorityMixinParams) {
        return super._main(params, Object.assign({}, mixinParams, priorityMixinParams));
      }

    }

    return MixinSwal;
  }

  /**
   * If `timer` parameter is set, returns number of milliseconds of timer remained.
   * Otherwise, returns undefined.
   */

  const getTimerLeft = () => {
    return globalState.timeout && globalState.timeout.getTimerLeft();
  };
  /**
   * Stop timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */

  const stopTimer = () => {
    if (globalState.timeout) {
      stopTimerProgressBar();
      return globalState.timeout.stop();
    }
  };
  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */

  const resumeTimer = () => {
    if (globalState.timeout) {
      const remaining = globalState.timeout.start();
      animateTimerProgressBar(remaining);
      return remaining;
    }
  };
  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */

  const toggleTimer = () => {
    const timer = globalState.timeout;
    return timer && (timer.running ? stopTimer() : resumeTimer());
  };
  /**
   * Increase timer. Returns number of milliseconds of an updated timer.
   * If `timer` parameter isn't set, returns undefined.
   */

  const increaseTimer = n => {
    if (globalState.timeout) {
      const remaining = globalState.timeout.increase(n);
      animateTimerProgressBar(remaining, true);
      return remaining;
    }
  };
  /**
   * Check if timer is running. Returns true if timer is running
   * or false if timer is paused or stopped.
   * If `timer` parameter isn't set, returns undefined
   */

  const isTimerRunning = () => {
    return globalState.timeout && globalState.timeout.isRunning();
  };

  let bodyClickListenerAdded = false;
  const clickHandlers = {};
  function bindClickHandler() {
    let attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'data-swal-template';
    clickHandlers[attr] = this;

    if (!bodyClickListenerAdded) {
      document.body.addEventListener('click', bodyClickListener);
      bodyClickListenerAdded = true;
    }
  }

  const bodyClickListener = event => {
    for (let el = event.target; el && el !== document; el = el.parentNode) {
      for (const attr in clickHandlers) {
        const template = el.getAttribute(attr);

        if (template) {
          clickHandlers[attr].fire({
            template
          });
          return;
        }
      }
    }
  };



  var staticMethods = /*#__PURE__*/Object.freeze({
    isValidParameter: isValidParameter,
    isUpdatableParameter: isUpdatableParameter,
    isDeprecatedParameter: isDeprecatedParameter,
    argsToParams: argsToParams,
    isVisible: isVisible$1,
    clickConfirm: clickConfirm,
    clickDeny: clickDeny,
    clickCancel: clickCancel,
    getContainer: getContainer,
    getPopup: getPopup,
    getTitle: getTitle,
    getHtmlContainer: getHtmlContainer,
    getImage: getImage,
    getIcon: getIcon,
    getInputLabel: getInputLabel,
    getCloseButton: getCloseButton,
    getActions: getActions,
    getConfirmButton: getConfirmButton,
    getDenyButton: getDenyButton,
    getCancelButton: getCancelButton,
    getLoader: getLoader,
    getFooter: getFooter,
    getTimerProgressBar: getTimerProgressBar,
    getFocusableElements: getFocusableElements,
    getValidationMessage: getValidationMessage,
    isLoading: isLoading,
    fire: fire,
    mixin: mixin,
    showLoading: showLoading,
    enableLoading: showLoading,
    getTimerLeft: getTimerLeft,
    stopTimer: stopTimer,
    resumeTimer: resumeTimer,
    toggleTimer: toggleTimer,
    increaseTimer: increaseTimer,
    isTimerRunning: isTimerRunning,
    bindClickHandler: bindClickHandler
  });

  let currentInstance;

  class SweetAlert {
    constructor() {
      // Prevent run in Node env
      if (typeof window === 'undefined') {
        return;
      }

      currentInstance = this; // @ts-ignore

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      const outerParams = Object.freeze(this.constructor.argsToParams(args));
      Object.defineProperties(this, {
        params: {
          value: outerParams,
          writable: false,
          enumerable: true,
          configurable: true
        }
      }); // @ts-ignore

      const promise = currentInstance._main(currentInstance.params);

      privateProps.promise.set(this, promise);
    }

    _main(userParams) {
      let mixinParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      showWarningsForParams(Object.assign({}, mixinParams, userParams));

      if (globalState.currentInstance) {
        // @ts-ignore
        globalState.currentInstance._destroy();

        if (isModal()) {
          unsetAriaHidden();
        }
      }

      globalState.currentInstance = currentInstance;
      const innerParams = prepareParams(userParams, mixinParams);
      setParameters(innerParams);
      Object.freeze(innerParams); // clear the previous timer

      if (globalState.timeout) {
        globalState.timeout.stop();
        delete globalState.timeout;
      } // clear the restore focus timeout


      clearTimeout(globalState.restoreFocusTimeout);
      const domCache = populateDomCache(currentInstance);
      render(currentInstance, innerParams);
      privateProps.innerParams.set(currentInstance, innerParams);
      return swalPromise(currentInstance, domCache, innerParams);
    } // `catch` cannot be the name of a module export, so we define our thenable methods here instead


    then(onFulfilled) {
      const promise = privateProps.promise.get(this);
      return promise.then(onFulfilled);
    }

    finally(onFinally) {
      const promise = privateProps.promise.get(this);
      return promise.finally(onFinally);
    }

  }

  const swalPromise = (instance, domCache, innerParams) => {
    return new Promise((resolve, reject) => {
      // functions to handle all closings/dismissals
      const dismissWith = dismiss => {
        instance.closePopup({
          isDismissed: true,
          dismiss
        });
      };

      privateMethods.swalPromiseResolve.set(instance, resolve);
      privateMethods.swalPromiseReject.set(instance, reject);

      domCache.confirmButton.onclick = () => handleConfirmButtonClick(instance);

      domCache.denyButton.onclick = () => handleDenyButtonClick(instance);

      domCache.cancelButton.onclick = () => handleCancelButtonClick(instance, dismissWith);

      domCache.closeButton.onclick = () => dismissWith(DismissReason.close);

      handlePopupClick(instance, domCache, dismissWith);
      addKeydownHandler(instance, globalState, innerParams, dismissWith);
      handleInputOptionsAndValue(instance, innerParams);
      openPopup(innerParams);
      setupTimer(globalState, innerParams, dismissWith);
      initFocus(domCache, innerParams); // Scroll container to top on open (#1247, #1946)

      setTimeout(() => {
        domCache.container.scrollTop = 0;
      });
    });
  };

  const prepareParams = (userParams, mixinParams) => {
    const templateParams = getTemplateParams(userParams);
    const params = Object.assign({}, defaultParams, mixinParams, templateParams, userParams); // precedence is described in #2131

    params.showClass = Object.assign({}, defaultParams.showClass, params.showClass);
    params.hideClass = Object.assign({}, defaultParams.hideClass, params.hideClass);
    return params;
  };
  /**
   * @param {SweetAlert2} instance
   * @returns {DomCache}
   */


  const populateDomCache = instance => {
    const domCache = {
      popup: getPopup(),
      container: getContainer(),
      actions: getActions(),
      confirmButton: getConfirmButton(),
      denyButton: getDenyButton(),
      cancelButton: getCancelButton(),
      loader: getLoader(),
      closeButton: getCloseButton(),
      validationMessage: getValidationMessage(),
      progressSteps: getProgressSteps()
    };
    privateProps.domCache.set(instance, domCache);
    return domCache;
  };
  /**
   * @param {GlobalState} globalState
   * @param {SweetAlertOptions} innerParams
   * @param {function} dismissWith
   */


  const setupTimer = (globalState$$1, innerParams, dismissWith) => {
    const timerProgressBar = getTimerProgressBar();
    hide(timerProgressBar);

    if (innerParams.timer) {
      globalState$$1.timeout = new Timer(() => {
        dismissWith('timer');
        delete globalState$$1.timeout;
      }, innerParams.timer);

      if (innerParams.timerProgressBar) {
        show(timerProgressBar);
        applyCustomClass(timerProgressBar, innerParams, 'timerProgressBar');
        setTimeout(() => {
          if (globalState$$1.timeout && globalState$$1.timeout.running) {
            // timer can be already stopped or unset at this point
            animateTimerProgressBar(innerParams.timer);
          }
        });
      }
    }
  };
  /**
   * @param {DomCache} domCache
   * @param {SweetAlertOptions} innerParams
   */


  const initFocus = (domCache, innerParams) => {
    if (innerParams.toast) {
      return;
    }

    if (!callIfFunction(innerParams.allowEnterKey)) {
      return blurActiveElement();
    }

    if (!focusButton(domCache, innerParams)) {
      setFocus(innerParams, -1, 1);
    }
  };
  /**
   * @param {DomCache} domCache
   * @param {SweetAlertOptions} innerParams
   * @returns {boolean}
   */


  const focusButton = (domCache, innerParams) => {
    if (innerParams.focusDeny && isVisible(domCache.denyButton)) {
      domCache.denyButton.focus();
      return true;
    }

    if (innerParams.focusCancel && isVisible(domCache.cancelButton)) {
      domCache.cancelButton.focus();
      return true;
    }

    if (innerParams.focusConfirm && isVisible(domCache.confirmButton)) {
      domCache.confirmButton.focus();
      return true;
    }

    return false;
  };

  const blurActiveElement = () => {
    if (document.activeElement instanceof HTMLElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
  }; // This anti-war message will only be shown to Russian users visiting Russian sites


  if (typeof window !== 'undefined' && /^ru\b/.test(navigator.language) && location.host.match(/\.(ru|su|xn--p1ai)$/)) {
    if (Math.random() < 0.1) {
      const noWar = document.createElement('div');
      noWar.className = 'leave-russia-now-and-apply-your-skills-to-the-world';
      const video = getRandomElement([{
        text: "\u0412 \u043D\u0438\u0436\u0435\u043F\u0440\u0438\u0432\u0435\u0434\u0451\u043D\u043D\u043E\u043C \u0432\u0438\u0434\u0435\u043E \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0435\u0442\u0441\u044F \u043A\u0430\u043A \u043A\u0430\u0436\u0434\u044B\u0439 \u0438\u0437 \u043D\u0430\u0441 \u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u043C\u043E\u0447\u044C \u0432 \u0442\u043E\u043C,\n        <strong>\u0447\u0442\u043E\u0431\u044B \u044D\u0442\u0430 \u0431\u0435\u0441\u0441\u043C\u044B\u0441\u043B\u0435\u043D\u043D\u0430\u044F \u0438 \u0431\u0435\u0441\u0447\u0435\u043B\u043E\u0432\u0435\u0447\u043D\u0430\u044F \u0432\u043E\u0439\u043D\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u043B\u0430\u0441\u044C</strong>:",
        id: '4CfDhaRkw7I'
      }, {
        text: 'Эмпатия - главное <strong>человеческое</strong> чувство. Способность сопереживать. <strong>Способность поставить себя на место другого.</strong>',
        id: 's-GLAIY4DXA'
      }]);
      setInnerHtml(noWar, "\n      <div>\n        \u0415\u0441\u043B\u0438 \u043C\u044B \u043D\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u043C \u0432\u043E\u0439\u043D\u0443, \u043E\u043D\u0430 \u043F\u0440\u0438\u0434\u0435\u0442 \u0432 \u0434\u043E\u043C <strong>\u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0438\u0437 \u043D\u0430\u0441</strong> \u0438 \u0435\u0451 \u043F\u043E\u0441\u043B\u0435\u0434\u0441\u0442\u0432\u0438\u044F \u0431\u0443\u0434\u0443\u0442 <strong>\u0443\u0436\u0430\u0441\u0430\u044E\u0449\u0438\u043C\u0438</strong>.\n      </div>\n      <div>\n        \u041F\u0443\u0442\u0438\u043D\u0441\u043A\u0438\u0439 \u0440\u0435\u0436\u0438\u043C \u0437\u0430 20 \u0441 \u043B\u0438\u0448\u043D\u0438\u043C \u043B\u0435\u0442 \u0441\u0432\u043E\u0435\u0433\u043E \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043E\u0432\u0430\u043D\u0438\u044F \u0432\u0434\u043E\u043B\u0431\u0438\u043B \u043D\u0430\u043C, \u0447\u0442\u043E \u043C\u044B \u0431\u0435\u0441\u0441\u0438\u043B\u044C\u043D\u044B \u0438 \u043E\u0434\u0438\u043D \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u043D\u0438\u0447\u0435\u0433\u043E \u0441\u0434\u0435\u043B\u0430\u0442\u044C. <strong>\u042D\u0442\u043E \u043D\u0435 \u0442\u0430\u043A!</strong>\n      </div>\n      <div>\n        ".concat(video.text, "\n      </div>\n      <iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/").concat(video.id, "\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n      <div>\n        \u041D\u0435\u0442 \u0432\u043E\u0439\u043D\u0435!\n      </div>\n      "));
      const closeButton = document.createElement('button');
      closeButton.innerHTML = '&times;';

      closeButton.onclick = () => noWar.remove();

      noWar.appendChild(closeButton);
      window.addEventListener('load', () => {
        setTimeout(() => {
          document.body.appendChild(noWar);
        }, 1000);
      });
    }
  } // Assign instance methods from src/instanceMethods/*.js to prototype


  Object.assign(SweetAlert.prototype, instanceMethods); // Assign static methods from src/staticMethods/*.js to constructor

  Object.assign(SweetAlert, staticMethods); // Proxy to instance methods to constructor, for now, for backwards compatibility

  Object.keys(instanceMethods).forEach(key => {
    SweetAlert[key] = function () {
      if (currentInstance) {
        return currentInstance[key](...arguments);
      }
    };
  });
  SweetAlert.DismissReason = DismissReason;
  SweetAlert.version = '11.4.29';

  const Swal = SweetAlert; // @ts-ignore

  Swal.default = Swal;

  return Swal;

}));
if (typeof this !== 'undefined' && this.Sweetalert2){  this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2}

"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,".swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4!important;grid-row:1/4!important;grid-template-columns:1fr 99fr 1fr;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px hsla(0deg,0%,0%,.075),0 1px 2px hsla(0deg,0%,0%,.075),1px 2px 4px hsla(0deg,0%,0%,.075),1px 3px 8px hsla(0deg,0%,0%,.075),2px 4px 16px hsla(0deg,0%,0%,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;box-sizing:border-box;grid-template-areas:\"top-start     top            top-end\" \"center-start  center         center-end\" \"bottom-start  bottom-center  bottom-end\";grid-template-rows:minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto);grid-template-rows:minmax(min-content,auto) minmax(min-content,auto) minmax(min-content,auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-bottom-start,.swal2-container.swal2-center-start,.swal2-container.swal2-top-start{grid-template-columns:minmax(0,1fr) auto auto}.swal2-container.swal2-bottom,.swal2-container.swal2-center,.swal2-container.swal2-top{grid-template-columns:auto minmax(0,1fr) auto}.swal2-container.swal2-bottom-end,.swal2-container.swal2-center-end,.swal2-container.swal2-top-end{grid-template-columns:auto auto minmax(0,1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-left>.swal2-popup,.swal2-container.swal2-center-start>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-left>.swal2-popup,.swal2-container.swal2-bottom-start>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-fullscreen>.swal2-popup,.swal2-container.swal2-grow-row>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none!important}.swal2-popup{display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0,100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 transparent #2778c4 transparent}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px transparent;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:0}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto!important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:0 0;color:#ccc;font-family:serif;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close:focus{outline:0;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em 2em 3px}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:0 0;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px transparent;color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 3px;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:0 0;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:0 0;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:.25em solid transparent;border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-warning.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .5s;animation:swal2-animate-i-mark .5s}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .8s;animation:swal2-animate-i-mark .8s}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-question-mark .8s;animation:swal2-animate-question-mark .8s}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:0 0;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}.leave-russia-now-and-apply-your-skills-to-the-world{display:flex;position:fixed;z-index:1939;top:0;right:0;bottom:0;left:0;flex-direction:column;align-items:center;justify-content:center;padding:25px 0 20px;background:#20232a;color:#fff;text-align:center}.leave-russia-now-and-apply-your-skills-to-the-world div{max-width:560px;margin:10px;line-height:146%}.leave-russia-now-and-apply-your-skills-to-the-world iframe{max-width:100%;max-height:55.5555555556vmin;margin:16px auto}.leave-russia-now-and-apply-your-skills-to-the-world strong{border-bottom:2px dashed #fff}.leave-russia-now-and-apply-your-skills-to-the-world button{display:flex;position:fixed;z-index:1940;top:0;right:0;align-items:center;justify-content:center;width:48px;height:48px;margin-right:10px;margin-bottom:-10px;border:none;background:0 0;color:#aaa;font-size:48px;font-weight:700;cursor:pointer}.leave-russia-now-and-apply-your-skills-to-the-world button:hover{color:#fff}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@-webkit-keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@-webkit-keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{background-color:transparent!important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:transparent;pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}");

/***/ }),

/***/ "./resources/js/components/PropertyAddEdit.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/PropertyAddEdit.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PropertyAddEdit_vue_vue_type_template_id_23ed541b_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PropertyAddEdit.vue?vue&type=template&id=23ed541b&ts=true */ "./resources/js/components/PropertyAddEdit.vue?vue&type=template&id=23ed541b&ts=true");
/* harmony import */ var _PropertyAddEdit_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PropertyAddEdit.vue?vue&type=script&lang=ts */ "./resources/js/components/PropertyAddEdit.vue?vue&type=script&lang=ts");
/* harmony import */ var D_LaravelWork_Laravel_P_Project_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_LaravelWork_Laravel_P_Project_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_PropertyAddEdit_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PropertyAddEdit_vue_vue_type_template_id_23ed541b_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/PropertyAddEdit.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/global/AgencyAgentsAvatars.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/global/AgencyAgentsAvatars.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AgencyAgentsAvatars_vue_vue_type_template_id_519858c6_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AgencyAgentsAvatars.vue?vue&type=template&id=519858c6&ts=true */ "./resources/js/components/global/AgencyAgentsAvatars.vue?vue&type=template&id=519858c6&ts=true");
/* harmony import */ var _AgencyAgentsAvatars_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AgencyAgentsAvatars.vue?vue&type=script&lang=ts */ "./resources/js/components/global/AgencyAgentsAvatars.vue?vue&type=script&lang=ts");
/* harmony import */ var D_LaravelWork_Laravel_P_Project_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_LaravelWork_Laravel_P_Project_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_AgencyAgentsAvatars_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AgencyAgentsAvatars_vue_vue_type_template_id_519858c6_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/global/AgencyAgentsAvatars.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/global/Loader.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/global/Loader.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Loader_vue_vue_type_template_id_e42e3f38__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Loader.vue?vue&type=template&id=e42e3f38 */ "./resources/js/components/global/Loader.vue?vue&type=template&id=e42e3f38");
/* harmony import */ var _Loader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Loader.vue?vue&type=script&lang=js */ "./resources/js/components/global/Loader.vue?vue&type=script&lang=js");
/* harmony import */ var D_LaravelWork_Laravel_P_Project_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_LaravelWork_Laravel_P_Project_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Loader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Loader_vue_vue_type_template_id_e42e3f38__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/global/Loader.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/global/PermissionError.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/global/PermissionError.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PermissionError_vue_vue_type_template_id_2810f710_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PermissionError.vue?vue&type=template&id=2810f710&ts=true */ "./resources/js/components/global/PermissionError.vue?vue&type=template&id=2810f710&ts=true");
/* harmony import */ var _PermissionError_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PermissionError.vue?vue&type=script&lang=ts */ "./resources/js/components/global/PermissionError.vue?vue&type=script&lang=ts");
/* harmony import */ var D_LaravelWork_Laravel_P_Project_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_LaravelWork_Laravel_P_Project_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_PermissionError_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PermissionError_vue_vue_type_template_id_2810f710_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/global/PermissionError.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/global/ProfileAvatarAndName.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/components/global/ProfileAvatarAndName.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProfileAvatarAndName_vue_vue_type_template_id_f0b0df5e_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProfileAvatarAndName.vue?vue&type=template&id=f0b0df5e&ts=true */ "./resources/js/components/global/ProfileAvatarAndName.vue?vue&type=template&id=f0b0df5e&ts=true");
/* harmony import */ var _ProfileAvatarAndName_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProfileAvatarAndName.vue?vue&type=script&lang=ts */ "./resources/js/components/global/ProfileAvatarAndName.vue?vue&type=script&lang=ts");
/* harmony import */ var D_LaravelWork_Laravel_P_Project_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_LaravelWork_Laravel_P_Project_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_ProfileAvatarAndName_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ProfileAvatarAndName_vue_vue_type_template_id_f0b0df5e_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/global/ProfileAvatarAndName.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/global/Status.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/global/Status.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Status_vue_vue_type_template_id_e9ff0e7a_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Status.vue?vue&type=template&id=e9ff0e7a&ts=true */ "./resources/js/components/global/Status.vue?vue&type=template&id=e9ff0e7a&ts=true");
/* harmony import */ var _Status_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Status.vue?vue&type=script&lang=ts */ "./resources/js/components/global/Status.vue?vue&type=script&lang=ts");
/* harmony import */ var D_LaravelWork_Laravel_P_Project_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_LaravelWork_Laravel_P_Project_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Status_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Status_vue_vue_type_template_id_e9ff0e7a_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/global/Status.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/modals/FileManagerModal.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/modals/FileManagerModal.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FileManagerModal_vue_vue_type_template_id_75cba16c_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileManagerModal.vue?vue&type=template&id=75cba16c&ts=true */ "./resources/js/components/modals/FileManagerModal.vue?vue&type=template&id=75cba16c&ts=true");
/* harmony import */ var _FileManagerModal_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FileManagerModal.vue?vue&type=script&lang=ts */ "./resources/js/components/modals/FileManagerModal.vue?vue&type=script&lang=ts");
/* harmony import */ var D_LaravelWork_Laravel_P_Project_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_LaravelWork_Laravel_P_Project_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_FileManagerModal_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_FileManagerModal_vue_vue_type_template_id_75cba16c_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/modals/FileManagerModal.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/PropertyAddEdit.vue?vue&type=script&lang=ts":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/PropertyAddEdit.vue?vue&type=script&lang=ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PropertyAddEdit_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PropertyAddEdit_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/ts-loader/index.js??clonedRuleSet-22!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PropertyAddEdit.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PropertyAddEdit.vue?vue&type=script&lang=ts");
 

/***/ }),

/***/ "./resources/js/components/global/AgencyAgentsAvatars.vue?vue&type=script&lang=ts":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/global/AgencyAgentsAvatars.vue?vue&type=script&lang=ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AgencyAgentsAvatars_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AgencyAgentsAvatars_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/ts-loader/index.js??clonedRuleSet-22!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AgencyAgentsAvatars.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/AgencyAgentsAvatars.vue?vue&type=script&lang=ts");
 

/***/ }),

/***/ "./resources/js/components/global/PermissionError.vue?vue&type=script&lang=ts":
/*!************************************************************************************!*\
  !*** ./resources/js/components/global/PermissionError.vue?vue&type=script&lang=ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermissionError_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermissionError_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/ts-loader/index.js??clonedRuleSet-22!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PermissionError.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/PermissionError.vue?vue&type=script&lang=ts");
 

/***/ }),

/***/ "./resources/js/components/global/ProfileAvatarAndName.vue?vue&type=script&lang=ts":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/global/ProfileAvatarAndName.vue?vue&type=script&lang=ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileAvatarAndName_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileAvatarAndName_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/ts-loader/index.js??clonedRuleSet-22!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ProfileAvatarAndName.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/ProfileAvatarAndName.vue?vue&type=script&lang=ts");
 

/***/ }),

/***/ "./resources/js/components/global/Status.vue?vue&type=script&lang=ts":
/*!***************************************************************************!*\
  !*** ./resources/js/components/global/Status.vue?vue&type=script&lang=ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Status_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Status_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/ts-loader/index.js??clonedRuleSet-22!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Status.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/Status.vue?vue&type=script&lang=ts");
 

/***/ }),

/***/ "./resources/js/components/modals/FileManagerModal.vue?vue&type=script&lang=ts":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/modals/FileManagerModal.vue?vue&type=script&lang=ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FileManagerModal_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FileManagerModal_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/ts-loader/index.js??clonedRuleSet-22!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FileManagerModal.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/modals/FileManagerModal.vue?vue&type=script&lang=ts");
 

/***/ }),

/***/ "./resources/js/components/PropertyAddEdit.vue?vue&type=template&id=23ed541b&ts=true":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/PropertyAddEdit.vue?vue&type=template&id=23ed541b&ts=true ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PropertyAddEdit_vue_vue_type_template_id_23ed541b_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PropertyAddEdit_vue_vue_type_template_id_23ed541b_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/ts-loader/index.js??clonedRuleSet-22!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PropertyAddEdit.vue?vue&type=template&id=23ed541b&ts=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PropertyAddEdit.vue?vue&type=template&id=23ed541b&ts=true");


/***/ }),

/***/ "./resources/js/components/global/AgencyAgentsAvatars.vue?vue&type=template&id=519858c6&ts=true":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/global/AgencyAgentsAvatars.vue?vue&type=template&id=519858c6&ts=true ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AgencyAgentsAvatars_vue_vue_type_template_id_519858c6_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AgencyAgentsAvatars_vue_vue_type_template_id_519858c6_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/ts-loader/index.js??clonedRuleSet-22!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AgencyAgentsAvatars.vue?vue&type=template&id=519858c6&ts=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/AgencyAgentsAvatars.vue?vue&type=template&id=519858c6&ts=true");


/***/ }),

/***/ "./resources/js/components/global/PermissionError.vue?vue&type=template&id=2810f710&ts=true":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/global/PermissionError.vue?vue&type=template&id=2810f710&ts=true ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermissionError_vue_vue_type_template_id_2810f710_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermissionError_vue_vue_type_template_id_2810f710_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/ts-loader/index.js??clonedRuleSet-22!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PermissionError.vue?vue&type=template&id=2810f710&ts=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/PermissionError.vue?vue&type=template&id=2810f710&ts=true");


/***/ }),

/***/ "./resources/js/components/global/ProfileAvatarAndName.vue?vue&type=template&id=f0b0df5e&ts=true":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/global/ProfileAvatarAndName.vue?vue&type=template&id=f0b0df5e&ts=true ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileAvatarAndName_vue_vue_type_template_id_f0b0df5e_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileAvatarAndName_vue_vue_type_template_id_f0b0df5e_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/ts-loader/index.js??clonedRuleSet-22!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ProfileAvatarAndName.vue?vue&type=template&id=f0b0df5e&ts=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/ProfileAvatarAndName.vue?vue&type=template&id=f0b0df5e&ts=true");


/***/ }),

/***/ "./resources/js/components/global/Status.vue?vue&type=template&id=e9ff0e7a&ts=true":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/global/Status.vue?vue&type=template&id=e9ff0e7a&ts=true ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Status_vue_vue_type_template_id_e9ff0e7a_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Status_vue_vue_type_template_id_e9ff0e7a_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/ts-loader/index.js??clonedRuleSet-22!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Status.vue?vue&type=template&id=e9ff0e7a&ts=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/Status.vue?vue&type=template&id=e9ff0e7a&ts=true");


/***/ }),

/***/ "./resources/js/components/modals/FileManagerModal.vue?vue&type=template&id=75cba16c&ts=true":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/modals/FileManagerModal.vue?vue&type=template&id=75cba16c&ts=true ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FileManagerModal_vue_vue_type_template_id_75cba16c_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_22_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FileManagerModal_vue_vue_type_template_id_75cba16c_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/ts-loader/index.js??clonedRuleSet-22!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FileManagerModal.vue?vue&type=template&id=75cba16c&ts=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-22!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/modals/FileManagerModal.vue?vue&type=template&id=75cba16c&ts=true");


/***/ }),

/***/ "./resources/js/components/global/Loader.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/components/global/Loader.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Loader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Loader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Loader.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/Loader.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/global/Loader.vue?vue&type=template&id=e42e3f38":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/global/Loader.vue?vue&type=template&id=e42e3f38 ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Loader_vue_vue_type_template_id_e42e3f38__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Loader_vue_vue_type_template_id_e42e3f38__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Loader.vue?vue&type=template&id=e42e3f38 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/global/Loader.vue?vue&type=template&id=e42e3f38");


/***/ }),

/***/ "./node_modules/vue3-loading-overlay/dist/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/vue3-loading-overlay/dist/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "useLoading": () => (/* binding */ useLoading)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/**
 * Vue 3 Loading Overlay 0.0.0
 * (c) 2020
 * @license MIT
 */


var script = (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    name: "spinner",
    props: {
        color: {
            type: String,
            default: "#000",
        },
        height: {
            type: Number,
            default: 64,
        },
        width: {
            type: Number,
            default: 64,
        },
    },
});

const _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("g", {
  fill: "none",
  "fill-rule": "evenodd"
}, [
  /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("g", {
    transform: "translate(1 1)",
    "stroke-width": "2"
  }, [
    /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("circle", {
      "stroke-opacity": ".25",
      cx: "18",
      cy: "18",
      r: "18"
    }),
    /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("path", { d: "M36 18c0-9.94-8.06-18-18-18" }, [
      /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        from: "0 18 18",
        to: "360 18 18",
        dur: "0.8s",
        repeatCount: "indefinite"
      })
    ])
  ])
], -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("svg", {
    viewBox: "0 0 38 38",
    xmlns: "http://www.w3.org/2000/svg",
    width: _ctx.width,
    height: _ctx.height,
    stroke: _ctx.color
  }, [
    _hoisted_1
  ], 8 /* PROPS */, ["width", "height", "stroke"]))
}

script.render = render;
script.__file = "src/loaders/Spinner.vue";

var script$1 = (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: "dots",
  props: {
    color: {
      type: String,
      default: "#000",
    },
    height: {
      type: Number,
      default: 240,
    },
    width: {
      type: Number,
      default: 60,
    },
  },
});

const _hoisted_1$1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("circle", {
  cx: "15",
  cy: "15",
  r: "15"
}, [
  /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("animate", {
    attributeName: "r",
    from: "15",
    to: "15",
    begin: "0s",
    dur: "0.8s",
    values: "15;9;15",
    calcMode: "linear",
    repeatCount: "indefinite"
  }),
  /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("animate", {
    attributeName: "fill-opacity",
    from: "1",
    to: "1",
    begin: "0s",
    dur: "0.8s",
    values: "1;.5;1",
    calcMode: "linear",
    repeatCount: "indefinite"
  })
], -1 /* HOISTED */);
const _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("circle", {
  cx: "60",
  cy: "15",
  r: "9",
  "fill-opacity": "0.3"
}, [
  /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("animate", {
    attributeName: "r",
    from: "9",
    to: "9",
    begin: "0s",
    dur: "0.8s",
    values: "9;15;9",
    calcMode: "linear",
    repeatCount: "indefinite"
  }),
  /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("animate", {
    attributeName: "fill-opacity",
    from: "0.5",
    to: "0.5",
    begin: "0s",
    dur: "0.8s",
    values: ".5;1;.5",
    calcMode: "linear",
    repeatCount: "indefinite"
  })
], -1 /* HOISTED */);
const _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("circle", {
  cx: "105",
  cy: "15",
  r: "15"
}, [
  /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("animate", {
    attributeName: "r",
    from: "15",
    to: "15",
    begin: "0s",
    dur: "0.8s",
    values: "15;9;15",
    calcMode: "linear",
    repeatCount: "indefinite"
  }),
  /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("animate", {
    attributeName: "fill-opacity",
    from: "1",
    to: "1",
    begin: "0s",
    dur: "0.8s",
    values: "1;.5;1",
    calcMode: "linear",
    repeatCount: "indefinite"
  })
], -1 /* HOISTED */);

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("svg", {
    viewBox: "0 0 120 30",
    xmlns: "http://www.w3.org/2000/svg",
    fill: _ctx.color,
    width: _ctx.width,
    height: _ctx.height
  }, [
    _hoisted_1$1,
    _hoisted_2,
    _hoisted_3
  ], 8 /* PROPS */, ["fill", "width", "height"]))
}

script$1.render = render$1;
script$1.__file = "src/loaders/Dots.vue";

var script$2 = (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    name: "bars",
    props: {
        color: {
            type: String,
            default: "#000",
        },
        height: {
            type: Number,
            default: 40,
        },
        width: {
            type: Number,
            default: 40,
        },
    },
});

const _hoisted_1$2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("rect", {
  x: "0",
  y: "13",
  width: "4",
  height: "5"
}, [
  /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("animate", {
    attributeName: "height",
    attributeType: "XML",
    values: "5;21;5",
    begin: "0s",
    dur: "0.6s",
    repeatCount: "indefinite"
  }),
  /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("animate", {
    attributeName: "y",
    attributeType: "XML",
    values: "13; 5; 13",
    begin: "0s",
    dur: "0.6s",
    repeatCount: "indefinite"
  })
], -1 /* HOISTED */);
const _hoisted_2$1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("rect", {
  x: "10",
  y: "13",
  width: "4",
  height: "5"
}, [
  /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("animate", {
    attributeName: "height",
    attributeType: "XML",
    values: "5;21;5",
    begin: "0.15s",
    dur: "0.6s",
    repeatCount: "indefinite"
  }),
  /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("animate", {
    attributeName: "y",
    attributeType: "XML",
    values: "13; 5; 13",
    begin: "0.15s",
    dur: "0.6s",
    repeatCount: "indefinite"
  })
], -1 /* HOISTED */);
const _hoisted_3$1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("rect", {
  x: "20",
  y: "13",
  width: "4",
  height: "5"
}, [
  /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("animate", {
    attributeName: "height",
    attributeType: "XML",
    values: "5;21;5",
    begin: "0.3s",
    dur: "0.6s",
    repeatCount: "indefinite"
  }),
  /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("animate", {
    attributeName: "y",
    attributeType: "XML",
    values: "13; 5; 13",
    begin: "0.3s",
    dur: "0.6s",
    repeatCount: "indefinite"
  })
], -1 /* HOISTED */);

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 30 30",
    height: _ctx.height,
    width: _ctx.width,
    fill: _ctx.color
  }, [
    _hoisted_1$2,
    _hoisted_2$1,
    _hoisted_3$1
  ], 8 /* PROPS */, ["height", "width", "fill"]))
}

script$2.render = render$2;
script$2.__file = "src/loaders/Bars.vue";

var Loaders = {
    Spinner: script,
    Dots: script$1,
    Bars: script$2,
};

var script$3 = (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    name: "vue-loading",
    props: {
        active: Boolean,
        programmatic: Boolean,
        container: [Object, Function, HTMLElement],
        isFullPage: {
            type: Boolean,
            default: true,
        },
        enforceFocus: {
            type: Boolean,
            default: true,
        },
        lockScroll: {
            type: Boolean,
            default: false,
        },
        transition: {
            type: String,
            default: "fade",
        },
        /**
         * Allow user to hide the loader
         */
        canCancel: Boolean,
        /**
         * Do something on cancel
         */
        onCancel: {
            type: Function,
            default: () => {
                return;
            },
        },
        color: String,
        backgroundColor: String,
        blur: {
            type: String,
            default: "2px",
        },
        opacity: Number,
        width: Number,
        height: Number,
        zIndex: {
            type: Number,
            default: 100,
        },
        loader: {
            type: String,
            default: "spinner",
        },
    },
    setup(props, context) {
        const isActive = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(props.active);
        const bgStyle = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
            let ret = {
                background: props.backgroundColor,
                opacity: props.opacity,
                backdropFilter: `blur(${props.blur})`,
            };
            return ret;
        });
        const hide = () => {
            // Timeout for the animation complete before destroying
            if (props.programmatic) {
                isActive.value = false;
                setTimeout(() => {
                    return;
                }, 150);
            }
        };
        const cancel = () => {
            if (!props.canCancel || !isActive.value)
                return;
            hide();
            props.onCancel();
        };
        const keyUp = (event) => {
            if (event.keyCode === 27) {
                cancel();
            }
        };
        const disableScroll = () => {
            if (props.isFullPage && props.lockScroll) {
                document.body.classList.add("vld-shown");
            }
        };
        const enableScroll = () => {
            if (props.isFullPage && props.lockScroll) {
                document.body.classList.remove("vld-shown");
            }
        };
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
            if (props.programmatic) {
                isActive.value = true;
                document.addEventListener("keyup", keyUp);
            }
        });
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted)(() => {
            document.removeEventListener("keyup", keyUp);
        });
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(() => props.active, () => {
            isActive.value = props.active;
        });
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(isActive, () => {
            if (isActive.value) {
                disableScroll();
            }
            else {
                enableScroll();
            }
        });
        return {
            isActive,
            bgStyle,
            hide,
            cancel,
        };
    },
    components: Loaders,
});

const _hoisted_1$3 = { class: "vld-icon" };

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    ref: "root",
    name: _ctx.transition
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
        tabindex: "0",
        class: ["vld-overlay is-active", { 'is-full-page': _ctx.isFullPage }],
        "aria-busy": _ctx.isActive,
        "aria-label": "Loading",
        style: { zIndex: _ctx.zIndex }
      }, [
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
          class: "vld-background",
          onClick: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => (_ctx.cancel && _ctx.cancel(...args)), ["prevent"])),
          style: _ctx.bgStyle
        }, null, 4 /* STYLE */),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_1$3, [
          (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "before"),
          (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "default", {}, () => [
            ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)((0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDynamicComponent)(_ctx.loader), {
              color: _ctx.color,
              width: _ctx.width,
              height: _ctx.height
            }, null, 8 /* PROPS */, ["color", "width", "height"]))
          ]),
          (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "after")
        ])
      ], 14 /* CLASS, STYLE, PROPS */, ["aria-busy"]), [
        [vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isActive]
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name"]))
}

script$3.render = render$3;
script$3.__file = "src/main/Component.vue";

function createComponent(component, props, parentContainer) {
    const vnode = (0,vue__WEBPACK_IMPORTED_MODULE_0__.h)(component, props);
    const container = document.createElement('div');
    parentContainer.appendChild(container);
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.render)(vnode, container);
    return vnode.component;
}
function removeElement(el) {
    var _a;
    if (typeof el.remove !== 'undefined') {
        el.remove();
    }
    else {
        (_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(el);
    }
}
function useLoading(globalProps = {}, globalSlots = {}) {
    let instance = null;
    const loading = {
        show(props = globalProps, slots = globalSlots) {
            const forceProps = {
                programmatic: true,
                lockScroll: true,
                isFullPage: false
            };
            const propsData = Object.assign({}, globalProps, props, forceProps);
            let container = propsData.container;
            if (!propsData.container) {
                container = document.body;
                propsData.isFullPage = true;
            }
            instance = createComponent(script$3, propsData, container);
            const mergedSlots = Object.assign({}, globalSlots, slots);
            Object.keys(mergedSlots).map((name) => {
                if (instance != null) {
                    instance.slots[name] = mergedSlots[name];
                }
            });
        },
        hide() {
            if (instance != null) {
                instance.ctx.hide();
                let root = instance.vnode.el;
                removeElement(root.parentElement);
            }
        }
    };
    return loading;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (script$3);



/***/ })

}]);