import React, {Component}  from 'react';
import AirTravel from '../airTravel/AirTravel'
import './AviaList.scss'

class AviaList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            flights: [],
            nonFilteredFlights: [],
            showMore: false,
            numerOfTravels: 2,
            selectedOptionSort: '',
            selectedOptionFilter: '',
            selectedOptionAviacompany: '',
            selectedOptionCostMin: 0,
            selectedOptionCostMax: 200000,
        }
        this.onValueChangeSort = this.onValueChangeSort.bind(this);
        this.onValueChangeFilter = this.onValueChangeFilter.bind(this);
        this.onValueChangeAviacompany = this.onValueChangeAviacompany.bind(this);
        this.onValueChangeCostMin = this.onValueChangeCostMin.bind(this);
        this.onValueChangeCostMax = this.onValueChangeCostMax.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentWillMount() {
        fetch('https://raw.githubusercontent.com/the-makros/flight-test/main/flights.json')
          .then((response) => response.json())
          .then(findresponse => this.setState({ flights: findresponse.result.flights, nonFilteredFlights: findresponse.result.flights}));
    }

    handleClick() {
        this.setState({showMore: true})
        this.setState({numerOfTravels: this.state.numerOfTravels + 2})
    }

    onValueChangeSort(event) {
        this.setState({
            selectedOptionSort: event.target.value
        });
        
      }

    onValueChangeFilter(event) {
        this.setState({
            selectedOptionFilter: event.target.value,
        });
        if (this.state.selectedOptionFilter == event.target.value) {
            this.setState({
                selectedOptionFilter: '',
            });
        }
    }

    onValueChangeAviacompany(event) {
        this.setState({
            selectedOptionAviacompany: event.target.value,
        });
        if (this.state.selectedOptionAviacompany == event.target.value) {
            this.setState({
                selectedOptionAviacompany: '',
            });
        }
    }

    onValueChangeCostMin(event) {
        this.setState({
            selectedOptionCostMin: event.target.value,
        });
    }
    onValueChangeCostMax(event) {
        this.setState({
            selectedOptionCostMax: event.target.value,
        });
    }

    formSubmit(event) {
        event.preventDefault();

        //Сортировка по возрастанию цены
        if(this.state.selectedOptionSort == "ascendingPrice") {
            if (this.state.selectedOptionFilter == '' || this.state.selectedOptionAviacompany == '') {
                this.setState(() => ({
                    flights: this.state.nonFilteredFlights.sort(function(a, b) {
                        if (Number(a.flight.price.total.amount) > Number(b.flight.price.total.amount)) {
                            return 1;
                          }
                          if (Number(a.flight.price.total.amount) < Number(b.flight.price.total.amount)) {
                            return -1;
                          }
                          return 0;
                      })
                }))
            } else {
                this.setState(() => ({
                    flights: this.state.flights.sort(function(a, b) {
                        if (Number(a.flight.price.total.amount) > Number(b.flight.price.total.amount)) {
                            return 1;
                          }
                          if (Number(a.flight.price.total.amount) < Number(b.flight.price.total.amount)) {
                            return -1;
                          }
                          return 0;
                      })
                }))
            }
        }

        //Сортировка по убыванию цены
        if(this.state.selectedOptionSort == "descendingPrice") {
            if (this.state.selectedOptionFilter == '' || this.state.selectedOptionAviacompany == '') {
            this.setState(() => ({
                flights: this.state.nonFilteredFlights.sort(function(a, b) {
                    if (Number(a.flight.price.total.amount) < Number(b.flight.price.total.amount)) {
                        return 1;
                      }
                      if (Number(a.flight.price.total.amount) > Number(b.flight.price.total.amount)) {
                        return -1;
                      }
                      return 0;
                  })
            }))
            } else {
                this.setState(() => ({
                    flights: this.state.flights.sort(function(a, b) {
                        if (Number(a.flight.price.total.amount) < Number(b.flight.price.total.amount)) {
                            return 1;
                          }
                          if (Number(a.flight.price.total.amount) > Number(b.flight.price.total.amount)) {
                            return -1;
                          }
                          return 0;
                      })
                }))
            }
        }

        //Сортировка по времени в пути
        if(this.state.selectedOptionSort == "travelTime") {
            if (this.state.selectedOptionFilter == '' || this.state.selectedOptionAviacompany == '') {
            this.setState(() => ({
                flights: this.state.nonFilteredFlights.sort(function(a, b) {
                    if (Number(a.flight.legs[0].duration + a.flight.legs[1].duration) > Number(b.flight.legs[0].duration + b.flight.legs[1].duration)) {
                        return 1;
                      }
                      if (Number(a.flight.legs[0].duration + a.flight.legs[1].duration) < Number(b.flight.legs[0].duration + b.flight.legs[1].duration)) {
                        return -1;
                      }
                      return 0;
                  })
            }))
            } else {
                this.setState(() => ({
                    flights: this.state.flights.sort(function(a, b) {
                        if (Number(a.flight.legs[0].duration + a.flight.legs[1].duration) > Number(b.flight.legs[0].duration + b.flight.legs[1].duration)) {
                            return 1;
                          }
                          if (Number(a.flight.legs[0].duration + a.flight.legs[1].duration) < Number(b.flight.legs[0].duration + b.flight.legs[1].duration)) {
                            return -1;
                          }
                          return 0;
                      })
                }))
            }
        }    

        //Фильтрация "1 пересадка" с учетом пользовательской цены
        if(this.state.selectedOptionFilter == "oneTransfer") {
            if (this.state.selectedOptionAviacompany == '') {
            this.setState(() => ({
                flights: this.state.nonFilteredFlights.filter(transfer => 
                (transfer.flight.legs[0].segments.length > 1 && transfer.flight.legs[1].segments.length > 1))
            }))
            } else if(this.state.selectedOptionAviacompany == "PolishAirlines") {
                this.setState(() => ({
                    flights: this.state.flights.filter(transfer => 
                    (transfer.flight.legs[0].segments.length > 1 && transfer.flight.legs[1].segments.length > 1 && transfer.flight.legs[0].segments[0].airline.caption == 'LOT Polish Airlines' && transfer.flight.legs[1].segments[0].airline.caption == 'LOT Polish Airlines' && Number(transfer.flight.price.total.amount) > this.state.selectedOptionCostMin && Number(transfer.flight.price.total.amount) < this.state.selectedOptionCostMax))
                }))
            } else if(this.state.selectedOptionAviacompany == "Airflot") {
                this.setState(() => ({
                    flights: this.state.flights.filter(transfer => 
                    (transfer.flight.legs[0].segments.length > 1 && transfer.flight.legs[1].segments.length > 1 && transfer.flight.legs[0].segments[0].airline.caption == 'Аэрофлот - российские авиалинии' && transfer.flight.legs[1].segments[0].airline.caption == 'Аэрофлот - российские авиалинии' && Number(transfer.flight.price.total.amount) > this.state.selectedOptionCostMin && Number(transfer.flight.price.total.amount) < this.state.selectedOptionCostMax))
                }))
            }
        }

        //Фильтрация "без пересадок" с учетом пользовательской цены
        if(this.state.selectedOptionFilter == "withoutTransfer") {
            if (this.state.selectedOptionAviacompany == '') {
            this.setState(() => ({
                flights: this.state.nonFilteredFlights.filter(transfer => 
                (transfer.flight.legs[0].segments.length == 1 && transfer.flight.legs[1].segments.length == 1))
            }))
            } else if(this.state.selectedOptionAviacompany == "PolishAirlines") {
                this.setState(() => ({
                    flights: this.state.flights.filter(transfer => 
                    (transfer.flight.legs[0].segments.length == 1 && transfer.flight.legs[1].segments.length == 1 && transfer.flight.legs[0].segments[0].airline.caption == 'LOT Polish Airlines' && transfer.flight.legs[1].segments[0].airline.caption == 'LOT Polish Airlines' && Number(transfer.flight.price.total.amount) > this.state.selectedOptionCostMin && Number(transfer.flight.price.total.amount) < this.state.selectedOptionCostMax))
                }))
            } else if(this.state.selectedOptionAviacompany == "Airflot") {
                this.setState(() => ({
                    flights: this.state.flights.filter(transfer => 
                    (transfer.flight.legs[0].segments.length == 1 && transfer.flight.legs[1].segments.length == 1 && transfer.flight.legs[0].segments[0].airline.caption == 'Аэрофлот - российские авиалинии' && transfer.flight.legs[1].segments[0].airline.caption == 'Аэрофлот - российские авиалинии' && Number(transfer.flight.price.total.amount) > this.state.selectedOptionCostMin && Number(transfer.flight.price.total.amount) < this.state.selectedOptionCostMax))
                }))
            }
        }

        //Фильтрация по авиакомпании Polish Airlines
        if(this.state.selectedOptionAviacompany == "PolishAirlines") {
            if (this.state.selectedOptionFilter == '') {
            this.setState(() => ({
                flights: this.state.nonFilteredFlights.filter(transfer => 
                (transfer.flight.legs[0].segments[0].airline.caption == 'LOT Polish Airlines' && transfer.flight.legs[1].segments[0].airline.caption == 'LOT Polish Airlines'))
            }))
            } 
        }

        //Фильтрация по авиакомпании Аэрофлот
        if(this.state.selectedOptionAviacompany == "Airflot") {
            if (this.state.selectedOptionFilter == '') {
            this.setState(() => ({
                flights: this.state.nonFilteredFlights.filter(transfer => 
                (transfer.flight.legs[0].segments[0].airline.caption == 'Аэрофлот - российские авиалинии' && transfer.flight.legs[1].segments[0].airline.caption == 'Аэрофлот - российские авиалинии'))
            }))
            } 
        }
    }

    render() {
        let numberOfItems = this.state.numerOfTravels

        return (
        <div className='AviaList'>
            <div className='AviaList__sorting'>
            <form onSubmit={this.formSubmit} className='AviaList__sortingForm'>
                <h1>Сортировать</h1>
                
                <label>
                    <input type="radio" name="sorting" value="ascendingPrice" checked={this.state.selectedOptionSort === "ascendingPrice"} onChange={this.onValueChangeSort}/>
                    - По возрастанию цены
                </label>
                
                <label>
                    <input type="radio" name="sorting" value="descendingPrice" checked={this.state.selectedOptionSort === "descendingPrice"} onChange={this.onValueChangeSort}/>
                    - По убыванию цены
                </label>
                
                <label>
                    <input type="radio" name="sorting" value="travelTime" checked={this.state.selectedOptionSort === "travelTime"} onChange={this.onValueChangeSort}/>
                    - По времени в пути
                </label>

                <h1>Фильтровать</h1>
                
                <label>
                    <input type="checkbox" name="oneTransfer" value="oneTransfer" onChange={this.onValueChangeFilter}/>
                    - 1 пересадка
                </label>
                <label>
                    <input type="checkbox" name="withoutTransfer" value="withoutTransfer" onChange={this.onValueChangeFilter}/>
                    - без пересадок
                </label>

                <h1>Цена</h1>
                <label>
                    От
                    <input type="number" name="priceTextMin" placeholder="0" onChange={this.onValueChangeCostMin}/>
                </label>
                <label>
                    До
                    <input type="number" name="priceTextMax" placeholder="10000" onChange={this.onValueChangeCostMax}/>
                </label>

                <h2>Авиакомпания</h2>

                <label>
                    <input type="checkbox" name="PolishAirlines" value="PolishAirlines" onChange={this.onValueChangeAviacompany}/>
                    - LOT Polish Airlines от 21049 р.
                </label>
                <label>
                    <input type="checkbox" name="Airflot" value="Airflot" onChange={this.onValueChangeAviacompany}/>
                    - Аэрофлот-российские авиалинии от 31733 р.
                </label>

                <button className='AviaList__sortingFormSubmit' type="submit">
                    Фильтровать
                </button>
            </form>
        </div>
        <div className='AviaList__flightList'>
            <div>             
                
            {this.state.flights.slice(0, numberOfItems).map(air => (

            <AirTravel 
                key={air.flightToken}
                airFlight={air.flight}
                price={air.flight.price.total.amount} 
                currency={air.flight.price.total.currencyCode} 
                mainDepartureCity={air.flight.legs[0].segments[0].departureCity.caption} 
                mainDepartureAirport={air.flight.legs[0].segments[0].departureAirport.caption} 
                mainDepartureAirportId={ air.flight.legs[0].segments[0].departureAirport.uid}
                mainArrivalCityWithTransferLength={air.flight.legs[0].segments.length}
                mainArrivalCity={air.flight.legs[0].segments[0].arrivalCity.caption}
                mainArrivalAirport={air.flight.legs[0].segments[0].arrivalCity.caption}
                mainArrivalAirportId={air.flight.legs[0].segments[0].arrivalCity.uid}
                mainDepartureTime={air.flight.legs[0].segments[0].departureDate.substr(11, 5)}
                mainDepartureDate={air.flight.legs[0].segments[0].departureDate.substr(0, 10)}
                mainDurationHours={(air.flight.legs[0].duration) / 60 ^ 0}
                mainDurationMin={(air.flight.legs[0].duration) % 60}
                mainArrivalDate={air.flight.legs[0].segments[0].arrivalDate.substr(0, 10)}
                mainArrivalTime={air.flight.legs[0].segments[0].arrivalDate.substr(11, 5)}
                mainAirCompanyId={air.flight.legs[0].segments[0].airline.uid}
                mainAirCompany={air.flight.legs[0].segments[0].airline.caption}

                backDepartureCity={air.flight.legs[0].segments[0].departureCity.caption} 
                backDepartureAirport={air.flight.legs[1].segments[0].departureAirport.caption} 
                backDepartureAirportId={ air.flight.legs[1].segments[0].departureAirport.uid}
                backArrivalCityWithTransferLength={air.flight.legs[1].segments.length}
                backArrivalCity={air.flight.legs[1].segments[0].arrivalCity.caption}
                backArrivalAirport={air.flight.legs[1].segments[0].arrivalCity.caption}
                backArrivalAirportId={air.flight.legs[1].segments[0].arrivalCity.uid}
                backDepartureTime={air.flight.legs[1].segments[0].departureDate.substr(11, 5)}
                backDepartureDate={air.flight.legs[1].segments[0].departureDate.substr(0, 10)}
                backDurationHours={(air.flight.legs[1].duration) / 60 ^ 0}
                backDurationMin={(air.flight.legs[1].duration) % 60}
                backArrivalDate={air.flight.legs[1].segments[0].arrivalDate.substr(0, 10)}
                backArrivalTime={air.flight.legs[1].segments[0].arrivalDate.substr(11, 5)}
                backAirCompanyId={air.flight.legs[1].segments[0].airline.uid}
                backAirCompany={air.flight.legs[1].segments[0].airline.caption}
            />               
            ))
            }
        </div>  

        {this.state.flights == '' &&
            <div className='AviaList__flightListError'>
                Таких рейсов не найдено
            </div>
        }

        <input type="submit" value="Показать еще" onClick={()=> this.handleClick()} className='AviaList__flightListAddBtn'/> 
        </div>

        </div>
        )
    }
}

export default AviaList;