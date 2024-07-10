import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, code } = await request.json();

        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({ username: decodedUsername });

        if (!user) {
        return Response.json(
            {
            success: false,
            message: "user not found",
            },
            { status: 500 }
        );
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
        user.isVerified = true;
        await user.save();

        return Response.json(
            {
            success: true,
            message: "User Verfied successfull",
            },
            { status: 200 }
        );
        } else if (!isCodeValid) {
        return Response.json(
            {
            success: false,
            message: "Invalid Code",
            },
            { status: 400 }
        );
        } else if (!isCodeNotExpired) {
        return Response.json(
            {
            success: false,
            message:
                "Verification code expired please signup again to get new code",
            },
            { status: 400 }
        );
        }
    } catch (error: any) {
        return Response.json(
        {
            success: false,
            message: "error verifying user",
        },
        { status: 500 }
        );
    }
}
