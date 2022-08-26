const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

user = prompt('Novo Usuário')
addMessage('Você entrou!')

socket.emit('novo-usuario', user)

socket.on('usuario-conectado', name => {
  addMessage(`${name} conectado!`)
})

socket.on('messagem-recebida', data => {
  addMessage(`${data.user}: ${data.data}`)
})

socket.on('novo-usuario', name => {
  addMessage(name)
})

socket.on('desconectado-usuario', user => {
  addMessage(`${user} desconectado!`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  message = `${messageInput.value}`
  addMessage(`Você: ${message}`)
  socket.emit('enviar-chat', message)
  messageInput.value = ''

})

function addMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}