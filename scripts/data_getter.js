async function main()
{
    if (sessionStorage.getItem("all_course_data") == null)
    {
        await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-vbliq/endpoint/courses')
            .then(res => {
                if (res.ok == true)
                {
                    console.log("We got the course data from the data server.");
                }
                else
                {
                    console.log("There was a data server error.");
                }
                return res
            })
            .then(res => res.json())
            .then(data => 
                {
                    sessionStorage.setItem("all_course_data", JSON.stringify(data))
                })
            .catch(error => console.log(error));
        }
    
    window.all_course_data = JSON.parse(sessionStorage.getItem("all_course_data"))

    if (sessionStorage.getItem("all_grant_data") == null)
    {
        await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-vbliq/endpoint/grants')
            .then(res => {
                if (res.ok == true)
                {
                    console.log("We got the grant data from the data server.");
                }
                else
                {
                    console.log("There was a data server error.");
                }
                return res
            })
            .then(res => res.json())
            .then(data => 
                {
                    sessionStorage.setItem("all_grant_data", JSON.stringify(data))
                })
            .catch(error => console.log(error));
        }
    
    window.all_grant_data = JSON.parse(sessionStorage.getItem("all_grant_data"))

    load_page ();
}

main()
