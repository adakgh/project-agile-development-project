class NewsController {

    constructor() {
        $.get("views/nieuws.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.newsView = $(htmlData);

        $(".content").empty().append(this.newsView);

        //lees meer knop
        $('.read-more-content').addClass('hide');

        $('.read-more-toggle').on('click', function() {
            $(this).next('.read-more-content').toggleClass('hide');
        });
    }

    error() {
        $(".content").html("Failed to load content")
    }
}
