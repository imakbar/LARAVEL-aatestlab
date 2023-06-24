import { defineComponent, ref, onMounted, computed, watchEffect, nextTick, getCurrentInstance, inject } from "vue";
import axios from "axios";
import store from "../../store/index";
import _ from 'lodash';
import { profile } from "console";

// https://date-fns.org/v2.26.0/docs/formatDistanceToNow
// import { compareAsc, format } from 'date-fns'

import moment from 'moment';
import 'moment-duration-format';

// const pageLevelEndPoint = ref('/setup/beds')

const helpersEndPoint = 'helpers'

export const defaultThumbnailSizes = () => {
    const thumbnailsizes = store.state.AuthModule.defaultThumbnailSizes
    return thumbnailsizes
}

export const userPermissions = () => {
    const permissions = store.state.AuthModule.userPermissions
    return permissions
}

export const hasPermission = (permission:any,permissionsAllow:any) => {
    // console.log('permission=',permission,permissionsAllow)
    const obj = findInArray(userPermissions(),{
        permission : permission,
        permissions_allow : permissionsAllow,
    })
    return obj?true:false;
}

export const userInfo = () => {
    let data : any = localStorage.getItem('userinfo');
    if(!data){
        return '';
    }
    let jsonData = JSON.parse(data)
    // console.log('jsonData.userInfo=',jsonData.userInfo)
    return jsonData.userInfo
}

export const firstName = () => {
    const data = userInfo()
    if(data.profile){
        if(data.profile.first_name){
            return data.profile.first_name
        }
        return ''
    }
}

export const lastName = () => {
    const data = userInfo()
    if(data.profile){
        if(data.profile.last_name){
            return data.profile.last_name
        }
        return ''
    }
}

export const shortName = () => {
    const data = userInfo()
    // console.log('lastName()=',lastName())
    let email = data.email?data.email:''
    if(firstName() && lastName()){
        // console.log('firstName=',firstName())
        return firstName()[0] + lastName()[0]
    } else {
        // console.log('email[0]=',email[0])
        return email[0]
    }
}

export const role = () => {
    const data = userInfo()
    if(data.role){
        if(data.role.name){
            return data.role.name
        }
        return 'N/A'
    }
}

export const roleSlug = () => {
    const data = userInfo()
    if(data.role){
        if(data.role.slug){
            return data.role.slug
        }
        return 'N/A'
    }
}

export const mediaPath = () => {
    return process.env.MIX_APP_MEDIA_PATH
}

export const appUrl = () => {
    return process.env.MIX_APP_URL
}

export const appEndPoint = () => {
    return process.env.MIX_APP_END_POINT
}

export const apiEndPoint = () => {
    return process.env.MIX_APP_API_END_POINT
}

export const completeUrl = () => {
    return `${appUrl()}`+`${apiEndPoint()}`+`${appEndPoint()}`
}

// export const helpersData = () => {
//     axios.get(`${completeUrl()}`+helpersEndPoint)
//         .then(res => {
//             console.log('helpersData=',res.data)
//             mediaIcons(res.data.mediaIcons)
//         })
// }

export const mediaIcons = () => {
    // console.log('store.state.AuthModule.helpers',store.state.AuthModule.helpers)
    if(store.state.AuthModule.helpers['mediaIcons']){
        return store.state.AuthModule.helpers['mediaIcons'];
    } 
    return 'icons not found';
}

export const mediaIcon = (type) => {
    let icon = _.find(mediaIcons(), { type: type });
    if(icon){
        return icon;
    }
    return 'icon not found';
}

export const fileSize = (size) => {
    if(size > 1000000000){
        const sizeData = size/1000000000
        const sizeDecimal = sizeData.toFixed(2)
        return sizeDecimal + 'gb'
    } else if(size > 1000000){
        const sizeData = size/1000000
        const sizeDecimal = sizeData.toFixed(2)
        return sizeDecimal + 'mb'
    } else {
        const sizeData = size/1000
        const sizeDecimal = sizeData.toFixed(2)
        return sizeDecimal + 'kb'
    }
}

export const uniqueArrayObjects = (data) => {
    // console.log('data=',data)
    return _.uniqBy(data,'role_id')
}

// export const authAvatar = (profileData) => {
//     console.log('profileData=',profileData)
//     if(profileData.profile && profileData.profile.avatar && profileData.profile.avatar.thumbnails){
//         return {
//             path: findInArray(profileData.profile.avatar.thumbnails,'thumbnail')['path']
//         }
//     } else {
//         return {
//             path: profileData.profile?profileData.profile.avatar.path:false
//         }
//     }
// }

export const currentUserThumbnails = () => {
    const data = userInfo()
    if(data.attachment){
        if(data.attachment.avatar){
            if(data.attachment.avatar.media){
                if(data.attachment.avatar.media.thumbnails){
                    return data.attachment.avatar.media.thumbnails
                }
            }
        }
        return 'N/A'
    }
}

