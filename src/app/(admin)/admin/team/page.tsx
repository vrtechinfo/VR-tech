import { db } from "@/lib/db";
import TeamClient from "@/components/admin/TeamClient";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
    const users = await db
        .selectFrom("user")
        .selectAll()
        .orderBy("createdAt", "desc")
        .execute();

    return (
        <div className="container mx-auto">
            <TeamClient initialUsers={users} />
        </div>
    );
}
