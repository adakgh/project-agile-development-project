class WelcomeController {
    constructor() {
        this.userRepository = new UserRepository();
        this.eventRepository = new activiteitenRepository();

        //als ingelogd als admin laat admin pagina zien
        if (sessionManager.get("username") === "test") {
            $.get("views/admin.html")
                .done((data) => this.setup(data))
                .fail(() => this.error());

            new AdminController();
        } else {
            $.get("views/welcome.html")
                .done((data) => this.setup(data))
                .fail(() => this.error());
        }
    }

    //Called when the welcome.html has been loaded
    setup(data) {
        //Load the welcome-content into memory
        this.welcomeView = $(data);

        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.welcomeView);

        this.getUser();
        this.getEvents();
    }


    async getUser() {
        const exampleResponse = this.welcomeView.find(".welcome");
        try {

            exampleResponse.text("Welkom terug, " + sessionManager.get("username") + "!")
        } catch (e) {
            console.log("error while fetching", e);
        }
    }

    async getEvents() {
        const user = await this.userRepository.get(sessionManager.get("username"));
        const id = `${user[0].id}`;

        const eventData = await this.eventRepository.getAgenda(id);
        const eventTable = $(".events__list");

        const moreButton = $(".hidden");

        const todayDate = new Date().toISOString().slice(0, 10);

        if (eventData.length > 0) {
            for (let i = 0; i < 4; i++) {
                if (`${eventData[i].date}` > todayDate) {
                    let nextEvent = "<li class=\"events__item rounded\">";

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

                    nextEvent += `<span class="font-weight-bold">${eventData[i].place}<br>${eventData[i].begin_time} - ${eventData[i].end_time}</span></p></li> <br>`;

                    eventTable.append(nextEvent);
                    moreButton.show();
                }
            }
        } else {
            eventTable.append(`<div class=\"h4 text\">Uw agenda is nog leeg, neem deel aan activiteiten op de activiteitenpagina.</div> 
               <button class="btn meer float-right mt-3 agenda" onclick="app.loadController(new EventsController())">
                        Deelnemen
                    </button>`);
        }
    }

    //Called when the page fails to load
    error() {
        $(".content").html("Failed to load content!");
    }
}