// export const authAvatar = (authAvatar:any) => {
//     // console.log('authAvatar=',authAvatar)
//     if(authAvatar){
//         if(authAvatar.thumbnails && authAvatar.thumbnails.length > 0){
//             return {
//                 path: findInArray(authAvatar.thumbnails,{thumbnail: 'thumbnail'})['path']
//             }
//         } else {
//             return {
//                 path: '/storage/default.png'
//             }
//         }
//     } else {
//         return {
//             path: '/storage/default.png'
//         }
//     }
// }

export const findInArray = (arrayData:any,objData:any) => {
    // console.log('arrayData=',arrayData,objData)
    // var obj = _.find(arrayData, {thumbnail: strData});
    var obj = _.find(arrayData, objData);
    if(_.isObject(obj)){
        // console.log('obj=',obj)
        return obj
    } else {
        return false
    }
}

export const lodashFilterByValue = (arrayData:any,key:any,value:any) => {
    // console.log('arrayData=',arrayData,key,value)
    const array = _.filter(arrayData, (obj) => obj[key] === value);
    return array
}

export const getProfileShortName = (user:any) => {
    if(typeof user.profile == "undefined"){
        return 'N/A'
    }
    let email = user.email?user.email:''
    let firstName = user.profile.first_name?user.profile.first_name:''
    let lastName = user.profile.last_name?user.profile.last_name:''
    if(firstName != '' && lastName != ''){
        return firstName[0] + lastName[0]
    } else {
        return email[0]
    }
}

export const getFullName = (user:any) => {
    if(typeof user.profile == "undefined"){
        return 'N/A'
    }
    let email = user.email?user.email:''
    let firstName = user.profile.first_name?user.profile.first_name:''
    let lastName = user.profile.last_name?user.profile.last_name:''
    if(firstName != '' && lastName != ''){
        return firstName +' '+ lastName
    } else {
        return email
    }
}

export const getShortName = (str:any) => {
    if(str == ""){
        return 'N/A'
    }
    return str[0]
}

// export const getProfileAvatar = (authAvatar:any) => {
//     if(authAvatar){
//         if(authAvatar.thumbnails && authAvatar.thumbnails.length > 0){
//             return {
//                 path: findInArray(authAvatar.thumbnails,{thumbnail: 'thumbnail'})['path']
//             }
//         } else {
//             return {
//                 path: ''
//             }
//         }
//     } else {
//         return {
//             path: ''
//         }
//     }
// }

export const AvatarsLimit = (showCount:any,arrayData:any) => {
    // console.log('arrayData=',showCount,arrayData)
    const newArray : any = []
    arrayData.forEach((element:any) => {
        // console.log('element',element)
        // if(element){
            if(element.user || element.profile){
                newArray.push(element)
            }
        // }
    });
    const getData = _.chunk(newArray, showCount)[0]?_.chunk(newArray, showCount)[0]:[]
    // console.log('newArray.length=',newArray.length)
    // console.log('getData.length=',getData.length)
    return {
        data: getData,
        total: newArray.length > showCount? newArray.length - getData.length:0
    };
}

// export const CheckData = (recordFacilities,facilities) => {
//     console.log('recordFacilities=',recordFacilities,facilities)
//     var newArray : any = []
//     facilities.forEach((f:any) => {
//         recordFacilities.forEach((recF:any) => {
//             if(f['id'] != recF['id']){
//                 newArray.push(f)
//             }
//         });
//     });
//     console.log('newArray=',newArray)
//     return {
//         facilities: newArray
//     };
// }

export const getMedia = (media:any) => {
    if(media){
        if(media.thumbnails && media.thumbnails.length > 0){
            return {
                path: findInArray(media.thumbnails,{thumbnail: 'thumbnail'})['path']
            }
        } else {
            return {
                path: '/storage/default.png'
            }
        }
    } else {
        return {
            path: '/storage/default.png'
        }
    }
}

// export const getFeaturedImage = (media:any) => {
//     // console.log('media=',media)
//     if(media){
//         if(media.thumbnails && media.thumbnails.length > 0){
//             return {
//                 path: findInArray(media.thumbnails,{thumbnail: 'thumbnail'})['path']
//             }
//         } else {
//             return {
//                 path: '/storage/default.png'
//             }
//         }
//     } else {
//         return {
//             path: '/storage/default.png'
//         }
//     }
// }

export const pluck = (field:any,array:any) => {
    var data : any = []
    array.forEach((element:any) => {
        if(_.isObject(element)){
            data.push(element[field])
        }
    });
    return data;
}

export const differenceWith = (Obj1:any,Obj2:any,col1:string,col2:string) => {
    // console.log('Obj1, Obj2',Obj1, Obj2)
    var Obj3 = _.differenceWith(Obj1, Obj2, function (o1:any, o2:any) {
        return o1[col1] === o2[col2]
    });
    return Obj3;
}

