// Event listeners
import EventEmitter from 'events';
const employeeEvent = new EventEmitter();

employeeEvent.on('employeeCreated', (employee) => {
  console.log('New employee created:', employee);
});

export default employeeEvent;