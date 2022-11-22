export const convertFlightEntity = flight => {
  const flightDetails = {
    PNR: flight.data.TripData.PnrCode,
    IsReturningFlight:
      flight.data.TripData.OriginDestinationList.OriginDestination
        .IsReturnFlight,
    IsAnadoluJetFlight:
      flight.data.TripData.OriginDestinationList.OriginDestination.Segment
        .AdditionalInformation.IsAnadoluJetFlight,
    ArrivalLocation:
      flight.data.TripData.OriginDestinationList.OriginDestination.Segment
        .ArrivalInformation.LocationCode,
    DepartureLocation:
      flight.data.TripData.OriginDestinationList.OriginDestination.Segment
        .DepartureInformation.LocationCode,
    PassengerName:
      flight.data.TripData.PassengerInfoList.PassengerInfo.PassengerName
        .GivenName,
    PasserNamePrefix:
      flight.data.TripData.PassengerInfoList.PassengerInfo.PassengerName
        .NamePrefix,
    PassengerSurname:
      flight.data.TripData.PassengerInfoList.PassengerInfo.PassengerName
        .Surname,
    BoardingInfo:
      flight.data.TripData.PassengerFlightInfoList.PassengerFlightInfo
        .CheckinReference.BoardingInfo === 'BOARDED',
    BoardingPassInfo:
      flight.data.TripData.PassengerFlightInfoList.PassengerFlightInfo
        .CheckinReference.BoardingPassInfo === 'PRINTED',
    CheckinInfo:
      flight.data.TripData.PassengerFlightInfoList.PassengerFlightInfo
        .CheckinReference.CheckinStateInfo === 'CHECKED_IN',

    DepartureDate:
      flight.data.TripData.OriginDestinationList.OriginDestination.Segment
        .DepartureInformation.DepartureDate,
    ArrivalDate:
      flight.data.TripData.OriginDestinationList.OriginDestination.Segment
        .ArrivalInformation.ArrivalDate,
    DepartureTime:
      flight.data.TripData.OriginDestinationList.OriginDestination.Segment
        .DepartureInformation.DepartureTime,
    ArrivalTime:
      flight.data.TripData.OriginDestinationList.OriginDestination.Segment
        .ArrivalInformation.ArrivalTime,
    BaggageAllowance: parseInt(
      flight.data.TripData.PassengerFlightInfoList.PassengerFlightInfo.BookingInfo.FareBase.BaggageAllowance.replace(
        /\D/g,
        '',
      ),
      10,
    ),
  };

  return flightDetails;
};
