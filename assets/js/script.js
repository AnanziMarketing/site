const DATA_URL = "assets/data/data.json";

let siteData = null;


/* =========================================================
   DATA
========================================================= */

async function loadSiteData() {

    try {

        const response = await fetch(DATA_URL);

        if (!response.ok) {
            throw new Error("Unable to load data.json");
        }

        siteData = await response.json();

        initializeSite();

    } catch (error) {

        console.error("Ananzi data error:", error);

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializeSite() {

    renderHeader();
    renderFooter();

    setupMobileMenu();
    setupDropdowns();
    setupFilters();
    setupHeroExplorer();
    setupSmoothAnchors();

    renderExperiences();
    renderWhyFacts();
    renderReviews();
    renderAbout();
    renderTeam();
    renderToursPage();
    renderTeamBuilding();
    renderGallery();
    renderAffiliations();
    renderOfficeHours();
    renderSpecial();

    setupBookingForm();
    setupContactForm();

    renderTourDetails();

}


/* =========================================================
   HEADER
========================================================= */

function renderHeader() {

    const header = document.getElementById("site-header");

    if (!header) return;

    header.innerHTML = `

        <header class="site-header">

            <div class="container nav-container">

                <a
                    href="index.html"
                    class="brand"
                >

                    <img
                        src="assets/img/logo/logo.png"
                        alt="Ananzi Marketing"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                    >

                    <span class="brand-fallback">
                        ANANZI
                    </span>

                </a>


                <button
                    class="mobile-menu-toggle"
                    type="button"
                    aria-label="Open navigation"
                    aria-expanded="false"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>


                <nav class="main-nav">

                    <a
                        href="index.html"
                        class="nav-link"
                    >
                        Home
                    </a>


                    <div class="nav-dropdown">

                        <button
                            type="button"
                            class="nav-dropdown-toggle"
                        >
                            About 
                            <span>▼</span>
                        </button>

                        <div class="dropdown-menu">

                            <a href="about.html#team">
                                Our Team
                            </a>

                            <a href="about.html#vision">
                                Vision
                            </a>

                            <a href="about.html#mission">
                                Mission
                            </a>

                            <a href="about.html#goals">
                                Our Goals
                            </a>

                        </div>

                    </div>


                    <div class="nav-dropdown">

                        <button
                            type="button"
                            class="nav-dropdown-toggle"
                        >
                            Tours
                            <span>▼</span>
                        </button>

                        <div class="dropdown-menu">

                            <a href="tours.html#group-tours">
                                Group Tours
                            </a>

                            <a href="tours.html#school-tours">
                                School Tours
                            </a>

                            <a href="tours.html#upcoming-tours">
                                Upcoming Tours
                            </a>

                        </div>

                    </div>


                    <a
                        href="teambuilding.html"
                        class="nav-link"
                    >
                        Team Building
                    </a>


                    <a
                        href="booking.html"
                        class="nav-link"
                    >
                        Bookings
                    </a>


                    <a
                        href="contact.html"
                        class="nav-link"
                    >
                        Contact Us
                    </a>

                </nav>


                <a
                    href="booking.html"
                    class="nav-cta"
                >
                    Plan Your Trip
                    <span>→</span>
                </a>

            </div>

        </header>

    `;

}


/* =========================================================
   FOOTER
========================================================= */

function renderFooter() {

    const footer = document.getElementById("site-footer");

    if (!footer || !siteData) return;

    footer.innerHTML = `

        <footer class="site-footer">

            <div class="container footer-main">

                <div class="footer-brand">

                    <a
                        href="index.html"
                        class="footer-logo"
                    >
                        <img
                            src="./assets/img/logo/logo.png"
                            alt="Ananzi Marketing"
                            style="width=50px"
                        >
                    </a>

                    <p>
                        Travel. Discover. Connect.
                    </p>

                    <p class="footer-description">
                        Creating memorable travel experiences
                        for groups, families, schools and organisations.
                    </p>

                </div>


                <div class="footer-column">

                    <h4>
                        Quick Links
                    </h4>

                    <a href="index.html">
                        Home
                    </a>

                    <a href="about.html">
                        About
                    </a>

                    <a href="tours.html">
                        Tours
                    </a>

                    <a href="teambuilding.html">
                        Team Building
                    </a>

                    <a href="gallery.html">
                        Gallery
                    </a>

                    <a href="booking.html">
                        Bookings
                    </a>

                    <a href="contact.html">
                        Contact
                    </a>

                </div>


                <div class="footer-column">

                    <h4>
                        Office Hours
                    </h4>

                    <div id="footerHours"></div>

                </div>


                <div class="footer-column">

                    <h4>
                        Contact
                    </h4>

                    <a href="tel:+27827072565">
                        ${siteData.site.phone}
                    </a>

                    <a href="tel:+27684174712">
                        ${siteData.site.alternativePhone}
                    </a>

                    <a href="mailto:${siteData.site.email}">
                        ${siteData.site.email}
                    </a>

                    <a
                        href="https://wa.me/${siteData.site.whatsapp}"
                        target="_blank"
                        rel="noopener"
                    >
                        WhatsApp
                    </a>

                </div>

            </div>


            <div class="container footer-bottom">

                <p>
                    © ${new Date().getFullYear()}
                    ${siteData.site.fullName}
                </p>

                <p>
                    Developed & Maintained by
                    <a
                        href="https://icarusdigi.github.io/site/"
                        target="_blank"
                        rel="noopener"
                    >
                        IDM
                    </a>
                </p>

            </div>

        </footer>

    `;


    const footerHours = document.getElementById("footerHours");

    if (footerHours) {

        footerHours.innerHTML = siteData.officeHours
            .map(item => `
                <div class="footer-hours-row">
                    <span>${item.day}</span>
                    <span>${item.hours}</span>
                </div>
            `)
            .join("");

    }

}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const toggle = document.querySelector(".mobile-menu-toggle");
    const nav = document.querySelector(".main-nav");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {

        const active = nav.classList.toggle("open");

        toggle.classList.toggle("active", active);

        toggle.setAttribute(
            "aria-expanded",
            active ? "true" : "false"
        );

    });

}


