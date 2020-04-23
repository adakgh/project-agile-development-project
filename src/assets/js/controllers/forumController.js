/**
 * Responsible for handling the actions happening on the forum
 *
 * @author Lennard Fonteijn, Pim Meijer
 */
class ForumController {

    constructor() {
        this.forumRepository = new ForumRepository();
        // jQuery.noConflict();

        $.get("views/forum.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.forumView = $(htmlData);

        $(".content").empty().append(this.forumView);

        //als gebruiker niet is ingelogd kan hij/zij geen artikel plaatsen
        if (sessionManager.get("username")) {
            $("#add-button").show();
        } else {
            $(".text-nowrap").empty().append("U kunt hier artikelen <br> bekijken die gepost zijn <br> door andere gebruikers. <br>" +
                "Log in of registreer om <br>zelf een artikel te posten.");
            $("#add-button").hide();
        }

        //wanneer er op de forum artikel aanmaken knop wordt gedrukt
        this.forumView.find(".button").on("click", () => this.onAddPost());

        //ophalen van alle forum artikelen uit het database
        this.allArticles();

        //filteren op categorieen
        //ophalen van alle categorieen
        this.forumView.find("#side-all").on("click", () => this.getAll());

        //ophalen van categorie: event-gerelateerd, discussie, hulp nodig en off-topic
        this.forumView.find("#side-event").on("click", () => this.getEvents());
        this.forumView.find("#side-discussion").on("click", () => this.getDiscussion());
        this.forumView.find("#side-help").on("click", () => this.getHelp());
        this.forumView.find("#side-offtopic").on("click", () => this.getOfftopic());
    }

    //html pagina waar je een artikel kunt schrijven wordt geopend
    onAddPost() {
        new PostForumController();
    }

    error() {
        $(".content").html("Failed to load content")
    }

    //ophalen van alle artikelen
    async allArticles() {
        try {
            //artikelen ophalen uit database
            const forum = await this.forumRepository.getAll();
            //artikelen in template plaatsen
            const template = $("#event-template").html();

            //loop om alles uit het database op te halen
            for (let article of forum) {
                const articles = $(template);

                //artikelen worden gesorteerd op basis van categorieen
                if (article.tag === "event") {
                    articles.find(".forum-title").empty().append(article.username);
                    articles.find(".forum-description").empty().append(article.title);

                    $("#category-event").append(articles);
                } else if (article.tag === "discussion") {
                    articles.find(".forum-title").empty().append(article.username);
                    articles.find(".forum-description").empty().append(article.title);

                    $("#discussie-posts").append(articles);
                } else if (article.tag === "help") {
                    articles.find(".forum-title").empty().append(article.username);
                    articles.find(".forum-description").empty().append(article.title);

                    $("#help-posts").append(articles);
                } else if (article.tag === "off-topic") {
                    articles.find(".forum-title").empty().append(article.username);
                    articles.find(".forum-description").empty().append(article.title);

                    $("#offtopic-posts").append(articles);
                }

                //id van artikel wordt opgehaald
                const id = articles.find(".forum").attr('onclick', `item(${article.id})`);
                console.log(id);
            }
        } catch (e) {
            console.log("error while fetching", e);
        }
    }

    //op categorie filteren
    getAll() {
        $('#category-event').show();
        $('#discussie-posts').show();
        $('#help-posts').show();
        $('#offtopic-posts').show();
    }

    getEvents() {
        console.log("works");
        $('#category-event').show();
        $('#discussie-posts').hide();
        $('#help-posts').hide();
        $('#offtopic-posts').hide();
    }

    getDiscussion() {
        $('#discussie-posts').show();
        $('#category-event').hide();
        $('#help-posts').hide();
        $('#offtopic-posts').hide();
    }

    getHelp() {
        $('#help-posts').show();
        $('#category-event').hide();
        $('#discussie-posts').hide();
        $('#offtopic-posts').hide();
    }

    getOfftopic() {
        $('#offtopic-posts').show();
        $('#discussie-posts').hide();
        $('#category-event').hide();
        $('#help-posts').hide();
    }
}

async function item(id) {
    this.forumRepository = new ForumRepository();

    //pagina met artikel wordt opgeroepen
    $.get("views/forumArticle.html")
        .done((htmlData) => newsetup(htmlData));

    //data uit database met bepaalde id wordt opgehaald
    try {
        const forum = await this.forumRepository.get(id);
        const articleTemplate = $("#article-template").html();

        for (let article of forum) {
            const articles = $(articleTemplate);

            articles.find(".user").empty().append(article.username);
            articles.find(".threadTitleHeader").empty().append(article.title);
            articles.find(".descriptionText").empty().append(article.forum_text);

            // if (article.tag === "event") {
            //     articles.find(".category-name").empty().append("Activiteit-gerelateerd");
            // } else if (article.tag === "discussion") {
            //     articles.find(".category-name").empty().append("Discussie");
            // } else if (article.tag === "help") {
            //     articles.find(".category-name").empty().append("Hulp nodig");
            // } else if (article.tag === "off-topic") {
            //     articles.find(".category-name").empty().append("Off-topic");
            // }

            $(".threadsList").append(articles);
        }
    } catch (e) {
        console.log("error while fetching", e);
    }
}

function newsetup(htmlData) {
    this.forumView = $(htmlData);

    $(".content").empty().append(this.forumView);

    //rapporteren
    this.forumView.find(".report").on("click", () => report());
}

function report() {
    if (confirm("Weet u zeker dat u deze post wilt aangeven?")) {
        alert("Uw bericht is ontvangen.")
    } else {
    }
}