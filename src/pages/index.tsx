import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */

const Index = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')

  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>

        <Tabs.Root
          className="pt-10"
          defaultValue="all"
          onValueChange={(value) =>
            setFilter(value as 'all' | 'pending' | 'completed')
          }
        >
          <Tabs.List className="flex space-x-2">
            <Tabs.Trigger
              value="all"
              className={`rounded-full px-4 py-2 text-sm font-medium focus:outline-none ${
                filter === 'all'
                  ? 'bg-gray-500 text-white'
                  : 'border border-gray-300 bg-white text-gray-500'
              }`}
            >
              All
            </Tabs.Trigger>
            <Tabs.Trigger
              value="pending"
              className={`rounded-full px-4 py-2 text-sm font-medium focus:outline-none ${
                filter === 'pending'
                  ? 'bg-gray-500 text-white'
                  : 'border border-gray-300 bg-white text-gray-500'
              }`}
            >
              Pending
            </Tabs.Trigger>
            <Tabs.Trigger
              value="completed"
              className={`rounded-full px-4 py-2 text-sm font-medium focus:outline-none ${
                filter === 'completed'
                  ? 'bg-gray-500 text-white'
                  : 'border border-gray-300 bg-white text-gray-500'
              }`}
            >
              Completed
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>

        <div className="pt-10">
          <TodoList filter={filter} />
        </div>

        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

export default Index
