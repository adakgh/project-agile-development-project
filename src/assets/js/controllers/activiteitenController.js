class EventsController {

    constructor() {
        this.activiteitenRepository = new activiteitenRepository();
        $.get("views/activiteiten.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.eventsView = $(htmlData);

        this.loadEvents();

        $(".content").empty().append(this.eventsView);

        this.eventsView.find(".btn").on("click", (event) => this.onAddEvent(event))
    }

    async onAddEvent(event) {
        event.preventDefault();

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
        } else if (eventBeginTime === eventEndTime){
            alert("De begintijd mag niet gelijk zijn aan de eindtijd!")
        } else if (eventBeginTime > eventEndTime){
            alert("De eindtijd moet hoger zijn dan de begintijd! ")
        }
        else {

            //versturen naar repository
            try {
                const eventId = await this.activiteitenRepository.create(name, personAmount, eventDate, description,
                    place, eventBeginTime, eventEndTime);
                console.log(eventId);
                app.loadController(CONTROLLER_EVENTS)
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

    async loadEvents() {
        const eventData = await this.activiteitenRepository.getAll();
        const eventTable = $("#eventTable");

        for (let i = 0; i < eventData.length; i++) {
            let nextEvent = "<tr>";
            nextEvent += `<td>${eventData[i].name}</td>`;
            nextEvent += `<td>${eventData[i].person_amount}</td>`;
            nextEvent += `<td>${eventData[i].date.slice(0, -14)}</td>`;
            nextEvent += `<td>${eventData[i].status}</td>`;
            nextEvent += `<td>${eventData[i].place}</td>`;
            nextEvent += `<td>${eventData[i].begin_time}</td>`;
            nextEvent += `<td>${eventData[i].end_time}</td>`;


            nextEvent += `<td><button type="button" class="btn btn-success eventAccept" data-eventid = "${eventData[i].id}">Deelnemen</button></td>`;
            nextEvent += `<td><button type="button" class="btn btn-danger eventReject" data-eventid = "${eventData[i].id}">Weigeren</button></td>`;

            $('.eventReject').on("click", (event) => {
                console.log(event.currentTarget.dataset.eventid);
                const eventid = event.currentTarget.dataset.eventid;
                // this.eventdelete(eventid);
            });

            eventTable.append(nextEvent);
        }
    }




}