import { Schema, model, Document } from "mongoose"; /* ---> mongoose es una libreria  de modelado de datos de objetos (ODM-Object Data Modeling)
                                                    para Node.js y MongoDB se utiliza más que todo para realizar esquémas (Schemas) para modelar 
                                                    datos en una aplicación */

import { ObjectId } from "mongodb"; /* ---> mongodb: Es el driver nativo oficial de MongoDB para Node.js; Se puede utilizar
                                    mongoose el cual brinda herramientas de más alto nivel por ejemplo realizar Schema, 
                                    validadores, middlewares y modelos */

/*Se exporta la interface de author de Document: */

export interface author extends Document {
    _id?:ObjectId;
    name: string;
    nationality: string;
    birthYear?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const authorschema = new Schema<author>({
    name: { type: String, required: true, trim: true},
    nationality: { type: String, required: true, trim: true},
    birthYear: {type: Number},
},
{ timestamps: true } // ---> Sirve para gestionar automaticamente la fecha y hora que se crean y modifican los documentos.
);

export const authorModel = model<author>("Authors", authorschema); // ---> Se exporta para que pueda ser utilizado en la capa repository
