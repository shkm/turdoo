import { Controller } from '@hotwired/stimulus'
import { v4 as uuidv4 } from 'uuid';
import { savedTasks, saveTask, unsaveTask } from '../task_store'

const TASK_SELECTOR = '.task'
const TASK_DESCRIPTION_SELECTOR = '.description'

const STATUS_COMPLETE = 'complete'
const STATUS_INCOMPLETE = 'incomplete'

export default class TodoController extends Controller {
  static targets = ["newTask", "incompleteTaskTemplate", "completeTaskTemplate", "incompleteTasks", "completeTasks"]

  connect() {
    this.clearAndFocusInput()
    this.populateSavedTasks()
  }

  add (event) {
    event.preventDefault()

    if (this.newTaskTarget.value === '') return

    const task = this.buildTask(STATUS_INCOMPLETE, this.newTaskTarget.value)
    saveTask(task)

    this.addTaskToDom(task)
    this.clearAndFocusInput()
  }

  remove (event) {
    const currentTaskNode = this.currentTaskFromEvent(event)

    unsaveTask(currentTaskNode.dataset.key)

    currentTaskNode.remove()
  }

  complete (event) {
    const currentTaskNode = this.currentTaskFromEvent(event)
    const content = currentTaskNode.querySelector(TASK_DESCRIPTION_SELECTOR).textContent
    const id = currentTaskNode.dataset.key

    unsaveTask(id)
    currentTaskNode.remove()

    const task = this.buildTask(STATUS_COMPLETE, content, id)
    saveTask(task)
    this.addTaskToDom(task)
  }

  populateSavedTasks() {
    savedTasks().forEach(task => { this.addTaskToDom(task) })
  }

  currentTaskFromEvent (event) {
    return event.currentTarget.closest(TASK_SELECTOR)
  }

  clearAndFocusInput() {
    this.newTaskTarget.value = ''
    this.newTaskTarget.focus()
  }

  addTaskToDom(task) {
    const newTaskNode = this.nodeFromTemplate(this.template(task))

    newTaskNode.dataset.key = task.id
    newTaskNode.dataset.status = task.status
    newTaskNode.querySelector(TASK_DESCRIPTION_SELECTOR).textContent = task.content

    this.parentTarget(task).appendChild(newTaskNode)
  }

  template(task) {
    switch (task.status) {
      case STATUS_COMPLETE:
        return this.completeTaskTemplateTarget
      case STATUS_INCOMPLETE:
        return this.incompleteTaskTemplateTarget
    }
  }

  parentTarget(task) {
    switch (task.status) {
      case STATUS_COMPLETE:
        return this.completeTasksTarget
      case STATUS_INCOMPLETE:
        return this.incompleteTasksTarget
    }
  }

  buildTask(status, content, id = uuidv4()) {
    return { id, status, content }
  }

  nodeFromTemplate(target) {
    return target.content.firstElementChild.cloneNode(true)
  }
}
