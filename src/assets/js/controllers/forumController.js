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
            //ophalen uit database
            const forum = await this.forumRepository.getAll();

            for (let i = 0; i < forum.length; i++) {
                //artikelen sorteren op categorie
                if (forum[i].tag === "event") {
                    //template zoeken
                    const template = $(".event-articles");

                    //id van artikel
                    let nextForum = `<div class="forum" onclick="item(${forum[i].id})">`;
                    //titel van artikel
                    nextForum += `<div class="forum-description">${forum[i].title}</div>`;
                    //gebruikersnaam van auteur
                    nextForum += `<div class="forum-title">${forum[i].username}</div>`;

                    //icon, likes en posts aantal
                    nextForum += `<div class="forum-icon">
                            <img width="45"
                                 src="https://pngimage.net/wp-content/uploads/2018/05/activity-icon-png-7.png"
                                 alt="">
                        </div>`;
                    nextForum += `<div class="forum-likes">
                            <i class="fa fa-eye"></i> 12
                        </div>`;
                    nextForum += ` <div class="forum-posts">
                    <i class="fa fa-comments-o"></i> 1
                    </div>`;

                    //artikelen achter elkaar zetten
                    template.append(nextForum);
                } else if (forum[i].tag === "discussion") {
                    const template = $(".discussion-articles");

                    let nextForum = `<div class="forum" onclick="item(${forum[i].id})">`;
                    nextForum += `<div class="forum-description">${forum[i].title}</div>`;
                    nextForum += `<div class="forum-title">${forum[i].username}</div>`;

                    nextForum += `<div class="forum-icon">
                            <img width="45"
                                 src="https://cdn.onlinewebfonts.com/svg/img_275111.png"
                                 alt="">
                        </div>`;
                    nextForum += `<div class="forum-likes">
                            <i class="fa fa-eye"></i> 12
                        </div>`;
                    nextForum += ` <div class="forum-posts">
                    <i class="fa fa-comments-o"></i> 3
                    </div>`;

                    template.append(nextForum);
                } else if (forum[i].tag === "help") {
                    const template = $(".help-articles");

                    let nextForum = `<div class="forum" onclick="item(${forum[i].id})">`;
                    nextForum += `<div class="forum-description">${forum[i].title}</div>`;
                    nextForum += `<div class="forum-title">${forum[i].username}</div>`;

                    nextForum += `<div class="forum-icon">
                            <img width="45"
                                 src="https://cdn0.iconfinder.com/data/icons/basic-uses-symbol-vol-2/100/Help_Need_Suggestion_Question_Unknown-512.png"
                                 alt="">
                        </div>`;
                    nextForum += `<div class="forum-likes">
                            <i class="fa fa-eye"></i> 12
                        </div>`;
                    nextForum += ` <div class="forum-posts">
                    <i class="fa fa-comments-o"></i> 5
                    </div>`;

                    template.append(nextForum);
                } else if (forum[i].tag === "off-topic") {
                    const template = $(".offtopic-articles");

                    let nextForum = `<div class="forum" onclick="item(${forum[i].id})">`;
                    nextForum += `<div class="forum-description">${forum[i].title}</div>`;
                    nextForum += `<div class="forum-title">${forum[i].username}</div>`;

                    nextForum += `<div class="forum-icon">
                            <img width="45"
                                 src="https://cdn0.iconfinder.com/data/icons/socio-technical-system-glyph/64/society-social-interaction-friend-activity-512.png"
                                 alt="">
                        </div>`;
                    nextForum += `<div class="forum-likes">
                            <i class="fa fa-eye"></i> 12
                        </div>`;
                    nextForum += ` <div class="forum-posts">
                    <i class="fa fa-comments-o"></i> 9
                    </div>`;

                    template.append(nextForum);
                }

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

//Geklikte artikel wordt opgehaald
async function item(id) {
    this.forumRepository = new ForumRepository();

    //Pagina met artikel wordt opgeroepen
    $.get("views/forumArticle.html")
        .done((htmlData) => newsetup(htmlData));

    //Data uit database met bepaalde id wordt opgehaald
    try {
        const forum = await this.forumRepository.get(id);

        for (let i = 0; i < 1; i++) {
            const template = $(".threadsList");

            const id = `${forum[i].id}`;
            this.loadReply(id);

            let nextForum = `<div class="postContainer">`;

            nextForum += `<div class="threadTitleHeader">${forum[i].title}</div>`;

            nextForum += `<li class="threadItem firstPost"><div class="container">
                            <div class="be-comment-block"><div class="be-img-comment">
                            <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt=""
                                 class="be-ava-comment"></div>`;

            nextForum += `<div class="be-comment-content">
                              <span class="be-comment-name">${forum[i].username}</span>`;

            nextForum += `<div class="answerCountContainer"><span class="report be-comment-time" data-articleid = "${forum[i].id}">
                        <i class="fa fa-exclamation-circle"></i></div></div></span></div></div>`;

            nextForum += `<p class="be-comment-text">${forum[i].forum_text}</p></div></li></div>`;

            template.append(nextForum);
        }

        //Als er op de rapporteren knop wordt gedrukt
        $('.be-comment-time').on("click", (event) => {
            event.preventDefault();

            console.log(event.currentTarget.dataset.articleid);
            const articleid = event.currentTarget.dataset.articleid;
            this.report(articleid);
        });
    } catch (e) {
        console.log("error while fetching", e);
    }
}

//Reacties ophalen
async function loadReply(id) {
    this.replyRepository = new ReplyRepository();

    try {
        const forum = await this.replyRepository.getAll(id);

        console.log(forum);

        for (let i = 0; i < forum.length; i++) {
            const template = $("#wrapper");

            let nextForum = `<ul class="comments"><div class="postContainer mt-3">`;

            nextForum += `<li class="threadCommentItem"><div class="container">
                <div class="be-comment-block"><div class="be-img-comment">
                            <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt=""
                                 class="be-ava-comment">
                        </div>`;

            nextForum += `<div class="be-comment-content">
                              <span class="be-comment-name">${forum[i].username}</span></div></div>`;

            nextForum += `<p class="be-comment-text">${forum[i].reply_text}</p></li></div></ul>`;

            template.append(nextForum);
        }
    } catch (e) {
        console.log("error while fetching", e);
    }

    //als er op de reageren knop wordt gedrukt
    $(".submit").on("click", (event) => {
        event.preventDefault();

        this.createReply(id);
    });
}

//Reactie aanmaken
async function createReply(id) {
    //Form gegevens verzamelen
    const username = sessionManager.get("username");
    const reply_text = this.forumView.find("#reply").val();

    console.log(`${username} - ${reply_text}`);

    //Checken of niks is leeggelaten
    if (username.length === 0 || reply_text.length === 0) {
        alert("Gelieve alle velden in te vullen.");
    } else {
        try {
            //Versturen naar repository
            await this.replyRepository.create(username, reply_text, id);

            //Doorsturen naar forum.html
            alert("Een reactie plaatsen is gelukt!");
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

function newsetup(htmlData) {
    this.forumView = $(htmlData);

    window.scrollTo(0,document.body.scrollTop);
    $(".content").empty().append(this.forumView);
}

//Rapporteren
async function report(id) {
    this.reportRepository = new ReportRepository();

    if (confirm("Weet u zeker dat u deze post wilt aangeven?")) {

        const reportArticle = await this.reportRepository.reportForum(id);
        console.log(reportArticle);
        alert("Uw bericht is ontvangen.")
    } else {
    }
}