/* =========================================================
   DROPDOWNS
========================================================= */

function setupDropdowns() {

    document
        .querySelectorAll(".nav-dropdown-toggle")
        .forEach(button => {

            button.addEventListener("click", event => {

                event.stopPropagation();

                const parent = button.parentElement;

                document
                    .querySelectorAll(".nav-dropdown.open")
                    .forEach(dropdown => {

                        if (dropdown !== parent) {
                            dropdown.classList.remove("open");
                        }

                    });

                parent.classList.toggle("open");

            });

        });


    document.addEventListener("click", () => {

        document
            .querySelectorAll(".nav-dropdown.open")
            .forEach(dropdown => {

                dropdown.classList.remove("open");

            });

    });

}


/* =========================================================
   SMOOTH ANCHORS
========================================================= */

function setupSmoothAnchors() {

    document
        .querySelectorAll('a[href*="#"]')
        .forEach(link => {

            link.addEventListener("click", function () {

                const url = new URL(this.href);

                if (
                    url.pathname === window.location.pathname &&
                    url.hash
                ) {

                    const target = document.querySelector(url.hash);

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }

            });

        });

}


/* =========================================================
   EXPERIENCES
========================================================= */

function renderExperiences(filter = "all") {

    const grid = document.getElementById("experienceGrid");

    if (!grid || !siteData) return;

    let items = siteData.experiences;

    if (filter !== "all") {

        items = items.filter(
            item => item.type === filter
        );

    }

    grid.innerHTML = items
        .map(createExperienceCard)
        .join("");

}


/* =========================================================
   EXPERIENCE CARD
========================================================= */

