function STUDENT_ADD (claseId, usuario){
      var nombreFx = "STUDENT_ADD";
      var arrayResultado = [];
      try {
        var agregarAlumnos = Classroom.Courses.Students.create({userId: usuario,}, claseId); 
        var resultado; // Definiendo resultado de la accion
        resultado = "ALUMNO AGREGADO"               
        arrayResultado.push(resultado); 
      }catch(err) {
        Logger.log("Hubo algun tipo de error al intentar agregar al STUDENT a la clase");
        var resultado; // Definiendo resultado de la accion
        resultado = "NO FUE AGREGADO ST."
        
        if (err == "GoogleJsonResponseException: No se ha podido llamar a la API classroom.courses.students.create; error: Requested entity was not found."){
              resultado = "Error: ClassID/Email not found";
        } else if (err == "GoogleJsonResponseException: No se ha podido llamar a la API classroom.courses.students.create; error: Requested entity already exists" || err == "API call to classroom.courses.students.create failed with error: Requested entity already exists"){
              resultado = "ST. YA ESTABA EN LA CLASE";
        } else if (err == "GoogleJsonResponseException: API call to classroom.courses.students.create failed with error: Requested entity already exists"){
              resultado = "ST. YA ESTABA EN LA CLASE";
        }  else if (err == "GoogleJsonResponseException: No se ha podido llamar a la API classroom.courses.students.create; error: Request contains an invalid argument."){
              resultado = "Error: DATO VACIO";
        } else {
            resultado = "Error "+usuario+" suspendido?)";
            }
        arrayResultado.push(resultado);   
          }
     return arrayResultado;
}
        
function TEACHER_ADD (claseId, usuario){
      var nombreFx = "TEACHER_ADD";
      var arrayResultado = [];
      try {
        var agregarAlumnos = Classroom.Courses.Teachers.create({userId: usuario,}, claseId); 
        var resultado; // Definiendo resultado de la accion
        resultado = "DOCENTE AGREGADO"
        arrayResultado.push(resultado); 
      }catch(err) {
        Logger.log("Hubo algun error al intentar agregar al DOCENTE a la clase");
        var resultado; // Definiendo resultado de la accion
        resultado = "NO FUE AGREGADO DOCENTE."
        if (err == "GoogleJsonResponseException: No se ha podido llamar a la API classroom.courses.students.create; error: Requested entity was not found."){
              resultado = "Error: ClassID/Email not found";
        } else if (err == "GoogleJsonResponseException: No se ha podido llamar a la API classroom.courses.students.create; error: Requested entity already exists" || err == "API call to classroom.courses.students.create failed with error: Requested entity already exists"){
              resultado = "DOCENTE YA ESTABA EN LA CLASE";
        } else if (err == "GoogleJsonResponseException: API call to classroom.courses.teachers.create failed with error: Requested entity already exists"){
              resultado = "DOCENTE YA ESTABA EN LA CLASE";
        }  else if (err == "GoogleJsonResponseException: No se ha podido llamar a la API classroom.courses.students.create; error: Request contains an invalid argument."){
              resultado = "Error: DATO VACIO";
        } else {
            resultado = "Error "+usuario+" suspendido?)";
            }
        arrayResultado.push(resultado);   
      }
     return arrayResultado;
}
    