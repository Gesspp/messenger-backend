const { Message } = require('../../models/message.js');
const onError = require("../onErrors.js");

// "хранилище" для сообщений
const messages = {}

module.exports =  function messageHandlers(io, socket) {
  // извлекаем идентификатор комнаты
  const { chatId } = socket

  // утилита для обновления списка сообщений
  const updateMessageList = () => {
    io.to(chatId).emit('message_list:update', messages[chatId])
  }

  // обрабатываем получение сообщений
  socket.on('message:get', async () => {
    try {
      // получаем сообщения по `id` комнаты
      const _messages = await Message.find({
        chat : chatId
      })
      // инициализируем хранилище сообщений
      messages[chatId] = _messages

      // обновляем список сообщений
      updateMessageList()
    } catch (e) {
      onError(e)
    }
  })

  // обрабатываем создание нового сообщения
  socket.on('message:add', (message) => {
    // пользователи не должны ждать записи сообщения в БД
    Message.create(message).catch(onError)

    // это нужно для клиента
    message.createdAt = Date.now()

    // создаем сообщение оптимистически,
    // т.е. предполагая, что запись сообщения в БД будет успешной
    messages[chatId].push(message)

    // обновляем список сообщений
    updateMessageList()
  })

  // обрабатываем удаление сообщения
  socket.on('message:remove', (message) => {
    const { messageId, messageType, textOrPathToFile } = message

    // пользователи не должны ждать удаления сообщения из БД
    // и файла на сервере (если сообщение является файлом)
    Message.deleteOne({ messageId })
      .then(() => {
        if (messageType !== 'text') {
          removeFile(textOrPathToFile)
        }
      })
      .catch(onError)

    // удаляем сообщение оптимистически
    messages[chatId] = messages[chatId].filter((m) => m.messageId !== messageId)

    // обновляем список сообщений
    updateMessageList()
  })
}