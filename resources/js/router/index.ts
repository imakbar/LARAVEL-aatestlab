import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from "vue-router";
import $ from "jquery";
import axios from "axios";

import store from "../store";
// import { useStore } from "vuex";
import { Actions, Mutations } from "../store/enums/StoreEnums";
import JwtService from "../services/JwtService";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/",
        component: () => import("@/layout/Layout.vue"),
        children: [
            {
                name: 'home',
                path: '/admin',
                component: () => import("@/components/Home.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false,
                // },
            },
            {
                name: 'users',
                path: '/admin/users/:userRoleType/:status?',
                component: () => import("@/components/Users.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false,
                // },
            },
            {
                name: 'tests',
                path: '/admin/tests/:status?',
                component: () => import("@/components/MainTests.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false,
                // },
            },
            {
                name: 'sub-tests',
                path: '/admin/sub-tests/:mainTestId/:status?',
                component: () => import("@/components/SubTests.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false,
                // },
            },
            {
                name: 'sub-tests-details',
                path: '/admin/sub-tests-details/:mainTestId/:subTestId/:status?',
                component: () => import("@/components/SubTestsDetails.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false,
                // },
            },
            {
                name: 'patients',
                path: '/admin/patients/:status?',
                component: () => import("@/components/Patients.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false,
                // },
            },
            {
                name: 'cases',
                path: '/admin/cases/:status?',
                component: () => import("@/components/PatientCases.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false,
                // },
            },
            {
                name: 'case',
                path: '/admin/case/:patientId',
                component: () => import("@/components/PatientCase.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false,
                // },
            },
            {
                name: 'case-edit',
                path: '/admin/case/:patientId/:caseId',
                component: () => import("@/components/PatientCaseEdit.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false,
                // },
            },
            {
                name: 'case-receipt',
                path: '/admin/case/:patientId/:caseId/receipt',
                component: () => import("@/components/PatientCaseReceipt.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false,
                // },
            },
            {
                name: 'case-payment',
                path: '/admin/case/:patientId/:caseId/payment',
                component: () => import("@/components/PatientCasePayment.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false,
                // },
            },
            {
                name: 'profile',
                path: '/admin/profile',
                component: () => import("@/components/Profile.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false,
                // },
            },
            {
                name: 'settings',
                path: '/admin/settings',
                component: () => import("@/components/Settings.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false,
                // },
            },
            {
                name: 'roles',
                path: '/admin/setup/roles/:status?',
                component: () => import("@/components/setup/Roles.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: true
                // },
            },
            {
                name: 'permissions',
                path: '/admin/setup/permissions/:status?',
                component: () => import("@/components/setup/Permissions.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: true
                // },
            },
            {
                name: 'socials',
                path: '/admin/setup/socials/:status?',
                component: () => import("@/components/setup/Socials.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: true
                // },
            },
        ]
    },
    {
        path: "/",
        component: () => import("@/layout/Auth.vue"),
        children: [
            {
                path: "/admin/login",
                name: "login",
                component: () => import("@/components/auth/LogIn.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false
                // },
            },
            {
                path: "/admin/forgot-password",
                name: "forgot-password",
                component: () => import("@/components/auth/ForgotPassword.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false
                // },
            },
            {
                path: "/admin/reset-password/:userId/:token",
                name: "reset-password",
                component: () => import("@/components/auth/ResetPassword.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false
                // },
            },
            {
                path: "/admin/register",
                name: "register",
                component: () => import("@/components/auth/Register.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false
                // },
            },
            {
                path: "/admin/404",
                name: "not-authorized",
                component: () => import("@/components/auth/404.vue"),
                // meta: {
                //     transition: 'fade',
                //     requiresAuth: false
                // },
            },
        ],
    },
];

const router = createRouter({
    // mode: 'history',
    history: createWebHistory(),
    // history: createWebHashHistory(),
    // hash: false,
    routes,
});

router.beforeEach((to) => {
    // reset config to initial state
    // store.commit(Mutations.RESET_LAYOUT_CONFIG);

    if(to.name == 'login' || to.name == 'register' || to.name == 'forgot-password' || to.name == 'reset-password' || to.name == 'not-authorized'){
        $("body").addClass("vertical-layout vertical-menu-modern blank-page navbar-floating footer-static");
    } else {
        $("body").addClass("vertical-layout vertical-menu-modern navbar-floating footer-static");
        $("body").removeClass("blank-page");
    }
    
    // console.log('JwtService.getToken()',JwtService.getToken())
    store.dispatch(Actions.VERIFY_AUTH, { api_token: JwtService.getToken() });
    store.dispatch(Actions.HELPER_FUNCTIONS);

    // console.log('from',from)
    // if(to.name == 'login' && !store.state.AuthModule.isAuthenticated){
    //     next({ name: 'login' })
    // }

    // if (!store.state.AuthModule.isAuthenticated) {
    //     next({ name: 'login' })
    // } else {
    //     next({ name: 'permissions' }) // go to wherever I'm going
    // }
  
    // Scroll page to top on every route change
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
});

/*
const pageLevelEndPoint = process.env.MIX_APP_API_END_POINT+'/is-logged-in'
const token = localStorage.getItem("authToken");
const requestHeaders = {
    headers: { Authorization: `Bearer ${token}` }
};

// var isLoggedIn = false
async function abc (event) {
    await axios.post(pageLevelEndPoint,{},requestHeaders)
    .then((res) => {
        console.log('res.data',res.data)

        setTimeout(() => {
            // console.log('VERIFY_AUTH_ACTION before',store.state.AuthModule.auth_info)
            // store.dispatch(Actions.VERIFY_AUTH_ACTION,res.data);
            // console.log('VERIFY_AUTH_ACTION after',store.state.AuthModule.auth_info)
        },1000)

        // if(res.data == false){
        //     next({ name: 'login' })
        // } else {
        //     next()
        // }
        
    })
    .catch((error) => {
        // store.dispatch(Actions.VERIFY_AUTH_ACTION,{});
        console.log(error)
    })
}

router.beforeEach((to, from, next) => {
    
    if(to.name == 'login' || to.name == 'register'){
        $("body").addClass("vertical-layout vertical-menu-modern blank-page navbar-floating footer-static");
    } else {
        $("body").addClass("vertical-layout vertical-menu-modern navbar-floating footer-static");
    }

    const myData = abc
    console.log('checkData',myData)

    // setTimeout(() => {
        // console.log('success',store.state.AuthModule.auth_info.success)
        // if(store.state.AuthModule.auth_info.success){
        // if(1==1){
        //     next({ name: 'beds' })
        // }
    // },2000)

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        
        // console.log('auth_info',store.state.AuthModule.auth_info.success)
        // if (!store.state.AuthModule.auth_info.success) {
        //     console.log('store.state.AuthModule.auth_info ==',store.state.AuthModule.auth_info.success)
        //     next({ name: 'login' })
        // } else {
        //     console.log('store.state.AuthModule.auth_info ===',store.state.AuthModule.auth_info.success)
        //     next({ name: 'permissions' }) // go to wherever I'm going
        // }

    //   axios.post(pageLevelEndPoint,{})
    //     .then((res) => {
    //         alert('asdf')
    //         console.log('isLoggedIn',res.data)
    //         if(res.data == false){
    //             next({ name: 'login' })
    //         } else {
    //             next()
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    //   if (!store.getters.isLoggedIn) {
        // next({ name: 'login' })
    //   } else {
        // next() // go to wherever I'm going
    //   }
    } else {
        // console.log('to',to.name)
        next() // does not require auth, make sure to always call next()!
    }

    // Scroll page to top on every route change
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
});
*/

export default router;