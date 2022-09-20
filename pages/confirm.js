import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const carList = ["Sedan", "SUV", "Van", "Magic"];

const Confirm = ({ pickup, dropoff, email }) => {
  const [user, setUser] = useState(null);
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [dropoffCoordinates, setDropoffCoordinates] = useState(null);
  const [nmofPerson, setNmofPerson] = useState(1);
  const [carType, setCarType] = useState("");
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
      router.push("/");
    }
  }, [pickup, dropoff, router]);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
          email: user.email,
        });
      } else {
        setUser(null);
        router.push("/login");
      }
    });
  }, [router]);

  const pad = (p) => (p < 10 ? "0" : "") + p;

  const d = new Date();
  const Time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const currentDate = `${pad(d.getFullYear())}-${pad(d.getMonth())}-${pad(
    d.getDate()
  )}`;

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
              value={Time}
              onChange={(e) => console.log(e.target.value)}
              style={{
                backgroundColor: "#DDDDDD",
                border: "2px solid",
                marginLeft: "2rem",
                outline: "none",
                borderRadius: "4px",
              }}
            />
            <input
              type="date"
              id="datemax"
              name="datemax"
              onChange={(e) => console.log(e.target.value)}
              value={currentDate}
              style={{
                backgroundColor: "#DDDDDD",
                border: "2px solid",
                marginLeft: "2rem",
                outline: "none",
                borderRadius: "4px",
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
            <label style={{ marginRight: "15px" }}>
              Select number of person
            </label>
            <PersonButton
              onClick={() => setNmofPerson(nmofPerson > 1 ? nmofPerson - 1 : 1)}
            >
              -
            </PersonButton>
            <PersonButton style={{ background: "#999999", cursor: "auto" }}>
              {nmofPerson}
            </PersonButton>
            <PersonButton
              onClick={() =>
                setNmofPerson(nmofPerson < 30 ? nmofPerson + 1 : 5)
              }
            >
              +
            </PersonButton>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: " 2px 15px",
            }}
          >
            <label style={{ marginRight: "15px" }}>Car Type</label>
            {carList.map((car) => (
              <PersonButton
                key={car}
                onClick={() => setCarType(car)}
                style={{
                  backgroundColor: `${carType === car ? "#999999" : "#DDDDDD"}`,
                }}
              >
                {car}
              </PersonButton>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: " 2px 15px",
            }}
          >
            <label style={{ marginRight: "15px" }}>
              Type Car Name for any Specific Type
            </label>

            <input
              placeholder="optional"
              value={carList.some((c) => c === carType) ? "" : carType}
              onChange={(e) => setCarType(e.target.value)}
              style={{
                backgroundColor: "#DDDDDD",
                border: "solid 2px",
                borderRadius: "4px",
                paddingLeft: "4px",
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
            <div style={{ marginRight: "15px" }}>Your email id is:</div>
            <PersonButton
              style={{
                background: "#999999",
                cursor: "auto",
                padding: "0px 6px",
              }}
            >
              {user ? user.email : ""}
            </PersonButton>
          </div>
          <div style={{ margin: "2px 15px", display: "flex" }}>
            <label htmlFor="phone">Enter your phone number:</label>
            <input
              type="number"
              id="phone"
              name="phone"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              min="0"
              style={{
                backgroundColor: "#DDDDDD",
                border: "2px solid",
                margin: "2px 15px",
                borderRadius: "4px",
                paddingLeft: "4px",
              }}
            />
            <ConfirmButton>Verify OTP</ConfirmButton>
          </div>
        </div>
        <ConfirmButton
          style={{
            cursor: "not-allowed",
            backgroundColor: "gray",
            width: "500px",
          }}
        >
          Confirm Ride
        </ConfirmButton>
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
const ConfirmButton = tw.div`bg-black text-white mx-3 px-3 text-center text-xl cursor-pointer w-40`;
const PersonButton = tw.div`mx-1 bg-gray-200 px-5 py-0 rounded select-none cursor-pointer`;
