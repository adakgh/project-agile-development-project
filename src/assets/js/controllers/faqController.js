class FaqController {

    constructor() {
        $.get("views/FAQ.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.faqView = $(htmlData);

        $(".content").empty().append(this.faqView);
    }

    error() {
        $(".content").html("Failed to load content")
    }
}