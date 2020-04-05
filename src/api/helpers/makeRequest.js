let mainServerUrl = '';

async function makeRequest(url, options = {}, baseUrl = mainServerUrl){
    try{
        let response = await fetch(baseUrl + url, options);
        if(response.ok){
            return response.json();
        }else {
            return response.text().then(function(text){
                throw new Error(text);
            });
        }
    }catch
    (err){
        console.error(err)
    }
}
export default makeRequest;
