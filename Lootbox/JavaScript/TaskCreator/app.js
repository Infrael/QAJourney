const prioritySelectorData = [
    {value: 1, label: 'Skubu'},
    {value: 2, label: 'Nelabai'},
    {value: 3, label: 'Nesvarbu'}
];

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

const renderPrioritySelectorData = _ => {
    let html = '';
    const selector = document.querySelector('[data-task-priority]');
    prioritySelectorData.forEach(option => {
        html += `<option value="${option.value}">${option.label}</option>`;
    });
    selector.innerHTML = html;
};

renderPrioritySelectorData();
// const renderAddTask = _ => {

// };

// const init = _ => {
//     const addButton = document.querySelector('[data-task-add]');
//     addButton.addEventListener('click', renderAddTask);

//     renderPrioritySelectorData();
// };

// init();