'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import { type FAQItem } from '@/types/pages'

interface FAQProps {
  items: FAQItem[]
  allowMultiple?: boolean
}

export default function FAQ({ items, allowMultiple = false }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleOpen = (index: number) => {
    if (!allowMultiple) {
      setOpenIndex(openIndex === index ? null : index)
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-4">
            {items.map((item, index) => (
              <Disclosure
                key={item.id}
                as="div"
                defaultOpen={false}
                {...(!allowMultiple && {
                  open: openIndex === index,
                  onChange: () => handleOpen(index),
                })}
              >
                {({ open }) => (
                  <div className="rounded-lg border border-gray-200 bg-white">
                    <Disclosure.Button className="flex w-full items-center justify-between px-6 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
                      <span className="text-lg font-medium text-gray-900">
                        {item.question}
                      </span>
                      <ChevronDownIcon
                        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                          open ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    
                    <Disclosure.Panel className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}