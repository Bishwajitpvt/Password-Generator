import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [password, setPassword] = useState(""); // password field
  const [length, setLength] = useState(6); // password length
  const [numerAllowed, setNumberAllowed] = useState(false); // number allowed
  const [specialAllowed, setSpecialAllowed] = useState(false); // special-characterr allowed

  // function to generate random password
  const generatePassword = useCallback(() => {
    let pass = "";
    let letterValue = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const specialValue = "!@#$%^&*-_+=[]{}~`";
    const numericalValue = "0123456789";

    // check if specialValue or numericalValue is selected then add it to letter string
    if (numerAllowed) letterValue += numericalValue;
    if (specialAllowed) letterValue += specialValue;

    // loop till pass length
    for (let i = 0; i < length; i++) {
      // select random char form letter val
      let char = Math.floor(Math.random() * letterValue.length + 1); // give a random value (number)
      pass += letterValue.charAt(char);
    }

    setPassword(pass);
  }, [length, numerAllowed, specialAllowed]);

  // function to copy password
  // using useCallback for optimization
  const copyPassword = useCallback(() => {
    passFunRef.current?.select();
    window.navigator.clipboard.writeText(password);
    alert("Copied to clipboard!");
  }, [password]);

  // using basic function
  // const copyPassword = () => {
  //   passFunRef.current?.select();
  //   window.navigator.clipboard.writeText(password);
  //   alert("Copied to clipboard!");
  // };

  //  update pass into the UI without triggring re-rendering it
  const passFunRef = useRef(null);

  // run function in bg without causing side-effect
  useEffect(
    () => generatePassword,
    [length, numerAllowed, specialAllowed, generatePassword]
    // if any dependency value is chnaged re-run the generatePassword function
  );

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            className="outline-none w-full py-1 px-3"
            type="text"
            placeholder="Password"
            value={password}
            readOnly
            ref={passFunRef} // taking reference of input field
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={16}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length ({length})</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              //  setNumberAllowed(true) ~~ as hard coded value should not be used
              onClick={() => setNumberAllowed((numerAllowed) => !numerAllowed)}
            />
            <label>Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              onClick={() =>
                setSpecialAllowed((specialAllowed) => !specialAllowed)
              }
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
