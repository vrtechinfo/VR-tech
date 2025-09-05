import DashBoard from "@/components/DashBoard";
import { notFound } from "next/navigation"

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    if (slug !== "cms_forms") {
        notFound();
    }
    return (<DashBoard />)
}
