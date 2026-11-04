const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]
}`;


let data;

try {
    data = JSON.parse(sourceJson);
} catch (error) {
    const dataError = document.querySelector('#data-error');
    dataError.hidden = false;
    dataError.innerHTML = "Ошибка данных.";

    document.querySelector('#service-form').hidden = true;
    document.querySelector('#show-program').hidden = true;
}


function buildReport(services, guideChecked, audioChecked, catalogChecked) {
  const selectedServices = services.filter(function(service) {
    return (
        (service.id === 'guide' && guideChecked) ||
        (service.id === 'audio' && audioChecked) ||
        (service.id === 'catalog' && catalogChecked)
      );
});
  const items = selectedServices.map(function(service) {
    const { title: rawTitle, price } = service;
    const title = rawTitle.trim();

    return {
        title: title,
        price: price
    };

});

  const total = items.reduce(function(sum, item) {
    return sum + item.price;
}, 0);

return {
    count: items.length,
    total: total,
    items: items
};
}

const showProgramButton = document.querySelector('#show-program');
const program = document.querySelector('#program');

showProgramButton.addEventListener('click', function() {
    program.hidden = false;
    program.innerHTML = data.event.meeting;
});

const serviceForm = document.querySelector('#service-form');
const guide = document.querySelector('#guide');
const audio = document.querySelector('#audio');
const catalog = document.querySelector('#catalog');
const choiceError = document.querySelector('#choice-error');
const result = document.querySelector('#result');
const reportJson = document.querySelector('#report-json');

serviceForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const report = buildReport(
        data.services,
        guide.checked,
        audio.checked,
        catalog.checked
    );

    if (report.count === 0) {
    choiceError.hidden = false;
    choiceError.innerHTML = 'Выберите хотя бы одну услугу.';
    result.hidden = true;
    reportJson.hidden = true;
    return;
    }
    choiceError.hidden = true;

    result.hidden = false;
    result.innerHTML = `
      <p>Выбрано услуг: ${report.count}</p>
      <p>Итого: ${report.total} руб.</p>
      <ul>
          ${report.items.map(function(item) {
              return `<li>${item.title} — ${item.price} руб.</li>`;
          }).join('')}
      </ul>
      `;

      const jsonString = JSON.stringify(report);

      reportJson.hidden = false;
      reportJson.textContent = jsonString;

});

