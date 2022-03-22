// Searches for Active Classrooms
var arraySedeID = [];
var group;

function CLASSES_LIST_Activas() {
  var tiempoInicio = startingFX();
  var ssTest=SpreadsheetApp.getActive().getSheetByName(hojaListaClasesActivas);
   ssTest.activate();
   ssTest.getRange("C1").clearContent();
  var arrTodas=[]; 
  var pageToken, response;
  
  do{
     var optionalArgs = {pageToken: pageToken};     
     response = Classroom.Courses.list(optionalArgs);
     var courses = response.courses;
    // console.log("Courses found: ",courses.length);
    // console.log("COURSES: ",courses);
      
      for (i = 0; i < courses.length; i++) {
        var course = courses[i];
        var title = course.name;
        var ids = course.id;
        var state = course.courseState;  
        var link = course.alternateLink; 
        var room = course.room;     
        
        if (room){ group = room+"@liceobritanico.com";} 
        else (group = "");

       var ss = SpreadsheetApp.getActiveSpreadsheet();
       var sh = ss.getSheetByName(hojaListaClasesActivas); 

       if (title.includes("Central") && state == "ACTIVE") {
         arraySedeID.push([ids, "Central", title, link, group,ids])  
       } else if (title.includes("Adrogue") && state == "ACTIVE") {
         arraySedeID.push([ids, "Adrogue", title, link, group, ids])  
       } else if (title.includes("BNorte") && state == "ACTIVE") {
         arraySedeID.push([ids, "BNorte", title, link, group, ids])  
       } else if (title.includes("Belgrano") && state == "ACTIVE") {
         arraySedeID.push([ids, "Belgrano", title, link, group, ids])  
       } else if (title.includes("VUrquiza") && state == "ACTIVE") {
         arraySedeID.push([ids, "VUrquiza", title, link, group, ids])  
       } else if (title.includes("Boedo") && state == "ACTIVE") {
         arraySedeID.push([ids, "Boedo", title, link, group, ids])  
       } else if (title.includes("Flores") && state == "ACTIVE") {
         arraySedeID.push([ids, "Flores", title, link, group, ids])  
       } else if (title.includes("Hurlingham") && state == "ACTIVE") {
         arraySedeID.push([ids, "Hurlingham", title, link, group, ids])  
       } else if (title.includes("Lanus") && state == "ACTIVE") {
         arraySedeID.push([ids, "Lanus", title, link, group, ids])  
       } else if (title.includes("Martinez") && state == "ACTIVE") {
         arraySedeID.push([ids, "Martinez", title, link, group, ids])  
       } else if (title.includes("Moreno") && state == "ACTIVE") {
         arraySedeID.push([ids, "Moreno", title, link, group, ids])  
       } else if (title.includes("Palomar") && state == "ACTIVE") {
         arraySedeID.push([ids, "Palomar", title, link, group, ids])  
       } else if (title.includes("Quilmes") && state == "ACTIVE") {
         arraySedeID.push([ids, "Quilmes", title, link, group, ids])  
       } else if (title.includes("SanMartin") && state == "ACTIVE") {
         arraySedeID.push([ids, "SanMartin", title, link, group, ids])  
       } else if (title.includes("VCrespo") && state == "ACTIVE") {
         arraySedeID.push([ids, "VCrespo", title, link, group, ids])  
       } else if (title.includes("Virtual") && state == "ACTIVE") {
         arraySedeID.push([ids, "Virtual", title, link, group, ids]) 
       } 

      } 
       pageToken = response.nextPageToken;
  }
  while(pageToken);
 
 // CUANDO QUIERO SOLO LAS ACTIVAS
 //arrActivas = arrTodas.filter(function (r) {return r [8] == "ACTIVE"});  // Filtra solo las Activas, pero multiples columnas
 //sh.getRange(3, 1, arrActivas.length, arrActivas[0].length).setValues(arrActivas);

 console.log("Borrando planilla Columna B4:B"); 
 sh.getRange("B4:B").clearContent(); // Limpia B2:B
 
 console.log("Printing results");
 sh.getRange(4, 1, arraySedeID.length, arraySedeID[0].length).setValues(arraySedeID);
 
 // CUANDO QUIERO TANTO ACTIVAS COMO ARCHIVADAS
 // sh.getRange(3, 1, arrTodas.length, arrTodas[0].length).setValues(arrTodas);

//Escribe el ultimo RUN del script
 var lastRun = "Last Run: "+Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy HH:mm")+" (ESP)"; 
 sh.getRange(2, 2).setValue(lastRun); 
    
  // Calcula los tiempos y Pega el Array con todos los resultados
  var duracion = totalDuration (tiempoInicio)
  sh.getRange("C2").setValue(duracion); 
}
