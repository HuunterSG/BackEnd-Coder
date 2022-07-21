import knex from 'knex';
import {config} from '../config/index.js';
import {dataSets} from './dataSets.js'

const KnexMySQL = knex(config.knex.mysql)
const KnexSqlite = knex(config.knex.sqlite)

const addDataSets = async(KnexConnector, data, tableName)=>{
    await KnexConnector.insert(data).into(tableName);
}

const createProductTable = async()=>{
    try{
        const tableExist = await KnexMySQL.hasTable('productos');
        if( tableExist ) return;

        await KnexMySQL.schema.createTable('productos',(table)=>{
            table.increments('id'),
            table.string('title'),
            table.integer('price'),
            table.string('thumbnail');
        });

        await addDataSets(KnexMySQL, dataSets.productos, 'productos');
    }catch(error){
        return error
    }
}

const createMessageTable = async ()=>{
    try{
        const tableExist = await KnexSqlite.schema.hasTable('mensajes');
        if (tableExist) return;

        await KnexSqlite.schema.createTable('mensajes', (table) => {
            table.increments('id');
            table.string('email');
            table.integer('text');
            table.string('timestamp');
        });    

        await addDataSets(KnexSqlite, dataSets.mensajes, 'mensajes')
    }catch(error){
        return error
    }
}

const init = async ()=>{
    await createProductTable();
    await createMessageTable();
}

const KnexServ ={
    init, KnexMySQL, KnexSqlite
}

export{KnexServ}