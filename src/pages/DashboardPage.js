import {Page} from '@core/Page'
import {$} from '@core/Dom'
import {createDashboardTable} from '@/pages/dashboard.functions'

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    return $.create('div', 'dashboard').html(`
      <header class="dashboard__header">
        <h1>Excel</h1>
      </header>

      <div class="dashboard__new">
        <a class="dashboard__create" href="#excel/${now}">
          Create new table
        </a>
      </div>

      <div class="dashboard__table">
        ${createDashboardTable()}
      </div>`
    )
  }
}
