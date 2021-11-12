import { Controller } from '@hotwired/stimulus'

const TASK_DESCRIPTION_SELECTOR = '.description'

export default class TodoController extends Controller {
  static targets = ["newTask", "taskTemplate"]

  connect() {
    this.clearAndFocusInput()
  }

  add (event) {
    event.preventDefault()

    if (this.newTaskTarget.value === '') return

    this.addTask(this.newTaskTarget.value)

    this.clearAndFocusInput()
  }

  clearAndFocusInput() {
    this.newTaskTarget.value = ''
    this.newTaskTarget.focus()
  }

  addTask(taskContent) {
    const newTaskNode = this.nodeFromTemplate(this.taskTemplateTarget)

    newTaskNode.querySelector(TASK_DESCRIPTION_SELECTOR).textContent = this.newTaskTarget.value

    this.element.appendChild(newTaskNode)
  }

  nodeFromTemplate(target) {
    return target.content.cloneNode(true)
  }
}
