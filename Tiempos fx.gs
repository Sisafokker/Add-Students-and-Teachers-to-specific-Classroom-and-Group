function startingFX (){
  Logger.log("Runs startingFX()")
  var comienzo = new Date();
  var startTime= Utilities.formatDate(comienzo, "GMT+1", 'dd-MM-yyyy HH:mm:ss.SSS')
  Logger.log(comienzo);
  Logger.log(startTime);
  return comienzo
}

function finishingFX (){
  Logger.log("Runs finishingFX()")
  var fin = new Date();
  var endTime= Utilities.formatDate(fin, "GMT+1", 'dd-MM-yyyy HH:mm:ss.SSS')
  Logger.log(fin);
  Logger.log(endTime)
  return fin
}

function totalDuration (tiempoInicio){
  Logger.log("Runs totalDuration()")
    var tiempoFin = finishingFX();
    var diferencia = (tiempoFin - tiempoInicio) 
    var duracion = msToTime(diferencia) // Convierte a formato lejible
    return duracion
}


// Convierte milesimas de segundo en formato lejible
function msToTime(ms) {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (seconds < 60) return seconds + " Sec";
  else if (minutes < 60) return minutes + " Min";
  else if (hours < 24) return hours + " Hrs";
  else return days + " Days"
}


function cambioHora (fecha){
  Logger.log("cambioHoraFX()")
  var newFecha= Utilities.formatDate(fecha, "GMT-3", 'dd-MM-yyyy HH:mm')
  Logger.log(fecha);
  Logger.log(newFecha);
  return newFecha
}
 