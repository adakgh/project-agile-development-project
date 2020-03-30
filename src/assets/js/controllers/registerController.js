class RegisterController {

    constructor() {
        this.registerRepository = new RegisterRepository();

        jQuery.noConflict();

        $.get("views/register.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.registerView = $(htmlData);

        $(".content").empty().append(this.registerView);

        this.registerView.find(".btn").on("click", (event) => this.onAddEvent(event));
    }

    async onAddEvent(event) {
        event.preventDefault();

        //form gegevens verzamelen
        const username = this.registerView.find("#exampleUserName").val();
        const name = this.registerView.find("#exampleFullName").val();
        const email = this.registerView.find("#exampleInputEmail").val();
        const password = this.registerView.find("#exampleInputPassword").val();
        const validationPassword = this.registerView.find("#exampleRepeatPassword").val();
        const gender = this.registerView.find("#exampleGender").val();
        const age = this.registerView.find("#exampleAge").val();
        const newsletter = this.registerView.find("#defaultRegisterFormNewsletter").val();

        console.log(`${username} - ${name} - ${email} - ${password} - ${gender} - ${age}`);


        if (username.length === "" || name.length == "" || email.length == "" || password.length == "" || validationPassword == "" || gender.length == "" || age.length === "") {
            alert("Gelieve alles in te vullen en controleer of uw wachtwoorden overeenkomen.");
        } else {
            try {
                //versturen naar repository
                this.registerRepository.create(username, name, email, password, gender, age);
            } catch (e) {
                if (e.code === 401) {
                    this.registerView
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