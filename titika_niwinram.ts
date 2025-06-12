function getMinMove(start: string, target: string, brokenTiles: string[]): number {
  const directions = [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1]
  ];

  const isValid = (x: number, y: number) => {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  };

  const posToCoord = (pos: string): [number, number] => {
    const col = pos.charCodeAt(0) - 'a'.charCodeAt(0);
    const row = 8 - parseInt(pos[1]);
    return [row, col];
  };

  const [startX, startY] = posToCoord(start);
  const [targetX, targetY] = posToCoord(target);

  const broken = new Set(brokenTiles.map(tile => tile));
  const visited = Array.from({ length: 8 }, () => Array(8).fill(false));
  const queue: [number, number, number][] = [[startX, startY, 0]];

  visited[startX][startY] = true;

  while (queue.length > 0) {
    const [x, y, moves] = queue.shift()!;
    const pos = String.fromCharCode('a'.charCodeAt(0) + y) + (8 - x);
    if (pos === target) return moves;
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      const nextPos = String.fromCharCode('a'.charCodeAt(0) + ny) + (8 - nx);
      if (
        isValid(nx, ny) && !visited[nx][ny] && !broken.has(nextPos)
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny, moves + 1]);
      }
    }
  }
  
  return -1;
}

console.log(getMinMove('d6', 'h8', ['f6', 'f7']));