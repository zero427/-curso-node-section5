const Tarea = require("./tarea");

class Tareas {
    _listado = {}

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    listarTareas() {

        let outPut = '';

        this.listadoArr.forEach((tarea, i) => {

            const { desc, completadoEn } = tarea;
            outPut += `${i + 1}. `.green
                + `${desc} :: ${(completadoEn) ? 'Completada'.green : 'Pendiente'.red}\n`
        });

        return outPut;
    }

    listarTareasPorEstado(estado) {

        let outPut = '';
        let n = 1;

        this.listadoArr.forEach((tarea) => {

            const { desc, completadoEn } = tarea;

            if (estado === 'Completada' & completadoEn) {
                outPut += `${n + 1}. `.green
                    + `${desc} ::` + ` ${completadoEn}`.green + `\n`;
                n++;
            }
            else if (estado === 'Pendiente' & !completadoEn) {
                outPut += `${n + 1}. `.green
                    + `${desc} ::` + ` ${completadoEn}`.red + `\n`;
                n++;
            }
        });

        return outPut;
    }

    crearTarea(desc) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }


    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    toggleCompletadas(ids = []) {
        
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {

            if( !ids.includes(tarea.id)){
                const referenceTask = this._listado[tarea.id]
                referenceTask.completadoEn = null;
            }
            
        });
    }

}



module.exports = Tareas;