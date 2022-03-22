function createEmailTemplate (htmlCuerpo, asuntoEmail, tipoUsuario, email, classID, sedeCurso, className, classLink, admin, control, resultToPrint, timeStamp, groupResultToPrint){
  console.log('createEmailTemplate', asuntoEmail, email);
    // set the values for the placeholders
  htmlCuerpo.admin = admin;
  htmlCuerpo.email = email;
  htmlCuerpo.classID = classID;
  htmlCuerpo.tipoUsuario = tipoUsuario;
  htmlCuerpo.sedeCurso = sedeCurso;
  htmlCuerpo.className = className;
  htmlCuerpo.classLink = classLink;
  htmlCuerpo.control = control;
  htmlCuerpo.resultToPrint = resultToPrint;
  htmlCuerpo.timeStamp = timeStamp;
  htmlCuerpo.groupResultToPrint = groupResultToPrint;

  // evaluate and get the html
  var email_html = htmlCuerpo.evaluate().getContent();
  
  MailApp.sendEmail({
    to: admin,
    subject: asuntoEmail,
    htmlBody: email_html
  });
}

function sendEmailPermitido(tipoUsuario,email, classID, sedeCurso, className, classLink, admin, control, resultToPrint, timeStamp, groupResultToPrint){
  console.log("sendEmailPermitido Fx")
  var htmlCuerpo = HtmlService.createTemplateFromFile("EmailCreacion");
  var asuntoEmail = "[LCB/Google] Agregar "+tipoUsuario+" "+email+" a Classroom- "
  createEmailTemplate(htmlCuerpo, asuntoEmail, tipoUsuario,email, classID, sedeCurso, className, classLink, admin, control, resultToPrint, timeStamp, groupResultToPrint)
}

function sendEmailSede (tipoUsuario, email, classID, sedeCurso, className, classLink, admin, control, resultToPrint, timeStamp, groupResultToPrint){
  console.log("sendEmailSede Fx")
  var htmlCuerpo = HtmlService.createTemplateFromFile("EmailNoPermitidoSede");
  var asuntoEmail = "[LCB/Google] Fallo agregando "+tipoUsuario+" a gClassroom" 
  createEmailTemplate(htmlCuerpo, asuntoEmail, tipoUsuario,email, classID, sedeCurso, className, classLink, admin, control, resultToPrint, timeStamp, groupResultToPrint)
}

function sendEmailTipo (tipoUsuario, email, classID, sedeCurso, className, classLink, admin, control, resultToPrint, timeStamp, groupResultToPrint){
  console.log("sendEmailTipo Fx")
  var htmlCuerpo = HtmlService.createTemplateFromFile("EmailNoPermitidoTipo");
  var asuntoEmail = "[LCB/Google] Fallo agregando "+tipoUsuario+" a gClassroom" 
  createEmailTemplate(htmlCuerpo, asuntoEmail, tipoUsuario,email, classID, sedeCurso, className, classLink, admin, control, resultToPrint, timeStamp, groupResultToPrint)
}

// Other alternatives

// function enviamosEmailSimple(admin, email, contrasena, ou){
//   var nowTime = new Date();
//   var timeFormateado = Utilities.formatDate(nowTime, 'GMT-3', 'dd/MM/yyyy HH:mm');
//   GmailApp.sendEmail(admin, 'Creación de usuario @lcb.com - '+email ,contrasena, ou +' '+ timeFormateado);
// }

// function enviamosEmailConCuerpo(admin, email, contrasena, ou, nombres, apellidos){
//   var nowTime = new Date();
//   var timeFormateado = Utilities.formatDate(nowTime, 'GMT-3', 'dd/MM/yyyy HH:mm');
//   var asuntoEmail = "Creacion usuario Google - " +email
//   var cuerpoEmail = `Creaste el usuario para `+nombres +` `+apellidos+` 
//                      en la UO: `+ou+" . [Usuario: "+email+"], [Contraseña: "+contrasena+"]";
//   MailApp.sendEmail({
//     to: admin,
//     subject: asuntoEmail,
//     htmlBody: cuerpoEmail
//     })
// }

