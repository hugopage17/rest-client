const express = require('express')
const app = express()
const port = 4000

var data = [
  {id:1, name:'Tom', age:23}
]

data = JSON.stringify(data)

app.get('/', (req, res) => res.send(data))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
