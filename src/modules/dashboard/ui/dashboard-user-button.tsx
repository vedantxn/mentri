import { authClient } from "@/lib/auth-client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { ChevronDownIcon, CreditCardIcon, LogOutIcon, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession()
  const router = useRouter()

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login")
        }
      }
    })
  }

  if (isPending || !data?.user) {
    return null
  } 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20">
        {data.user.image ? (
          <Avatar className="h-9 w-9 flex-shrink-0 ring-2 ring-white/20">
            <AvatarImage src={data.user.image} alt={data.user.name || "User"} />
          </Avatar>
        ) : (
          <div className="h-9 w-9 flex-shrink-0">
            <GeneratedAvatar seed={data.user.name} variant="initials" />
          </div>
        )}
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-medium truncate">
            {data.user.name}
          </p>
          <p className="text-xs truncate">
            {data.user.email}
          </p>
        </div>
        <Settings className="h-4 w-4 flex-shrink-0" />
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56"
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-slate-900">
              {data.user.name}
            </p>
            <p className="text-xs text-slate-500">
              {data.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer">
          <CreditCardIcon className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
