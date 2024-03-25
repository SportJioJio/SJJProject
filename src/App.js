import React, { useEffect, useState } from "react";
import { BrowserRouter as Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavScroll from "./components/NavScroll";
import Home from "./pages/home/Home";
import CreateJioJio from "./pages/createjiojio/CreateJioJio";
import ListJioJio from "./pages/listjiojio/ListJioJio";
import { get_user } from "./api/get/GetUser";
import { get_club } from "./api/get/GetClub";

import liff from "@line/liff";

// for test
// const liffId_test = '2003890387-46rMAvQQ'; //這個換成https://sportjiojio.site的LIFF的ID
// const test_url = 'https://5568-140-114-217-46.ngrok-free.app'; //這個改成https://sportjiojio.site
// const liffId_test = "2003890387-Lo2nNExx"; //這個換成https://sportjiojio.site的LIFF的ID
// const test_url = "https://2987-2001-b400-e300-ddd5-f7c5-7cdb-6010-169.ngrok-free.app"; //這個改成https://sportjiojio.site
const liffId_test = "2003890387-36qLbEdd"; //這個換成https://sportjiojio.site的LIFF的ID
const test_url = "https://sportjiojio.site"; //這個改成https://sportjiojio.site

const App = () => {
  const [search, setSearch] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [LiffContext, setLiffContext] = useState(null);
  const [liffError, setLiffError] = useState(null);
  const location = useLocation();
  const [club_id, setClubId] = useState(localStorage.getItem("club_id") || "");
  const [club_name, setClubName] = useState(localStorage.getItem("club_name") || "");
  const [clubProfilePictureUrl, setClubProfilePicture] = useState(localStorage.getItem("club_profile_picture") || "");
  const [user_id, setUserId] = useState("");
  const [userProfilePictureUrl, setUserProfilePicture] = useState("");
  const [liffInitialized, setLiffInitialized] = useState(false);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: liffId_test });
        const isLoggedIn = liff.isLoggedIn();

        if (!isLoggedIn) {
          await liff.login({ redirectUri: `${test_url}/` });
        }

        const [profile, context] = await Promise.all([liff.getProfile(), liff.getContext()]);
        setUserProfile(profile);
        setLiffContext(context);

        // 其实还可以获取到使用者的email, 但我想说不用
        setUserId(profile.userId.replace(/[A-Z]/g, ""));
        setUserProfilePicture(profile.pictureUrl);
        setLiffInitialized(true);
      } catch (error) {
        setLiffError(error);
      }
    };

    initLiff();
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await get_user(user_id);

      if (user === "NaN") {
        // await create_user(user_id, user_name, userProfilePictureUrl); //等語辰create弄好這行可以拿掉
        console.log("User not found");
      }

      const params = new URLSearchParams(location.search);
      var clubIdParam = LiffContext.type === "group" ? params.get("groupId") : user_id; //user_id 應該改"固定ID"
      console.log(clubIdParam);

      if (clubIdParam) {
        localStorage.removeItem("club_id");
        setClubId(clubIdParam);
        localStorage.setItem("club_id", clubIdParam);
      } else {
        const storedClubId = localStorage.getItem("club_id");
        setClubId(storedClubId);
      }
    };

    if (userProfile && liffInitialized) {
      fetchData();
    }
  }, [user_id, userProfile, liffInitialized]);

  useEffect(() => {
    const fetchClub = async () => {
      if (club_id) {
        const club = await get_club(club_id);
        if (club === "NaN") {
          // await create_club(club_id, club_name, clubProfilePictureUrl); //等語辰create弄好這行可以拿掉
          console.log("Club not found");
        } else {
          setClubName(club.name);
          setClubProfilePicture(club.pic_url);
          // await user_join_club(club_id, user_id);
        }
      }
    };

    fetchClub();
  }, [club_id, user_id]);

  if (liffError) {
    return <div>Error initializing LIFF: {liffError.message}</div>;
  }

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "100%" }}>
      <NavScroll search={search} setSearch={setSearch} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              userProfile={userProfile}
              clubId={club_id}
              clubName={club_name}
              clubProfilePictureUrl={clubProfilePictureUrl}
            />
          }
        />
        <Route
          path="/createjiojio"
          element={
            <CreateJioJio
              userId={user_id}
              userName={userProfile.Displayname}
              userProfilePictureUrl={userProfilePictureUrl}
              clubId={club_id}
              clubName={club_name}
              clubProfilePictureUrl={clubProfilePictureUrl}
            />
          }
        />
        <Route
          path="/listjiojio"
          element={
            <ListJioJio
              search={search}
              userId={user_id}
              userName={userProfile.Displayname}
              userProfilePictureUrl={userProfilePictureUrl}
              clubId={club_id}
              clubName={club_name}
              clubProfilePictureUrl={clubProfilePictureUrl}
            />
          }
        />
        <Route
          path="/createjiojio"
          element={
            <CreateJioJio
              userId={user_id}
              userName={userProfile.Displayname}
              userProfilePictureUrl={userProfilePictureUrl}
              clubId={club_id}
              clubName={club_name}
              clubProfilePictureUrl={clubProfilePictureUrl}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
