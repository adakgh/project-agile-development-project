class PostForum {
    constructor() {
        this.forumRepository = new ForumRepository();

        // jQuery.noConflict();

        $.get("views/postForum.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.forumView = $(htmlData);

        $(".content").empty().append(this.forumView);

        this.forumView.find(".form-button").on("click", (event) => this.newPost(event));
        this.forumView.find(".back-button").on("click", () => this.deletePost());
    }

    async newPost(event) {
        event.preventDefault();

        //form gegevens verzamelen
        const username = sessionManager.get("username");
        const title = this.forumView.find("#title").val();
        const forum_text = this.forumView.find("#forum_text").val();
        const tag = this.forumView.find("#tag").val();

        console.log(`${username} - ${title} - ${forum_text} - ${tag}`);

        //checken of niks is leeggelaten
        if (title.length === 0 || forum_text.length === 0 || tag.length === 0) {
            alert("Gelieve alle velden in te vullen.");
        } else {
            try {
                //versturen naar repository
                await this.forumRepository.create(username, title, forum_text, tag);

                //doorsturen naar forum.html
                alert("Het posten van een artikel is gelukt!");
                app.loadController(CONTROLLER_FORUM);
            } catch (e) {
                if (e.code === 401) {
                    this.forumView
                        .find(".error")
                        .html(e.reason);
                } else {
                    console.log(e);
                }
            }
        }
    }

    //terug-knop
    deletePost() {
        //als er ok "ok" en "annuleren" wordt gedrukt
        if (confirm("Weet u zeker dat u terug wilt? Alle gegevens gaan dan verloren.")) {
            new ForumController();
        } else {
        }
    }

    error() {
        $(".content").html("Failed to load content")
    }
}


