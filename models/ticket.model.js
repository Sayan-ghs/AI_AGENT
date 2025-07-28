import mongoose, { mongo } from "mongoose";

const ticketSchema = mongoose.Schema({
        title : String,
        description : String,
        status : {
                type : String,
                default : "TODO"
        },
        createdBy : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"
        },
        assignTo : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User",
                default : null
        },
        priority : {
                type : String
        },
        deadline : String,
        helpfulNotes : String,
        relatedSkills : [String],
        createdAt : {
                type : Date,
                default : Date.now 
        }
})

export default mongoose.model('ticket',ticketSchema) 