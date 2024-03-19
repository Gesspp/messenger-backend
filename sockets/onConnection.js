const userHandlers = require('./handlers/user.handlers.js');
const messageHandlers = require('./handlers/message.handlers.js');

module.exports = function onConnection(io, socket) {
  // извлекаем идентификатор комнаты и имя пользователя
  const { roomId, userName } = socket.handshake.query

  console.log("roomId", roomId)
  // записываем их в объект сокета
  socket.roomId = roomId
  socket.userName = userName

  // присоединяемся к комнате
  socket.join(roomId)

  // регистрируем обработчики для пользователей
  userHandlers(io, socket)

  // регистрируем обработчики для сообщений
  messageHandlers(io, socket)
}