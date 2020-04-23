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

        this.agendaView.find(".btn").on("click", (agenda) => this.onOpenAgenda(agenda))
        //als gebruiker niet is ingelogd ziet hij/zij geen agenda
        if (sessionManager.get("date")) {
            $("#rcorners").show();
        } else {
            $(".text-nowrap").empty().append("U bent nog niet deelgenomen aan een activiteit<br>");
        }

        async onOpenAgenda(agenda) {
            agenda.preventDefault();

            //verzamelen van form gegevens
            const date = this.agendaView.find("#dateAgenda").val();
            const time = this.agendaView.find("#timeAgenda").val();
            const status = this.agendaView.find("#statusAgenda").val();
            const place = this.agendaView.find("#placeAgenda").val();

            console.log(`${date} - ${time} - ${status} - ${place}`);


            var map;

        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            });
        }
            //versturen naar repository
            try {
                const agendaId = await this.agendaRepository.create(date,time,status,place);
                console.log(agendaId);
                app.loadController(CONTROLLER_AGENDA)
            } catch (e) {
                console.log(e)
            }

        }
        error() {
            $(".content").html("Failed to load content")
        }
    }
}