export const selectFirstObjectData = (data:any,key:string) => {
    if(key != ''){
        var obj : any = _.first(data)
        return obj[key]
    } else {
        return _.first(data)
    }
}

// export const parentToChildFilter = (value:number,array:any,column:string) => {
//     console.log('array=',value, array, column)
//     const data = _.filter(array, { [column]: value });
//     // const data = { [column]: value }
//     const newArray : any = []
//     for (const key in array) {
//         const element = array[key];
//         console.log('element[column]=',element[column])
//         if(element[column] == value){
//             newArray.push(element)
//         }
//     }
//     console.log('newArray=',newArray)
//     return newArray;
// }

/////////////////////////////////// Begin: APP SETTINGS
export const appSettings = () => {
    let data : any = localStorage.getItem('app_settings');
    if(!data){ return ''; }
    let jsonData = JSON.parse(data)
    return jsonData
}

export const appName = () => {
    const data = appSettings()
    if(data.general){ if(data.general.app_name){ return data.general.app_name } return '' }
}

export const appTitle = () => {
    const data = appSettings()
    if(data.general){ if(data.general.app_title){ return data.general.app_title } return '' }
}

export const appEmail = () => {
    const data = appSettings()
    if(data.general){ if(data.general.app_email){ return data.general.app_email } return '' }
}

export const appPhone = () => {
    const data = appSettings()
    if(data.general){ if(data.general.app_phone){ return data.general.app_phone } return '' }
}

export const appMobile = () => {
    const data = appSettings()
    if(data.general){ if(data.general.app_mobile){ return data.general.app_mobile } return '' }
}

export const appAddress = () => {
    const data = appSettings()
    if(data.general){ if(data.general.address){ return data.general.address } return '' }
}

export const appLogoLight = () => {
    const data = appSettings()
    if(data.logos){
        if(data.logos.logo_light){
            if(data.logos.logo_light.path){
                return data.logos.logo_light.path
            }
        } 
    }
    return ''
}

export const appLogoDark = () => {
    const data = appSettings()
    if(data.logos){
        if(data.logos.logo_dark){
            if(data.logos.logo_dark.path){
                return data.logos.logo_dark.path
            }
        } 
    }
    return ''
}

export const appFavIcon = () => {
    const data = appSettings()
    if(data.logos){
        if(data.logos.fav_icon){
            if(data.logos.fav_icon.path){
                return data.logos.fav_icon.path
            }
        } 
    }
    return ''
}
/////////////////////////////////// End: APP SETTINGS

export const themeSettings = () => {
    const data = {
        // container: 'container-xxl'
    }
    return data;
}

export const localStorageKeyExist = (localStorageName:any) => {
    var exist : any = localStorage.getItem(localStorageName);
    // console.log('exist=',exist)
    if(exist === null){
        return {}
    }
    const localData : any = window.localStorage.getItem(localStorageName)
    return JSON.parse(localData);
}

export const removeLocalStorage = (localStorageName:any) => {
    window.localStorage.removeItem(localStorageName)
    return 'removed';
}

export const phoneNumberMasking = (phoneNumber:any) => {
    // return phoneNumber+' = '+
    return '('+phoneNumber.substr(-10,3) +') '+ phoneNumber.substr(-7,3) +'-'+ phoneNumber.substr(-4,4)
}

export const phoneNumberFormat = (phoneNumber:any) => {
    // return phoneNumber+' = '+
    return phoneNumber.substr(-10,10)
}

export const dateFormat = (date:any,f:string) => {
    // return format(date, f) // 'yyyy-MM-dd'
    return moment(date).format(f);
}

export const durationFormat = (date:any) => {
    var dateData = moment(date);
    return dateData.fromNow();
}



export default {
    userInfo,
    firstName,
    lastName,
    shortName,
    role,
    roleSlug,
    mediaPath,
    appUrl,
    appEndPoint,
    apiEndPoint,
    completeUrl,
    mediaIcons,
    mediaIcon,
    fileSize,
    uniqueArrayObjects,
    findInArray,
    // authAvatar,
    currentUserThumbnails,
    defaultThumbnailSizes,
    userPermissions,
    hasPermission,
    getProfileShortName,
    getFullName,
    // getProfileAvatar,
    AvatarsLimit,
    // CheckData,
    // getFeaturedImage,
    pluck,
    differenceWith,
    selectFirstObjectData,
    getShortName,
    getMedia,
    // parentToChildFilter,
    appSettings,
    appName,
    appTitle,
    appEmail,
    appPhone,
    appMobile,
    appAddress,
    appLogoLight,
    appLogoDark,
    appFavIcon,
    themeSettings,
    localStorageKeyExist,
    removeLocalStorage,
    phoneNumberMasking,
    phoneNumberFormat,
    lodashFilterByValue,
    dateFormat,
    durationFormat,
}