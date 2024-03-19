const users = {}

module.exports =  function userHandlers(io, socket) {
  // извлекаем идентификатор комнаты и имя пользователя из объекта сокета
  const { chatId, userId } = socket

  // инициализируем хранилище пользователей
  if (!users[chatId]) {
    users[chatId] = []
  }
  
  // утилита для обновления списка пользователей
  const updateUserList = () => {
    // сообщение получают только пользователи, находящиеся в комнате
    io.to(chatId).emit('user_list:update', users[chatId])
  }

  // обрабатываем подключение нового пользователя
  socket.on('user:add', async (user) => {
    // сообщаем другим пользователям об этом
    socket.to(chatId).emit('log', `User ${userId} connected`)

    // записываем идентификатор сокета пользователя
    user.socketId = socket.id

    // записываем пользователя в хранилище
    users[chatId].push(user)

    // обновляем список пользователей
    updateUserList()
  })

  // обрабатываем отключения пользователя
  socket.on('disconnect', () => {
    if (!users[chatId]) return

    // сообщаем об этом другим пользователям
    socket.to(chatId).emit('log', `User ${userName} disconnected`)

    // удаляем пользователя из хранилища
    users[chatId] = users[chatId].filter((u) => u.socketId !== socket.id)

    // обновляем список пользователей
    updateUserList()
  })
}