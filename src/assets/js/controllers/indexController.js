class IndexController {

    constructor() {
        // this.eventRepository = new activiteitenRepository();
        this.forumRepository = new ForumRepository();

        $.get("views/index.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.indexView = $(htmlData);

        $(".content").empty().append(this.indexView);

        // this.allArticles();
        // this.getEvents();
    }

    //ophalen van alle artikelen
    // async allArticles() {
    //     try {
    //         //ophalen uit database
    //         const forum = await this.forumRepository.getAll();
    //
    //         for (let i = 0; i < forum.length; i++) {
    //             //artikelen sorteren op categorie
    //             if (forum[i].tag === "event") {
    //                 //template zoeken
    //                 const template = $(".event-articles");
    //
    //                 //id van artikel
    //                 let nextForum = `<div class="forum" onclick="item(${forum[i].id})">`;
    //                 //titel van artikel
    //                 nextForum += `<div class="forum-description">${forum[i].title}</div>`;
    //                 //gebruikersnaam van auteur
    //                 nextForum += `<div class="forum-title">${forum[i].username}</div>`;
    //
    //                 //icon, likes en posts aantal
    //                 nextForum += `<div class="forum-icon">
    //                         <img width="45"
    //                              src="https://pngimage.net/wp-content/uploads/2018/05/activity-icon-png-7.png"
    //                              alt="">
    //                     </div>`;
    //                 nextForum += `<div class="forum-likes">
    //                         <i class="fa fa-eye"></i> 12
    //                     </div>`;
    //                 nextForum += ` <div class="forum-posts">
    //                 <i class="fa fa-comments-o"></i> 1
    //                 </div>`;
    //
    //                 //artikelen achter elkaar zetten
    //                 template.append(nextForum);
    //             } else if (forum[i].tag === "discussion") {
    //                 const template = $(".discussion-articles");
    //
    //                 let nextForum = `<div class="forum" onclick="item(${forum[i].id})">`;
    //                 nextForum += `<div class="forum-description">${forum[i].title}</div>`;
    //                 nextForum += `<div class="forum-title">${forum[i].username}</div>`;
    //
    //                 nextForum += `<div class="forum-icon">
    //                         <img width="45"
    //                              src="https://cdn.onlinewebfonts.com/svg/img_275111.png"
    //                              alt="">
    //                     </div>`;
    //                 nextForum += `<div class="forum-likes">
    //                         <i class="fa fa-eye"></i> 12
    //                     </div>`;
    //                 nextForum += ` <div class="forum-posts">
    //                 <i class="fa fa-comments-o"></i> 3
    //                 </div>`;
    //
    //                 template.append(nextForum);
    //             } else if (forum[i].tag === "help") {
    //                 const template = $(".help-articles");
    //
    //                 let nextForum = `<div class="forum" onclick="item(${forum[i].id})">`;
    //                 nextForum += `<div class="forum-description">${forum[i].title}</div>`;
    //                 nextForum += `<div class="forum-title">${forum[i].username}</div>`;
    //
    //                 nextForum += `<div class="forum-icon">
    //                         <img width="45"
    //                              src="https://cdn0.iconfinder.com/data/icons/basic-uses-symbol-vol-2/100/Help_Need_Suggestion_Question_Unknown-512.png"
    //                              alt="">
    //                     </div>`;
    //                 nextForum += `<div class="forum-likes">
    //                         <i class="fa fa-eye"></i> 12
    //                     </div>`;
    //                 nextForum += ` <div class="forum-posts">
    //                 <i class="fa fa-comments-o"></i> 5
    //                 </div>`;
    //
    //                 template.append(nextForum);
    //             } else if (forum[i].tag === "off-topic") {
    //                 const template = $(".offtopic-articles");
    //
    //                 let nextForum = `<div class="forum" onclick="item(${forum[i].id})">`;
    //                 nextForum += `<div class="forum-description">${forum[i].title}</div>`;
    //                 nextForum += `<div class="forum-title">${forum[i].username}</div>`;
    //
    //                 nextForum += `<div class="forum-icon">
    //                         <img width="45"
    //                              src="https://cdn0.iconfinder.com/data/icons/socio-technical-system-glyph/64/society-social-interaction-friend-activity-512.png"
    //                              alt="">
    //                     </div>`;
    //                 nextForum += `<div class="forum-likes">
    //                         <i class="fa fa-eye"></i> 12
    //                     </div>`;
    //                 nextForum += ` <div class="forum-posts">
    //                 <i class="fa fa-comments-o"></i> 9
    //                 </div>`;
    //
    //                 template.append(nextForum);
    //             }
    //
    //         }
    //     } catch (e) {
    //         console.log("error while fetching", e);
    //     }
    // }

    // async getEvents() {
    //     const eventData = await this.eventRepository.getAll();
    //     const eventTable = $(".events__list");
    //
    //     for (let i = 0; i < 4; i++) {
    //         let nextEvent = "<li class=\"events__item rounded\">";
    //
    //         //dag van de activiteit omzetten
    //         nextEvent += `<div class="events__date">
    //                             <span class="events__day">${eventData[i].date.slice(8, -14)}</span>`;
    //
    //         //maand omzetten in tekst
    //         if(eventData[i].date.slice(5, -17) === "06"){
    //             nextEvent += `<div class="events__month">juni</div>
    //                 </div>`;
    //         } else if (eventData[i].date.slice(5, -17) === "07"){
    //             nextEvent += `<div class="events__month">juli</div>
    //                 </div>`;
    //         }else if (eventData[i].date.slice(5, -17) === "08"){
    //             nextEvent += `<div class="events__month">aug</div>
    //                 </div>`;
    //         }else if (eventData[i].date.slice(5, -17) === "09"){
    //             nextEvent += `<div class="events__month">sep</div>
    //                 </div>`;
    //         }else if (eventData[i].date.slice(5, -17) === "10"){
    //             nextEvent += `<div class="events__month">okt</div>
    //                 </div>`;
    //         }
    //
    //         nextEvent += `<p class="events__desc h4">${eventData[i].name}`;
    //
    //         nextEvent += `<br> <span class="font-weight-bold">${eventData[i].time.slice(0, -8)}</span></p></li> <br>`;
    //
    //         eventTable.append(nextEvent);
    //     }
    // }

    //Called when the login.html fails to load
    error() {
        $(".content").html("Failed to load content!");
    }
}