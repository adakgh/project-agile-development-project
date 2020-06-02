class AgendaController {

    constructor() {
        this.userRepository = new UserRepository();
        this.eventRepository = new activiteitenRepository();
        $.get("views/agenda.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.agendaView = $(htmlData);

        $(".content").empty().append(this.agendaView);

        this.getEvents();
    }

    async getEvents() {
        const user = await this.userRepository.get(sessionManager.get("username"));
        const id = `${user[0].id}`;

        const eventData = await this.eventRepository.getAgenda(id);
        const eventTable = $(".events__list");

        const todayDate = new Date().toISOString().slice(0, 10);

        for (let i = 0; i < eventData.length; i++) {
            if (`${eventData[i].date}` > todayDate) {

                let nextEvent = "<li class=\"events__item rounded col-4 m-2\">";

                //dag van de activiteit omzetten
                nextEvent += `<div class="events__date">
                                <span class="events__day">${eventData[i].date.slice(8, -14)}</span>`;

                //maand omzetten in tekst
                if (eventData[i].date.slice(5, -17) === "06") {
                    nextEvent += `<div class="events__month">juni</div>
                    </div>`;
                } else if (eventData[i].date.slice(5, -17) === "07") {
                    nextEvent += `<div class="events__month">juli</div>
                    </div>`;
                } else if (eventData[i].date.slice(5, -17) === "08") {
                    nextEvent += `<div class="events__month">aug</div>
                    </div>`;
                } else if (eventData[i].date.slice(5, -17) === "09") {
                    nextEvent += `<div class="events__month">sep</div>
                    </div>`;
                } else if (eventData[i].date.slice(5, -17) === "10") {
                    nextEvent += `<div class="events__month">okt</div>
                    </div>`;
                } else if (eventData[i].date.slice(5, -17) === "11") {
                    nextEvent += `<div class="events__month">nov</div>
                    </div>`;
                } else if (eventData[i].date.slice(5, -17) === "12") {
                    nextEvent += `<div class="events__month">dec</div>
                    </div>`;
                } else if (eventData[i].date.slice(5, -17) === "01") {
                    nextEvent += `<div class="events__month">jan</div>
                    </div>`;
                } else if (eventData[i].date.slice(5, -17) === "02") {
                    nextEvent += `<div class="events__month">feb</div>
                    </div>`;
                } else if (eventData[i].date.slice(5, -17) === "03") {
                    nextEvent += `<div class="events__month">maart</div>
                    </div>`;
                } else if (eventData[i].date.slice(5, -17) === "04") {
                    nextEvent += `<div class="events__month">april</div>
                    </div>`;
                } else if (eventData[i].date.slice(5, -17) === "05") {
                    nextEvent += `<div class="events__month">mei</div>
                    </div>`;
                }

                nextEvent += `<p class="events__desc h4">${eventData[i].name}<br>`;

                nextEvent += `<span class="events__desc h5">${eventData[i].place}</span>`;

                nextEvent += `<br> <span class="font-weight-bold">${eventData[i].begin_time} - ${eventData[i].end_time}</span></p></li> <br>`;

                eventTable.append(nextEvent);
            }
        }

        error()
        {
            $(".content").html("Failed to load content")
        }
    }
}