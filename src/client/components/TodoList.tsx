import type { SVGProps } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { api } from '@/utils/client/api'

interface TodoListProps {
  filter: 'all' | 'pending' | 'completed'
}

/**
 * QUESTION 3:
 * -----------
 * A todo has 2 statuses: "pending" and "completed"
 *  - "pending" state is represented by an unchecked checkbox
 *  - "completed" state is represented by a checked checkbox, darker background,
 *    and a line-through text
 *
 * We have 2 backend apis:
 *  - (1) `api.todo.getAll`       -> a query to get all todos
 *  - (2) `api.todoStatus.update` -> a mutation to update a todo's status
 *
 * Example usage for (1) is right below inside the TodoList component. For (2),
 * you can find similar usage (`api.todo.create`) in src/client/components/CreateTodoForm.tsx
 *
 * Your tasks are:
 *  - Use TRPC to connect the todos' statuses to the backend apis
 *  - Style each todo item to reflect its status base on the design on Figma
 *
 * Documentation references:
 *  - https://trpc.io/docs/client/react/useQuery
 *  - https://trpc.io/docs/client/react/useMutation
 *
 *
 *
 *
 *
 * QUESTION 4:
 * -----------
 * Implement UI to delete a todo. The UI should look like the design on Figma
 *
 * The backend api to delete a todo is `api.todo.delete`. You can find the api
 * signature in src/server/api/routers/todo-router.ts
 *
 * NOTES:
 *  - Use the XMarkIcon component below for the delete icon button. Note that
 *  the icon button should be accessible
 *  - deleted todo should be removed from the UI without page refresh
 *
 * Documentation references:
 *  - https://www.sarasoueidan.com/blog/accessible-icon-buttons
 *
 *
 *
 *
 *
 * QUESTION 5:
 * -----------
 * Animate your todo list using @formkit/auto-animate package
 *
 * Documentation references:
 *  - https://auto-animate.formkit.com
 */

export const TodoList = ({ filter }: TodoListProps) => {
  const { data: todos = [], refetch } = api.todo.getAll.useQuery({
    statuses: filter === 'all' ? ['completed', 'pending'] : [filter],
  })

  const { mutate: updateTodoStatus } = api.todoStatus.update.useMutation({
    onSuccess: () => refetch(),
  })

  const { mutate: deleteTodo } = api.todo.delete.useMutation({
    onSuccess: () => refetch(),
  })

  const [parent] = useAutoAnimate<HTMLUListElement>()

  const handleStatusChange = (
    todoId: number,
    status: 'pending' | 'completed'
  ) => {
    updateTodoStatus({
      todoId,
      status: status === 'pending' ? 'completed' : 'pending',
    })
  }

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo({ id: todoId })
  }

  return (
    <ul ref={parent} className="grid grid-cols-1 gap-y-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center justify-between rounded-12 border border-gray-200 px-4 py-3 shadow-sm ${
            todo.status === 'completed' ? 'bg-gray-200 line-through' : ''
          }`}
        >
          <div className="flex items-center">
            <Checkbox.Root
              id={String(todo.id)}
              checked={todo.status === 'completed'}
              onCheckedChange={() => handleStatusChange(todo.id, todo.status)}
              className="flex h-6 w-6 items-center justify-center rounded-6 border border-gray-300 focus:border-gray-700 focus:outline-none data-[state=checked]:border-gray-700 data-[state=checked]:bg-gray-700"
            >
              <Checkbox.Indicator>
                <CheckIcon className="h-4 w-4 text-white" />
              </Checkbox.Indicator>
            </Checkbox.Root>

            <label className="block pl-3 font-medium" htmlFor={String(todo.id)}>
              {todo.body}
            </label>
          </div>

          <button
            onClick={() => handleDeleteTodo(todo.id)}
            aria-label="Delete todo"
            className="ml-4 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </li>
      ))}
    </ul>
  )
}

const XMarkIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  )
}
