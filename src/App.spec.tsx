import App from "./App"
import { render } from "./testing/testConfig"
import React from 'react';

describe("<App />",()=>{
    it("Should render App Component",()=>{
        render(<App />)
    })
})