require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquireMenu, inquirePausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/Tareas');
// const { mostrarMenu, pausa } = require('./helpers/mensajes');


const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquireMenu();

        switch (opt) {

            case '1': // crear tarea
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2': // listar tareas
                console.log(tareas.listarTareas());
                break;
            case '3': // listar completadas
                console.log(tareas.listarTareasPorEstado('Completada'));
                break;
            case '4': // listar pendientes
                console.log(tareas.listarTareasPorEstado('Pendiente'));
                break;
            case '5': // completado | pendiente
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6': // borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);

                if (id !== '0') {
                    let ok = await confirmar(`Realmente desea eliminar la tarea?`);

                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada.');
                    }
                }
                break;

            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0') {
            console.log('\n')
            await inquirePausa();
        }

    } while (opt !== '0')

};

main();