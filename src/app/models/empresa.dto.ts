export interface empresaDTO
{
  id:                 number,
  id_user:            number,
  nombre_empresa:     string,
  domicilio:          string,
  id_giro_comercial:  number,
  fecha_registro:     string,
  estatus:            boolean,
  response ?:         {
                      msg:  string,
                      code: number
  }
}
