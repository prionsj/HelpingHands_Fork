// CloseButton-Komponente für den Schließen-Button im Popup
const CloseButton = ({ onClick }) => (
    <button
      style={{
        position: 'relative',
        top: '-50px',
        right: '-100px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'red',
        width: '5px'
      }}
      // Funktion, die bei Klick aufgerufen wird
      onClick={onClick}
      // Klasse für Styling-Verwendung
      className="close-button"
    >
      &times;
    </button>
  );

  export default CloseButton;