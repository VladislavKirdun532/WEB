import React from 'react';
import ReactDOM from 'react-dom';


const styles = {
  board: {
    display: 'inline-block',
    border: '2px solid #333',
    margin: '20px'
  },
  row: {
    display: 'flex'
  },
  cell: {
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px'
  },
  notation: {
    width: '50px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  notationVertical: {
    width: '20px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold'
  }
};

// Функция для создания горизонтальной нотации (буквы)
function HorizontalNotation({ position }) {
  return (
    <div style={{ display: 'flex', marginLeft: '20px' }}>
      {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((letter, index) => (
        <div key={`h-${index}`} style={styles.notation}>
          {position === 'top' ? letter : ''}
          {position === 'bottom' ? letter : ''}
        </div>
      ))}
    </div>
  );
}

// Функция для создания вертикальной нотации (цифры)
function VerticalNotation({ number }) {
  return (
    <div style={styles.notationVertical}>
      {number}
    </div>
  );
}

// Компонент шахматной доски
function ChessBoard() {
  return (
    <div>
      {/* Верхняя нотация */}
      <HorizontalNotation position="top" />
      
      <div style={{ display: 'flex' }}>
        {/* Левая нотация */}
        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
          {[8, 7, 6, 5, 4, 3, 2, 1].map(num => (
            <VerticalNotation key={`left-${num}`} number={num} />
          ))}
        </div>
        
        {/* Шахматная доска */}
        <div style={styles.board}>
          {[8, 7, 6, 5, 4, 3, 2, 1].map((row) => (
            <div key={`row-${row}`} style={styles.row}>
              {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((col, colIndex) => {
                const isBlack = (row + colIndex) % 2 === 0;
                return (
                  <div
                    key={`${col}${row}`}
                    style={{
                      ...styles.cell,
                      backgroundColor: isBlack ? 'black' : 'white',
                      color: isBlack ? 'white' : 'black'
                    }}
                  >
                    {/* Можно добавить фигуры здесь */}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* Правая нотация */}
        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
          {[8, 7, 6, 5, 4, 3, 2, 1].map(num => (
            <VerticalNotation key={`right-${num}`} number={num} />
          ))}
        </div>
      </div>
      
      {/* Нижняя нотация */}
      <HorizontalNotation position="bottom" />
    </div>
  );
}

// Рендеринг компонента
ReactDOM.render(
  <ChessBoard />,
  document.getElementById('root')
);