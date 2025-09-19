import './calculator.css';
import { useCalculator } from './useCalculator';

export function Calculator() {
  const { state, inputDigit, chooseOperator, evaluateExpression, clearAll } = useCalculator();
  const { current, previous, operator, error } = state;

  return (
    <div className="calc-root">
      <div className="calc-display" aria-live="polite">
        {error ? <span className="calc-error">Error</span> : <span>{current}</span>}
        {previous && operator && (
          <span className="calc-ghost"> {previous} {operator}</span>
        )}
      </div>
      <div className="calc-grid">
        <button className="op" onClick={() => clearAll()}>C</button>
        <button className="op" onClick={() => chooseOperator('/')}>/</button>
        <button className="op" onClick={() => chooseOperator('*')}>*</button>
        <button className="op" onClick={() => chooseOperator('-')}>-</button>
        {[7,8,9,4,5,6,1,2,3].map(n => (
          <button key={n} onClick={() => inputDigit(n)}>{n}</button>
        ))}
        <button onClick={() => inputDigit(0)} className="zero">0</button>
        <button className="op" onClick={() => chooseOperator('+')}>+</button>
        <button className="eq" onClick={() => evaluateExpression()}>=</button>
      </div>
    </div>
  );
}
