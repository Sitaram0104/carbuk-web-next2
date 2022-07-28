import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";

const RideSelector = ({ pickupCoordinates, dropoffCoordinates }) => {
  const [rideDuration, setRideDuration] = useState(0);

  useEffect(() => {
    if (pickupCoordinates && dropoffCoordinates) {
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?annotations=maxspeed&overview=full&geometries=geojson&access_token=pk.eyJ1Ijoic2l0YXJhbTAxMDQiLCJhIjoiY2wyZDVqaTMxMGV4YjNpbXY1a3M4NHptbyJ9.nWEWJk3WUoyK7Es2jMV_3Q`
      )
        .then((res) => res.json())
        .then((data) => setRideDuration(data.routes[0].duration / 100));
    }
  }, [pickupCoordinates, dropoffCoordinates]);

  return (
    <Wrapper>
      <CarList>
        {carList.map(({ imgUrl, service, multiplier }, index) => (
          <Car key={index}>
            <CarImage src={imgUrl} />
            <CarDetails>
              <Service>{service}</Service>
              <Time>5 min away</Time>
            </CarDetails>
            <Price>$ {(rideDuration * multiplier).toFixed(2)}</Price>
          </Car>
        ))}
      </CarList>
    </Wrapper>
  );
};

export default RideSelector;

const Wrapper = tw.div`flex-1 flex flex-col overflow-y-scroll`;
const CarList = tw.div``;
const Car = tw.div`flex p-4 items-center`;
const CarImage = tw.img`h-14 mr-2`;
const CarDetails = tw.div`flex-1`;
const Service = tw.div`font-medium`;
const Time = tw.div`text-xs text-blue-500`;
const Price = tw.div`text-sm`;

const carList = [
  {
    imgUrl: "https://i.ibb.co/cyvcpfF/uberx.png",
    service: "UberX",
    multiplier: 1,
  },
  {
    imgUrl: "https://i.ibb.co/YDYMKny/uberxl.png",
    service: "UberXL",
    multiplier: 1.5,
  },
  {
    imgUrl: "https://i.ibb.co/Xx4G91m/uberblack.png",
    service: "Black",
    multiplier: 2,
  },
  {
    imgUrl: "https://i.ibb.co/cyvcpfF/uberX.png",
    service: "Comfort",
    multiplier: 2.2,
  },
  {
    imgUrl: "https://i.ibb.co/1nStPWT/uberblacksuv.png",
    service: "BlackSUV",
    multiplier: 2.8,
  },
];
