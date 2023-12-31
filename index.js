const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "https://svelte-quizzer.vercel.app",
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  // 玩家參加遊戲時
  socket.on("joinGame", (message) => {
    console.log("a player connected.", message)
    // 轉發消息給 host
    io.emit("hostMessage", message)
  })

  // host 使遊戲開始時
  socket.on("gameStart", (message) => {
    console.log("a game start:", message)
    // 轉發消息給玩家
    io.emit("playersMessage", message)
  })

  // 玩家回答時
  socket.on("playerAnswer", (message) => {
    console.log("a player answer:", message)
    // 轉發消息給 host
    io.emit("hostMessage", message)
  })

  // 主持人將題目切換（分數、題目）
  socket.on("switchQuestion", (message) => {
    console.log("question now:", message)
    // 轉發消息給玩家
    io.emit("playerMessage", message)
  })

  // 玩家搶答時
  socket.on("playerQuickAnswer", (message) => {
    console.log("answer player:", message)
    // 轉發消息給 host
    io.emit("hostMessage", message)
  })

  // 主持人將遊戲結束、終止
  socket.on("gameStop", (message) => {
    console.log("game stop:", message)
    // 轉發消息給玩家
    io.emit("playerMessage", message)
  })
})

server.listen(4040, () => {
  console.log("listening on *:4040")
})
