(function(e){function t(t){for(var r,i,n=t[0],o=t[1],u=t[2],c=0,h=[];c<n.length;c++)i=n[c],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&h.push(a[i][0]),a[i]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r]);d&&d(t);while(h.length)h.shift()();return l.push.apply(l,u||[]),s()}function s(){for(var e,t=0;t<l.length;t++){for(var s=l[t],r=!0,n=1;n<s.length;n++){var o=s[n];0!==a[o]&&(r=!1)}r&&(l.splice(t--,1),e=i(i.s=s[0]))}return e}var r={},a={app:0},l=[];function i(t){if(r[t])return r[t].exports;var s=r[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=r,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(s,r,function(t){return e[t]}.bind(null,r));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/cloud-storage-client/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],o=n.push.bind(n);n.push=t,n=n.slice();for(var u=0;u<n.length;u++)t(n[u]);var d=o;l.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"56d7":function(e,t,s){"use strict";s.r(t);var r=s("2b0e"),a=s("7496"),l=s("40dc"),i=s("f6c4"),n=s("2fa4"),o=s("2a7f"),u=function(){var e=this,t=e._self._c;return t(a["a"],[t(l["a"],{attrs:{app:"",dense:""}},[t(o["a"],[e._v(" Облачное хранилище ")]),t(n["a"]),t("UILogout",{on:{logout:e.logout}})],1),t("UINavigation",{attrs:{user:e.currentUser},on:{create:e.createFolder,select:e.selectFolder,"set-setting":e.setSettings}}),t(i["a"],[e.selectedFolder?t("UIFolder",{attrs:{"user-settings":e.currentUser.settings,folder:e.selectedFolder},on:{create:e.createFile,update:e.updateFileName,delete:e.deleteFile}}):e._e()],1),t("UIAuth",{attrs:{show:e.isAuth,users:e.users},on:{close:e.closeAuth,registration:function(t){e.isRegistration=!0}}}),t("UIRegistration",{attrs:{show:e.isRegistration,users:e.users},on:{record:e.recordNewUser,close:e.closeRegistration}})],1)},d=[],c=s("8336"),h=s("b0af"),p=s("99d9"),f=s("169a"),m=function(){var e=this,t=e._self._c;return t(f["a"],{attrs:{persistent:"","max-width":"480px"},scopedSlots:e._u([{key:"activator",fn:function({on:s,attr:r}){return[t(c["a"],e._g(e._b({attrs:{text:""}},"v-btn",r,!1),s),[e._v(" Выйти ")])]}}]),model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[t(h["a"],{attrs:{loading:e.loading}},[t(p["c"],[e._v(" Выйти из хранилища? ")]),t(p["a"],[t(n["a"]),t(c["a"],{attrs:{color:"primary",text:""},on:{click:function(t){e.show=!1}}},[e._v(" Остаться ")]),t(c["a"],{attrs:{color:"error",text:""},on:{click:e.logout}},[e._v(" Да, выйти ")])],1)],1)],1)},g=[];const y={baseUrl:"https://4d8ff579-6bac-4a8c-99bf-392930f838e2.mock.pstmn.io"};async function w(e){const t=new URLSearchParams(e);return await fetch(`${y.baseUrl}/cloud/auth?${t}`,{method:"POST"})}async function v(){return await fetch(y.baseUrl+"/cloud/logout",{method:"POST"})}async function b(e){let t=null;try{return t=await e,t}catch(s){alert(s)}}var x={name:"UILogout",data:()=>({show:!1,loading:!1}),methods:{async logout(){await b(v()),this.show=!1,this.$emit("logout")}}},_=x,F=s("2877"),U=Object(F["a"])(_,m,g,!1,null,null,null),k=U.exports,S=s("0798"),I=s("4bd4"),N=s("0fd9"),O=s("8654"),A=function(){var e=this,t=e._self._c;return t(f["a"],{attrs:{persistent:"",width:"460px"},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[t(h["a"],{attrs:{loading:e.loading}},[t(p["c"],[e._v(" Авторизация ")]),t(p["b"],[t(I["a"],{on:{submit:function(t){return t.preventDefault(),e.auth.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(O["a"],{attrs:{color:"primary",rules:e.formRules,label:"Логин"},model:{value:e.user.username,callback:function(t){e.$set(e.user,"username",t)},expression:"user.username"}}),t(O["a"],{attrs:{type:"password",color:"primary",rules:e.formRules,label:"Пароль"},model:{value:e.user.password,callback:function(t){e.$set(e.user,"password",t)},expression:"user.password"}}),e.error&&!e.loading?t(S["a"],{attrs:{dense:"",text:"",type:"error"}},[e._v(" Неверное имя пользователя или пароль! ")]):e._e(),t(N["a"],{attrs:{fluid:""}},[t(c["a"],{attrs:{text:"",color:"primary",type:"submit",disabled:!e.valid},on:{click:e.auth}},[e._v(" Войти в хранилище ")]),t(n["a"]),t(c["a"],{attrs:{text:"",color:"primary",disabled:!e.valid},on:{click:e.showRegistration}},[e._v(" Регистрация ")])],1)],1)],1)],1)],1)},$=[],j=(s("d9e2"),{name:"UIAuth",props:{show:{type:Boolean,required:!0},users:{type:Array,required:!0}},data:()=>({loading:!1,valid:!1,error:!1,user:{username:"",password:""},formRules:[e=>!!e||"Это обязательное пое"]}),computed:{isUserExists(){return Object.keys(this.users.find(e=>e.username===this.user.username&&e.password===this.user.password)).length}},methods:{async auth(){if(this.loading=!0,this.error=!1,this.user.username&&this.user.password)try{if(!this.isUserExists)throw Error;await w(this.user),this.$emit("close",this.users.find(e=>e.username===this.user.username&&e.password===this.user.password))}catch(e){this.error=!0}finally{this.loading=!1}},showRegistration(){this.$emit("close"),this.$emit("registration")}}}),D=j,T=Object(F["a"])(D,A,$,!1,null,null,null),E=T.exports,R=function(){var e=this,t=e._self._c;return t(f["a"],{attrs:{width:"550px"},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.close.apply(null,arguments)}},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[t(h["a"],{attrs:{loading:e.loading}},[t(p["c"],[e._v(" Регистрация ")]),t("UIAlert",{attrs:{show:e.alert.show,message:e.alert.message,type:e.alert.type}}),t(p["b"],[t(I["a"],{on:{submit:function(t){return t.preventDefault(),e.record.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(O["a"],{attrs:{color:"primary",rules:e.formRules,label:"Логин"},model:{value:e.user.username,callback:function(t){e.$set(e.user,"username",t)},expression:"user.username"}}),t(O["a"],{attrs:{type:"password",color:"primary",rules:e.formRules,label:"Пароль"},model:{value:e.user.password,callback:function(t){e.$set(e.user,"password",t)},expression:"user.password"}}),t(O["a"],{attrs:{type:"text",color:"primary",rules:e.formRules,label:"Имя"},model:{value:e.user.firstName,callback:function(t){e.$set(e.user,"firstName",t)},expression:"user.firstName"}}),t(O["a"],{attrs:{type:"text",color:"primary",rules:e.formRules,label:"Фамилия"},model:{value:e.user.lastName,callback:function(t){e.$set(e.user,"lastName",t)},expression:"user.lastName"}}),e.error&&!e.loading?t(S["a"],{attrs:{dense:"",text:"",type:"error"}},[e._v(" Неверное имя пользователя или пароль! ")]):e._e(),t(N["a"],{attrs:{fluid:""}},[t(c["a"],{attrs:{text:"",color:"error"},on:{click:e.close}},[e._v(" Отмена ")]),t(n["a"]),t(c["a"],{attrs:{text:"",color:"primary",type:"submit",large:""}},[e._v(" Регистрация ")])],1)],1)],1)],1)],1)},C=[],P=function(){var e=this,t=e._self._c;return e.show?t(S["a"],{attrs:{type:e.type}},[e._v(" "+e._s(e.message)+" ")]):e._e()},z=[],q={name:"UIAlert",props:{show:{type:Boolean,required:!0},message:{type:String,required:!0},type:{type:String,required:!0}}},L=q,M=Object(F["a"])(L,P,z,!1,null,null,null),J=M.exports,B={name:"UIRegistration",components:{UIAlert:J},props:{show:{type:Boolean,required:!0},users:{type:Array,required:!0}},data:()=>({loading:!1,valid:!1,error:!1,user:{username:"",password:"",firstName:"",lastName:"",folders:[],settings:{displaying:"table"}},alert:{show:!1,message:"",type:""},formRules:[e=>!!e||"Это обязательное пое"]}),computed:{isUserFieldsExist(){return this.user.username&&this.user.password&&this.user.firstName&&this.user.lastName},isUserExists(){return this.users.find(e=>e.username===this.user.username)}},methods:{async record(){this.loading=!0,this.error=!1,this.isUserFieldsExist&&(this.isUserExists?this.showAlert({message:"Пользователь с таким логином уже существует",type:"error"}):(this.$emit("record",this.user),this.close()))},showAlert(e){this.alert.show=!0,this.alert.message=e.message,this.alert.type=e.type},close(){this.$emit("close")}}},G=B,H=Object(F["a"])(G,R,C,!1,null,null,null),K=H.exports,Q=s("ce7e"),V=s("132d"),W=s("8860"),X=s("da13"),Y=s("5d23"),Z=s("1baa"),ee=s("34c3"),te=s("f774"),se=function(){var e=this,t=e._self._c;return t(te["a"],{attrs:{app:"",permanent:""},scopedSlots:e._u([{key:"append",fn:function(){return[t("UISettings",{attrs:{user:e.user},on:{save:e.getSettings}})]},proxy:!0}])},[e.user?t(W["a"],{attrs:{dense:"",nav:""}},[t(X["a"],{attrs:{"two-line":""}},[t(Y["a"],[t(Y["c"],[e._v(" "+e._s(e.fullName)+" ")]),t(Y["b"],[e._v(" "+e._s(e.fullSize||0)+" B ")])],1)],1),t(Q["a"]),t("UIFolderDialog",{attrs:{isAlert:e.isAlert},on:{create:e.createFolder}}),t(Z["a"],{attrs:{"active-class":"deep-purple--text text--accent-4"},model:{value:e.selectedFolder,callback:function(t){e.selectedFolder=t},expression:"selectedFolder"}},e._l(e.user.folders,(function(s){return t(X["a"],{key:s.id,attrs:{value:s,link:"","two-line":""}},[t(ee["a"],[t(V["a"],[e._v("mdi-folder")])],1),t(Y["a"],[t(Y["c"],[e._v(" "+e._s(s.name)+" ")]),t(Y["b"],[e._v(" "+e._s(e.getFolderSize(s)||0)+" B ")])],1)],1)})),1)],1):t("span",[e._v(" Пользователь не найден ")])],1)},re=[],ae=(s("13d5"),function(){var e=this,t=e._self._c;return t(f["a"],{attrs:{"max-width":"480px"},scopedSlots:e._u([{key:"activator",fn:function({on:s,attr:r}){return[t(c["a"],e._g(e._b({staticClass:"my-2",staticStyle:{"font-size":"12px"},attrs:{text:""}},"v-btn",r,!1),s),[e._v(" + Создать папку ")])]}}]),model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[t(h["a"],{attrs:{loading:e.loading}},[t(p["c"],[e._v(" Создать папку ")]),t(p["b"],[t(O["a"],{attrs:{autofocus:"",color:"primary",label:"Имя папки"},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.createFolder.apply(null,arguments)}},model:{value:e.folderName,callback:function(t){e.folderName=t},expression:"folderName"}}),t("UIAlert",{attrs:{show:e.isAlert,message:"Папка уже существует",type:"error"}})],1),t(p["a"],[t(c["a"],{attrs:{text:"",color:"error"},on:{click:e.close}},[e._v(" Отмена ")]),t(n["a"]),t(c["a"],{attrs:{text:"",color:"primary",disabled:!e.folderName},on:{click:e.createFolder}},[e._v(" Создать ")])],1)],1)],1)}),le=[],ie={name:"UIFolderDialog",components:{UIAlert:J},props:{isAlert:{type:Boolean,required:!0}},data:()=>({show:!1,loading:!1,folderName:""}),methods:{createFolder(){this.$emit("create",this.folderName),this.folderName="",this.close()},close(){this.show=!1}}},ne=ie,oe=Object(F["a"])(ne,ae,le,!1,null,null,null),ue=oe.exports,de=function(){var e=this,t=e._self._c;return t(f["a"],{attrs:{"max-width":"480px"},scopedSlots:e._u([{key:"activator",fn:function({on:s,attr:r}){return[t(c["a"],e._g(e._b({staticClass:"my-2",staticStyle:{"font-size":"12px"},attrs:{text:"",block:""}},"v-btn",r,!1),s),[e._v(" Настройки ")])]}}]),model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[t(h["a"],[t(p["c"],[e._v(" Настройки ")]),t(p["b"],[t("UIDisplaying",{model:{value:e.user.settings.displaying,callback:function(t){e.$set(e.user.settings,"displaying",t)},expression:"user.settings.displaying"}})],1),t(p["a"],[t(c["a"],{attrs:{text:"",color:"error"},on:{click:function(t){e.show=!1}}},[e._v(" Отменить ")]),t(n["a"]),t(c["a"],{attrs:{text:"",color:"primary"},on:{click:function(t){return e.saveSetting()}}},[e._v(" Сохранить ")])],1)],1)],1)},ce=[],he=s("b974"),pe=function(){var e=this,t=e._self._c;return t("div",{staticClass:"text-center"},[t(he["a"],{attrs:{items:e.items,"item-value":e=>e.value,"item-text":e=>e.title,label:"Отобразить как",outlined:""},model:{value:e.displaying,callback:function(t){e.displaying=t},expression:"displaying"}})],1)},fe=[],me={name:"UIDisplaying",props:{value:{type:String,required:!0}},data:()=>({items:[{title:"Табличный",value:"table"},{title:"Сетка",value:"grid"}]}),computed:{displaying:{get(){return this.value},set(e){this.$emit("input",e)}}}},ge=me,ye=Object(F["a"])(ge,pe,fe,!1,null,null,null),we=ye.exports,ve={name:"UISettings",components:{UIDisplaying:we},props:{user:{type:Object||null}},data:()=>({show:!1}),methods:{saveSetting(){this.$emit("save",this.user.settings.displaying),this.show=!1}}},be=ve,xe=Object(F["a"])(be,de,ce,!1,null,null,null),_e=xe.exports,Fe={name:"UINavigation",components:{UISettings:_e,UIFolderDialog:ue},props:{user:{type:Object||null}},data:()=>({selectedFolder:null,isAlert:!1}),computed:{fullName(){return`${this.user.firstName} ${this.user.lastName}`},fullSize(){if(this.user.folders.length){const e=this.user.folders.map(e=>e.files)[0];if(e)return e.map(e=>e.size).reduce((e,t)=>e+t,0)}return 0}},watch:{selectedFolder:{handler(e){e&&this.$emit("select",e)}}},methods:{async createFolder(e){if(this.isAlert=!1,this.user.folders.length&&this.user.folders.find(t=>t.name===e))return void(this.isAlert=!0);const t={name:e,id:this.user.folders.length?this.user.folders[this.user.folders.length-1].id+1:1};this.user.folders.push(t),this.$emit("create",this.user)},getFolderSize(e){if(e.files){const t=e.files.map(e=>e.size);return t.reduce((e,t)=>e+t,0)}},getSettings(e){this.$emit("set-setting",e)}}},Ue=Fe,ke=Object(F["a"])(Ue,se,re,!1,null,null,null),Se=ke.exports,Ie=s("62ad"),Ne=s("2e4b"),Oe=s("23a7"),Ae=s("e449"),$e=function(){var e=this,t=e._self._c;return t("UIPage",[t(Ie["a"],[t(N["a"],[t(Oe["a"],{attrs:{rules:e.rules,label:"Загрузить файл","show-size":"",counter:"",outlined:""},model:{value:e.newFile,callback:function(t){e.newFile=t},expression:"newFile"}}),t(Ae["a"],{attrs:{"close-on-content-click":!1,transition:"scale-transition","min-width":"auto","offset-y":""},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:r}){return[t(O["a"],e._g(e._b({staticClass:"mx-8 shrink",attrs:{label:"Когда удалить файл?",disabled:!e.newFile,readonly:"",outlined:"",clearable:""},model:{value:e.endDate,callback:function(t){e.endDate=t},expression:"endDate"}},"v-text-field",r,!1),s))]}}]),model:{value:e.isMenuShow,callback:function(t){e.isMenuShow=t},expression:"isMenuShow"}},[t(Ne["a"],{attrs:{min:e.minDate},model:{value:e.endDate,callback:function(t){e.endDate=t},expression:"endDate"}})],1),t(c["a"],{staticClass:"ml-4",attrs:{disabled:!e.newFile,fab:""},on:{click:e.createFile}},[t(V["a"],[e._v("mdi-send")])],1)],1),t("UIAlert",{attrs:{show:e.isAlert,message:"Недопустимый файл",type:"error"}}),e.isFilesExist?t(N["a"],{staticClass:"mx-5"},[t("h4",{staticClass:"mr-4"},[e._v("Фильтр: ")]),t(he["a"],{attrs:{items:e.allTypes,label:"Тип файла",outlined:"",clearable:""},model:{value:e.fileType,callback:function(t){e.fileType=t},expression:"fileType"}})],1):e._e(),"table"===e.userSettings.displaying&&e.isFilesExist?t(h["a"],{attrs:{outlined:""}},[t(p["b"],{staticClass:"pt-10"},e._l(e.filteredFolder.length?e.filteredFolder:e.folder.files,(function(s){return t(N["a"],{key:s.id},[t("UIFolderName",{attrs:{file:s},on:{download:e.downloadFile,update:e.updateFileName,delete:e.deleteFile}})],1)})),1)],1):e._e(),"grid"===e.userSettings.displaying&&e.isFilesExist?t(h["a"],{attrs:{outlined:""}},[t(p["b"],{staticClass:"pt-10"},[t(N["a"],{attrs:{dense:""}},e._l(e.filteredFolder.length?e.filteredFolder:e.folder.files,(function(s){return t(Ie["a"],{key:s.id,attrs:{cols:"4"}},[t(h["a"],{attrs:{outlined:""}},[t(p["b"],[t("UIFolderName",{attrs:{file:s},on:{download:e.downloadFile,update:e.updateFileName,delete:e.deleteFile}})],1)],1)],1)})),1)],1)],1):e._e()],1)],1)},je=[],De=s("a523"),Te=function(){var e=this,t=e._self._c;return t(De["a"],{attrs:{fuild:""}},[e._t("default")],2)},Ee=[],Re={name:"UIPage"},Ce=Re,Pe=Object(F["a"])(Ce,Te,Ee,!1,null,null,null),ze=Pe.exports,qe=function(){var e=this,t=e._self._c;return t(O["a"],{attrs:{outlined:"","prepend-icon":"mdi-file","append-icon":"mdi-download","append-outer-icon":"mdi-delete"},on:{"click:append-outer":e.deleteFile,"click:append":e.downloadFile},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}})},Le=[],Me={name:"UIFolderName",props:{file:{type:Object,required:!0}},computed:{fileName:{get(){return this.file.name.split(".")[0]},set(e){this.$emit("update",{id:this.file.id,name:e})}}},methods:{downloadFile(){this.$emit("download",this.file)},deleteFile(){this.$emit("delete",this.file.id)}}},Je=Me,Be=Object(F["a"])(Je,qe,Le,!1,null,null,null),Ge=Be.exports;function He(e){let t=e.split(".");return t[t.length-1]}var Ke={name:"UIFolder",components:{UIAlert:J,UIFolderName:Ge,UIPage:ze},props:{userSettings:{type:Object,required:!0},folder:Object||null},data:()=>({isAlert:!1,isMenuShow:!1,fileType:"",fileName:"",newFile:null,endDate:null,rules:[e=>!e||e.size<2e7||"Максимальный размер одного файла 20Мб!"],filteredFolder:[]}),computed:{isFilesExist(){return this.folder.files&&this.folder.files.length},allTypes(){if(this.folder.files&&this.folder.files.length){const e=new Set,t=this.folder.files.map(e=>He(e.name));return t.forEach(t=>e.add(t)),Array.from(e)}return[]},minDate(){return new Date(Date.now()-6e4*(new Date).getTimezoneOffset()).toISOString().substring(0,10)}},watch:{fileType:{handler(e){this.filteredFolder=e?this.folder.files.filter(t=>He(t.name)===e):[]}},endDate:{handler(e){this.newFile.endDate=e}}},methods:{createFile(){this.isAlert=!1,He(this.newFile.name).includes("php")?this.isAlert=!0:(this.$emit("create",this.newFile),this.newFile=null)},updateFileName(e){this.$emit("update",e)},downloadFile(e){const t="Тысяча извинений за то, что способ скачать файл с его собственным содержимым так и не нашёлся... Чтобы увидеть эту надпись, откройте скаченный файл через блокнот.";let s=document.createElement("a");s.setAttribute("href",`data:${e.type};charset=utf-8,`+t),s.setAttribute("download",e.name),s.click()},deleteFile(e){this.$emit("delete",e)}}},Qe=Ke,Ve=Object(F["a"])(Qe,$e,je,!1,null,null,null),We=Ve.exports;async function Xe(){const e=fetch(y.baseUrl+"/cloud/users");return(await e).json()}async function Ye(e){return await fetch(y.baseUrl+"/cloud/file/create",{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(e)})}function Ze(e,t){return new Date(e).getTime()>new Date(t).getTime()}function et(e){return JSON.parse(localStorage.getItem(e))}function tt(e,t){localStorage.setItem(e,JSON.stringify(t))}function st(e){localStorage.removeItem(e)}async function rt(e){return await fetch(y.baseUrl+"/cloud/folder/create",{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(e)})}async function at(e){return await fetch(y.baseUrl+"/cloud/registration",{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(e)})}var lt={name:"App",components:{UIFolder:We,UINavigation:Se,UIRegistration:K,UIAuth:E,UILogout:k},data:()=>({isRegistration:!1,isAuth:!et("currentUser"),users:[],currentUser:et("currentUser")||null,selectedFolder:null,time:new Date,file:null,interval:-1}),computed:{isUsersExist(){return et("users")},hasCurrentFolderFiles(){return this.selectedFolder.files},hasCurrentUserFolders(){return this.currentUser&&this.currentUser.folders&&this.currentUser.folders.length}},watch:{time:{handler(){this.hasCurrentUserFolders&&this.currentUser.folders.forEach(e=>{e.files&&e.files.length&&e.files.forEach(t=>{if(t.endDate&&Ze(this.time,t.endDate)){const s=e.files.findIndex(e=>e.id===t.id);e.files.splice(s,1),this.updateLocalStorage()}})})}}},mounted(){this.changeTime(),this.getUsers()},methods:{async getUsers(){this.isUsersExist?this.users=et("users"):(this.users=await b(Xe()),tt("users",this.users))},async recordNewUser(e){e.userId=this.users[this.users.length-1].userId+1,this.users.push(e),tt("users",this.users),st("currentUser"),await b(at(e))},async createFolder(e){const t=this.users.findIndex(t=>t.userId===e.userId);this.users[t]=e,this.updateLocalStorage(this.users[t]),await b(rt(e.folder))},async createFile(e){const{name:t,size:s,type:r,endDate:a}=e;this.hasCurrentFolderFiles||(this.selectedFolder.files=[]),this.file={id:this.selectedFolder.files.length?this.selectedFolder.files[this.selectedFolder.files.length-1].id+1:1,name:t,size:s,type:r,endDate:a},this.selectedFolder.files.push(this.file);const l=this.users.findIndex(e=>e.userId===this.currentUser.userId);this.users[l]=this.currentUser,this.updateLocalStorage(),await b(Ye(this.file))},updateFileName({name:e,id:t}){const s=this.selectedFolder.files.find(e=>e.id===t),r=s.name.split(".")[1];s.name=`${e}.${r}`,this.updateLocalStorage()},deleteFile(e){const t=this.selectedFolder.files.findIndex(t=>t.id===e);this.selectedFolder.files.splice(t,1),this.updateLocalStorage()},selectFolder(e){this.selectedFolder=e},updateLocalStorage(e){tt("users",this.users),tt("currentUser",e||this.currentUser)},setSettings(e){this.currentUser.settings.displaying=e;const t=this.users.findIndex(e=>e.id===this.currentUser.id);this.users[t]=this.currentUser,this.updateLocalStorage(this.users[t])},logout(){st("currentUser"),this.currentUser=null,this.isAuth=!0,this.selectedFolder=null},closeRegistration(){this.isRegistration=!1,this.isAuth=!0},closeAuth(e){e&&(tt("currentUser",e),this.currentUser=e,location.reload()),this.isAuth=!1},changeTime(){this.interval=setInterval(()=>this.time=new Date,1e3)}}},it=lt,nt=Object(F["a"])(it,u,d,!1,null,null,null),ot=nt.exports,ut=s("f309");r["a"].use(ut["a"]);var dt=new ut["a"]({});r["a"].config.productionTip=!1,new r["a"]({vuetify:dt,render:e=>e(ot)}).$mount("#app")}});
//# sourceMappingURL=app.1bcaad1a.js.map