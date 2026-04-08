import InteractiveCalendar from './components/InteractiveCalendar'
import './index.css'

function App() {
  return (
    <div className="App">
      <InteractiveCalendar />
      
      {/* Visual background details to enhance the "wall" feel */}
      <div className="wall-top-fixture" style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '40px',
        height: '40px',
        background: '#cbd5e1',
        borderRadius: '50%',
        boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.2)',
        zIndex: -1
      }} />
    </div>
  )
}

export default App
