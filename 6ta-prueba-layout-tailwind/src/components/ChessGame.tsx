import { useMemo, useRef, useState } from 'react';

type Piece =
  | 'K' | 'Q' | 'R' | 'B' | 'N' | 'P'   // White
  | 'k' | 'q' | 'r' | 'b' | 'n' | 'p'   // Black
  | '.';

const UNICODE_MAP: Record<Exclude<Piece, '.'>, string> = {
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
  k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟',
};

function initialBoard(): Piece[][] {
  return [
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['P','P','P','P','P','P','P','P'],
    ['R','N','B','Q','K','B','N','R'],
  ] as Piece[][];
}

function describePiece(p: Exclude<Piece, '.'>): string {
  const color = p === p.toLowerCase() ? 'negra' : 'blanca';
  const kind =
    p.toLowerCase() === 'k' ? 'rey' :
    p.toLowerCase() === 'q' ? 'reina' :
    p.toLowerCase() === 'r' ? 'torre' :
    p.toLowerCase() === 'b' ? 'alfil' :
    p.toLowerCase() === 'n' ? 'caballo' :
    'peón';
  return `${kind} ${color}`;
}

// Helpers
const inBounds = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;
const isEmpty = (b: Piece[][], r: number, c: number) => b[r][c] === '.';
const isWhite = (p: Exclude<Piece, '.'>) => p === p.toUpperCase();
const sameColor = (a: Exclude<Piece, '.'>, b: Exclude<Piece, '.'>) =>
  isWhite(a) === isWhite(b);

function pathClear(b: Piece[][], r1: number, c1: number, r2: number, c2: number): boolean {
  const dr = Math.sign(r2 - r1);
  const dc = Math.sign(c2 - c1);
  let r = r1 + dr;
  let c = c1 + dc;
  while (r !== r2 || c !== c2) {
    if (!isEmpty(b, r, c)) return false;
    r += dr;
    c += dc;
  }
  return true;
}

function legalMoveForPiece(
  b: Piece[][],
  piece: Exclude<Piece, '.'>,
  from: { r: number; c: number },
  to: { r: number; c: number }
): boolean {
  if (!inBounds(to.r, to.c)) return false;
  const target = b[to.r][to.c];
  if (target !== '.' && sameColor(piece, target as Exclude<Piece, '.'>)) return false;

  const dr = to.r - from.r;
  const dc = to.c - from.c;
  const adr = Math.abs(dr);
  const adc = Math.abs(dc);

  switch (piece.toLowerCase()) {
    case 'n': {
      // Knight: L-shape
      return (adr === 2 && adc === 1) || (adr === 1 && adc === 2);
    }
    case 'k': {
      // King: one square any direction (no castling)
      return adr <= 1 && adc <= 1 && (adr + adc > 0);
    }
    case 'r': {
      // Rook: straight lines with clear path
      if (dr !== 0 && dc !== 0) return false;
      return pathClear(b, from.r, from.c, to.r, to.c);
    }
    case 'b': {
      // Bishop: diagonal with clear path
      if (adr !== adc) return false;
      return pathClear(b, from.r, from.c, to.r, to.c);
    }
    case 'q': {
      // Queen: rook or bishop move
      if (dr === 0 || dc === 0 || adr === adc) {
        return pathClear(b, from.r, from.c, to.r, to.c);
      }
      return false;
    }
    case 'p': {
      // Pawn: basic rules only (no en passant, no promotion auto)
      const white = isWhite(piece);
      const dir = white ? -1 : 1; // white moves up (towards row 0), black moves down (towards row 7)
      const startRow = white ? 6 : 1;
      // forward move
      if (dc === 0) {
        // one step
        if (dr === dir && isEmpty(b, to.r, to.c)) return true;
        // two steps from start
        if (from.r === startRow && dr === 2 * dir) {
          const midR = from.r + dir;
          if (isEmpty(b, midR, to.c) && isEmpty(b, to.r, to.c)) return true;
        }
        return false;
      } else if (adc === 1 && dr === dir) {
        // capture
        if (target !== '.' && !sameColor(piece, target as Exclude<Piece, '.'>)) return true;
        return false;
      }
      return false;
    }
    default:
      return false;
  }
}

