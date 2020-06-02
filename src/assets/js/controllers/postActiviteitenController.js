class PostActiviteitenController {

    constructor() {
        this.activiteitenRepository = new activiteitenRepository();
        $.get("views/activiteitAanmaken.html")
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

        //datum van vandaag
        const todayDate = new Date().toISOString().slice(0, 10);

        //verzamelen van form gegevens
        const name = this.eventsView.find("#inputName").val();
        const personAmount = this.eventsView.find("#inputPersonAmount").val();
        const eventDate = this.eventsView.find("#inputDate").val();
        const description = this.eventsView.find("#inputDescription").val();
        const place = this.eventsView.find("#inputLocation").val();
        const eventBeginTime = this.eventsView.find("#inputBeginTime").val();
        const eventEndTime = this.eventsView.find("#inputEndTime").val();

        console.log(`${name} - ${personAmount} - ${eventDate} - ${description} - ${place} - ${eventBeginTime} ${eventEndTime}`);

        if (name === "" || personAmount === "" || eventDate === null || description === "" || place === ""
            || eventBeginTime === "" || eventBeginTime === null || eventEndTime === null || eventEndTime === "") {
            alert("Vul alle velden in!")
        } else if (personAmount < 2) {
            alert("Aantal deelnemers mag niet kleiner zijn dan 2!")
        } else if (personAmount > 50) {
            alert("Aantal deelnemers mag niet groter zijn dan 50!")
        } else if (eventBeginTime === eventEndTime) {
            alert("De begintijd mag niet gelijk zijn aan de eindtijd!")
        } else if (eventBeginTime > eventEndTime) {
            alert("De eindtijd moet hoger zijn dan de begintijd!")
        } else if (eventDate < todayDate) {
            alert("Je datum van het activiteit mag niet in het verleden zijn!")
        } else {

            //versturen naar repository
            try {
                const eventId = await this.activiteitenRepository.create(name, personAmount, eventDate, description,
                    place, eventBeginTime, eventEndTime);
                console.log(eventId);
                app.loadController(CONTROLLER_EVENTS);
                alert("\nEvenement is geplaatst!")

            } catch (e) {
                if (e.code === 401) {
                    this.eventsView
                        .find(".error")
                        .html(e.reason);
                } else {
                    console.log(e);
                }
            }
        }
    }

    error() {
        $(".content").html("Failed to load content")
    }
}
