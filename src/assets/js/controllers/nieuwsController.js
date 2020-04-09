class NewsController {

    constructor() {
        $.get("views/nieuws.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.newsView = $(htmlData);

        $(".content").empty().append(this.newsView);
    }

    error() {
        $(".content").html("Failed to load content")
    }
}
