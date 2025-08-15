'use client'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useRef } from 'react'

import { mainNavigation, utilityNavigation } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { MobileMenuProps } from '@/types/navigation'

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Focus management
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
    }
  }, [isOpen])

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <Link href="/" className="-m-1.5 p-1.5" onClick={onClose}>
                  <Image
                    src={siteConfig.logo.src}
                    alt={siteConfig.logo.alt}
                    width={siteConfig.logo.width}
                    height={siteConfig.logo.height}
                    className="h-8 w-auto"
                  />
                </Link>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={onClose}
                >
                  <span className="sr-only">メニューを閉じる</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-200">
                  {/* Main Navigation */}
                  <div className="space-y-2 py-6">
                    {mainNavigation.map((item) => (
                      <div key={item.id}>
                        {item.children ? (
                          <details className="group">
                            <summary className="flex items-center justify-between px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 cursor-pointer">
                              <span className="flex items-center">
                                {item.icon && <item.icon className="h-6 w-6 mr-3 text-gray-400" />}
                                {item.label}
                              </span>
                              <ChevronRightIcon className="h-5 w-5 text-gray-400 group-open:rotate-90 transition-transform" />
                            </summary>
                            <div className="mt-2 space-y-1 pl-10">
                              {item.children.map((child) => (
                                <Link
                                  key={child.id}
                                  href={child.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                                  onClick={onClose}
                                >
                                  <div>
                                    <div className="flex items-center">
                                      {child.label}
                                      {child.badge && (
                                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-white">
                                          {child.badge}
                                        </span>
                                      )}
                                    </div>
                                    {child.description && (
                                      <p className="mt-1 text-xs text-gray-500">
                                        {child.description}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </details>
                        ) : (
                          <Link
                            href={item.href}
                            className="flex items-center px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-primary"
                            onClick={onClose}
                          >
                            {item.icon && <item.icon className="h-6 w-6 mr-3 text-gray-400" />}
                            {item.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Utility Navigation */}
                  <div className="space-y-2 py-6">
                    {utilityNavigation.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={`block px-4 py-2 text-base font-medium rounded-md mx-4 text-center ${
                          item.id === 'contact'
                            ? 'bg-primary text-white hover:bg-primary-dark'
                            : 'text-gray-900 hover:bg-gray-50'
                        }`}
                        onClick={onClose}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {/* Company Info */}
                  <div className="py-6 px-4">
                    <p className="text-xs text-gray-500">{siteConfig.company.name}</p>
                    <p className="mt-1 text-xs text-gray-500">{siteConfig.company.tel}</p>
                    <p className="mt-1 text-xs text-gray-500">{siteConfig.company.businessHours}</p>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
