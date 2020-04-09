class EventsController {

    constructor() {
        $.get("views/activiteiten.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.eventsView = $(htmlData);

        $(".content").empty().append(this.eventsView);
    }

    error() {
        $(".content").html("Failed to load content")
    }
}