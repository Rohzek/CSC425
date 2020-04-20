var __decorate=this&&this.__decorate||function(e,t,n,a){var r=arguments.length,o=r<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,n):a,i;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")o=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)if(i=e[s])o=(r<3?i(o):r>3?i(t,n,o):i(t,n))||o;return r>3&&o&&Object.defineProperty(t,n,o),o};var __metadata=this&&this.__metadata||function(e,t){if(typeof Reflect==="object"&&typeof Reflect.metadata==="function")return Reflect.metadata(e,t)};define("app",["require","exports","aurelia-framework","aurelia-fetch-client","./scripts/json/returncode","./globals"],(function(e,t,n,a,r,o){"use strict";Object.defineProperty(t,"__esModule",{value:true});var i=function(){function e(e){e.configure((function(e){e.withBaseUrl("http://rohzek.cf:8080/api/v1/").withDefaults({headers:{"Content-Type":"application/json"}})}));this.httpClient=e;this.attemptLogin()}e.prototype.attemptLogin=function(){var e=this;if(localStorage.getItem("username")===null){localStorage.setItem("username","")}if(localStorage.getItem("sessionID")===null){localStorage.setItem("sessionID","")}o.Config.Username=localStorage.getItem("username");o.Config.SessionID=localStorage.getItem("sessionID");if(o.Config.Username.length!=0&&o.Config.SessionID.length!=0){var t={UsernameOrEmail:o.Config.Username,SessionID:o.Config.SessionID};o.Config.IsLoggedIn=true;this.LoggedIn=o.Config.IsLoggedIn;this.httpClient.fetch("login",{method:"POST",body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(t){var n=new r.ReturnCode(t.Code,t.Name,t.Description);if(n.Code!=200){localStorage.setItem("username","");localStorage.setItem("sessionID","");o.Config.IsLoggedIn=false;e.LoggedIn=o.Config.IsLoggedIn;location.assign("/")}}))}};e.prototype.configureRouter=function(e,t){e.title="rohzek.cf";e.map([{route:["","home"],name:"home",moduleId:"./pages/home",nav:true,title:"Home"},{route:"notes",name:"notes",moduleId:"./pages/notes/notes",nav:true,title:"Notes"},{route:"signup",name:"signup",moduleId:"./pages/user/signup",nav:!o.Config.IsLoggedIn,title:"Signup"},{route:"login",name:"login",moduleId:"./pages/user/login",nav:!o.Config.IsLoggedIn,title:"Login"},{route:"settings",name:"settings",moduleId:"./pages/user/settings",nav:o.Config.IsLoggedIn,title:"Settings"},{route:"logout",name:"logout",moduleId:"./pages/user/logout",nav:o.Config.IsLoggedIn,title:"Logout"}]);e.options.pushState=true;e.options.hashChange=false;e.options.root="/";e.fallbackRoute("home");e.mapUnknownRoutes("home");this.router=t};e=__decorate([n.autoinject,__metadata("design:paramtypes",[a.HttpClient])],e);return e}();t.App=i}));define("text!app.html",[],(function(){return'<template>\n  <require from="bootstrap/dist/css/bootstrap.min.css"></require>\n  <require from="font-awesome/css/font-awesome.min.css"></require>\n  <require from="./styles.css"></require>\n\n  <require from="./pages/routing/nav-bar.html"></require>\n\n  <nav-bar router.bind="router"></nav-bar>\n\n  <div class="page-host">\n    <div class="bg"></div>\n    <router-view></router-view>\n  </div>\n</template>\n'}));define("environment",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.default={debug:false,testing:false}}));define("globals",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.Config={Username:"",SessionID:"",IsLoggedIn:false}}));define("main",["require","exports","./environment","bootstrap"],(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});function a(e){e.use.standardConfiguration().feature("resources");e.use.developmentLogging(n.default.debug?"debug":"warn");if(n.default.testing){e.use.plugin("aurelia-testing")}e.start().then((function(){return e.setRoot()}))}t.configure=a}));define("pages/default/child-router",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});var n=function(){function e(){this.heading="Child Router"}e.prototype.configureRouter=function(e,t){e.map([{route:["","welcome"],name:"welcome",moduleId:"./pages/default/welcome",nav:true,title:"Welcome"},{route:"users",name:"users",moduleId:"./pages/default/users",nav:true,title:"Github Users"},{route:"child-router",name:"child-router",moduleId:"./pages/default/child-router",nav:true,title:"Child Router"}]);this.router=t};return e}();t.ChildRouter=n}));define("text!pages/default/child-router.html",[],(function(){return'<template>\n  <section class="au-animate">\n    <h2>${heading}</h2>\n    <div>\n      <div class="col-md-2">\n        <ul class="well nav nav-pills nav-stacked">\n          <li repeat.for="row of router.navigation" class="${row.isActive ? \'active\' : \'\'}">\n            <a href.bind="row.href">${row.title}</a>\n          </li>\n        </ul>\n      </div>\n      <div class="col-md-10" style="padding: 0">\n        <router-view></router-view>\n      </div>\n    </div>\n  </section>\n</template>\n'}));var __decorate=this&&this.__decorate||function(e,t,n,a){var r=arguments.length,o=r<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,n):a,i;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")o=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)if(i=e[s])o=(r<3?i(o):r>3?i(t,n,o):i(t,n))||o;return r>3&&o&&Object.defineProperty(t,n,o),o};var __metadata=this&&this.__metadata||function(e,t){if(typeof Reflect==="object"&&typeof Reflect.metadata==="function")return Reflect.metadata(e,t)};var __awaiter=this&&this.__awaiter||function(e,t,n,a){function r(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,o){function i(e){try{l(a.next(e))}catch(e){o(e)}}function s(e){try{l(a["throw"](e))}catch(e){o(e)}}function l(e){e.done?n(e.value):r(e.value).then(i,s)}l((a=a.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var n={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},a,r,o,i;return i={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(i[Symbol.iterator]=function(){return this}),i;function s(e){return function(t){return l([e,t])}}function l(i){if(a)throw new TypeError("Generator is already executing.");while(n)try{if(a=1,r&&(o=i[0]&2?r["return"]:i[0]?r["throw"]||((o=r["return"])&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;if(r=0,o)i=[i[0]&2,o.value];switch(i[0]){case 0:case 1:o=i;break;case 4:n.label++;return{value:i[1],done:false};case 5:n.label++;r=i[1];i=[0];continue;case 7:i=n.ops.pop();n.trys.pop();continue;default:if(!(o=n.trys,o=o.length>0&&o[o.length-1])&&(i[0]===6||i[0]===2)){n=0;continue}if(i[0]===3&&(!o||i[1]>o[0]&&i[1]<o[3])){n.label=i[1];break}if(i[0]===6&&n.label<o[1]){n.label=o[1];o=i;break}if(o&&n.label<o[2]){n.label=o[2];n.ops.push(i);break}if(o[2])n.ops.pop();n.trys.pop();continue}i=t.call(e,n)}catch(e){i=[6,e];r=0}finally{a=o=0}if(i[0]&5)throw i[1];return{value:i[0]?i[1]:void 0,done:true}}};define("pages/default/users",["require","exports","aurelia-framework","aurelia-fetch-client"],(function(e,t,n,a){"use strict";Object.defineProperty(t,"__esModule",{value:true});var r=function(){function e(e){this.http=e;this.heading="Github Users";this.users=[];e.configure((function(e){e.useStandardConfiguration().withBaseUrl("https://api.github.com/")}))}e.prototype.activate=function(){return __awaiter(this,void 0,void 0,(function(){var e,t;return __generator(this,(function(n){switch(n.label){case 0:return[4,this.http.fetch("users")];case 1:e=n.sent();t=this;return[4,e.json()];case 2:t.users=n.sent();return[2]}}))}))};e=__decorate([n.autoinject,__metadata("design:paramtypes",[a.HttpClient])],e);return e}();t.Users=r}));define("text!pages/default/users.html",[],(function(){return'<template>\n  <require from="../../scripts/blur-image"></require>\n\n  <section class="au-animate">\n      <h2>${heading}</h2>\n      <div class="row au-stagger">\n        <div class="col-sm-6 col-md-3 card-container au-animate" repeat.for="user of users">\n            <div class="card">\n                <canvas class="header-bg" width="250" height="70" blur-image.bind="image"></canvas>\n                <div class="avatar">\n                    <img src.bind="user.avatar_url" crossorigin ref="image"/>\n                </div>\n                <div class="content">\n                    <p class="name">${user.login}</p>\n                    <p><a target="_blank" class="btn btn-default" href.bind="user.html_url">Contact</a></p>\n                </div>\n            </div>\n        </div>\n      </div>\n  </section>\n</template>\n'}));var __decorate=this&&this.__decorate||function(e,t,n,a){var r=arguments.length,o=r<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,n):a,i;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")o=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)if(i=e[s])o=(r<3?i(o):r>3?i(t,n,o):i(t,n))||o;return r>3&&o&&Object.defineProperty(t,n,o),o};var __metadata=this&&this.__metadata||function(e,t){if(typeof Reflect==="object"&&typeof Reflect.metadata==="function")return Reflect.metadata(e,t)};define("pages/default/welcome",["require","exports","aurelia-framework"],(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var a=function(){function e(){this.heading="Welcome to the Aurelia Navigation App!";this.firstName="John";this.lastName="Doe";this.previousValue=this.fullName}Object.defineProperty(e.prototype,"fullName",{get:function(){return this.firstName+" "+this.lastName},enumerable:true,configurable:true});e.prototype.submit=function(){this.previousValue=this.fullName;alert("Welcome, "+this.fullName+"!")};e.prototype.canDeactivate=function(){if(this.fullName!==this.previousValue){return confirm("Are you sure you want to leave?")}};__decorate([n.computedFrom("firstName","lastName"),__metadata("design:type",String),__metadata("design:paramtypes",[])],e.prototype,"fullName",null);return e}();t.Welcome=a;var r=function(){function e(){}e.prototype.toView=function(e){return e&&e.toUpperCase()};return e}();t.UpperValueConverter=r}));define("text!pages/default/welcome.html",[],(function(){return'<template>\n  <section class="au-animate">\n    <h2>${heading}</h2>\n    <form role="form" submit.delegate="submit()">\n      <div class="form-group">\n        <label for="fn">First Name</label>\n        <input type="text" value.bind="firstName" class="form-control" id="fn" placeholder="first name">\n      </div>\n      <div class="form-group">\n        <label for="ln">Last Name</label>\n        <input type="text" value.bind="lastName" class="form-control" id="ln" placeholder="last name">\n      </div>\n      <div class="form-group">\n        <label>Full Name</label>\n        <p class="help-block">${fullName | upper}</p>\n      </div>\n      <button type="submit" class="btn btn-default">Submit</button>\n    </form>\n  </section>\n</template>\n'}));define("pages/home",["require","exports","../globals"],(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var a=function(){function e(){this.isLoggedIn=n.Config.IsLoggedIn;this.username=n.Config.Username}return e}();t.Home=a}));define("text!pages/home.css",[],(function(){return".homepage_display {\n  margin-top: 10px;\n  text-align: center;\n}\n"}));define("text!pages/home.html",[],(function(){return'<template>\r\n    <require from="./home.css"></require>\r\n\r\n    <div class="bg"></div>\r\n    <div class="homepage_display">\r\n        <h2>Hello!</h2>\r\n        <div if.bind="isLoggedIn"><h3>You are logged in as: ${username}</h3></div>\r\n        <div if.bind="!isLoggedIn"><h3>You are not logged in</h3></div>\r\n    </div>\r\n</template>\r\n  '}));var __decorate=this&&this.__decorate||function(e,t,n,a){var r=arguments.length,o=r<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,n):a,i;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")o=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)if(i=e[s])o=(r<3?i(o):r>3?i(t,n,o):i(t,n))||o;return r>3&&o&&Object.defineProperty(t,n,o),o};var __metadata=this&&this.__metadata||function(e,t){if(typeof Reflect==="object"&&typeof Reflect.metadata==="function")return Reflect.metadata(e,t)};define("pages/notes/notes",["require","exports","aurelia-framework","aurelia-fetch-client","../../globals"],(function(e,t,n,a,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});var o=function(){function e(e){this.isLoggedIn=r.Config.IsLoggedIn;e.configure((function(e){e.withBaseUrl("http://rohzek.cf:8080/api/v1/").withDefaults({headers:{"Content-Type":"application/json"}})}));this.httpClient=e;this.fetchNotes()}e.prototype.fetchNotes=function(){console.log("Fetching notes for user: "+r.Config.Username);this.callAPI(r.Config.Username,"")};e.prototype.submit=function(){console.log("Fetching notes for user: "+r.Config.Username+" with search term: "+this.search);this.callAPI(r.Config.Username,this.search)};e.prototype.callAPI=function(e,t){this.httpClient.fetch("notes?api_key=6c8s9c5442051f2i6n6a3l&username="+e+(t.length>0?"&search="+t:""),{method:"GET"}).then((function(e){return e.json()})).then((function(e){console.log(e)}))};e=__decorate([n.autoinject,__metadata("design:paramtypes",[a.HttpClient])],e);return e}();t.Notes=o}));define("text!pages/notes/notes.css",[],(function(){return".notespage_display {\n  margin-top: 10px;\n  margin-left: 30px;\n  margin-right: 30px;\n  text-align: center;\n}\n"}));define("text!pages/notes/notes.html",[],(function(){return'<template>\r\n    <require from="./notes.css"></require>\r\n\r\n    <div class="notespage_display">\r\n        <h2>Hello!</h2>\r\n        <h3>This is the notes page!</h3>\r\n        <div if.bind="!isLoggedIn"><h3>Please log in to view notes</h3></div>\r\n        <div if.bind="isLoggedIn">\r\n            <label for="search"><h2>Search:</h2></label>\r\n            <input type="text" value.bind="search" class="form-control" id="search" placeholder="Search...">\r\n            <button type="submit" class="btn btn-default" click.trigger="submit()">Submit</button>\r\n        </div>\r\n    </div>\r\n</template>\r\n  '}));define("text!pages/routing/nav-bar.html",[],(function(){return'<template bindable="router">\n    <nav class="navbar navbar-default navbar-fixed-top"; role="navigation">\n      <div class="navbar-header">\n        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-navbar-collapse-1">\n          <span class="sr-only">Toggle Navigation</span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n        </button>\n        <a class="navbar-brand" href="/">\n          <i class="fa fa-home"></i>\n          <span>rohzek.cf</span>\n        </a>\n      </div>\n  \n      <div class="collapse navbar-collapse" id="navigation-navbar-collapse-1">\n        <ul class="nav navbar-nav">\n          \x3c!-- Home --\x3e\n          <li class="nav-item"><a href.bind="router.navigation[0].href">${router.navigation[0].title}</a></li>\n          \x3c!-- Notes --\x3e\n          <li class="nav-item"><a href.bind="router.navigation[1].href">${router.navigation[1].title}</a></li>\n        </ul>\n\n        <ul class="nav navbar-nav navbar-right">\n          \x3c!-- Either Signup or Settings --\x3e\n          <li class="nav-item"><a href.bind="router.navigation[2].href">${router.navigation[2].title}</a></li>\n          \x3c!-- Either Login or Logout --\x3e\n          <li class="nav-item"><a href.bind="router.navigation[3].href">${router.navigation[3].title}</a></li>\n        </ul>\n      </div>\n    </nav>\n  </template>'}));var __decorate=this&&this.__decorate||function(e,t,n,a){var r=arguments.length,o=r<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,n):a,i;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")o=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)if(i=e[s])o=(r<3?i(o):r>3?i(t,n,o):i(t,n))||o;return r>3&&o&&Object.defineProperty(t,n,o),o};var __metadata=this&&this.__metadata||function(e,t){if(typeof Reflect==="object"&&typeof Reflect.metadata==="function")return Reflect.metadata(e,t)};define("pages/user/login",["require","exports","aurelia-framework","aurelia-fetch-client","../../scripts/json/returncode"],(function(e,t,n,a,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});var o=function(){function e(e){this.heading="Login";this.username="";this.password="";e.configure((function(e){e.withBaseUrl("http://rohzek.cf:8080/api/v1/").withDefaults({headers:{"Content-Type":"application/json"}})}));this.httpClient=e}e.prototype.submit=function(){var e={UsernameOrEmail:this.username,Password:this.password};this.httpClient.fetch("login?api_key=6c8s9c5442051f2i6n6a3l",{method:"POST",body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(t){var n=new r.ReturnCode(t.Code,t.Name,t.Description);if(n.Code==200){localStorage.setItem("username",e.UsernameOrEmail);localStorage.setItem("sessionID",n.Description);location.assign("/")}}))};e=__decorate([n.autoinject,__metadata("design:paramtypes",[a.HttpClient])],e);return e}();t.Login=o}));define("text!pages/user/login.css",[],(function(){return".login_page {\n  color: white;\n  margin: auto;\n  width: 50%;\n  padding: 10px;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.login_page_header {\n  text-align: center;\n}\n"}));define("text!pages/user/login.html",[],(function(){return'<template>\r\n    <require from="./login.css"></require>\r\n    \r\n    <div class="login_page">\r\n        <section class="au-animate">\r\n        <div class="login_page_header"><h2>${heading}</h2></div>\r\n        <form role="form" submit.delegate="submit()">\r\n            <div class="form-group">\r\n                <label for="fn">Username or Email Address:</label>\r\n                <input type="text" value.bind="username" class="form-control" id="uname" placeholder="xXepic_user_nameXx">\r\n            </div>\r\n            <div class="form-group">\r\n                <label for="ln">Password:</label>\r\n                <input type="password" value.bind="password" class="form-control" id="pwd" placeholder="password">\r\n            </div>\r\n            <button type="submit" class="btn btn-default">Submit</button>\r\n        </form>\r\n        </section>\r\n    </div>\r\n  </template>\r\n  '}));define("pages/user/logout",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});var n=function(){function e(){localStorage.setItem("username","");localStorage.setItem("sessionID","");location.assign("/")}return e}();t.Logout=n}));define("text!pages/user/logout.html",[],(function(){return"<template>\r\n    \r\n</template>"}));var __decorate=this&&this.__decorate||function(e,t,n,a){var r=arguments.length,o=r<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,n):a,i;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")o=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)if(i=e[s])o=(r<3?i(o):r>3?i(t,n,o):i(t,n))||o;return r>3&&o&&Object.defineProperty(t,n,o),o};var __metadata=this&&this.__metadata||function(e,t){if(typeof Reflect==="object"&&typeof Reflect.metadata==="function")return Reflect.metadata(e,t)};define("pages/user/signup",["require","exports","aurelia-framework","aurelia-fetch-client","../../scripts/json/returncode"],(function(e,t,n,a,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});var o=function(){function e(e){this.heading="Signup";this.username="";this.email="";this.password="";e.configure((function(e){e.withBaseUrl("http://rohzek.cf:8080/api/v1/").withDefaults({headers:{"Content-Type":"application/json"}})}));this.httpClient=e}e.prototype.submit=function(){var e={Username:this.username,Email:this.email,Password:this.password};this.httpClient.fetch("signup?api_key=6c8s9c5442051f2i6n6a3l",{method:"POST",body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){var t=new r.ReturnCode(e.Code,e.Name,e.Description);alert(e.Description);if(t.Code==200){return{route:"home"}}}))};e=__decorate([n.autoinject,__metadata("design:paramtypes",[a.HttpClient])],e);return e}();t.Signup=o}));define("text!pages/user/signup.css",[],(function(){return".signup_page {\n  color: white;\n  margin: auto;\n  width: 50%;\n  padding: 10px;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.signup_page_header {\n  text-align: center;\n}\n"}));define("text!pages/user/signup.html",[],(function(){return'<template>\r\n    <require from="./signup.css"></require>\r\n    <div class="signup_page">\r\n        <section class="au-animate">\r\n        <div class="signup_page_header"><h2>${heading}</h2></div>\r\n        <form role="form" submit.delegate="submit()">\r\n            <div class="form-group">\r\n                <label for="fn">Username:</label>\r\n                <input type="text" value.bind="username" class="form-control" id="uname" placeholder="xXepic_user_nameXx">\r\n            </div>\r\n            <div class="form-group">\r\n                <label for="ln">Email Address:</label>\r\n                <input type="text" value.bind="email" class="form-control" id="email" placeholder="example@website.com">\r\n            </div>\r\n            <div class="form-group">\r\n                <label for="ln">Password:</label>\r\n                <input type="password" value.bind="password" class="form-control" id="pwd" placeholder="password">\r\n            </div>\r\n            <button type="submit" class="btn btn-default">Submit</button>\r\n        </form>\r\n        </section>\r\n    </div>\r\n  </template>\r\n  '}));define("resources/index",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});function n(e){}t.configure=n}));var __decorate=this&&this.__decorate||function(e,t,n,a){var r=arguments.length,o=r<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,n):a,i;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")o=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)if(i=e[s])o=(r<3?i(o):r>3?i(t,n,o):i(t,n))||o;return r>3&&o&&Object.defineProperty(t,n,o),o};var __metadata=this&&this.__metadata||function(e,t){if(typeof Reflect==="object"&&typeof Reflect.metadata==="function")return Reflect.metadata(e,t)};define("scripts/blur-image",["require","exports","aurelia-framework"],(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var a=function(){function e(e){this.element=e}e.prototype.valueChanged=function(e){var t=this;if(e.complete){c(this.element,e)}else{e.onload=function(){return c(t.element,e)}}};e=__decorate([n.autoinject,__metadata("design:paramtypes",[Element])],e);return e}();t.BlurImageCustomAttribute=a;var r=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];var o=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];var i=40;function s(e,t,n,a,i,s){if(isNaN(s)||s<1)return;s|=0;var c=e.getContext("2d");var u;try{u=c.getImageData(t,n,a,i)}catch(e){throw new Error("unable to access image data: "+e)}var f=u.data;var d,p,g,m,h,b,v,x,y,_,w,k,I,C,j,R,P,O,S,N,q,D,L,U;var M=s+s+1;var z=a<<2;var $=a-1;var A=i-1;var F=s+1;var H=F*(F+1)/2;var T=new l;var E=T;for(g=1;g<M;g++){E=E.next=new l;if(g==F)var G=E}E.next=T;var B=null;var V=null;v=b=0;var J=r[s];var W=o[s];for(p=0;p<i;p++){R=P=O=S=x=y=_=w=0;k=F*(N=f[b]);I=F*(q=f[b+1]);C=F*(D=f[b+2]);j=F*(L=f[b+3]);x+=H*N;y+=H*q;_+=H*D;w+=H*L;E=T;for(g=0;g<F;g++){E.r=N;E.g=q;E.b=D;E.a=L;E=E.next}for(g=1;g<F;g++){m=b+(($<g?$:g)<<2);x+=(E.r=N=f[m])*(U=F-g);y+=(E.g=q=f[m+1])*U;_+=(E.b=D=f[m+2])*U;w+=(E.a=L=f[m+3])*U;R+=N;P+=q;O+=D;S+=L;E=E.next}B=T;V=G;for(d=0;d<a;d++){f[b+3]=L=w*J>>W;if(L!=0){L=255/L;f[b]=(x*J>>W)*L;f[b+1]=(y*J>>W)*L;f[b+2]=(_*J>>W)*L}else{f[b]=f[b+1]=f[b+2]=0}x-=k;y-=I;_-=C;w-=j;k-=B.r;I-=B.g;C-=B.b;j-=B.a;m=v+((m=d+s+1)<$?m:$)<<2;R+=B.r=f[m];P+=B.g=f[m+1];O+=B.b=f[m+2];S+=B.a=f[m+3];x+=R;y+=P;_+=O;w+=S;B=B.next;k+=N=V.r;I+=q=V.g;C+=D=V.b;j+=L=V.a;R-=N;P-=q;O-=D;S-=L;V=V.next;b+=4}v+=a}for(d=0;d<a;d++){P=O=S=R=y=_=w=x=0;b=d<<2;k=F*(N=f[b]);I=F*(q=f[b+1]);C=F*(D=f[b+2]);j=F*(L=f[b+3]);x+=H*N;y+=H*q;_+=H*D;w+=H*L;E=T;for(g=0;g<F;g++){E.r=N;E.g=q;E.b=D;E.a=L;E=E.next}h=a;for(g=1;g<=s;g++){b=h+d<<2;x+=(E.r=N=f[b])*(U=F-g);y+=(E.g=q=f[b+1])*U;_+=(E.b=D=f[b+2])*U;w+=(E.a=L=f[b+3])*U;R+=N;P+=q;O+=D;S+=L;E=E.next;if(g<A){h+=a}}b=d;B=T;V=G;for(p=0;p<i;p++){m=b<<2;f[m+3]=L=w*J>>W;if(L>0){L=255/L;f[m]=(x*J>>W)*L;f[m+1]=(y*J>>W)*L;f[m+2]=(_*J>>W)*L}else{f[m]=f[m+1]=f[m+2]=0}x-=k;y-=I;_-=C;w-=j;k-=B.r;I-=B.g;C-=B.b;j-=B.a;m=d+((m=p+F)<A?m:A)*a<<2;x+=R+=B.r=f[m];y+=P+=B.g=f[m+1];_+=O+=B.b=f[m+2];w+=S+=B.a=f[m+3];B=B.next;k+=N=V.r;I+=q=V.g;C+=D=V.b;j+=L=V.a;R-=N;P-=q;O-=D;S-=L;V=V.next;b+=a}}c.putImageData(u,t,n)}function l(){this.r=0;this.g=0;this.b=0;this.a=0;this.next=null}function c(e,t){var n=e.width;var a=e.height;var r=e.getContext("2d");r.drawImage(t,0,0,n,a);s(e,0,0,n,a,i)}}));define("scripts/json/returncode",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});var n=function(){function e(e,t,n){this.Code=e;this.Name=t;this.Description=n}return e}();t.ReturnCode=n}));define("text!styles.css",[],(function(){return"@font-face {\n  font-family: 'Gaegu';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Gaegu Regular'), local('Gaegu-Regular'), url(https://fonts.gstatic.com/s/gaegu/v8/TuGfUVB6Up9NU5ZMq9w.ttf) format('truetype');\n}\n@font-face {\n  font-family: 'Pacifico';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Pacifico Regular'), local('Pacifico-Regular'), url(https://fonts.gstatic.com/s/pacifico/v16/FwZY7-Qmy14u9lezJ96A.ttf) format('truetype');\n}\n@font-face {\n  font-family: 'Permanent Marker';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Permanent Marker Regular'), local('PermanentMarker-Regular'), url(https://fonts.gstatic.com/s/permanentmarker/v9/Fh4uPib9Iyv2ucM6pGQMWimMp004Hao.ttf) format('truetype');\n}\nbody {\n  color: #3399cc;\n  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;\n  font-family: 'Gaegu', cursive;\n}\n.bg {\n  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url('images/bg.jpg');\n  background-attachment: fixed;\n  background-color: #000;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  z-index: -99;\n  filter: blur(0px);\n  -webkit-filter: blur(0px);\n}\n.splash {\n  text-align: center;\n  margin: 10% 0 0 0;\n  box-sizing: border-box;\n}\n.splash .message {\n  font-size: 72px;\n  line-height: 72px;\n  text-shadow: rgba(0, 0, 0, 0.5) 0 0 15px;\n  text-transform: uppercase;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n.splash .fa-spinner {\n  text-align: center;\n  display: inline-block;\n  font-size: 72px;\n  margin-top: 50px;\n}\n.page-host {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50px;\n  bottom: 0;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n@media print {\n  .page-host {\n    position: absolute;\n    left: 10px;\n    right: 0;\n    top: 50px;\n    bottom: 0;\n    overflow-y: inherit;\n    overflow-x: inherit;\n  }\n}\nsection {\n  margin: 0 20px;\n}\n.navbar-default {\n  background-color: #000000d5;\n  border-color: #000000d5;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n  font-family: 'Permanent Marker', cursive;\n  font-size: x-large;\n}\n.navbar-default .navbar-brand {\n  color: white;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n  font-family: 'Pacifico', cursive;\n  font-size: large;\n}\n.navbar-default .navbar-brand:hover {\n  color: #e12885;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.navbar-default .navbar-nav > .active > a {\n  color: white;\n  background-color: #000000d5;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.navbar-default .navbar-nav > .active > a:focus {\n  color: #e12885;\n  background-color: #000000d5;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.navbar-default .navbar-nav > .active > a:hover {\n  color: #e12885;\n  background-color: #000000d5;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.navbar-default .navbar-nav > li > a {\n  color: rgba(204, 255, 0, 0.8);\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.navbar-default .navbar-nav > li > a:hover {\n  color: #e12885;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.navbar-nav li.loader {\n  margin: 12px 24px 0 6px;\n}\n.navbar-right {\n  margin-right: 15px;\n}\n.pictureDetail {\n  max-width: 425px;\n}\n/* animate page transitions */\nsection.au-enter-active {\n  -webkit-animation: fadeInRight 1s;\n  animation: fadeInRight 1s;\n}\ndiv.au-stagger {\n  /* 50ms will be applied between each successive enter operation */\n  -webkit-animation-delay: 50ms;\n  animation-delay: 50ms;\n}\n.card-container.au-enter {\n  opacity: 0;\n}\n.card-container.au-enter-active {\n  -webkit-animation: fadeIn 2s;\n  animation: fadeIn 2s;\n}\n.card {\n  overflow: hidden;\n  position: relative;\n  border: 1px solid #CCC;\n  border-radius: 8px;\n  text-align: center;\n  padding: 0;\n  background-color: #337ab7;\n  color: #88acd9;\n  margin-bottom: 32px;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);\n}\n.card .content {\n  margin-top: 10px;\n}\n.card .content .name {\n  color: white;\n  text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);\n  font-size: 18px;\n}\n.card .header-bg {\n  /* This stretches the canvas across the entire hero unit */\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 70px;\n  border-bottom: 1px #FFF solid;\n  border-radius: 6px 6px 0 0;\n}\n.card .avatar {\n  position: relative;\n  margin-top: 15px;\n  z-index: 100;\n}\n.card .avatar img {\n  width: 100px;\n  height: 100px;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  border-radius: 50%;\n  border: 2px #FFF solid;\n}\n/* animation definitions */\n@-webkit-keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n@keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    -ms-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n}\n@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n"}));define("resources",["resources/index"],(function(e){return e}));