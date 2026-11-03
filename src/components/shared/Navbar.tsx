
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import {
  BookOpen,
  Menu,
  X,
  ChevronDown,
  UserRound,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();

  // Better Auth session
 const { data: session, isPending } = authClient.useSession();

const isLoggedIn = !isPending && !!session?.user;

  const user = session?.user;

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
  ];

  const privateLinks = [
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
  ];

  const navLinks = isLoggedIn
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  // Sign Out
  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("Sign out failed");
      console.log(error);
      return;
    }

    toast.success("Sign out successfully");

    setProfileOpen(false);
    setIsOpen(false);

    router.push("/signin");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e5dc] bg-[#faf9f6] shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

       
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#245c45] text-white">
            <BookOpen size={24} />
          </div>

          <span className="text-2xl font-bold tracking-tight text-[#245c45]">
            BookNook
          </span>
        </Link>

      
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[#454b45] transition hover:text-[#245c45]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        
        <div className="hidden items-center gap-3 lg:flex">

          {!isPending && (
            <>
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/signin"
                    className="rounded-lg px-5 py-2.5 text-sm font-semibold text-[#245c45] transition hover:bg-[#e9eee9]"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="rounded-lg bg-[#245c45] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#194532]"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 rounded-full border border-[#e8e5dc] p-1.5 pr-3 hover:bg-[#f0f1eb]"
                  >
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt="Profile"
                        width={36}
                        height={36}
                        unoptimized
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#245c45] text-white">
                        <UserRound size={20} />
                      </div>
                    )}

                    <span className="text-sm font-semibold text-[#343a35]">
                      {user?.name}
                    </span>

                    <ChevronDown size={16} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-52 rounded-xl border border-[#e8e5dc] bg-white p-2 shadow-lg">

                      <div className="border-b border-gray-100 px-3 py-2">
                        <p className="text-sm font-semibold text-[#245c45]">
                          {user?.name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {user?.email}
                        </p>
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-[#f0f4ef]"
                      >
                        <UserRound size={17} />
                        My Profile
                      </Link>

                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={17} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

       
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-[#245c45] hover:bg-[#e9eee9] lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-[#e8e5dc] bg-[#faf9f6] px-5 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-[#454b45] transition hover:bg-[#e9eee9] hover:text-[#245c45]"
              >
                {link.name}
              </Link>
            ))}

            {!isPending && (
              <>
                {!isLoggedIn ? (
                  <div className="mt-3 flex gap-3 border-t border-[#e8e5dc] pt-4">
                    <Link
                      href="/signin"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 rounded-lg border border-[#245c45] py-2.5 text-center text-sm font-semibold text-[#245c45]"
                    >
                      Login
                    </Link>

                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 rounded-lg bg-[#245c45] py-2.5 text-center text-sm font-semibold text-white"
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <div className="mt-3 border-t border-[#e8e5dc] pt-4">

                    <div className="flex items-center gap-3 px-3 py-2">
                      {user?.image ? (
                        <Image
                          src={user.image}
                          alt="Profile"
                          width={40}
                          height={40}
                          unoptimized
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#245c45] text-white">
                          <UserRound size={21} />
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-[#245c45]">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm hover:bg-[#e9eee9]"
                    >
                      <UserRound size={17} />
                      My Profile
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
