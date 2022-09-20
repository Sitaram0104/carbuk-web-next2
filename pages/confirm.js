import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import RideSelector from "./components/RideSelector";
import Link from "next/link";

const Confirm = () => {
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [dropoffCoordinates, setDropoffCoordinates] = useState(null);
  const [nmofPerson, setNmofPerson] = useState(1);
  const router = useRouter();
  const { pickup, dropoff } = router.query;

  const getPickupCoordinates = (pickup) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?access_token=pk.eyJ1Ijoic2l0YXJhbTAxMDQiLCJhIjoiY2wyZDVqaTMxMGV4YjNpbXY1a3M4NHptbyJ9.nWEWJk3WUoyK7Es2jMV_3Q`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPickupCoordinates(data.features[0].center);
      });
  };

  const getDropoffCoordinates = (dropoff) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?access_token=pk.eyJ1Ijoic2l0YXJhbTAxMDQiLCJhIjoiY2wyZDVqaTMxMGV4YjNpbXY1a3M4NHptbyJ9.nWEWJk3WUoyK7Es2jMV_3Q`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDropoffCoordinates(data.features[0].center);
      });
  };

  useEffect(() => {
    if (pickup && dropoff) {
      getPickupCoordinates(pickup);
      getDropoffCoordinates(dropoff);
    } else {
      router.push("/search");
    }
  }, [pickup, dropoff, router]);

  return (
    <Wrapper>
      <Link href={"/search"} passHref>
        <ButtonContainer>
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </ButtonContainer>
      </Link>
      <Map
        pickupCoordinates={pickupCoordinates}
        dropoffCoordinates={dropoffCoordinates}
      />
      <RideContainer>
        <Title>Choose a ride, or swipe up for more</Title>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ margin: "15px" }}>
            <label htmlFor="appt">Select Pickup Time and date</label>
            <input
              type="time"
              id="appt"
              name="appt"
              value={new Date().toLocaleString().slice(12)}
              style={{
                border: "2px solid",
                marginLeft: "2rem",
                outline: "none",
              }}
            />
            <input
              type="date"
              id="datemax"
              name="datemax"
              onChange={(e) => {
                console.log(e.target.value);
                console.log(
                  `${new Date().getFullYear()}-0${
                    new Date().getMonth() + 1
                  }-${new Date().getDate()}`
                );
              }}
              value={`${new Date().getFullYear()}-${
                new Date().getMonth() + 1 < 10 ? "0" : ""
              }${new Date().getMonth() + 1}-${new Date().getDate()}`}
              style={{
                border: "2px solid",
                marginLeft: "2rem",
                outline: "none",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: " 2px 15px",
            }}
          >
            <label>Select number of person</label>
            {Array(5)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  onClick={() => setNmofPerson(i + 1)}
                  style={{
                    backgroundColor: "#CCCCCC",
                    padding: "2px 10px",
                    borderRadius: "3px",
                    margin: "0 5px",
                  }}
                >
                  {i + 1}
                </div>
              ))}
          </div>
          <div style={{ margin: "2px 15px" }}>
            <text>Car Type</text>
          </div>
          <div style={{ margin: "2px 15px" }}>
            <label htmlFor="phone">Enter your phone number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              style={{ border: "2px solid", margin: "2px 15px" }}
            />
          </div>
        </div>
        {/* <RideSelector
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
        /> */}
        <ConfirmButtonContainer>
          <ConfirmButton>Confirm Carbuk</ConfirmButton>
        </ConfirmButtonContainer>
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;

const Wrapper = tw.div`flex flex-col h-screen`;
const ButtonContainer = tw.div`bg-white cursor-pointer absolute top-4 left-6 z-50 rounded-full shadow-md`;
const BackButton = tw.img`h-12`;
const RideContainer = tw.div`flex-1 flex flex-col h-1/2`;
const Title = tw.div`text-gray-500 text-center text-xs border-b py-2`;
const ConfirmButtonContainer = tw.div`border-t-2`;
const ConfirmButton = tw.div`bg-black text-white m-3 p-3 text-center text-xl cursor-pointer`;
