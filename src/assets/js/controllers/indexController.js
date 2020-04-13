class IndexController {

    constructor() {
        $.get("views/index.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.indexView = $(htmlData);

        $(".content").empty().append(this.indexView);
    }

    error() {
        $(".content").html("Failed to load content")
    }
}