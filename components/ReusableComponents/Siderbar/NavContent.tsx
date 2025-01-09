import {
    HomeIcon,
    InvoiceIcon,
    ProfileIcon,
    LogoutIcon,
    DashboardIcon
} from "@/components/ReusableComponents/Icon";






export const NavContents = [
    { href: "/", icon: <HomeIcon className="w-[17px] h-[17px]" />, text: "Home", key: "home" },
    { href: "/dashboard", icon: <DashboardIcon className="w-[17px] h-[17px]" />, text: "Dashboard", key: "dashboard" },
    { href: "/invoice", icon: <InvoiceIcon className="w-[17px] h-[17px]" />, text: "Invoice", key: "invoice" },
    { href: "/profile", icon: <ProfileIcon className="w-[17px] h-[17px]" />, text: "Profile", key: "profile" },
    { href: "/logout", icon: <LogoutIcon className="w-[19px] h-[19px]" />, text: "Logout", key: "logout" },
];