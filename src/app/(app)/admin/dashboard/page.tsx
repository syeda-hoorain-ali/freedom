import { LayoutDashboardIcon } from "lucide-react"

const Page = () => {
  return (
    <div className="h-calc flex items-center justify-center text-5xl gap-1">
      <LayoutDashboardIcon className="animate-spin size-10" />
      <p>Dashboard</p>
    </div>
  )
}

export default Page
