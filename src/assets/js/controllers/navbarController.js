/**
 * Responsible for handling the actions happening on sidebar view
 *
 * @author Lennard Fonteijn, Pim Meijer
 */
class NavbarController {
    constructor() {
        //refresht welcome en login pagina voor sessie
        function locationHashChanged() {
            if (location.hash === '#welcome' || location.hash === '#login') {
                window.location.reload(true);
            }
        }
        window.onhashchange = locationHashChanged;

        $.get("views/navbar.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    //Called when the navbar.html has been loaded
    setup(data) {
        //Load the sidebar-content into memory
        const sidebarView = $(data);

        //Find all anchors and register the click-event
        sidebarView.find("a").on("click", this.handleClickMenuItem);

        //navbar items worden verborgen of getoond wanneer in of uitgelogd
        if (sessionManager.get("username")) {
            sidebarView.find(".loggedout").hide();
            sidebarView.find(".loggedin").show();
            $(".sidebar").empty().append(sidebarView);
        } else {
            sidebarView.find(".loggedout").show();
            sidebarView.find(".loggedin").hide();
            $(".sidebar").empty().append(sidebarView);
        }
    }

    handleClickMenuItem() {
        //Get the data-controller from the clicked element (this)
        const controller = $(this).attr("data-controller");

        //Pass the action to a new function for further processing
        app.loadController(controller);

        //Return false to prevent reloading the page
        return false;
    }

    //Called when the login.html failed to load
    error() {
        $(".content").html("Failed to load the sidebar!");
    }
}