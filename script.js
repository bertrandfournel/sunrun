/*
Auteur / Author : Bertrand Fournel
Github : https://github.com/bertrandfournel
Script écrit le 24 mars 2020 (durant le confinement à cause du covid-19), au fait, je recherche un travail comme développeur.
Written the 24th march 2020 (during the containment due to covid-19) and I'm looking for job :)

*/



window.onload = function(){
    var sun = document.getElementById("sun");
    var text = document.getElementById("text");
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.arc(150, 150, 100, 0, 2 * Math.PI, true);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();

     
    
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
        // On convertit en chaîne de caratères l'heure du lever de soleil d'aujourd'hui
        let sunriseStrToday = timesToday.sunrise.getHours() + ' h ' + timesToday.sunrise.getMinutes();
        // On convertit en chaîne de caratères l'heure du coucher de soleil d'aujourd'hui
        let sunsetStrToday = timesToday.sunset.getHours() + ' h ' + timesToday.sunset.getMinutes();
        

        // On injecte les données pour demain en fonction de la position du l'utilisateur
        let timesTomorrow = SunCalc.getTimes(nowTime, lat, long);
        // On convertit en chaîne de caractères l'heure du lever de soleil de demain
        let sunriseStrTomorrow = timesTomorrow.sunrise.getHours() + ' h ' + timesTomorrow.sunrise.getMinutes();
        
        
        
        // Maintenant on cherche à placer le soleil sur le graphique, d'abord on convertit le temps entre le lever et le couché en minutes
        

        let totalMinutes = ((timesToday.sunset.getHours() - timesToday.sunrise.getHours()) * 60) + (timesToday.sunset.getMinutes() - timesToday.sunrise.getMinutes());

        // On cherche maitenant le nombre de minutes depuis le lever jusqu'à maintenant
        let minutesSinceSunrise = ((nowTime.getHours() - timesToday.sunrise.getHours()) * 60) + (nowTime.getMinutes() - timesToday.sunrise.getMinutes());
        
        // On récupère le coefficient qui décrit le rapport entre le durée totale du jour et la durée depuis le lever du soleil
        if (minutesSinceSunrise == 0){
            minutesSinceSunrise = 1; //On rajoute une minute pour éviter l'erreur de la division par zéro, l'écart sera négligeable.
        }
        let coeff =  minutesSinceSunrise / totalMinutes; // ou minutesSinceSunrise/ totalMinutes
        console.log(totalMinutes)
        console.log(minutesSinceSunrise)
        console.log(coeff)
 
        //On défini les positions du soleil avec le coefficient obtenu et un peu de trigonométrie, en se basant sur le canvas SVG.
        if (coeff == 0){
            coeff = 0.0001;
        }

        /* autre solution mais pas opérationelle
        let posXSun = 50+(200*coeff) //125 + (-(Math.cos(Math.PI/coeff))) * 125;
        let posYSun = 150 - ((Math.sin(Math.PI/coeff))* 150);
        */
        
        // Enfin, on met en forme avec les valeurs obtenues
        ctx.beginPath();
        ctx.translate(150,150);
        ctx.rotate(Math.PI*coeff)
        ctx.arc(-100, 0, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        
        
        // Dernière étape, il faut trouver le temps restant avant le coucher du soleil
        // Trouver le temps restant en minutes :
        let timeRemainingStr = "";
        let minutesRemaining = totalMinutes - minutesSinceSunrise;
        // Puis Convertir et mettre en forme la phrase de conclusion:
        if (minutesRemaining > 60){
            if (minutesRemaining % 60 == 0){
                timeRemainingStr = "Il reste " + (minutesRemaining / 60) + " minutes de soleil."
            }else if(minutesRemaining < 120){
                timeRemainingStr = "Il reste " + (Math.round(minutesRemaining / 60)) + " heure et " +(minutesRemaining % 60) + " minutes de soleil."
            }else{
                timeRemainingStr = "Il reste " + (Math.round(minutesRemaining / 60)) + " heures et " +(minutesRemaining % 60) + " minutes de soleil."
            }
        }else if(minutesRemaining == 60){
            timeRemainingStr = "Il reste 1 heure de soleil.";
        }else if(minutesRemaining < 60 && minutesRemaining > 0){
            if(minutesRemaining == 1){
                timeRemainingStr = "Il reste 1 minute de soleil."
            } else {
                timeRemainingStr = "Il reste " + minutesRemaining + " minutes de soleil."
            }
        }else{
            timeRemainingStr = "Le soleil est déjà couché."
        }
        text.innerHTML = "Il est " + nowTimeStr + ", aujourd'hui, le soleil se lève à " + sunriseStrToday +" et se couche à " + sunsetStrToday + ". " + timeRemainingStr;
    }

    function error(err){
        text.innerHTML = "Vous n'autorisez pas la géolocalisation... C'est pas très grave, mais c'est un peu dommage...";
    }

}