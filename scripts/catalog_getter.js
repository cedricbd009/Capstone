async function main()
{
    if (sessionStorage.getItem("all_catalog_data") == null)
    {
        await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-vbliq/endpoint/catalogs')
            .then(res => {
                if (res.ok == true)
                {
                    console.log("We got the catalog data from the data server.");
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
                    sessionStorage.setItem("all_catalog_data", JSON.stringify(data))
                })
            .catch(error => console.log(error));
        }
    
    window.all_catalog_data = JSON.parse(sessionStorage.getItem("all_catalog_data"))

    load_page ();
}

main()
