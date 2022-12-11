/*!
 * Start Bootstrap - Simple Sidebar v6.0.5 (https://startbootstrap.com/template/simple-sidebar)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
 */
//
// Scripts
//

async function retreiveHTML(contentid) {
    var classification = contentid;

    try {
        let response = await fetch("/snippets/" + classification + "_slides.html ");

        let html = await response.text();

        return html;
    } catch (e) {
        console.log("error");
    }
}

async function populateHTMLContentForSidebarItem(contentId) {
    var contentElement = document.getElementById(contentId);

    mainContent = document.getElementById("mainContent");

    if (!contentElement) {
        var htmlContent = await retreiveHTML(contentId);
        mainContent.innerHTML += htmlContent;
    }

    var children = mainContent.children;
    for (var i = 0; i < children.length; i++) {
        if (children[i].id == contentId) {
            children[i].style.display = "block";
        } else {
            children[i].style.display = "none";
        }
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener("click", (event) => {
            event.preventDefault();
            document.body.classList.toggle("sb-sidenav-toggled");
            localStorage.setItem(
                "sb|sidebar-toggle",
                document.body.classList.contains("sb-sidenav-toggled")
            );
        });
    }

    //add handler for sidebar item
    var triggerTabList = Array.prototype.slice.call(
        document.querySelectorAll("#sidebar-wrapper a")
    );
    triggerTabList.forEach(function(triggerEl) {
        var tabTrigger = new bootstrap.Tab(triggerEl);

        triggerEl.addEventListener("click", function(event) {
            event.preventDefault();

            tabTrigger.show();

            //request content for corresponding sidebar item
            populateHTMLContentForSidebarItem(event.target.innerText.toLowerCase());
        });
    });
    //load scratchjr for the first time
    populateHTMLContentForSidebarItem("scratchjr");
});

function slideTo(carouselId, pageno) {
    var myCarousel = document.querySelector("#" + carouselId);
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: false,
        wrap: false,
        ride: false,
    });
    carousel.to(pageno);
}