export default function ChessGame() {
  const size = 8;
  const [board, setBoard] = useState<Piece[][]>(() => initialBoard());
  const [dragging, setDragging] = useState<{
    from: { r: number; c: number } | null;
    piece: Exclude<Piece, '.'> | null;
    offsetX: number;
    offsetY: number;
    x: number;
    y: number;
  }>({
    from: null,
    piece: null,
    offsetX: 0,
    offsetY: 0,
    x: 0,
    y: 0,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cellSize = 64;

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    r: number,
    c: number
  ) => {
    const piece = board[r][c];
    if (piece === '.') return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const rect = containerRef.current?.getBoundingClientRect();
    const startX = e.clientX - (rect?.left ?? 0);
    const startY = e.clientY - (rect?.top ?? 0);
    const originX = c * cellSize + cellSize / 2;
    const originY = r * cellSize + cellSize / 2;

    setDragging({
      from: { r, c },
      piece: piece as Exclude<Piece, '.'>,
      offsetX: startX - originX,
      offsetY: startY - originY,
      x: startX,
      y: startY,
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.piece) return;
    const rect = containerRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left ?? 0);
    const y = e.clientY - (rect?.top ?? 0);
    setDragging((d) => ({ ...d, x, y }));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.piece || !dragging.from) return;

    const rect = containerRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left ?? 0);
    const y = e.clientY - (rect?.top ?? 0);

    const dropCol = Math.min(size - 1, Math.max(0, Math.floor(x / cellSize)));
    const dropRow = Math.min(size - 1, Math.max(0, Math.floor(y / cellSize)));

    const { from, piece } = dragging;

    if (legalMoveForPiece(board, piece, { r: from.r, c: from.c }, { r: dropRow, c: dropCol })) {
      setBoard((prev) => {
        const next = prev.map((row) => row.slice()) as Piece[][];
        next[from.r][from.c] = '.';
        next[dropRow][dropCol] = piece;
        return next;
      });
    }
    // else: illegal -> ignore drop and keep piece in place

    setDragging({
      from: null,
      piece: null,
      offsetX: 0,
      offsetY: 0,
      x: 0,
      y: 0,
    });
  };

  const floatingStyle = useMemo<React.CSSProperties>(() => {
    if (!dragging.piece || !dragging.from) return { display: 'none' };
    const x = dragging.x - dragging.offsetX;
    const y = dragging.y - dragging.offsetY;
    return {
      position: 'absolute',
      left: x - cellSize / 2,
      top: y - cellSize / 2,
      width: cellSize,
      height: cellSize,
      display: 'grid',
      placeItems: 'center',
      pointerEvents: 'none',
    };
  }, [dragging, cellSize]);

  return (
    <div className="w-full min-h-screen bg-neutral-900 flex items-center justify-center p-6">
      <div>
        <h1 className="text-white text-2xl font-semibold mb-4 text-center">Tablero de Ajedrez</h1>

        <div
          ref={containerRef}
          className="relative"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{
            width: cellSize * size,
            height: cellSize * size,
            boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
            borderRadius: 8,
            overflow: 'hidden',
            userSelect: 'none',
            touchAction: 'none',
          }}
        >
          <div
            className="grid absolute inset-0"
            style={{
              gridTemplateColumns: `repeat(${size}, minmax(0, ${cellSize}px))`,
              gridTemplateRows: `repeat(${size}, ${cellSize}px)`,
            }}
          >
            {board.flatMap((rowArr, row) =>
              rowArr.map((cell, col) => {
                const isDark = (row + col) % 2 === 1;
                const empty = cell === '.';
                const isBlack = !empty && cell.toLowerCase() === cell;
                const glyph = empty ? '' : UNICODE_MAP[cell as Exclude<Piece, '.'>];

                const isBeingDragged =
                  dragging.piece &&
                  dragging.from?.r === row &&
                  dragging.from?.c === col;

                return (
                  <div
                    key={`${row}-${col}`}
                    onPointerDown={(e) => handlePointerDown(e, row, col)}
                    className="flex items-center justify-center"
                    style={{
                      backgroundColor: isDark ? '#769656' : '#eeeed2',
                      cursor: empty ? 'default' : 'grab',
                    }}
                  >
                    {!empty && !isBeingDragged && (
                      <span
                        className="leading-none select-none"
                        style={{
                          fontSize: 40,
                          color: isBlack ? '#222' : '#fff',
                          textShadow: isBlack
                            ? '0 1px 0 rgba(255,255,255,0.25)'
                            : '0 1px 0 rgba(0,0,0,0.35)',
                          filter: isBlack ? 'none' : 'drop-shadow(0 1px 0 rgba(0,0,0,0.25))',
                        }}
                        aria-label={!empty ? describePiece(cell as Exclude<Piece, '.'>) : undefined}
                        role={!empty ? 'img' : undefined}
                      >
                        {glyph}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {dragging.piece && dragging.from && (
            <div style={floatingStyle}>
              <span
                className="leading-none"
                style={{
                  fontSize: 40,
                  color: dragging.piece === dragging.piece.toLowerCase() ? '#222' : '#fff',
                  textShadow:
                    dragging.piece === dragging.piece.toLowerCase()
                      ? '0 1px 0 rgba(255,255,255,0.25)'
                      : '0 1px 0 rgba(0,0,0,0.35)',
                  filter:
                    dragging.piece === dragging.piece.toLowerCase()
                      ? 'none'
                      : 'drop-shadow(0 1px 0 rgba(0,0,0,0.25))',
                }}
                aria-label={describePiece(dragging.piece)}
                role="img"
              >
                {UNICODE_MAP[dragging.piece]}
              </span>
            </div>
          )}
        </div>

        <p className="text-neutral-300 text-sm mt-3 text-center">
          Arrastra y suelta para mover piezas. Se validan las reglas básicas de movimiento por pieza
          (sin turnos, sin jaque, sin enroque, sin en passant).
        </p>
      </div>
    </div>
  );
}