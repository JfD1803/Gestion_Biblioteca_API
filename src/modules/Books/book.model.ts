import { Schema, model, Document } from "mongoose"; /* ---> mongoose es una libreria  de modelado de datos de objetos (ODM-Object Data Modeling)
                                                    para Node.js y MongoDB se utiliza más que todo para realizar esquémas (Schemas) para modelar 
                                                    datos en una aplicación */

import { ObjectId } from "mongodb"; /* ---> mongodb: Es el driver nativo oficial de MongoDB para Node.js; Se puede utilizar
                                    mongoose el cual brinda herramientas de más alto nivel por ejemplo realizar Schema, 
                                    validadores, middlewares y modelos */

/*Se exporta la interface de author de Document */

export interface book extends Document {
    _id?:ObjectId;
    title: string;
    json: string;
    authorId: Types.ObjectId;
    year: number;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const bookschema = new Schema<book>({
    title: { type: String, required: true, trim: true},
    json: { type: String, required: true, trim: true},
    authorId: { type: Schema.Types.ObjectId, ref: "Authors", required: true}, /* --->  Se usa Schema.Types.ObjectId, para realizar la consulta
                                                                              en la coleccion de Authors*/
    year: { type: Number },
    available: { type: Boolean, defualt: true }
},
{ timestamps: true } // ---> Sirve para gestionar automaticamente la fecha y hora que se crean y modifican los documentos.
);

export const bookModel = model<book>("Books", bookschema); // ---> Se exporta para que pueda ser utilizado en la capa repository
