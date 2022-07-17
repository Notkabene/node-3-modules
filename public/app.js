document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id

    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  }
  if (event.target.dataset.type === 'update') {

    const id = event.target.dataset.id
    console.log("app update ID", id)
    const newTitle = prompt('Введите новое название')

    update(id, newTitle).then(() => {
      event.target.closest('li').querySelector('span').innerText = newTitle
    })
  }
})


async function remove(id) {
  await fetch(`/${id}`, {method: 'DELETE'})
}
async function update(id, newTitle) {
  await fetch(`/${id}/${newTitle}`, {method: 'PUT'})
}