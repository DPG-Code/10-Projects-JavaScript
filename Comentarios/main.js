const comments = []

const inputContainer = document.createElement('div')
const input = document.createElement('input')
const commentsContainer = document.querySelector('#comments-container')

input.classList.add('input')

input.addEventListener('keydown', e => {
    handleEnter(e, null)
})

commentsContainer.appendChild(inputContainer)
inputContainer.appendChild(input)

function handleEnter (e, current) {
    if (e.key === 'Enter' && e.target.value !== '') {
        const newComment = {
            text : e.target.value,
            likes : 0,
            responses : []
        }

        if (current === null) {
            comments.unshift(newComment)
        }
        else {
            current.responses.unshift(newComment)
        }

        e.target.value = ''
        commentsContainer.innerHTML = ''
        commentsContainer.appendChild(inputContainer)

        renderComments(comments, commentsContainer)
    }
}

function renderComments (arr, parent) {
    arr.forEach(element => {
        const commentContainer = document.createElement('div')
        commentContainer.classList.add('comment-container')

        const responsesContainer = document.createElement('div')
        responsesContainer.classList.add('responses-container')

        const replyButton = document.createElement('button')
        replyButton.classList.add('reply')
        const likeButton = document.createElement('button')
        likeButton.classList.add('like')

        const textContainer = document.createElement('div')
        textContainer.classList.add('text-coment')
        textContainer.textContent = element.text

        const actionsContainer = document.createElement('div')

        replyButton.textContent = 'Reply'
        likeButton.textContent = `${element.likes > 0 ? `${element.likes} likes` : 'Like'}`

        replyButton.addEventListener('click', (e) => {
            const newInput = inputContainer.cloneNode(true) //clonar de forma profunda
            newInput.value = ''
            newInput.focus()
            newInput.addEventListener('keydown', (e) => {
                handleEnter(e, element)
            })
            commentContainer.insertBefore(newInput, responsesContainer)
        })

        likeButton.addEventListener('click', e => {
            element.likes++
            likeButton.textContent = `${element.likes > 0 ? `${element.likes} likes` : 'Like'}`
        })

        //apend
        commentContainer.appendChild(textContainer)
        commentContainer.appendChild(actionsContainer)
        actionsContainer.appendChild(replyButton)
        actionsContainer.appendChild(likeButton)
        commentContainer.appendChild(responsesContainer)

        if (element.responses.length > 0) { //recursividad, loop de funcion mientras se cumpla
            renderComments(element.responses, responsesContainer)
        }
        parent.appendChild(commentContainer)
    });
}