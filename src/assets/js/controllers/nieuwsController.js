class NewsController {

    constructor() {
        $.get("views/nieuws.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.newsView = $(htmlData);

        $(".content").empty().append(this.newsView);

        $(".more").on('click', () => this.readMore());
    }

    readMore() {
        const dots = document.getElementById("dots");
        const moreText = document.getElementById("more");
        const btnText = document.getElementById("morebutton");

        if (dots.style.display === "none") {
            dots.style.display = "inline";
            btnText.innerHTML = "Lees meer &darr;";
            moreText.style.display = "none";
        } else {
            dots.style.display = "none";
            btnText.innerHTML = "Lees minder &uarr;";
            moreText.style.display = "inline";
        }

    }

    error() {
        $(".content").html("Failed to load content")
    }
}
