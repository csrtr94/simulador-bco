import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient) { }

  uritoken = 'https://apipp.bancoripley.cl/banco-ripley/product-private/oidc-ripley/oauth2/token';
  urisesion = '/COServices/CaptacionOnlineService/aceptar';

  uriserv1 = '/SinacofiWS_CEDU/CEDU0701.asmx';
  uriserv2 = '/SINACOFIWSFE/FDOC0103.asmx';
  uriserv3 = '/SinacofiWS_SNPV/SNPV1804.asmx';
  uriserv4= '/SinacofiWS_SNPV/SNPV2201.asmx';
  
  token;

  Consultas(uri, input, token){
    console.log(input, uri, 'ooooooooooo');

    const httpOptions = {
        headers : new HttpHeaders ({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   ,
          'X-IBM-Client-Id': 'f47feeaca52fa3a249d8657f2aa92f9d' ,
          'X-IBM-Client-Secret': 'ecd96d096d3b79c7e6ab5d6a3940c420'
        })
    }

    return this.http.post(uri, input, httpOptions);
  }

obtenerToken(){
  const a = {headers : new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
   const body = new HttpParams().set('grant_type', 'client_credentials').set('scope', 'scope1')
   .set('client_id', 'f47feeaca52fa3a249d8657f2aa92f9d').set('client_secret', 'ecd96d096d3b79c7e6ab5d6a3940c420');
   //{
  //   'grant_type': 'client_credentials',
  //   'scope': 'scope1',
  //   'client_id': 'f47feeaca52fa3a249d8657f2aa92f9d',
  //   'client_secret': 'ecd96d096d3b79c7e6ab5d6a3940c420'
  // }
  return this.http.post(this.uritoken, body, a);

  }

  obtenerXsession(){
    const x = {headers : new HttpHeaders({'Content-Type': 'application/json', 'apiKey':'e9fvr1obUqCMTdzsRdLurBgBKMmntlzo'})};
    let body ={
      "rutCliente":"17739045",
      "ofertas":[137157409],
      "codCanal":"2"
    }

    return this.http.post(this.urisesion, body, x);
  }

  verificarPreguntas(data){
    console.log(data, 'dataaaaaaaaaa');
    const y = {headers :  new HttpHeaders({'Content-Type': 'text/xml;charset=UTF-8', 'SOAPAction': 'http://sinacofi.cl/WebServices/Consulta'})};
    let body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://sinacofi.cl/WebServices">
    <soapenv:Header/>
    <soapenv:Body>
       <web:Consulta>
          <web:usuario>${data.usuario || ''}</web:usuario>
          <web:claveUsuario>${data.claveUsuario || ''}</web:claveUsuario>
          <web:rutCliente>${data.rutCliente || ''}</web:rutCliente>
          <web:numeroSerie>${data.numeroSerie || ''}</web:numeroSerie>
          <web:canalInstitucion>${data.canalInstitucion || ''}</web:canalInstitucion>
       </web:Consulta>
    </soapenv:Body>
 </soapenv:Envelope>`;

 return this.http.post(this.uriserv1, body, y);
  }

  servicioSinacofi(data){
    const x = {headers : new HttpHeaders({'Content-Type': 'text/xml;charset=UTF-8', 'SOAPAction': 'http://sinacofi.cl/FirmaDocumento'})};
    let body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sin="http://sinacofi.cl/">
    <soapenv:Header/>
    <soapenv:Body>
       <sin:FirmaDocumento>
          <sin:usuario>${data.usuario || ''}</sin:usuario>
          <sin:clave>${data.clave || ''}</sin:clave>
          <sin:rut>${data.rut || ''}</sin:rut>
          <sin:idChallenge>${data.idChallenge || ''}</sin:idChallenge>
          <sin:pin>${data.pin || ''}</sin:pin>
          <sin:documento>${data.documento || ''}</sin:documento>
       </sin:FirmaDocumento>
    </soapenv:Body>
 </soapenv:Envelope>`;
 return this.http.post(this.uriserv2, body, x);
  }

verificarIdentidad(data){
  const z = {headers : new HttpHeaders({'Content-Type': 'text/xml', 'SOAPAction': 'http://sinacofi.cl/WebServices/Consulta'})};
  let body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://sinacofi.cl/WebServices" xmlns:sdn="http://wsdl.sinacofi.cl/SDN138REQ">
  <soapenv:Header/>
  <soapenv:Body>
     <web:Consulta>
        <!--Optional:-->
        <web:usuario>${data.usuario || ''}</web:usuario>
        <!--Optional:-->
        <web:clave>${data.clave || ''}</web:clave>
        <!--Optional:-->
        <web:rut>${data.rut || ''}</web:rut>
        <!--Optional:-->
        <web:canalInstitucion>${data.canalInstitucion || ''}</web:canalInstitucion>
        <!--Optional:-->
        <web:idChallenge>${data.idChallenge || ''}</web:idChallenge>
        <!--Optional:-->
        <web:mail>${data.mail || ''}</web:mail>
        <!--Optional:-->
        <web:celular>${data.celular || ''}</web:celular>
        <!--Optional:-->
        <web:desafio>
           <!--Zero or more repetitions:-->
           <web:RESPUESTAS>
              <!--Optional:-->
              <sdn:CODIGO_PREGUNTA>${data.codigo_pregunta || ''}</sdn:CODIGO_PREGUNTA>
              <!--Optional:-->
              <sdn:CODIGO_RESPUESTA>${data.codigo_respuesta || ''}</sdn:CODIGO_RESPUESTA>
           </web:RESPUESTAS>
        </web:desafio>
     </web:Consulta>
  </soapenv:Body>
</soapenv:Envelope>`;
return this.http.post(this.uriserv3, body, z);
}
validacionPin(data){
  const a = {headers : new HttpHeaders({'Content-Type': 'text/xml;charset=UTF-8', 'SOAPAction': 'http://sinacofi.cl/WebServices/Consulta'})};
  let body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://sinacofi.cl/WebServices">
  <soapenv:Header/>
  <soapenv:Body>
     <web:Consulta>
        <web:usuario>${data.usuario || ''}</web:usuario>
        <web:claveUsuario>${data.claveUsuario || ''}</web:claveUsuario>
        <web:rutCliente>${data.rutCliente || ''}</web:rutCliente>
        <web:numeroPin>${data.numeroPin || ''}</web:numeroPin>
        <web:canalInstitucion>${data.canalInstitucion || ''}</web:canalInstitucion>
        <web:idChallenge>${data.idChallenge || ''}</web:idChallenge>
     </web:Consulta>
  </soapenv:Body>
</soapenv:Envelope>`;
return this.http.post(this.uriserv4, body, a);
}
}