function createExperienceCard(item) {

    const bookingLink =
        `booking.html?item=${encodeURIComponent(item.title)}&type=${encodeURIComponent(item.type)}`;

    return `

        <article class="experience-card">

            <div class="card-image">

                <img
                    src="${item.image}"
                    alt="${item.title}"
                    loading="lazy"
                >

                <span class="card-badge">
                    ${item.badge}
                </span>

            </div>


            <div class="card-content">

                <span class="card-location">
                    ${item.location}
                </span>

                <h3>
                    ${item.title}
                </h3>

                <p>
                    ${item.description}
                </p>


                <div class="card-bottom">

                    <strong>
                        ${item.price}
                    </strong>

                    <div class="card-actions">

                        <a
                            href="${item.link}"
                            class="card-link"
                        >
                            Read More
                        </a>

                        <a
                            href="${bookingLink}"
                            class="card-book"
                        >
                            Book
                        </a>

                    </div>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   FILTERS
========================================================= */

function setupFilters() {

    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                document
                    .querySelectorAll(".filter-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

                renderExperiences(
                    button.dataset.filter
                );

            });

        });

}


/* =========================================================
   HERO EXPLORER
========================================================= */

function setupHeroExplorer() {

    const buttons =
        document.querySelectorAll("[data-quick-filter]");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

        });

    });


    const exploreButton =
        document.getElementById("heroExploreBtn");

    if (!exploreButton) return;

    exploreButton.addEventListener("click", () => {

        const selected =
            document.querySelector(
                "[data-quick-filter].active"
            );

        const filter =
            selected?.dataset.quickFilter || "all";

        renderExperiences(filter);

        document
            .querySelectorAll(".filter-btn")
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.filter === filter
                );

            });

        document
            .getElementById("experiences")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    });

}


/* =========================================================
   WHY FACTS
========================================================= */

function renderWhyFacts() {

    const container =
        document.getElementById("whyFacts");

    if (!container || !siteData) return;

    container.innerHTML =
        siteData.whyFacts
            .map(fact => `

                <div class="feature-fact">

                    <span class="fact-number">
                        ${fact.number}
                    </span>

                    <strong>
                        ${fact.title}
                    </strong>

                    <p>
                        ${fact.text}
                    </p>

                </div>

            `)
            .join("");

}


/* =========================================================
   REVIEWS
========================================================= */

function shuffle(array) {

    return [...array]
        .sort(() => Math.random() - 0.5);

}


function renderReviews() {

    const tourContainer =
        document.getElementById("tourReviews");

    const customerContainer =
        document.getElementById("customerReviews");

    if (!siteData) return;


    if (tourContainer) {

        tourContainer.innerHTML =
            shuffle(siteData.tourReviews)
                .slice(0, 4)
                .map(createReview)
                .join("");

    }


    if (customerContainer) {

        customerContainer.innerHTML =
            shuffle(siteData.customerReviews)
                .slice(0, 4)
                .map(createReview)
                .join("");

    }

}


function createReview(review) {

    const stars =
        "★".repeat(review.rating) +
        "☆".repeat(5 - review.rating);

    return `

        <article class="review-card">

            <div class="review-top">

                <div class="review-avatar">
                    ${review.name.charAt(0)}
                </div>

                <div>

                    <strong>
                        ${review.name}
                    </strong>

                    <span>
                        ${review.location}
                    </span>

                </div>

            </div>

            <div class="review-stars">
                ${stars}
            </div>

            <p>
                "${review.text}"
            </p>

        </article>

    `;

}


/* =========================================================
   ABOUT
========================================================= */

function renderAbout() {

    if (!siteData) return;

    const vision =
        document.getElementById("visionText");

    const mission =
        document.getElementById("missionText");

    if (vision) {
        vision.textContent =
            siteData.about.vision;
    }

    if (mission) {
        mission.textContent =
            siteData.about.mission;
    }


    const goals =
        document.getElementById("goalsGrid");

    if (goals) {

        goals.innerHTML =
            siteData.about.goals
                .map(item => `

                    <article class="goal-card">

                        <span class="goal-number">
                            ${String(
                                siteData.about.goals.indexOf(item) + 1
                            ).padStart(2, "0")}
                        </span>

                        <h3>
                            ${item.title}
                        </h3>

                        <p>
                            ${item.text}
                        </p>

                    </article>

                `)
                .join("");

    }

}


/* =========================================================
   TEAM
========================================================= */

function renderTeam() {

    const grid =
        document.getElementById("teamGrid");

    if (!grid || !siteData) return;

    grid.innerHTML =
        siteData.team
            .map(member => `

                <article class="team-card">

                    <div class="team-image">

                        <img
                            src="${member.image}"
                            alt="${member.name}"
                            loading="lazy"
                        >

                    </div>

                    <div class="team-content">

                        <span>
                            ${member.role}
                        </span>

                        <h3>
                            ${member.name}
                        </h3>

                        <p>
                            ${member.bio}
                        </p>

                    </div>

                </article>

            `)
            .join("");

}


/* =========================================================
   TOURS PAGE
========================================================= */

function renderToursPage() {

    if (!siteData) return;

    const groupGrid =
        document.getElementById("groupToursGrid");

    const schoolGrid =
        document.getElementById("schoolToursGrid");

    const upcomingGrid =
        document.getElementById("upcomingToursGrid");


    const groupTours =
        siteData.experiences.filter(
            item =>
                item.type === "tour" &&
                (
                    item.category === "Group Tours" ||
                    item.category === "Leisure" ||
                    item.category === "International" ||
                    item.category === "Cruises"
                )
        );


    const schoolTours =
        siteData.experiences.filter(
            item =>
                item.category === "School Tours"
        );


    if (groupGrid) {

        groupGrid.innerHTML =
            groupTours
                .map(createCatalogCard)
                .join("");

    }


    if (schoolGrid) {

        schoolGrid.innerHTML =
            schoolTours
                .map(createCatalogCard)
                .join("");

    }


    if (upcomingGrid) {

        upcomingGrid.innerHTML =
            siteData.upcomingTours
                .map(createCatalogCard)
                .join("");

    }

}


function createCatalogCard(item) {

    return `

        <article class="catalog-card">

            <div class="catalog-image">

                <img
                    src="${item.image}"
                    alt="${item.title}"
                    loading="lazy"
                >

                <span>
                    ${item.badge}
                </span>

            </div>


            <div class="catalog-content">

                <small>
                    ${item.location}
                </small>

                <h3>
                    ${item.title}
                </h3>

                ${
                    item.date
                    ? `<div class="tour-date">${item.date}</div>`
                    : ""
                }

                <p>
                    ${item.description}
                </p>


                <div class="catalog-footer">

                    <strong>
                        ${item.price}
                    </strong>

                    <a
                        href="${item.link}"
                        class="text-button"
                    >
                        Explore →
                    </a>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   TEAM BUILDING
========================================================= */

function renderTeamBuilding() {

    const grid =
        document.getElementById("teamBuildingGrid");

    const outcomes =
        document.getElementById("teamOutcomes");

    if (!siteData) return;


    if (grid) {

        const items =
            siteData.experiences.filter(
                item => item.type === "team"
            );

        grid.innerHTML =
            items
                .map(createCatalogCard)
                .join("");

    }


    if (outcomes) {

        outcomes.innerHTML =
            siteData.teamOutcomes
                .map((item, index) => `

                    <article class="goal-card">

                        <span class="goal-number">
                            ${String(index + 1).padStart(2, "0")}
                        </span>

                        <h3>
                            ${item.title}
                        </h3>

                        <p>
                            ${item.text}
                        </p>

                    </article>

                `)
                .join("");

    }

}


/* =========================================================
   TOUR DETAILS
========================================================= */

function renderTourDetails() {

    const container =
        document.getElementById("tourDetails");

    if (!container || !siteData) return;

    const params =
        new URLSearchParams(window.location.search);

    const id =
        params.get("id");

    const allItems = [
        ...siteData.experiences,
        ...siteData.upcomingTours
    ];

    const item =
        allItems.find(
            experience => experience.id === id
        );


    if (!item) {

        container.innerHTML = `

            <section class="page-hero">

                <div class="container page-hero-content">

                    <span class="eyebrow light">
                        ANANZI MARKETING
                    </span>

                    <h1>
                        Experience not found.
                    </h1>

                    <p>
                        The experience you're looking for
                        may have been updated.
                    </p>

                    <a
                        href="tours.html"
                        class="btn btn-gold"
                    >
                        Browse Tours
                    </a>

                </div>

            </section>

        `;

        return;

    }


    document.title =
        `${item.title} | Ananzi Marketing`;


    container.innerHTML = `

        <section
            class="detail-hero"
            style="background-image:
                linear-gradient(
                    90deg,
                    rgba(3,17,30,.88),
                    rgba(3,17,30,.35)
                ),
                url('${item.image}')"
        >

            <div class="container detail-hero-content">

                <span class="eyebrow light">
                    ${item.category}
                </span>

                <h1>
                    ${item.title}
                </h1>

                <p>
                    ${item.location}
                </p>

            </div>

        </section>


        <section class="section">

            <div class="container detail-layout">

                <div class="detail-copy">

                    <span class="eyebrow">
                        EXPERIENCE
                    </span>

                    <h2>
                        ${item.title}
                    </h2>

                    <p class="large-text">
                        ${item.description}
                    </p>

                    <p>
                        ${item.info}
                    </p>

                    <p>
                       Download the full PDF flyer <a href="${item.pdf}" target="_blank"> <strong>HERE.</strong></a>
                    </p>

                    <p>
                        <strong>NOTE:</strong> Feel free to contact Ananzi Marketing for the latest
                        availability, pricing and package information.
                    </p>

                </div>


                <aside class="detail-card">

                    <span>
                        PACKAGE FEE
                    </span>

                    <strong>
                        ${item.price}
                    </strong>

                    <div class="detail-divider"></div>

                    <a
                        href="booking.html?item=${encodeURIComponent(item.title)}&type=${encodeURIComponent(item.type)}"
                        class="btn btn-dark full-button"
                    >
                        Book / Enquire
                        <span>→</span>
                    </a>

                    <a
                        href="https://wa.me/${siteData.site.whatsapp}"
                        class="btn btn-whatsapp full-button"
                        target="_blank"
                        rel="noopener"
                    >
                        WhatsApp Us
                    </a>

                </aside>

            </div>

        </section>

    `;

}


/* =========================================================
   GALLERY
========================================================= */

function renderGallery() {

    const grid =
        document.getElementById("galleryGrid");

    if (!grid || !siteData) return;

    grid.innerHTML =
        siteData.gallery
            .map((item, index) => `

                <figure
                    class="gallery-item
                    gallery-item-${(index % 5) + 1}"
                >

                    <img
                        src="${item.image}"
                        alt="${item.title}"
                        loading="lazy"
                    >

                    <figcaption>

                        <span>
                            ${item.category}
                        </span>

                        <strong>
                            ${item.title}
                        </strong>

                    </figcaption>

                </figure>

            `)
            .join("");

}


/* =========================================================
   AFFILIATIONS
========================================================= */

function renderAffiliations() {

    const row =
        document.getElementById("affiliationRow");

    if (!row || !siteData) return;

    row.innerHTML =
        siteData.affiliations
            .map(item => `

                <div class="affiliation-logo">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        onerror="this.style.display='none';"
                    >

                    <span>
                        ${item.name}
                    </span>

                </div>

            `)
            .join("");

}


/* =========================================================
   OFFICE HOURS
========================================================= */

function renderOfficeHours() {

    const container =
        document.getElementById("officeHours");

    if (!container || !siteData) return;

    container.innerHTML =
        siteData.officeHours
            .map(item => `

                <div class="office-row">

                    <span>
                        ${item.day}
                    </span>

                    <strong>
                        ${item.hours}
                    </strong>

                </div>

            `)
            .join("");

}


/* =========================================================
   SPECIAL
========================================================= */

function renderSpecial() {

    if (!siteData?.special) return;

    const title =
        document.getElementById("specialTitle");

    const description =
        document.getElementById("specialDescription");

    if (title) {
        title.textContent =
            siteData.special.title;
    }

    if (description) {
        description.textContent =
            siteData.special.description;
    }

}


/* =========================================================
   BOOKING FORM
========================================================= */

function setupBookingForm() {

    const form =
        document.getElementById("bookingForm");

    if (!form || !siteData) return;


    const params =
        new URLSearchParams(window.location.search);

    const item =
        params.get("item");

    const type =
        params.get("type");


    if (item) {

        const input =
            document.getElementById("bookingExperience");

        if (input) {
            input.value = item;
        }

    }


    if (type) {

        const select =
            document.getElementById("bookingType");

        if (select) {

            const normalized =
                type.toLowerCase();

            [...select.options].forEach(option => {

                if (
                    option.textContent
                        .toLowerCase()
                        .includes(normalized)
                ) {

                    option.selected = true;

                }

            });

        }

    }


    form.addEventListener("submit", event => {

        event.preventDefault();

        const data =
            new FormData(form);

        const message = [

            `Hello Ananzi Marketing,`,

            ``,

            `I would like to make a booking/enquiry.`,

            ``,

            `Name: ${data.get("name")}`,
            `Email: ${data.get("email")}`,
            `Phone: ${data.get("phone")}`,
            `Travellers: ${data.get("guests")}`,
            `Tour / Service: ${data.get("experience")}`,
            `Preferred Date: ${data.get("date") || "Not specified"}`,
            `Enquiry Type: ${data.get("type")}`,

            ``,

            `Additional Information:`,
            `${data.get("message") || "None"}`

        ].join("\n");


        const url =
            `https://wa.me/${siteData.site.whatsapp}?text=${encodeURIComponent(message)}`;

        window.open(
            url,
            "_blank"
        );

    });

}


/* =========================================================
   CONTACT FORM
========================================================= */

function setupContactForm() {

    const form =
        document.getElementById("contactForm");

    if (!form || !siteData) return;


    form.addEventListener("submit", event => {

        event.preventDefault();


        const name =
            document.getElementById("contactName").value;

        const email =
            document.getElementById("contactEmail").value;

        const phone =
            document.getElementById("contactPhone").value;

        const subject =
            document.getElementById("contactSubject").value;

        const message =
            document.getElementById("contactMessage").value;


        const whatsappMessage = [

            `Hello Ananzi Marketing,`,

            ``,

            `I have a general enquiry.`,

            ``,

            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,

            ``,

            `Subject: ${subject}`,

            ``,

            `Message:`,
            message

        ].join("\n");


        const url =
            `https://wa.me/${siteData.site.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(
            url,
            "_blank"
        );

    });

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    loadSiteData
);