function main()
{
    document.getElementById("banner_container").innerHTML = `
    <img class=\"page_image\" src=\"resources/ksu_banner.png\" alt=\"KSU Banner\">
    <p class=\"page_title_text\">IT Curriculum Portal</p>
    <div>
        <div class=\"list_tabs\">
            <a href=\"./index.html\">
                <button id=\"desc_info\" class=\"page_button\">Course List</button>
            </a>
            <a href=\"./Description.html\">
                <button id=\"desc_info\" class=\"page_button\">Course Description</button>
            </a>
            <a href=\"./Schedule.html\">
                <button id=\"sched_info\" class=\"page_button\">Permanent Schedule</button>
            </a>
            <a href=\"./Coordinator.html\">
                <button id=\"coord_info\" class=\"page_button\">Course Coordinator </button>
            </a>
            <a href=\"./ALG.html\">
                <button id=\"alg_info\" class=\"page_button\">ALG Information</button>
            </a>
        </div>
    </div>`;
}

main();