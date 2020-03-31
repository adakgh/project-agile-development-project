class ProfielAanpassenController {
    constructor() {
        this.profielAanpassenRepository = new ProfielAanpassenRepository();

        $.get("views/gebruikersProfielAanpassen.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.gebruikersProfielAanpassenView = $(htmlData);

        $(".content").empty().append(this.gebruikersProfielAanpassenView);

        this.gebruikersProfielAanpassenView.find(".btn").on("click", (event) => this.onAddEvent(event));
    }

    async onAddEvent(event) {
        event.preventDefault();

        //verzamelen van form gegevens
        const naam = this.gebruikersProfielAanpassenView.find("#name").val();
        const achternaam = this.gebruikersProfielAanpassenView.find("#lastname").val();
        const email = this.gebruikersProfielAanpassenView.find("#email").val();
        const leeftijd = this.gebruikersProfielAanpassenView.find("#age").val();
        const stad = this.gebruikersProfielAanpassenView.find("#city").val();
        const telefoonnr = this.gebruikersProfielAanpassenView.find("#telcode").val();
        const geslacht = this.gebruikersProfielAanpassenView.find("#geslachtOpties").val();

        console.log(` ${naam} - ${achternaam} - ${email} - ${leeftijd} - ${stad} - ${telefoonnr} - ${geslacht}`);

        //versturen naar repository
        try {

            const eventId = await this.profielAanpassenRepository.create(naam, achternaam, email, leeftijd, stad, telefoonnr, geslacht);
            console.log(eventId);
            app.loadController(CONTROLLER_PROFIEL);
        } catch (e) {
            console.log(e);
        }

    }
}