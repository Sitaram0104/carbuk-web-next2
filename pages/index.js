import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth, provider } from "../firebase";

export default function Home() {
  const [user, setUser] = useState(null);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupList, setPickupList] = useState([]);
  const [dropoffList, setDropoffList] = useState([]);
  const router = useRouter();

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${p.coords.longitude},${p.coords.latitude}.json?access_token=pk.eyJ1Ijoic2l0YXJhbTAxMDQiLCJhIjoiY2wyZDVqaTMxMGV4YjNpbXY1a3M4NHptbyJ9.nWEWJk3WUoyK7Es2jMV_3Q`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data.features);
            setPickup(data.features[0].place_name);
            setPickupList([]);
          });
      });
    }
  }, []);

  useEffect(() => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?access_token=pk.eyJ1Ijoic2l0YXJhbTAxMDQiLCJhIjoiY2wyZDVqaTMxMGV4YjNpbXY1a3M4NHptbyJ9.nWEWJk3WUoyK7Es2jMV_3Q`
    )
      .then((res) => res.json())
      .then((data) => {
        setPickupList(data.features.map((a) => a.place_name));
      });
  }, [pickup]);

  useEffect(() => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?access_token=pk.eyJ1Ijoic2l0YXJhbTAxMDQiLCJhIjoiY2wyZDVqaTMxMGV4YjNpbXY1a3M4NHptbyJ9.nWEWJk3WUoyK7Es2jMV_3Q`
    )
      .then((res) => res.json())
      .then((data) => {
        setDropoffList(data.features.map((a) => a.place_name));
      });
  }, [dropoff]);

  return (
    <Wrapper>
      <Map />
      <ActionItems>
        <Header>
          <UberLogo src="/carbuk_logo.png" />
          <Profile>
            <Name>{user && user.name}</Name>
            <UserImage
              src={user && user.photoUrl}
              onClick={() => signOut(auth)}
            />
          </Profile>
        </Header>
        <div style={{ position: "relative" }}>
          <InputButton
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
          <List>
            {pickupList.map((p, i) => (
              <ListItem
                key={i}
                onClick={() => {
                  setPickup(p);
                  setPickupList([]);
                }}
              >
                {p}
              </ListItem>
            ))}
          </List>
        </div>
        <div style={{ position: "relative" }}>
          <InputButton
            placeholder="Where to?"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
          />
          <List>
            {dropoffList.map((p, i) => (
              <ListItem
                key={i}
                onClick={() => {
                  setDropoff(p);
                  setDropoffList([]);
                }}
              >
                {p}
              </ListItem>
            ))}
          </List>
        </div>

        <Link
          href={{
            pathname: "/confirm",
            query: { pickup, dropoff },
          }}
          passHref
        >
          <ConfirmButtonContainer>Confirm Locations</ConfirmButtonContainer>
        </Link>
      </ActionItems>
    </Wrapper>
  );
}

const Wrapper = tw.div`flex flex-col h-screen`;
const ActionItems = tw.div`flex-1 p-4`;
const Header = tw.div`flex justify-between items-center`;
const UberLogo = tw.img`h-28`;
const Profile = tw.div`flex items-center`;
const Name = tw.div`mr-4 w-20 text-sm`;
const UserImage = tw.img`h-12 w-12 object-cover rounded-full border border-gray-200 p-px cursor-pointer`;
const ActionButtons = tw.div`flex`;
const ActionButton = tw.div`flex flex-1 bg-gray-200 m-1 h-32 items-center flex-col justify-center rounded-lg transform hover:scale-105 transition text-xl`;
const ActionButtonImage = tw.img`h-3/5`;
const InputButton = tw.input`w-9/12 h-10 bg-gray-200 text-2xl my-2 rounded-2 p-2 outline-none flex items-center flex-1`;
const ConfirmButtonContainer = tw.div`w-9/12 bg-black text-white text-center mt-2 px-4 py-3 text-2xl cursor-pointer`;
const List = tw.ul`absolute z-10 ml-2 bg-gray-200`;
const ListItem = tw.li``;
