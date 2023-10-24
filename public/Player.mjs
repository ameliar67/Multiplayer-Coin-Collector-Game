class Player {
  constructor(x, y, c_x, c_y, score, id) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
    this.c_x = c_x;
    this.c_y = c_y;
  }

  movePlayer(dir, speed) {
    if (dir == 'x')  {
   this.x = this.x + speed
    } else  {
   this.y = this.y + speed
  }
  }

  collision(item) {
    this.c_x = Math.floor(Math.random() * (400-100) + 100);
    this.c_y = Math.floor(Math.random() * (400-100) + 100);
    this.score = this.score + 1
  }

  calculateRank(arr) {
    var length = arr.length
    let sorted = arr.sort((p1, p2) => (p1.value > p2.value) ? 1 : (p1.value < p2.value) ? -1 : 0);
    var idd = this.id
    var sscore = this.score
    var result = 0

    var i;
    for (i = 0; i < arr.length; i++)  {
      if(arr[i].name == idd && arr[i].value > 0)  {
        result = i
        result++
        break
      }
    }
    return `Rank: ${result}/${length}`
  }
}

export default Player;
