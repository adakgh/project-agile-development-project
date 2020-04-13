class AgendaController {

    constructor() {
        $.get("views/agenda.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.agendaView = $(htmlData);

        $(".content").empty().append(this.agendaView);
    }

    error() {
        $(".content").html("Failed to load content")
    }
}