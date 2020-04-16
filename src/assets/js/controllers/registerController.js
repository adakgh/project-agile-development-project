class RegisterController {
    constructor() {
        this.registerRepository = new RegisterRepository();
        this.userRepository = new UserRepository();

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

        function checkPassword(str) {
            const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
            return re.test(str);
        }

        //checken of niks is leeggelaten, wachtwoorden overeenkomen en wachtwoord houdt aan de regels
        if (username.length === "" || name.length === "" || email.length === "" || password.length === "" || validationPassword === "" || gender.length === "" || age.length === "") {
            alert("Gelieve alle velden in te vullen.");
        } else if (password !== validationPassword) {
            alert("Controleer nogmaals of uw wachtwoorden overeenkomen.")
        } else if (!checkPassword(password)) {
            alert("Wachtwoord bevat niet minstens één hoofdletter en getal!");
        } else {
            try {
                //versturen naar repository
                const eventId = await this.registerRepository.create(username, name, email, password, gender, age);
                console.log(eventId);

                //TODO: session
                const user = await this.userRepository.login(username, password);
                sessionManager.set("username", user.username);

                //doorsturen naar welcome.html
                new WelcomeController();
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