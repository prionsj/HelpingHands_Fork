// CloseButton-Komponente für den Schließen-Button im Popup
const CloseButton = ({ onClick }) => (
    <button
      style={{
        position: 'relative',
        top: '-50px', // Verschiebung nach oben
        right: '-100px', // Verschiebung nach rechts
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'red',
        width: '5px'
      }}
      onClick={onClick}
      className="close-button" // Klasse für Styling-Verwendung
    >
      &times;
    </button>
  );

  export default CloseButton;