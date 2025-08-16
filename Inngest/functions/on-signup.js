import { NonRetriableError } from "inngest"
import userModel from "../../models/user.model"
import {inngest} from "../client"
import { sendMail } from "../../utils/mailer"

export const onUserSignup = inngest.createFunction(
      {id:"on-user-signup",retries:2},
      {event:"user/signup"},
      async ({event,step})=>{
        try{
                const {email} = event.data
                const user = await step.run("get-user-email",async ()=>{
                         UserObject = await userModel.findOne({email})
                         if(!UserObject){
                                throw new NonRetriableError("user no longer exist in our database")
                         }
                         return UserObject
                })

                await step.run("send-welcome-email",async ()=>{
                        const subject = `welcome to the app`
                        const message = `hi,
                        \n\n
                        Thanks for signing and we're glad to have you onboard`
                        await sendMail(user,email,subject,message)
                        return {success : true}
                })
        }catch(error){
                console.error("Message are wrong",error.messageId)
        }
      }
)