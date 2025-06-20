'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const NavItem = ({ 
  href, 
  children, 
  isActive, 
  onClick,
  mobile = false 
}: { 
  href: string; 
  children: React.ReactNode; 
  isActive: boolean; 
  onClick: (e: React.MouseEvent, path: string) => void;
  mobile?: boolean;
}) => (
  <a 
    href={href}
    onClick={(e) => onClick(e, href)}
    className={`${isActive ? 'text-white font-medium' : 'text-gray-300 hover:text-white'} 
      ${mobile ? 'block px-4 py-3 text-base hover:bg-gray-800' : 'px-4 py-2 text-sm'} 
      transition-colors cursor-pointer`}
  >
    {children}
  </a>
);

const navItems = [
  { href: "/", label: "Home" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/scholarship", label: "Scholarship" },
  { href: "/mentorkonnect", label: "Mentorkonnect" },
  { href: "/essay", label: "Essay" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const isActive = (path: string) => pathname === path;

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    router.push(path);
  };

  // Handle scroll and click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    // Only add scroll listener on client side
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 10);
      }
    };

    // Set initial scroll state after component mounts
    handleScroll();

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  return (
    <nav className={`sticky top-0 z-50 bg-[#121417] border-b border-[#1a1d21] transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <h1 
              className="text-2xl font-bold text-white cursor-pointer ml-4 md:ml-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
              onClick={(e) => handleNavigation(e, '/')}
            >
              Fliq
            </h1>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavItem 
                key={item.href}
                href={item.href} 
                isActive={isActive(item.href)} 
                onClick={handleNavigation}
              >
                {item.label}
              </NavItem>
            ))}
          </div> 

          {/* User Button / Sign In/Up Buttons */}
          <div className="ml-auto flex items-center space-x-4">
            <SignedOut>
              <div className="space-x-4">
                <SignInButton mode="modal" />
                <SignUpButton mode="modal" />
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" userProfileUrl="/profile" />
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden mobile-menu-container transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#121417] border-t border-gray-800">
          {/* Mobile Navigation Items */}
          {navItems.map((item) => (
            <NavItem 
              key={`mobile-${item.href}`}
              href={item.href} 
              isActive={isActive(item.href)} 
              onClick={handleNavigation}
              mobile
            >
              {item.label}
            </NavItem>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="mt-4 flex flex-col space-y-2 px-2">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full text-left px-4 py-3 text-base text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="w-full text-left px-4 py-3 text-base text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">Sign Up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" userProfileUrl="/profile" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
