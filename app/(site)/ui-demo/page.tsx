'use client'

import { useState } from 'react'

import {
  Accordion,
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  Loading,
  Modal,
  RadioGroup,
  Select,
  Table,
  Tabs,
  Textarea,
} from '@/components/ui'

export default function UIDemoPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRadio, setSelectedRadio] = useState('option1')
  const [checkboxValue, setCheckboxValue] = useState(false)

  const accordionItems = [
    {
      id: '1',
      title: 'What is your refund policy?',
      content: 'We offer a 30-day money-back guarantee for all our products.',
    },
    {
      id: '2',
      title: 'How do I track my order?',
      content: 'You will receive a tracking number via email once your order ships.',
    },
  ]

  const tabItems = [
    {
      id: 'tab1',
      label: 'Description',
      content: <p>This is the description tab content.</p>,
    },
    {
      id: 'tab2',
      label: 'Features',
      content: <p>This is the features tab content.</p>,
    },
  ]

  const tableColumns = [
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status' },
  ]

  const tableRows = [
    { name: 'John Doe', role: 'Developer', status: 'Active' },
    { name: 'Jane Smith', role: 'Designer', status: 'Active' },
  ]

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]

  const radioOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">UI Components Demo</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            title="Card Title"
            description="This is a card description"
            image="https://via.placeholder.com/400x200"
          />
          <Card
            title="Clickable Card"
            description="This card has an href"
            href="/about"
          />
          <Card title="Simple Card">
            <p>Custom content inside the card</p>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge text="Primary" color="primary" />
          <Badge text="Secondary" color="secondary" />
          <Badge text="Success" color="success" />
          <Badge text="Warning" color="warning" />
          <Badge text="Error" color="error" />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Modal</h2>
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Modal Title"
        >
          <p>This is the modal content.</p>
        </Modal>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Tabs</h2>
        <Tabs items={tabItems} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Accordion</h2>
        <Accordion items={accordionItems} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Table</h2>
        <Table columns={tableColumns} rows={tableRows} striped />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Loading</h2>
        <div className="flex gap-8">
          <div>
            <p className="mb-2">Spinner</p>
            <Loading type="spinner" size="md" />
          </div>
          <div className="flex-1">
            <p className="mb-2">Skeleton</p>
            <Loading type="skeleton" skeletonLines={3} />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Form Components</h2>
        <div className="space-y-4 max-w-md">
          <Input
            label="Text Input"
            placeholder="Enter text..."
            helperText="This is helper text"
          />
          
          <Textarea
            label="Textarea"
            placeholder="Enter multiple lines..."
            rows={4}
          />
          
          <Select
            label="Select"
            options={selectOptions}
            placeholder="Choose an option"
          />
          
          <Checkbox
            label="I agree to the terms"
            checked={checkboxValue}
            onChange={(e) => setCheckboxValue(e.target.checked)}
          />
          
          <RadioGroup
            label="Radio Options"
            options={radioOptions}
            value={selectedRadio}
            onChange={setSelectedRadio}
          />
        </div>
      </section>
    </div>
  )
}