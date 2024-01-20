type ShipType = {
  size: number;
  count: number;
};

type ShipTypes = {
  [key: string]: ShipType;
};

type ShipDetails = {
  hits: number;
  size: number;
  positions: Array<number>;
  horizontal: boolean;
};

type BattleshipGameConfig = {
  boardSize?: number;
  shipTypes: ShipTypes;
};

export class BattleshipGame {
  private static instance: BattleshipGame;
  private shipIdCounter: number = 1;
  private boardSize: number;
  private _board: number[];
  private shipTypes: ShipTypes;
  private shipMap: Map<number, ShipDetails>;

  public static getInstance() {
    if (!BattleshipGame.instance)
      BattleshipGame.instance = new BattleshipGame();
    return BattleshipGame.instance;
  }

  /**
   * Retrieves a copy of the current game board from the BattleshipGame instance.
   * This getter method is designed to prevent external mutation of the game board,
   * ensuring game integrity. The game board is represented as an array of numbers,
   * each indicating the status of a particular board cell.
   *
   * The values in the array represent the following:
   * - Positive Integer: Indicates the presence of a ship, identified by its unique ship ID.
   * - 0: Represents an empty cell, with no ship present.
   * - -1: Indicates a cell where a ship has been hit.
   * - -2: Represents a miss, indicating an attempted hit where no ship was present.
   *
   * @returns {number[]} A copy of the current game board as an array of numbers.
   * @memberof BattleshipGame
   * @description This method is crucial for accessing the game board state without
   * altering the original board data within the BattleshipGame instance.
   */
  get board(): number[] {
    return this._board.slice();
  }

  private constructor() {
    this.boardSize = 10;
    this.shipTypes = {};
    this._board = Array(this.boardSize * this.boardSize).fill(0);
    this.shipMap = new Map();
    this.placeShips();
  }

  public init(config: Partial<BattleshipGameConfig> = {}) {
    this.boardSize = config.boardSize ?? this.boardSize;
    this.shipTypes = config.shipTypes ?? this.shipTypes;
    this._board = Array(this.boardSize * this.boardSize).fill(0);
    this.shipMap = new Map();
    this.shipIdCounter = 1;
    this.placeShips();
  }

  private placeShips() {
    for (const ship in this.shipTypes) {
      for (let i = 0; i < this.shipTypes[ship].count; i++) {
        this.placeShip(this.shipTypes[ship].size);
      }
    }
  }

  private placeShip(size: number) {
    const triedCoordinates: Set<string> = new Set();
    let placed = false;

    while (!placed) {
      const horizontal = Math.random() >= 0.5;
      const maxRow = horizontal ? this.boardSize : this.boardSize - size;
      const maxCol = horizontal ? this.boardSize - size : this.boardSize;
      const row = Math.floor(Math.random() * maxRow);
      const col = Math.floor(Math.random() * maxCol);
      const coordinateKey = `${row},${col},${horizontal}`;

      if (
        !triedCoordinates.has(coordinateKey) &&
        this.canPlaceShip(row, col, size, horizontal)
      ) {
        const shipId = this.shipIdCounter++;
        this.placeShipOnBoard(row, col, size, horizontal, shipId);
        this.updateShipMap(shipId, size, row, col, horizontal);
        placed = true;
      } else {
        triedCoordinates.add(coordinateKey);

        if (triedCoordinates.size === maxRow * maxCol * 2) {
          throw new Error("Failed to find a valid position for the ship");
        }
      }
    }
  }

  private updateShipMap(
    shipId: number,
    size: number,
    row: number,
    col: number,
    horizontal: boolean,
  ) {
    const positions: Array<number> = [];
    for (let i = 0; i < size; i++) {
      const position = horizontal
        ? row * this.boardSize + (col + i)
        : (row + i) * this.boardSize + col;
      positions.push(position);
    }
    this.shipMap.set(shipId, { hits: 0, size, positions, horizontal });
  }

  private canPlaceShip(
    row: number,
    col: number,
    size: number,
    horizontal: boolean,
  ): boolean {
    for (let i = 0; i < size; i++) {
      const r = row + (horizontal ? 0 : i);
      const c = col + (horizontal ? i : 0);
      if (
        r >= this.boardSize ||
        c >= this.boardSize ||
        this._board[r * this.boardSize + c] !== 0
      ) {
        return false;
      }
    }
    return true;
  }

  private placeShipOnBoard(
    row: number,
    col: number,
    size: number,
    horizontal: boolean,
    shipId: number,
  ) {
    for (let i = 0; i < size; i++) {
      const r = row + (horizontal ? 0 : i);
      const c = col + (horizontal ? i : 0);
      this._board[r * this.boardSize + c] = shipId;
    }
  }

  public attack(index: number) {
    const shipId = this._board[index];
    const ship = this.shipMap.get(shipId);

    if (!ship) {
      this._board[index] = -1;
      return false;
    }

    ship.hits++;
    this._board[index] = -2;
    return true;
  }

  public displayBoard() {
    for (let row = 0; row < this.boardSize; row++) {
      let rowDisplay = "";
      for (let col = 0; col < this.boardSize; col++) {
        rowDisplay +=
          this._board[row * this.boardSize + col].toString().padStart(2, "0") +
          " ";
      }
      console.log(rowDisplay, "row:", row);
    }
    console.log(this.shipMap);
  }
}
