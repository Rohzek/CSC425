var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "./scripts/json/returncode", "./globals"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, returncode_1, globals_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(httpClient) {
            httpClient.configure(function (config) {
                config
                    .withBaseUrl('http://rohzek.cf:8080/api/v1/')
                    .withDefaults({
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            });
            this.httpClient = httpClient;
            this.attemptLogin();
        }
        App.prototype.attemptLogin = function () {
            var _this = this;
            if (localStorage.getItem('username') === null) {
                localStorage.setItem('username', "");
            }
            if (localStorage.getItem('sessionID') === null) {
                localStorage.setItem('sessionID', "");
            }
            globals_1.Config.Username = localStorage.getItem('username');
            globals_1.Config.SessionID = localStorage.getItem('sessionID');
            if (globals_1.Config.Username.length != 0 && globals_1.Config.SessionID.length != 0) {
                var user = { UsernameOrEmail: globals_1.Config.Username, SessionID: globals_1.Config.SessionID };
                globals_1.Config.IsLoggedIn = true;
                this.LoggedIn = globals_1.Config.IsLoggedIn;
                this.httpClient.fetch('login', {
                    method: 'POST',
                    body: JSON.stringify(user),
                })
                    .then(function (response) { return response.json(); })
                    .then(function (data) {
                    var code = new returncode_1.ReturnCode(data.Code, data.Name, data.Description);
                    if (code.Code != 200) {
                        localStorage.setItem('username', "");
                        localStorage.setItem('sessionID', "");
                        globals_1.Config.IsLoggedIn = false;
                        _this.LoggedIn = globals_1.Config.IsLoggedIn;
                        location.assign('/');
                    }
                });
            }
        };
        App.prototype.configureRouter = function (config, router) {
            config.title = 'rohzek.cf';
            config.map([
                {
                    route: ['', 'home'],
                    name: 'home',
                    moduleId: './pages/home',
                    nav: true,
                    title: 'Home'
                },
                {
                    route: 'notes',
                    name: 'notes',
                    moduleId: './pages/notes/notes',
                    nav: true,
                    title: 'Notes'
                },
                {
                    route: 'signup',
                    name: 'signup',
                    moduleId: './pages/user/signup',
                    nav: !globals_1.Config.IsLoggedIn,
                    title: 'Signup'
                },
                {
                    route: 'login',
                    name: 'login',
                    moduleId: './pages/user/login',
                    nav: !globals_1.Config.IsLoggedIn,
                    title: 'Login'
                },
                {
                    route: 'settings',
                    name: 'settings',
                    moduleId: './pages/user/settings',
                    nav: globals_1.Config.IsLoggedIn,
                    title: 'Settings'
                },
                {
                    route: 'logout',
                    name: 'logout',
                    moduleId: './pages/user/logout',
                    nav: globals_1.Config.IsLoggedIn,
                    title: 'Logout'
                },
            ]);
            config.options.pushState = true;
            config.options.hashChange = false;
            config.options.root = '/';
            config.fallbackRoute('home');
            config.mapUnknownRoutes('home');
            this.router = router;
        };
        App = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
        ], App);
        return App;
    }());
    exports.App = App;
});
;
define('text!app.html',[],function(){return "<template>\n  <require from=\"bootstrap/dist/css/bootstrap.min.css\"></require>\n  <require from=\"font-awesome/css/font-awesome.min.css\"></require>\n  <require from=\"./styles.css\"></require>\n\n  <require from=\"./pages/routing/nav-bar.html\"></require>\n\n  <nav-bar router.bind=\"router\"></nav-bar>\n\n  <div class=\"page-host\">\n    <div class=\"bg\"></div>\n    <router-view></router-view>\n  </div>\n</template>\n";});;
define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});
;
define('globals',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Config = {
        Username: "",
        SessionID: "",
        IsLoggedIn: false
    };
});
;
define('main',["require", "exports", "./environment", "bootstrap"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        aurelia.use.developmentLogging(environment_1.default.debug ? 'debug' : 'warn');
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});
;
define('pages/default/child-router',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChildRouter = (function () {
        function ChildRouter() {
            this.heading = 'Child Router';
        }
        ChildRouter.prototype.configureRouter = function (config, router) {
            config.map([
                {
                    route: ['', 'welcome'],
                    name: 'welcome',
                    moduleId: './pages/default/welcome',
                    nav: true,
                    title: 'Welcome'
                },
                {
                    route: 'users',
                    name: 'users',
                    moduleId: './pages/default/users',
                    nav: true,
                    title: 'Github Users'
                },
                {
                    route: 'child-router',
                    name: 'child-router',
                    moduleId: './pages/default/child-router',
                    nav: true,
                    title: 'Child Router'
                }
            ]);
            this.router = router;
        };
        return ChildRouter;
    }());
    exports.ChildRouter = ChildRouter;
});
;
define('text!pages/default/child-router.html',[],function(){return "<template>\n  <section class=\"au-animate\">\n    <h2>${heading}</h2>\n    <div>\n      <div class=\"col-md-2\">\n        <ul class=\"well nav nav-pills nav-stacked\">\n          <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n            <a href.bind=\"row.href\">${row.title}</a>\n          </li>\n        </ul>\n      </div>\n      <div class=\"col-md-10\" style=\"padding: 0\">\n        <router-view></router-view>\n      </div>\n    </div>\n  </section>\n</template>\n";});;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('pages/default/users',["require", "exports", "aurelia-framework", "aurelia-fetch-client"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Users = (function () {
        function Users(http) {
            this.http = http;
            this.heading = 'Github Users';
            this.users = [];
            http.configure(function (config) {
                config
                    .useStandardConfiguration()
                    .withBaseUrl('https://api.github.com/');
            });
        }
        Users.prototype.activate = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, this.http.fetch('users')];
                        case 1:
                            response = _b.sent();
                            _a = this;
                            return [4, response.json()];
                        case 2:
                            _a.users = _b.sent();
                            return [2];
                    }
                });
            });
        };
        Users = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
        ], Users);
        return Users;
    }());
    exports.Users = Users;
});
;
define('text!pages/default/users.html',[],function(){return "<template>\n  <require from=\"../../scripts/blur-image\"></require>\n\n  <section class=\"au-animate\">\n      <h2>${heading}</h2>\n      <div class=\"row au-stagger\">\n        <div class=\"col-sm-6 col-md-3 card-container au-animate\" repeat.for=\"user of users\">\n            <div class=\"card\">\n                <canvas class=\"header-bg\" width=\"250\" height=\"70\" blur-image.bind=\"image\"></canvas>\n                <div class=\"avatar\">\n                    <img src.bind=\"user.avatar_url\" crossorigin ref=\"image\"/>\n                </div>\n                <div class=\"content\">\n                    <p class=\"name\">${user.login}</p>\n                    <p><a target=\"_blank\" class=\"btn btn-default\" href.bind=\"user.html_url\">Contact</a></p>\n                </div>\n            </div>\n        </div>\n      </div>\n  </section>\n</template>\n";});;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('pages/default/welcome',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Welcome = (function () {
        function Welcome() {
            this.heading = 'Welcome to the Aurelia Navigation App!';
            this.firstName = 'John';
            this.lastName = 'Doe';
            this.previousValue = this.fullName;
        }
        Object.defineProperty(Welcome.prototype, "fullName", {
            get: function () {
                return this.firstName + " " + this.lastName;
            },
            enumerable: true,
            configurable: true
        });
        Welcome.prototype.submit = function () {
            this.previousValue = this.fullName;
            alert("Welcome, " + this.fullName + "!");
        };
        Welcome.prototype.canDeactivate = function () {
            if (this.fullName !== this.previousValue) {
                return confirm('Are you sure you want to leave?');
            }
        };
        __decorate([
            aurelia_framework_1.computedFrom('firstName', 'lastName'),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [])
        ], Welcome.prototype, "fullName", null);
        return Welcome;
    }());
    exports.Welcome = Welcome;
    var UpperValueConverter = (function () {
        function UpperValueConverter() {
        }
        UpperValueConverter.prototype.toView = function (value) {
            return value && value.toUpperCase();
        };
        return UpperValueConverter;
    }());
    exports.UpperValueConverter = UpperValueConverter;
});
;
define('text!pages/default/welcome.html',[],function(){return "<template>\n  <section class=\"au-animate\">\n    <h2>${heading}</h2>\n    <form role=\"form\" submit.delegate=\"submit()\">\n      <div class=\"form-group\">\n        <label for=\"fn\">First Name</label>\n        <input type=\"text\" value.bind=\"firstName\" class=\"form-control\" id=\"fn\" placeholder=\"first name\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"ln\">Last Name</label>\n        <input type=\"text\" value.bind=\"lastName\" class=\"form-control\" id=\"ln\" placeholder=\"last name\">\n      </div>\n      <div class=\"form-group\">\n        <label>Full Name</label>\n        <p class=\"help-block\">${fullName | upper}</p>\n      </div>\n      <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n    </form>\n  </section>\n</template>\n";});;
define('pages/home',["require", "exports", "../globals"], function (require, exports, globals_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Home = (function () {
        function Home() {
            this.isLoggedIn = globals_1.Config.IsLoggedIn;
            this.username = globals_1.Config.Username;
        }
        return Home;
    }());
    exports.Home = Home;
});
;
define('text!pages/home.css',[],function(){return ".homepage_display {\n  margin-top: 10px;\n  text-align: center;\n}\n";});;
define('text!pages/home.html',[],function(){return "<template>\r\n    <require from=\"./home.css\"></require>\r\n\r\n    <div class=\"bg\"></div>\r\n    <div class=\"homepage_display\">\r\n        <h2>Hello!</h2>\r\n        <div if.bind=\"isLoggedIn\"><h3>You are logged in as: ${username}</h3></div>\r\n        <div if.bind=\"!isLoggedIn\"><h3>You are not logged in</h3></div>\r\n    </div>\r\n</template>\r\n  ";});;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('pages/notes/notes',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "../../globals"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, globals_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Notes = (function () {
        function Notes(httpClient) {
            this.isLoggedIn = globals_1.Config.IsLoggedIn;
            httpClient.configure(function (config) {
                config
                    .withBaseUrl('http://rohzek.cf:8080/api/v1/')
                    .withDefaults({
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            });
            this.httpClient = httpClient;
            this.fetchNotes();
        }
        Notes.prototype.fetchNotes = function () {
            console.log("Fetching notes for user: " + globals_1.Config.Username);
            this.callAPI(globals_1.Config.Username, '');
        };
        Notes.prototype.submit = function () {
            console.log("Fetching notes for user: " + globals_1.Config.Username + " with search term: " + this.search);
            this.callAPI(globals_1.Config.Username, this.search);
        };
        Notes.prototype.callAPI = function (username, search) {
            this.httpClient.fetch('notes?api_key=6c8s9c5442051f2i6n6a3l&username=' + username + (search.length > 0 ? '&search=' + search : ''), {
                method: 'GET',
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                console.log(data);
            });
        };
        Notes = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
        ], Notes);
        return Notes;
    }());
    exports.Notes = Notes;
});
;
define('text!pages/notes/notes.css',[],function(){return ".notespage_display {\n  margin-top: 10px;\n  margin-left: 30px;\n  margin-right: 30px;\n  text-align: center;\n}\n";});;
define('text!pages/notes/notes.html',[],function(){return "<template>\r\n    <require from=\"./notes.css\"></require>\r\n\r\n    <div class=\"notespage_display\">\r\n        <h2>Hello!</h2>\r\n        <h3>This is the notes page!</h3>\r\n        <div if.bind=\"!isLoggedIn\"><h3>Please log in to view notes</h3></div>\r\n        <div if.bind=\"isLoggedIn\">\r\n            <label for=\"search\"><h2>Search:</h2></label>\r\n            <input type=\"text\" value.bind=\"search\" class=\"form-control\" id=\"search\" placeholder=\"Search...\">\r\n            <button type=\"submit\" class=\"btn btn-default\" click.trigger=\"submit()\">Submit</button>\r\n        </div>\r\n    </div>\r\n</template>\r\n  ";});;
define('text!pages/routing/nav-bar.html',[],function(){return "<template bindable=\"router\">\n    <nav class=\"navbar navbar-default navbar-fixed-top\"; role=\"navigation\">\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navigation-navbar-collapse-1\">\n          <span class=\"sr-only\">Toggle Navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"/\">\n          <i class=\"fa fa-home\"></i>\n          <span>rohzek.cf</span>\n        </a>\n      </div>\n  \n      <div class=\"collapse navbar-collapse\" id=\"navigation-navbar-collapse-1\">\n        <ul class=\"nav navbar-nav\">\n          <!-- Home -->\n          <li class=\"nav-item\"><a href.bind=\"router.navigation[0].href\">${router.navigation[0].title}</a></li>\n          <!-- Notes -->\n          <li class=\"nav-item\"><a href.bind=\"router.navigation[1].href\">${router.navigation[1].title}</a></li>\n        </ul>\n\n        <ul class=\"nav navbar-nav navbar-right\">\n          <!-- Either Signup or Settings -->\n          <li class=\"nav-item\"><a href.bind=\"router.navigation[2].href\">${router.navigation[2].title}</a></li>\n          <!-- Either Login or Logout -->\n          <li class=\"nav-item\"><a href.bind=\"router.navigation[3].href\">${router.navigation[3].title}</a></li>\n        </ul>\n      </div>\n    </nav>\n  </template>";});;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('pages/user/login',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "../../scripts/json/returncode"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, returncode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Login = (function () {
        function Login(httpClient) {
            this.heading = 'Login';
            this.username = '';
            this.password = '';
            httpClient.configure(function (config) {
                config
                    .withBaseUrl('http://rohzek.cf:8080/api/v1/')
                    .withDefaults({
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            });
            this.httpClient = httpClient;
        }
        Login.prototype.submit = function () {
            var user = { UsernameOrEmail: this.username, Password: this.password };
            this.httpClient.fetch('login?api_key=6c8s9c5442051f2i6n6a3l', {
                method: 'POST',
                body: JSON.stringify(user),
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                var code = new returncode_1.ReturnCode(data.Code, data.Name, data.Description);
                if (code.Code == 200) {
                    localStorage.setItem('username', user.UsernameOrEmail);
                    localStorage.setItem('sessionID', code.Description);
                    location.assign('/');
                }
            });
        };
        Login = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
        ], Login);
        return Login;
    }());
    exports.Login = Login;
});
;
define('text!pages/user/login.css',[],function(){return ".login_page {\n  color: white;\n  margin: auto;\n  width: 50%;\n  padding: 10px;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.login_page_header {\n  text-align: center;\n}\n";});;
define('text!pages/user/login.html',[],function(){return "<template>\r\n    <require from=\"./login.css\"></require>\r\n    \r\n    <div class=\"login_page\">\r\n        <section class=\"au-animate\">\r\n        <div class=\"login_page_header\"><h2>${heading}</h2></div>\r\n        <form role=\"form\" submit.delegate=\"submit()\">\r\n            <div class=\"form-group\">\r\n                <label for=\"fn\">Username or Email Address:</label>\r\n                <input type=\"text\" value.bind=\"username\" class=\"form-control\" id=\"uname\" placeholder=\"xXepic_user_nameXx\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"ln\">Password:</label>\r\n                <input type=\"password\" value.bind=\"password\" class=\"form-control\" id=\"pwd\" placeholder=\"password\">\r\n            </div>\r\n            <button type=\"submit\" class=\"btn btn-default\">Submit</button>\r\n        </form>\r\n        </section>\r\n    </div>\r\n  </template>\r\n  ";});;
define('pages/user/logout',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Logout = (function () {
        function Logout() {
            localStorage.setItem('username', "");
            localStorage.setItem('sessionID', "");
            location.assign('/');
        }
        return Logout;
    }());
    exports.Logout = Logout;
});
;
define('text!pages/user/logout.html',[],function(){return "<template>\r\n    \r\n</template>";});;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('pages/user/signup',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "../../scripts/json/returncode"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, returncode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Signup = (function () {
        function Signup(httpClient) {
            this.heading = 'Signup';
            this.username = '';
            this.email = '';
            this.password = '';
            httpClient.configure(function (config) {
                config
                    .withBaseUrl('http://rohzek.cf:8080/api/v1/')
                    .withDefaults({
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            });
            this.httpClient = httpClient;
        }
        Signup.prototype.submit = function () {
            var user = { Username: this.username, Email: this.email, Password: this.password };
            this.httpClient.fetch('signup?api_key=6c8s9c5442051f2i6n6a3l', {
                method: 'POST',
                body: JSON.stringify(user),
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                var code = new returncode_1.ReturnCode(data.Code, data.Name, data.Description);
                alert(data.Description);
                if (code.Code == 200) {
                    return { route: 'home' };
                }
            });
        };
        Signup = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
        ], Signup);
        return Signup;
    }());
    exports.Signup = Signup;
});
;
define('text!pages/user/signup.css',[],function(){return ".signup_page {\n  color: white;\n  margin: auto;\n  width: 50%;\n  padding: 10px;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.signup_page_header {\n  text-align: center;\n}\n";});;
define('text!pages/user/signup.html',[],function(){return "<template>\r\n    <require from=\"./signup.css\"></require>\r\n    <div class=\"signup_page\">\r\n        <section class=\"au-animate\">\r\n        <div class=\"signup_page_header\"><h2>${heading}</h2></div>\r\n        <form role=\"form\" submit.delegate=\"submit()\">\r\n            <div class=\"form-group\">\r\n                <label for=\"fn\">Username:</label>\r\n                <input type=\"text\" value.bind=\"username\" class=\"form-control\" id=\"uname\" placeholder=\"xXepic_user_nameXx\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"ln\">Email Address:</label>\r\n                <input type=\"text\" value.bind=\"email\" class=\"form-control\" id=\"email\" placeholder=\"example@website.com\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"ln\">Password:</label>\r\n                <input type=\"password\" value.bind=\"password\" class=\"form-control\" id=\"pwd\" placeholder=\"password\">\r\n            </div>\r\n            <button type=\"submit\" class=\"btn btn-default\">Submit</button>\r\n        </form>\r\n        </section>\r\n    </div>\r\n  </template>\r\n  ";});;
define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});
;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('scripts/blur-image',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BlurImageCustomAttribute = (function () {
        function BlurImageCustomAttribute(element) {
            this.element = element;
        }
        BlurImageCustomAttribute.prototype.valueChanged = function (newImage) {
            var _this = this;
            if (newImage.complete) {
                drawBlur(this.element, newImage);
            }
            else {
                newImage.onload = function () { return drawBlur(_this.element, newImage); };
            }
        };
        BlurImageCustomAttribute = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [Element])
        ], BlurImageCustomAttribute);
        return BlurImageCustomAttribute;
    }());
    exports.BlurImageCustomAttribute = BlurImageCustomAttribute;
    var mul_table = [
        512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512,
        454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512,
        482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456,
        437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512,
        497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328,
        320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456,
        446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335,
        329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512,
        505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405,
        399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328,
        324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271,
        268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456,
        451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
        385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335,
        332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
        289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259
    ];
    var shg_table = [
        9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
        17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
        19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
        20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
        21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
        21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
        22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
        22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
        23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24
    ];
    var BLUR_RADIUS = 40;
    function stackBlurCanvasRGBA(canvas, top_x, top_y, width, height, radius) {
        if (isNaN(radius) || radius < 1)
            return;
        radius |= 0;
        var context = canvas.getContext("2d");
        var imageData;
        try {
            imageData = context.getImageData(top_x, top_y, width, height);
        }
        catch (e) {
            throw new Error("unable to access image data: " + e);
        }
        var pixels = imageData.data;
        var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;
        var div = radius + radius + 1;
        var w4 = width << 2;
        var widthMinus1 = width - 1;
        var heightMinus1 = height - 1;
        var radiusPlus1 = radius + 1;
        var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
        var stackStart = new BlurStack();
        var stack = stackStart;
        for (i = 1; i < div; i++) {
            stack = stack.next = new BlurStack();
            if (i == radiusPlus1)
                var stackEnd = stack;
        }
        stack.next = stackStart;
        var stackIn = null;
        var stackOut = null;
        yw = yi = 0;
        var mul_sum = mul_table[radius];
        var shg_sum = shg_table[radius];
        for (y = 0; y < height; y++) {
            r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
            r_out_sum = radiusPlus1 * (pr = pixels[yi]);
            g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
            b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
            a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
            r_sum += sumFactor * pr;
            g_sum += sumFactor * pg;
            b_sum += sumFactor * pb;
            a_sum += sumFactor * pa;
            stack = stackStart;
            for (i = 0; i < radiusPlus1; i++) {
                stack.r = pr;
                stack.g = pg;
                stack.b = pb;
                stack.a = pa;
                stack = stack.next;
            }
            for (i = 1; i < radiusPlus1; i++) {
                p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
                r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
                g_sum += (stack.g = (pg = pixels[p + 1])) * rbs;
                b_sum += (stack.b = (pb = pixels[p + 2])) * rbs;
                a_sum += (stack.a = (pa = pixels[p + 3])) * rbs;
                r_in_sum += pr;
                g_in_sum += pg;
                b_in_sum += pb;
                a_in_sum += pa;
                stack = stack.next;
            }
            stackIn = stackStart;
            stackOut = stackEnd;
            for (x = 0; x < width; x++) {
                pixels[yi + 3] = pa = (a_sum * mul_sum) >> shg_sum;
                if (pa != 0) {
                    pa = 255 / pa;
                    pixels[yi] = ((r_sum * mul_sum) >> shg_sum) * pa;
                    pixels[yi + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                    pixels[yi + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
                }
                else {
                    pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
                }
                r_sum -= r_out_sum;
                g_sum -= g_out_sum;
                b_sum -= b_out_sum;
                a_sum -= a_out_sum;
                r_out_sum -= stackIn.r;
                g_out_sum -= stackIn.g;
                b_out_sum -= stackIn.b;
                a_out_sum -= stackIn.a;
                p = (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;
                r_in_sum += (stackIn.r = pixels[p]);
                g_in_sum += (stackIn.g = pixels[p + 1]);
                b_in_sum += (stackIn.b = pixels[p + 2]);
                a_in_sum += (stackIn.a = pixels[p + 3]);
                r_sum += r_in_sum;
                g_sum += g_in_sum;
                b_sum += b_in_sum;
                a_sum += a_in_sum;
                stackIn = stackIn.next;
                r_out_sum += (pr = stackOut.r);
                g_out_sum += (pg = stackOut.g);
                b_out_sum += (pb = stackOut.b);
                a_out_sum += (pa = stackOut.a);
                r_in_sum -= pr;
                g_in_sum -= pg;
                b_in_sum -= pb;
                a_in_sum -= pa;
                stackOut = stackOut.next;
                yi += 4;
            }
            yw += width;
        }
        for (x = 0; x < width; x++) {
            g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
            yi = x << 2;
            r_out_sum = radiusPlus1 * (pr = pixels[yi]);
            g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
            b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
            a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
            r_sum += sumFactor * pr;
            g_sum += sumFactor * pg;
            b_sum += sumFactor * pb;
            a_sum += sumFactor * pa;
            stack = stackStart;
            for (i = 0; i < radiusPlus1; i++) {
                stack.r = pr;
                stack.g = pg;
                stack.b = pb;
                stack.a = pa;
                stack = stack.next;
            }
            yp = width;
            for (i = 1; i <= radius; i++) {
                yi = (yp + x) << 2;
                r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
                g_sum += (stack.g = (pg = pixels[yi + 1])) * rbs;
                b_sum += (stack.b = (pb = pixels[yi + 2])) * rbs;
                a_sum += (stack.a = (pa = pixels[yi + 3])) * rbs;
                r_in_sum += pr;
                g_in_sum += pg;
                b_in_sum += pb;
                a_in_sum += pa;
                stack = stack.next;
                if (i < heightMinus1) {
                    yp += width;
                }
            }
            yi = x;
            stackIn = stackStart;
            stackOut = stackEnd;
            for (y = 0; y < height; y++) {
                p = yi << 2;
                pixels[p + 3] = pa = (a_sum * mul_sum) >> shg_sum;
                if (pa > 0) {
                    pa = 255 / pa;
                    pixels[p] = ((r_sum * mul_sum) >> shg_sum) * pa;
                    pixels[p + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                    pixels[p + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
                }
                else {
                    pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
                }
                r_sum -= r_out_sum;
                g_sum -= g_out_sum;
                b_sum -= b_out_sum;
                a_sum -= a_out_sum;
                r_out_sum -= stackIn.r;
                g_out_sum -= stackIn.g;
                b_out_sum -= stackIn.b;
                a_out_sum -= stackIn.a;
                p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;
                r_sum += (r_in_sum += (stackIn.r = pixels[p]));
                g_sum += (g_in_sum += (stackIn.g = pixels[p + 1]));
                b_sum += (b_in_sum += (stackIn.b = pixels[p + 2]));
                a_sum += (a_in_sum += (stackIn.a = pixels[p + 3]));
                stackIn = stackIn.next;
                r_out_sum += (pr = stackOut.r);
                g_out_sum += (pg = stackOut.g);
                b_out_sum += (pb = stackOut.b);
                a_out_sum += (pa = stackOut.a);
                r_in_sum -= pr;
                g_in_sum -= pg;
                b_in_sum -= pb;
                a_in_sum -= pa;
                stackOut = stackOut.next;
                yi += width;
            }
        }
        context.putImageData(imageData, top_x, top_y);
    }
    function BlurStack() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
        this.next = null;
    }
    function drawBlur(canvas, image) {
        var w = canvas.width;
        var h = canvas.height;
        var canvasContext = canvas.getContext('2d');
        canvasContext.drawImage(image, 0, 0, w, h);
        stackBlurCanvasRGBA(canvas, 0, 0, w, h, BLUR_RADIUS);
    }
    ;
});
;
define('scripts/json/returncode',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ReturnCode = (function () {
        function ReturnCode(code, name, description) {
            this.Code = code;
            this.Name = name;
            this.Description = description;
        }
        return ReturnCode;
    }());
    exports.ReturnCode = ReturnCode;
});
;
define('text!styles.css',[],function(){return "@font-face {\n  font-family: 'Gaegu';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Gaegu Regular'), local('Gaegu-Regular'), url(https://fonts.gstatic.com/s/gaegu/v8/TuGfUVB6Up9NU5ZMq9w.ttf) format('truetype');\n}\n@font-face {\n  font-family: 'Pacifico';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Pacifico Regular'), local('Pacifico-Regular'), url(https://fonts.gstatic.com/s/pacifico/v16/FwZY7-Qmy14u9lezJ96A.ttf) format('truetype');\n}\n@font-face {\n  font-family: 'Permanent Marker';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Permanent Marker Regular'), local('PermanentMarker-Regular'), url(https://fonts.gstatic.com/s/permanentmarker/v9/Fh4uPib9Iyv2ucM6pGQMWimMp004Hao.ttf) format('truetype');\n}\nbody {\n  color: #3399cc;\n  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;\n  font-family: 'Gaegu', cursive;\n}\n.bg {\n  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url('images/bg.jpg');\n  background-attachment: fixed;\n  background-color: #000;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  z-index: -99;\n  filter: blur(0px);\n  -webkit-filter: blur(0px);\n}\n.splash {\n  text-align: center;\n  margin: 10% 0 0 0;\n  box-sizing: border-box;\n}\n.splash .message {\n  font-size: 72px;\n  line-height: 72px;\n  text-shadow: rgba(0, 0, 0, 0.5) 0 0 15px;\n  text-transform: uppercase;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n.splash .fa-spinner {\n  text-align: center;\n  display: inline-block;\n  font-size: 72px;\n  margin-top: 50px;\n}\n.page-host {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50px;\n  bottom: 0;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n@media print {\n  .page-host {\n    position: absolute;\n    left: 10px;\n    right: 0;\n    top: 50px;\n    bottom: 0;\n    overflow-y: inherit;\n    overflow-x: inherit;\n  }\n}\nsection {\n  margin: 0 20px;\n}\n.navbar-default {\n  background-color: #000000d5;\n  border-color: #000000d5;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n  font-family: 'Permanent Marker', cursive;\n  font-size: x-large;\n}\n.navbar-default .navbar-brand {\n  color: white;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n  font-family: 'Pacifico', cursive;\n  font-size: large;\n}\n.navbar-default .navbar-brand:hover {\n  color: #e12885;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.navbar-default .navbar-nav > .active > a {\n  color: white;\n  background-color: #000000d5;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.navbar-default .navbar-nav > .active > a:focus {\n  color: #e12885;\n  background-color: #000000d5;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.navbar-default .navbar-nav > .active > a:hover {\n  color: #e12885;\n  background-color: #000000d5;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.navbar-default .navbar-nav > li > a {\n  color: rgba(204, 255, 0, 0.8);\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.navbar-default .navbar-nav > li > a:hover {\n  color: #e12885;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}\n.navbar-nav li.loader {\n  margin: 12px 24px 0 6px;\n}\n.navbar-right {\n  margin-right: 15px;\n}\n.pictureDetail {\n  max-width: 425px;\n}\n/* animate page transitions */\nsection.au-enter-active {\n  -webkit-animation: fadeInRight 1s;\n  animation: fadeInRight 1s;\n}\ndiv.au-stagger {\n  /* 50ms will be applied between each successive enter operation */\n  -webkit-animation-delay: 50ms;\n  animation-delay: 50ms;\n}\n.card-container.au-enter {\n  opacity: 0;\n}\n.card-container.au-enter-active {\n  -webkit-animation: fadeIn 2s;\n  animation: fadeIn 2s;\n}\n.card {\n  overflow: hidden;\n  position: relative;\n  border: 1px solid #CCC;\n  border-radius: 8px;\n  text-align: center;\n  padding: 0;\n  background-color: #337ab7;\n  color: #88acd9;\n  margin-bottom: 32px;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);\n}\n.card .content {\n  margin-top: 10px;\n}\n.card .content .name {\n  color: white;\n  text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);\n  font-size: 18px;\n}\n.card .header-bg {\n  /* This stretches the canvas across the entire hero unit */\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 70px;\n  border-bottom: 1px #FFF solid;\n  border-radius: 6px 6px 0 0;\n}\n.card .avatar {\n  position: relative;\n  margin-top: 15px;\n  z-index: 100;\n}\n.card .avatar img {\n  width: 100px;\n  height: 100px;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  border-radius: 50%;\n  border: 2px #FFF solid;\n}\n/* animation definitions */\n@-webkit-keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n@keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    -ms-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n}\n@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n";});;
define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map