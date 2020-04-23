class AgendaController {

    constructor() {
        this.agendaRepository = new AgendaRepository();

        $.get("views/agenda.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.agendaView = $(htmlData);

        $(".content").empty().append(this.agendaView);

        //als gebruiker niet is ingelogd ziet hij/zij geen agenda
        if (sessionManager.get("date")) {
            $("#rcorners").show();
        } else {
            $(".text-nowrap").empty().append("U bent nog niet deelgenomen aan een activiteit<br>");
        }

        var map;
        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            });
        }

        error()
        {
            $(".content").html("Failed to load content")
        }
    }
}