const charge = document.getElementById("charge");
const chargeLevel = document.getElementById("charge-level");
const chargingTimeRef = document.getElementById("charging-time");

let batteryLevel;
window.onload = () => {
  //For browsers that don't support the battery status API
  if (!navigator.getBattery) {
    alert("Battery Status Api Is Not Supported In Your Browser");
    return false;
  }
};
navigator.getBattery().then((battery) => {

  function updateAllBatteryInfo() {
    updateChargingInfo();

     //Updating battery level
    batteryLevel = `${parseInt(battery.level * 100)}%`;
    charge.style.width = batteryLevel;
    chargeLevel.textContent = batteryLevel;
  
  }
  updateAllBatteryInfo();//calling......

  //When the charging status changes
  battery.addEventListener("chargingchange", () => { updateAllBatteryInfo(); });
  //When the Battery Level Changes
  battery.addEventListener("levelchange", () => { updateAllBatteryInfo(); });

  function updateChargingInfo() {
    const batteryStatus = document.querySelector(".battery_status");
    if (battery.level * 100 == 100) {
      batteryStatus.textContent = "Fully charged";
      batteryStatus.style.color = "green";
      charge.classList.remove("active");
    }
    
    if (battery.level * 100 <= 20) {
      batteryStatus.innerText = "Connect Charging";
      batteryStatus.style.color = "red";
      charge.classList.add("down20");
    }
    if (battery.level * 100 <= 15) {
      batteryStatus.innerText = "Low Battery";
      batteryStatus.style.color = "red";
      charge.classList.add("down15");
    }
    if (battery.charging) {
      charge.classList.add("active");
      chargingTimeRef.innerText = "";
    }
    else {
      charge.classList.remove("active");
      if (parseInt(battery.dischargingTime)) {
        let hr = parseInt(battery.dischargingTime / 3600);
        let min = parseInt(battery.dischargingTime / 60 - hr * 60);
        chargingTimeRef.textContent = `${hr} Hours ${min} Minutes remaining`;
      }
    }
  }
});