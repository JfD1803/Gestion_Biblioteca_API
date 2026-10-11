import { Schema, model, Document, Types } from "mongoose"; /* ---> mongoose es una libreria  de modelado de datos de objetos (ODM-Object Data Modeling)
                                                    para Node.js y MongoDB se utiliza más que todo para realizar esquémas (Schemas) para modelar 
                                                    datos en una aplicación */

import { ObjectId } from "mongodb"; /* ---> mongodb: Es el driver nativo oficial de MongoDB para Node.js; Se puede utilizar
                                    mongoose el cual brinda herramientas de más alto nivel por ejemplo realizar Schema, 
                                    validadores, middlewares y modelos */

/*Se exporta la interface de IGenre de Document */
export interface IGenre extends Document {
    name: string;
    description: string;
    authorId: Types.ObjectId,
    bookId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const genreschema = new Schema<IGenre>({
    name: { type: String, required: true, trim: true },
    description: { type: String, requires: true, trim: true },
    authorId: { type: Schema.Types.ObjectId, ref: "Authors", required: true}, /* --->  Se usa Schema.Types.ObjectId, para realizar la consulta*/
    bookId: { type: Schema.Types.ObjectId, ref: "Books", required: true}, /* --->  Se usa Schema.Types.ObjectId, para realizar la consulta*/
},
{ timestamps: true } // ---> Sirve para gestionar automaticamente la fecha y hora que se crean y modifican los documentos.
);

export const genreModel = model<IGenre>("Genres", bookschema); // ---> Se exporta para que pueda ser utilizado en la capa repository
