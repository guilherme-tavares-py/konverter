import React from 'react'


class Main extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        first_choice: 'real',
        second_choice: 'dolar',
        dolar: 0,
        euro: 0,
        real: 1,
        inputUser: 0,
        display: 0
      };

      this.handleText = this.handleText.bind(this);
      this.firstChoice = this.firstChoice.bind(this);
      this.secondChoice = this.secondChoice.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      const api_url = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL"
      fetch(api_url)
      .then((response) => response.json())
      .then((result) => {
        this.setState({dolar: result["USDBRL"]["bid"], euro: result["EURBRL"]["bid"]})
      })
    }
  
    firstChoice(event) {
      this.setState({
        first_choice: event.target.value
      });
    }
    secondChoice(event) {
      this.setState({
        second_choice: event.target.value
      });
    }

    handleText(text) {
      const val = text.target.value;
      this.setState({
        inputUser: val
      });
    }
    
    handleSubmit(event) {
      //alert(this.state.first_choice)
      //alert(this.state.second_choice)
      if (this.state.first_choice === "real") {

        if (this.state.second_choice === "dolar") {
          this.setState({display: (this.state.inputUser / this.state.dolar).toFixed(2)});
        } else if (this.state.second_choice === "euro") {
          this.setState({display: (this.state.inputUser / this.state.euro).toFixed(2)});
        } else if (this.state.second_choice === "real") {
          this.setState({display: this.state.inputUser});
        }
      } else if (this.state.first_choice === "dolar") {
        if (this.state.second_choice === "real") {
          this.setState({display: (this.state.inputUser * this.state.dolar).toFixed(2)});
        } else if (this.state.second_choice === "euro") {
          this.setState({display: (this.state.inputUser * this.state.dolar / this.state.euro).toFixed(2)});
        } else if (this.state.second_choice === "dolar") {
          this.setState({display: this.state.inputUser});
        }
      } else if (this.state.first_choice === "euro") {
        if (this.state.second_choice === "real") {
          this.setState({display: (this.state.inputUser * this.state.euro).toFixed(2)});
        } else if (this.state.second_choice === "dolar") {
          this.setState({display: (this.state.inputUser * this.state.euro / this.state.dolar).toFixed(2)});
        } else if (this.state.second_choice === "euro") {
          this.setState({display: this.state.inputUser});
        }
      }

      // this.setState({display: this.state.inputUser * this.state.euro}); // -- result problably will be like this
      event.preventDefault();
    }


    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          
          <label>
            <div>
            <select value={this.state.first_choice} onChange={this.firstChoice}>
              <option value="real">BRL</option>
              <option value="euro">EUR</option>
              <option value="dolar">USD</option>
            </select>
            
            <input type="text" value={this.state.inputUser} onChange={text => this.handleText(text)}/>
            </div>
            <div>
            <select value={this.state.second_choice} onChange={this.secondChoice}>
              <option value="real">BRL</option>
              <option value="euro">EUR</option>
              <option value="dolar">USD</option>
            </select>

            <input readOnly type="text" value={this.state.display}/>
            </div>
          </label>
          <input id="submit" type="submit" value="Submit" />
        </form>
      );
    }
  }

export default Main