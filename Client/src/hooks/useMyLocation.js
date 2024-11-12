export function useMyLocation() {
  let myLat = "";
  let myLng = "";
  let msg = "";
  let errCode = 0;
  navigator.geolocation.getCurrentPosition(
    (coords) => {
      myLat = coords.coords.latitude;
      myLng = coords.coords.longitude;
      // console.log("i got your coords", myLat, myLng);
    },
    (err) => {
      console.log(err);
      errCode = err.code;
      msg = err.message;
      // console.log(errCode, msg);
    }
  );
  return { myLat, myLng, errCode, msg };
}
