/**
 * Responsible for handling the actions happening on welcome view
 * For now it uses the roomExampleRepository to get some example data from server
 *
 * @author Lennard Fonteijn & Pim Meijer
 */
class WelcomeController {
    constructor() {
        // this.roomExampleRepository = new RoomExampleRepository();
        this.registerRepository = new RegisterRepository();
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

        //Set the name in the view from the session
        this.welcomeView.find(".name").html(sessionManager.get("username"));

        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.welcomeView);

        this.fetchRooms();
        this.getEvents();
    }

    /**
     * async function that retrieves a kamer by its id via repository
     * @param roomId the room id to retrieve
     */
    async fetchRooms() {
        const exampleResponse = this.welcomeView.find(".welcome");
        try {
            //await keyword 'stops' code until data is returned - can only be used in async function
            // const roomData = await this.registerRepository.get();

            const gebruiker = (JSON.stringify(sessionManager.get("username")).replace(/['"]+/g, ''));
            exampleResponse.text("Welkom terug " + gebruiker + ", ")
        } catch (e) {
            console.log("error while fetching rooms", e);

            //for now just show every error on page, normally not all errors are appropriate for user
            exampleResponse.text(e);
        }
    }

    async getEvents() {
        const eventData = await this.eventRepository.getAll();
        const eventTable = $(".events__list");

        for (let i = 0; i < 4; i++) {
            let nextEvent = "<li class=\"events__item rounded\">";

            //dag van de activiteit omzetten
            nextEvent += `<div class="events__date">
                                <span class="events__day">${eventData[i].date.slice(8, -14)}</span>`;

            //maand omzetten in tekst
            if(eventData[i].date.slice(5, -17) === "06"){
                nextEvent += `<div class="events__month">juni</div>
                    </div>`;
            } else if (eventData[i].date.slice(5, -17) === "07"){
                nextEvent += `<div class="events__month">juli</div>
                    </div>`;
            }else if (eventData[i].date.slice(5, -17) === "08"){
                nextEvent += `<div class="events__month">aug</div>
                    </div>`;
            }else if (eventData[i].date.slice(5, -17) === "09"){
                nextEvent += `<div class="events__month">sep</div>
                    </div>`;
            }else if (eventData[i].date.slice(5, -17) === "10"){
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

            nextEvent += `<p class="events__desc h4">${eventData[i].name}`;

            nextEvent += `<br> <span class="font-weight-bold">${eventData[i].begin_time} - ${eventData[i].end_time}</span></p></li> <br>`;

            eventTable.append(nextEvent);
        }
    }

    //Called when the login.html fails to load
    error() {
        $(".content").html("Failed to load content!");
    }
}