import { useEffect, useState } from "react";
import { IconButton } from "./components/IconButton";
import { ArrowPathIcon } from "./shared/icons/ArrowPathIcon";
import { ClipboardIcon } from "./shared/icons/ClipboardIcon";

const tabs = [
  {
    label: "A-Z",
    value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  },
  {
    label: "a-z",
    value: "abcdefghijklmnopqrstuvwxyz",
  },
  {
    label: "0-9",
    value: "0123456789",
  },
  {
    label: "!@#$%",
    value: "!@#$%",
  },
];

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(4);
  const [activeTabs, setActiveTabs] = useState(
    tabs.slice(0, 2).map((tab) => tab.value)
  );

  const generatePassword = () => {
    const chars = activeTabs.join("");

    let pass = "";

    for (let i = 0; i < length; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(pass);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center text-white">
      <div className="bg-gray-700 p-4 rounded-xl min-w-96">
        <div className="flex justify-between items-center bg-gray-600 shadow-md border border-gray-500 relative px-2 py-2 rounded-xl text-center">
          <IconButton onClick={generatePassword}>
            <ArrowPathIcon className="w-5" />
          </IconButton>

          <span className="h-6">{password}</span>

          <IconButton onClick={copyPassword}>
            <ClipboardIcon className="w-5" />
          </IconButton>
        </div>

        <div className="flex mt-2 gap-1">
          {password.length > 0 && password.length < 5 ? (
            <>
              <div className="w-full h-1.5 rounded-full bg-red-500" />
              <div className="w-full h-1.5 rounded-full bg-gray-500" />
              <div className="w-full h-1.5 rounded-full bg-gray-500" />
              <div className="w-full h-1.5 rounded-full bg-gray-500" />
            </>
          ) : password.length > 4 && password.length < 8 ? (
            <>
              <div className="w-full h-1.5 rounded-full bg-yellow-500" />
              <div className="w-full h-1.5 rounded-full bg-yellow-500" />
              <div className="w-full h-1.5 rounded-full bg-gray-500" />
              <div className="w-full h-1.5 rounded-full bg-gray-500" />
            </>
          ) : password.length > 7 && password.length < 10 ? (
            <>
              <div className="w-full h-1.5 rounded-full bg-green-500" />
              <div className="w-full h-1.5 rounded-full bg-green-500" />
              <div className="w-full h-1.5 rounded-full bg-green-500" />
              <div className="w-full h-1.5 rounded-full bg-gray-500" />
            </>
          ) : password.length > 9 ? (
            <>
              <div className="w-full h-1.5 rounded-full bg-green-500" />
              <div className="w-full h-1.5 rounded-full bg-green-500" />
              <div className="w-full h-1.5 rounded-full bg-green-500" />
              <div className="w-full h-1.5 rounded-full bg-green-500" />
            </>
          ) : (
            <>
              <div className="w-full h-1.5 rounded-full bg-gray-500" />
              <div className="w-full h-1.5 rounded-full bg-gray-500" />
              <div className="w-full h-1.5 rounded-full bg-gray-500" />
              <div className="w-full h-1.5 rounded-full bg-gray-500" />
            </>
          )}
        </div>

        <div className="bg-gray-600 flex border border-gray-500 justify-between items-center mt-2 gap-3 p-3 rounded-xl">
          <h2 className="pl-2.5 font-bold text-lg">Длинна</h2>
          <span className="text-2xl font-medium ml-auto pr-2">{length}</span>
          <button
            onClick={() => setLength((prev) => (prev === 1 ? prev : prev - 1))}
            className="bg-gray-500 active:scale-95 transition w-9 h-9 rounded-full"
          >
            -
          </button>
          <button
            onClick={() => setLength((prev) => (prev += 1))}
            className="bg-gray-500 active:scale-95 transition w-9 h-9 rounded-full"
          >
            +
          </button>
        </div>

        <div className="flex mt-3 border border-gray-500 shadow-md rounded-xl overflow-hidden">
          {tabs.map((tab, idx) => (
            <button
              onClick={() => {
                if (activeTabs.includes(tab.value)) {
                  setActiveTabs((prev) => prev.filter((t) => t !== tab.value));
                } else {
                  setActiveTabs((prev) => [...prev, tab.value]);
                }
              }}
              className={`
                ${
                  activeTabs.includes(tab.value) ? "bg-gray-500" : "bg-gray-600"
                }
              bg-gray-600 text-md font-bold flex-1 items-center py-2`}
              key={idx}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
