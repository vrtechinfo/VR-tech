import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-800/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full flex justify-center">
                <SignInForm />
            </div>
        </div>
    );
}
