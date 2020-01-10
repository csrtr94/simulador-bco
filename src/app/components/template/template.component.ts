import { Component, OnInit } from '@angular/core';

import { ConsultasService } from '../../services/consultas.service';
import { NgForm, FormsModule, FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import {uridev, urihost, uripp} from '../../../assets/js/host';




@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent implements OnInit {

 
  miFormulario : FormGroup;
  
   urihost = 'https://apipp.bancoripley.cl';
  host = this.urihost +'/banco-ripley/product-private';
   devhost = '/dev-banco-ripley/banco-ripley-desarrollo';


  constructor(private consulta: ConsultasService, private fb: FormBuilder) { 

  }
  

 uri;
  apicon = [
    {'id': 1, 'name': 'obtener sucursales / Captación Online', 'endpoint': `${this.host}/sd-branch-location-mgt/v1/branch-location-management/branch-location-management-plan/online`, 
    'parametros': [
      "codigoZona"  ,
      "registroInicial",
      "tamanoPagina",
      "tipoSucursal"
    ]}, 
    {'id': 2, 'name': 'almacenar fecha de pago', 'endpoint': `${this.host}/sd-cust-ref-data-mgt/v1.2.0/customer-reference-data-management/customer-reference-data-directory/updation`,
  'parametros': [
      "codGru",
      "numeroDia"
  ]},
    {'id': 3, 'name': 'FATCA en admisión', 'endpoint': `${this.host}/sd-cust-ref-data-mgt/v1.2.0/management/customer-reference-data-directory/bankrelations/registration`,
     'parametros': [
        "indUSTIN",
            "perCodIndFat",
            "perIndFatSel"

    ]},
    {'id': 4, 'name': 'almacenar datos personales en admisión', 'endpoint': `${this.host}/sd-cust-ref-data-mgt/v1.2.0/customer-reference-data-management/customer-reference-data-directory/associations/registration`, 
    'parametros':[
      
        "areaCel",
        "calle",
        "celular",
        "codNacionalidad",
        "codTipoActividad",
        "comuna",
        "correo",
        "cupoCompras",
        "diaPago",
        "estadoVerif",
        "indDestCorresp",
        "numero",
        "region",
        "resto"
      
    ]},
    {'id': 5, 'name': 'almacenar los datos de CRS', 'endpoint': `${this.host}/sd-cust-ref-data-mgt/v1.2.0/customer-reference-data-management/customer-reference-data-directory/references/registration`,
     'parametros': [
          "codigoMotivo",
          "glosaMotivo",
          "numeroIdentificacion",
          "pais",
          "tipoIdentificacion"
  ]
  },
    {'id': 6, 'name': 'entregar datos personales', 'endpoint': `${this.host}/sd-cust-ref-data-mgt/v1.2.0/customer-reference-data-management/customer-reference-data-directory/associations`,
     'parametros':[
     ]},
    {'id': 7, 'name': 'ejecutar recalculo cupo tarjeta', 'endpoint': `${this.host}/sd-customer-credit-r/v1/customer-credit-rating/customer-credit-rating-measurement/requisition`,
    'parametros':[
      "tipoActividad"
    ]},
    {'id': 8, 'name': 'generar documento / Captación Online', 'endpoint': `${this.host}/sd-document-services/v1/document-services/document-handling-operating-session/verifications/requisition`, 
    'parametros':[
        "idDocumento"
    ]},
    {'id': 9, 'name': 'firmar documentos / Captación Online', 'endpoint': `${this.host}/sd-document-services/v1/document-services/document-handling-operating-session/captures/execution/signature`,
     'parametros':[
      "pin"
     ]},
    {'id': 10, 'name': 'actualizar seguros / Captación Online', 'endpoint': `${this.host}/sd-document-services/v1/document-services/document-handling-operating-session/captures/execution`,
    'parametros':[

        "checkSeleccion",
        "codigoSeguro"

    ]},
    {'id': 11, 'name': 'lista de documentos / Captación Online', 'endpoint': `${this.host}/sd-document-services/v1/document-services/document-handling-operating-session/captures`,
     'parametros':[
     ]},
    {'id': 12, 'name': 'listar comunas / Captación Online', 'endpoint': `${this.host}/sd-public-ref-data-mgt/v1.2.0/public-reference-data-management/global-standard-specification/commune`,
    'parametros':[
      "codApp",
      "codModulo",
      "codRegion"
    ]},
    {'id': 13, 'name': 'listar regiones / Captación Online', 'endpoint': `${this.host}/sd-public-ref-data-mgt/v1.2.0/public-reference-data-management/global-standard-specification/region`,
    'parametros':[
      "codApp",
      "codModulo"
    ]},
    {'id': 14, 'name': 'listar nacionalidades / Captación Online', 'endpoint': `${this.host}/sd-public-ref-data-mgt/v1.2.0/public-reference-data-management/global-standard-specification/nationality`,
    'parametros':[
      "codApp",
      "codModulo"
    ]},
    {'id': 15, 'name': 'listar tipos de documentos / Captación Online', 'endpoint': `${this.host}/sd-public-ref-data-mgt/v1.2.0/public-reference-data-management/global-standard-specification/document-type` },
    {'id': 16, 'name': 'listar residencia / Captación Online', 'endpoint': `${this.host}/sd-public-ref-data-mgt/v1.2.0/public-reference-data-management/global-standard-specification/residence`},
    {'id': 17, 'name': 'listar motivo CRS / Captación Online', 'endpoint': `${this.host}/sd-public-ref-data-mgt/v1.2.0/public-reference-data-management/global-standard-specification/reason`},
    {'id': 18, 'name': 'listar días de pago / Captación Online', 'endpoint': `${this.host}/sd-public-ref-data-mgt/v1.2.0/public-reference-data-management/global-standard-specification/pay-day`},
    {'id': 19, 'name': 'aceptar ofertas', 'endpoint': `${this.host}/sd-cust-campaign-mgt/v1.1.0/customer-campaign-management/customer-campaign-portfolio-management-plan/execution`,
     'parametros':[
      "codCanal",
      "rutCliente",
          "nombreProducto",
          "codigoOferta",
          "codProducto"
    
  ]},
    {'id': 20, 'name': 'buscar ofertas', 'endpoint': `${this.host}/sd-cust-campaign-mgt/v1.1.0/customer-campaign-management/customer-campaign-portfolio-management-plan`,
    'parametros':[
        "rutCliente",
        "numeroTelefono",
        "emailCliente",
        "codCanal"
    ]},
    {'id': 21, 'name': 'activar tarjeta de debito', 'endpoint': `${this.host}/sd-issued-device-adm/v1.1.0/issued-device-administration/issued-device-allocation/updation/activation?`,
    'parametros':[
      "request"
    ]},
    {'id': 22, 'name': 'valida preguntas de verificación', 'endpoint': `${this.host}/sd-transaction-auth/v1.4.0/transaction-authorization/interactive-transaction-assessment/authorization?`,
    'parametros':[
      "idChallenge",
      "nroSerie",
          "codigoPregunta",
          "codigoRespuesta"
    ]},
    {'id': 23, 'name': 'entrega preguntas para auntenticación', 'endpoint': `${this.host}/sd-transaction-auth/v1.4.0/transaction-authorization/interactive-transaction-assessment/question?`,
     'parametros':[
      "numeroSerie"
     ]},
     {'id': 24, 'name': 'listado rango rentas', 'endpoint': `${this.host}/sd-party-data-manage/v1.1.0/party-data-management/income-statement`},
     {'id': 25, 'name': 'guardar documento de acreditación', 'endpoint': `${this.host}/sd-document-services/v1.3.0/document-services/accreditation/document-directory-entry/registration`,
     'parametros':[
      "imageData",
      "extension"
     ]}
  ];


response;
parametros; 
valores;
api;
token;
Xsession;

ngOnInit() {
  
  this.consulta.obtenerToken().subscribe(
    res => {
      this.token = res;
      this.token = this.token.access_token;
    },
    err=>{console.log(err);}
  );

  this.consulta.obtenerXsession().subscribe(
    res =>{
      this.Xsession = res;
      this.Xsession = this.Xsession.sesionToken;
      console.log(res, 'hola');
    },
    err => {console.log(err);}
  )
 
}
/* onClickSubmit(formData) {
  console.log('El parametro es : ' + formData.param);
  
} */
ngSubmit(){
  
  return console.log(this.valores);

}


async enviar(formData:NgForm){
  console.log(formData.value);

  let json = await this.lasAPis(this.api, formData.value);

  //son = json== undefined ? '': json;
  console.log(json, "aaaaaaaaaaaaaaaaaaaa");
  await this.consulta.obtenerToken().subscribe(
    res => {
      this.token = res;
      this.token = this.token.access_token;
    },
    err=>{console.log(err);}
  );

  console.log(this.token, "el tokeeenn!!!!!!!!!!!!!");
  
  await this.consulta.Consultas(this.uri, json, this.token).subscribe(
    res =>{
      
      this.response = JSON.stringify(res, undefined, 4);
      console.log(this.response);
    },
    err =>{
      this.response = JSON.stringify(err);
      this.response = JSON.parse(this.response);
      this.response = JSON.stringify(this.response.error);
      console.log(this.response.error);
    }
    )
}
lasAPis(api, value){

  console.log(value);
  if ( api == 'obtener sucursales / Captación Online') {
    var json = {
      "codigoZona": value.codigoZona,
      "registroInicial": value.registroInicial,
      "tamanoPagina": value.tamanoPagina,
      "tipoSucursal": value.tipoSucursal
    }
    return json;

  }else if(api == 'almacenar fecha de pago'){
    var json1 = {
      "codGru": value.codGru,
      "numeroDia": value.numeroDia
}
return json1;
  }else if (api == 'FATCA en admisión') {
    var json2 = {
      "indUSTIN": value.indUSTIN,
        "registrosFatca": [
          {
            "perCodIndFat": value.perCodIndFat,
            "perIndFatSel": value.perIndFatSel
          }
        ] 
    }
    return json2;

  }else if (api == 'almacenar datos personales en admisión') {
    var json3 = {
      "areaCel": value.areaCel,
      "calle": value.calle,
      "celular": value.celular,
      "codNacionalidad": value.codNacionalidad,
      "codTipoActividad": value.codTipoActividad,
      "comuna": value.comuna,
      "correo": value.correo,
      "cupoCompras": value.cupoCompras,
      "diaPago": value.diaPago,
      "estadoVerif": value.estadoVerif,
      "indDestCorresp": value.inDestCorresp,
      "numero": value.numero,
      "region": value.region,
      "resto": value.resto
    }
    return json3;
  }else if (api == 'almacenar los datos de CRS') {
    var json4 = {
      "registros": [
        {
          "codigoMotivo": value.codigoMotivo,
          "glosaMotivo": value.glosaMotivo,
          "numeroIdentificacion": value.numeroIdentificacion,
          "pais": value.pais,
          "tipoIdentificacion": value.tipoIdentificacion
        }
      ]
    }
    return json4;
  }else if (api == 'entregar datos personales') {
    var json5={
      
    }
  }else if (api == 'ejecutar recalculo cupo tarjeta') {
    var json6 = {
      "tipoActividad": value.tipoActividad
    }
    return json6;
  }else if (api == 'generar documentos / Captación Online' ) {
    var json7 = {
      "idDocumento": value.idDocumento
    }
    return json7;
  }else if (api == 'firmar documentos / Captación Online') {
    var json8 = {
      "pin": value.pin
    }
    return json8;
  }else if (api == 'actualizar seguros / Captación Online' ) {
    var json9 = {
      "seguros": {
        "checkSeleccion": value.checkSeleccion,
        "codigoSeguro": value.codigoSeguro
      }
    }
    return json9;
    
  }else if (api == 'lista de documentos / Captación Online') {
    var json10 = {
     
    }
  }else if (api == 'listar comunas / Captación Online' ) {
    var json11 = {
      "codApp": value.codApp,
      "codModulo": value.codModulo,
      "codRegion": value.codRegion
    }
    return json11;
  }else if (api == 'listar regiones / Captación Online' ) {
    var json12 = {
      "codApp": value.codApp,
      "codModulo": value.codModulo
    }
    return json12;
  }else if (api == 'listar nacionalidades / Captación Online' ) {
    var json12 ={
      "codApp": value.codApp,
      "codModulo": value.codModulo
    }
    return json12;
  }else if (api == 'listar tipos de documentos / Captación Online') {
    
  }else if (api == 'listar residencia / Captación Online') {
    
  }else if (api == 'listar motivo CRS / Captación Online') {
    return {};
    
  }else if (api == 'listar días de pago / Captación Online') {
    
  }else if (api == 'aceptar ofertas') {
    var json13 = {
      "codCanal": value.codCanal,
      "rutCliente": value.rutCliente,
      "ofertas": [
        {
          "nombreProducto": value.nombreProducto,
          "codigoOferta": value.codigoOferta,
          "codProducto": value.codProducto
        }
      ]
    }
    return json13;
  }else if (api == 'buscar ofertas') {
    var json14 = {
      "rutCliente": value.rutCliente,
        "numeroTelefono": value.numeroTelefono,
        "emailCliente": value.emailCliente,
        "codCanal": value.codCanal
    }
    return json14;
  }else if (api == 'activar tarjeta de debito') {
    var json15 = {
      'X-session': this.Xsession,
      "request": value.request
    }
    return json15;
  }else if (api == 'valida preguntas de verificación') {
    var json16={
      "idChallenge": value.idChallenge,
      "nroSerie": value.nroSerie,
      "respuestas": [
        {
          "codigoPregunta": value.codigoPregunta,
          "codigoRespuesta": value.codigoRespuesta
        }
      ]
    }
    return json16;
  }else if (api == 'entrega preguntas para auntenticación') {
    var json17 = {
      "numeroSerie": value.numeroSerie
    }
  }else if (api == 'listado rango rentas') {
    
  }else if (api == 'guardar documento de acreditación') {
    var json18 = {
      "imageData": value.imageData,
      "extension": value.extension
    }
  }

}

ambSelec(value:string){
if (value == 'Pre-producción') {
  this.urihost = urihost;
}else if (value = 'Dev') {
  this.urihost =  uridev;
}else{
 this.urihost = uripp;
}
}

apiSelect(value:string){
  console.log(value);

    for (let i = 0; i < this.apicon.length; i++) {

      if (this.apicon[i].name == value) {
        this.parametros = this.apicon[i].parametros;
        this.uri = this.apicon[i].endpoint;
        console.log(this.parametros);
      }
    }
    console.log(this.uri, 'la uriiiiiii');

    this.api = value;

}

resetForm(form: NgForm){
if (form) {
  form.reset();
}

}

agregarDatos(form: NgForm){
console.log(form.value);
}

}


