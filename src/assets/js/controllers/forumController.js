/**
 * Responsible for handling the actions happening on sidebar view
 *
 * @author Lennard Fonteijn, Pim Meijer
 */
class ForumController {

    constructor() {
        this.forumRepository = new ForumRepository();

        // jQuery.noConflict();

        $.get("views/forum.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.forumView = $(htmlData);

        $(".content").empty().append(this.forumView);

        if (sessionManager.get("username")) {
            $(".btn").show();
        } else {
            $(".text-left").empty().append("U kunt hier artikelen bekijken die gepost zijn door andere gebruikers. U kunt op het artikel\n" +
                "            drukken om meer te lezen.<br> Log in of registreer om een artikel te posten.");
            $(".btn").hide();
        }
    }

    // async onAddPost() {
    //     try {
    //         console.log("this works");
    //     } catch (e) {
    //         //if unauthorized error show error to user
    //         if (e.code === 401) {
    //             this.forumView
    //                 .find(".error")
    //                 .html(e.reason);
    //         } else {
    //             console.log(e);
    //         }
    //     }
    // }

    error() {
        $(".content").html("Failed to load content")
    }
}

function onAddPost() {
    try {
        console.log("this works");
    } catch (e) {
        //if unauthorized error show error to user
        if (e.code === 401) {
            this.forumView
                .find(".error")
                .html(e.reason);
        } else {
            console.log(e);
        }
    }
}