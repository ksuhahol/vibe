// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  const attempts = window.reportData.attempts

  if (filter === 'all') {
    return attempts
  }

  if (filter === 'passed') {
    return attempts.filter((attempt) => attempt.passed === true)
  }

  if (filter === 'failed') {
    return attempts.filter((attempt) => attempt.passed === false)
  }
}



function renderAttempts(attempts, resultList = document.querySelector('#result-list')) {
  let html = ''

  attempts.forEach((attempt) => {
    html += `
      <li class="result-item">
        <span class="result-name">${escapeHtml(attempt.name)}</span>
        <span>${attempt.score} из ${attempt.questionCount} (${attempt.percentage}%)</span>
      </li>
    `
  })

  resultList.innerHTML = html
}



function startFilter() {
  const form = document.querySelector('#filter-form')
  const select = document.querySelector('#filter')
  const resultCount = document.querySelector('#result-count')
  const resultList = document.querySelector('#result-list')

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const filter = select.value
    const filteredAttempts = selectAttempts(filter)

    renderAttempts(filteredAttempts, resultList)

    resultCount.textContent =
      `Показано: ${filteredAttempts.length} из ${window.reportData.attempts.length}`
  })
}

startFilter()

