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