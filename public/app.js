document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id

    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  }

  if (event.target.dataset.type === 'update') {
    const id = event.target.dataset.id
    const noteSpan = event.target.closest('li').querySelector('.note-span')
    const noteForm = event.target.closest('li').querySelector('.note-form')
    noteSpan.classList.add('d-none')
    noteForm.classList.remove('d-none')
  }

  if (event.target.dataset.type === 'cancel') {
    const id = event.target.dataset.id
    const noteSpan = event.target.closest('li').querySelector('.note-span')
    const noteForm = event.target.closest('li').querySelector('.note-form')
    noteSpan.classList.remove('d-none')
    noteForm.classList.add('d-none')
  }

  if (event.target.dataset.type === 'save') {
    const id = event.target.dataset.id
    const noteSpan = event.target.closest('li').querySelector('.note-span')
    const noteForm = event.target.closest('li').querySelector('.note-form')
    const newTitle = noteForm.querySelector('.new-title').value

    console.log(newTitle)

    update(id, newTitle).then(() => {
      event.target.closest('li').querySelector('.note-name').innerText = newTitle
      noteSpan.classList.remove('d-none')
      noteForm.classList.add('d-none')
    })
  }
})


async function remove(id) {
  await fetch(`/${id}`, {method: 'DELETE'})
}

async function update(id, newTitle) {
  await fetch(`/${id}/${newTitle}`, {method: 'PUT'})
}