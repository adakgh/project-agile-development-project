/**
 * Responsible for handling the actions happening on sidebar view
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

        if (sessionManager.get("username")) {
            $("#add-button").show();
        } else {
            $(".text-nowrap").empty().append("U kunt hier artikelen <br> bekijken die gepost zijn <br> door andere gebruikers. <br>" +
                "Log in of registreer om <br>zelf een artikel te posten.");
            $("#add-button").hide();
        }

        this.fetchArticles();
        this.forumView.find(".button").on("click", () => this.onAddPost());
        this.getEventPosts();
        this.forumView.find("#side-all").on("click", () => this.getAll());
        this.forumView.find("#side-event").on("click", () => this.getEvents());
        this.forumView.find("#side-discussion").on("click", () => this.getDiscussion());
        this.forumView.find("#side-help").on("click", () => this.getHelp());
        this.forumView.find("#side-offtopic").on("click", () => this.getOfftopic());
        // this.forumView.find(".category").on("click", () => this.item());
    }

    //ophalen van artikelen
    async fetchArticles() {
        try {
            const forum = await this.getProducts();
            const template = $("#template1").html();

            for (let article of forum) {
                const articles = $(template);

                articles.find(".h5").empty().append(article.username);
                articles.find(".card-title").empty().append(article.title);
                articles.find(".card-text").empty().append(article.forum_text);
                articles.find(".badge").empty().append(article.tag);

                // $('#hideshow').on('click', function () {
                //     if ($("span[class='discussion']")){
                //         $("#card").hide();
                //     }
                // });

                // articles.find('data-tags').empty().append(article.tag);

                // articles.find('.mdl-cell').attr("data-tags", article.tag);
                // articles.find('.mdl-card').attr("data-filter-tag", article.tag);

                // let num = articles.find(".mdl-cell").attr("data-tags", article.tag);
                // num = article.tag;
                // console.log(num);
                // articles.find('#tag').attr('data-tags', num);
                //
                // let num1 = articles.find(".mdl-card").attr("data-filter-tag", article.tag);
                // num1 = article.tag;
                // console.log(num1);
                // $('#badge').attr('data-filter-tag', num1);

                console.log(article);
                $("#card").append(articles);
            }
        } catch (e) {
            console.log("error while fetching", e);
        }

    }

    async getProducts() {
        return this.forumRepository.getAll();
    }

    onAddPost() {
        new PostForum();
    }

    error() {
        $(".content").html("Failed to load content")
    }

    async getEventPosts() {
        try {
            const forum = await this.getProducts();
            const template = $("#event-template").html();

            for (let article of forum) {
                const articles = $(template);

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
                const id = articles.find(".forum-description").attr("onclick", `item(${article.id})`);
                // const id2 = articles.find("a[href='#']").attr("href", "http://www.google.com");


                console.log(id);
                // console.log(id2)
            }

        } catch (e) {
            console.log("error while fetching", e);
        }

    }

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

function item(id) {
    console.log("works");
    window.location.hash = 'forum/' + id;
    
}

