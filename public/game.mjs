import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const ids = []

var canvas = document.getElementById("game-window");
var context = canvas.getContext("2d");

const player = new Player(310, 200, 200, 100, 0, 0)

document.addEventListener('keydown', (event) => {
  var name = event.key;
  var code = event.code;
  if (name == 'ArrowLeft') {
    player.movePlayer('x', -50)
    socket.emit('chat message', player.x);
  } else if (name == 'ArrowRight'){
    player.movePlayer('x', 50)
    socket.emit('chat message', player.y);
  }  else if (name == 'ArrowUp')  {
    player.movePlayer('y', -50)
    socket.emit('chat message', player.y);
  }  else if (name == 'ArrowDown')  {
    player.movePlayer('y', 50)
    socket.emit('chat message', player.y);
  }  else  
  {
    alert(`${name} \n Key code Value: ${code}`);
  }
}, false);

function collision_item_draw(one, two)  {
context.clearRect(0,0,canvas.width,canvas.height);
context.beginPath();
context.arc(one, two, 10, 0, 2 * Math.PI);
context.strokeStyle = '#ff0000';
context.stroke()
}
var num = 200
var num_y = 100

function draw(num, num_y, score)  {
context.clearRect(0,0,canvas.width,canvas.height);

context.beginPath();
context.arc(player.c_x, player.c_y, 10, 0, 2 * Math.PI);
context.strokeStyle = '#ff0000';
context.stroke()


if (player.x > (player.c_x - 25) && player.x < (player.c_x + 25) && player.y > (player.c_y - 25) && player.y < (player.c_y + 25))  {
  alert(`Same!, ${player.c_x}, ${player.c_y}, ${player.score}, ${player.id}, ${JSON.stringify(ids)}`)
  player.collision(0)
  score++
  socket.emit('chat message', player.c_x, player.c_y);
  collision_item_draw(player.c_x, player.c_y)
}

context.beginPath();
context.arc(player.x, player.y, 20, 0, 2 * Math.PI);
context.strokeStyle = '#ff0000';
context.stroke()

document.getElementById("score").innerHTML =     player.calculateRank(ids)
}


draw(num, num_y, score)


socket.on('chat message', function(msg) {
  player.id = socket.id
  //let index = ids.indexOf(socket.id)
  let obj = ids.find((o, i) => {
      if (o.name === socket.id) {
          ids[i] = { name: socket.id, value: player.score };
          return true; // stop searching
      }
    
  });
  
  if (obj == undefined)  {
    ids.push({name: socket.id, value: player.score})
    }
  draw(num, num_y, score)
  });
