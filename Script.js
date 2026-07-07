function saveFarm() {
  const farmName = document.getElementById("farmNameInput").value;
  const farmType = document.getElementById("farmTypeInput").value;

  localStorage.setItem("farmName", farmName);
  localStorage.setItem("farmType", farmType);

  const saveMsg = document.getElementById("saveMsg");
  if (saveMsg) saveMsg.textContent = "Farm details saved successfully.";
}

function calculateRisk() {
  const items = document.querySelectorAll(".riskItem:checked");
  let score = 0;

  items.forEach(item => {
    score += parseInt(item.value);
  });

  const risk = Math.max(0, 100 - score);
  localStorage.setItem("riskScore", risk);

  const result = document.getElementById("riskResult");
  if (result) {
    let status = "Low Risk";
    if (risk > 70) status = "High Risk";
    else if (risk > 40) status = "Medium Risk";

    result.textContent = "Risk Score: " + risk + "% - " + status;
  }
}

function loadDashboard() {
  const farmName = localStorage.getItem("farmName") || "Not registered";
  const farmType = localStorage.getItem("farmType") || "Not selected";
  const riskScore = localStorage.getItem("riskScore") || "0";

  const farmNameEl = document.getElementById("farmName");
  const farmTypeEl = document.getElementById("farmType");
  const riskScoreEl = document.getElementById("riskScore");
  const statusText = document.getElementById("statusText");

  if (farmNameEl) farmNameEl.textContent = farmName;
  if (farmTypeEl) farmTypeEl.textContent = farmType;
  if (riskScoreEl) riskScoreEl.textContent = riskScore + "%";

  if (statusText) {
    if (riskScore <= 40) statusText.textContent = "Your farm biosecurity is in good condition.";
    else if (riskScore <= 70) statusText.textContent = "Your farm needs improvement in biosecurity practices.";
    else statusText.textContent = "Your farm has high biosecurity risk. Immediate action is needed.";
  }
}

window.onload = function () {
  if (document.getElementById("farmName")) {
    loadDashboard();
  }
};
