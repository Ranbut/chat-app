const io = require('socket.io')(3000) // create server

const users = {}


io.on('conectar', socket => {

  socket.on('novo-usuario', name => {
    users[socket.id] = name
    socket.broadcast.emit('usuario-conectado', name)
  })

  //socket.emit('chat-message', 'hello world')
  socket.on('enviar-chat', data => {

    socket.broadcast.emit('messagem-recebida', {data: data, user: users[socket.id]})
  })

  socket.on('desconectado', ()=> {
    socket.broadcast.emit('desconectado-usuario', users[socket.id])
    delete users[socket.id]
  })
})