const fecha = new Date()
const dias =[
    'domingo',
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado'
];

const n_dia = fecha.getDay();
const nombre_dia = dias[n_dia]; 


exports.verificar = (req, res, next)=>{
    if('sabado' == nombre_dia || 'domingo' == nombre_dia){
        res.status(200).json({
            message: 'No se puede realizar esa operación',
            description: 'Horario de atención es Lunes a Viernes. Gracias'
        })
    }
    else{
        next()
    }
}