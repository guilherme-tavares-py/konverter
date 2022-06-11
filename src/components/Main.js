import React from 'react'
const api_url = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,USD-EUR";

let dolarBrl;
let eurBrl;
let dolEur;


let inputValue = document.getElementById("value")
let result = document.getElementById("result")

let optionInput = document.getElementById("optionInput")
let optionOutput = document.getElementById("optionOutput")



async function getapi() {
    
    const response = await fetch(api_url);
    let data = await response.json();
    
    setValues(data);
}

getapi()

function setValues(data) {
    dolarBrl = data["USDBRL"]["bid"]
    eurBrl = data["EURBRL"]["bid"]
    dolEur = data["USDEUR"]["bid"]
}

function Converter() {
    if (optionInput.options[optionInput.selectedIndex].value === optionOutput.options[optionOutput.selectedIndex].value) {
        result.value = inputValue.value
    }
    else if (optionInput.options[optionInput.selectedIndex].value === "real") {
        if (optionOutput.options[optionOutput.selectedIndex].value === "dolar") {
            result.value = inputValue.value / dolarBrl
        }
        else if (optionOutput.options[optionOutput.selectedIndex].value === "euro") {
            result.value = inputValue.value / eurBrl
        }
    }

    else if (optionInput.options[optionInput.selectedIndex].value === "dolar") {
        if (optionOutput.options[optionOutput.selectedIndex].value === "real") {
            result.value = inputValue.value * dolarBrl
        }
        else if (optionOutput.options[optionOutput.selectedIndex].value === "euro") {
            result.value = inputValue.value * dolEur
        }
    }

    else if (optionInput.options[optionInput.selectedIndex].value === "euro") {
        if (optionOutput.options[optionOutput.selectedIndex].value === "real") {
            result.value = inputValue.value * eurBrl
        }
        else if (optionOutput.options[optionOutput.selectedIndex].value === "dolar") {
            result.value = inputValue.value / dolEur
        }
    }


}

function reset() {
    result.value = null
    inputValue.value = null
}


export default function Main() {
    return(
        <main>
            <div id="display">
                <div>
                    <select id="optionInput">
                        <option value="real" selected>Real</option>
                        <option value="dolar">Dólar</option>
                        <option value="euro">Euro</option>
                    </select>
                    <input id="value" placeholder='Quantity to convert' type="text"/>
                    <button onClick={Converter}>Go</button>
                    
                </div>
                <div>
                    <select id="optionOutput">
                        <option value="real">Real</option>
                        <option value="dolar">Dólar</option>
                        <option value="euro">Euro</option>
                    </select>
                    <input id="result" type="text"/>
                    <button onClick={reset}>Reset</button>
                </div>
            </div>
        </main>
    );
}