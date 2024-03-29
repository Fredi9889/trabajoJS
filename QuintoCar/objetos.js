"use strict";

//////////////////////////////////////CLASES/////////////////////////////////////////////////////////////
//Clase Cliente
function Cliente(sNIF, sNombre, sApellido, iTelefono) {
    this.nif = sNIF;
    this.nombre= sNombre;
    this.apellido = sApellido;
    this.telefono = iTelefono;
}

Cliente.prototype.toString = function() {
    let sMensaje = "El cliente " +this.nombre+ " " +this.apellido+" con DNI " +this.nif+ " y telefono " +this.telefono;
    return sMensaje;
}

//Clase Venta
function Venta(oCliente, oVehiculo, fImporte,dtFVenta) {
    this.cliente = oCliente;
    this.vehiculo= oVehiculo;
    this.importe = fImporte;
    this.fVenta = dtFVenta;
}

Venta.prototype.toString = function() {
    let sMensaje = "El cliente " +this.cliente+ ", ha vendido un " +this.vehiculo+" por un importe de " +this.importe+ " el día " +this.fVenta;
    return sMensaje;
}

//Clase Compra
function Compra(oCliente, oVehiculo, fImporte,dtFCompra) {
    this.cliente = oCliente;
    this.vehiculo= oVehiculo;
    this.importe = fImporte;
    this.fCompra = dtFCompra;
}

Compra.prototype.toString = function() {
    let sMensaje = "El cliente " +this.cliente+ ", ha comprado un " +this.vehiculo+" por un importe de " +this.importe+ " el día " +this.fCompra;
    return sMensaje;
}

//Clase vehiculo
function Vehiculo(sMatricula, sMarca, sModelo, sCombustible) {
    this.matricula = sMatricula;
    this.marca = sMarca;
    this.modelo = sModelo;
    this.combustible = sCombustible;
}

Vehiculo.prototype.toString = function() {
    let sMensaje = "El vehiculo " +this.matricula+ " de la marca " +this.marca+" y del modelo " +this.modelo+ " tiene el combustible " +this.combustible;
    return sMensaje;
}

//clase turismo
function Turismo(sMatricula, sMarca, sModelo, sCombustible, bABS, bDescapotable, iNumPuertas) {
    Vehiculo.call(this, sMatricula, sMarca, sModelo, sCombustible);
    this.abs = bABS;
    this.descapotable = bDescapotable;
    this.numPuertas = iNumPuertas;
}

//Herencia de vehiculo
Turismo.prototype = Object.create(Vehiculo.prototype);
Turismo.prototype.constructor = Turismo;

Turismo.prototype.toString = function() {
    let sMensaje = "El turismo " +this.matricula+ " de la marca " +this.marca+" y del modelo " +this.modelo+ " tiene el combustible " +this.combustible;
    return sMensaje;
}


//Clase 4x4
function todoTerreno(sMatricula, sMarca, sModelo, sCombustible,iPendintemax) {
    Vehiculo.call(this, sMatricula, sMarca, sModelo, sCombustible);
    this.pendienteMax= iPendintemax;
}
//Herencia de vehiculo
todoTerreno.prototype = Object.create(Vehiculo.prototype);
todoTerreno.prototype.constructor = todoTerreno;

todoTerreno.prototype.toString = function() {
    let sMensaje = "El todoTerreno " +this.matricula+ " de la marca " +this.marca+" y del modelo " +this.modelo+ " tiene el combustible " +this.combustible;
    return sMensaje;
}


//Clase principal
class QuintoCar{

constructor() 
    {
        this.clientes = [];
        this.ventas = [];
        this.compras = [];
        this.vehiculos = [];
    }

    //////////////////////////////////////////////////MÉTODOS/////////////////////////////////////////////////////////////////

    //1.-Introducir cliente
    altaCliente(oCliente) 
    {
        let sMensaje = "";

        if (this.clientes.filter(clientes => clientes.nif == oCliente.nif).length == 0) {
            //No se encuentra --> lo doy de alta
            this.clientes.push(oCliente);
            sMensaje = "Alta cliente OK";
        } else {
            sMensaje = "No puede haber dos clientes con el mismo NIF";
        }

        return sMensaje;
      
    }

    //2.-Introducir vehiculo
   altaVehiculo(oVehiculo)
    {
        let sMensaje = "";

        if (this.vehiculos.filter(vehiculos => vehiculos.matricula == oVehiculo.matricula).length == 0) {
            //No se encuentra --> lo doy de alta
            this.vehiculos.push(oVehiculo);
            sMensaje = "Alta vehiculo OK";
        } else {
            sMensaje = "La matricula del vehiculo ya estaba registrada";
        }

        return sMensaje;

    }
    //3.-Buscar clientes
    buscarClientes(sNif)
    {
    let oCliente = null;
        for(let i=0 ; i<this.clientes.length ; i++){
            let cliente = this.clientes[i];
            if(cliente.nif == sNif){
                oCliente = cliente;
            }
        }
        return oCliente;

    }
    //4.-Buscar compra
    buscarCompra(matricula){
        let oCompra = null;
        for(let i=0 ; i<this.compras.length ; i++){
            let compra = this.compras[i];
            if(compra.vehiculo.matricula == matricula){
                oCompra = compra;
            }
        }
        return oCompra;
    }

