import React from "react";

interface CounterState {
  count: number;
}

class CounterComponent extends React.Component<Record<string, never>, CounterState> {
  state: CounterState = { count: 0 };
  intervalId?: ReturnType<typeof setInterval>;

  componentDidMount() {
    // Increment counter every 1 second
    this.intervalId = setInterval(() => {
      this.setState((prev) => ({ count: prev.count + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    alert("Component removed from the DOM!");
  }

  render() {
    return (
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-100">
        Counter: {this.state.count}
      </h1>
    );
  }
}

const App = () => {
  const [show, setShow] = React.useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100 dark:bg-gray-900 space-y-6">
      <button
        onClick={() => setShow(!show)}
        className={`px-5 py-2 rounded-lg text-white font-medium shadow-md transition 
          ${show ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
      >
        {show ? "Unmount Component" : "Mount Component"}
      </button>

      {show && <CounterComponent />}
    </div>
  );
};

export default App;
