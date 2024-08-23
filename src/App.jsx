import React, { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [charactersAllowed, setCharactersAllowed] = useState(true)
  const [password, setPassword] = useState("")
  //ref
  const passwordRef = useRef(null)

  const passwordGenerate = useCallback(() => {
    let pass = ""
    let str = "ABCDEFFGHIJKLMNOPQRESTUVWXYZabcdeghijklmnopqrstuvwxyz "
    if (numberAllowed) str += "0987654321"
    if (charactersAllowed) str += "!@#$%^&*(){}:"

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length))
    }
    setPassword(pass)
  }, [length, numberAllowed, charactersAllowed, setPassword])

  const copyToClip = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    alert('Password copied to clipboard');
  },[password])

  useEffect(() => {
    passwordGenerate()
  }, [passwordGenerate]);

  return (
    <div className='h-screen w-full flex justify-center items-center bg-gray-900'>
      <div className="flex flex-col justify-center items-center w-1/2 bg-gray-800 p-10 rounded-md">
        <h1 className="text-3xl text-white mb-4">Password Generator</h1>
        <textarea value={password} ref={passwordRef} readOnly className='h-40 p-3 w-full bg-gray-700 text-white rounded-md' placeholder='Generated Password'></textarea>
        <div className='flex flex-col justify-center items-center mt-4'>
          <label className='text-white mb-2'>Length:</label>
          <input type="range" min={5} max={40} value={length} onChange={(e) => setLength(e.target.value)} className='w-full bg-gray-700 text-white rounded-md' />
          <span className='text-white'>{length}</span>
        </div>
        <div className='flex flex-col justify-center items-center mt-4'>
          <label className='text-white mb-2'>Options:</label>
          <div className='flex items-center mb-2'>
            <input type="checkbox" checked={numberAllowed} onChange={(e) => setNumberAllowed(e.target.checked)} className='mr-2' />
            <label className='text-white'>Include Numbers</label>
          </div>
          <div className='flex items-center mb-2'>
            <input type="checkbox" checked={charactersAllowed} onChange={(e) => setCharactersAllowed(e.target.checked)} className='mr-2' />
            <label className='text-white'>Include Special Characters</label>
          </div>
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md' onClick={copyToClip}>copy</button>
      </div>
    </div>
  )
}

export default App