    //5.-BuscarVenta
    buscarVenta(matricula){
        let oVenta = null;
        if (this.ventas.filter(v => v.vehiculo.matricula == matricula).length != 0) {
          oVenta = v;
        }
        return oVenta;
    }
    
    //6.-Comprar vehículo
    comprarVehiculo(matricula, sNIF, importeCompra, fechaCompra){
        let mens = "";

        let oVehiculosBuscar = this.vehiculos.filter(vehi => vehi.matricula == matricula);
        //Comprobar que exista el cliente
        if (this.buscarClientes(sNIF) == null) {
            mens = "ERROR: El cliente no existe";
        }else
        //Comprobar que el vehículo esté registrado
        if(oVehiculosBuscar.length == 0){
            mens = "ERROR: El vehículo no existe";
        }else
        //Comprobar que el vehículo no se haya comprado antes
        if(this.buscarCompra(matricula) != null){
            mens = "ERROR: El vehículo ya se había comprado antes";
        }else{

            let c = new Compra(this.buscarClientes(sNIF), oVehiculosBuscar[0], importeCompra,fechaCompra);
            this.compras.push(c);
            mens = "El vehículo se ha comprado correctamente";
        } 
        return mens;
    }
    //7.-Vender vehículo
    venderVehiculo(matricula, NIF, importeVenta, fechaCompra){
        let mens = "";
        let oCliente;
        let oVehiculosBuscar = this.vehiculos.filter(vehi => vehi.matricula == matricula);
        //Comprobar que exista el cliente
        if (this.buscarClientes(NIF) == null) {
            mens = "ERROR: El cliente no existe";
        }else{
            oCliente = this.buscarClientes(NIF);
            //Comprobar que el vehículo esté registrado
            if(oVehiculosBuscar.length == 0){
                mens = "ERROR: El vehículo no existe";
            }else 
            //Comprobar que el vehículo no se haya vendido ya
            if(this.ventas.some(matri => matri == matricula)){
                mens = "ERROR: El vehículo ya se ha vendido anteriormente";
            }else
            //Comprobar que el vehículo haya sido comprado anteriormente
            if(this.buscarCompra(matricula) == null){
                mens = "ERROR: El vehículo aún no ha sido comprado";
            }else{
                let oCompra = this.buscarCompra(matricula);
                
                //Comprobar que el importe de venta es superior al de compra
                if(oCompra.importe < importeVenta){
                    let v = new Venta(oCliente, oVehiculosBuscar[0], importeVenta,fechaCompra);
                    this.ventas.push(v);
                    mens = "El vehículo se ha vendido correctamente";
                }else{
                    mens = "ERROR: El importe de la venta no es superior al de compra";
                } 
            }
            
        }
        
        return mens;
    }

    //8.- Vehículos en venta (vehiculosALaVenta)
    vehiculosEnVenta(){
        let vehiculo;
        let tabla = '<table border="1" style="text-align: center;"><tr>';
        tabla += "<tr><th>Matricula</th><th>Marca</th><th>Modelo</th><th>Precio mínimo de salida</th></tr>";
        for(let i=0;i<this.vehiculos.length;i++){
            vehiculo=this.vehiculos[i];
            if(this.buscarVenta(vehiculo.matricula) == null){
                tabla += "<tr><td>" + vehiculo.matricula + "</td><td>" + vehiculo.marca + "</td><td>" + vehiculo.modelo + "</td><td>" + (this.buscarCompra(vehiculo.matricula).importe + 1) + "</td></tr>";
            }
        }
        tabla += "</table>";
        return tabla;
    }

