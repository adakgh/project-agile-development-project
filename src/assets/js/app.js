/**
 * Entry point front end application - there is also an app.js for the backend (server folder)!
 *
 * Available: `sessionManager` or `networkManager` or `app.loadController(..)`
 *
 * You only want one instance of this class, therefor always use `app`.
 *
 * @author Lennard Fonteijn & Pim Meijer
 */
const CONTROLLER_SIDEBAR = "sidebar";
const CONTROLLER_LOGIN = "login";
const CONTROLLER_LOGOUT = "logout";
const CONTROLLER_WELCOME = "welcome";
const CONTROLLER_ADMIN = "admin";
const CONTROLLER_REGISTER = "register";
const CONTROLLER_FORUM = "forum";
const CONTROLLER_PROFIEL = "profiel";
const CONTROLLER_EVENTS = "activiteiten";
const CONTROLLER_NEWS = "nieuws";
const CONTROLLER_AGENDA = "agenda";
const CONTROLLER_CHAT = "chat";
const CONTROLLER_OVERONS = "overons";
const CONTROLLER_FAQ = "FAQ";

const sessionManager = new SessionManager();
const networkManager = new NetworkManager();

class App {

    init() {
        //Always load the sidebar
        this.loadController(CONTROLLER_SIDEBAR);

        //Attempt to load the controller from the URL, if it fails, fall back to the welcome controller.
        this.loadControllerFromUrl(CONTROLLER_WELCOME);
    }

    /**
     * Loads a controller
     * @param name - name of controller - see constants
     * @param controllerData - data to pass from on controller to another
     * @returns {boolean} - successful controller change
     */
    loadController(name, controllerData) {
        console.log("loadController: " + name);

        if (controllerData) {
            console.log(controllerData);
        } else {
            controllerData = {};
        }

        switch (name) {
            case CONTROLLER_SIDEBAR:
                new NavbarController();
                break;

            case CONTROLLER_FORUM:
                this.setCurrentController(name);
                this.isLoggedIn(() => new ForumController(), () => new ForumController());
                break;

            case CONTROLLER_REGISTER:
                this.setCurrentController(name);
                this.isLoggedIn(() => new WelcomeController(), () => new RegisterController());
                break;

            case CONTROLLER_LOGIN:
                this.setCurrentController(name);
                this.isLoggedIn(() => new WelcomeController(), () => new LoginController());
                break;

            case CONTROLLER_LOGOUT:
                this.setCurrentController(name);
                this.handleLogout();
                break;

            case CONTROLLER_WELCOME:
                this.setCurrentController(name);
                this.isLoggedIn(() => new WelcomeController, () => new IndexController());
                break;

            case CONTROLLER_ADMIN:
                this.setCurrentController(name);
                this.isLoggedIn(() => new AdminController(), () => new IndexController());
                break;

            case CONTROLLER_PROFIEL:
                this.setCurrentController(name);
                this.isLoggedIn(() => new ProfielAanpassenController(), () => new ProfielAanpassenController());
                break;

            case CONTROLLER_EVENTS:
                this.setCurrentController(name);
                this.isLoggedIn(() => new EventsController(), () => alert("\nJe moet eerst inloggen om een activiteit te kunnen plaatsen!"));
                break;

            case CONTROLLER_NEWS:
                this.setCurrentController(name);
                this.isLoggedIn(() => new NewsController(), () => new NewsController());
                break;

            case CONTROLLER_AGENDA:
                this.setCurrentController(name);
                this.isLoggedIn(() => new AgendaController(), () => new AgendaController());
                break;

            case CONTROLLER_CHAT:
                this.setCurrentController(name);
                this.isLoggedIn(() => new ChatController(), () => new ChatController());
                break;

            case CONTROLLER_OVERONS:
                this.setCurrentController(name);
                this.isLoggedIn(() => new OverOnsController(), () => new OverOnsController());
                break;

            case CONTROLLER_FAQ:
                this.setCurrentController(name);
                this.isLoggedIn(() => new FaqController(), () => new FaqController());
                break;

            default:
                return false;
        }

        return true;
    }

    /**
     * Alternative way of loading controller by url
     * @param fallbackController
     */
    loadControllerFromUrl(fallbackController) {
        const currentController = this.getCurrentController();

        if (currentController) {
            if (!this.loadController(currentController)) {
                this.loadController(fallbackController);
            }
        } else {
            this.loadController(fallbackController);
        }
    }

    getCurrentController() {
        return location.hash.slice(1);
    }

    setCurrentController(name) {
        location.hash = name;
    }

    /**
     * Convenience functions to handle logged-in states
     * @param whenYes - function to execute when user is logged in
     * @param whenNo - function to execute when user is logged in
     */
    isLoggedIn(whenYes, whenNo) {
        if (sessionManager.get("username")) {
            whenYes();
        } else {
            whenNo();
        }
    }

    /**
     * Removes username via sessionManager and loads the login screen
     */
    handleLogout() {
        sessionManager.remove("username");

        //go to login screen
        this.loadController(CONTROLLER_LOGIN);
    }
}

const app = new App();

//When the DOM is ready, kick off our application.
$(function () {
    app.init();
});