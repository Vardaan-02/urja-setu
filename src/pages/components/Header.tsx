"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "What We Do", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  useEffect(() => {

  }, []);
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Urja Setu</span>
            <img alt="" src="/image.png" className="h-8 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:font-extrabold"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-900 hover:translate-y-1 transition duration-300 font-bold text-xl"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-2">
          <button
            onClick={() => setLoginModalOpen(true)}
            className="text-xl font-semibold text-gray-900 hover:translate-y-1 hover:bg-[#76B947] rounded-md transition duration-300 py-2 hover:text-white px-4"
          >
            Login
          </button>
          <button
            onClick={() => setLoginModalOpen(true)}
            className="text-xl font-semibold text-gray-900 hover:translate-y-1 hover:bg-[#76B947] rounded-md transition duration-300 py-2 hover:text-white px-4"
          >
            Signup
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src="/image.png" className="h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-gray-900 hover:bg-gray-50 font-bold hover:underline transition duration-300"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Signup
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      <Dialog
        open={loginModalOpen}
        onClose={setLoginModalOpen}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black bg-opacity-30" />
        <DialogPanel className="relative bg-white rounded-lg shadow-lg p-6 max-w-[600px] w-full">
          <h2 className="text-center text-2xl p-2 mb-3">Signup as</h2>
          <div className="space-y-4 flex space-x-4 w-full items-center justify-between">
            <img
              src="/user.webp"
              alt=""
              className="h-20 w-[30%] object-cover rounded-full"
            />

            <img
              src="/delivery-boy.webp"
              alt=""
              className="h-20 w-[30%] object-cover rounded-full"
            />
            <img
              src="/factory.jpg"
              alt=""
              className="h-20 w-[30%] object-cover rounded-full"
            />
          </div>
          <div className="flex space-x-4 mt-3">
            <button className="w-full bg-[#76B947] hover:bg-[#2F5233] text-white font-semibold py-2 rounded-md transition">
              User
            </button>
            <button className="w-full bg-[#76B947] hover:bg-[#2F5233] text-white font-semibold py-2 rounded-md transition">
              Delivery Person
            </button>
            <button className="w-full bg-[#76B947] hover:bg-[#2F5233] text-white font-semibold py-2 rounded-md transition">
              Organization
            </button>
          </div>
          <button
            onClick={() => setLoginModalOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-2"
          >
            <XMarkIcon aria-hidden="true" className="size-6" />
          </button>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