    //9.- Listado de vehículos vendidos en un periodo determinado
    //Datos completos del vehículo, fecha de compra, fecha de venta, importe de compra, 
    //importe de venta y beneficio (importe venta – importe compra).  
    //Los registros del listado deben salir ordenados por fecha de venta ascendente.
    listadoVendidosPeriodo(fInicio, fFin){
        this.ventas.sort(function(a,b){
            return a - b;
        });
        let arrayFiltrado = this.ventas.filter(x => x.fVenta>=fInicio && x.fVenta<=fFin);
        let tabla = "";
        let that = this;
        arrayFiltrado.forEach(function(value) {
            let oCompra = that.buscarCompra(value.vehiculo.matricula);
            tabla = '<table border="1" style="text-align: center;"><tr>';
            tabla += "<th colspan='4'>Vehículo</th></tr>";
            tabla += "<tr><th>Matrícula</th><th>Marca</th><th>Modelo</th><th>Combustible</th></tr>";
            tabla += "<tr><td>" + value.vehiculo.matricula + "</td><td>" + value.vehiculo.marca + "</td><td>" + value.vehiculo.modelo + "</td><td>" + value.vehiculo.combustible + "</td></tr>";
            if(value.vehiculo instanceof Turismo){
                tabla += "<tr><th colspan='3'>Turismo</th></tr>";
                tabla += "<tr><th>ABS</th><th>Descapotable</th><th>Número de puertas</th></tr>";
                tabla += "<tr><td>"+ value.vehiculo.abs+"</td><td>"+value.vehiculo.descapotable + "</td><td>"+ value.vehiculo.numPuertas +"</td></tr>";
            }else if(value.vehiculo instanceof todoTerreno){
                tabla += "<tr><th colspan='4'>Todo terreno</th></tr>";
                tabla += "<tr><th colspan='4'>Pendiente máxima</th></tr>";
                tabla += "<tr><td colspan='4'>" + value.vehiculo.pendienteMax +"</td></tr>";
            }
            tabla += "<tr><th colspan='2'>Fecha de compra</th><th colspan='2'>Fecha de venta</th></tr>";
            tabla += "<tr><td colspan='2'>" + oCompra.fCompra + "</td><td colspan='2'>" + value.fVenta;
            tabla += "<tr><th colspan='2'>Importe de compra</th><th colspan='2'>Importe de venta</th></tr>";
            tabla += "<tr><td colspan='2'>" + oCompra.importe + "</td><td colspan='2'>" + value.importe;
            tabla += "<tr><th colspan='4'>Beneficios</th></tr>";
            let x = parseInt(value.importe);let y = parseInt(oCompra.importe);
            tabla += "<tr><td colspan='4'>" + (x-y) + "</td></tr>";
            tabla += "</table>";
        });
        return tabla;
    }

    //10.- Listado de vehículos comprados en un periodo determinado  
    //Los registros del listado deben salir ordenados por fecha de compra descendente.
    //Me falta añadir los datos del cliente vendedor y ordenarlos por fecha
    listadoCompradosPeriodo(fInicio, fFin){
        let arrayFiltrado = this.ventas.filter(x => x.fVenta>=fInicio && x.fVenta<=fFin);
        let tabla;
        function recorrerArray(value) {
            let oVenta = this.buscarVenta(value.vehiculo.matricula);
            tabla = '<table border="1"><tr>';
            tabla += "<th colspan='4'>Vehículo</th></tr>";
            tabla += "<tr><th>Matrícula</th><th>Marca</th><th>Modelo</th><th>Combustible</th><th>Categoría</th></tr>";
            tabla += "<tr><td>" + value.vehiculo.matricula + "</td><td>" + value.vehiculo.marca + "</td><td>" + value.vehiculo.modelo + "</td><td>" + value.vehiculo.combustible + "</td><td>" + frmAltaVehiculo.txtCategoria.value + "</td></tr>";
            //datos del cliente vendedor
            tabla += "<tr><th colspan='2'>Fecha de compra</th><th colspan='2'>Importe de compra</th></tr>";
            tabla += "<tr><th colspan='2'>" + oVenta.fCompra + "</th><th colspan='2'>" + oVenta.importe + "</th></tr>";
            table += "<tr><th colspan='4'>Cliente</th></tr>";

            tabla += "</table>";
        }
        arrayFiltrado.forEach(recorrerArray);
        return tabla;
    }

    //12.-ListadoCliente
   listadoCliente()
    {
    this.clientes = this.clientes.sort(function (a, b)
    {
    if ( a.apellido < b.apellido )
        return -1;
    if ( a.apellido > b.apellido )
        return 1;
    return 0;
    })
        
    let i = 0;
    let sMensaje = "<table border='1'><thead><tr>";
    sMensaje += "<th>NIF</th><th>Nombre</th><th>Apellido</th><th>Telefono</th></tr></thead><tbody>";

     for (i = 0; i < this.clientes.length; i++) 
    {
        sMensaje += "<tr>";
        sMensaje += "<td>"+this.clientes[i].nif+ "</td>";
        sMensaje += "<td>"+this.clientes[i].nombre+ "</td>";
        sMensaje += "<td>"+this.clientes[i].apellido+ "</td>";
        sMensaje += "<td>"+this.clientes[i].telefono+ "</td>";
        sMensaje += "</tr>";
    }

    sMensaje += "</tbody></table>";

     return sMensaje;
    }
    

}
