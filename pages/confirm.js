import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import RideSelector from "./components/RideSelector";
import Link from "next/link";

const Confirm = () => {
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [dropoffCoordinates, setDropoffCoordinates] = useState(null);
  const router = useRouter();
  const { pickup, dropoff } = router.query;

  const getPickupCoordinates = (pickup) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?access_token=pk.eyJ1Ijoic2l0YXJhbTAxMDQiLCJhIjoiY2wyZDVqaTMxMGV4YjNpbXY1a3M4NHptbyJ9.nWEWJk3WUoyK7Es2jMV_3Q`
    )
      .then((res) => res.json())
      .then((data) => setPickupCoordinates(data.features[0].center));
  };

  const getDropoffCoordinates = (dropoff) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?access_token=pk.eyJ1Ijoic2l0YXJhbTAxMDQiLCJhIjoiY2wyZDVqaTMxMGV4YjNpbXY1a3M4NHptbyJ9.nWEWJk3WUoyK7Es2jMV_3Q`
    )
      .then((res) => res.json())
      .then((data) => setDropoffCoordinates(data.features[0].center));
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
        <RideSelector
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
        />
        <ConfirmButtonContainer>
          <ConfirmButton>Confirm UberX</ConfirmButton>
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
