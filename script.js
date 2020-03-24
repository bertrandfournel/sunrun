window.onload = function(){
    var sun = document.getElementById("sun");
    var text = document.getElementById("text");
    
    
    
    
    console.log("hello");


    let nowTime = new Date();
    // On récupère le timestamp d'aujourd'hui en format number
    let timestampNow = Date.parse(nowTime);

    // On récupère le timestamp de demain en ajoutant les millisecondes d'un jour (en format number)
    let timestampTomorrow = timestampNow + (60 * 60 * 24 * 1000);

    // On injecte le timestamp de demain dans un objet Date
    let tomorrowTime = new Date(timestampTomorrow);

    // On convertit l'heure de maintenant en chaîne de caractères
    let nowTimeStr = nowTime.getHours() + ' h ' + nowTime.getMinutes();
    


    
    
    


    navigator.geolocation.getCurrentPosition(success, error);
    function success(pos){
        let lat = pos.coords.latitude;
        let long = pos.coords.longitude;

        // On injecte les données pour maintenant en fonction de la position du l'utilisateur
        let timesToday = SunCalc.getTimes(nowTime, lat, long);
        // On convertit en chaîne de caratères l'heure du coucher de soleil d'aujourd'hui
        let sunsetStr = timesToday.sunset.getHours() + ' h ' + timesToday.sunset.getMinutes();
        

        // On injecte les données pour demain en fonction de la position du l'utilisateur
        let timesTomorrow = SunCalc.getTimes(nowTime, lat, long);
        // On convertit en chaîne de caratères l'heure du lever de soleil de demain
        let sunriseStr = timesTomorrow.sunrise.getHours() + ' h ' + timesTomorrow.sunrise.getMinutes();
        console.log(timesToday);
    }

    function error(err){
        sun.setAttribute("fill", "transparent");
        text.innerHTML = "Vous n'autorisez pas la géolocalisation... C'est pas très grave, mais c'est un peu dommage...";
    }

    
    

    

    
    

}