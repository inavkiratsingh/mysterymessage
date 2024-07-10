import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth"


export async function POST( request: Request ) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user

    if(!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }

    const userId = user._id
    const {acceptMessages} = await request.json()
    
    try {
        console.log(userId);
        console.log({acceptMessages}, "status");
        
        
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessages: acceptMessages },
            { new : true }
        )
        
        console.log(updatedUser);
        

        if(!updatedUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 401 })
        }

        return Response.json({
            success: true,
            message: "accept message status updated successfully",
            updatedUser
        }, { status: 200 })

    } catch (error) {
        console.log("failed to update user accept messages");
        return Response.json({
            success: false,
            message: "failed to update user status of accept messages"
        }, { status: 500 })
    }

}

export async function GET( request: Request ) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user

    if(!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }

    const userId = user._id
    try {
            const foundUser = await UserModel.findById( userId )
        
            if(!foundUser) {
                return Response.json({
                    success: false,
                    message: "User not found"
                }, { status: 404 })
            }
        
            return Response.json({
                success: true,
                message: "user found",
                isAcceptingMessages: foundUser.isAcceptingMessages
            }, { status: 200 })
    } catch (error) {
        console.log("failed to update user accept messages");
        return Response.json({
            success: false,
            message: "Error in getting message accept status"
        }, { status: 500 })
    }
}