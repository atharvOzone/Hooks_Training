import useCounter from "./components/useCounter";
import useLocalStorageCounter from "./components/useLocalStorageCounter";


const App = () => {
  const count = useCounter(0);
  const [counter, setCounter] = useLocalStorageCounter('count', 0);

  return(
    <>
      <div>
        <p>Count : {count.count}</p>
        <button onClick={count.increment}>Increment</button>
        <button onClick={count.decrement}>Decrement</button>
      </div>

      <div>
        <p>Local Storage Count: {counter}</p>
        <button onClick={() => {setCounter(counter+1)}}>Increment</button>
        <button onClick={() => {setCounter(counter-1)}}>Decrement</button>
      </div>
    </>
  );
};

export default App;