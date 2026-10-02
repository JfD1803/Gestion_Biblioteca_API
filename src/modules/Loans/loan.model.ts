import { Schema, model, Document, Types } from "mongoose"; /* ---> mongoose es una libreria  de modelado de datos de objetos (ODM-Object Data Modeling)
                                                    para Node.js y MongoDB se utiliza más que todo para realizar esquémas (Schemas) para modelar 
                                                    datos en una aplicación */

import { ObjectId } from "mongodb"; /* ---> mongodb: Es el driver nativo oficial de MongoDB para Node.js; Se puede utilizar
                                    mongoose el cual brinda herramientas de más alto nivel por ejemplo realizar Schema, 
                                    validadores, middlewares y modelos */
import "../Books/book.model"; // ---> Carga el modulo Book en el registro de Mongoose

/*Se exporta la interface de author de Document: */
export interface ILoan extends Document {
  bookId: Types.ObjectId;
  userName: string;
  loanDate: Date;
  returnDate?: Date;
  returned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const loanschema = new Schema<ILoan>(
  {
    bookId: { 
      type: Schema.Types.ObjectId, 
      ref: "Books", 
      required: true 
    },
    userName: { 
      type: String, 
      required: true, 
      trim: true 
    },
    loanDate: { 
      type: Date, 
      required: true, 
      default: Date.now 
    },
    returnDate: { 
      type: Date 
    },
    returned: { 
      type: Boolean, 
      default: false 
    }
  },
  { timestamps: true } // ---> Gestiona automáticamente createdAt y updatedAt
);

export const loanModel = model<ILoan>("Loan", loanschema);
