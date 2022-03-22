var hojaListaClasesActivas = "ArrayClases"

function getDataforClassroom (){
      var ssSheet=SpreadsheetApp.getActive().getSheetByName("AGREGAR USUARIOS");
      var resultToPrint;
      var todaInfo = ssSheet.getRange("A4:V").getValues(); // Captura todo
      var infoPorProcesar = todaInfo.filter(function (r) {return r [0] !== "" && r [12] !== "" && r [15] !== "" && r [16] == "" && r [18] !== ""}); // Filtra solo lo que quiero
    console.log(infoPorProcesar);

        var datos = infoPorProcesar[0] // Solo agarramos uno a la vez
       console.log(datos)
        
        var tipoUsuario = datos[0];
        var email = datos[1];
        var classID = datos[6];
        var sedeCurso = datos[7];
        var className = datos[10];
        var classLink = datos[11];
        var admin = datos [12];
        var emailGrupo = datos [13];
        var fecha = datos [14];
        var timeStamp = cambioHora (fecha)
        var fila = datos[15];
        var control = datos[18];
        var colResultadoGrupos = 18 // Col de Sheets... arranca de 1 no de 0
        var colResultadoClassroom = 17 // Col de Sheets... arranca de 1 no de 0
              
      console.log(timeStamp);
      console.log(control);
  if (control === "PERMITIDO"){
   console.log("Permitido: Agregamos al ",tipoUsuario," a la clase")
      
      try {
        if(tipoUsuario === "ALUMNO"){
         console.log("Agregamos al ALUMNO");
         resultToPrint = STUDENT_ADD(classID, email);
         groupResultToPrint = addGroupMember(email,emailGrupo, "MEMBER", tipoUsuario);
        } else {
         console.log("Agregamos al DOCENTE");
          resultToPrint = TEACHER_ADD(classID, email);
          groupResultToPrint = addGroupMember(email,emailGrupo, "MANAGER", tipoUsuario);
        }
      ssSheet.getRange(fila,colResultadoClassroom).setValue(resultToPrint);  
      ssSheet.getRange(fila,colResultadoGrupos).setValue(groupResultToPrint);  
      sendEmailPermitido(tipoUsuario, email, classID, sedeCurso, className, classLink, admin, control, resultToPrint, timeStamp, groupResultToPrint);
      } 
      catch  (err){
        console.log(err);
         if (err == "GoogleJsonResponseException: API call to classroom.courses.students.create failed with error: Requested entity already exists"){
           resultToPrint = "El alumno "+email+" ya estaba en la clase." 
          console.log("1: "+resultToPrint)
         }
         if (err == "GoogleJsonResponseException: API call to classroom.courses.teachers.create failed with error: Requested entity already exists"){
           resultToPrint = "El docente "+email+" ya estaba en la clase." 
          console.log("2: "+resultToPrint)
         }
      ssSheet.getRange(fila,colResultadoClassroom).setValue(err);  
      sendEmailSede(tipoUsuario, email, classID, sedeCurso, className, classLink, admin, control, resultToPrint, timeStamp, groupResultToPrint);;
      }
      
    } 
    else if (control === "SIN PERMISOS - SEDE"){
     console.log("SIN PERMISOS PARA ESTA SEDE: No creamos nada. Solo enviamos email")
      resultToPrint = "SIN PERMISOS PARA CURSOS DE SEDE "+sedeCurso;
      ssSheet.getRange(fila,colResultadoClassroom).setValue(resultToPrint);
      ssSheet.getRange(fila,colResultadoGrupos).setValue(groupResultToPrint);    
      sendEmailSede(tipoUsuario, email, classID, sedeCurso, className, classLink, admin, control, resultToPrint, timeStamp, groupResultToPrint);
    } 
    else if (control === "SIN PERMISOS - TIPO"){
     console.log("SIN PERMISOS PARA ESTE TIPO DE USUARIO: No creamos nada. Solo enviamos email")
      if(tipoUsuario === "ALUMNO"){
          resultToPrint = "NO TIENE PERMISOS para agregar ALUMNOS";
        } else {
          resultToPrint = "NO TIENE PERMISOS para agregar DOCENTES";
        }
      ssSheet.getRange(fila,colResultadoClassroom).setValue(resultToPrint);  
      ssSheet.getRange(fila,colResultadoGrupos).setValue(groupResultToPrint);  
      sendEmailTipo(tipoUsuario, email, classID, sedeCurso, className, classLink, admin, control, resultToPrint, timeStamp, groupResultToPrint);
    }
}
