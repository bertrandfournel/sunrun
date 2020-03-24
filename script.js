window.onload = function(){
    var sun = document.getElementById("sun");
    
    
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
    let nowTimeHoursStr = nowTime.getHours()
    let nowTimeMinutesStr = nowTime.getMinutes()

    // On injecte les données pour maintenant en fonction de la position du l'utilisateur
    let timesToday;


    // On injecte les données pour demain en fonction de la position du l'utilisateur
    let timesTomorrow;


    // On convertit en chaîne de caratères l'heure du coucher de soleil d'aujourd'hui
    let sunsetStr;
    sunsetStr = timesToday.sunset.getHours() + ' h ' + timesToday.sunset.getMinutes();

    // On convertit en chaîne de caratères l'heure du lever de soleil de demain
    let sunriseStr;
    sunriseStr = timesTomorrow.sunrise.getHours() + ' h ' + timesTomorrow.sunrise.getMinutes();
    let lat;
    let long;
    


    navigator.geolocation.getCurrentPosition(success);
    function success(pos){
        lat = pos.coords.latitude;
        long = pos.coords.longitude;
        timesToday = SunCalc.getTimes(nowTime, lat, long);
        timesTomorrow = SunCalc.getTimes(tomorrowTime, lat, long);
        sunsetStr = timesToday.sunset.getHours() + ' h ' + timesToday.sunset.getMinutes();
        sunriseStr = timesTomorrow.sunrise.getHours() + ' h ' + timesTomorrow.sunrise.getMinutes();
    }
    

    

    
    */

}