class AgendaController {

    constructor() {
        this.agendaRepository = new agendaRepository();
        $.get("views/agenda.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.agendaView = $(htmlData);

        $(".content").empty().append(this.agendaView);

        this.agendaView.find(".btn").on("click", (agenda) => this.onOpenAgenda(agenda))
        //als gebruiker niet is ingelogd ziet hij/zij geen agenda
        // if (sessionManager.get("date")) {
        //     $("#rcorners").show();
        // } else {
        //     $(".text-nowrap").empty().append("U bent nog niet deelgenomen aan een activiteit<br>");
        // }

        //ophalen van alle forum artikelen uit het database
        this.allAgenda();

        //filteren op categorieen
        //ophalen van alle categorieen
        this.agendaView.find("#side-all").on("click", () => this.getAll());

        //ophalen van categorie: event-gerelateerd, discussie, hulp nodig en off-topic
        this.agendaView.find("#side-date").on("click", () => this.getDates());
        this.agendaView.find("#side-time").on("click", () => this.getTime());
        this.agendaView.find("#side-status").on("click", () => this.getStatus());
        this.agendaView.find("#side-place").on("click", () => this.getPlace());
    }

    //html pagina waar je maps kan zien wordt geopend
    onMaps() {
        new MapsController();
    }

    error() {
        $(".content").html("Failed to load content")
    }

    async allDates() {
        this.agendaRepository = new agendaRepository();

        //Popup met Maps wordt opgeroepen
        $.get("views/agendaMap.html")
            .done((htmlData) => newsetup(htmlData));

        try {
            //datums ophalen uit de database
            const datumen = await this.agendaRepository.getAll();
            //datums in template plaatsen
            const template = $("#agenda-template").html();

            //loop om alles uit het database op te halen
            for (let date of datumen) {
                const agendaRow = $(template);

                agendaRow.find(".date").empty().append(date.date);
                agendaRow.find(".threadTitleHeader").empty().append(date.time);
                agendaRow.find(".descriptionText").empty().append(date.status);

                $(".dateList").append(agendaRow);
            }
        } catch (e) {
            console.log("error while fetching", e);
        }

    }

// op datum filteren
getAll()
{
    $('#date-event').show();
    $('#time-event').show();
    $('#status-event').show();
    $('#place-event').show();
}

getDates()
{
    $('#date-event').show();
    $('#time-event').hide();
    $('#status-event').hide();
    $('#place-event').hide();
}

getTime()
{
    $('#date-event').hide();
    $('#time-event').show();
    $('#status-event').hide();
    $('#place-event').hide();
}

getStatus()
{
    $('#date-event').hide();
    $('#time-event').hide();
    $('#status-event').show();
    $('#place-event').hide();
}

getPlace()
{
    $('#date-event').hide();
    $('#time-event').hide();
    $('#status-event').hide();
    $('#place-event').show();
}
}


async onOpenAgenda(agenda){
    agenda.preventDefault();

    //verzamelen van form gegevens
    const date = this.agendaView.find("#dateAgenda").val();
    const time = this.agendaView.find("#timeAgenda").val();
    const status = this.agendaView.find("#statusAgenda").val();
    const place = this.agendaView.find("#placeAgenda").val();

    console.log(`${date} - ${time} - ${status} - ${place}`);

    //data uit database met bepaalde id wordt opgehaald
    try {
        const agenda = await this.forumRepository.get(id);
        const articleTemplate = $("#article-template").html();

        for (let article of forum) {
            const articles = $(articleTemplate);
        }
    }

    //versturen naar repository
    try {
        const agendaId = await this.agendaRepository.create(date, time, status, place);
        console.log(agendaId);
        app.loadController(CONTROLLER_AGENDA)
    } catch (e) {
        console.log(e)
    }


}

// var map;
//
// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: {lat: -34.397, lng: 150.644},
//         zoom: 8
//     });
// }