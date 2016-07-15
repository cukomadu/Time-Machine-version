
import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'




const app = function() {

	let pastIntervalRef
	let futureIntervalRef

	const getCurrentYear = function(){
		var currentDate = new Date(),
		    currentYear = currentDate.getFullYear()
			//console.log(currentYear)
		return currentYear
	}

	const AppView = React.createClass({

		getInitialState: function(){
			return {
				currentYear: getCurrentYear(),
				clickedButton: '',
				background: 'none',
				myClass: ''
			}
		},

		componentWillMount: function(){
			//console.log('this is currentYear on State':, this.state.currentYear)
			var currentYearCopy = this.state.currentYear
			var self = this
			var decreaseYear = function(){
				//var currentYearCopy = this.state.currentYear,
					currentYearCopy -= 1
					
					self.setState({
						currentYear: currentYearCopy
					})
			}

			var increaseYear = function(){
				//var currentYearCopy = this.state.currentYear,
					currentYearCopy += 1
					self.setState({
						currentYear: currentYearCopy
					})
			}

			var freezeYear = function(){
				console.log('I stopped')
				//var currentYearCopy = this.state.currentYear
				self.setState({
					clickedButton: currentYearCopy
				})
				
			}

			Backbone.Events.on('button-clicked', (clickedButton) => {
				console.log('this is backbone receiving clickedButton:', clickedButton)

				clearInterval(pastIntervalRef)
				clearInterval(futureIntervalRef)

				if(clickedButton === 'past'){
					pastIntervalRef = setInterval(decreaseYear, 500)
					this.setState({
						background: 'url(https://s19.postimg.org/pi47y0nkj/The_Time_Machine_Past.jpg) 0 0 no-repeat'
					})
					
				} 
				
				else if(clickedButton === 'future'){
					futureIntervalRef = setInterval(increaseYear, 500)
					this.setState({
						background: 'url(https://s19.postimg.org/i8e21kjmb/Electronic_Room.jpg) 0 0 no-repeat'
					})
				}

				else if(clickedButton === 'stop'){
					console.log('I stopped')
					var currentYearCopy = this.state.currentYear
						this.setState({
							clickedButton: currentYearCopy
						})
					
				}
			})
		},


		render:function(){
			var styleObj = {
				background: this.state.background
			}
			console.log(this.state.background	)
			return (
					<div style={styleObj} className="AppView">
						<TimeView currYear={this.state.currentYear}/>
						<ButtonView />
					</div>
				)
		}
	})

	const TimeView = React.createClass({
		render:function(){
			return (
					<div className="TimeView">
						<h1>{this.props.currYear}</h1>
					</div>
				)
		}
	})

	const ButtonView = React.createClass({

		_getClickedButton: function(e){
			console.log(e.target.dataset['button'])
			var clickedButton = e.target.dataset['button']

			Backbone.Events.trigger('button-clicked', clickedButton)
		},


		render:function(){
			return (
					<div className="ButtonView" onClick={this._getClickedButton}>
						<button id="past" data-button="past">GO BACK IN TIME</button>
						<button id="stop" data-button="stop">FREEZE TIME</button>
						<button id="future" data-button="future">LEAP TO THE FUTURE</button>
					</div>
				)
		}
	})
		
	ReactDOM.render(<AppView />, document.querySelector('#container'))
}

app()
