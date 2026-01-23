import { auth } from "@/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

// Get the handlers using the proper Better-Auth method
const { GET: authGET, POST: authPOST } = toNextJsHandler(auth);

export async function POST(request: NextRequest) {
    try {
        console.log('=== AUTH POST REQUEST ===');
        console.log('URL:', request.url);
        return await authPOST(request);
    } catch (error: any) {
        console.error('=== BETTER-AUTH POST ERROR ===');
        console.error('Message:', error.message);
        console.error('Stack:', error.stack);
        return NextResponse.json({
            error: 'Auth POST error',
            message: error.message
        }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        console.log('=== AUTH GET REQUEST ===');
        console.log('URL:', request.url);
        return await authGET(request);
    } catch (error: any) {
        console.error('=== BETTER-AUTH GET ERROR ===');
        console.error('Message:', error.message);
        console.error('Stack:', error.stack);
        return NextResponse.json({
            error: 'Auth GET error',
            message: error.message
        }, { status: 500 });
    }
}
