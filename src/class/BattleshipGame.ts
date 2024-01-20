type ShipType = {
  size: number;
  count: number;
};

type ShipTypes = {
  [key: string]: ShipType;
};

export type ShipDetails = {
  id: number;
  type: string;
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
  private static _instance: BattleshipGame;
  private _shipIdCounter: number = 1;
  private _boardSize: number;
  private _board: number[];
  private _shipTypes: ShipTypes;
  private _shipDetailsMap: Map<number, ShipDetails>;

  onBoardChange: (board: number[]) => void = () => {};
  onShipDetailsChange: (shipDetails: ShipDetails[]) => void = () => {};
  onShipSunk: (shipId: number) => void = () => {};
  onShipHit: (shipId: number) => void = () => {};
  onAllShipsSunk: () => void = () => {};

  public static getInstance() {
    if (!BattleshipGame._instance)
      BattleshipGame._instance = new BattleshipGame();
    return BattleshipGame._instance;
  }

  // Private Methods and Constructor (Singleton) --------------------------------

  private constructor() {
    this._boardSize = 10;
    this._shipTypes = {};
    this._board = Array(this._boardSize * this._boardSize).fill(0);
    this._shipDetailsMap = new Map();
    this.placeShips();
  }

  private placeShips() {
    for (const ship in this._shipTypes) {
      for (let i = 0; i < this._shipTypes[ship].count; i++) {
        this.placeShip(ship);
      }
    }
  }

  private placeShip(ship: string) {
    const size = this._shipTypes[ship].size;
    const triedCoordinates: Set<string> = new Set();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const horizontal = Math.random() >= 0.5;
      const maxRow = horizontal ? this._boardSize : this._boardSize - size;
      const maxCol = horizontal ? this._boardSize - size : this._boardSize;
      const row = Math.floor(Math.random() * maxRow);
      const col = Math.floor(Math.random() * maxCol);
      const coordinateKey = `${row},${col},${horizontal}`;

      if (
        !triedCoordinates.has(coordinateKey) &&
        this.canPlaceShip(row, col, size, horizontal)
      ) {
        const shipId = this._shipIdCounter++;
        this.placeShipOnBoard(row, col, size, horizontal, shipId);
        this.updateShipMap(row, col, horizontal, shipId, ship, size);
        // placed = true;
        break;
      } else {
        triedCoordinates.add(coordinateKey);

        if (triedCoordinates.size === maxRow * maxCol * 2) {
          throw new Error("Failed to find a valid position for the ship");
        }
      }
    }
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
        r >= this._boardSize ||
        c >= this._boardSize ||
        this._board[r * this._boardSize + c] !== 0
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
      this._board[r * this._boardSize + c] = shipId;
    }
  }

  private updateShipMap(
    row: number,
    col: number,
    horizontal: boolean,
    shipId: number,
    type: string,
    size: number,
  ) {
    const positions: Array<number> = [];
    for (let i = 0; i < size; i++) {
      const position = horizontal
        ? row * this._boardSize + (col + i)
        : (row + i) * this._boardSize + col;
      positions.push(position);
    }
    this._shipDetailsMap.set(shipId, {
      id: shipId,
      hits: 0,
      type,
      size,
      positions,
      horizontal,
    });
  }

  // Getters and Setters --------------------------------------------------------

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

  /**
   * Retrieves a copy of the current board size from the BattleshipGame instance.
   */
  get boardSize() {
    return this._boardSize;
  }

  /**
   * Retrieves a copy of the current ship details from the BattleshipGame instance.
   * This getter method is designed to prevent external mutation of the ship details,
   */
  get shipDetails() {
    return Array.from(this._shipDetailsMap.values()).map((ship) => ({
      ...ship,
    }));
  }

  // Public Methods -------------------------------------------------------------

  public init(config: Partial<BattleshipGameConfig> = {}) {
    this._boardSize = config.boardSize ?? this._boardSize;
    this._shipTypes = config.shipTypes ?? this._shipTypes;
    this._board = Array(this._boardSize * this._boardSize).fill(0);
    this._shipDetailsMap = new Map();
    this._shipIdCounter = 1;
    this.placeShips();
  }

  public reset = () => {
    this.init();
    this.onBoardChange(this.board);
    this.onShipDetailsChange(this.shipDetails);
  };

  public attack = (index: number) => {
    if (index < 0 || index >= this._board.length) return;
    if (this._board[index] === -1 || this._board[index] === -2) return;

    const shipId = this._board[index];
    const ship = this._shipDetailsMap.get(shipId);

    if (!ship) {
      this._board[index] = -1;
    } else {
      this._board[index] = -2;
      ship.hits++;
      this.onShipHit(shipId);
      if (ship.hits === ship.size) this.onShipSunk(shipId);
      if (this.isAllShipsSunk()) this.onAllShipsSunk();
    }

    this.onBoardChange(this.board);
  };

  public isAllShipsSunk() {
    return Array.from(this._shipDetailsMap.values()).every(
      (ship) => ship.hits === ship.size,
    );
  }

  public displayBoard() {
    for (let row = 0; row < this._boardSize; row++) {
      let rowDisplay = "";
      for (let col = 0; col < this._boardSize; col++) {
        rowDisplay +=
          this._board[row * this._boardSize + col].toString().padStart(2, "0") +
          " ";
      }
      console.log(rowDisplay, "row:", row);
    }
  }

  public displayShipMap() {
    console.log(this._shipDetailsMap);
  }
}
