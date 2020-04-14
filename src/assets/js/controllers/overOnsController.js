class OverOnsController {

    constructor() {
        $.get("views/overons.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.overonsView = $(htmlData);

        $(".content").empty().append(this.overonsView);
    }

    error() {
        $(".content").html("Failed to load content")
    }
}