import Link from "next/link";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

function Search() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupList, setPickupList] = useState([]);
  const [dropoffList, setDropoffList] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?access_token=pk.eyJ1Ijoic2l0YXJhbTAxMDQiLCJhIjoiY2wyZDVqaTMxMGV4YjNpbXY1a3M4NHptbyJ9.nWEWJk3WUoyK7Es2jMV_3Q`
    )
      .then((res) => res.json())
      .then((data) => {
        setPickupList(data.features.map((a) => a.place_name));
        console.log(pickupList);
      });
  }, [pickup]);

  useEffect(() => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?access_token=pk.eyJ1Ijoic2l0YXJhbTAxMDQiLCJhIjoiY2wyZDVqaTMxMGV4YjNpbXY1a3M4NHptbyJ9.nWEWJk3WUoyK7Es2jMV_3Q`
    )
      .then((res) => res.json())
      .then((data) => {
        setDropoffList(data.features.map((a) => a.place_name));
        console.log(dropoffList);
      });
  }, [dropoff]);

  return (
    <Wrapper>
      <Link href={"/"} passHref>
        <ButtonContainer>
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </ButtonContainer>
      </Link>
      <InputContainer>
        <FromToIcons>
          <Circle src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
          <Line src="https://img.icons8.com/ios-filled/50/9CA3AF/vertical-line.png" />
          <Square src="https://img.icons8.com/ios-filled/50/9CA3AF/square.png" />
        </FromToIcons>
        <InputBoxes>
          <div style={{ position: "relative" }}>
            <Input
              placeholder="Enter pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            <div
              style={{
                position: "absolute",
                zIndex: "1",
                backgroundColor: "#EEEEEE",
              }}
            >
              {pickupList.map((p) => (
                <div
                  onClick={() => {
                    setPickup(p);
                    setPickupList([]);
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <Input
              placeholder="Where to?"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
            />
            <div
              style={{
                position: "absolute",
                zIndex: "1",
                backgroundColor: "#EEEEEE",
              }}
            >
              {dropoffList.map((p) => (
                <div
                  onClick={() => {
                    setDropoff(p);
                    setDropoffList([]);
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </InputBoxes>
        <PlusIcon src="https://img.icons8.com/ios-filled/50/000000/plus-math.png" />
      </InputContainer>
      <SavedPlaces>
        <StarIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png" />
        Saved Places
      </SavedPlaces>
      <Link
        href={{
          pathname: "/confirm",
          query: { pickup, dropoff },
        }}
        passHref
      >
        <ConfirmButtonContainer>Confirm Locations</ConfirmButtonContainer>
      </Link>
    </Wrapper>
  );
}

export default Search;

const Wrapper = tw.div`bg-gray-200 h-screen`;
const ButtonContainer = tw.div`bg-white px-4 cursor-pointer shadow-md`;
const BackButton = tw.img`h-12`;
const InputContainer = tw.div`bg-white p-4 flex items-center mb-2`;
const FromToIcons = tw.div`w-10 flex flex-col mr-2 items-center`;
const Circle = tw.img`h-3`;
const Line = tw.img`h-10`;
const Square = tw.img`h-3`;
const InputBoxes = tw.div`flex flex-col flex-1`;
const Input = tw.input`h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none`;
const PlusIcon = tw.img`w-10 h-10 bg-gray-200 rounded-full ml-3`;
const SavedPlaces = tw.div`flex items-center bg-white px-4 py-2`;
const StarIcon = tw.img`w-10 h-10 bg-gray-400 p-2 rounded-full mr-3`;
const ConfirmButtonContainer = tw.div`bg-black text-white text-center mt-2 mx-4 px-4 py-3 text-2xl cursor-pointer`;
