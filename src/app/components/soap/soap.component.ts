import { Component, OnInit } from '@angular/core';
import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ConsultasService } from '../../services/consultas.service';
import * as xml2js  from 'xml2js';
import {url1, url2, url3, url4} from '../../../assets/js/host';





@Component({
  selector: 'app-soap',
  templateUrl: './soap.component.html',
  styleUrls: ['./soap.component.css']
})
export class SoapComponent implements OnInit {

url1 = 'https://www.youtube.com/SinacofiWS_CEDU/CEDU0701.asmx?wsdl';
url2 = 'http://www.youtube.com/SINACOFIWSFE/FDOC0103.asmx?wsdl';
url3 = 'https://www.youtube.com/SinacofiWS_SNPV/SNPV1804.asmx?wsdl';
url4 = 'https://www.youtube.com/SinacofiWS_SNPV/SNPV2201.asmx?wsdl';

  constructor(private soap: NgxSoapService, private http: HttpClient, private consulta : ConsultasService) { 
  this.http = http;
  }


parametros;
url;
servicio;
valores;
response;

  servicios = [
{'id': 1 , 'nombre': 'Verificación de identidad mediante preguntas', 'endpoint': `${this.url1}`, 
'parametros': [
"usuario",
"claveUsuario",
"rutCliente",
"numeroSerie",
"canalInstitucion"
]},
{'id': 2, 'nombre': 'Servicio FDOC0103 de www.sinacofi.cl', 'endpoint': `${this.url2}`,
 'parametros': [
   "usuario",
   "clave",
   "rut",
   "idChallenge",
   "pin",
   "documento"
 ]},
{'id': 3, 'nombre': 'Verificación de identidad mediante preguntas(validación de respuestas)', 'endpoint': `${this.url3}`, 
'parametros':[
  "usuario",
  "clave",
  "rut",
  "canalInstitucion",
  "idChallenge",
  "mail",
  "celular",
  "CODIGO_PREGUNTA",
  "CODIGO_RESPUESTA"
]},
{'id': 4, 'nombre': 'Servicio Validación de PIN', 'endpoint': `${this.url4}`, 
'parametros':[
  "usuario",
  "claveUsuario",
  "rutCliente",
  "numeroPin",
  "canalInstitucion",
  "idChallenge"
]}
  ];

  ngOnInit() {
    

  }

  serviceSelect(value:string){
for (let i = 0; i < this.servicios.length; i++) {
  if (this.servicios[i].nombre == value) {
    this.parametros = this.servicios[i].parametros;
this.url = this.servicios[i].endpoint;
console.log(this.parametros);
  }
  
}

this.servicio = value;
 }

 ngSubmit(){
  
  return console.log(this.valores);

}
async enviar(formData:NgForm,){
  console.log(formData.value, 'dataaaa');
if (this.servicio == 'Verificación de identidad mediante preguntas') {
  await this.consulta.verificarPreguntas(formData.value).subscribe(
    res=>{
      console.log(res.toString());
      this.response = res
    },
    async err=>{
      console.log(err.error.text);
      var f;
      await xml2js.parseString(err.error.text, function (err, result) {
            console.log(JSON.stringify(result));
            f = result;
            console.log(err);
            
          });
      
      this.response = JSON.stringify(f, undefined, 4);
    }
  );
}else if (this.servicio == 'Servicio FDOC0103 de www.sinacofi.cl') {
  await this.consulta.servicioSinacofi(formData.value).subscribe(
    res=>{
      console.log(res);
      console.log(res.toString());
      this.response = res
    },
    async err=>{
      console.log(err);
      console.log(err.error.text);
      var f;
      await xml2js.parseString(err.error.text, function (err, result) {
            console.log(JSON.stringify(result));
            f = result;
            console.log(err);
            
          });
      
      this.response = JSON.stringify(f, undefined, 4);
    }
  );
}else if (this.servicio == 'Verificación de identidad mediante preguntas(validación de respuestas)') {
  await this.consulta.verificarIdentidad(formData.value).subscribe(
    res=>{
      console.log(res.toString());
      this.response = res
    },
    async err=>{
      console.log(err.error.text);
      var f;
      await xml2js.parseString(err.error.text, function (err, result) {
            console.log(JSON.stringify(result));
            f = result;
            console.log(err);
            
          });
      
      this.response = JSON.stringify(f, undefined, 4);
    }
  );
}else if (this.servicio == 'Servicio Validación de PIN') {
  await this.consulta.validacionPin(formData.value).subscribe(
    res=>{
      console.log(res.toString());
      this.response = res
    },
    async err=>{
      console.log(err.error.text);
      var f;
      await xml2js.parseString(err.error.text, function (err, result) {
            console.log(JSON.stringify(result));
            f = result;
            console.log(err);
            
          });
      
      this.response = JSON.stringify(f, undefined, 4);
    }
  );
}
  
}


losServicios(servicio, value){
if (servicio == 'Verificación de identidad mediante preguntas') {
  var json = {
    "usuario" : value.usuario,
    "claveUsuario": value.claveUsuario,
    "rutCliente": value.rutCliente,
    "numeroSerie": value.numeroSerie,
    "canalInstitucion": value.canalInstitucion
  }
}else if (servicio == 'Servicio FDOC0103 de www.sinacofi.cl') {
  var json1 = {
    "usuario": value.usuario,
    "clave": value.clave,
    "rut": value.rut,
    "idChallenge": value.idChallenge,
    "pin": value.pin,
    "documento": value.documento
  }
}else if (servicio == 'Verificación de identidad mediante preguntas(validación de respuestas)') {
  var json2 = {
    "usuario": value.usuario,
  "clave": value.clave,
  "rut": value.rut,
  "canalInstitucion": value.canalInstitucion,
  "idChallenge": value.idCahellenge,
  "mail": value.mail,
  "celular": value.celular,
  "CODIGO_PREGUNTA": value.codigo_pregunta,
  "CODIGO_RESPUESTA": value.codigo_respuesta
  }
}else if (servicio == 'Servicio Validación de PIN') {
  var json3 = {
    "usuario": value.usuario,
    "claveUsuario": value.claveUsuario,
    "rutCliente": value.rutCliente,
    "numeroPin": value.numeroPin,
    "canalInstitucion": value.canalInstitucion,
    "idChallenge": value.idChallenge
  }
}
}

resetForm(form1: NgForm){
  if (form1) {
    form1.reset();
  }
}
agregarDatos(form1: NgForm){
  console.log(form1.value);
  }

  servSelect(value:string){
    if (value == 'Verificación de identidad mediante preguntas') {
      this.url1 = url1;
    }else if (value = 'Servicio FDOC0103 de www.sinacofi.cl') {
      this.url2 =  url2;
    }else if (value  == 'Verificación de identidad mediante preguntas(validación de respuestas)'){
     this.url3 = url3;
    }else{
      this.url4 = url4;
    }
    }
}