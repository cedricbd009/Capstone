function main()
{
    document.getElementById("banner_container").innerHTML = `
    <img class=\"page_image\" src=\"resources/ksu_banner.png\" alt=\"KSU Banner\">
    <p class=\"page_title bold list_pargraph_no_break\">IT Curriculum Portal</p>
    <div class=\"banner_tabs\">
        <a href=\"./index.html\" class=\"page_button center_text\">
            Course List
        </a>
        <a href=\"./Description.html\" class=\"page_button center_text\">
            Course Description
        </a>
        <a href=\"./Schedule.html\" class=\"page_button center_text\">
            Permanent Schedule
        </a>
        <a href=\"./Coordinator.html\" class=\"page_button center_text\">
            Course Coordinator
        </a>
        <a href=\"./ALG.html\" class=\"page_button center_text\">
            ALG Information
        </a>
        <a href=\"./Curriculum.html\" class=\"page_button center_text\">
            Curriculum Resources
        </a>
        <a href=\"./Flowchart.html\" class=\"page_button center_text\">
            MSIT Flowchart
        </a>
    </div>`;
}

main();