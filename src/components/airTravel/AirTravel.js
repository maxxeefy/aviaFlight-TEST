import React from 'react';
import './AirTravel.scss'

function AirTravel ({
    price, 
    currency, 
    mainDepartureCity, 
    mainDepartureAirport, 
    mainDepartureAirportId, 
    mainArrivalCity, 
    mainArrivalCityWithTransferLength, 
    airFlight,
    mainArrivalAirport,
    mainArrivalAirportId,
    mainDepartureTime,
    mainDepartureDate,
    mainDurationHours,
    mainDurationMin,
    mainArrivalDate,
    mainArrivalTime,
    mainAirCompanyId,
    mainAirCompany,

    backDepartureAirport,
    backDepartureAirportId,
    backArrivalCityWithTransferLength,
    backArrivalCity,
    backArrivalAirport,
    backArrivalAirportId,
    backDepartureTime,
    backDepartureDate,
    backDurationHours,
    backDurationMin,
    backArrivalDate,
    backArrivalTime,
    backAirCompanyId,
    backAirCompany,
}) {
    let mistake1 = airFlight.legs[0].segments[1]

    return (
        <div className="flight">
            <header className="flight__header">
                <p>{price} {currency}</p>
                <p>Стоимость для одного взрослого пассажира</p>
            </header>

            <div className="flight__Information">

            
            {mainArrivalCityWithTransferLength == 2 && "arrivalCity" in mistake1 &&
                <div className="flight__Departure">
                    <p>{mainDepartureCity}, {mainDepartureAirport} <span className="flight__AirportId">({mainDepartureAirportId})</span> &#8594; {airFlight.legs[0].segments[1].arrivalCity.caption}, {airFlight.legs[0].segments[1].arrivalAirport.caption} <span className="flight__AirportId">({airFlight.legs[0].segments[1].arrivalAirport.uid})</span></p>
                    <hr/>
                </div>
            }
            {mainArrivalCityWithTransferLength == 1 &&
                <div className="flight__Departure">
                    <p>{mainDepartureCity}, {mainDepartureAirport} <span className="flight__AirportId">({mainDepartureAirportId})</span> &#8594; {mainArrivalCity}, {mainArrivalAirport} <span className="flight__AirportId">({mainArrivalAirportId})</span></p> 
                    <hr/>
                </div>
            }
            
            {mainArrivalCityWithTransferLength == 2 && "arrivalCity" in mistake1 &&
                <div className="flight__Time">
                    <p>{mainDepartureTime} <span className="flight__TimeDate">{mainDepartureDate}</span></p> <p>{mainDurationHours} ч {mainDurationMin} мин </p> <p><span className="flight__TimeDate">{airFlight.legs[0].segments[1].arrivalDate.substr(0, 10)}</span> {airFlight.legs[0].segments[1].arrivalDate.substr(11, 5)}</p>
                </div>
            }
            {mainArrivalCityWithTransferLength == 1 &&
                <div className="flight__Time">
                    <p>{mainDepartureTime} <span className="flight__TimeDate">{mainDepartureDate}</span></p> <p>{mainDurationHours} ч {mainDurationMin} мин </p> <p><span className="flight__TimeDate">{mainArrivalDate}</span> {mainArrivalTime}</p>
                </div>
            }
            {mainArrivalCityWithTransferLength == 2 && "arrivalCity" in mistake1 &&
                <div className="flight__Transfer">
                    <hr/>
                    <p>1 пересадка</p>
                </div>
            }
            <div className="flight__Aircompany">
                <p>Рейс выполняет: {mainAirCompanyId} {mainAirCompany}</p>
            </div>

            <hr className="flight__line"/>

            {/* ------------------------------------------------------------------------- */}

            {backArrivalCityWithTransferLength == 2 && "departureCity" in airFlight.legs[1].segments[0] &&
                <div className="flight__Departure">
                    <p>{airFlight.legs[1].segments[0].departureCity.caption}, {backDepartureAirport} <span className="flight__AirportId">({backDepartureAirportId})</span> &#8594; {airFlight.legs[1].segments[1].arrivalCity.caption}, {airFlight.legs[1].segments[1].arrivalAirport.caption} <span className="flight__AirportId">({airFlight.legs[1].segments[1].arrivalAirport.uid})</span></p>
                    <hr/>
                </div>
            }
            {backArrivalCityWithTransferLength == 1 && 
                <div className="flight__Departure">
                    <p>{airFlight.legs[1].segments[0].departureCity.caption}, {backDepartureAirport} <span className="flight__AirportId">({backDepartureAirportId})</span> &#8594; {backArrivalCity}, {backArrivalAirport} <span className="flight__AirportId">({backArrivalAirportId})</span></p>
                    <hr/>
                </div>
            }

            {backArrivalCityWithTransferLength == 2 && 
                <div className="flight__Time">
                    <p>{backDepartureTime} <span className="flight__TimeDate">{backDepartureDate}</span></p> <p>{backDurationHours} ч {backDurationMin} мин </p> <p><span className="flight__TimeDate">{airFlight.legs[1].segments[1].arrivalDate.substr(0, 10)}</span> {airFlight.legs[1].segments[1].arrivalDate.substr(11, 5)}</p>
                </div>
            }
            {backArrivalCityWithTransferLength == 1 &&
                <div className="flight__Time">
                    <p>{backDepartureTime} <span className="flight__TimeDate">{backDepartureDate}</span></p> <p>{backDurationHours} ч {backDurationMin} мин </p> <p><span className="flight__TimeDate">{backArrivalDate}</span> {backArrivalTime}</p>
                </div>
            }
            {backArrivalCityWithTransferLength == 2 &&
                <div className="flight__Transfer">
                    <p>1 пересадка</p>
                    <hr/>
                </div>
            }
            <div className="flight__Aircompany">
                <p>Рейс выполняет: {backAirCompanyId} {backAirCompany}</p>
            </div>

            </div>

            <input type="submit" value="ВЫБРАТЬ" className="flight__SelectBtn"/>

        </div>
    )   
}

export default AirTravel;