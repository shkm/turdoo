import { Controller } from '@hotwired/stimulus'

const TASK_SELECTOR = '.task'
const TASK_DESCRIPTION_SELECTOR = '.description'

export default class TodoController extends Controller {
  static targets = ["newTask", "incompleteTaskTemplate", "completeTaskTemplate", "incompleteTasks", "completeTasks"]

  connect() {
    this.clearAndFocusInput()
  }

  add (event) {
    event.preventDefault()

    if (this.newTaskTarget.value === '') return

    this.addIncompleteTask(this.newTaskTarget.value)

    this.clearAndFocusInput()
  }

  remove (event) {
    this.currentTaskFromEvent(event).remove()
  }

  complete (event) {
    const currentTask = this.currentTaskFromEvent(event)
    const taskContent = currentTask.querySelector(TASK_DESCRIPTION_SELECTOR).textContent

    currentTask.remove()
    this.addCompleteTask(taskContent)
  }

  currentTaskFromEvent (event) {
    return event.currentTarget.closest(TASK_SELECTOR)
  }

  clearAndFocusInput() {
    this.newTaskTarget.value = ''
    this.newTaskTarget.focus()
  }

  addIncompleteTask (taskContent) {
    const newTaskNode = this.nodeFromTemplate(this.incompleteTaskTemplateTarget)

    newTaskNode.querySelector(TASK_DESCRIPTION_SELECTOR).textContent = taskContent

    this.incompleteTasksTarget.appendChild(newTaskNode)
  }

  addCompleteTask (taskContent) {
    const completeTaskNode = this.nodeFromTemplate(this.completeTaskTemplateTarget)

    completeTaskNode.querySelector(TASK_DESCRIPTION_SELECTOR).textContent = taskContent

    this.completeTasksTarget.appendChild(completeTaskNode)
  }

  nodeFromTemplate(target) {
    return target.content.cloneNode(true)
  }
}
