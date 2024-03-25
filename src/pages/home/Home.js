import "bootstrap/dist/css/bootstrap.min.css";
import VideoPlayer from "../../components/VideoPlayer";

function Home({ userProfile, clubId, clubName, clubProfilePictureUrl }) {
  return (
    <div className="d-flex flex-column p-5 justify-content-center">
      {/* Display user profile information
      {userProfile && (
        <div>
          <h2>Welcome, {userProfile.displayName}</h2>
          <img src={userProfile.pictureUrl} alt="Profile" style={{ width: '50px', height: '50px' }} />
          <p>User ID: {userProfile.userId}</p>
          <p>Status Message: {userProfile.statusMessage}</p>
        </div>
      )} */}
      {/* Display club information
      {clubId && (
        <div>
          <h2> Club: {clubName}</h2>
          <img src={clubProfilePictureUrl} alt="Club Profile" style={{ width: '50px', height: '50px' }} />
          <p>Club ID: {clubId}</p>
        </div>
      )} */}
      <div>
        <sapn style={{ fontSize: "60px", fontWeight: "bolder" }}>Sport Jio Jio 運動揪揪</sapn>
      </div>
      <div className="mt-3">
        <sapn style={{ fontSize: "24px", fontWeight: "bold" }}>致力於打造最符合運動人需求的一站式運動揪團APP</sapn>
      </div>
      <div className="mt-3">
        <sapn style={{ fontSize: "24px", fontWeight: "normal" }}>
          除了透過直覺化的設計簡化現階段繁瑣的揪團機制，我們也將透過品牌傳遞運動的價值、推廣健康，期望未來成長為永續的運動揪揪生態圈。
        </sapn>
      </div>
      <div className="mt-3">
        <VideoPlayer
          url={"https://www.youtube.com/watch?v=VzwJG0dI__Y&ab_channel=SportJoJo"}
          height={"36vw"}
          width={"64vw"}
        />
      </div>
    </div>
  );
}

export default Home;
