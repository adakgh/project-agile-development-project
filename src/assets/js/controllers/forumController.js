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
    }

    error() {
        $(".content").html("Failed to load content")
    }
}