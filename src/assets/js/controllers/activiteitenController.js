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

        //wanneer er op de aanmaken knop wordt gedrukt
        this.eventsView.find(".button").on("click", () => this.onAddPost());
    }

    //html pagina waar je een activiteit kunt aanmaken
    onAddPost() {
        new PostActiviteitenController();
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

                const eventDelete = await this.activiteitenRepository.delete(id);
                console.log(eventDelete);

            nextEvent += `<td><button type="button" class="btn btn-success eventAccept" data-eventid = "${eventData[i].id}">Deelnemen</button></td>`;
            nextEvent += `<td><button type="button" class="btn btn-danger eventReject" data-eventid = "${eventData[i].id}">Weigeren</button></td>`;

            eventTable.append(nextEvent)
        }
        //Als er op de weigeren knop wordt gedrukt
        $('.eventReject').on("click", (event) => {
            event.preventDefault();

            console.log(event.currentTarget.dataset.eventid);
            const eventid = event.currentTarget.dataset.eventid;
            this.eventreject(eventid);
        });

        //Als er op de deelnemen knop wordt gedrukt
        $('.eventAccept').on("click", (event) => {
            event.preventDefault();

            console.log(event.currentTarget.dataset.eventid);
            const eventid = event.currentTarget.dataset.eventid;
            this.eventaccept(eventid);
        });
    }

    async eventaccept(id) {
        try {
            if (confirm("Weet u zeker dat u wilt deelnemen aan deze activiteit?")) {
                alert("U heeft deelgenomen aan deze activiteit!");

                const eventAccept = await this.activiteitenRepository.delete(id);
                console.log(eventAccept);

                new AgendaController();
            } else {
            }
        } catch (e) {
            console.log(e);
        }
    }

    //Activiteit verwijderen
    async eventreject(id) {
        try {
            if (confirm("Weet u zeker dat u deze activiteit wilt weigeren?")) {
                alert("U heeft deze activiteit geweigerd!");

                const eventDelete = await this.activiteitenRepository.delete(id);
                console.log(eventDelete);

                new EventsController();
            } else {
            }
        } catch (e) {
            console.log(e);
        }
    }
    error() {
        $(".content").html("Failed to load content")
    }
}