class EventsController {

    constructor() {
        this.activiteitenRepository = new activiteitenRepository();
        $.get("views/activiteiten.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.eventsView = $(htmlData);

        $(".content").empty().append(this.eventsView);

        this.eventsView.find(".btn").on("click", (event) => this.onAddEvent(event))
    }

    async onAddEvent(event) {
        event.preventDefault();

        //verzamelen van form gegevens
        const name = this.eventsView.find("#inputName").val();
        const personAmount = this.eventsView.find("#inputPersonAmount").val();
        const eventDate = this.eventsView.find("#inputDate").val();

        console.log(`${name} - ${personAmount} - ${eventDate}`);

        //versturen naar repository
        try {
            const eventId = await this.activiteitenRepository.create(name, personAmount, eventDate)
            console.log(eventId)
            app.loadController(CONTROLLER_WELCOME)
        } catch (e) {
            console.log(e)
        }

    }
    error() {
        $(".content").html("Failed to load content")
    }


}