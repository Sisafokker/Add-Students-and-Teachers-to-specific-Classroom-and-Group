function addGroupMember(userEmail,groupEmail, defineRole, tipoUsuario) {
  var arrayResultado = [];
  Logger.log("addGroupMember Fx")
  var member = {
    email: userEmail,
    role: defineRole,
  };
  try {
      member = AdminDirectory.Members.insert(member, groupEmail);
      Logger.log("User %s added as a member of group %s.", userEmail, groupEmail);
    // Logger.log(member);
      var resultado; // Definiendo resultado de la accion
      resultado = tipoUsuario+" AGREGADO AL GRUPO"
      arrayResultado.push(resultado); 
  }catch(err) {
        Logger.log("Grupos: Hubo algun tipo de error al intentar agregar al usuario a la clase");
        var resultado; // Definiendo resultado de la accion
        resultado = tipoUsuario+" NO FUE AGREGADO AL GRUPO."
        if (err == "GoogleJsonResponseException: API call to directory.members.insert failed with error: Member already exists."){
              resultado = tipoUsuario+" YA ES PARTE DEL GRUPO DE GOOGLE";
        }  else if (err == "GoogleJsonResponseException: No se ha podido llamar a la API classroom.courses.students.create; error: Request contains an invalid argument."){
              resultado = "Error: DATO VACIO";
        } else {
            resultado = "Error "+userEmail+" suspendido???";
            }
        arrayResultado.push(resultado);   
      }
     return arrayResultado;
}