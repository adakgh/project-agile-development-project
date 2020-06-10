class ProfielAanpassenController {
    constructor() {
        this.ProfielRepository = new ProfielRepository();
        this.UserRepository = new UserRepository();

        $.get("views/gebruikersProfielAanpassen.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.gebruikersProfielAanpassenView = $(htmlData);

        $(".content").empty().append(this.gebruikersProfielAanpassenView);

        this.gebruikersProfielAanpassenView.find(".btn-primary").on("click", (event) => this.onAddEvent(event));
        this.gebruikersProfielAanpassenView.find(".btn-danger").on("click", () => this.cancelPost());
    }

    async onAddEvent(event) {
        event.preventDefault();

        //verzamelen van gegevens
        const user = await this.UserRepository.get(sessionManager.get("username"));
        const id = `${user[0].id}`;

        const usernameveld = this.gebruikersProfielAanpassenView.find("#username").val();
        const naam = this.gebruikersProfielAanpassenView.find("#naam").val();
        const email = this.gebruikersProfielAanpassenView.find("#email").val();
        const stad = this.gebruikersProfielAanpassenView.find("#stad").val();
        const telefoonnr = this.gebruikersProfielAanpassenView.find("#telefoonnr").val();
        const leeftijd = this.gebruikersProfielAanpassenView.find("#leeftijd").val();
        const geslacht = this.gebruikersProfielAanpassenView.find("#geslachtOpties").val();

        console.log(` ${user} - ${naam} -  ${email} - ${stad} - ${telefoonnr} - ${leeftijd} - ${geslacht}`);

        //checken of belangrijke velden niet zijn leeggelaten
       if (usernameveld.length === 0 || naam.length === 0 || email.length === 0 || leeftijd.length === 0 || geslacht.length === 0) {
            alert("Gelieve uw gebruikersnaam, naam, email, leeftijd en geslacht in te vullen.");
        } else {
            try {
                //versturen naar repository
                await this.ProfielRepository.update(id, usernameveld, naam, email, geslacht, leeftijd, stad, telefoonnr);

                //sessie zetten op (nieuwe) username
                sessionManager.set("username", usernameveld);

                //doorsturen naar profiel.html
                alert("Uw gegevens zijn aangepast!");
                app.loadController(CONTROLLER_PROFIEL);
            } catch (e) {
                if (e.code === 401) {
                    this.gebruikersProfielAanpassenView
                        .find(".error")
                        .html(e.reason);
                } else if (e.code === 400) {
                    alert("Deze gebruikersnaam of emailadres is al in gebruik!");
                } else {
                    console.log(e);
                }
            }
        }

        // check of telefoonnummer wel 10 cijfers is
        if (telefoonnr.length !== 10){
            alert("Uw telefoon nummer moet 10 cijfers zijn!");
        }


        //versturen naar repository
        // try {
        //     const eventId = await this.profielAanpassenRepository.create(username, naam, email, stad, telefoonnr, leeftijd, geslacht);
        //     console.log(eventId);
        //     app.loadController(CONTROLLER_PROFIEL);
        // } catch (e) {
        //     console.log(e);
        // }

    }

    //annuleren-knop
    cancelPost() {
        //als er op "ok" en "annuleren" wordt gedrukt
        if (confirm("Weet u zeker dat u de wijzigingen wilt annuleren? Alle gegevens gaan dan verloren.")) {
            new ProfielController();
        } else {
        }
    }

    error() {
        $(".content").html("Failed to load content")
    }
}